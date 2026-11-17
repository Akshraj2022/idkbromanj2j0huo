/**
 * ERITO — STANDALONE JAVASCRIPT
 * Pure vanilla JavaScript without external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initShareModal();
  initScrollAnimations();
  initCardTilt();
});

/**
 * 1. Social Share Modal Management
 */
function initShareModal() {
  const ctaBtn = document.getElementById('whatsapp-cta-btn');
  const modal = document.getElementById('share-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const doneBtn = document.getElementById('modal-done-btn');

  if (!modal || !ctaBtn) return;

  function openModal() {
    modal.hidden = false;
    // Trigger transition next frame
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
    });
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.hidden = true;
      if (ctaBtn) ctaBtn.focus();
    }, 250);
  }

  // Open modal on WhatsApp CTA click
  ctaBtn.addEventListener('click', () => {
    openModal();
  });

  // Close on 'X' or 'Done' button click
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn) doneBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
}

/**
 * 2. IntersectionObserver for Scroll Animations
 */
function initScrollAnimations() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeElements = document.querySelectorAll('.fade-up');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    fadeElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.transitionDelay = `${delay}ms`;
          }
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  fadeElements.forEach((el) => observer.observe(el));
}

/**
 * 3. Subtle 3D Card Hover & Tilt
 */
function initCardTilt() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const cards = document.querySelectorAll('.card-visual-wrapper');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
