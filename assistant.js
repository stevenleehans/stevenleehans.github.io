'use strict';
// Public endpoint only. The Gemini credential is held in the backend runtime.
const ASSISTANT_ENDPOINT = 'https://hans-portfolio-assistant.vercel.app/api/chat';
const assistantForm = document.getElementById('assistant-form');
const assistantQuestion = document.getElementById('assistant-question');
const assistantSubmit = document.getElementById('assistant-submit');
const assistantConversation = document.getElementById('assistant-conversation');
const assistantStatus = document.getElementById('assistant-status');
const assistantClear = document.getElementById('assistant-clear');
const assistantSuggestions = Array.from(document.querySelectorAll('[data-question]'));
let assistantHistory = [];
let assistantBusy = false;

function addMessage(role, text) {
  assistantConversation.hidden = false;
  assistantClear.hidden = false;
  const bubble = document.createElement('div');
  bubble.className = `assistant-message ${role}`;
  const label = document.createElement('strong');
  label.textContent = role === 'user' ? 'You' : 'Assistant';
  const content = document.createElement('p');
  // Model text is never parsed as HTML or executable Markdown.
  const links = /(https:\/\/[^\s<>]+)/g;
  let cursor = 0;
  for (const match of text.matchAll(links)) {
    content.append(document.createTextNode(text.slice(cursor,match.index)));
    const raw = match[0].replace(/[),.;]+$/, '');
    const anchor = document.createElement('a');
    let allowed = false;
    try { allowed = ['stevenleehans.github.io','github.com','www.linkedin.com','openaiotlab.github.io','www.kaggle.com','kaggle.com','www.salesforce.com','salesforce.com'].includes(new URL(raw).hostname); } catch { /* Keep malformed links as text. */ }
    if (allowed) { anchor.href=raw;anchor.target='_blank';anchor.rel='noopener noreferrer';anchor.textContent=raw;content.append(anchor); }
    else content.append(document.createTextNode(raw));
    content.append(document.createTextNode(match[0].slice(raw.length)));
    cursor = match.index + match[0].length;
  }
  content.append(document.createTextNode(text.slice(cursor)));
  bubble.append(label,content);
  assistantConversation.append(bubble);
  assistantConversation.scrollTop = assistantConversation.scrollHeight;
}

async function askAssistant(question) {
  question = question.trim();
  if (!question || assistantBusy) return;
  assistantBusy = true;
  assistantSubmit.disabled = true;
  assistantSuggestions.forEach(button => button.disabled = true);
  assistantClear.disabled = true;
  assistantStatus.textContent = 'Thinking…';
  addMessage('user',question);
  assistantQuestion.value = '';
  try {
    if (!ASSISTANT_ENDPOINT) throw new Error('The assistant is being connected. Please try again shortly.');
    const response = await fetch(ASSISTANT_ENDPOINT, {
      method:'POST',credentials:'omit',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({question,history:assistantHistory.slice(-6)}),signal:AbortSignal.timeout(28000)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'The assistant is temporarily unavailable. Please try again later.');
    if (typeof result.answer !== 'string' || !result.answer.trim()) throw new Error('Please try asking that question again.');
    addMessage('model',result.answer);
    assistantHistory.push({role:'user',text:question},{role:'model',text:result.answer.slice(0,2000)});
    assistantHistory = assistantHistory.slice(-6);
    assistantStatus.textContent = '';
  } catch(error) {
    assistantStatus.textContent = error.name === 'TimeoutError' ? 'The assistant is taking longer than expected. Please try again.' : error.message;
    assistantQuestion.value = question;
  } finally {
    assistantBusy = false;
    assistantSubmit.disabled = false;
    assistantSuggestions.forEach(button => button.disabled = false);
    assistantClear.disabled = false;
  }
}
assistantForm.addEventListener('submit', event => {event.preventDefault();askAssistant(assistantQuestion.value);});
assistantSuggestions.forEach(button => button.addEventListener('click',()=>askAssistant(button.dataset.question)));
assistantClear.addEventListener('click',()=>{assistantHistory=[];assistantConversation.replaceChildren();assistantConversation.hidden=true;assistantClear.hidden=true;assistantStatus.textContent='';assistantQuestion.focus();});
