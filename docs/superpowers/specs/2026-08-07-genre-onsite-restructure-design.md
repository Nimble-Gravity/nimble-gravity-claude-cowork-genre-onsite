# Gen Re Onsite Restructure — Design

**Date:** 2026-08-07 · **Status:** approved by Derrikk (chat, 2026-08-07)
**Sources:** Jul 31 review-call transcript · `Gen_Re_Anthropic_Onsite_Agenda.md` (Downloads, DRAFT 002 CE edits)
**Delivery:** onsite, week of Aug 17 — Tue + Wed 2 h, Thu 3.5 h (Workshop 3 + 1.5 h Advanced). Hybrid room (some attendees remote).

## Goal

Convert the four-workshop virtual microsite into the three-day onsite program: full spine remap (not an overlay), step-by-step "what → why" delivery, the content corrections from the review call, plus three non-site deliverables (workshop zip, demo doc stand-in, rewritten facilitator scripts).

## 1. New spine

The four nav crafts become **Day 1 · Day 2 · Day 3 · Advanced**. Remap `CRAFTS` in `nav.js`, `MODULES` in `training-sidebar.js`, footer stage chips in `footer.js`, `window.SLIDES_CFG` in each deck, and rewrite the four hub pages (`pages/workshops/module-N-workshop.html` — filenames unchanged) to the new agendas. `index.html` becomes the 3-day onsite overview. `pages/workshops/syllabus.html`, `pre-work.html`, `facilitator-guide.html` follow the new spine.

| Craft | Title | Lessons (display order) | Lab |
|---|---|---|---|
| Day 1 | Foundations & Personal Value (2 h) | 01 (rewritten: why Gen Re is investing + rules of the road), 02, 06 (workshop-folder setup, moved up), 03 (personalization lab) | Personalization + before/after demo on the Gen Re doc |
| Day 2 | Skills & Everyday Workflows (2 h) | 05 (trimmed: walk a workflow manually first), 09 (skill anatomy; absorbs useful bits of 08 and 10) | Skill Vault (`escape-room/`) |
| Day 3 | Gen Re Use Cases + Governance Snapshot (2 h) | 04 (rewritten: use-case ideation + use-case canvas; all legal-plugin references removed), NEW governance-snapshot lesson (distilled from 13/14: what's connected, roles at a glance, data retention basics) | Live skill build from a selected Gen Re use case, with backup demo |
| Advanced | Build Your Own (1.5 h) | none — hub page only (expectations, use-case review format, next steps/office hours) | Guided engagement on attendees' own use cases |

**Retired lessons:** 07, 08, 10, 11, 12, 13, 14, 15, 16 stay on disk, delisted from nav/sidebar/slides, linked from `resources.html` as "deep dives." The Control Room capstone retires with module 4. The new governance-snapshot lesson takes a new numeric prefix (17) per the append-only convention.

## 2. Step-by-step "what → why" pattern

New shared card pattern in `styles/shared.css`, documented in `DESIGN-SYSTEM.md`: numbered **"Step N — do this"** cards — imperative action first, the *why* as secondary text below — plus one **"verify it worked"** check per lab ("ask Claude X, you should see Y"). Applied fully to Day 1 lessons; applied to the Day 2 and Day 3 lab flows. The card class is registered with `slides-engine.js` extraction so decks render one step per slide — the plain, present-from-slides view the client asked for.

## 3. Content corrections from the review call

- **Legal plugin:** remove every reference (`pages/training/04`, `12`, `pages/workshops/module-2-workshop.html`, `resources.html`, `cowork-context.md`, `CLAUDE.md`, workshop-2 script/teleprompter). Lesson 04 reseeds its examples from generic insurance/reinsurance workflows instead.
- **Demo rework:** open the document first; explicit touchpoints (open → inspect → engage → check); framing is *"Cowork helps you check things, not whip through things"* (audience is managers who bear the not-checking risk). Output is a business summary — no developer process diagrams. Role-play framing ("pretend you know this file") dropped.
- **Pre-work page:** download `workshop-folder.zip`, extract to a Desktop folder, with unzip instructions written for non-technical users; "we all work out of this folder for three days." M365 connector flagged as conceptual-until-live; OneDrive/SharePoint sync gotchas noted.
- **Facilitator guide:** hybrid-room PSAs (remote attendees can't speak in that room; assign moderators for airtime), 14"-laptop window-layout guidance, and the standing rules (deliberate pauses, repeat key points, what-then-why, defer tangents offline).

## 4. Deliverables beyond the site

- **`workshop-folder.zip`** — new `assets/workshop-folder/` (README, `claude.md` starter, `about-me/` templates, demo doc, Day 2 workflow files), zipped into `assets/` and linked from pre-work.
- **Demo doc** — Gen Re has not yet sent the source document ("Gen Re to source; NG to genericize"). Ship a genericized **template stand-in** on the existing TreatyLayerPricer theme, with a `TODO` swap marker for the real file.
- **Scripts/teleprompters** — new `day-1-script.md`, `day-2-script.md`, `day-3-script.md` (Day 3 covers Workshop 3 + Advanced), replacing the workshop-N scripts/teleprompters, with the facilitator-note rules baked in (show each step twice; ~5-min silent work periods; simple verification test; simple terminology — no skill-vs-agent-vs-connector unless asked).

## 5. Out of scope

No new framework or build step; slide engine and page architecture unchanged. Kept lesson files are not renumbered (display order = array order). Attendee-list tailoring, M365 connector go-live, hybrid AV setup, and sourcing the real Gen Re document are Gen Re-owned open items — the site carries `TODO` markers where they land.

## Error handling / risks

- **Real demo doc arrives late or never:** the template stand-in is fully self-sufficient; swap is a file replacement plus one link check.
- **Retired-lesson links:** after delisting, grep for internal links into retired lessons from kept pages; point them at `resources.html` deep-dive entries.
- **Manifest sync:** the spine is duplicated across `nav.js`, `training-sidebar.js`, slide configs, footer, and hubs — the remap must touch all five per `CLIENT-CUSTOMIZATION.md`, and each craft's `filePrefix[]` must include every listed lesson prefix or the sub-nav renders empty.

## Testing

Manual: `./serve`, click through nav/sidebar/hubs/slides for each day; confirm retired lessons are unreachable from the spine but load from resources; run the four decks end-to-end; view Day 1 hub and lesson pages at ~1366×768 (14" laptop); grep proves zero legal-plugin references remain in live pages.
