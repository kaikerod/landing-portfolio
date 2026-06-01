// ===== SCROLL REVEAL =====
const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealElements = document.querySelectorAll('.reveal, .project-card');

function revealElement(element) {
  element.classList.add('revealed');
}

if ('IntersectionObserver' in window && !reduceMotionQuery.matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        const delay = entry.target.classList.contains('project-card')
          ? index * 100
          : 0;

        setTimeout(() => {
          revealElement(entry.target);
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(revealElement);
}

// ===== PROJECT CAROUSEL =====
const projectsViewport = document.querySelector('.projects__viewport');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const scrollbarTrack = document.querySelector('.projects__scrollbar');
const scrollbarThumb = document.querySelector('.projects__scrollbar-thumb');
const prevProjectButton = document.querySelector('[data-project-direction="prev"]');
const nextProjectButton = document.querySelector('[data-project-direction="next"]');
const projectStatusCurrent = document.querySelector('.projects__status-current');
const projectStatusTotal = document.querySelector('.projects__status-total');

function getCardTitle(card) {
  return card.querySelector('.project-card__title')?.textContent?.trim() || 'project';
}

function formatProjectIndex(index) {
  return String(index + 1).padStart(2, '0');
}

function getProjectOffset(card) {
  if (!projectsViewport) return 0;

  const viewportRect = projectsViewport.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const centeredOffset = (projectsViewport.clientWidth - card.offsetWidth) / 2;

  return projectsViewport.scrollLeft + cardRect.left - viewportRect.left - centeredOffset;
}

function getClosestProjectIndex() {
  if (!projectsViewport || projectCards.length === 0) return 0;

  const viewportRect = projectsViewport.getBoundingClientRect();
  const viewportCenter = viewportRect.left + (projectsViewport.clientWidth / 2);
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  projectCards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + (card.offsetWidth / 2);
    const distance = Math.abs(cardCenter - viewportCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
}

function updateScrollbar() {
  if (!projectsViewport || !scrollbarTrack || !scrollbarThumb) return;

  const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;
  if (maxScroll <= 0) {
    scrollbarTrack.style.display = 'none';
    return;
  }
  scrollbarTrack.style.display = '';

  const trackWidth = scrollbarTrack.clientWidth;
  const thumbRatio = projectsViewport.clientWidth / projectsViewport.scrollWidth;
  const thumbWidth = Math.max(40, trackWidth * thumbRatio);
  const scrollProgress = projectsViewport.scrollLeft / maxScroll;
  const thumbLeft = scrollProgress * (trackWidth - thumbWidth);

  scrollbarThumb.style.width = `${thumbWidth}px`;
  scrollbarThumb.style.transform = `translate3d(${thumbLeft}px, 0, 0)`;
}

function updateProjectCarousel(index = getClosestProjectIndex()) {
  if (!projectsViewport || projectCards.length === 0) return;

  const activeIndex = Math.max(0, Math.min(index, projectCards.length - 1));

  projectCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === activeIndex;
    card.classList.toggle('is-active', isActive);
    if (isActive) {
      card.setAttribute('aria-current', 'true');
    } else {
      card.removeAttribute('aria-current');
    }
    card.setAttribute(
      'aria-label',
      `${formatProjectIndex(cardIndex)} of ${formatProjectIndex(projectCards.length - 1)}: ${getCardTitle(card)}`
    );
  });

  if (projectStatusCurrent) {
    projectStatusCurrent.textContent = formatProjectIndex(activeIndex);
  }

  if (projectStatusTotal) {
    projectStatusTotal.textContent = formatProjectIndex(projectCards.length - 1);
  }

  if (prevProjectButton) {
    prevProjectButton.disabled = activeIndex === 0;
  }

  if (nextProjectButton) {
    nextProjectButton.disabled = activeIndex === projectCards.length - 1;
  }

  updateScrollbar();
}

function scrollToProject(index) {
  if (!projectsViewport || projectCards.length === 0) return;

  const nextIndex = Math.max(0, Math.min(index, projectCards.length - 1));
  const targetCard = projectCards[nextIndex];
  
  // Since we added physical padding to the viewport, scrolling to the card's offset 
  // relative to the grid start will perfectly center it.
  const targetLeft = getProjectOffset(targetCard);

  projectsViewport.scrollTo({
    left: targetLeft,
    behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
  });

  updateProjectCarousel(nextIndex);
}

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

prevProjectButton?.addEventListener('click', () => {
  stopAutoScroll();
  scrollToProject(getClosestProjectIndex() - 1);
});

nextProjectButton?.addEventListener('click', () => {
  stopAutoScroll();
  scrollToProject(getClosestProjectIndex() + 1);
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

// Scrollbar click-to-seek
scrollbarTrack?.addEventListener('click', (e) => {
  if (!projectsViewport) return;
  stopAutoScroll();
  const rect = scrollbarTrack.getBoundingClientRect();
  const clickRatio = (e.clientX - rect.left) / rect.width;
  const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;
  projectsViewport.scrollTo({
    left: clickRatio * maxScroll,
    behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
  });
});

// Scrollbar drag
let isDragging = false;

scrollbarThumb?.addEventListener('pointerdown', (e) => {
  stopAutoScroll();
  isDragging = true;
  scrollbarThumb.setPointerCapture(e.pointerId);
  scrollbarThumb.style.transition = 'none';
  e.preventDefault();
});

window.addEventListener('pointermove', (e) => {
  if (!isDragging || !projectsViewport || !scrollbarTrack) return;
  const rect = scrollbarTrack.getBoundingClientRect();
  const thumbWidth = scrollbarThumb.offsetWidth;
  const dragRatio = Math.max(0, Math.min(1, (e.clientX - rect.left - thumbWidth / 2) / (rect.width - thumbWidth)));
  const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;
  projectsViewport.scrollLeft = dragRatio * maxScroll;
});

window.addEventListener('pointerup', () => {
  if (isDragging) {
    isDragging = false;
    if (scrollbarThumb) {
      scrollbarThumb.style.transition = '';
    }
  }
});

window.addEventListener('resize', () => {
  updateProjectCarousel();
});

// ===== CAROUSEL AUTO-SCROLL & CLICK-TO-FOCUS =====
let autoScrollTimer;
let carouselInView = false;
const AUTO_SCROLL_DELAY = 3000;

function startAutoScroll() {
  if (reduceMotionQuery.matches || document.hidden || !carouselInView || projectCards.length < 2) return;
  stopAutoScroll();
  autoScrollTimer = setInterval(() => {
    const currentIndex = getClosestProjectIndex();
    const nextIndex = (currentIndex + 1) % projectCards.length;
    scrollToProject(nextIndex);
  }, AUTO_SCROLL_DELAY);
}

function stopAutoScroll() {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }
}

// Click to focus
projectCards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    // Only scroll if the user didn't click a link or button inside the card
    if (!e.target.closest('a, button')) {
      scrollToProject(index);
      stopAutoScroll();
      // Restart auto-scroll after a longer delay if mouse leaves later
    }
  });
});

// Interaction handling
const carouselContainer = document.querySelector('.projects__carousel');
carouselContainer?.addEventListener('mouseenter', stopAutoScroll);
carouselContainer?.addEventListener('mouseleave', startAutoScroll);
carouselContainer?.addEventListener('focusin', stopAutoScroll);
carouselContainer?.addEventListener('focusout', (event) => {
  if (!carouselContainer.contains(event.relatedTarget)) {
    startAutoScroll();
  }
});

// Stop auto-scroll on manual touch/drag
projectsViewport?.addEventListener('touchstart', stopAutoScroll, { passive: true });
projectsViewport?.addEventListener('mousedown', stopAutoScroll);
projectsViewport?.addEventListener('wheel', stopAutoScroll, { passive: true });

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoScroll();
  } else {
    startAutoScroll();
  }
});

if (typeof reduceMotionQuery.addEventListener === 'function') {
  reduceMotionQuery.addEventListener('change', () => {
    if (reduceMotionQuery.matches) {
      stopAutoScroll();
    } else {
      revealElements.forEach(revealElement);
      startAutoScroll();
    }
  });
} else if (typeof reduceMotionQuery.addListener === 'function') {
  reduceMotionQuery.addListener(() => {
    if (reduceMotionQuery.matches) {
      stopAutoScroll();
    } else {
      revealElements.forEach(revealElement);
      startAutoScroll();
    }
  });
}

if (projectCards.length > 0) {
  updateProjectCarousel(0);

  if ('IntersectionObserver' in window && carouselContainer) {
    const carouselObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        carouselInView = entry.isIntersecting;

        if (carouselInView) {
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
      });
    }, {
      threshold: 0.35
    });

    carouselObserver.observe(carouselContainer);
  } else {
    carouselInView = true;
    startAutoScroll();
  }
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
const parallaxMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

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
    const isMobile = window.innerWidth <= 820;
    const multiplier = isMobile ? -80 : -180; // More subtle on mobile
    const maxOffset = isMobile ? 32 : 48; // Smaller range on mobile
    
    const offset = Math.max(-maxOffset, Math.min(maxOffset, normalizedDistance * speed * multiplier));

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
