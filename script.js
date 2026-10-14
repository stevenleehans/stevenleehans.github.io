'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.getElementById('site-navigation');
function closeNavigation(returnFocus = false) {
  if (!menuToggle || !navigation) return;
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  if (returnFocus) menuToggle.focus();
}
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navigation?.addEventListener('click', event => {
  if (event.target.closest('a')) closeNavigation();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') closeNavigation(true);
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
search?.addEventListener('input', filterProjects);
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
