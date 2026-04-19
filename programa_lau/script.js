// Main script: dinámico + global + carga modular de scripts y estilos
function loadCSS(href) {
  if (!href) return;
  const existing = document.querySelector(`link[href="${href}"]`);
  if (existing) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function loadJS(src) {
  if (!src) return;
  const existing = document.querySelector(`script[src="${src}"]`);
  if (existing) return;
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.addEventListener('error', () => console.warn('No script found:', src));
  document.body.appendChild(script);
}

function observeSections() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px 300px 0px'
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .sec-card, .hero, .page-body, .service, .sector, .testimonial, .service-item').forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.95)';
      el.style.transition = 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1), transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    }
  });
}

function setupNav() {
  const navLinks = document.querySelector('.nav-links');
  if (!navLinks) return;

  const menuToggle = document.createElement('button');
  menuToggle.textContent = '☰';
  menuToggle.className = 'menu-toggle';
  document.querySelector('nav').appendChild(menuToggle);

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  function checkScreenSize() {
    if (window.innerWidth < 768) {
      menuToggle.style.display = 'block';
      navLinks.style.display = 'none';
      navLinks.classList.add('mobile');
    } else {
      menuToggle.style.display = 'none';
      navLinks.style.display = 'flex';
      navLinks.classList.remove('mobile', 'active');
    }
  }

  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();

      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      navLinks.classList.remove('active');
      target.classList.add('highlight');
      setTimeout(() => target.classList.remove('highlight'), 2000);
    });
  });
}

function setupScrollEffects() {
  let lastScrollTop = 0;
  const header = document.querySelector('header');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.backgroundPositionY = `${-scrolled * 0.4}px`;
    }

    if (header) {
      if (scrolled > lastScrollTop && scrolled > 100) {
        header.classList.add('hide-navbar');
      } else {
        header.classList.remove('hide-navbar');
      }
    }

    lastScrollTop = Math.max(0, scrolled);

    if (backToTop) {
      if (scrolled > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

function includeSection(file, includeElement) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      includeElement.innerHTML = data;
      includeElement.classList.remove('section-placeholder');
      includeElement.classList.add('section-loaded');

      const cssFile = file.replace('sections/', 'styles/').replace('.html', '.css');
      loadCSS(cssFile);

      const jsFile = file.replace('sections/', 'scripts/').replace('.html', '.js');
      loadJS(jsFile);

      observeSections();
    })
    .catch(err => console.error('Error loading section:', file, err));
}

document.addEventListener('DOMContentLoaded', () => {
  setupNav();
  setupScrollEffects();

  document.querySelectorAll('[data-include]').forEach(include => {
    const file = include.getAttribute('data-include');
    includeSection(file, include);
  });

  observeSections();
});

// Mobile nav style helper
const style = document.createElement('style');
style.textContent = `
  .nav-links.mobile { flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background-color: #003366; display: none; z-index: 1000; }
  .nav-links.mobile.active { display: flex; }
  .nav-links.mobile li { margin: 0; padding: 1rem; border-bottom: 1px solid #005599; }
`;
document.head.appendChild(style);
