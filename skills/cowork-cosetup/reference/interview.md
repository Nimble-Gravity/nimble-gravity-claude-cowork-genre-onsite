# Co-setup interview — harvest checklist, adaptive question bank & file templates

Loaded only when running the interview (progressive disclosure). The goal is to build a
real picture of the user, then write `claude.md` + the `about-me/` files. Ask questions
**one at a time using Cowork's question popup (the modal), not inline in chat** — offer
answer choices where they help. Mark anything skipped with `[FILL IN]`; never invent an
answer.

## 1. Harvest first (if a connector is available)

If M365 (or any connector) is on, read before you ask and build a draft profile from:

- **Identity** — name, title, department, where they sit in the org, who they report to.
- **People** — who they email and meet with most (collaborators, reviewers, stakeholders).
- **Cadence** — recurring meetings and deadlines; what their week actually looks like.
- **Work** — the documents, systems, and data they touch; current projects and priorities
  from recent threads.
- **Voice** — tone, length, and sign-off from their sent mail and Teams messages.

Then use it to run a shorter, sharper interview rather than a full one: confirm what you
found in a line instead of re-asking it, skip any topic it already answered outright, and
let what it told you about their role and priorities decide which of the core-coverage
questions below matter most for them.

**No connector, or nothing readable? Do not fail.** Skip the harvest and ask the questions
below directly. Either path must finish and produce the files.

## 2. Identify role and domain

Before the full interview, establish what the user does and in what field — finance,
accounting, law, healthcare, sales, marketing, engineering, operations, HR, consulting, or
anything else. Confirm from the harvest, or ask. This drives which questions matter.

## 3. Core coverage (everyone — adapt and prioritize to the role)

- Identity and role: name, title, team, who they report to.
- Accountability: in one sentence, the outcomes they own.
- Where the week goes: the 3–7 tasks or deliverables that take most of their time.
- Priorities and current work; active projects.
- Audience and stakeholders: who they produce work for; who reviews or approves it.
- Tools, data, and domain rules: the systems and data they live in, plus any standards or
  regulations that bind the work.
- Voice and writing style (the most important area — ask several questions): formality;
  sentence feel; tone; jargon vs plain language and words they always use or avoid; format
  defaults (bullets vs prose, length, headings, openings, sign-offs); and how voice shifts by
  audience. Capture a short, real writing sample to anchor it.
- AI do's and don'ts (ask directly): what the AI should ALWAYS do in their name (cite sources,
  flag uncertainty, ask before sending, keep it tight) and NEVER do (invent figures, make the
  decision, overclaim, be sycophantic), plus the AI "tells" to avoid — clichés and filler,
  over-hedging, emoji, bullet overload, em-dash overuse.
- Standards: what "good" vs "rushed" looks like, and the review/approval steps they respect.
- Durable facts: fiscal year, recurring deadlines, naming conventions, constraints.

## 4. Branch by domain (don't read a fixed script)

Generate the questions that actually matter for the user's field, and let each answer shape
the next. Examples of where to dig:

- **Finance / accounting** — models and memos, materiality thresholds, GAAP/covenant
  frameworks, the review and sign-off chain.
- **Legal** — matter types, privilege, jurisdictions, citation standards, "draft for
  attorney review."
- **Healthcare** — clinical vs administrative work, PHI/HIPAA constraints, documentation
  standards.
- **Sales** — accounts and segments, pipeline stages, reusable collateral, client-facing vs
  internal tone.
- **Engineering / product** — systems and repos, specs and reviews, the definition of done.
- **Operations** — processes owned, systems of record, reporting cadence, what must never be
  automated without a human check.
- **HR / people** — confidentiality, policy, tone for sensitive communications.
- **Marketing** — brand voice, channels, claims and compliance review.

For any role not listed, apply the same instinct: find the deliverables, the standards, the
constraints, and the sign-off path.

## 5. File templates

`claude.md`
```
# Working with me
Read the about-me/ files at the start of each session. I'm [name], [role] on [team].
I'm accountable for [one sentence]. Default to my voice-profile and writing-rules for
any draft. When unsure about my context, check about-me/ before guessing.
Keep about-me/memory.md current: when you learn a durable fact during a session, add or
update it there, and review memory.md at the end of each session.
```

`about-me/about-me.md`
```
## Role
[title], [team]. I report to [who].
## Accountable for
[one sentence]
## Where my week goes
- [task 1] … [task 5]
## Audience & stakeholders
[who I produce work for; who reviews or approves it]
## Tools, data & domain rules
[M365, folders, systems; standards or regulations that bind my work]
## Good vs rushed
[what good looks like; what rushed looks like; my approval chain]
```

`about-me/voice-profile.md` — voice in detail: formality, sentence feel, tone, jargon level, words used/avoided, format defaults, and how it shifts by audience, plus a short "good" sample in their voice.
`about-me/writing-rules.md` — explicit AI do's and don'ts (always / never in their name), hard constraints, and the AI "tells" to avoid (clichés, filler, over-hedging, emoji, em-dash overuse).
`about-me/team.md` — seed from the harvest; add people and working norms as they come up.
`about-me/memory.md` — durable facts ("our fiscal year starts in April"); a living document the assistant updates during and after each session (per claude.md).
