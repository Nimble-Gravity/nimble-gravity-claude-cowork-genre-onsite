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
      '<div class="step-crumb"><span class="step-crumb-text"></span></div>' +
      '<div class="step-nav">' +
        '<button type="button" class="step-btn step-prev">← Back</button>' +
        '<span class="step-count"></span>' +
        '<button type="button" class="step-btn step-next">Next →</button>' +
      '</div>';
    steps[0].parentNode.insertBefore(bar, steps[0]);

    var prevBtn = bar.querySelector('.step-prev');
    var nextBtn = bar.querySelector('.step-next');
    var countEl = bar.querySelector('.step-count');
    var crumbEl = bar.querySelector('.step-crumb');
    var crumbTextEl = bar.querySelector('.step-crumb-text');
    var subStageLinks = document.querySelectorAll('.nav-sub-step[data-stage]');
    var contentIdx = -1;
    steps.forEach(function (s, i) { if (s.id === 'content') contentIdx = i; });

    // Hub quick-jump: mirror nav.js's Pre-work/Workshop-content links (only
    // present on hub pages) as pills inside the step bar, which — unlike
    // nav.js's own .nav-sub row — has no display:none breakpoint, so this
    // fast path survives below 1024px.
    if (subStageLinks.length) {
      subStageLinks.forEach(function (a) {
        var pill = document.createElement('a');
        pill.href = a.getAttribute('href');
        pill.className = 'step-jump-pill';
        pill.textContent = a.textContent.trim();
        pill.setAttribute('data-stage', a.getAttribute('data-stage'));
        crumbEl.appendChild(pill);
      });
    }
    var jumpPills = crumbEl.querySelectorAll('.step-jump-pill');

    var viewAllBtn = document.createElement('button');
    viewAllBtn.type = 'button';
    viewAllBtn.className = 'step-btn step-viewall';
    viewAllBtn.textContent = 'View all';
    bar.querySelector('.step-nav').appendChild(viewAllBtn);

    var viewingAll = false;
    var stepBeforeViewAll = 0;

    function enterViewAll() {
      viewingAll = true;
      stepBeforeViewAll = current;
      steps.forEach(function (el) { el.classList.remove('step-hidden'); });
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      countEl.textContent = 'Viewing all ' + steps.length + ' steps';
      viewAllBtn.textContent = 'Back to step-by-step';
    }

    // restoreStep: true when the user clicked "Back to step-by-step" (return
    // to wherever they were before View all); false when navigation (a
    // button, a jump pill, or Back/Forward) is about to render its own step
    // right after this call, so re-rendering here would be wasted work.
    function exitViewAll(restoreStep) {
      viewingAll = false;
      viewAllBtn.textContent = 'View all';
      if (restoreStep) {
        current = stepBeforeViewAll;
        render(false);
      }
    }

    viewAllBtn.addEventListener('click', function () {
      if (viewingAll) { exitViewAll(true); } else { enterViewAll(); }
    });

    // Day name comes from nav.js's already-computed active craft label — no
    // second manifest to keep in sync. Lesson/hub title comes from this
    // page's own header. If either is missing (shouldn't happen on an
    // in-scope page), the breadcrumb just shows whichever piece exists.
    var activeCraftEl = document.querySelector('.nav-craft--active .nav-craft-name');
    var dayLabel = activeCraftEl ? activeCraftEl.textContent.trim() : '';
    var pageTitleEl = document.querySelector('.page-header h1');
    var pageTitle = pageTitleEl ? pageTitleEl.textContent.trim() : '';
    crumbTextEl.textContent = [dayLabel, pageTitle].filter(Boolean).join(' · ');

    function labelFor(el) {
      var h = el.querySelector('h1, h2');
      return h ? h.textContent.trim() : '';
    }

    function syncSubStage() {
      var el = steps[current];
      if (!subStageLinks.length) return;
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
      jumpPills.forEach(function (a) {
        var on = stageHash !== null && a.getAttribute('data-stage') === stageHash;
        a.classList.toggle('active', on);
      });
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
      syncSubStage();
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
      if (viewingAll) exitViewAll(false);
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
      if (idx !== -1) {
        var wasViewingAll = viewingAll;
        if (viewingAll) exitViewAll(false);
        if (idx !== current || wasViewingAll) { current = idx; render(true); }
      }
    });

    render(false);
  });
})();
