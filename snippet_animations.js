/**
 * snippet_animations.js
 * Scroll reveal animations + animated hero orb injection.
 * No external libraries required — vanilla JS only.
 */

(function () {
  'use strict';

  /* ============================================================
     1. Inject Hero Orbs
     ============================================================ */
  function injectHeroOrbs() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    // Create two orb divs and prepend them so they sit behind content
    var orb1 = document.createElement('div');
    orb1.className = 'hero-orb';
    orb1.setAttribute('aria-hidden', 'true');

    var orb2 = document.createElement('div');
    orb2.className = 'hero-orb';
    orb2.setAttribute('aria-hidden', 'true');

    // Insert as first children (CSS nth-child targets them by position)
    hero.insertBefore(orb2, hero.firstChild);
    hero.insertBefore(orb1, hero.firstChild);
  }

  /* ============================================================
     2. Add Reveal Classes to Target Elements
     ============================================================ */
  function addRevealClasses() {
    // Selectors that get standard fade-up reveal
    var revealSelectors = [
      '.service-card',
      '.process-step',
      '.testimonial-card',
      '.faq-item',
      '.pricing-card',
      '.section-header',
    ];

    // Selectors that get scale reveal
    var revealScaleSelectors = [
      '.stat-box',
      '.step-number',
    ];

    revealSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal');
      });
    });

    revealScaleSelectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.classList.add('reveal-scale');
      });
    });
  }

  /* ============================================================
     3. IntersectionObserver — add `visible` when in viewport
     ============================================================ */
  function initScrollReveal() {
    // Collect all elements that carry any reveal class
    var targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

    if (!targets.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once revealed — animation runs once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ============================================================
     4. Bootstrap on DOMContentLoaded
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    // Step 1: inject hero orbs into .hero
    injectHeroOrbs();

    // Step 2: stamp reveal classes onto existing DOM elements
    addRevealClasses();

    // Step 3: start observing — all elements with reveal classes
    //         (including those just stamped above) are now watched
    initScrollReveal();
  });
})();
