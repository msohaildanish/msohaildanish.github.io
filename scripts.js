document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const year = document.getElementById('year');
  const newsTimeline = document.querySelector('.news-timeline');
  const newsToggle = document.querySelector('.news-toggle');
  const backToTop = document.querySelector('.back-to-top');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const applyTheme = (theme) => {
    document.body.dataset.theme = theme;
    localStorage.setItem('msd-theme', theme);

    if (themeToggle) {
      const icon = themeToggle.querySelector('.theme-icon');
      const label = themeToggle.querySelector('.theme-label');
      const targetTheme = theme === 'dark' ? 'light' : 'dark'; // show the next theme
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
      themeToggle.setAttribute('aria-label', `Switch to ${targetTheme} mode`);
      if (icon) icon.textContent = targetTheme === 'dark' ? '🌙' : '☀️';
      if (label) label.textContent = targetTheme === 'dark' ? 'Dark' : 'Light';
    }
  };

  const storedTheme = localStorage.getItem('msd-theme');
  const initialTheme = storedTheme || 'dark';
  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.body.dataset.theme || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (newsTimeline && newsToggle) {
    newsToggle.addEventListener('click', () => {
      const expanded = newsTimeline.classList.toggle('expanded');
      newsToggle.setAttribute('aria-expanded', String(expanded));
      newsToggle.textContent = expanded ? 'Hide earlier updates' : 'Show all updates';
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});


