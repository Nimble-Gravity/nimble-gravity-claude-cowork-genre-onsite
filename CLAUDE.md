# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A **Nimble Gravity** Cowork-enablement microsite — a **three-day onsite program** (plus a fourth-day-style Advanced block) that gets **knowledge workers** (not coders) productive with **Cowork**, the agentic engine that brings Claude Code's capabilities into the Claude desktop app. It is built entirely on **Claude Cowork** (Anthropic); work needing centralized audit or zero retention routes to Anthropic's audited surfaces — the API or Claude Code Enterprise. The arc: Day 1 set up and see personal value → Day 2 skills and everyday workflows → Day 3 Gen Re use cases, a live skill build, and a governance snapshot → Advanced, a bring-your-own-use-case clinic. A set of lessons from the original four-module curriculum (07, 08, 10, 11, 12–16, plus `control-room/`) is retired but kept on disk as self-study deep dives, reachable only from `resources.html`. No build step, no framework, no package manager.

The framework (nav, footer, design system, slide engine, page template) was forked from an earlier workshop template. (The original Acme/SDLC reference lessons were removed on this Gen Re client branch; they remain on the template/main branch.) The Cowork content is grounded in a content-research report and the "Cowork Next Steps" meeting; key facts (and date-sensitive caveats like the June-2026 audit gap) live in `cowork-context.md`.

To run locally:
```bash
./serve
# Visit http://localhost:8000
```

For a plain static server without live reload:
```bash
python -m http.server
```

## Architecture

```
index.html              — Homepage / workshop landing page (hero + TOC + module overview)
nav.js                  — Self-contained top-nav component (IIFE; injects its own CSS)
footer.js               — Self-contained footer component (Nimble Gravity wordmark + brand link)
training-sidebar.js     — Left module/lesson sidebar for training pages
styles/shared.css       — Shared design system: tokens plus cross-page layout/components
DESIGN-SYSTEM.md        — Layout/spacing rules + "How slides are generated" (card classes)
cowork-context.md       — Subject brief: Claude Cowork, researched facts, sources, scenario
pages/training/*.html   — The Cowork lessons (live spine: 01–06, 09, 17; retired deep-dives: 07, 08, 10–16) + 4 slide decks + slide engine + theme
escape-room/            — "The Skill Vault" — Day 2's escape-room lab (own README)
control-room/           — "The Control Room" — the retired governance capstone's control-review simulation; stays on disk, linked only from resources.html's deep dives (same engine, own theme + config)
pages/workshops/*.html  — Workshop hubs + portal/OCM pages (syllabus, pre-work, resources, FAQ, my-progress, why-cowork, acceptable-use, etc.)
```

**Every page** follows this structure: `<link>` to shared.css → `<style>` block for page-specific CSS → `<script src="footer.js">` then `<script src="nav.js">` (and `training-sidebar.js` on training pages) at the start of `<body>` → one primary intro pattern (`hero` or `page-header`) → section divs → page-footer div → optional inline `<script>`. `step-view.js` is not universal — it loads only on the 8 lesson pages and 4 hub pages (after `nav.js`/`training-sidebar.js`, order relative to `interactive.js` doesn't matter); reference/utility pages (FAQ, resources, my-progress, acceptable-use, why-cowork, cheat-sheet, and others) deliberately omit it.

**The module manifest is duplicated in several places — keep them in sync** when adding/renaming/reordering lessons: the `CRAFTS` array in `nav.js` (the `filePrefix[]` plus the positionally-zipped `pages[]`/`labels[]`; each craft also carries a `hub` pointing at its workshop hub), the `MODULES` array in `training-sidebar.js`, the `window.SLIDES_CFG` in each `pages/training/module-N-slides.html`, the footer stage chips in `footer.js`, and the per-lesson `.module-grid` cards inside each workshop hub's `#content` stage (`pages/workshops/module-N-workshop.html`). The root `index.html` is now an **executive summary** that lists the four *workshops* (cards → hubs), not lessons, so it no longer carries a lesson list; `pages/training/index.html` is a short "Before we begin" opener, not a catalog. New lessons **append** a new numeric prefix (the live spine currently runs 01–06, 09, 17; retired deep-dives hold 07, 08, 10–16 — pick an unused number above the highest in use) inserted at the correct array index (display order = array order, not filename order); always add the new prefix to the owning module's `filePrefix[]` or the page renders with an empty sub-nav. See `CLIENT-CUSTOMIZATION.md` for the full per-lesson checklist.

**Navigation model:** the top nav's `Module 1–4` labels link to the module **hubs** (`CRAFTS[n].hub`), matching the Home cards; the nav **sub-row** shows each module's two hub stages (`MODULE_STAGES` → the hub's `#prework`/`#content` anchors), not the lesson list — it renders only on the hub itself (`isHubOf(activeCraft)`), not on lesson pages, where you're already inside "Workshop content" and it duplicated the Day tabs above it. The knowledge check is the animated `data-ix-quiz` component at the end of each day's capstone lesson (`03/09/17`); homework lives on `pre-work.html`. Lessons stay reachable from the hub `#content`, the training sidebar, and the hamburger overlay. See DESIGN-SYSTEM.md "The module hub spine". The footer's "Up next"/"Previous" sequence banner (`nav.js`'s `injectNextStep`) is scoped to same-day lesson-to-lesson steps only — it never crosses into the next/previous day's lessons, since the top nav's Day tabs already own day-to-day movement.

**nav.js** detects whether the page is in `/pages/` and adjusts root-relative links accordingly (assuming pages are exactly two directory levels deep). The nav/module structure is driven entirely by the hardcoded `CRAFTS` manifest — there is no external page-list fetch.

**Slides build themselves from lesson HTML.** A deck file (`module-N-slides.html`) is just a small `window.SLIDES_CFG` config; `slides-engine.js` fetches each listed lesson and extracts slides from known card classes. See DESIGN-SYSTEM.md "How slides are generated" before authoring lessons.

**shared.css** provides the shared visual system: Google Fonts imports, CSS custom properties, base resets, and a growing set of cross-page components/layout patterns used by multiple pages. Before creating a new reusable page pattern, check `DESIGN-SYSTEM.md`.

Do not add a second standalone header bar beneath the global nav when a page already has a hero or page-header. Orientation details belong inside the primary intro pattern, not in an extra top strip. Do not add top-of-page reading progress strips as a default page pattern.
When adding badges, chips, tags, or small craft labels, reuse the shared badge language in `styles/shared.css`. New variants should normally be modifier classes that only change color, not one-off HTML inline styles or page-specific typography/padding.

## CSS Conventions

- All colors reference CSS variables from shared.css — never hardcode hex values that duplicate an existing variable.
- Responsive breakpoints: `900px` (two-column collapse) and `768px` (single-column / mobile padding).
- Reusable layout or card patterns that appear across pages should be implemented in `shared.css` and documented in `DESIGN-SYSTEM.md`.
- Shared editorial card grids should stretch cards to the tallest sibling in the row. Use grid-level `align-items: stretch`, explicit `height: 100%` on grid children when needed, and an internal stack pattern so equal-height cards still read cleanly.
- Page-specific class names are scoped by page unless the pattern is intentionally shared.
- Dark sections use `var(--navy)` background; text colors flip to `var(--white)` / `var(--slatel)` / `var(--mint-on-dark)`.

## Domain Context

The audience is **knowledge workers in regulated enterprise** (financial services, insurance, capital markets, PE, healthcare, legal) — Nimble Gravity's sweet spot. The subject is **Cowork**: built entirely on **Claude Cowork** (Anthropic — desktop app, local folders, isolated VM); route compliance-bound work needing centralized audit or zero retention to Anthropic's audited surfaces (the API or Claude Code Enterprise). Read `cowork-context.md` (audience, researched facts, sources, caveats) before writing content. Tone is practitioner-to-practitioner — not marketing copy.

The three-day onsite arc (each day is a 2-hour hybrid session; Day 3 adds a 1.5-hour Advanced block back-to-back). Hub filenames stay `module-1-workshop.html`…`module-4-workshop.html`, but the program itself is framed as Days, not Workshops/Modules:

1. **Day 1 · Foundations & Personal Value** (lessons 01, 02, 06, 03) — delegate vs. chat; the engine (Claude Code's, in Claude Desktop, local + VM); personalization via Global/Folder/Project instructions and the workshop folder; a first delegated session with a live before/after demo.
2. **Day 2 · Skills & Everyday Workflows** (lessons 05, 09) — working effectively (Sonnet-default cost discipline, permission modes, prompt injection, `/schedule`); `SKILL.md` the Anthropic way (keyword-rich description, body < 500 lines, progressive disclosure, **evals before docs**); lab is the Skill Vault escape room.
3. **Day 3 · Gen Re Use Cases + Governance Snapshot** (lessons 04, 17) — use-case ideation grounded in generic reinsurance workflows (no Anthropic plugin packs named or demoed); a live skill build from a room-selected use case; a governance snapshot (RBAC basics, the setup sequence, the audit-coverage gap, analytics) condensed from the retired governance lessons.
4. **Advanced · Build Your Own** (no lessons, 1.5 h) — a bring-your-own-use-case clinic; guided engagement on participants' own workflows.

Lessons 07, 08, 10, 11, 12–16 and `control-room/` are **retired** from the live spine — they carried the old four-module curriculum's back half (Use Cowork Lab, skill-decomposition detail, plugins/RBAC/setup/analytics, and the Control Room capstone). They stay on disk and are reachable only from `resources.html`'s "Deep dives (reference only)" section, never from a lesson, hub, or nav a participant navigates day-to-day.

Guidelines for content:

- Built on Claude Cowork only — the deciding fact is the audit gap (as of June 2026, Claude Cowork activity is not in Anthropic's Compliance API/audit logs and history is local); manage it, and route work needing centralized audit or zero retention to Anthropic's audited surfaces (the API or Claude Code Enterprise).
- Make every lab a **real delegation that produces a deliverable** — "without enablement, users treat Cowork like Chat."
- Lesson 09 (Day 2) is the highest-scrutiny section: quote Anthropic's skill-authoring best-practices verbatim and date-stamp it.
- Industry examples are generic reinsurance workflows — no Anthropic plugin packs are referenced. Naming or demoing a specific Anthropic plugin pack (especially anything that reads or drafts contract/treaty wording) is a live nerve for this client; route any plugin discussion through the governance/review process instead.
- Lessons are research-grounded but carry `SCAFFOLD` / `TODO` markers where Nimble Gravity IP (industry examples, the adoption-dashboard build) drops in. **Date-sensitive** — re-verify the audit gap, model lineup, and repo/plugin counts against the **Sources** in `cowork-context.md` before each cohort.
