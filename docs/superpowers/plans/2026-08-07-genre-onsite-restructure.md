# Gen Re Onsite Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the four-workshop virtual microsite into the three-day Gen Re onsite program (Day 1 · Day 2 · Day 3 · Advanced), with step-by-step "what → why" delivery, the review-call content corrections, a pre-sent workshop zip, a demo-doc stand-in, and rewritten facilitator scripts.

**Architecture:** Static site, no build step. The module spine is duplicated across five places (`nav.js` CRAFTS, `training-sidebar.js` MODULES, per-deck `window.SLIDES_CFG`, `footer.js` chips, hub pages) — Task 1 remaps all of them at once. Lessons are plain HTML pages; slides are auto-extracted from known card classes by `pages/training/slides-engine.js`. Retired lessons stay on disk, delisted, reachable only from `resources.html`.

**Tech Stack:** Vanilla HTML/CSS/JS, `styles/shared.css` design tokens, reveal.js decks via `slides-engine.js`, `escape-room/tools/convert-lab-files.py` for .txt→.docx, PowerShell `Compress-Archive` for the zip.

**Spec:** `docs/superpowers/specs/2026-08-07-genre-onsite-restructure-design.md`
**Agenda source:** `client-notes/onsite-agenda.md` (copied from Downloads in Task 1 — treat as ground truth for agendas, objectives, pre-work, facilitator notes).

## Global Constraints

- Claude Cowork only; the audit gap is *managed* — never pitch Copilot or audited surfaces as the default.
- **Zero legal-plugin references** anywhere in the repo when done (client: "completely derail everything").
- Demo/lab framing everywhere: *"Cowork helps you check things, not whip through things."* Open the document first; explicit touchpoints; no role-play personas ("pretend you're familiar with this file") in participant-facing copy; no developer process diagrams as outputs.
- Copy order is **what → why**: imperative action first, rationale second.
- All colors via CSS variables in `styles/shared.css`; breakpoints 900px / 768px; no new frameworks, dependencies, or build steps.
- Keep lesson filenames — display order comes from arrays, not filenames. New lesson takes prefix `17-`.
- Craft colors unchanged: Day 1 `#2f6b66`/`#4f9990`, Day 2 `#8c47e4`/`#c4b5fd`, Day 3 `#2b6880`/`#7dd3e8`, Advanced `#e8a317`/`#f2c56b`.
- Every page keeps the standard skeleton: shared.css link → page `<style>` → `footer.js` + `nav.js` (+ `training-sidebar.js` on training pages) → hero/page-header → sections → page-footer.
- Sessions: Day 1 Tue 2 h, Day 2 Wed 2 h, Day 3 Thu 3.5 h (= Workshop 3 2 h + break + Advanced 1.5 h). Hybrid room; remote attendees cannot speak — moderated Q&A.
- Commit after every task with a `feat(genre):`/`fix(genre):`/`docs(genre):` message ending in `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- There is no test runner. Every task's verification = `node --check` for touched JS, targeted `grep` assertions with expected output, and a `./serve` click-through where stated. Do not claim a task done without running its verification commands.

---

### Task 1: Spine remap (manifests, slide configs, footer)

**Files:**
- Create: `client-notes/onsite-agenda.md` (copy of `C:\Users\Broughton Office\Downloads\Gen_Re_Anthropic_Onsite_Agenda.md`)
- Modify: `nav.js:6-95` (CRAFTS), `training-sidebar.js:4-53` (MODULES), `pages/training/module-1-slides.html`–`module-3-slides.html` (SLIDES_CFG), `footer.js:50-56` (program text + chips)

**Interfaces:**
- Produces: the day spine every later task links against — hub files keep their names (`module-1-workshop.html` = Day 1 hub, `module-2` = Day 2, `module-3` = Day 3, `module-4` = Advanced); lesson set per day as below; `module-4-slides.html` is delisted (no craft references it) but stays on disk.

- [ ] **Step 1: Copy the agenda into the repo**

```bash
cp "/c/Users/Broughton Office/Downloads/Gen_Re_Anthropic_Onsite_Agenda.md" "client-notes/onsite-agenda.md"
```

- [ ] **Step 2: Replace the CRAFTS array in `nav.js` (lines 6–95)**

```js
  var CRAFTS = [
    {
      id: 'm1',
      folder: 'training',
      hub: 'pages/workshops/module-1-workshop.html',
      label: 'Day 1',
      subLabel: 'Foundations & Personal Value',
      color: '#2f6b66',
      navColor: '#4f9990',
      filePrefix: ['01-', '02-', '06-', '03-'],
      pages: [
        '01-what-is-cowork',
        '02-getting-set-up',
        '06-folder-access-walkthrough',
        '03-first-cowork-session'
      ],
      labels: [
        'What Is Cowork',
        'Get Set Up',
        'Workshop Folder',
        'Personalize & Verify'
      ]
    },
    {
      id: 'm2',
      folder: 'training',
      hub: 'pages/workshops/module-2-workshop.html',
      label: 'Day 2',
      subLabel: 'Skills & Everyday Workflows',
      color: '#8c47e4',
      navColor: '#c4b5fd',
      filePrefix: ['05-', '09-'],
      pages: [
        '05-working-effectively',
        '09-anatomy-of-a-skill'
      ],
      labels: [
        'Walk a Workflow',
        'Skill Anatomy'
      ]
    },
    {
      id: 'm3',
      folder: 'training',
      hub: 'pages/workshops/module-3-workshop.html',
      label: 'Day 3',
      subLabel: 'Use Cases + Governance',
      color: '#2b6880',
      navColor: '#7dd3e8',
      filePrefix: ['04-', '17-'],
      pages: [
        '04-use-cases-by-industry',
        '17-governance-snapshot'
      ],
      labels: [
        'Use-Case Ideation',
        'Governance Snapshot'
      ]
    },
    {
      id: 'm4',
      folder: 'training',
      hub: 'pages/workshops/module-4-workshop.html',
      label: 'Advanced',
      subLabel: 'Build Your Own',
      color: '#e8a317',
      navColor: '#f2c56b',
      filePrefix: [],
      pages: [],
      labels: []
    }
  ];
```

- [ ] **Step 3: Replace the MODULES array in `training-sidebar.js` (lines 4–53)**

Advanced has no lessons and is intentionally **omitted** from the sidebar (the sidebar only renders on training pages, and Advanced has none).

```js
  var MODULES = [
    {
      label: 'Day 1',
      subLabel: 'Foundations & Personal Value',
      color: '#4f9990',
      slidesFile: 'module-1-slides.html',
      lessons: [
        { file: '01-what-is-cowork.html',            title: 'What Is Cowork' },
        { file: '02-getting-set-up.html',            title: 'Get Set Up' },
        { file: '06-folder-access-walkthrough.html', title: 'Workshop Folder' },
        { file: '03-first-cowork-session.html',      title: 'Personalize & Verify', exercise: true }
      ]
    },
    {
      label: 'Day 2',
      subLabel: 'Skills & Everyday Workflows',
      color: '#c4b5fd',
      slidesFile: 'module-2-slides.html',
      lessons: [
        { file: '05-working-effectively.html',  title: 'Walk a Workflow' },
        { file: '09-anatomy-of-a-skill.html',   title: 'Skill Anatomy' }
      ]
    },
    {
      label: 'Day 3',
      subLabel: 'Use Cases + Governance',
      color: '#7dd3e8',
      slidesFile: 'module-3-slides.html',
      lessons: [
        { file: '04-use-cases-by-industry.html', title: 'Use-Case Ideation' },
        { file: '17-governance-snapshot.html',   title: 'Governance Snapshot' }
      ]
    }
  ];
```

- [ ] **Step 4: Replace the three SLIDES_CFG blocks**

`pages/training/module-1-slides.html`:

```js
window.SLIDES_CFG = {
  module:   1,
  label:    'Day 1',
  subLabel: 'Foundations & Personal Value',
  color:    '#4f9990',
  lessons: [
    { file: '01-what-is-cowork.html',            title: 'What Is Cowork' },
    { file: '02-getting-set-up.html',            title: 'Get Set Up' },
    { file: '06-folder-access-walkthrough.html', title: 'Workshop Folder' },
    { file: '03-first-cowork-session.html',      title: 'Personalize & Verify' }
  ]
};
```

`pages/training/module-2-slides.html`:

```js
window.SLIDES_CFG = {
  module:   2,
  label:    'Day 2',
  subLabel: 'Skills & Everyday Workflows',
  color:    '#c4b5fd',
  lessons: [
    { file: '05-working-effectively.html', title: 'Walk a Workflow' },
    { file: '09-anatomy-of-a-skill.html',  title: 'Skill Anatomy' }
  ]
};
```

`pages/training/module-3-slides.html`:

```js
window.SLIDES_CFG = {
  module:   3,
  label:    'Day 3',
  subLabel: 'Use Cases + Governance',
  color:    '#7dd3e8',
  lessons: [
    { file: '04-use-cases-by-industry.html', title: 'Use-Case Ideation' },
    { file: '17-governance-snapshot.html',   title: 'Governance Snapshot' }
  ]
};
```

Also update each deck's `<title>` to `Day N: <subLabel> — Cowork Workshop Slides`. Leave `module-4-slides.html` on disk untouched — nothing references it after this task.

- [ ] **Step 5: Update `footer.js` program text and chips (lines 50–56)**

```js
        '<div class="nav-footer-text">A three-day onsite enablement program that gets Gen Re knowledge workers productive with Cowork — personal setup and a first verified run, skills built from everyday workflows, then your own use cases and a governance snapshot.</div>' +
        '<div class="nav-footer-stages" aria-label="Workshops">' +
          '<span class="nav-footer-stage">Day 1 · Foundations &amp; Personal Value</span>' +
          '<span class="nav-footer-stage">Day 2 · Skills &amp; Everyday Workflows</span>' +
          '<span class="nav-footer-stage">Day 3 · Use Cases + Governance</span>' +
          '<span class="nav-footer-stage">Advanced · Build Your Own</span>' +
        '</div>' +
```

- [ ] **Step 6: Verify**

```bash
node --check nav.js && node --check training-sidebar.js && node --check footer.js
grep -c "Day 1\|Day 2\|Day 3\|Advanced" nav.js          # expect ≥ 4 label hits
grep -n "Workshop 1\|Workshop 2\|Workshop 3\|Workshop 4" nav.js training-sidebar.js footer.js   # expect NO output
```

Then `./serve`, open `http://localhost:8000`, confirm: nav shows Day 1/Day 2/Day 3/Advanced; clicking Day 1 opens `module-1-workshop.html`; opening `pages/training/06-folder-access-walkthrough.html` shows the Day 1 sub-nav (not empty — if the `m4` empty `pages: []` entry breaks nav rendering, fix by guarding the render loop with `if (!craft.pages.length) return;` at the `CRAFTS.forEach` sub-nav builder, and re-verify).

- [ ] **Step 7: Commit**

```bash
git add client-notes/onsite-agenda.md nav.js training-sidebar.js footer.js pages/training/module-1-slides.html pages/training/module-2-slides.html pages/training/module-3-slides.html
git commit -m "feat(genre): remap spine to 3-day onsite — Day 1/2/3 + Advanced"
```

---

### Task 2: Step-card "what → why" pattern

**Files:**
- Modify: `styles/shared.css` (append component block), `pages/training/slides-engine.js` (add extractor after the `.comp-card` block at ~line 107), `DESIGN-SYSTEM.md` (document under "How slides are generated")

**Interfaces:**
- Produces: `.step-card` markup contract used by Tasks 3–5:
  - `.step-list` wrapper → `.step-card` children, each with `.step-num` (integer), `.step-do` (imperative action, the "what"), optional `.step-why` (one-sentence rationale), optional `.step-verify` (the "ask Claude X, expect Y" check — amber accent).
  - Slides engine emits **one slide per `.step-card`**: heading = "Step N — {step-do first sentence}", body = remaining `.step-do` text + `.step-why`; `.step-verify` renders as the slide's callout line.

- [ ] **Step 1: Append the component to `styles/shared.css`**

```css
/* ── Step cards (what → why, onsite delivery) ─────────────────────── */
.step-list{display:flex;flex-direction:column;gap:14px;margin-top:24px;counter-reset:step;}
.step-card{display:grid;grid-template-columns:44px 1fr;gap:16px;align-items:start;
  background:var(--white);border:1px solid var(--border);border-radius:14px;padding:18px 20px;}
.step-num{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;
  background:var(--tealL);color:var(--teal);font-weight:700;font-size:15px;}
.step-do{font-size:15.5px;font-weight:600;color:var(--ink);line-height:1.5;}
.step-do code{font-size:13.5px;}
.step-why{margin-top:6px;font-size:13.5px;color:var(--slate);line-height:1.6;font-weight:400;}
.step-verify{margin-top:10px;font-size:13px;color:var(--amber-ink,#8a6116);background:var(--amberL,#fdf3dd);
  border:1px solid var(--amber);border-radius:10px;padding:8px 12px;line-height:1.55;}
.step-verify::before{content:"Verify: ";font-weight:700;}
@media(max-width:768px){.step-card{grid-template-columns:32px 1fr;padding:14px;}}
```

Before committing, check `grep -n "amberL\|amber-ink" styles/shared.css` — if those tokens don't exist, add them next to the other color tokens (`--amberL:#fdf3dd; --amber-ink:#8a6116;`) instead of leaving raw hex in the component.

- [ ] **Step 2: Add the extractor to `slides-engine.js`** (insert after the `.comp-card` extractor block, following the same emit pattern the neighbors use — inspect how `.insight-card` builds a slide object and mirror it):

```js
      /* Step cards (.step-card) — one slide per step, what → why */
      sec.querySelectorAll('.step-card').forEach(function (card) {
        var num    = card.querySelector('.step-num');
        var doEl   = card.querySelector('.step-do');
        var why    = card.querySelector('.step-why');
        var verify = card.querySelector('.step-verify');
        if (!doEl) return;
        var doText   = doEl.textContent.trim();
        var firstDot = doText.indexOf('.');
        var head     = 'Step ' + (num ? num.textContent.trim() : '') + ' — ' +
                       (firstDot > 0 ? doText.slice(0, firstDot) : doText);
        var bodyBits = [];
        if (firstDot > 0 && firstDot < doText.length - 1) bodyBits.push(doText.slice(firstDot + 1).trim());
        if (why) bodyBits.push(why.textContent.trim());
        pushSlide(sec, head, bodyBits.join(' '), verify ? verify.textContent.trim() : null);
      });
```

`pushSlide(sec, heading, body, callout)` here stands for *whatever helper/object-shape the neighboring extractors actually use* — read the `.insight-card` and `.tip-trick` blocks first and emit the identical structure (including how callouts/tips are represented). Do not invent a new slide shape.

- [ ] **Step 3: Document in `DESIGN-SYSTEM.md`** under "How slides are generated": add `.step-card` to the extracted-class list with the markup contract from **Interfaces** above and this canonical example:

```html
<div class="step-list">
  <div class="step-card">
    <div class="step-num">1</div>
    <div>
      <div class="step-do">Open Claude Desktop and click <strong>Cowork</strong> in the left rail.</div>
      <div class="step-why">Chat answers questions; Cowork works in your files. Today lives in Cowork.</div>
      <div class="step-verify">You see a folder picker, not a chat box.</div>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Verify**

```bash
node --check pages/training/slides-engine.js
grep -c "step-card" styles/shared.css pages/training/slides-engine.js DESIGN-SYSTEM.md   # each ≥ 1
```

Full visual verification happens in Task 3 once real step cards exist.

- [ ] **Step 5: Commit**

```bash
git add styles/shared.css pages/training/slides-engine.js DESIGN-SYSTEM.md
git commit -m "feat(genre): step-card what-then-why pattern + slide extraction"
```

---

### Task 3: Day 1 lessons (01, 02, 06, 03)

**Files:**
- Modify: `pages/training/01-what-is-cowork.html`, `02-getting-set-up.html`, `06-folder-access-walkthrough.html`, `03-first-cowork-session.html`

**Interfaces:**
- Consumes: `.step-card` contract from Task 2; spine labels from Task 1.
- Produces: Day 1 lesson set the Day 1 hub (Task 6), pre-work (Task 7), and `day-1-script.md` (Task 10) link to. Lesson 06's workshop-folder path convention: **`Desktop\cowork-workshop`** — every later reference uses exactly this folder name.

All four pages: update `<title>` suffix to `— Day 1`, and any in-page "Workshop N" copy to the day names. Keep the existing page skeleton, hero, and card classes; the work is content reshaping, not redesign.

- [ ] **Step 1: Rewrite `01-what-is-cowork.html` opening sections.** Keep the chat-vs-Cowork teaching content. Add/replace intro sections so the lesson opens with (a) **"Why Gen Re is investing in Cowork"** — 3 insight-cards: time back on document-heavy work; your judgment stays in the loop ("Cowork helps you check things, not whip through things"); manager-level licenses mean you own verification; and (b) **"Rules of the road"** — a `.step-list` of 4 cards: work only in the workshop folder (why: everything Cowork touches is visible on disk); confidential client data stays out of this pilot (why: contracts govern what leaves Gen Re systems); you review every output before it goes anywhere (verify: you can name the source document each claim came from); when unsure, ask in the room (why: tangents get parked, but blockers get solved now). Keep the existing engine explanation (Claude Code's engine, local + VM) as-is.
- [ ] **Step 2: Step-ify `02-getting-set-up.html`.** Convert its install/launch instructions into one `.step-list` (install Claude Desktop → sign in → find Cowork in the left rail → confirm version), each with a one-line `.step-why` and a `.step-verify` (e.g. verify: "Cowork appears in the left rail; if it doesn't, flag a facilitator"). Keep the M365 connector section but mark it: **"Conceptual until the connector is live at Gen Re — Charles is pushing to have it before Day 1; if it isn't, everything today runs from the local workshop folder."**
- [ ] **Step 3: Repurpose `06-folder-access-walkthrough.html` as "Set up the workshop folder".** `.step-list`: download `workshop-folder.zip` from pre-work → right-click, Extract All to Desktop → rename/confirm folder is `Desktop\cowork-workshop` → open it in Cowork's folder picker → confirm the file list matches the README (verify: "you see about-me/, demo/, day-2/, README.docx"). Add a `.tip-box`: this could be any folder, including OneDrive — but for these three days everyone works in this one local folder; OneDrive/SharePoint sync can lag or conflict while Cowork has files open. Add a small-screen note (tip-box): on a 14" laptop put Claude on the left half and Explorer on the right (Win+←/Win+→) — you never need more than those two windows.
- [ ] **Step 4: Rework `03-first-cowork-session.html` as the personalization lab.** Structure: (1) **Demo — before** (facilitator): open the demo document *in Word first*, scroll it, name what it is, then ask Cowork cold for a summary and inspect the touchpoints (open → inspect → engage → check); output is a one-page business summary, not a diagram. (2) **Lab** `.step-list`: create `about-me/` in the workshop folder → run the co-setup interview → answer as yourself, not a persona → save (each with why; verify: "ask Claude 'what do you know about how I work?' — the answer should quote your about-me answers"). Include the ~5-minute silent-work block as an explicit step ("Work silently for 5 minutes; facilitators roam"). (3) **Demo — after**: same document, same ask, now personalized — compare. Remove any Maya-Chen/persona instructions from participant-facing copy (persona stays only in the facilitator script if needed). Keep the existing `data-ix-quiz` knowledge check.
- [ ] **Step 5: Verify**

```bash
grep -l "step-card" pages/training/01-what-is-cowork.html pages/training/02-getting-set-up.html pages/training/06-folder-access-walkthrough.html pages/training/03-first-cowork-session.html   # all four listed
grep -n "Workshop 1\|Workshop 2" pages/training/0[1-3]*.html pages/training/06-*.html   # expect NO output
grep -n "Maya" pages/training/03-first-cowork-session.html    # expect NO output
```

`./serve`: read all four pages top-to-bottom; open `module-1-slides.html` and confirm step cards render one-per-slide in order.

- [ ] **Step 6: Commit**

```bash
git add pages/training/01-what-is-cowork.html pages/training/02-getting-set-up.html pages/training/06-folder-access-walkthrough.html pages/training/03-first-cowork-session.html
git commit -m "feat(genre): Day 1 lessons — what-then-why steps, verified personalization lab"
```

---

### Task 4: Day 2 lessons (05, 09)

**Files:**
- Modify: `pages/training/05-working-effectively.html`, `pages/training/09-anatomy-of-a-skill.html`
- Read (source material, unchanged): `pages/training/08-decompose-your-workflow.html`, `10-make-it-a-skill.html`

**Interfaces:**
- Consumes: `.step-card` contract; `Desktop\cowork-workshop` folder convention (`day-2/` subfolder holds the workflow files, created in Task 9).
- Produces: Day 2 lesson pair the Day 2 hub, pre-work, and `day-2-script.md` reference. The manual workflow example is **status reporting from source documents** (per agenda: "walk a real business workflow (e.g., status reporting)").

- [ ] **Step 1: Reframe `05-working-effectively.html` as "Walk a workflow manually".** Title → `Walk a Workflow — Day 2`. Keep the working-effectively fundamentals that survive contact with this audience (permission modes in plain words, when to interrupt, checking outputs); cut or trim Sonnet-cost-discipline/`/schedule` deep-dives to short tip-boxes. Center section: a `.step-list` doing the status-report workflow **manually with Cowork, no skill**: open the `day-2/` source documents in Word first and skim them → ask Cowork for the draft, pointing at the folder → watch what it opens (touchpoint) → read the draft against the sources → correct one thing and re-ask (each with why; verify: "every claim in the draft traces to a document you can open"). Close with the bridge: "You just did this by hand. Tomorrow-you shouldn't have to remember these steps — that's what a skill is."
- [ ] **Step 2: Rework `09-anatomy-of-a-skill.html` to absorb 08/10.** Keep Anthropic's skill-anatomy best-practices content verbatim + date-stamped (highest-scrutiny content — do not paraphrase quoted guidance). Pull in, condensed: from `08-decompose-your-workflow.html` the 3–4 card "name the steps you just did manually" framing (not the full decomposition worksheet); from `10-make-it-a-skill.html` the skill-creator loop summary (describe → generate → test → fix) as one `.step-list`. Keep terminology simple: add a tip-box "Skills vs. agents vs. connectors — skip the taxonomy. A skill is a recipe Cowork follows. That's all you need today." End with the Skill Vault framing: "The lab is an escape room; each room is a skill repair." Link `../../escape-room/index.html`.
- [ ] **Step 3: Verify**

```bash
grep -n "Workshop 2\|Workshop 3" pages/training/05-working-effectively.html pages/training/09-anatomy-of-a-skill.html   # expect NO output
grep -c "step-card" pages/training/05-working-effectively.html pages/training/09-anatomy-of-a-skill.html                # each ≥ 1
```

`./serve`: read both pages; run `module-2-slides.html` end-to-end.

- [ ] **Step 4: Commit**

```bash
git add pages/training/05-working-effectively.html pages/training/09-anatomy-of-a-skill.html
git commit -m "feat(genre): Day 2 lessons — manual workflow first, skill anatomy absorbs 08/10"
```

---

### Task 5: Day 3 lessons (04 rewrite, new 17)

**Files:**
- Modify: `pages/training/04-use-cases-by-industry.html`
- Create: `pages/training/17-governance-snapshot.html`
- Read (source material): `pages/training/13-roles-and-access.html`, `14-set-up-and-govern.html`

**Interfaces:**
- Consumes: spine (Task 1 already lists `17-` under Day 3); `.step-card` contract.
- Produces: `17-governance-snapshot.html` — new page other pages may link as "Governance Snapshot".

- [ ] **Step 1: Rewrite `04-use-cases-by-industry.html` as "Use-Case Ideation".** Title → `Use-Case Ideation — Day 3`. **Remove every legal-plugin / Anthropic-plugin-pack reference and example.** Replace the industry catalog with: (a) the **use-case canvas** walkthrough (the pre-work artifact): a card grid naming its fields — the workflow, its trigger, the documents it touches, what "checked and correct" means, time it takes today; (b) 4–6 reseeded reinsurance-flavored example canvases *without client-confidential specifics* (e.g. treaty-submission triage, quarterly experience-summary drafting, meeting-notes-to-action-items, document comparison against a checklist — reuse the existing TreatyLayerPricer scenario language already in this page/repo); (c) a **selection section**: how the room picks 1–2 canvases for the live build (clear documents, clear output, no confidential data, doable in 40 min). Note for facilitators inline (comment or facilitator-guide link): IT-oriented ideas like status roll-ups may not land with execs who *receive* reports — validate with Chris/Charles beforehand (`TODO` marker).
- [ ] **Step 2: Create `17-governance-snapshot.html`** (standard page skeleton; copy the head/scripts/footer block of `04-…` and swap content). Three sections, distilled from lessons 13/14, each a short card grid — this is a 10-minute segment, not the Module 4 deep-dive: (1) **What's connected** — what Cowork can and can't reach at Gen Re today (local folders yes; M365 connector status; nothing else without review); (2) **Roles at a glance** — who can enable what (admin vs. member in plain words; skills are personal until IT distributes them); (3) **How data is handled** — where files live (your machine + the session VM), what leaves (prompts/outputs to Anthropic under the enterprise agreement), the audit-coverage gap in one honest sentence with the compensating rule: *work needing centralized audit or zero retention routes to Anthropic's audited surfaces (the API or Claude Code Enterprise)*. Date-stamp the facts block "re-verified 2026-07-21; check `cowork-context.md` §Sources before each cohort." End with "take this back to your team" — link to the one-page cheat-sheet.
- [ ] **Step 3: Verify**

```bash
grep -in "legal" pages/training/04-use-cases-by-industry.html      # expect NO output
grep -c "step-card\|insight-card\|comp-card" pages/training/17-governance-snapshot.html   # ≥ 1
node --check pages/training/slides-engine.js                        # unchanged, still valid
```

`./serve`: read both; run `module-3-slides.html` — slides must include 17's cards.

- [ ] **Step 4: Commit**

```bash
git add pages/training/04-use-cases-by-industry.html pages/training/17-governance-snapshot.html
git commit -m "feat(genre): Day 3 lessons — use-case canvas ideation + governance snapshot"
```

---

### Task 6: Hub pages (4 hubs → day agendas)

**Files:**
- Modify: `pages/workshops/module-1-workshop.html`, `module-2-workshop.html`, `module-3-workshop.html`, `module-4-workshop.html`

**Interfaces:**
- Consumes: agendas + objectives verbatim from `client-notes/onsite-agenda.md`; lesson links from Tasks 3–5.
- Produces: each hub keeps its anchor contract — `#intro`, `#prework`, `#content`, `#agenda`, `#materials` — because nav's MODULE_STAGES points at `#prework`/`#content`.

Each hub keeps its existing page structure (page-header → prework → content → agenda → materials). Per hub:

- [ ] **Step 1: Day 1 hub (`module-1-workshop.html`).** Header: "Day 1 — Foundations & Personal Value · 2 hours". Objective (from agenda, verbatim intent): every participant sets up their own personalization and sees it work on a real, genericized Gen Re document — and knows how to verify Claude's output. `#prework`: install Claude Desktop; download + extract `workshop-folder.zip` (link pre-work page); read "What is Cowork" (lesson 01); review Rules of the Road; "this is a lab, not a lecture." `#content`: `.module-grid` cards for lessons 01, 02, 06, 03 in that order. `#agenda` table: Why Gen Re is investing → Rules of the road → Chat vs. Cowork → **Live demo: Gen Re document (before)** → **Hands-on lab: personalization** → **Live demo: Gen Re document (after)**. `#materials`: slides deck link (`module-1-slides.html`), demo doc, facilitator guide.
- [ ] **Step 2: Day 2 hub (`module-2-workshop.html`).** Header: "Day 2 — Skills & Everyday Workflows · 2 hours". Agenda table exactly per agenda file: Connect & frame 10 · Do it manually 25 · Teach & demo 20 · Guided lab (Skill Vault) 40 · Share-out 15 · Homework & close 10. `#prework`: review Day 2 lessons; confirm your everyday workflow; bring Day 1 personalization results. `#content`: cards for 05, 09, + a lab card linking `../../escape-room/index.html` ("The Skill Vault"). "What you'll leave with: a working skill built from a real business workflow."
- [ ] **Step 3: Day 3 hub (`module-3-workshop.html`).** Header: "Day 3 — Gen Re Use Cases + Governance Snapshot · 2 hours". Agenda per agenda file: Connect & frame 15 · Teach & demo 20 (ideate + agree on the workflow) · Guided lab 40 (build a skill from the selected use case) · Break 15 · Share-out 20 · Governance snapshot 10 · Close 10. `#prework`: pre-fill the use-case canvas (15 min, link on pre-work). `#content`: cards for 04, 17, + lab card "Live skill build" (points at 04's selection section) + a **backup-demo** materials note ("if live-building stalls, the facilitator runs the prepared demo skill — see facilitator guide"). Leave-with list from agenda verbatim.
- [ ] **Step 4: Advanced hub (`module-4-workshop.html`).** Header: "Advanced — Build Your Own · 1.5 hours · Day 3 afternoon". Objective per agenda: experienced users bring their own use case for live engagement; the team helps solve challenges and roadblocks. Agenda: Connect & frame 15 · Review use cases 20 · Guided engagement 45 · Recap & next steps 10. `#prework`: come with use-case examples or questions; no other prep. `#content`: no lesson grid — replace with 3 insight-cards: how the session runs, what makes a good bring-along (real files, a workflow you own, a question you're stuck on), what happens to unresolved items (follow-up actions list). Remove all Control Room / plugin / RBAC / analytics cards and copy.
- [ ] **Step 5: Verify**

```bash
grep -l 'id="prework"' pages/workshops/module-[1-4]-workshop.html | wc -l    # 4
grep -l 'id="content"' pages/workshops/module-[1-4]-workshop.html | wc -l    # 4
grep -n "Control Room\|control-room\|RBAC\|plugin" pages/workshops/module-4-workshop.html   # expect NO output
grep -n "07-use-cowork-lab\|11-build-a-skill-lab\|1[2-6]-" pages/workshops/module-[1-4]-workshop.html   # expect NO output
```

`./serve`: click every lesson card on every hub; confirm nav sub-row stage links (`#prework`/`#content`) land correctly.

- [ ] **Step 6: Commit**

```bash
git add pages/workshops/module-1-workshop.html pages/workshops/module-2-workshop.html pages/workshops/module-3-workshop.html pages/workshops/module-4-workshop.html
git commit -m "feat(genre): hubs rewritten to onsite day agendas incl. Advanced"
```

---

### Task 7: Portal pages (index, training opener, syllabus, pre-work, facilitator guide, resources)

**Files:**
- Modify: `index.html`, `pages/training/index.html`, `pages/workshops/syllabus.html`, `pages/workshops/pre-work.html`, `pages/workshops/facilitator-guide.html`, `pages/workshops/resources.html`

- [ ] **Step 1: `index.html`** — page-header copy becomes the onsite overview ("Three days onsite, week of Aug 17 — Tue & Wed 2 hours, Thu afternoon 3.5 hours"). The `#workshops` section becomes four day-cards (reuse the existing `.module-card` grid, update numbers/labels/links/blurbs — Day 3 card notes it contains both the 2 h workshop and the 1.5 h Advanced block). `#how-it-runs` rhythm copy → what-then-why, hands-on, hybrid-room ground rules (remote attendees get moderated Q&A).
- [ ] **Step 2: `pages/training/index.html`** — "Before we begin" opener: retarget copy from four workshops to three days; keep it short; point "start here" at pre-work then Day 1.
- [ ] **Step 3: `syllabus.html`** — replace the four-workshop syllabus with the three-day one: per day, subject/objective/pre-work/agenda-table/leave-with, all sourced from `client-notes/onsite-agenda.md` (Workshop 4 = Advanced section under Day 3). Contact line: Derrikk Broughton, derrikk.broughton@nimblegravity.com.
- [ ] **Step 4: `pre-work.html`** — restructure sections `#workshop-1..4` → `#day-1`, `#day-2`, `#day-3`, `#advanced` (update any anchors pointing at the old ids — grep `pre-work.html#workshop` across the repo). Day 1 section is the big one, as a `.step-list`: install Claude Desktop → download [`workshop-folder.zip`](../../assets/workshop-folder.zip) → right-click → Extract All → to Desktop → confirm you have `Desktop\cowork-workshop` with `about-me/`, `demo/`, `day-2/`, `README.docx` (verify card). Include the plain-words unzip explainer ("a zip is a box of files; Extract All unpacks the box"). M365 connector line: "may be live by Day 1 — if not, nothing today needs it." Day 2: confirm your everyday workflow + bring Day 1 results. Day 3: pre-fill the use-case canvas (15 min). Advanced: bring your use case/questions.
- [ ] **Step 5: `facilitator-guide.html`** — restructure to the three days + Advanced. Add a **Standing rules** section (verbatim from agenda facilitator notes: deliberate pauses; repeat key points; what-then-why; defer tangents), a **Hybrid room** section (remote attendees can't speak in this room; assign moderators to manage airtime; PSA at session open), a **Small screens** section (test demos at 1366×768; two-window layout Win+←/→; don't rely on the presenter 4K quad setup), and per-day notes: Day 1 — separate "watch me" from "you do", show each step twice, 5-min silent work, personalization verify test, demo doc swap `TODO` (real Gen Re source pending); Day 2 — one room, facilitators roam, manual-first sequencing, no taxonomy detours, OneDrive sync gotcha; Day 3 — validate canvases with Chris/Charles first (`TODO`), real break, backup demo ready.
- [ ] **Step 6: `resources.html`** — remove legal-plugin content; add a **"Deep dives (reference only)"** section: a link list to retired lessons 07, 08, 10, 11, 12, 13, 14, 15, 16 with one-line descriptions and a note "not part of the onsite program — kept for self-study." Add links: workshop zip, use-case canvas, cheat-sheet, escape room.
- [ ] **Step 7: Verify**

```bash
grep -rn "pre-work.html#workshop" pages/ index.html    # expect NO output
grep -n "Four workshops\|four-workshop" index.html pages/workshops/syllabus.html   # expect NO output
grep -in "legal" pages/workshops/resources.html        # expect NO output
grep -n "workshop-folder.zip" pages/workshops/pre-work.html pages/workshops/resources.html   # ≥ 1 each
```

`./serve`: click through Home → pre-work → Day 1 hub → lessons; syllabus matches the agenda file's tables.

- [ ] **Step 8: Commit**

```bash
git add index.html pages/training/index.html pages/workshops/syllabus.html pages/workshops/pre-work.html pages/workshops/facilitator-guide.html pages/workshops/resources.html
git commit -m "feat(genre): portal pages restructured to 3-day onsite delivery"
```

---

### Task 8: Legal-plugin purge, retired-link sweep, doc updates

**Files:**
- Modify: `pages/training/12-skills-to-plugins.html`, `pages/workshops/module-2-workshop.html` *(already rewritten in Task 6 — re-check only)*, `cowork-context.md`, `CLAUDE.md`, plus whatever the greps below surface.

- [ ] **Step 1: Purge remaining legal-plugin references**

```bash
grep -rin "legal plugin\|legal-plugin\|anthropic legal" --include="*.html" --include="*.md" . | grep -v docs/superpowers | grep -v client-notes
```

For each hit: in retired lesson `12-skills-to-plugins.html`, replace the approved-plugin example with a generic "a plugin bundles skills for distribution" example; in `cowork-context.md` and `CLAUDE.md`, rewrite the Module-2 guideline to "industry examples are generic reinsurance workflows — no Anthropic plugin packs are referenced." (`client-notes/onsite-agenda.md` may legitimately contain the phrase "legal-plugin" in the facilitator note "Skip the legal-plugin example" — that's the client's own instruction file; leave it.)

- [ ] **Step 2: Sweep links into retired lessons from live pages**

```bash
grep -rn "07-use-cowork-lab\|08-decompose\|10-make-it-a-skill\|11-build-a-skill-lab\|12-skills-to-plugins\|13-roles-and-access\|14-set-up-and-govern\|15-analytics\|16-the-control-room\|module-4-slides\|control-room/" --include="*.html" index.html pages/ | grep -v resources.html
```

Every hit outside `resources.html` and the retired lessons themselves gets repointed (to the day lesson that absorbed the content, or to `resources.html#deep-dives`). Retired lessons may keep links among themselves.

- [ ] **Step 3: Update `CLAUDE.md` + `cowork-context.md` program description** — the four-module arc paragraph becomes the three-day onsite arc (Day 1/2/3 + Advanced, dates, hybrid); keep the Module-3-scrutiny rule (now applies to lesson 09) and the date-sensitivity rule; note retired lessons live on as deep-dive references.
- [ ] **Step 4: Verify**

```bash
grep -rin "legal plugin\|legal-plugin\|anthropic legal" --include="*.html" --include="*.md" . | grep -v docs/superpowers | grep -v client-notes/onsite-agenda   # expect NO output
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "fix(genre): purge legal-plugin references, repoint retired-lesson links, update docs"
```

---

### Task 9: Workshop folder + zip + demo doc stand-in

**Files:**
- Create: `assets/workshop-folder/README.txt` (+ generated `README.docx`), `assets/workshop-folder/claude.md`, `assets/workshop-folder/about-me/ABOUT-ME-TEMPLATE.txt` (+ .docx), `assets/workshop-folder/demo/treaty-layer-summary.txt` (+ .docx), `assets/workshop-folder/day-2/` (3 small status-source docs, .txt + .docx), `assets/workshop-folder.zip`
- Tooling: `escape-room/tools/convert-lab-files.py` (existing .txt→.docx converter — read its header for usage; extend its file list or run it pointed at the new folder, whichever its interface supports)

**Interfaces:**
- Consumes: folder-name convention `cowork-workshop` (Task 3), demo framing (open-first, business summary out).
- Produces: `assets/workshop-folder.zip` — the pre-work download; `demo/treaty-layer-summary.docx` — the Day 1 demo doc stand-in.

- [ ] **Step 1: Author the .txt sources.**
  - `README.txt`: what this folder is, the three-day map (which subfolder each day uses), "don't rename the folder," facilitator contact.
  - `claude.md`: starter folder-instructions file — two short paragraphs ("You are helping a Gen Re knowledge worker… check outputs against source documents; cite which file each claim came from").
  - `about-me/ABOUT-ME-TEMPLATE.txt`: the co-setup interview headings (role, team, what you produce weekly, how you like summaries formatted) with blank prompts.
  - `demo/treaty-layer-summary.txt`: the genericized stand-in on the TreatyLayerPricer theme — a 1.5-page quarterly treaty-layer summary for a fictional cedent ("Meridian Mutual"), with a data table, two buried inconsistencies (a total that doesn't sum; a date mismatch) so the "check things" demo has something real to catch, and **no real client names**. Head the file `[STAND-IN — swap for the genericized Gen Re source document when received; see facilitator guide TODO]`.
  - `day-2/`: `project-alpha-status.txt`, `vendor-update-email.txt`, `open-items-list.txt` — three short, internally consistent documents that a status report can be drafted from.
- [ ] **Step 2: Generate .docx** for README, ABOUT-ME-TEMPLATE, treaty-layer-summary, and the three day-2 files using `escape-room/tools/convert-lab-files.py` (business users get Word, per the Jul 29 precedent; keep the .txt as editable source of truth). `claude.md` ships as-is — it's the one file that *is* the concept being taught.
- [ ] **Step 3: Build the zip** (folder inside the zip must be named `cowork-workshop` so Extract-All lands `Desktop\cowork-workshop`):

```powershell
Copy-Item -Recurse assets\workshop-folder "$env:TEMP\cowork-workshop"
Compress-Archive -Path "$env:TEMP\cowork-workshop" -DestinationPath assets\workshop-folder.zip -Force
Remove-Item -Recurse "$env:TEMP\cowork-workshop"
```

- [ ] **Step 4: Verify** — extract the zip into the scratchpad; confirm the tree is `cowork-workshop/{README.docx, claude.md, about-me/, demo/, day-2/}` and every .docx opens (or at minimum is non-zero and unzips as valid OOXML: `python -c "import zipfile;zipfile.ZipFile('<file>').testzip()"`). Confirm `pre-work.html`'s link resolves: `test -f assets/workshop-folder.zip`.
- [ ] **Step 5: Commit**

```bash
git add assets/workshop-folder assets/workshop-folder.zip
git commit -m "feat(genre): pre-sent workshop folder zip + treaty-summary demo stand-in"
```

---

### Task 10: Facilitator scripts (day-1/2/3), retire workshop scripts

**Files:**
- Create: `day-1-script.md`, `day-2-script.md`, `day-3-script.md`
- Delete (git rm): `workshop-1-script.md`, `workshop-2-script.md`, `workshop-2-teleprompter.md`, `workshop-3-script.md`, `workshop-4-script.md`, `workshop-4-teleprompter.md`

**Interfaces:**
- Consumes: agendas from `client-notes/onsite-agenda.md`; lesson/hub links from Tasks 3–7; demo doc from Task 9. Keep the existing script conventions from `workshop-1-script.md`: **[SAY]** / **[DO]** / **[THEY]** / **[NOTE]** legend, run-of-show table, pre-session prep list.

- [ ] **Step 1: Write `day-1-script.md`.** Run of show mirrors the Day 1 hub agenda with minute marks summing to 2 h. Must include as [NOTE]s: hybrid PSA at open (remote attendees type questions; moderator relays); separate "watch me" from "you do" — never narrate over a live demo; show each step twice; the before-demo opens `treaty-layer-summary.docx` *in Word first* and walks the touchpoints; 5-minute silent work block in the lab; the personalization verify test ("ask Claude X, expect Y") called out verbatim; the after-demo replay; defer tangents offline. Pre-session prep: stage `cowork-workshop` on the presenter machine; test at 1366×768; confirm zip link works; `TODO`: swap demo doc when the Gen Re source arrives.
- [ ] **Step 2: Write `day-2-script.md`.** Run of show = the six-segment agenda table with minute marks. [NOTE]s: manual-first sequencing is non-negotiable (never teach skill anatomy before the workflow walk); facilitators roam; simple terminology (no skill-vs-agent-vs-connector unless asked); OneDrive sync gotcha if any demo touches a shared file; Skill Vault logistics (rooms, unlock flow — link `escape-room/README.md`); share-out format (one good skill vs. one so-so skill, what differs).
- [ ] **Step 3: Write `day-3-script.md`** covering both blocks. Block A (2 h): canvas review → room selects 1–2 use cases (selection criteria from lesson 04) → live skill build with the skill-creator loop → **backup-demo trigger**: if the live build stalls for >10 min, switch to the prepared demo skill; real 15-min break; share-out; 10-min governance snapshot (present lesson 17, don't improvise beyond it); close with next steps + office hours. Block B (1.5 h, Advanced): expectations level-set; use-case review round; guided engagement; recap with a written follow-up-actions list. [NOTE]s: validate canvases with Chris/Charles beforehand (`TODO`); this is the long day — protect the break.
- [ ] **Step 4: Delete the retired scripts**

```bash
git rm workshop-1-script.md workshop-2-script.md workshop-2-teleprompter.md workshop-3-script.md workshop-4-script.md workshop-4-teleprompter.md
```

Then `grep -rn "workshop-[1-4]-script\|teleprompter" --include="*.html" pages/ index.html` and repoint any hits to the new day scripts (facilitator guide most likely).

- [ ] **Step 5: Verify**

```bash
ls day-1-script.md day-2-script.md day-3-script.md
grep -c "\[SAY\]" day-1-script.md day-2-script.md day-3-script.md    # each ≥ 10
grep -n "workshop-[1-4]-script" -r pages/ index.html                  # expect NO output
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(genre): day-1/2/3 facilitator scripts replace workshop scripts"
```

---

### Task 11: Final verification sweep

**Files:** none created — fixes go wherever the sweep finds problems.

- [ ] **Step 1: Global greps**

```bash
grep -rin "legal plugin\|legal-plugin\|anthropic legal" --include="*.html" --include="*.md" . | grep -v docs/superpowers | grep -v client-notes/onsite-agenda    # NO output
grep -rn "Workshop [1-4]" --include="*.html" index.html pages/workshops/ pages/training/0*.html pages/training/17-*.html   # NO output on live pages (retired lessons excluded)
node --check nav.js && node --check training-sidebar.js && node --check footer.js && node --check pages/training/slides-engine.js
```

- [ ] **Step 2: `./serve` click-through checklist** — Home → each day card → hub → every lesson card → lesson → sidebar next/prev → each slide deck end-to-end (arrow through all slides, confirm step cards are one-per-slide and untruncated) → pre-work zip link downloads → escape room loads → resources deep-dive links open the retired lessons → retired lessons unreachable from nav/sidebar (spot-check `13-roles-and-access.html` shows Day-spine nav without claiming membership).
- [ ] **Step 3: Small-screen pass** — browser window at 1366×768: Day 1 hub, lessons 06 and 03, and one deck. No horizontal scroll, step cards readable, nav usable.
- [ ] **Step 4: Fix anything found, then commit**

```bash
git add -A
git commit -m "fix(genre): final onsite sweep — links, copy, small-screen"
```

---

## Self-Review (done at planning time)

- **Spec coverage:** spine remap → T1; step pattern → T2; Day 1/2/3 lessons → T3–T5; hubs incl. Advanced → T6; index/syllabus/pre-work/facilitator/resources (zip instructions, M365 caveat, hybrid PSAs, small screens) → T7; legal purge + retired links + CLAUDE.md/cowork-context → T8; zip + demo stand-in → T9; scripts → T10; testing section of spec → T11. Control-Room retirement → T6 step 4 + T8 step 2. No gaps found.
- **Placeholder scan:** intentional `TODO` markers are *deliverables* (spec §5: Gen Re-owned open items land as TODO markers in facilitator-facing copy) — not plan placeholders. Slide-emit helper name is deliberately deferred to reading the neighboring extractors (the engine's internal shape is authoritative; inventing a signature here would be the bug).
- **Type consistency:** folder name `cowork-workshop`, zip path `assets/workshop-folder.zip`, lesson file `17-governance-snapshot.html`, hub filenames, and craft colors are used identically across tasks.
