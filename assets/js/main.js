/* ============================================================
   LE CODE DU CHEVAL — Interactions
   ============================================================ */

(function () {
  'use strict';

  // ---------- Header scroll state ----------
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 20) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
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

  // ---------- Video placeholder click ----------
  const videoPlay = document.querySelector('.video-play');
  if (videoPlay) {
    videoPlay.addEventListener('click', () => {
      // TODO : remplacer par l'embed YouTube / Vimeo / Loom de la VSL Catherine
      console.info('TODO — Brancher la VSL Catherine ici (YouTube / Vimeo embed).');
    });
  }

  // ---------- Year in footer ----------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
