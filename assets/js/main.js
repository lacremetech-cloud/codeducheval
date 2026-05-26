/* ============================================================
   LE CODE DU CHEVAL — Interactions
   ============================================================ */

(function () {
  'use strict';

  // ---------- Header scroll state ----------
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ---------- FAQ : close others when one opens ----------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.removeAttribute('open');
        });
      }
    });
  });

  // ---------- Scroll-reveal via IntersectionObserver ----------
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Auto-tag elements for scroll-reveal ----------
  // Add .reveal to common content blocks so animations work without
  // touching the HTML for every section.
  const autoRevealSelectors = [
    '.section-title',
    '.section-lede',
    '.section-foot',
    '.cards .card',
    '.method-step',
    '.offer',
    '.minicours-card',
    '.gallery-item',
    '.testimonial',
    '.faq-item',
    '.pullquote',
    '.story-text > p',
    '.eye-quote',
    '.parallax-title',
    '.parallax-lede'
  ];
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    autoRevealSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.classList.contains('reveal')) {
          el.classList.add('reveal');
          // Cascade delay for siblings in same parent
          const siblings = el.parentElement
            ? Array.from(el.parentElement.querySelectorAll(sel))
            : [];
          const idx = siblings.indexOf(el);
          if (idx >= 1 && idx <= 3) {
            el.classList.add(`reveal-delay-${idx}`);
          }
        }
        io2.observe(el);
      });
    });
  }

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
