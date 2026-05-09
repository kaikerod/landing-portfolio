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

// ===== PROJECT CAROUSEL =====
const projectsViewport = document.querySelector('.projects__viewport');
const projectsTrack = document.querySelector('.projects__grid');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const carouselPrevButton = document.querySelector('[data-carousel-prev]');
const carouselNextButton = document.querySelector('[data-carousel-next]');
const carouselCurrent = document.querySelector('[data-carousel-current]');
const carouselTotal = document.querySelector('[data-carousel-total]');
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function getCardTitle(card) {
  return card.querySelector('.project-card__title')?.textContent?.trim() || 'project';
}

function formatProjectIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function getProjectOffset(card) {
  return card.offsetLeft - (projectsTrack?.offsetLeft || 0);
}

function getClosestProjectIndex() {
  if (!projectsViewport || projectCards.length === 0) return 0;

  const viewportCenter = projectsViewport.scrollLeft + (projectsViewport.clientWidth / 2);
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  projectCards.forEach((card, index) => {
    const cardCenter = getProjectOffset(card) + (card.offsetWidth / 2);
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function updateProjectCarousel(index = getClosestProjectIndex()) {
  if (!projectsViewport || projectCards.length === 0) return;

  const activeIndex = Math.max(0, Math.min(index, projectCards.length - 1));

  projectCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === activeIndex;
    card.classList.toggle('is-active', isActive);
    card.setAttribute('aria-current', String(isActive));
    card.setAttribute(
      'aria-label',
      `${formatProjectIndex(cardIndex)} of ${formatProjectIndex(projectCards.length - 1)}: ${getCardTitle(card)}`
    );
  });

  if (carouselCurrent) {
    carouselCurrent.textContent = formatProjectIndex(activeIndex);
  }

  if (carouselPrevButton) {
    carouselPrevButton.disabled = activeIndex === 0;
  }

  if (carouselNextButton) {
    carouselNextButton.disabled = activeIndex === projectCards.length - 1;
  }
}

function scrollToProject(index) {
  if (!projectsViewport || projectCards.length === 0) return;

  const nextIndex = Math.max(0, Math.min(index, projectCards.length - 1));
  const targetCard = projectCards[nextIndex];
  const targetLeft = getProjectOffset(targetCard) - ((projectsViewport.clientWidth - targetCard.offsetWidth) / 2);

  projectsViewport.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
  });

  updateProjectCarousel(nextIndex);
}

if (carouselTotal) {
  carouselTotal.textContent = formatProjectIndex(projectCards.length - 1);
}

carouselPrevButton?.addEventListener('click', () => {
  scrollToProject(getClosestProjectIndex() - 1);
});

carouselNextButton?.addEventListener('click', () => {
  scrollToProject(getClosestProjectIndex() + 1);
});

projectsViewport?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    scrollToProject(getClosestProjectIndex() - 1);
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    scrollToProject(getClosestProjectIndex() + 1);
  }

  if (event.key === 'Home') {
    event.preventDefault();
    scrollToProject(0);
  }

  if (event.key === 'End') {
    event.preventDefault();
    scrollToProject(projectCards.length - 1);
  }
});

let carouselTicking = false;

projectsViewport?.addEventListener('scroll', () => {
  if (carouselTicking) return;

  window.requestAnimationFrame(() => {
    updateProjectCarousel();
    carouselTicking = false;
  });

  carouselTicking = true;
}, { passive: true });

window.addEventListener('resize', () => {
  updateProjectCarousel();
});

if (projectCards.length > 0) {
  updateProjectCarousel(0);
}

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
