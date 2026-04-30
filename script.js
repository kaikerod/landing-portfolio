// ===== SCROLL REVEAL =====
// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const storedTheme = window.localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function isDarkThemePreferred() {
  if (storedTheme === 'dark') return true;
  if (storedTheme === 'light') return false;
  return systemPrefersDark.matches;
}

function applyTheme(isDark) {
  document.body.classList.toggle('theme-dark', isDark);

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Activate light theme' : 'Activate dark theme');
  }
}

applyTheme(isDarkThemePreferred());

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('theme-dark');
    applyTheme(isDark);
    window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

if (typeof systemPrefersDark.addEventListener === 'function') {
  systemPrefersDark.addEventListener('change', (event) => {
    if (!window.localStorage.getItem('theme')) {
      applyTheme(event.matches);
    }
  });
} else if (typeof systemPrefersDark.addListener === 'function') {
  systemPrefersDark.addListener((event) => {
    if (!window.localStorage.getItem('theme')) {
      applyTheme(event.matches);
    }
  });
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .project-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation for project cards
      const delay = entry.target.classList.contains('project-card')
        ? index * 100
        : 0;
      
      setTimeout(() => {
        entry.target.classList.add('revealed');
      }, delay);
      
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== PROJECT CARD FOCUS =====
const projectsGrid = document.querySelector('.projects__grid');
const projectCards = document.querySelectorAll('.project-card');
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const interactiveSelector = 'a, button, input, textarea, select, [role="button"]';

function getCardTitle(card) {
  return card.querySelector('.project-card__title')?.textContent?.trim() || 'project';
}

function getClosestElement(target, selector) {
  return target instanceof Element ? target.closest(selector) : null;
}

function selectProjectCard(selectedCard) {
  projectCards.forEach((card) => {
    const isSelected = card === selectedCard;
    const action = isSelected ? 'Collapse' : 'Expand';

    card.classList.toggle('is-selected', isSelected);
    card.setAttribute('aria-expanded', String(isSelected));
    card.setAttribute('aria-label', `${action} ${getCardTitle(card)} project card`);
  });

  if (projectsGrid) {
    projectsGrid.classList.toggle('has-selected', Boolean(selectedCard));
  }

  if (selectedCard) {
    selectedCard.focus({ preventScroll: true });
    selectedCard.scrollIntoView({
      behavior: reduceMotionQuery.matches ? 'auto' : 'smooth',
      block: 'nearest'
    });
  }
}

projectCards.forEach((card) => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-expanded', 'false');
  card.setAttribute('aria-label', `Expand ${getCardTitle(card)} project card`);

  card.addEventListener('click', (event) => {
    if (getClosestElement(event.target, interactiveSelector)) return;

    const nextCard = card.classList.contains('is-selected') ? null : card;
    selectProjectCard(nextCard);
  });

  card.addEventListener('keydown', (event) => {
    if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;

    event.preventDefault();
    const nextCard = card.classList.contains('is-selected') ? null : card;
    selectProjectCard(nextCard);
  });
});

document.addEventListener('click', (event) => {
  if (!projectsGrid?.classList.contains('has-selected')) return;
  if (getClosestElement(event.target, '.project-card')) return;

  selectProjectCard(null);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    selectProjectCard(null);
  }
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
}, { passive: true });

// ===== MOBILE MENU =====
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== TYPING EFFECT =====
const greetingEl = document.querySelector('.hero__greeting');
if (greetingEl) {
  const originalText = greetingEl.textContent;
  greetingEl.textContent = '';
  greetingEl.style.visibility = 'visible';
  
  let i = 0;
  const typeSpeed = 60;
  
  function typeWriter() {
    if (i < originalText.length) {
      greetingEl.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, typeSpeed);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.header__nav a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--text-primary)';
        }
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-80px 0px -80px 0px'
});

sections.forEach(section => navObserver.observe(section));

// ===== PARALLAX EFFECT =====
const parallaxElements = document.querySelectorAll('[data-parallax]');
const parallaxMediaQuery = window.matchMedia('(max-width: 820px), (prefers-reduced-motion: reduce)');

let parallaxTicking = false;

function updateParallax() {
  if (parallaxMediaQuery.matches) {
    parallaxElements.forEach((element) => {
      element.style.setProperty('--parallax-offset', '0px');
    });
    parallaxTicking = false;
    return;
  }

  const viewportHeight = window.innerHeight;

  parallaxElements.forEach((element) => {
    const speed = Number(element.dataset.parallaxSpeed) || 0.1;
    const rect = element.getBoundingClientRect();
    const elementCenter = rect.top + (rect.height / 2);
    const viewportCenter = viewportHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    const normalizedDistance = distanceFromCenter / viewportHeight;
    const offset = Math.max(-48, Math.min(48, normalizedDistance * speed * -180));

    element.style.setProperty('--parallax-offset', `${offset.toFixed(2)}px`);
  });

  parallaxTicking = false;
}

function requestParallaxUpdate() {
  if (!parallaxTicking) {
    window.requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
}

if (parallaxElements.length > 0) {
  requestParallaxUpdate();

  window.addEventListener('scroll', requestParallaxUpdate, { passive: true });
  window.addEventListener('resize', requestParallaxUpdate);

  if (typeof parallaxMediaQuery.addEventListener === 'function') {
    parallaxMediaQuery.addEventListener('change', requestParallaxUpdate);
  } else if (typeof parallaxMediaQuery.addListener === 'function') {
    parallaxMediaQuery.addListener(requestParallaxUpdate);
  }
}
