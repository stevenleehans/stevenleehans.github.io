'use strict';
const panels = Array.from(document.querySelectorAll('.panel'));
const layer = document.getElementById('panel-layer');
const shell = document.querySelector('.site-shell');
let activePanel = null;
let returnFocus = null;

function syncPanel() {
  const id = window.location.hash.slice(1);
  const next = panels.find(panel => panel.id === id) || null;
  if (next && !activePanel) returnFocus = document.activeElement;
  activePanel = next;
  document.body.classList.toggle('panel-open', Boolean(next));
  shell.inert = Boolean(next);
  for (const panel of panels) {
    if (panel === next) {
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'true');
      panel.setAttribute('aria-hidden', 'false');
    } else {
      panel.removeAttribute('role');
      panel.removeAttribute('aria-modal');
      panel.setAttribute('aria-hidden', 'true');
    }
  }
  if (next) {
    layer.scrollTop = 0;
    next.focus({preventScroll: true});
  } else if (returnFocus && returnFocus.isConnected) {
    returnFocus.focus({preventScroll: true});
    returnFocus = null;
  }
}
function closePanel() { window.location.hash = ''; }
window.addEventListener('hashchange', syncPanel);
layer.addEventListener('click', event => { if (event.target === layer) closePanel(); });
document.addEventListener('keydown', event => {
  if (!activePanel) return;
  if (event.key === 'Escape') { event.preventDefault(); closePanel(); return; }
  if (event.key !== 'Tab') return;
  const focusable = Array.from(activePanel.querySelectorAll('a[href], button, input, summary')).filter(node => !node.closest('[hidden]') && node.getClientRects().length);
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (!first) { event.preventDefault(); activePanel.focus(); }
  else if (event.shiftKey && (document.activeElement === first || document.activeElement === activePanel)) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

const cards = Array.from(document.querySelectorAll('.project-card'));
const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
const search = document.getElementById('project-search');
let category = 'all';
function filterProjects() {
  const terms = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let count = 0;
  for (const card of cards) {
    const text = `${card.dataset.search} ${card.textContent}`.toLowerCase();
    const matchesCategory = category === 'all' || card.dataset.category.split(' ').includes(category);
    const visible = matchesCategory && terms.every(term => text.includes(term));
    card.hidden = !visible;
    if (visible) count++;
  }
  document.getElementById('project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
  document.getElementById('empty-results').hidden = count !== 0;
}
for (const button of filterButtons) button.addEventListener('click', () => {
  category = button.dataset.filter;
  for (const item of filterButtons) {
    const selected = item === button;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-pressed', String(selected));
  }
  filterProjects();
});
search.addEventListener('input', filterProjects);
document.getElementById('year').textContent = String(new Date().getFullYear());
syncPanel();
