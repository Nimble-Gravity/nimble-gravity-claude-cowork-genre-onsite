# Navigation & Wayfinding Fixes — Design

**Date:** 2026-08-19 · **Status:** approved by Derrikk (chat, 2026-08-19)
**Sources:** Direct feedback from the Day 1/Day 2 training cohort this week (too many clicks, browser Back
behaving unexpectedly, losing track of "where am I") — surfaced in conversation, not a written brief.
**Delivery:** must ship before Day 3 (Thursday). Tight window, favors small and well-tested over a broader
rework.

## Goal

Fix four concrete, diagnosed navigation problems on the live curriculum site without touching the underlying
one-step-at-a-time pacing model, which matches this program's own "deliberate pauses, one thing at a time"
facilitation philosophy (`day-1-script.md`, `day-2-script.md`) and shouldn't be assumed broken just because it
adds clicks.

This design directly follows `2026-08-17-feedback-implementation-design.md`, which introduced `step-view.js`
and the `.module-strip` breadcrumb two days ago under a same-night deadline. That spec's own risk section
flagged `.module-strip` as an *extension point*, not a finished mechanism — this design is the fast-follow
that finishes it, plus fixes a real bug that shipped with the rushed version.

## 1. Fix the step-view history bug

**File:** `step-view.js`

Today, both user clicks (Next/Prev) and browser-driven navigation (Back/Forward, via the `hashchange`
listener) call the same `render(true)` path, which does `history.replaceState`. Because it's `replaceState`
and not `pushState`, a lesson's multi-step sequence never actually writes separate history entries — so the
browser's Back button doesn't step backward through the lesson at all. It ejects the user straight out of the
page to whatever was open before it, regardless of how many steps they'd advanced. This is the direct cause of
the "confusing back-clicks" complaint.

**Fix:** separate the two call sites' semantics:

- Next/Prev button clicks (and any other user-initiated jump, e.g. the sub-row/step-bar quick-links in
  §3) → `history.pushState(null, '', '#' + el.id)`, creating a real entry per step.
- The `hashchange` listener (fired when the browser's own Back/Forward already moved the URL) → sync `current`
  and re-render the DOM only; **do not** call `pushState` or `replaceState` again, since the browser already
  wrote the history entry natively. Calling pushState here would double up entries and reintroduce a bug in a
  different shape.
- Initial page load (`render(false)`) stays as-is: no history write, just render the DOM for whatever step
  matches the incoming hash (or step 0).

**Verify:** load a multi-step lesson, click Next three times, click the browser's Back button — should land on
step 2, not exit the page. Repeat Back twice more — should reach step 0, then exit on the next Back. Confirm
forward/back both resync the step counter and the breadcrumb (§2).

## 2. One consolidated "you are here" breadcrumb

**Files:** `step-view.js` (logic), `styles/shared.css` (small style additions to `.step-bar`), the 8 live-spine
lesson pages (`01-, 02-, 03-, 04-, 05-, 06-, 09-, 17-*.html`) — remove their hardcoded `.module-strip` block.

The step bar (already sticky, already visible at every viewport width per `.step-bar`'s CSS — it has no
`display:none` breakpoint) gets extended to read:

```
Day 2 · Walk a Workflow          Step 3 of 6 — Check the draft
```

- **Day label + color:** read at runtime from the already-rendered `.nav-craft--active .nav-craft-name`
  element that `nav.js` computes on every page load. No new manifest, no second place to keep in sync with
  `CRAFTS` in `nav.js`.
- **Lesson/hub title:** read from the page's own `.page-header h1` text — already present, no duplication.
- On hub pages, the same slot shows the hub's own title (e.g. "Day 2 Hub") rather than a lesson name, since
  hubs don't have one.

Once this ships, `.module-strip`'s job (day-level breadcrumb) is fully covered, and it's the one navigation
element in this codebase that's hand-authored per file rather than computed — remove it from all 8 live lesson
pages. This is a pure deletion (a fixed HTML block per page), not a content edit, and `.module-strip` isn't in
`slides-engine.js`'s recognized card-class list, so removing it has no effect on slide generation.

**Not touched:** the top nav's own craft labels and the hub sub-row (`#prework`/`#content` tabs) stay as they
are — this section only changes what's *inside* the step bar and deletes the redundant per-page markup.

## 3. Narrow-viewport navigation

**Files:** `nav.js` (hamburger overlay), `step-view.js` (hub quick-jump), `styles/shared.css`

Two independent small fixes, both addressing "lost navigation on smaller screens":

- **Hamburger overlay auto-scroll:** when `openMenu()` runs, scroll the overlay body so the currently-active
  page link (`.nav-overlay-page-link.active`) is in view, instead of always opening at the top of a long list
  the user has to hunt through.
- **Hub quick-jump inside the step bar:** on hub pages specifically, mirror the existing Pre-work/Workshop
  content sub-row links as two small pills inside the step bar. The sub-row that carries this today
  (`.nav-sub`) is hidden below 1024px, which is exactly where reaching `#content` in one click matters most —
  the step bar has no such breakpoint, so putting the same two links there keeps the fast path available at
  every width. This reuses the existing hash-link mechanism `step-view.js` already listens for; no new
  navigation concept.

## 4. Step/scroll toggle

**Files:** `step-view.js`, `styles/shared.css`

A "View all" text link at the right edge of the step bar (opposite the breadcrumb from §2):

- Clicking it removes `.step-hidden` from every step on the current page (continuous scroll, everything
  visible) and swaps the step bar's Prev/Next/counter for "Viewing all steps · **Back to step-by-step**".
- Clicking "Back to step-by-step" restores pagination at whatever step the user scrolls nearest to (or simply
  back to the step they toggled from — see open question below, resolve during planning).
- **Not persisted** — no `localStorage`, no cross-page memory. Every fresh page load starts in step-by-step
  mode. This is deliberate: it keeps the default pacing a facilitator relies on live unchanged, while giving
  anyone reading solo (homework, pre-work, review after the session) a one-click way to skim instead of
  clicking Next repeatedly.
- Available on both lesson and hub pages, since both run `step-view.js`.

## Out of scope (explicitly, to protect the Thursday deadline)

- **Reducing step count per lesson** (merging `.section` blocks) — rejected for this pass. `slides-engine.js`
  reads the same `.page-header`/`.section` boundaries to build facilitator slide decks, so changing section
  structure also changes slide count/structure — more surface to break with less time to test before Day 3.
- **Persisting the view-all toggle** — deferred; adds cross-page state and testing surface for a "nice to have."
- **Retired self-study lessons** (07, 08, 10–16) and `control-room/` — untouched. They're reachable only from
  `resources.html`'s deep-dives section, not part of the day-to-day flow the complaints were about.
- **Redesigning the top nav to link directly to individual lessons** (bypassing the hub) — a bigger
  information-architecture change; not attempted under this timeline.

## Error handling / risks

- **`pushState`/`hashchange` interaction has an edge case if a user manually edits the URL hash or double-fires
  a click before the DOM updates.** Standard debounce isn't in scope for this pass; verify manually during
  testing (§1) rather than adding new guard code under time pressure.
- **Removing `.module-strip` from 8 files is mechanical but touches every live lesson page.** Do this as a
  single small diff per file (delete one block, nothing else), diffed and spot-checked before moving to the
  next file, rather than a single large multi-file rewrite — keeps each change easy to verify and easy to
  revert individually if one page's markup doesn't match the assumed pattern exactly.
- **Hub quick-jump pills in the step bar could visually crowd the breadcrumb** on a hub page at narrow widths
  — resolve with CSS wrapping/truncation during implementation; not a blocker to the design.
- **"Back to step-by-step" landing step is ambiguous** (return to where the user toggled from, vs. wherever
  they've scrolled to in view-all mode) — pick one during planning; recommend returning to the step they
  toggled *from*, since tracking scroll position adds complexity for a marginal gain.
- **This is the second rushed pass touching the same shared scripts in three days** (`2026-08-17` introduced
  `step-view.js`/`.module-strip`, this closes the gap). Test at 1366×768 and at a narrow (<1024px) width for
  every page type (lesson, hub, and a reference page that doesn't load `step-view.js` at all, to confirm it's
  genuinely untouched) before calling this done — same discipline the prior spec called for and a rushed
  implementation is exactly how the history bug shipped in the first place.
