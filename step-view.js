/**
 * step-view.js
 * Progressive-enhancement pagination: turns a lesson/hub page's
 * .page-header + .section sequence into one-screen-at-a-time navigation
 * with Prev/Next controls and a step counter. Without this script (or if
 * it fails), the page reads exactly as before — full continuous scroll.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var steps = Array.prototype.filter.call(document.body.children, function (el) {
      return el.classList && (el.classList.contains('page-header') || el.classList.contains('section'));
    });
    if (steps.length < 2) return;

    var current = 0;
    if (location.hash) {
      var hashId = location.hash.slice(1);
      steps.forEach(function (s, i) { if (s.id === hashId) current = i; });
    }

    var bar = document.createElement('div');
    bar.className = 'step-bar';
    bar.innerHTML =
      '<button type="button" class="step-btn step-prev">← Back</button>' +
      '<span class="step-count"></span>' +
      '<button type="button" class="step-btn step-next">Next →</button>';
    steps[0].parentNode.insertBefore(bar, steps[0]);

    var prevBtn = bar.querySelector('.step-prev');
    var nextBtn = bar.querySelector('.step-next');
    var countEl = bar.querySelector('.step-count');
    var subStageLinks = document.querySelectorAll('.nav-sub-step[data-stage]');
    var contentIdx = -1;
    steps.forEach(function (s, i) { if (s.id === 'content') contentIdx = i; });

    function labelFor(el) {
      var h = el.querySelector('h1, h2');
      return h ? h.textContent.trim() : '';
    }

    function render(scrollToTop) {
      steps.forEach(function (el, i) {
        el.classList.toggle('step-hidden', i !== current);
      });
      var el = steps[current];
      var label = labelFor(el);
      countEl.textContent = 'Step ' + (current + 1) + ' of ' + steps.length + (label ? ' — ' + label : '');
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === steps.length - 1;
      if (subStageLinks.length) {
        var stageHash = null;
        if (el.id === 'prework' || el.id === 'content') {
          stageHash = '#' + el.id;
        } else if (contentIdx !== -1 && current > contentIdx) {
          stageHash = '#content';
        }
        subStageLinks.forEach(function (a) {
          var on = stageHash !== null && a.getAttribute('data-stage') === stageHash;
          a.classList.toggle('active', on);
          a.setAttribute('aria-current', on ? 'true' : '');
        });
      }
      if (scrollToTop) {
        window.scrollTo(0, 0);
      }
    }

    // User-initiated navigation (button clicks, and later the jump pills /
    // view-all exit added in Tasks 5-6): write a real history entry so the
    // browser's own Back/Forward can step through it. hashchange (fired when
    // Back/Forward already moved the URL) must NOT write history again here
    // — that's what caused the original bug.
    function goToStep(index) {
      if (index < 0 || index >= steps.length) return;
      current = index;
      var el = steps[current];
      if (el.id) history.pushState(null, '', '#' + el.id);
      render(true);
    }

    prevBtn.addEventListener('click', function () {
      goToStep(current - 1);
    });
    nextBtn.addEventListener('click', function () {
      goToStep(current + 1);
    });
    window.addEventListener('hashchange', function () {
      var hashId = location.hash.slice(1);
      var idx = -1;
      if (hashId === '') {
        idx = 0;
      } else {
        steps.forEach(function (s, i) { if (s.id === hashId) idx = i; });
      }
      if (idx !== -1 && idx !== current) { current = idx; render(true); }
    });

    render(false);
  });
})();
