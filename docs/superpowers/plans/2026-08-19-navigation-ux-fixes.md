# Navigation & Wayfinding Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the step-view.js back-button bug, give every lesson/hub page one consolidated day/lesson/step
breadcrumb, keep navigation reachable below the 1024px breakpoint, and add an unpersisted view-all/step-by-step
toggle — all before Day 3 (Thursday) of a live client onsite.

**Architecture:** All changes live in the three shared, site-wide scripts/stylesheet already loaded on every
page (`step-view.js`, `nav.js`, `styles/shared.css`), plus a mechanical deletion in the 8 live-spine lesson
pages. No new files, no build step, no framework — this site has neither (see `CLAUDE.md`).

**Tech Stack:** Plain HTML/CSS/vanilla JS (IIFE modules), Python's `http.server` for local preview via `./serve`.

**Working directory:** This plan executes inside an isolated git worktree at
`/Users/derrikkbroughton/Desktop/DESKTOP/nimble-gravity-claude-cowork-genre-onsite/.claude/worktrees/nav-ux-fixes`
on branch `worktree-nav-ux-fixes`. Every file path below is relative to that directory — run all commands from
there, not from the main checkout.

## Global Constraints

- No test framework exists in this repo and none is being added. "Tests" in this plan are (a) `grep`/`curl`
  structural checks run via Bash against the served site, confirming the code landed correctly and the markup
  is present, and (b) an explicit manual browser checklist for behavior that can only be observed by clicking
  (scrolling, history navigation, animation) — matches the verification approach already used earlier this
  session for the Day 2 content swap.
- CSS: reference existing custom properties only (`var(--teal)`, `var(--tealL)`, `var(--slate)`, `var(--white)`,
  `var(--border)`, etc.) — never a hardcoded hex value that duplicates one (`CLAUDE.md` CSS Conventions).
- Every task's diff must be small enough to `git diff` and read in full before committing, and revertable on
  its own (`git revert` or manual undo) without breaking a later task's prerequisite, per
  `docs/superpowers/specs/2026-08-19-navigation-ux-fixes-design.md`'s risk section.
- Out of scope, do not touch: `.section` boundaries/granularity (entangled with `slides-engine.js`), any
  `localStorage`/persistence for the view-all toggle, retired lesson pages `07,08,10-16`, `control-room/`.
- Live-spine lesson pages in scope for Task 3 (module-strip removal):
  `pages/training/01-what-is-cowork.html`, `02-getting-set-up.html`, `03-first-cowork-session.html`,
  `04-use-cases-by-industry.html`, `05-working-effectively.html`, `06-folder-access-walkthrough.html`,
  `09-anatomy-of-a-skill.html`, `17-governance-snapshot.html`.

---

### Task 1: Fix the step-view.js history bug

**Files:**
- Modify: `step-view.js:43-82` (the `render()` function and its three call sites)

**Interfaces:**
- Produces: `goToStep(index)` — new function later tasks' navigation code (Task 5's jump pills, Task 6's
  view-all exit) will call instead of manipulating `current`/history directly.
- Produces: `render(scrollToTop)` — same name as before, but the parameter now means "scroll to top after
  rendering," not "write history." Later tasks must not reintroduce a `history.replaceState`/`pushState` call
  inside `render()` itself.

- [ ] **Step 1: Confirm the current broken behavior manually**

Run the dev server and reproduce the bug before touching code, so you know what "fixed" looks like:

```bash
cd /Users/derrikkbroughton/Desktop/DESKTOP/nimble-gravity-claude-cowork-genre-onsite/.claude/worktrees/nav-ux-fixes
./serve &
sleep 1
```

Open `http://localhost:8000/pages/training/05-working-effectively.html` in a browser. Click "Next →" three
times (you should be on "Step 4 of 6"). Click the browser's own Back button (not the on-page one).

Expected (current, broken): you leave the lesson page entirely — the browser goes to whatever page was open
before you loaded this lesson, not back to Step 3.

- [ ] **Step 2: Replace `render()` and its call sites**

Find the current block (`step-view.js:43-82`):

```js
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
      if (isNavigation) {
        if (el.id) history.replaceState(null, '', '#' + el.id);
        window.scrollTo(0, 0);
      }
    }

    prevBtn.addEventListener('click', function () {
      if (current > 0) { current--; render(true); }
    });
    nextBtn.addEventListener('click', function () {
      if (current < steps.length - 1) { current++; render(true); }
    });
    window.addEventListener('hashchange', function () {
      var hashId = location.hash.slice(1);
      var idx = -1;
      steps.forEach(function (s, i) { if (s.id === hashId) idx = i; });
      if (idx !== -1) { current = idx; render(true); }
    });

    render(false);
```

Replace it with:

```js
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
      steps.forEach(function (s, i) { if (s.id === hashId) idx = i; });
      if (idx !== -1 && idx !== current) { current = idx; render(true); }
    });

    render(false);
```

- [ ] **Step 3: Structural check**

```bash
grep -n "pushState\|replaceState" step-view.js
```

Expected: exactly one match, `history.pushState(null, '', '#' + el.id);` inside `goToStep`. Zero matches for
`replaceState`.

- [ ] **Step 4: Manual re-verification**

Reload `http://localhost:8000/pages/training/05-working-effectively.html`. Click "Next →" three times. Click
the browser's Back button.

Expected (fixed): lands on Step 3, not ejected from the page. Click Back twice more: Step 2, then Step 1. One
more Back: now you leave the page (correct — you've walked back through every step there was).

Also check the URL hash updates as you click Next/Prev (e.g. `#steer`, `#walk`), and that reloading the page
at a URL with a hash (e.g. `...05-working-effectively.html#walk`) opens directly on that step, matching
existing behavior.

- [ ] **Step 5: Commit**

```bash
git add step-view.js
git commit -m "fix(nav): step-view Back button steps through lesson steps instead of exiting the page"
```

---

### Task 2: Add the day/lesson breadcrumb to the step bar

**Files:**
- Modify: `step-view.js` (the `bar.innerHTML` template and element lookups, right after Task 1's changes)
- Modify: `styles/shared.css:3749-3765` (step-bar layout, restructured to a wrapping flex row)

**Interfaces:**
- Consumes: `nav.js`'s already-rendered `.nav-craft--active .nav-craft-name` element (read-only, no changes to
  `nav.js` in this task) and the page's own `.page-header h1`.
- Produces: `.step-crumb` element (a `<div>` inside `.step-bar`) — Task 5 appends jump pills into it.
- Produces: `.step-nav` element (a `<div>` inside `.step-bar` wrapping Back/count/Next) — Task 6 appends the
  view-all button into it.

- [ ] **Step 1: Update the step bar's HTML template**

In `step-view.js`, find:

```js
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
```

Replace with:

```js
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
```

- [ ] **Step 2: Populate the breadcrumb text**

Immediately after the `contentIdx` computation block (still before `function labelFor`), add:

```js
    // Day name comes from nav.js's already-computed active craft label — no
    // second manifest to keep in sync. Lesson/hub title comes from this
    // page's own header. If either is missing (shouldn't happen on an
    // in-scope page), the breadcrumb just shows whichever piece exists.
    var activeCraftEl = document.querySelector('.nav-craft--active .nav-craft-name');
    var dayLabel = activeCraftEl ? activeCraftEl.textContent.trim() : '';
    var pageTitleEl = document.querySelector('.page-header h1');
    var pageTitle = pageTitleEl ? pageTitleEl.textContent.trim() : '';
    crumbTextEl.textContent = [dayLabel, pageTitle].filter(Boolean).join(' · ');
```

- [ ] **Step 3: Restructure the step-bar CSS**

In `styles/shared.css`, find (`:3749-3765`):

```css
/* ── Step-view pagination (progressive enhancement) ─────────────────── */
.step-hidden { display: none !important; }
/* Sticky top offset tracks nav.js's own rendered height via --nav-h (set in
   nav.js's syncBodyPadding) — the nav is one row on lesson pages and two
   rows (with the sub-row) on hub pages, and also collapses on mobile, so a
   fixed pixel value can't track it. z-index sits one below nav-wrapper's
   z-index:1000 so the nav bar always stacks above it. */
.step-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;
  background:var(--white);border:1px solid var(--border);border-radius:12px;
  padding:10px 18px;margin:0 max(64px, calc((100% - 1280px) / 2)) 20px;
  position:sticky;top:var(--nav-h,85px);z-index:999;transition:top .3s ease;}
.step-btn{background:var(--tealL);color:var(--teal);border:none;border-radius:8px;
  padding:8px 16px;font-weight:600;font-size:14px;cursor:pointer;white-space:nowrap;}
.step-btn:disabled{opacity:.35;cursor:default;}
.step-count{color:var(--slate);font-weight:600;font-size:13.5px;text-align:center;flex:1;}
@media(max-width:1024px){.step-bar{z-index:998;}} /* z-index dropped one below .nav-mobile-overlay's 999 at the hamburger breakpoint so the overlay always wins; top still comes from --nav-h */
@media(max-width:768px){.step-bar{padding:8px 14px;gap:10px;margin-left:24px;margin-right:24px;}.step-count{font-size:12.5px;}} /* matches .section/.page-header's 24px gutter at this breakpoint, not the desktop 64px */
```

Replace with:

```css
/* ── Step-view pagination (progressive enhancement) ─────────────────── */
.step-hidden { display: none !important; }
/* Sticky top offset tracks nav.js's own rendered height via --nav-h (set in
   nav.js's syncBodyPadding) — the nav is one row on lesson pages and two
   rows (with the sub-row) on hub pages, and also collapses on mobile, so a
   fixed pixel value can't track it. z-index sits one below nav-wrapper's
   z-index:1000 so the nav bar always stacks above it. Wraps onto two lines
   below ~768px instead of hiding anything — the breadcrumb (day/lesson/step)
   is the one wayfinding element guaranteed visible at every width. */
.step-bar{display:flex;align-items:center;flex-wrap:wrap;gap:10px 16px;
  background:var(--white);border:1px solid var(--border);border-radius:12px;
  padding:10px 18px;margin:0 max(64px, calc((100% - 1280px) / 2)) 20px;
  position:sticky;top:var(--nav-h,85px);z-index:999;transition:top .3s ease;}
.step-crumb{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-right:auto;min-width:0;}
.step-crumb-text{font-size:13px;font-weight:600;color:var(--slate);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.step-nav{display:flex;align-items:center;gap:16px;flex-shrink:0;}
.step-btn{background:var(--tealL);color:var(--teal);border:none;border-radius:8px;
  padding:8px 16px;font-weight:600;font-size:14px;cursor:pointer;white-space:nowrap;}
.step-btn:disabled{opacity:.35;cursor:default;}
.step-count{color:var(--slate);font-weight:600;font-size:13.5px;text-align:center;}
@media(max-width:1024px){.step-bar{z-index:998;}} /* z-index dropped one below .nav-mobile-overlay's 999 at the hamburger breakpoint so the overlay always wins; top still comes from --nav-h */
@media(max-width:768px){.step-bar{padding:8px 14px;gap:8px 10px;margin-left:24px;margin-right:24px;}.step-count{font-size:12.5px;}.step-crumb-text{max-width:150px;}} /* matches .section/.page-header's 24px gutter at this breakpoint, not the desktop 64px */
```

- [ ] **Step 4: Structural check**

```bash
grep -c "step-crumb\|step-nav" step-view.js
grep -c "\.step-crumb\b" styles/shared.css
```

Expected: first command ≥ 4 (element creation + lookups + population), second ≥ 2 (`.step-crumb` and
`.step-crumb-text` rules).

- [ ] **Step 5: Manual re-verification**

Reload `http://localhost:8000/pages/training/05-working-effectively.html`. Confirm the step bar now reads
something like "Day 2 · Walk a Workflow" on the left and the existing Back/Step-count/Next controls on the
right, on one line at desktop width. Resize the browser narrower (below ~600px) and confirm it wraps to two
lines rather than overlapping or overflowing.

Load `http://localhost:8000/pages/workshops/module-2-workshop.html` (a hub page) and confirm the breadcrumb
shows a sensible day label + hub title there too, not just on lesson pages.

- [ ] **Step 6: Commit**

```bash
git add step-view.js styles/shared.css
git commit -m "feat(nav): add day/lesson breadcrumb to the step bar"
```

---

### Task 3: Remove the redundant `.module-strip` from the 8 live lesson pages

**Files:**
- Modify: `pages/training/01-what-is-cowork.html`, `02-getting-set-up.html`, `03-first-cowork-session.html`,
  `04-use-cases-by-industry.html`, `05-working-effectively.html`, `06-folder-access-walkthrough.html`,
  `09-anatomy-of-a-skill.html`, `17-governance-snapshot.html`

**Interfaces:**
- Consumes: Task 2's breadcrumb (must be live and verified working before this task runs — deleting
  `.module-strip` first would leave a page with no day-level indicator at all for one commit).

`.module-strip` isn't one of `slides-engine.js`'s recognized card classes (`.insight-card`, `.bp-item`,
`.dev-card`, `.tip-trick`/`.tip-box`/`.callout`, `.step-card` — see `DESIGN-SYSTEM.md`), so removing it has no
effect on slide generation.

- [ ] **Step 1: Confirm Task 2 shipped**

```bash
git log --oneline -1 --grep="day/lesson breadcrumb"
```

Expected: shows Task 2's commit. Do not proceed if it doesn't — see Interfaces above.

- [ ] **Step 2: Remove from `pages/training/05-working-effectively.html`**

Find and delete this exact block (verified present as of this plan):

```html
<!-- MODULE PROGRESS -->
<div class="module-strip">
  <span class="ms-label">Day</span>
  <a href="01-what-is-cowork.html" class="ms-item upcoming"><span class="ms-num">1</span>Foundations &amp; Personal Value</a>
  <span class="ms-arrow">›</span>
  <a href="05-working-effectively.html" class="ms-item active"><span class="ms-num">2</span>Skills &amp; Everyday Workflows</a>
  <span class="ms-arrow">›</span>
  <a href="04-use-cases-by-industry.html" class="ms-item upcoming"><span class="ms-num">3</span>Use Cases + Governance</a>
</div>
```

Delete the whole block, including the `<!-- MODULE PROGRESS -->` comment line. Leave one blank line where it
was, consistent with the spacing around the other top-level blocks in the file.

- [ ] **Step 3: Remove from the remaining 7 files, one at a time**

For each of `01-what-is-cowork.html`, `02-getting-set-up.html`, `03-first-cowork-session.html`,
`04-use-cases-by-industry.html`, `06-folder-access-walkthrough.html`, `09-anatomy-of-a-skill.html`,
`17-governance-snapshot.html` — repeat this sequence before moving to the next file:

```bash
grep -n "MODULE PROGRESS\|module-strip" pages/training/<file>.html
```

This prints the exact line range for that file (the block always starts at the `<!-- MODULE PROGRESS -->`
comment and ends at the `</div>` that closes `<div class="module-strip">` — every file follows the same
three-day-pill pattern as the Step 2 example above, just with different `active`/`upcoming` classes and hrefs
for that file's day). Read those lines with the `Read` tool, confirm they match the pattern, then delete the
whole block the same way as Step 2. Do not touch anything else in the file.

- [ ] **Step 4: Structural check — confirm zero remain in the live spine**

```bash
grep -rl "module-strip" pages/training/01-what-is-cowork.html pages/training/02-getting-set-up.html \
  pages/training/03-first-cowork-session.html pages/training/04-use-cases-by-industry.html \
  pages/training/05-working-effectively.html pages/training/06-folder-access-walkthrough.html \
  pages/training/09-anatomy-of-a-skill.html pages/training/17-governance-snapshot.html
```

Expected: no output (no matches). If any file still lists, its block wasn't fully removed — go back to it.

- [ ] **Step 5: Div-balance check on each edited file (catches an unclosed tag from a bad deletion)**

```bash
python3 - <<'EOF'
import re
files = [
    "pages/training/01-what-is-cowork.html", "pages/training/02-getting-set-up.html",
    "pages/training/03-first-cowork-session.html", "pages/training/04-use-cases-by-industry.html",
    "pages/training/05-working-effectively.html", "pages/training/06-folder-access-walkthrough.html",
    "pages/training/09-anatomy-of-a-skill.html", "pages/training/17-governance-snapshot.html",
]
for f in files:
    s = open(f).read()
    opens = len(re.findall(r"<div\b", s))
    closes = len(re.findall(r"</div>", s))
    status = "OK" if opens == closes else "MISMATCH"
    print(f, "opens:", opens, "closes:", closes, status)
EOF
```

Expected: `OK` for every file.

- [ ] **Step 6: Manual spot-check**

Load 2-3 of the edited pages in the browser (e.g. `09-anatomy-of-a-skill.html`, `17-governance-snapshot.html`)
and confirm the page renders normally with the new step-bar breadcrumb doing the day-indicator job the old
pill row used to do, and no visual gap or leftover empty space where `.module-strip` used to sit.

- [ ] **Step 7: Commit**

```bash
git add pages/training/01-what-is-cowork.html pages/training/02-getting-set-up.html \
  pages/training/03-first-cowork-session.html pages/training/04-use-cases-by-industry.html \
  pages/training/05-working-effectively.html pages/training/06-folder-access-walkthrough.html \
  pages/training/09-anatomy-of-a-skill.html pages/training/17-governance-snapshot.html
git commit -m "chore(nav): remove redundant module-strip, superseded by the step-bar breadcrumb"
```

---

### Task 4: Auto-scroll the hamburger overlay to the current page

**Files:**
- Modify: `nav.js:551-580` (the `openMenu()` function)

**Interfaces:** None — fully independent of Tasks 1-3 and 5-6; can run in any order relative to them.

- [ ] **Step 1: Confirm the current gap manually**

At a narrow browser width (<1024px, or resize the window), navigate deep into the page list — e.g. open
`pages/training/17-governance-snapshot.html` — then click the hamburger button.

Expected (current): overlay opens scrolled to the top (Home / Day 1), even though the active page (Day 3 ·
Governance Snapshot) is far down the list.

- [ ] **Step 2: Add the auto-scroll**

In `nav.js`, find (`:551-561`):

```js
  function openMenu() {
    menuOpen = true;
    navEl.classList.add('nav-menu-open');
    overlay.classList.add('nav-overlay-open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');

    // Position overlay top flush with nav bottom
    overlay.style.top = navEl.offsetHeight + 'px';

    // Scroll lock
```

Replace with:

```js
  function openMenu() {
    menuOpen = true;
    navEl.classList.add('nav-menu-open');
    overlay.classList.add('nav-overlay-open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.setAttribute('aria-label', 'Close navigation menu');

    // Position overlay top flush with nav bottom
    overlay.style.top = navEl.offsetHeight + 'px';

    // Land on the current page instead of always opening at the top of a
    // long list — the overlay is the only navigation surface left below the
    // 1024px breakpoint, so orientation matters most here.
    var activeLink = overlay.querySelector('.nav-overlay-page-link.active, .nav-overlay-home.active');
    if (activeLink) {
      activeLink.scrollIntoView({ block: 'center' });
    }

    // Scroll lock
```

- [ ] **Step 3: Structural check**

```bash
grep -n "scrollIntoView" nav.js
```

Expected: one match, inside `openMenu()`.

- [ ] **Step 4: Manual re-verification**

Repeat Step 1's scenario. Expected (fixed): overlay opens already scrolled so "Governance Snapshot" (marked
`.active`) is roughly centered in view, not at the top of the list. Also check the Home page (`isHome`) and a
Day 1 lesson still open correctly (active link near the top in those cases is fine — the point is it lands on
wherever `.active` actually is).

- [ ] **Step 5: Commit**

```bash
git add nav.js
git commit -m "fix(nav): hamburger overlay opens scrolled to the current page"
```

---

### Task 5: Mirror the hub Pre-work/Workshop-content links into the step bar

**Files:**
- Modify: `step-view.js` (subStage sync logic, refactored into a shared function; jump-pill creation)
- Modify: `styles/shared.css` (new `.step-jump-pill` rules, appended — does not change Task 2's rules)

**Interfaces:**
- Consumes: `.step-crumb` element (Task 2) — pills are appended into it.
- Consumes: `subStageLinks` (existing `NodeList` of `.nav-sub-step[data-stage]` elements, only non-empty on hub
  pages since `nav.js` only renders `.nav-sub` there).
- Produces: `syncSubStage()` — extracted from `render()`; Task 6 does not need this, listed for completeness
  since it changes `render()`'s body.

- [ ] **Step 1: Confirm the current gap manually**

At a narrow browser width (<1024px) on `pages/workshops/module-2-workshop.html`, confirm the top nav's
Pre-work/Workshop-content sub-row is not visible (it's hidden by `nav.js`'s `@media(max-width:1024px)` rule)
and there is currently no other way to jump straight to `#content` without either scrolling manually or
clicking Next twice through the step bar.

- [ ] **Step 2: Refactor the subStage-sync block into its own function, and add pill creation**

In `step-view.js`, find the pill-less version of `render()` from Task 1/2 plus the `contentIdx` setup above it:

```js
    var contentIdx = -1;
    steps.forEach(function (s, i) { if (s.id === 'content') contentIdx = i; });
```

Immediately after it (still before `function labelFor`), add the pill-creation block (this runs once at
setup, right after the breadcrumb text is populated in Task 2's Step 2):

```js
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
```

Then find `render()`'s inline subStage block:

```js
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
```

Replace it with a call to a new, extracted function:

```js
      syncSubStage();
```

And define `syncSubStage()` right before `function render(scrollToTop) {`:

```js
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

```

- [ ] **Step 3: Add the pill CSS**

Append to `styles/shared.css`, directly after the block Task 2 wrote (after the `.step-count{...}` /
`@media(max-width:768px)` rules from Task 2's Step 3):

```css
.step-jump-pill{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;
  color:var(--teal);text-decoration:none;background:var(--tealL);border-radius:999px;
  padding:3px 10px;white-space:nowrap;transition:background .15s,color .15s;}
.step-jump-pill:hover{background:var(--teal);color:var(--white);}
.step-jump-pill.active{background:var(--teal);color:var(--white);}
```

- [ ] **Step 4: Structural check**

```bash
grep -n "syncSubStage\|step-jump-pill" step-view.js
grep -c "step-jump-pill" styles/shared.css
```

Expected: `syncSubStage` appears (definition + 1 call site inside `render()`); `step-jump-pill` appears in the
pill-creation block; the CSS count is 3 (base rule, `:hover`, `.active`).

- [ ] **Step 5: Manual re-verification**

Load `pages/workshops/module-2-workshop.html` at a narrow width (<1024px). Confirm two small pills ("Pre-work",
"Workshop content") appear in the step bar next to the breadcrumb text. Click "Workshop content" — confirm it
jumps straight to the `#content` step (the lesson-cards step), and the pill shows an active/highlighted state.
Load a lesson page (not a hub) and confirm no pills render there (since `subStageLinks` is empty on lesson
pages) — the step bar should look like Task 2 left it, just with the pill logic present but inert.

- [ ] **Step 6: Commit**

```bash
git add step-view.js styles/shared.css
git commit -m "feat(nav): mirror hub pre-work/content links into the step bar for narrow viewports"
```

---

### Task 6: Add the unpersisted "View all" / "Back to step-by-step" toggle

**Files:**
- Modify: `step-view.js` (new button, `enterViewAll()`/`exitViewAll()`, integration with `goToStep()` and the
  `hashchange` listener)
- Modify: `styles/shared.css` (new `.step-viewall` rule, appended)

**Interfaces:**
- Consumes: `.step-nav` element (Task 2) — the button is appended into it.
- Consumes: `goToStep(index)` and `render(scrollToTop)` (Task 1).
- This is the last task; nothing later depends on it.

- [ ] **Step 1: Add the button, state, and enter/exit functions**

In `step-view.js`, immediately after the `var jumpPills = ...` line from Task 5, add:

```js
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
```

- [ ] **Step 2: Make navigation exit view-all mode**

Find `goToStep` (from Task 1):

```js
    function goToStep(index) {
      if (index < 0 || index >= steps.length) return;
      current = index;
      var el = steps[current];
      if (el.id) history.pushState(null, '', '#' + el.id);
      render(true);
    }
```

Replace with:

```js
    function goToStep(index) {
      if (index < 0 || index >= steps.length) return;
      if (viewingAll) exitViewAll(false);
      current = index;
      var el = steps[current];
      if (el.id) history.pushState(null, '', '#' + el.id);
      render(true);
    }
```

Find the `hashchange` listener (from Task 1):

```js
    window.addEventListener('hashchange', function () {
      var hashId = location.hash.slice(1);
      var idx = -1;
      steps.forEach(function (s, i) { if (s.id === hashId) idx = i; });
      if (idx !== -1 && idx !== current) { current = idx; render(true); }
    });
```

Replace with:

```js
    window.addEventListener('hashchange', function () {
      var hashId = location.hash.slice(1);
      var idx = -1;
      steps.forEach(function (s, i) { if (s.id === hashId) idx = i; });
      if (idx !== -1) {
        if (viewingAll) exitViewAll(false);
        if (idx !== current) { current = idx; render(true); }
      }
    });
```

(Note: the `idx !== current` check moved inside the `if (idx !== -1)` block so that a jump-pill click while
`viewingAll` is true still exits view-all mode even if `idx` happens to equal whatever `current` was left at.)

- [ ] **Step 3: Add the toggle CSS**

Append to `styles/shared.css`, after Task 5's `.step-jump-pill` rules:

```css
.step-viewall{background:none;color:var(--teal);text-decoration:underline;
  text-underline-offset:2px;padding:8px 4px;}
```

- [ ] **Step 4: Structural check**

```bash
grep -n "viewAllBtn\|enterViewAll\|exitViewAll\|viewingAll" step-view.js
grep -c "step-viewall" styles/shared.css
```

Expected: all four identifiers present with multiple references each (creation, event listener, calls from
`goToStep`/`hashchange`); CSS count is 1.

- [ ] **Step 5: Manual re-verification**

Load a multi-step lesson page. Click "View all" — expected: every step becomes visible on one continuous
scroll, Back/Next buttons gray out (disabled), the counter reads "Viewing all N steps," and the button now
reads "Back to step-by-step." Click it again — expected: returns to exactly the step you were on before
toggling, Back/Next re-enable, pagination resumes normally.

While in "View all" mode, click a hub's jump pill (or, on a lesson page, manually navigate the URL hash) —
expected: view-all mode exits automatically and the page lands on the single step matching that hash, not a
mix of both modes.

Reload the page fresh (no special URL) — expected: always starts in step-by-step mode, never remembers a
previous "View all" choice (this is deliberate — see the design spec).

- [ ] **Step 6: Commit**

```bash
git add step-view.js styles/shared.css
git commit -m "feat(nav): add unpersisted view-all/step-by-step toggle to the step bar"
```

---

## Final full-site verification (after all 6 tasks)

- [ ] **Step 1: Serve and spot-check every page type**

```bash
cd /Users/derrikkbroughton/Desktop/DESKTOP/nimble-gravity-claude-cowork-genre-onsite/.claude/worktrees/nav-ux-fixes
pkill -f "http.server 8000" 2>/dev/null
./serve &
sleep 1
curl -s -o /dev/null -w "lesson: %{http_code}\n" http://localhost:8000/pages/training/05-working-effectively.html
curl -s -o /dev/null -w "hub: %{http_code}\n" http://localhost:8000/pages/workshops/module-2-workshop.html
curl -s -o /dev/null -w "reference (no step-view): %{http_code}\n" http://localhost:8000/pages/workshops/faq.html
curl -s http://localhost:8000/pages/workshops/faq.html | grep -c "step-bar"
```

Expected: all three HTTP checks return 200; the `faq.html` grep returns 0 (confirms reference pages that don't
load `step-view.js` are genuinely untouched, per the design spec's out-of-scope list).

- [ ] **Step 2: Confirm slides still generate**

Open `http://localhost:8000/pages/training/module-2-slides.html` in a browser and confirm the deck still
builds and steps through slides normally — Task 3's `.module-strip` removal and Tasks 2/5/6's step-bar changes
should have zero effect here, since `slides-engine.js` reads `.page-header`/`.section`/recognized card classes,
none of which this plan touches.

- [ ] **Step 3: Full manual walkthrough at 1366×768 and at <1024px**

Set the browser to 1366×768 (matches `day-1-script.md`'s stated test resolution) and walk one full lesson
start to finish: Back-button history (Task 1), breadcrumb visible and correct (Task 2), View all toggle
(Task 6). Then resize below 1024px and repeat on a hub page: hamburger auto-scroll (Task 4), jump pills in the
step bar (Task 5).

- [ ] **Step 4: Stop the dev server**

```bash
pkill -f "http.server 8000" 2>/dev/null
```
