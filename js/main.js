/* =============================================================
   AHS ZONE — main.js
   Minimal, dependency-free JavaScript.
   Modules:
     1. Mobile navigation toggle
     2. Scroll-reveal (IntersectionObserver)
     3. Contact form (Formspree with mailto fallback)
     4. Footer year
   ============================================================= */
(function () {
  'use strict';

  /* ---------- 1. MOBILE NAVIGATION ---------- */
  function initMobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setOpen(!menu.classList.contains('open'));
    });

    // Close the drawer after tapping any link inside it
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    // Close on Escape for keyboard users
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ---------- 2. SCROLL REVEAL ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    // If the browser lacks IntersectionObserver, just show everything.
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 3. CONTACT FORM ---------- */
  function initContactForm() {
    var form = document.getElementById('consultForm');
    if (!form) return;
    var note = document.getElementById('formNote');
    var btn = form.querySelector('button[type="submit"]');
    var EMAIL = 'ahszone.info@gmail.com';

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // No real Formspree endpoint yet → open the visitor's mail client.
      if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
        var data = new FormData(form);
        var subject = encodeURIComponent('AHS Zone inquiry — ' + (data.get('name') || 'New lead'));
        var body = encodeURIComponent(
          'Name: ' + data.get('name') + '\n' +
          'School: ' + data.get('school') + '\n' +
          'Email: ' + data.get('email') + '\n\n' +
          data.get('message')
        );
        window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
        note.textContent = 'Opening your email app to send to ' + EMAIL + '…';
        return;
      }

      // Real endpoint → submit via AJAX.
      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = 'Sending…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (res) {
          if (res.ok) {
            note.textContent = 'Received. UniBridge Education will be in touch within two business days.';
            form.reset();
          } else {
            note.textContent = 'Something went wrong. Please email ' + EMAIL + ' directly.';
          }
        })
        .catch(function () {
          note.textContent = 'Network error. Please email ' + EMAIL + ' directly.';
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = original;
        });
    });
  }

  /* ---------- 4. FOOTER YEAR ---------- */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- BOOT ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initReveal();
    initContactForm();
    initYear();
  });
})();
