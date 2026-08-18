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

    function labelFor(el) {
      var h = el.querySelector('h1, h2');
      return h ? h.textContent.trim() : '';
    }

    function render(isNavigation) {
      steps.forEach(function (el, i) {
        el.classList.toggle('step-hidden', i !== current);
      });
      var el = steps[current];
      var label = labelFor(el);
      countEl.textContent = 'Step ' + (current + 1) + ' of ' + steps.length + (label ? ' — ' + label : '');
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current === steps.length - 1;
      if (subStageLinks.length) {
        var stageHash = (el.id === 'prework' || el.id === 'content') ? '#' + el.id : '#content';
        subStageLinks.forEach(function (a) {
          var on = a.getAttribute('data-stage') === stageHash;
          a.classList.toggle('active', on);
          a.setAttribute('aria-current', on ? 'true' : '');
        });
      }
      if (isNavigation) {
        if (el.id) history.replaceState(null, '', '#' + el.id);
        bar.scrollIntoView({ block: 'start' });
      }
    }

    prevBtn.addEventListener('click', function () {
      if (current > 0) { current--; render(true); }
    });
    nextBtn.addEventListener('click', function () {
      if (current < steps.length - 1) { current++; render(true); }
    });

    render(false);
  });
})();
