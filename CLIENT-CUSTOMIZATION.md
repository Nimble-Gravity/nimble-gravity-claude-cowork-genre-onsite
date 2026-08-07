# Client Customization

How to tailor this microsite for a specific client engagement **without forking the framework**. The generic site is the template; a client engagement swaps content in a small set of clearly-marked seams and leaves everything else (nav, design system, slide engine, skills mechanism) untouched.

> Scope note: this documents the **mechanism only**. No client-specific content (e.g. Antares) ships in `main`. Per the engagement plan, client packs are built on a client branch after the discovery call confirms scope.

## Branch convention (documented, not yet created)

```
main                     ← shared template (this repo)
└─ cowork                ← product track (current content)
   └─ client-<name>      ← one branch per engagement; edits ONLY inside marked slots
```

A client branch should touch only the swappable regions below. If a change has to happen outside a slot, it probably belongs back in the template — raise it rather than diverging the fork.

## Swappable regions: `data-client-slot`

Every client-replaceable region is wrapped in an element carrying a `data-client-slot="<key>"` attribute. The attribute is inert: it changes no rendering and is ignored by the slide engine (`slides-engine.js` reads classes/elements, never attributes), so marking a slot can never break a page or a deck.

Rules:
- Put the attribute on an **inner wrapper** (a `<span>` or `<div>` inside the section), never on a `.section` that must still generate a slide.
- Keep the generic placeholder content meaningful — the template must read well with no client applied.
- To find every slot in the repo: `grep -rn 'data-client-slot' .`

### Current slots

| Key | File | What to replace |
|---|---|---|
| `industry-usecases-m2` | `pages/training/04-use-cases-by-industry.html` | The 2–3 seed industry use cases, re-cast to the client's verticals. Live Day 3 lesson. |
| `canonical-scenario-m2` | `pages/training/07-use-cowork-lab.html` | The canonical lab scenario, set to the client's real workflow. `07` is a **retired** lesson (self-study deep dive off `resources.html` only) — the slot still fires there, but it's no longer part of the live three-day spine. |
| `adoption-dashboard-m4` | `pages/training/15-analytics-and-adoption.html` | Link to the client's (or NG's) adoption-dashboard reference build. `15` is a **retired** lesson (self-study deep dive only); the live spine's analytics coverage now lives condensed inside `17-governance-snapshot.html`, which does not currently carry this slot. |

This table lists only the slots tied to the lesson remap; the repo has more `data-client-slot` regions on portal pages (sponsor message, data-classification examples, who-to-ask contacts, schedule dates, feedback-form links) — `grep -rn 'data-client-slot' .` is the source of truth for the full current list.

Add new slots as the engagement needs them; record each one in this table.

## Other swappable assets

- **Skills** (`skills/`): the generic `cowork-cosetup`, `workflow-decomposition`, and `memo-generation` skills can be re-skinned (e.g. memo-generation on client letterhead/format). Keep the generic versions in the template; client variants live on the client branch.
- **Discovery checklist** (`pages/customization/discovery-checklist.html`): run before the engagement; its answers drive which slots get filled.
- **Footer kicker / hero copy** (`footer.js`, `index.html`): light brand framing only; usually left generic.

## Stack-specific setup tracks

`pages/training/02-getting-set-up.html` is **Microsoft 365 only** on this client branch (Gen Re's stack; the M365 connector section uses the `dev-grid-2` + `.dev-card` pattern for its two facts, not for stack variation). If a future client needs a different stack, that two-column pattern is the reusable home for it — add a `.dev-card` per stack; nothing structural changes. There is currently no live second-stack example to copy from.

## Adding or renaming a lesson? Update all 4 manifests

This is the one cross-cutting gotcha. The lesson list is duplicated in **four** places and they drift silently:
1. `nav.js` → `CRAFTS[n]` (`filePrefix[]` + positionally-zipped `pages[]` / `labels[]`)
2. `training-sidebar.js` → `MODULES[n].lessons[]`
3. `pages/training/module-N-slides.html` → `window.SLIDES_CFG.lessons[]`
4. `footer.js` → stage chips (only if a day's *name* changes)

`index.html` is **not** part of this list on the current (onsite) structure — it's an executive summary of the three days plus Advanced (cards → hubs), not a lesson catalog, so it carries no per-lesson list to keep in sync.

New lessons **append** a new numeric prefix (the live spine currently runs 01–06, 09, 17; retired deep-dives hold 07, 08, 10–16 — pick an unused number above the highest in use) and are inserted at the right index in each array — display order is array order, not filename order. Always add the new prefix to the owning day's `filePrefix[]` in `nav.js`, or the page renders with an empty sub-nav.
