/* shared.js — STL Logistics common behaviour */
(function () {
  'use strict';

  /* --- Nav scroll --- */
  var nav = document.getElementById('nav');
  function syncNav() {
    if (!nav.classList.contains('nav-solid')) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  }
  window.addEventListener('scroll', syncNav, { passive: true });
  syncNav();

  /* --- Mobile nav --- */
  var toggle    = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  toggle.addEventListener('click', function () {
    var opening = !mobileNav.classList.contains('open');
    mobileNav.classList.toggle('open', opening);
    toggle.classList.toggle('open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    document.body.style.overflow = opening ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* --- Dropdown nav with grace-period on hide --- */
  document.querySelectorAll('.nav-item').forEach(function (item) {
    var dropdown = item.querySelector('.nav-dropdown');
    if (!dropdown) return;
    var timer;
    item.addEventListener('mouseenter', function () {
      clearTimeout(timer);
      dropdown.classList.add('is-open');
    });
    item.addEventListener('mouseleave', function () {
      timer = setTimeout(function () {
        dropdown.classList.remove('is-open');
      }, 150);
    });
  });

  /* --- Back to top --- */
  var btt = document.getElementById('btt');
  window.addEventListener('scroll', function () {
    btt.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  btt.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

})();
