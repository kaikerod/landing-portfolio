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
const projectsSection = document.getElementById('projetos');
const projectsViewport = document.querySelector('.projects__viewport');
const projectCards = Array.from(document.querySelectorAll('.project-card'));
const scrollbarTrack = document.querySelector('.projects__scrollbar');
const scrollbarThumb = document.querySelector('.projects__scrollbar-thumb');
const prevProjectButton = document.querySelector('[data-project-direction="prev"]');
const nextProjectButton = document.querySelector('[data-project-direction="next"]');
const projectStatusCurrent = document.querySelector('.projects__status-current');
const projectStatusTotal = document.querySelector('.projects__status-total');

let activeProjectIndex = 0;
let isProgrammaticScroll = false;
let programmaticScrollTimeout = null;

function getCardTitle(card) {
  return card.querySelector('.project-card__title')?.textContent?.trim() || 'project';
}

function formatProjectNumber(num) {
  return String(num).padStart(2, '0');
}

function getProjectOffset(card) {
  if (!projectsViewport) return 0;
  const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;
  if (maxScroll <= 0) return 0;

  const centeredOffset = (projectsViewport.clientWidth - card.offsetWidth) / 2;
  const target = card.offsetLeft - centeredOffset;
  return Math.max(0, Math.min(maxScroll, target));
}

function getClosestProjectIndex() {
  if (!projectsViewport || projectCards.length === 0) return 0;

  const viewportCenter = projectsViewport.scrollLeft + (projectsViewport.clientWidth / 2);
  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  projectCards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
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
  const scrollProgress = Math.max(0, Math.min(1, projectsViewport.scrollLeft / maxScroll));
  const thumbLeft = scrollProgress * (trackWidth - thumbWidth);

  scrollbarThumb.style.width = `${thumbWidth}px`;
  scrollbarThumb.style.transform = `translate3d(${thumbLeft}px, 0, 0)`;
}

function updateProjectCarousel(index = activeProjectIndex) {
  if (!projectsViewport || projectCards.length === 0) return;

  activeProjectIndex = Math.max(0, Math.min(index, projectCards.length - 1));

  projectCards.forEach((card, cardIndex) => {
    const isActive = cardIndex === activeProjectIndex;
    card.classList.toggle('is-active', isActive);
    if (isActive) {
      card.setAttribute('aria-current', 'true');
    } else {
      card.removeAttribute('aria-current');
    }
    card.setAttribute(
      'aria-label',
      `${formatProjectNumber(cardIndex + 1)} of ${formatProjectNumber(projectCards.length)}: ${getCardTitle(card)}`
    );
  });

  if (projectStatusCurrent) {
    projectStatusCurrent.textContent = formatProjectNumber(activeProjectIndex + 1);
  }

  if (projectStatusTotal) {
    projectStatusTotal.textContent = formatProjectNumber(projectCards.length);
  }

  if (prevProjectButton) {
    prevProjectButton.disabled = activeProjectIndex === 0;
  }

  if (nextProjectButton) {
    nextProjectButton.disabled = activeProjectIndex === projectCards.length - 1;
  }

  updateScrollbar();
}

function scrollToProject(index) {
  if (!projectsViewport || projectCards.length === 0) return;

  const nextIndex = Math.max(0, Math.min(index, projectCards.length - 1));
  const targetCard = projectCards[nextIndex];
  const targetLeft = getProjectOffset(targetCard);

  isProgrammaticScroll = true;
  if (programmaticScrollTimeout) {
    clearTimeout(programmaticScrollTimeout);
  }

  updateProjectCarousel(nextIndex);

  projectsViewport.scrollTo({
    left: targetLeft,
    behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
  });

  const unlockScroll = () => {
    isProgrammaticScroll = false;
    programmaticScrollTimeout = null;
    projectsViewport.removeEventListener('scrollend', unlockScroll);
  };

  if ('onscrollend' in window) {
    projectsViewport.addEventListener('scrollend', unlockScroll, { once: true });
  }
  programmaticScrollTimeout = setTimeout(() => {
    unlockScroll();
  }, reduceMotionQuery.matches ? 50 : 500);
}

// Keyboard navigation
projectsViewport?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    pauseAutoScrollTemporarily();
    scrollToProject(activeProjectIndex - 1);
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    pauseAutoScrollTemporarily();
    scrollToProject(activeProjectIndex + 1);
  }

  if (event.key === 'Home') {
    event.preventDefault();
    pauseAutoScrollTemporarily();
    scrollToProject(0);
  }

  if (event.key === 'End') {
    event.preventDefault();
    pauseAutoScrollTemporarily();
    scrollToProject(projectCards.length - 1);
  }
});

// Navigation buttons
prevProjectButton?.addEventListener('click', () => {
  pauseAutoScrollTemporarily();
  scrollToProject(activeProjectIndex - 1);
});

nextProjectButton?.addEventListener('click', () => {
  pauseAutoScrollTemporarily();
  scrollToProject(activeProjectIndex + 1);
});

// Viewport scroll listener
let carouselTicking = false;

projectsViewport?.addEventListener('scroll', () => {
  if (carouselTicking) return;

  window.requestAnimationFrame(() => {
    if (!isProgrammaticScroll && !isViewportDragging && !isDraggingThumb) {
      updateProjectCarousel(getClosestProjectIndex());
    } else {
      updateScrollbar();
    }
    carouselTicking = false;
  });

  carouselTicking = true;
}, { passive: true });

// ===== VIEWPORT DRAG-TO-SCROLL (MOUSE) =====
let isViewportDragging = false;
let hasDraggedViewport = false;
let dragStartX = 0;
let dragStartScrollLeft = 0;
let dragPointerId = null;
let preventCardClick = false;

projectsViewport?.addEventListener('pointerdown', (e) => {
  if (e.pointerType === 'touch') return;
  if (e.button !== 0) return;

  isViewportDragging = true;
  hasDraggedViewport = false;
  dragPointerId = e.pointerId;
  dragStartX = e.clientX;
  dragStartScrollLeft = projectsViewport.scrollLeft;
  pauseAutoScrollTemporarily();
});

window.addEventListener('pointermove', (e) => {
  if (!isViewportDragging || !projectsViewport) return;

  const diffX = e.clientX - dragStartX;
  if (!hasDraggedViewport && Math.abs(diffX) > 6) {
    hasDraggedViewport = true;
    preventCardClick = true;
    projectsViewport.classList.add('is-dragging');
    if (dragPointerId !== null) {
      try {
        projectsViewport.setPointerCapture(dragPointerId);
      } catch (_) {}
    }
  }

  if (hasDraggedViewport) {
    projectsViewport.scrollLeft = dragStartScrollLeft - diffX;
  }
});

function endViewportDrag(e) {
  if (!isViewportDragging) return;
  isViewportDragging = false;

  if (projectsViewport) {
    projectsViewport.classList.remove('is-dragging');
    if (dragPointerId !== null) {
      try {
        projectsViewport.releasePointerCapture(dragPointerId);
      } catch (_) {}
    }
  }
  dragPointerId = null;

  if (hasDraggedViewport) {
    scrollToProject(getClosestProjectIndex());
    setTimeout(() => {
      preventCardClick = false;
    }, 50);
  } else {
    preventCardClick = false;
  }
}

window.addEventListener('pointerup', endViewportDrag);
window.addEventListener('pointercancel', endViewportDrag);

// Click to focus card
projectCards.forEach((card, index) => {
  card.addEventListener('click', (e) => {
    if (preventCardClick) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (!e.target.closest('a, button')) {
      scrollToProject(index);
      pauseAutoScrollTemporarily();
    }
  });
});

// ===== SCROLLBAR DRAG & SEEK =====
let isDraggingThumb = false;
let thumbDragStartX = 0;
let thumbDragStartScrollLeft = 0;
let wasDraggingThumb = false;

scrollbarThumb?.addEventListener('pointerdown', (e) => {
  if (e.button !== 0) return;
  e.stopPropagation();
  e.preventDefault();

  pauseAutoScrollTemporarily();
  isDraggingThumb = true;
  wasDraggingThumb = true;
  thumbDragStartX = e.clientX;
  thumbDragStartScrollLeft = projectsViewport.scrollLeft;
  scrollbarThumb.style.transition = 'none';
  scrollbarThumb.setPointerCapture(e.pointerId);
});

scrollbarThumb?.addEventListener('pointermove', (e) => {
  if (!isDraggingThumb || !projectsViewport || !scrollbarTrack) return;

  const trackWidth = scrollbarTrack.clientWidth;
  const thumbWidth = scrollbarThumb.offsetWidth;
  const availableTrack = trackWidth - thumbWidth;
  if (availableTrack <= 0) return;

  const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;
  const deltaX = e.clientX - thumbDragStartX;
  const deltaRatio = deltaX / availableTrack;

  projectsViewport.scrollLeft = Math.max(0, Math.min(maxScroll, thumbDragStartScrollLeft + deltaRatio * maxScroll));
});

function endThumbDrag() {
  if (isDraggingThumb) {
    isDraggingThumb = false;
    if (scrollbarThumb) {
      scrollbarThumb.style.transition = '';
    }
    scrollToProject(getClosestProjectIndex());
    setTimeout(() => {
      wasDraggingThumb = false;
    }, 100);
  }
}

scrollbarThumb?.addEventListener('pointerup', endThumbDrag);
scrollbarThumb?.addEventListener('pointercancel', endThumbDrag);

// Scrollbar click-to-seek
scrollbarTrack?.addEventListener('click', (e) => {
  if (!projectsViewport || wasDraggingThumb) return;
  if (e.target === scrollbarThumb) return;

  pauseAutoScrollTemporarily();
  const rect = scrollbarTrack.getBoundingClientRect();
  const thumbWidth = scrollbarThumb ? scrollbarThumb.offsetWidth : 40;
  const trackWidth = rect.width - thumbWidth;
  if (trackWidth <= 0) return;

  const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left - thumbWidth / 2) / trackWidth));
  const maxScroll = projectsViewport.scrollWidth - projectsViewport.clientWidth;

  projectsViewport.scrollTo({
    left: clickRatio * maxScroll,
    behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
  });
});

window.addEventListener('resize', () => {
  updateScrollbar();
  const targetCard = projectCards[activeProjectIndex];
  if (targetCard) {
    projectsViewport.scrollLeft = getProjectOffset(targetCard);
  }
});

// ===== CAROUSEL AUTO-SCROLL =====
let autoScrollTimer = null;
let autoScrollResumeTimeout = null;
let carouselInView = false;
const AUTO_SCROLL_DELAY = 4500;

function startAutoScroll() {
  if (reduceMotionQuery.matches || document.hidden || !carouselInView || projectCards.length < 2) return;
  stopAutoScroll();
  autoScrollTimer = setInterval(() => {
    const nextIndex = (activeProjectIndex + 1) % projectCards.length;
    scrollToProject(nextIndex);
  }, AUTO_SCROLL_DELAY);
}

function stopAutoScroll() {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }
  if (autoScrollResumeTimeout) {
    clearTimeout(autoScrollResumeTimeout);
    autoScrollResumeTimeout = null;
  }
}

function pauseAutoScrollTemporarily(resumeDelay = 6000) {
  stopAutoScroll();
  if (!carouselInView || document.hidden || reduceMotionQuery.matches) return;
  autoScrollResumeTimeout = setTimeout(() => {
    startAutoScroll();
  }, resumeDelay);
}

// Pause when hover/focus is anywhere in the projects section
projectsSection?.addEventListener('mouseenter', stopAutoScroll);
projectsSection?.addEventListener('mouseleave', () => {
  if (carouselInView) startAutoScroll();
});
projectsSection?.addEventListener('focusin', stopAutoScroll);
projectsSection?.addEventListener('focusout', (event) => {
  if (!projectsSection.contains(event.relatedTarget) && carouselInView) {
    startAutoScroll();
  }
});

// Interaction handling for touch & wheel
projectsViewport?.addEventListener('touchstart', () => pauseAutoScrollTemporarily(6000), { passive: true });
projectsViewport?.addEventListener('wheel', () => pauseAutoScrollTemporarily(6000), { passive: true });

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopAutoScroll();
  } else if (carouselInView) {
    startAutoScroll();
  }
});

if (typeof reduceMotionQuery.addEventListener === 'function') {
  reduceMotionQuery.addEventListener('change', () => {
    if (reduceMotionQuery.matches) {
      stopAutoScroll();
    } else {
      revealElements.forEach(revealElement);
      if (carouselInView) startAutoScroll();
    }
  });
} else if (typeof reduceMotionQuery.addListener === 'function') {
  reduceMotionQuery.addListener(() => {
    if (reduceMotionQuery.matches) {
      stopAutoScroll();
    } else {
      revealElements.forEach(revealElement);
      if (carouselInView) startAutoScroll();
    }
  });
}

if (projectCards.length > 0) {
  updateProjectCarousel(0);

  if ('IntersectionObserver' in window && projectsSection) {
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
      threshold: 0.2
    });

    carouselObserver.observe(projectsSection);
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
