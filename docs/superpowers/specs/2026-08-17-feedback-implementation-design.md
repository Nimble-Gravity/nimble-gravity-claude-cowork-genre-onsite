# Consolidated Feedback Implementation — Design

**Date:** 2026-08-17 · **Status:** approved by Derrikk (chat, 2026-08-17)
**Sources:** `genre-microsite-feedback-brief.md` (Chris Engelhardt, Ilya Eliashevsky, Demetra Privette, Amrita Anam — compiled 2026-08-17)
**Delivery:** onsite, Aug 18–20, 2026, Stamford CT, hybrid, 2–4pm ET each day. Design approved the evening before Day 1.

## Goal

Apply the consolidated feedback brief to the live microsite before Day 1 (Aug 18, 2pm ET): flatten navigation into a one-step-per-screen model, remove the allowed/not-allowed data sections, trim governance to a light-touch snapshot, scrub IT jargon and audience references, reframe the value prop from "faster" to "check things," flip Day 1 to the connector-live path, and add the facilitation aids the tested session validated (verification block, watch-me/now-you markers, silent-work cues, real break).

Two decisions were confirmed with Derrikk before drafting this design (see brief D1/I24 and I3):

- **M365 connector status:** treat it as live and read-only as of today, superseding `CLIENT.md`'s "not available, under IT Security review" note from the 07-27/07-31 call. `CLIENT.md` gets a dated update alongside the Day 1 content change so the two don't drift back out of sync.
- **Slide-view scope:** full one-step-per-screen conversion, applied to the 8 live-spine lesson pages (01–06, 09, 17) and the 4 hub pages' `#prework`/`#content`/`#agenda`/`#materials` stages — not the reference/utility pages (FAQ, resources, my-progress, acceptable-use, why-cowork, cheat-sheet), which stay continuous-scroll since they're scanned, not walked through live.

## 1. Step-view mechanism

Every in-scope page is already built from a `.page-header` intro plus a sequence of `.section` blocks — the same boundaries `slides-engine.js` already uses to extract facilitator-deck slides. New self-contained component `step-view.js` at repo root (alongside `nav.js`/`footer.js`/`training-sidebar.js`, since it loads on both `pages/training/*` lessons and `pages/workshops/module-N-workshop.html` hubs), following the same IIFE convention:

- Progressively enhances the page: on load, hides all but the active `.page-header`/`.section` unit, injects Prev/Next controls and a step counter ("Step 3 of 7").
- Adds a persistent breadcrumb that extends the existing `.module-strip`, giving Chris the "show on the screen where things are" wayfinding (C2) — Day trail + lesson title + step position.
- Touches zero lesson copy or markup structure — pure navigation shell around existing content. Reversible by removing one script tag.
- No-JS / print fallback: default CSS shows all steps; JS applies the one-at-a-time mode. This also gives us a safety net if the mechanism misbehaves on a 14" laptop the morning of Day 1 — worst case, pages degrade to today's continuous scroll rather than breaking.
- Rejected alternatives: hand-restructuring each page's markup into explicit step wrappers (too much surface area for a same-night change across 12 files); a collapsed-accordion hybrid (lower effort but doesn't deliver the paginated experience I3 says already tested well against continuous scroll).

## 2. Deletions & copy scrub

- Remove the allowed/not-allowed data sections from all 5 files where they appear (`pages/workshops/cheat-sheet.html`, `pages/training/04-use-cases-by-industry.html`, `pages/workshops/faq.html`, `pages/training/17-governance-snapshot.html`, `pages/training/09-anatomy-of-a-skill.html`), replaced with one line pointing to Gen Re Legal guidance (C4).
- Trim `17-governance-snapshot.html` to a light-touch snapshot only: what's connected, roles at a glance, data retention basics. No deep-dive expansion, no plugin/marketplace mechanics (C3, I19).
- Legal-plugin example: already removed sitewide per prior restructure (git history, commit `f16c2a1`) — verify no regressions, no new work expected (I10).
- Sitewide IT-jargon / IT-audience scrub, re-grounded in `CLIENT.md`'s existing framing (the cohort is already documented as Gen Re business managers, not IT) — this pass is about copy that slipped through, not a framing change (C5, D2).
- Reframe "faster" language to "check things" in the 3 files where it appears (`pages/workshops/why-cowork.html`, `pages/training/01-what-is-cowork.html`, `pages/training/03-first-cowork-session.html`) (I1).

## 3. Structure & Day 1 content

- Wire `step-view.js` into the 8 lessons + 4 hubs; add the breadcrumb.
- Rewrite Day 1's M365 connector framing to the connector-live, read-only path; update `CLIENT.md`'s engagement-facts section with today's date so it stops contradicting the site (D1, I24).
- Reorder instructional blocks sitewide to action-first / explanation-second where they aren't already (A1, D3) — Day 1 already carries some of this from the prior restructure; this pass audits for remaining explanation-first blocks, particularly the connector setup steps.
- Add a Day 3 use-case canvas page attendees pre-fill before the session (I17).
- Add a backup-demo path note for the live skill-build in case it stalls (I18) — content depends on Chris sourcing a real workflow, so this ships as a `SCAFFOLD`/`TODO`-marked placeholder per the existing convention, not fabricated content.

## 4. Facilitation polish

- Personalization verification block on Day 1: "ask Claude X, you should see Y" (I9).
- "Watch me do it" vs. "now you do it" markers, repeat-twice cues, ~5-minute silent-work-block callouts (I6, I7, I8).
- Real Day 3 break, distinct from a processing pause (I20).
- OneDrive/SharePoint sync-delay gotcha note where the demo touches a shared file (I16).
- Unzip instructions for the pre-sent workshop folder — likely already present per the prior restructure's pre-work page; confirm and extend if thin (I23).
- Terminology simplification: drop skill-vs-agent-vs-connector distinctions unless a lesson is already fielding that question (I15).

## 5. Out of scope

No new framework, build step, or page architecture beyond `step-view.js`. Reference/utility pages (FAQ, resources, my-progress, acceptable-use, why-cowork, cheat-sheet) keep continuous scroll. Amrita's and Charles's pending review (C7/A2/E1) is a later pass — nothing here should make their notes harder to merge. Per I25 (change-freeze in spirit), no scope beyond what's traced to the brief's Part 2 numbered list.

## Error handling / risks

- **`step-view.js` breaks a page's layout close to showtime:** progressive-enhancement default (all steps visible without JS) means the failure mode is "looks like today's site," not "broken page." Test at 1366×768 before calling Pass 2 done.
- **Hub `.section` granularity doesn't map cleanly to good steps** (e.g. `#agenda`/`#materials` are reference tables, not walked-through content): confirm during planning whether those two stay expanded/skippable rather than force-paginated.
- **`CLIENT.md` / site drift on connector status:** dating the `CLIENT.md` update alongside the Day 1 rewrite keeps both artifacts consistent; if the connector isn't actually live by tomorrow morning, the read-only framing in the copy still holds (I24 accepted that risk explicitly) but `CLIENT.md`'s note should flag it as unconfirmed rather than asserted fact — carry the same caveat language into that file.
- **Backup-demo content placeholder ships without Chris's real workflow:** clearly marked `SCAFFOLD`/`TODO` per existing convention so a facilitator doesn't present it as real content.

## Testing

Manual: `./serve`, click through the step-view flow on at least one lesson and one hub end to end (Prev/Back, step counter, breadcrumb); confirm the 4 reference/utility pages are untouched; grep proves zero remaining allowed/not-allowed sections and zero "faster"-framing hits outside intentional context; view a lesson and a hub at ~1366×768; verify the personalization check block renders; confirm retired-lesson links and existing nav/sidebar/slide manifests still work (this touches lesson pages the manifests depend on).

## Sequencing

- **Pass 1** — Deletions & copy scrub (§2). Lowest risk, content-only, no navigation changes.
- **Pass 2** — Structure (§1, §3). Build and wire `step-view.js`, Day 1 connector rewrite, use-case canvas, backup-demo scaffold.
- **Pass 3** — Facilitation polish (§4).
- **Verification pass** — audit against the brief's Part 2 items 1–17, file+line citations; grep for remaining IT jargon and "faster"-framing.

Commit between passes so a single pass can be rolled back independently.
