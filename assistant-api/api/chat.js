import { SYSTEM } from '../lib/profile.js';

const MODEL = 'gemini-2.5-flash';
const ORIGIN = 'https://stevenleehans.github.io';
const windows = new Map();
const cache = new Map();
let globalWindow = { until: 0, count: 0 };

function send(res, status, payload) { return res.status(status).json(payload); }
function allowRequest(ip, now) {
  if (globalWindow.until <= now) globalWindow = {until: now + 3600000, count: 0};
  for (const [key, value] of windows) if (value.until <= now) windows.delete(key);
  const current = windows.get(ip) || {until: now + 3600000, count: 0, last: 0};
  if (current.count >= 12 || now - current.last < 3000 || globalWindow.count >= 120) return false;
  current.count++; current.last = now; windows.set(ip, current); globalWindow.count++;
  return true;
}

export default async function handler(req, res) {
  const origin = req.headers.origin;
  const local = process.env.NODE_ENV !== 'production' && /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin || '');
  const permitted = origin === ORIGIN || local;
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Vary', 'Origin');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  if (permitted) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '600');
  }
  if (!permitted) return send(res, 403, {error: 'Please use the assistant from Hans’s portfolio.'});
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST, OPTIONS'); return send(res, 405, {error: 'Please send a question using the portfolio form.'}); }
  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return send(res, 415, {error:'Please use the portfolio question form.'});
  if (Number(req.headers['content-length']) > 12000) return send(res, 413, {error:'Please ask a shorter question.'});
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return send(res, 400, {error:'Please try submitting your question again.'}); }
  const question = body?.question;
  if (typeof question !== 'string' || !question.trim() || question.length > 600) return send(res, 400, {error:'Please ask a question of up to 600 characters.'});
  const history = body.history ?? [];
  if (!Array.isArray(history) || history.length > 8 || history.some(m => !m || !['user','model'].includes(m.role) || typeof m.text !== 'string' || m.text.length > 2000)) return send(res, 400, {error:'Please clear the conversation and try again.'});
  if (JSON.stringify(body).length > 12000) return send(res, 413, {error:'Please clear the conversation and ask a shorter question.'});
  if (!process.env.GEMINI_API_KEY) return send(res, 503, {error:'The assistant is temporarily unavailable. Please explore the projects or contact Hans directly.'});
  const ip = String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim().slice(0,100);
  if (!allowRequest(ip, Date.now())) { res.setHeader('Retry-After', '60'); return send(res, 429, {error:'Please pause before asking another question. You can also explore the projects below.'}); }
  const normalized = question.trim();
  const cacheKey = history.length === 0 ? normalized.toLowerCase() : null;
  const cached = cacheKey && cache.get(cacheKey);
  if (cached && cached.until > Date.now()) return send(res, 200, {answer: cached.answer, model: MODEL});
  try {
    const contents = history.map(m => ({role: m.role, parts:[{text:m.text}]}));
    contents.push({role:'user',parts:[{text:normalized}]});
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method:'POST', headers:{'Content-Type':'application/json','x-goog-api-key':process.env.GEMINI_API_KEY},
      body:JSON.stringify({systemInstruction:{parts:[{text:SYSTEM}]}, contents, generationConfig:{temperature:0.25,maxOutputTokens:600,thinkingConfig:{thinkingBudget:0}}}),
      signal:AbortSignal.timeout(22000)
    });
    if (!response.ok) {
      if (response.status === 429) return send(res, 429, {error:'The assistant has reached its current AI allowance. Please try again later or contact Hans directly.'});
      return send(res, 503, {error:'The assistant is temporarily unavailable. Please try again later.'});
    }
    const data = await response.json();
    const answer = (data.candidates?.[0]?.content?.parts || []).filter(p=>!p.thought && typeof p.text==='string').map(p=>p.text).join('').trim();
    if (!answer) return send(res, 503, {error:'I couldn’t answer that question. Try asking about Hans’s projects or experience.'});
    if (answer.includes(process.env.GEMINI_API_KEY)) return send(res, 503, {error:'Please try a different question about Hans’s work.'});
    if (cacheKey) {
      if (cache.size >= 150) cache.delete(cache.keys().next().value);
      cache.set(cacheKey,{answer,until:Date.now()+3600000});
    }
    return send(res, 200, {answer,model:MODEL});
  } catch { return send(res, 503, {error:'The assistant is taking longer than expected. Please try again later.'}); }
}
