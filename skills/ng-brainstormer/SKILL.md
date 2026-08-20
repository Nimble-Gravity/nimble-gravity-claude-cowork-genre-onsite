---
name: ng-brainstormer
description: Brainstorms a slate of candidate Claude Cowork skills tailored to a specific person's role, then packages them into a branded, workshop-ready PowerPoint deck with napkin-math ROI, a validated total-ROI slide, and a recommended Claude model per skill. Use this whenever someone asks to "brainstorm skill ideas," "what Cowork skills should I build," "help me find automation opportunities," wants a "skill case deck," is prepping for a Cowork training or enablement workshop and needs a jumpstart artifact, or asks a Claude Cowork question like "how could I use Claude to save time in my role" — even if they don't say "skill" or "deck" explicitly. Trigger this proactively whenever a CEM, Delivery Sponsor, or other Nimble Gravity role is trying to figure out where to start with Cowork.
---

# Skill Case Brainstormer

Turns "what should I automate with Claude?" into a decision-ready artifact: a ranked slate of candidate Cowork skills for one person's role, each with a plain-English ROI estimate and a recommended model, delivered as a branded deck someone can present or work from directly.

This exists because the useful part of "brainstorm some Claude skills for me" isn't the list — it's the judgment calls buried in it: which ideas are actually worth building, how to size the payoff before writing a line of code, and which Claude model fits each one. Do that thinking well and the deck basically writes itself.

## When this fires

Reach for this skill any time someone wants a structured slate of automation ideas for a role, not just a single skill built on the spot. Common triggers:
- "Brainstorm some Claude Cowork skills for my role" / "what should I be automating"
- "I'm running a Cowork training/enablement workshop, need something to help people jumpstart applying this"
- "Help me figure out where AI could save my team time" (when the answer is a slate of ideas, not one action)
- A CEM, Delivery Sponsor, or other role wants to justify a Cowork rollout to their manager or leadership

Don't reach for this when the person already knows exactly what one skill they want built (send that straight to `skill-creator` instead) or when they want a single task done right now, not a menu of future options.

## The shape of the deliverable

Ten (or however many the user wants) candidate skills, ranked 1 (simplest to build) to 10 (most advanced), spread across three kinds of value — time savings, better research/decisions, and improved output quality — and across three ownership scopes — individual, team, and org. The output is always a branded slide deck (see "Building the deck" below): one purple title slide, a summary table of every idea, a validated total-ROI slide, and one detail slide per idea with its own napkin-math ROI.

The point of the spread is that a good slate isn't ten variations on the same idea — it should give the person real choices along cost, risk, and payoff, not just a list of "yes, AI could theoretically do that."

## Step 1: Learn the role before brainstorming

Don't brainstorm from a title alone — "Chief Product Officer" and "Delivery Sponsor" cover wildly different daily work. Before generating ideas, get a real picture of:

- **What actually fills their week** — recurring meetings, the cadence of their work, what's reactive vs. proactive.
- **What they're accountable for** — not just tasks, but the outcome they're measured on.
- **Who they answer to and who answers to them** — this shapes whether a candidate skill is individual, team, or org-scoped.
- **What tools and data they already touch** — email, calendar, CRM, a specific SharePoint site, a specific data warehouse. Skills that plug into what's already connected are far more credible than ones that assume a new integration.

If the person has an `about-me/` folder, CLAUDE.md, or similar personal context file connected, read it first — it usually answers most of this. Only ask the person directly for what's still missing. If you're brainstorming for someone else's role secondhand (e.g. "help me build a deck for my CEM"), ask the requester who the intended audience is and what they'd want to walk away knowing.

## Step 2: Brainstorm with real spread

Generate candidates against this checklist, and don't stop until you have coverage on all three axes:

- **Value type**: at least a few of each — pure time savings, better research/decision quality, improved output quality. A slate that's all "saves you 10 minutes a day" ideas undersells what's possible; a slate that's all "transforms your strategic thinking" ideas has nothing easy to start with.
- **Ownership scope**: individual (just this person), team (a handful of colleagues in the same role), and org-wide (everyone, or a cross-functional group). Note which scope each idea naturally starts at and where it could grow — most real automation starts individual and earns its way to team/org.
- **Sophistication 1–10**: rank every idea by how hard it'd be to build and run reliably — not by how valuable it is. A simple daily digest that pulls from two already-connected sources is a 2 or 3. Something that requires new data sources, multi-step judgment calls, or synthesizing across systems that don't talk to each other today is an 8 or 9. Don't let sophistication and value type be redundant with each other (e.g. don't make every "1" a time-saver and every "9" a decision-support skill) — mix them.
- **Scheduling**: note whether each idea is a natural candidate for a recurring scheduled task (same cadence every time — daily, weekly, monthly) or is inherently event-triggered (fires off some real-world event like a deal closing or a project starting).

For each candidate, capture: title, one-line description, value type, scope, sophistication score, whether it's schedulable, likely output format (chat reply, doc, deck, dashboard, live artifact), and the data sources/connectors it would touch — flag explicitly if a needed connector isn't yet authorized in this session, since that changes what's actually buildable today versus later.

Present the full slate to the person before going deeper — a table works well for this — and let them pick which ones (some, all, or a reordered subset) get the full detail treatment in the deck. Don't skip this checkpoint even under time pressure; a deck built on the wrong 10 ideas is wasted effort no matter how polished it looks.

## Step 3: Flesh out the selected skills

For each skill the person wants to move forward, work out:

- **Workflow** — 3-4 short steps describing what the skill actually does when it runs, in plain language a non-technical reader can follow.
- **Users** — who runs it today, and who it could extend to.
- **Data sources / connectors** — be concrete (Outlook, HubSpot, a named SharePoint site) rather than generic ("email").
- **Output format** — what actually gets produced (HTML artifact, Word doc, PowerPoint one-pager, live dashboard, structured memo).
- **Recommended Claude model** — see `references/model-recommendations.md` for the reasoning framework. In short: high-frequency/low-judgment work (digests, classification) fits a fast, cheap model; moderate synthesis or brand-voice writing fits a mid-tier model; the highest-stakes, most judgment-heavy skill in a slate (usually the one automating the person's actual core accountability) is worth a top-tier model even at higher cost, because it runs rarely but matters most when it does.
- **ROI napkin math** — see `references/roi-methodology.md`. Every estimate needs to say which of the two categories it is (concrete time-savings, or directional expected-value) and show its arithmetic, not just assert a number.

## Step 4: Build the deck

Use `scripts/build_deck.js` to generate the branded PowerPoint. It's a template — don't hand-edit slide XML from scratch; feed it structured data instead:

1. Write the skill data to `skills.json` next to the script — see the `SKILL_SCHEMA` comment at the top of `build_deck.js` for the exact shape each skill object needs. **Include every brainstormed idea in this file, not just the ones getting full detail** — the summary table on slide 2 always lists every entry in `skills.json`, so the deck shows the full slate (all 10, say) even if only 3-5 get a deep-dive. Mark the ones the person selected to flesh out with `"detailed": true`; leave that off (and omit `roiLow`/`roiHigh`/`roiCategory`/`roiBody`/`roiScale`) for ideas that are part of the slate but weren't chosen. Keep `roiHeadline` short (well under 40 characters) — it renders large and bold on the detail slide, and put the actual arithmetic in `roiBody` instead.
2. Write `deck_config.json` with the presentation-level fields: `title`, `subtitle`, `presenterName`, `presenterLine` (title/role), `date`, `pillLabel` (the small badge on the title slide — default to something like "SKILL CASE BRAINSTORM" or a name the person prefers).
3. Run `node scripts/build_deck.js` from that directory. It produces `output.pptx` plus a validated Total ROI number — the script sums `roiLow`/`roiHigh` only across the `detailed: true` skills rather than letting you hand-type a total, specifically so the headline number on the Total ROI slide can never drift out of sync with the individual skill slides.
4. Add slide transitions with `scripts/add_transitions.py <unpacked-dir> --transition "<slide-marker-text>:<prst-name>"` (repeatable flag) — see that script's `--help` for the list of preset transition names verified against the MS-PPTX spec. The default deck ships with no transitions; add a subtle one (fade, curtains) on the Total ROI slide only if the person wants a bit of flair, since transitions can't be previewed in a headless sandbox and are easy to overdo.
5. Run the QA pass every time, without exception, before calling the deck done: `python <pptx-skill-path>/scripts/office/validate.py deck.pptx`, a `markitdown` content scan for leftover placeholder text, and a visual render (`soffice --convert-to pdf` + `pdftoppm`) reviewed slide by slide for text overflow, color contrast, and table rows that got cut off. The script auto-shrinks fonts on the 3-column skill-detail layout when a field runs long, but that's a safety net, not a license to write bloated fields — still render and look at every slide before calling the deck done.

**Brand is fixed, not per-persona.** The deck's Nimble Gravity purple/ochre palette, "Strategy, executed." tagline, and Georgia/Calibri type are hardcoded in `build_deck.js` and not exposed as a `deck_config.json` override. This is a Nimble Gravity-branded asset (used in client workshops, sales enablement, internal training) regardless of whose role the *content* is about — a slate brainstormed for an external persona (a prospect's own VP of Customer Success, say) still ships in NG's own brand, the same way any other NG client-facing template would. Don't invent a different company's colors for the deck itself just because the role being profiled belongs to someone at a different company. Only build a differently-branded deck if the person using this skill explicitly asks for one (e.g., they work at a different firm and want their own template) — and if that happens, check for a project-specific brand-guidelines skill first rather than guessing at colors.

## Color coding, chosen deliberately

- **Relative complexity** (the 1–10 sophistication score): a light-to-dark **yellow/gold** scale. Grey was tried first and read as flat and lifeless against the rest of the deck — yellow reads as "effort/caution" without implying something is bad.
- **Napkin math** (the ROI figure): a light-to-dark **green** scale, **log-scaled** rather than linear. ROI estimates in a real slate can span two orders of magnitude (a few thousand dollars a year to a few hundred thousand), and a linear scale makes everything look identical except the one outlier. Log-scaling keeps the color meaningfully different across the whole slate.
- Never use the same hue for both scales — they answer different questions ("how hard to build" vs. "how much is it worth") and conflating them visually undoes the whole point of color-coding.

## Common mistakes to avoid

- **Don't shrink the deck down to only the detailed skills.** The summary table is supposed to show the whole brainstormed slate (all 10, typically) even when only 3-5 get a full detail slide — that's the entire point of the summary/detail split in `skills.json`. Putting only the selected subset into `skills.json` quietly drops the rest of the slate from the deck, which defeats the purpose of brainstorming 10 in the first place.
- **Don't reach for a different brand palette because the profiled role is external.** The deck is a Nimble Gravity asset; keep the purple/ochre brand fixed regardless of whose role is inside it. See "Brand is fixed, not per-persona" above.
- **Don't present ROI as a single confident number.** Every estimate is either a time-savings calculation (show the arithmetic: minutes saved × frequency × loaded rate) or a directional expected-value estimate (show the assumptions: conversion probability × deal size × close rate). Say which one it is. A total-ROI slide that blends both should say so explicitly rather than implying one audited figure.
- **Don't let every idea land at individual scope.** If the whole slate is "just for this one person," the deck undersells the actual leverage — push on which ideas could plausibly extend to a team or the whole org, and say what that scaling would look like.
- **Don't skip the person's own connector/data reality.** A skill that needs HubSpot access is a different conversation if HubSpot isn't authorized yet in this session — flag it rather than silently assuming it'll just work.
- **Don't write a long `roiHeadline`.** It's the one field rendered large and bold on the detail slide; the script will auto-shrink the font if it runs long, but a headline that needs shrinking to fit is a sign the arithmetic belongs in `roiBody` instead.
- **Don't ship the deck without the visual QA pass.** Overflowing text and cut-off table rows are the single most common failure mode of this workflow, precisely because the layouts are information-dense by design — the script auto-shrinks fonts on the detail slides as a safety net, but that's not a substitute for actually looking at the rendered slides.
