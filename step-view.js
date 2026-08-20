/**
 * step-view.js
 * Adds a persistent "you are here" breadcrumb (day + lesson/hub title) to
 * every lesson/hub page, sourced at runtime from nav.js's already-rendered
 * active day label and the page's own <h1> — no second manifest to keep in
 * sync. On hub pages, also mirrors the Pre-work/Workshop-content links as
 * quick-jump pills, since nav.js's own version of those links is hidden
 * below the 1024px breakpoint and this bar isn't. Pages are full
 * continuous scroll; this script never hides or paginates content.
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var pageHeader = document.querySelector('.page-header');
    if (!pageHeader) return;

    var bar = document.createElement('div');
    bar.className = 'step-bar';
    bar.innerHTML = '<div class="step-crumb"><span class="step-crumb-text"></span></div>';
    pageHeader.parentNode.insertBefore(bar, pageHeader);

    var crumbEl = bar.querySelector('.step-crumb');
    var crumbTextEl = bar.querySelector('.step-crumb-text');
    var subStageLinks = document.querySelectorAll('.nav-sub-step[data-stage]');

    // Hub quick-jump: mirror nav.js's Pre-work/Workshop-content links (only
    // present on hub pages) as pills inside the breadcrumb bar, which —
    // unlike nav.js's own .nav-sub row — has no display:none breakpoint, so
    // this fast path survives below 1024px.
    if (subStageLinks.length) {
      subStageLinks.forEach(function (a) {
        var pill = document.createElement('a');
        pill.href = a.getAttribute('href');
        pill.className = 'step-jump-pill';
        pill.textContent = a.textContent.trim();
        crumbEl.appendChild(pill);
      });
    }

    // Day name comes from nav.js's already-computed active craft label — no
    // second manifest to keep in sync. Lesson/hub title comes from this
    // page's own header. If either is missing (shouldn't happen on an
    // in-scope page), the breadcrumb just shows whichever piece exists.
    var activeCraftEl = document.querySelector('.nav-craft--active .nav-craft-name');
    var dayLabel = activeCraftEl ? activeCraftEl.textContent.trim() : '';
    var pageTitleEl = pageHeader.querySelector('h1');
    var pageTitle = pageTitleEl ? pageTitleEl.textContent.trim() : '';
    crumbTextEl.textContent = [dayLabel, pageTitle].filter(Boolean).join(' · ');
  });
})();
