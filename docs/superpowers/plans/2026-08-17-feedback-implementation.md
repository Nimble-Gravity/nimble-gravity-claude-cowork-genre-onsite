# Consolidated Feedback Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the client feedback brief (`genre-microsite-feedback-brief.md`) to the live microsite before Day 1 (Aug 18, 2pm ET): remove data-allowed/not-allowed classification content, flip the M365 connector to its live/read-only status, reframe two "faster" lines to the "check things" value prop, and build a one-step-per-screen pagination layer for lesson and hub pages.

**Architecture:** Static site, no build step. A pre-implementation audit (see below) found that the prior Aug 7 restructure already delivered most of the brief's facilitation-polish asks (verification test, watch-me/now-you framing, silent-work block, real break, OneDrive gotcha, unzip instructions, terminology simplification, use-case canvas, backup-demo plan). This plan only covers the genuine remaining gaps. The new step-view mechanism is a single self-contained component (`step-view.js`, root-level, same IIFE pattern as `nav.js`/`footer.js`) that progressively enhances the existing `.page-header` + `.section` structure already used by `slides-engine.js` — it adds no new page architecture.

**Tech Stack:** Vanilla HTML/CSS/JS, `styles/shared.css` design tokens.

**Spec:** `docs/superpowers/specs/2026-08-17-feedback-implementation-design.md`

## Audit findings (why this plan is short)

Before drafting tasks, every one of the brief's Part 2 items (1–17) was checked against the live site. Already done by the prior restructure — **no task needed**:
- Personalization verification block (item 8 / I9) — `pages/training/03-first-cowork-session.html:224`.
- Watch-me/now-you separation + show-twice (item 13 / I6, I7) — `day-1-script.md:76-102`.
- 5-minute silent-work block (item 13 / I8) — `pages/training/03-first-cowork-session.html:215`.
- Real Day 3 break (item 13 / I20) — `pages/workshops/module-3-workshop.html:139-140`.
- OneDrive/SharePoint gotcha (item 14 / I16) — 6 files, including `facilitator-guide.html:205`.
- Unzip instructions incl. Mac fallback (item 15 / I23) — `pages/workshops/pre-work.html:29-94`.
- Terminology simplification (item 17 / I15) — `pages/training/09-anatomy-of-a-skill.html:62`.
- Use-case canvas, pre-filled before the session (item 12 / I17) — `pages/workshops/pre-work.html:148-162`, `pages/training/04-use-cases-by-industry.html#canvas`.
- Backup-demo path with an explicit trigger (item 12 / I18) — `day-3-script.md:196-197`, `facilitator-guide.html:239-256`.
- Legal-plugin example removal (item 10 / I10) — confirmed zero references remain.
- IT jargon / IT-audience references (item 4 / C5, D2) — zero hits on the live spine.
- Action-before-explanation ordering (item 9 / A1, D3) — baked into the `.step-card` component itself (`.step-do` renders before `.step-why`).

**Genuinely open**, and what this plan covers:
- Item 1 (I3/C1/C2) — one-step-per-screen navigation: **not built anywhere**. Tasks 4–6.
- Item 2 (C4) — data-allowed/not-allowed sections: real hits in `pages/workshops/faq.html` and `pages/workshops/acceptable-use.html`. Task 1.
- Item 5 (I1) — "faster" framing: 2 real hits in `pages/workshops/why-cowork.html` (the `01-what-is-cowork.html` and `03-first-cowork-session.html` hits are already correctly framed or contextually unrelated — verified, no change). Task 3.
- Item 7 (I24/D1) — M365 connector must flip from "not live" to "live, read-only": 5 files still say otherwise. Task 2.
- Item 6 (C2 breadcrumbs/step counter) — delivered as part of the step-view build, Tasks 4–6.
- Item 16 (1366×768 check) — Task 7.
- Item 3/12 governance trim (C3/I19) — already light-touch; only touched by Task 2's connector-status fix.

## Global Constraints

- Claude Cowork only; the audit gap is *managed*, never hidden — don't remove audit-gap disclosure, only data-classification detail (see Task 1 scope note).
- M365 connector: **live, read-only** everywhere it's mentioned — Claude can read mail/calendar/SharePoint/OneDrive via delegated permissions, but cannot send email or write anything back (I24). Do not claim write capability anywhere.
- No sections classifying which data is/isn't allowed — that's Gen Re Legal's call. Where removed, leave a one-line pointer, not a dead end.
- Copy order is **what → why**: action first, rationale second (already the norm via `.step-card`; don't invert it in new copy).
- All colors via CSS variables in `styles/shared.css`; breakpoints 900px / 768px; no new frameworks, dependencies, or build steps.
- `step-view.js` must be a no-op (page reads as full continuous scroll) if it fails to load or a page has fewer than 2 pagination units — progressive enhancement, not a hard dependency.
- Every page keeps the standard skeleton: shared.css link → page `<style>` → `footer.js` → `nav.js` (→ `training-sidebar.js` on training pages) → `step-view.js` → hero/page-header → sections → page-footer.
- Commit after every task with a `fix(genre):` or `feat(genre):` message ending in `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
- There is no test runner. Every task's verification = `node --check` for touched JS, targeted `grep` assertions with expected output, and a `./serve` click-through where stated. Do not claim a task done without running its verification commands.
- Per I25 (change-freeze in spirit): touch only what's listed in a task below. Do not expand scope while executing.

---

### Task 1: Remove data-allowed/not-allowed sections (C4)

**Files:**
- Modify: `pages/workshops/faq.html:58-80`, `pages/workshops/acceptable-use.html` (full rewrite of sections, not the whole file)

**Interfaces:**
- Produces: both pages keep their existing anchors (`faq.html#data`, `acceptable-use.html#rules`, `#next`) since other pages link to them by id — do not rename ids.

- [ ] **Step 1: Trim `faq.html`'s data section (lines 58–80)**

Replace:

```html
<!-- DATA & WHAT'S ALLOWED -->
<div class="section section--off" id="data">
  <div class="sec-eyebrow">02 — Your data &amp; what's allowed</div>
  <h2 class="sec-title">Safety and the <em>ground rules</em></h2>
  <div class="faq-group">
    <details class="faq">
      <summary class="faq-q">Is my data safe?</summary>
      <div class="faq-a">Cowork only sees the folders you grant it, and on Gen Re's commercial plan your data isn't used to train models. Be precise about “local”, though: your files stay on your machine, but whatever Cowork reads from a granted folder is sent to Anthropic to be processed, the same as text you paste into chat. That said, the binding answer for what you may use it on is the <a href="acceptable-use.html">Rules of the Road</a> together with Gen Re's own acceptable-use and data-classification policy.</div>
    </details>
    <details class="faq">
      <summary class="faq-q">What data can I put into Cowork?</summary>
      <div class="faq-a">Follow the <a href="acceptable-use.html">Rules of the Road</a>. The short version: lower-sensitivity, internal work product is generally fine in a scoped folder; regulated, restricted, or personal data (cedent-confidential data, claimant PHI, MNPI) stays out unless the approved policy explicitly permits it. When in doubt, leave it out and ask.</div>
    </details>
    <details class="faq">
      <summary class="faq-q">Can I use it on customer or client information?</summary>
      <div class="faq-a">Not until Gen Re's approved policy says so for that specific workload. This is exactly the kind of thing the Rules of the Road and your Compliance team define — don't guess.</div>
    </details>
    <details class="faq">
      <summary class="faq-q">What's this "audit gap" I keep hearing about?</summary>
      <div class="faq-a">As of July 2026, Claude Cowork activity isn't captured in Anthropic's Audit Logs, Compliance API, or Data Exports on any plan tier, and history lives locally on your machine. It's a known limitation we manage with scope, approvals, and monitoring — not a reason to avoid it for appropriate work. The Day 3 governance snapshot and the Rules of the Road cover how.</div>
    </details>
  </div>
</div>
```

With:

```html
<!-- DATA -->
<div class="section section--off" id="data">
  <div class="sec-eyebrow">02 — Your data</div>
  <h2 class="sec-title">Safety and the <em>audit gap</em></h2>
  <div class="faq-group">
    <details class="faq">
      <summary class="faq-q">Is my data safe?</summary>
      <div class="faq-a">Cowork only sees the folders you grant it, and on Gen Re's commercial plan your data isn't used to train models. Be precise about “local”, though: your files stay on your machine, but whatever Cowork reads from a granted folder is sent to Anthropic to be processed, the same as text you paste into chat.</div>
    </details>
    <details class="faq">
      <summary class="faq-q">What data can I put into Cowork?</summary>
      <div class="faq-a">Follow Gen Re's own data-classification and acceptable-use policy — Legal owns that answer, not this site. When in doubt, leave it out and ask your Compliance team.</div>
    </details>
    <details class="faq">
      <summary class="faq-q">What's this "audit gap" I keep hearing about?</summary>
      <div class="faq-a">As of July 2026, Claude Cowork activity isn't captured in Anthropic's Audit Logs, Compliance API, or Data Exports on any plan tier, and history lives locally on your machine. It's a known limitation we manage with scope, approvals, and monitoring — not a reason to avoid it for appropriate work. The Day 3 governance snapshot covers how.</div>
    </details>
  </div>
</div>
```

- [ ] **Step 2: Rewrite `acceptable-use.html` — remove the "Mind the data" section and the two ground-rule items that restate data classification**

Replace the entire file body between `<div class="page-header" id="intro">` and `<div class="page-footer"></div>` (i.e. everything currently between lines 17 and 103) with:

```html
<div class="page-header" id="intro">
  <div class="eyebrow">Gen Re · Cowork Program</div>
  <h1 class="title">Rules of the <em>Road</em></h1>
  <p class="subtitle">One page, read before you use Cowork on any Gen Re work: who stays accountable and where to go with questions. What data may or may not go in is Gen Re Legal's call, not this page's — see the pointer below.</p>
  <div class="header-phase">
    <div class="header-phase-dot" style="background:var(--amber)"></div>
    Read before you start
  </div>
</div>

<!-- THE RULES -->
<div class="section section--off" id="rules">
  <div class="sec-eyebrow">01 — The ground rules</div>
  <h2 class="sec-title">Four things that always <em>hold</em></h2>
  <p class="sec-sub">Data: follow Gen Re's own data-classification and acceptable-use policy — that's the system of record, not this page. When in doubt, leave it out and ask your Compliance team.</p>
  <div class="bp-grid--light" style="margin-top:28px;">
    <div class="bp-item">
      <div class="bp-num">01</div>
      <div class="bp-title">You stay accountable</div>
      <div class="bp-body">Cowork drafts; you review, decide, and sign off. The output is never final on its own and is never sent automatically. Whoever was accountable for a piece of work before is accountable for it now.</div>
    </div>
    <div class="bp-item">
      <div class="bp-num">02</div>
      <div class="bp-title">Least privilege</div>
      <div class="bp-body">Grant only the folder a task needs, and remove access when you're done. Don't open your whole drive "to be safe." There are no per-file permissions — the folder grant <em>is</em> the control, so granting a drive root grants everything under it.</div>
    </div>
    <div class="bp-item">
      <div class="bp-num">03</div>
      <div class="bp-title">Watch for prompt injection</div>
      <div class="bp-body">Treat instructions hidden inside outside documents as a real risk — a document can contain text aimed at Claude rather than at you. Keep "ask before acting" on for anything that came from outside Gen Re.</div>
    </div>
    <div class="bp-item">
      <div class="bp-num">04</div>
      <div class="bp-title">Ask when unsure</div>
      <div class="bp-body">No penalty for asking, and asking is faster than guessing. Anything Cowork-shaped goes to Derrikk Broughton at Nimble Gravity, <a href="mailto:derrikk.broughton@nimblegravity.com">derrikk.broughton@nimblegravity.com</a>. Anything about Gen Re data classification, licences or access goes to the Gen Re program team.</div>
    </div>
  </div>
</div>

<!-- NEXT -->
<div class="section" id="next">
  <div class="sec-eyebrow">02 — Next</div>
  <h2 class="sec-title">Keep these in <em>mind</em></h2>
  <p class="sec-sub">Nothing to sign here — just carry these ground rules into every session. Your team's official data and acceptable-use policy remains your system of record.</p>
  <p style="margin-top:24px;"><a href="module-1-workshop.html" style="display:inline-flex;align-items:center;gap:6px;padding:11px 20px;background:var(--teal);color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">On to Day 1 →</a></p>
</div>
```

(The "faster than guessing" phrase in item 04 is about asking questions, unrelated to the Cowork value-prop framing Task 3 addresses — leave it.)

- [ ] **Step 3: Verify**

```bash
grep -c "DATA & WHAT'S ALLOWED\|what's allowed" pages/workshops/faq.html          # expect 0
grep -in "cedent-confidential\|claimant PHI\|MNPI\|regulated, restricted" pages/workshops/faq.html pages/workshops/acceptable-use.html   # expect NO output
grep -n 'id="data"\|id="rules"\|id="next"' pages/workshops/acceptable-use.html    # id="data" gone, id="rules" and id="next" present
grep -rn "acceptable-use.html#data" pages/ index.html                            # expect NO output (no page links to the removed id)
```

`./serve`: open `faq.html` and `acceptable-use.html`, confirm both read cleanly and no broken links.

- [ ] **Step 4: Commit**

```bash
git add pages/workshops/faq.html pages/workshops/acceptable-use.html
git commit -m "$(cat <<'EOF'
fix(genre): remove data-allowed/not-allowed sections, point to Gen Re Legal

Chris: remove sections classifying which data is/isn't allowed — Gen Re
Legal already owns that guidance. Trims faq.html's data FAQ group and
acceptable-use.html's "Mind the data" section + the two ground rules that
restated it; keeps the audit-gap disclosure and the four rules that aren't
about data classification.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: M365 connector — live and read-only everywhere (I24, D1)

**Files:**
- Modify: `pages/training/02-getting-set-up.html:146-174`, `pages/training/17-governance-snapshot.html:49-52`, `pages/workshops/facilitator-guide.html:301-304`, `pages/workshops/pre-work.html:98-103`, `CLIENT.md:27-30`

**Interfaces:**
- Consumes: nothing new.
- Produces: consistent connector language other lesson/script content can assume is accurate as of tonight.

- [ ] **Step 1: `pages/training/02-getting-set-up.html` — replace the M365 CONNECTOR section (lines 146–174)**

```html
<!-- M365 CONNECTOR -->
<div class="section section-dark" id="m365">
  <div class="sec-eyebrow on-dark">04 — Microsoft 365 connector</div>
  <h2 class="sec-title on-dark">Live today, and <em>read-only</em></h2>
  <p class="sec-sub on-dark">Anthropic's Microsoft 365 connector is live at Gen Re: Claude can read your mail, calendar, and SharePoint or OneDrive files. It is read-only — Claude cannot send email or write anything back through the connector. Everything today still runs from the local workshop folder; the connector is context you can use, not a requirement.</p>

  <div class="dev-grid-2" style="margin-top:28px;">
    <div class="dev-card">
      <div class="dev-kicker">What it adds</div>
      <h3>Context you'd otherwise paste in</h3>
      <p style="color:rgba(255,255,255,.65);font-size:15px;line-height:1.65;">The personalization interview can read how you actually write from your sent mail and pre-fill half its questions, and a later task can read a submission straight from SharePoint instead of you saving a copy to a folder first.</p>
      <div class="dev-quote">Read-only: it can look, not send or write.</div>
    </div>
    <div class="dev-card">
      <div class="dev-kicker">What it doesn't change</div>
      <h3>It sees only what you can see</h3>
      <p style="color:rgba(255,255,255,.65);font-size:15px;line-height:1.65;">The connector uses delegated permissions: Claude inherits your access, never more, and those reads land in the Microsoft 365 audit log like any other access to those files. It was turned on for the organization by an admin — it isn't something you enable from your own settings.</p>
      <div class="dev-quote">No sending email. No writing back. Read-only.</div>
    </div>
  </div>

  <div class="tip-trick tip-trick--dark" style="margin-top:32px;">
    <div class="tip-trick-icon">📁</div>
    <div class="tip-trick-copy">
      <div class="tip-trick-label">Local folder first, still</div>
      <p>Read-only means the connector can inform a draft but can't act on it — nothing gets sent or saved back through Claude. The habit worth keeping is the one you'll learn in the next lesson: put the files a task needs into one folder and point Cowork at that folder. A narrow grant is easier to explain, easier to review, and easier to undo.</p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: `pages/training/17-governance-snapshot.html` — replace the "Microsoft 365 — not yet" card (lines 49–52)**

```html
    <div class="insight-card">
      <div class="sec-eyebrow" style="margin-bottom:6px;">Microsoft 365 — read-only</div>
      <p style="font-size:15px;color:var(--slate);line-height:1.65;margin:0;">Anthropic's connector for mail, calendar, and SharePoint or OneDrive is <strong>live at Gen Re</strong>, switched on for the organization by an admin. It uses delegated permissions and is <strong>read-only</strong> — Claude can see what you can see, but it cannot send email or write anything back through the connector. Those reads land in the Microsoft 365 audit log like any other access to the same files.</p>
    </div>
```

- [ ] **Step 3: `pages/workshops/facilitator-guide.html` — replace bp-item 02 (lines 301–304)**

```html
    <div class="bp-item">
      <div class="bp-num">02</div>
      <div class="bp-title">Asked about the M365 connector</div>
      <div class="bp-body">It's live and read-only: Claude can read mail, calendar, and SharePoint/OneDrive, but it cannot send email or write anything back through it. Say that plainly if asked. Every exercise still runs from the local <code>cowork-workshop</code> folder — the connector is context, not a requirement.</div>
    </div>
```

- [ ] **Step 4: `pages/workshops/pre-work.html` — replace the connector tip-trick (lines 98–103)**

```html
  <div class="tip-trick" style="margin-top:20px;">
    <div class="tip-trick-icon">🔌</div>
    <div class="tip-trick-copy">
      <div class="tip-trick-label">About the Microsoft 365 connector</div>
      <p>It's live and read-only: Claude can read your mail, calendar, and SharePoint/OneDrive files, but it can't send email or write anything back through it. Every exercise across the three days still runs from the local <code>cowork-workshop</code> folder on your own Desktop — the connector is context you can use, not something the pre-work depends on.</p>
    </div>
  </div>
```

- [ ] **Step 5: `CLIENT.md` — replace the engagement-fact bullet (lines 27–30)**

```markdown
- **The M365 connector is now live at Gen Re and read-only** (confirmed 2026-08-17, superseding
  the 07-27/07-31 "under IT Security review" read below) — Claude can read mail, calendar, and
  SharePoint/OneDrive, but cannot send email or write anything back through it. All materials
  still teach local-folder-first as the primary path; the connector is additional context, not
  a dependency.
```

- [ ] **Step 6: Verify**

```bash
grep -rn "not live at Gen Re\|is under IT Security review\|not yet\b" pages/training/02-getting-set-up.html pages/training/17-governance-snapshot.html pages/workshops/facilitator-guide.html pages/workshops/pre-work.html CLIENT.md   # expect NO output
grep -rc "read-only" pages/training/02-getting-set-up.html pages/training/17-governance-snapshot.html pages/workshops/facilitator-guide.html pages/workshops/pre-work.html CLIENT.md   # each ≥ 1
```

`./serve`: read `02-getting-set-up.html`'s M365 section and `17-governance-snapshot.html`'s connected section.

- [ ] **Step 7: Commit**

```bash
git add pages/training/02-getting-set-up.html pages/training/17-governance-snapshot.html pages/workshops/facilitator-guide.html pages/workshops/pre-work.html CLIENT.md
git commit -m "$(cat <<'EOF'
fix(genre): M365 connector is live and read-only, not pending

Flips every mention from "not live / under IT Security review" to
confirmed live with delegated, read-only access (no send, no write-back),
per Ilya's Aug 11/17 update. Updates CLIENT.md's engagement facts so it
stops contradicting the site.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Reframe "faster" to "check things" in why-cowork.html (I1)

**Files:**
- Modify: `pages/workshops/why-cowork.html:61,79`

- [ ] **Step 1: Replace line 61**

Old:
```html
      <div class="bp-body">As a reinsurer, our edge is doing knowledge work faster and better. This is one of the clearest ways to protect that edge.</div>
```

New:
```html
      <div class="bp-body">As a reinsurer, our edge is catching what a rushed pass misses — on the knowledge work that fills every week here. This is one of the clearest ways to protect that edge.</div>
```

- [ ] **Step 2: Replace line 79**

Old:
```html
      <p style="font-size:15px;color:var(--slate);line-height:1.65;margin:0;">Faster turnarounds and more consistent output on the repetitive, document-heavy work that fills the day.</p>
```

New:
```html
      <p style="font-size:15px;color:var(--slate);line-height:1.65;margin:0;">More consistent output, and an easier trail to check, on the repetitive, document-heavy work that fills the day.</p>
```

- [ ] **Step 3: Verify**

```bash
grep -in "faster" pages/workshops/why-cowork.html   # expect NO output
```

- [ ] **Step 4: Commit**

```bash
git add pages/workshops/why-cowork.html
git commit -m "$(cat <<'EOF'
fix(genre): reframe why-cowork.html from faster to check things

Ilya: execs carry accountability if unchecked output goes out — the pitch
should be "this helps you check things," not "this helps you go faster."
The other two "faster" hits sitewide (01-what-is-cowork.html,
03-first-cowork-session.html) were checked and are already correctly
framed or contextually unrelated (a permission-mode description).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Build the step-view component (I3, C1, C2)

**Files:**
- Create: `step-view.js` (repo root)
- Modify: `styles/shared.css` (append component block), `DESIGN-SYSTEM.md` (document under a new heading), `CLAUDE.md` (page-skeleton bullet)

**Interfaces:**
- Produces: a script that, on `DOMContentLoaded`, treats every direct `<body>` child with class `page-header` or `section` as one pagination step. Applies to any page that loads it — Tasks 5 and 6 wire it into lessons and hubs. No page needs markup changes; the `.page-header`/`.section` boundaries already exist.
- Consumes: `.nav-sub-step[data-stage]` elements and their `active`/`aria-current` contract, already defined by `nav.js` (`nav.js:405` sets `data-stage` to values like `#prework`/`#content`) — read-only, `nav.js` itself isn't modified.

- [ ] **Step 1: Create `step-view.js`**

```js
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
```

- [ ] **Step 2: Append the component CSS to `styles/shared.css`**

First run `grep -n "^\.step-" styles/shared.css` to confirm no existing `.step-*` class collides (the `.step-card`/`.step-list`/`.step-num`/`.step-do`/`.step-why`/`.step-verify` classes from the prior restructure are a different, unrelated component — `.step-bar`/`.step-btn`/`.step-count`/`.step-hidden` below must not reuse those names). Then append:

```css
/* ── Step-view pagination (progressive enhancement) ─────────────────── */
.step-hidden { display: none !important; }
.step-bar{display:flex;align-items:center;justify-content:space-between;gap:16px;
  background:var(--white);border:1px solid var(--border);border-radius:12px;
  padding:10px 18px;margin:0 0 20px;}
.step-btn{background:var(--tealL);color:var(--teal);border:none;border-radius:8px;
  padding:8px 16px;font-weight:600;font-size:14px;cursor:pointer;white-space:nowrap;}
.step-btn:disabled{opacity:.35;cursor:default;}
.step-count{color:var(--slate);font-weight:600;font-size:13.5px;text-align:center;flex:1;}
@media(max-width:768px){.step-bar{padding:8px 14px;gap:10px;}.step-count{font-size:12.5px;}}
```

If `--tealL`, `--teal`, `--slate`, `--border`, or `--white` don't exist as tokens (`grep -n "\-\-tealL\|\-\-teal:\|\-\-slate:\|\-\-border:\|\-\-white:" styles/shared.css`), substitute the nearest existing token of the same role rather than hardcoding hex.

- [ ] **Step 3: Document in `DESIGN-SYSTEM.md`** — insert a new `## Step-View Pagination` section immediately after the existing "How Slides Are Generated" section (after line 123, before "## Authoring Rule"):

```markdown
## Step-View Pagination

`step-view.js` (root) turns any page's `.page-header` + `.section` sequence into one-screen-at-a-time navigation — no markup changes required, since it reads the same boundaries `slides-engine.js` already extracts from. Load it as the last shared-component script (after `nav.js` / `training-sidebar.js`), before the page's own content. Progressive enhancement: if the script fails to load, or a page has fewer than two `.page-header`/`.section` units, the page reads as plain continuous scroll — this is deliberate, not a bug to fix. A page's deep-link anchors (e.g. `page.html#canvas`) still work: `step-view.js` reads `location.hash` on load and opens that step directly rather than always defaulting to the first one.
```

- [ ] **Step 4: Update `CLAUDE.md`'s page-skeleton bullet** — find the sentence starting "**Every page** follows this structure" and change:

Old: `→ ``<script src="footer.js">`` then ``<script src="nav.js">`` (and ``training-sidebar.js`` on training pages) at the start of ``<body>`` →`

New: `→ ``<script src="footer.js">`` then ``<script src="nav.js">`` (and ``training-sidebar.js`` on training pages), then ``step-view.js``, at the start of ``<body>`` →`

- [ ] **Step 5: Verify**

```bash
node --check step-view.js
grep -c "step-bar\|step-hidden" styles/shared.css   # ≥ 2
grep -c "Step-View Pagination" DESIGN-SYSTEM.md     # 1
grep -c "step-view.js" CLAUDE.md                    # ≥ 1
```

- [ ] **Step 6: Commit**

```bash
git add step-view.js styles/shared.css DESIGN-SYSTEM.md CLAUDE.md
git commit -m "$(cat <<'EOF'
feat(genre): step-view.js — one-step-per-screen page navigation

Chris: the microsite had a lot of nesting and required clicking; Ilya
relayed that a slide-view (one step at a time) tested better than
continuous scroll. step-view.js progressively enhances the existing
.page-header/.section structure with Prev/Next + a step counter, reusing
the same boundaries slides-engine.js already relies on — no lesson/hub
markup changes needed. Wiring into pages is Tasks 5-6.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: Wire step-view.js into the 8 live-spine lessons

**Files:**
- Modify: `pages/training/01-what-is-cowork.html:15`, `02-getting-set-up.html:15`, `03-first-cowork-session.html:15`, `04-use-cases-by-industry.html:15`, `05-working-effectively.html:15`, `06-folder-access-walkthrough.html:15`, `09-anatomy-of-a-skill.html:15`, `17-governance-snapshot.html:15`

**Interfaces:**
- Consumes: `step-view.js` from Task 4.

- [ ] **Step 1: Insert the script tag after `training-sidebar.js` in all 8 files**

Each file currently has, at lines 13–15:

```html
<script src="../../footer.js"></script>
<script src="../../nav.js"></script>
<script src="../../training-sidebar.js"></script>
```

Insert immediately after line 15 in each of the 8 files:

```html
<script src="../../step-view.js"></script>
```

(`03-first-cowork-session.html`, `09-anatomy-of-a-skill.html`, and `17-governance-snapshot.html` also have `interactive.js` on line 16 — the new line goes between `training-sidebar.js` and `interactive.js`, order between those two doesn't matter since neither depends on the other.)

- [ ] **Step 2: Verify**

```bash
grep -l "step-view.js" pages/training/01-what-is-cowork.html pages/training/02-getting-set-up.html pages/training/03-first-cowork-session.html pages/training/04-use-cases-by-industry.html pages/training/05-working-effectively.html pages/training/06-folder-access-walkthrough.html pages/training/09-anatomy-of-a-skill.html pages/training/17-governance-snapshot.html | wc -l   # 8
```

`./serve`: open each lesson, confirm the step bar appears, Back is disabled on step 1, Next steps through to the end, and the counter/label updates each click. Open `pages/training/04-use-cases-by-industry.html#canvas` directly and confirm it opens on the canvas step, not step 1. Then open `pages/training/module-1-slides.html` (a deck) and confirm slides still render — `step-view.js` only runs on the lesson pages themselves, but the deck `fetch()`es their raw HTML, so confirm nothing about the new script tag breaks that fetch/parse.

- [ ] **Step 3: Commit**

```bash
git add pages/training/01-what-is-cowork.html pages/training/02-getting-set-up.html pages/training/03-first-cowork-session.html pages/training/04-use-cases-by-industry.html pages/training/05-working-effectively.html pages/training/06-folder-access-walkthrough.html pages/training/09-anatomy-of-a-skill.html pages/training/17-governance-snapshot.html
git commit -m "$(cat <<'EOF'
feat(genre): wire step-view.js into the 8 live-spine lessons

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: Wire step-view.js into the 4 hub pages

**Files:**
- Modify: `pages/workshops/module-1-workshop.html:14`, `module-2-workshop.html:14`, `module-3-workshop.html:14`, `module-4-workshop.html:14`

**Interfaces:**
- Consumes: `step-view.js` from Task 4; `.nav-sub-step[data-stage]` elements `nav.js` renders on hub pages (`#prework`/`#content` only — `step-view.js` treats the `#agenda`/`#materials` steps as still-"content" for that highlighting, since `nav.js`'s sub-row doesn't define stages for them).

- [ ] **Step 1: Insert the script tag after `nav.js` in all 4 files**

Each file currently has, at lines 13–14:

```html
<script src="../../footer.js"></script>
<script src="../../nav.js"></script>
```

Insert immediately after line 14:

```html
<script src="../../step-view.js"></script>
```

- [ ] **Step 2: Verify**

```bash
grep -l "step-view.js" pages/workshops/module-1-workshop.html pages/workshops/module-2-workshop.html pages/workshops/module-3-workshop.html pages/workshops/module-4-workshop.html | wc -l   # 4
```

`./serve`: open each hub, confirm the step bar appears and steps through prework → content → agenda → materials (4 steps on modules 1–3; module 4 has no lesson grid but keeps its own sections — confirm it still steps cleanly). Click a nav sub-row link (e.g. "Prework" on the Day 1 hub) and confirm it opens directly on that step. Click through Prev/Next and confirm the sub-row highlight follows (Content step keeps "Content" highlighted through agenda/materials).

- [ ] **Step 3: Commit**

```bash
git add pages/workshops/module-1-workshop.html pages/workshops/module-2-workshop.html pages/workshops/module-3-workshop.html pages/workshops/module-4-workshop.html
git commit -m "$(cat <<'EOF'
feat(genre): wire step-view.js into the 4 hub pages

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Final verification sweep

**Files:** none created — fixes go wherever the sweep finds problems.

- [ ] **Step 1: Global greps**

```bash
grep -rin "cedent-confidential\|claimant PHI\|MNPI\|regulated, restricted" pages/workshops/faq.html pages/workshops/acceptable-use.html   # NO output
grep -rn "not live at Gen Re\|is under IT Security review" pages/ CLIENT.md   # NO output
grep -in "faster" pages/workshops/why-cowork.html   # NO output
grep -rl "step-view.js" pages/training/0[1-6]*.html pages/training/09-*.html pages/training/17-*.html pages/workshops/module-[1-4]-workshop.html | wc -l   # 12
node --check step-view.js && node --check nav.js && node --check footer.js && node --check training-sidebar.js
```

- [ ] **Step 2: `./serve` click-through checklist** — Home → each day card → hub (step through all stages) → every lesson card → lesson (step through all sections, confirm the "Next Lesson" link inside the last step still works) → confirm retired lessons (07,08,10-16) are unaffected (they don't load `step-view.js` and weren't touched) → run each slide deck end-to-end to confirm `slides-engine.js` extraction is unaffected by the new script tags → confirm `escape-room/` and `control-room/` are unaffected.
- [ ] **Step 3: Small-screen pass at 1366×768** — Day 1 hub (all 4 steps), lesson `03-first-cowork-session.html` (its longest section), `faq.html`, `acceptable-use.html`. No horizontal scroll; step bar and Prev/Next buttons stay usable; step counter doesn't wrap awkwardly (item 16 from the brief's Part 2).
- [ ] **Step 4: Audit against the brief's Part 2 (1–17)** — write the numbered-item status (done / already-done-pre-existing / n/a) with file+line citations as a short comment in the commit body for this task, matching the brief's own "Verification prompt." This is documentation for Chris/Ilya, not a new file.
- [ ] **Step 5: Fix anything found, then commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
fix(genre): final sweep on the Aug-17 feedback pass — links, small-screen

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Self-Review (done at planning time)

- **Spec coverage:** step-view mechanism (spec §1) → Tasks 4-6. Deletions/scrub (spec §2) → Task 1 (data sections) and Task 3 (faster framing); jargon scrub and legal-plugin removal already verified done, no task needed. Structure & Day 1 connector (spec §3) → Task 2; use-case canvas and backup-demo already exist, no task needed. Facilitation polish (spec §4) → verified already done, no task needed. Testing (spec's Testing section) → Task 7.
- **Placeholder scan:** no TBD/TODO left in any task's content. The one open item — Amrita/Charles's pending review — is explicitly out of scope for this plan (spec §5), not a placeholder.
- **Type consistency:** `.step-hidden`, `.step-bar`, `.step-btn`, `.step-count` class names match between Task 4's JS and CSS. `.nav-sub-step[data-stage]` and its `active`/`aria-current` contract match `nav.js`'s existing implementation (verified against `nav.js:405,424-427` before writing Task 4).
