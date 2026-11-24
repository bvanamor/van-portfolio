const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.textContent = isOpen ? '×' : '☰';
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = '☰';
}));

// Small terminal-style intro. Respects reduced-motion preferences.
const command = document.querySelector('#terminal-command');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (command) {
  const text = command.dataset.text || '';
  if (reducedMotion) {
    command.textContent = text;
  } else {
    let index = 0;
    const type = () => {
      command.textContent = text.slice(0, index++);
      if (index <= text.length) window.setTimeout(type, 48);
    };
    window.setTimeout(type, 350);
  }
}

// Reveal cards as they enter the viewport.
if ('IntersectionObserver' in window && !reducedMotion) {
  const revealItems = document.querySelectorAll('.skill-card, .project-card, .lab-card, .timeline-item');
  revealItems.forEach(item => item.classList.add('reveal-ready'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}
