# Day 3 use-case rework: ng-brainstormer replaces the canvas

**Date:** 2026-08-20 · **Status:** approved (user, in-session)

## What changes and why

Day 3's use-case ideation currently runs on a five-line **use-case canvas** pre-filled as
pre-work, emailed in, validated by the facilitator, and built from live. Nimble Gravity has
since packaged **ng-brainstormer** — a Cowork skill that interviews a person about their role
and returns a **ranked slate of ~10 candidate skills** (spread across value type, ownership
scope, and sophistication 1–10) plus an **NG-branded PowerPoint** with napkin-math ROI and a
recommended Claude model per skill.

Three decisions, confirmed with the user:

1. **Participants download and run the skill live in the room** — the ideation slot becomes a
   hands-on lab, not a pre-validated shortlist presentation.
2. **After everyone has their slate of ten, the facilitator takes one item from a room slate
   and demonstrates how to start building it** — the 40-minute guided build survives, sourced
   from a slate row instead of a submitted canvas.
3. **The canvas retires everywhere.** The four buildability tests survive, reworded for slate
   items. Pre-work becomes interview priming (ten minutes of notes on your own week) plus a
   working-Cowork check. No submission email.

The Advanced block (Day 4-style clinic) and the governance snapshot are untouched. The Day 3
agenda keeps its existing time grid (0:15 open / 0:20 slot / 0:40 lab / break / debrief /
governance / close) with slots repurposed — the facilitator script's known 2:10-vs-2:00
arithmetic problem and its cut order stay valid.

## The skill artifact

- `~/Downloads/ng-brainstormer.skill` (zip: `ng-brainstormer/` with SKILL.md,
  `scripts/build_deck.js`, `scripts/add_transitions.py`, `references/roi-methodology.md`,
  `references/model-recommendations.md`) is the shipping package.
- Copy the zip to **`assets/ng-brainstormer.skill`** (sits beside `workshop-folder.zip`) for
  one-click download.
- Unzip into **`skills/ng-brainstormer/`** so the folder is browsable, matching the existing
  `skills/*` pattern.
- Install instruction taught on-site (matches resources.html's existing wording): unzip, drop
  the `ng-brainstormer/` folder into your Cowork skills folder.

## File-by-file plan

**`pages/training/04-use-cases-by-industry.html`** — full content rework, same filename
(renaming would ripple through nav.js/training-sidebar.js/SLIDES_CFG). New sections, reusing
slide-extracted card classes (`.step-card`, `.dev-card`, `.bp-item`, `.tip-trick`):

1. `#brainstormer` (was `#canvas`) — what the skill is, what comes back, and a 5-step
   step-list: download → install → run the interview → the checkpoint (pick 3–5 for detail)
   → let it build the deck while you do something else. Tips: the Gen Re pilot-community
   proof point survives; new tip that Day 1 personalization (`about-me/`) feeds the interview.
2. `#slate` (dark, was `#examples`) — reading the slate: the ranking is build difficulty, the
   spread is deliberate (three value types × three scopes), gold = complexity, green = ROI
   (log-scaled). The four reinsurance worked examples survive recast as slate rows
   (value type / scope / sophistication / trigger + ROI category). ROI-honesty tip: two
   categories (time-savings arithmetic vs directional expected value), never one audited
   number; the total-ROI slide sums only the detailed picks.
3. `#start` (was `#selection`) — from list to first build: the four tests reworded
   (documents in a folder now; an output you'd recognise as right; nothing confidential;
   **start at your 2s and 3s, not your 8s**). Doubles as how the facilitator picks the live
   demo item and how each person picks their first solo build.
4. `#next` — unchanged pointer to Lesson 17; sec-sub now sells the other nine as a ranked,
   costed backlog in a deck you can put in front of your manager.

**`pages/workshops/module-3-workshop.html`** — subtitle; Stage 1 pre-work (jot your week +
Cowork-working check, no submission); Stage 2 cards (lesson desc, live-build card now
"facilitator takes one item from a room slate"); outcomes insight-grid (slate+deck / working
skill / governance picture); agenda rows (open = install together; 0:15–0:35 = run the
interview, kick off deck build; lab = guided build from a slate item); materials (skill
download tip replaces staged-lab-files tip; backup-demo tip survives).

**`pages/workshops/pre-work.html#day-3`** — "Ten minutes on your own week": jot the week /
check the setup / optionally read what comes back. No email submission.

**`pages/workshops/syllabus.html`** — Day 3 pre-work card + agenda row wording.

**`pages/workshops/module-2-workshop.html`** — close-row teaser: canvas link → pre-work
priming.

**`pages/workshops/resources.html`** — subtitle ("the brainstormer" for "the canvas");
start-here Day 3 card → ng-brainstormer download; new card in "skills you can install"
(downloads the `.skill` zip since this one needs its scripts, not just SKILL.md).

**`pages/workshops/facilitator-guide.html#workshop-3`** — "validate the canvases" card →
pre-run the brainstormer on your own role (known-good slate in the room) and walk likely demo
candidates past Chris and Charles (status-roll-up caution survives); "chase it alongside the
canvas validation" line updated.

**`day-2-script.md`** — close section: homework [SAY] and preview [SAY] re-pointed at
interview priming and the Day 3 shape.

**`day-3-script.md`** — Block A: prep items 1/2/4 (pre-run + stage the download instead of
validate-canvases; the confirmed-workflow item becomes confirming the demo-item choice and
files); cut-order table row 2 rationale; Open (canvases segment → install-together segment);
Teach & demo slot → "Run the interview" lab; Lab intro sourced from the chosen slate item
(five-move loop, backup trigger, OneDrive note all survive); Debrief adds "what your slate
said / which item you'd build first / what the ROI arithmetic actually claims".

**Untouched:** nav.js/training-sidebar.js/footer.js manifests (no lesson added or renamed),
module-3-slides.html (`SLIDES_CFG` unchanged; slides regenerate from the reworked lesson),
lesson 17, module-4 hub, retired lessons 07–16 (lesson 08's "decomposition canvas" is a
different canvas and stays), resources.html's decomposition-canvas card.

## Inbound anchors to update

`04-use-cases-by-industry.html#canvas|#examples|#selection` are linked from module-3 hub (×3),
pre-work (×2), module-2 hub (×1), resources (×1), day-3-script (×1). All move to
`#brainstormer|#slate|#start`.

## Verification

- `grep -ri canvas` across live-spine pages returns only the workflow-decomposition
  references (retired/deep-dive) and unrelated hits.
- Every `#brainstormer|#slate|#start` inbound link resolves to an id in lesson 04.
- `./serve` + spot-check lesson 04, hub, and the Day 3 slide deck (cards still extract).
- `unzip -l assets/ng-brainstormer.skill` matches the Downloads original.
