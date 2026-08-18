---
name: cowork-cosetup
description: Interviews a new Claude Cowork user and writes their personalization files — claude.md plus an about-me/ folder — so Cowork knows their role, voice, priorities, and team from the first session. Use at first-time setup, when onboarding someone to Claude Cowork, when a user asks to "set me up", "personalize Cowork", or run "co-setup", or whenever Cowork is giving generic, role-blind answers that ignore who the user is.
---

# Cowork Co-Setup

Run a short guided interview, then write the personalization files that make Cowork
play back who the user is and tailor its help to their actual job. The interview is
the point: most users never write these files by hand, so Cowork stays generic. This
skill produces them in 20–40 minutes.

## When to run

- A fresh Cowork user with no `claude.md` yet (the common case).
- A returning user who wants to refresh their profile after a role change.

Do **not** silently overwrite an existing profile — if `claude.md`
already exists, summarize what's there and ask before changing it.

## What you produce

```
claude.md      ← entry point, read at the start of every session
about-me/
  about-me.md                ← role, responsibilities, priorities, tools
  voice-profile.md           ← how the user writes and wants drafts to sound
  writing-rules.md           ← do / don't rules for any drafted output
  team.md                    ← living: who they work with and how (update over time)
  memory.md                  ← living: durable facts worth remembering across sessions
```

These live in your Claude Cowork skills/instructions location — ask Cowork to "list
my skills" to find it.

Note for the user: these are **context/instruction files, not skills**. Installing a
skill is a separate step and is what creates the skills folder.

## The interview

Run it in three moves; see `reference/interview.md` for the harvest checklist, the
adaptive question bank, and the file templates.

1. **Harvest first.** If the M365 (or another) connector is available, read everything you
   reasonably can before asking anything — name, title, department and org position,
   manager, frequent collaborators, recurring meetings, the documents and data they work
   with, current priorities, and their writing voice from sent mail and Teams messages —
   and build a draft profile. Use it to skip questions it already answered and to steer
   which ones matter most in what follows, confirming only what's uncertain rather than
   re-asking from scratch. **If nothing is connected or readable, do not fail — just ask
   the questions directly to fill every gap.**
2. **Adapt to the role and domain.** Work out what the user does and in what field
   (finance, law, healthcare, sales, engineering, ops, HR — anything), then generate the
   questions that matter for *that* work. Don't read a fixed script; let each answer
   shape the next question.
3. **Ask one at a time, in the modal.** Put each question in Cowork's question popup (the
   modal) — one at a time, not inline in chat — with answer choices where they help. Aim
   for 20–40 minutes; mark skips with `[FILL IN]`, never invent an answer, and read back a
   recap before writing.

## Writing the files

- Write `claude.md` as a short entry point that points to the `about-me/`
  files — progressive disclosure, not one giant file.
- Keep each `about-me/` file focused on its one topic.
- Use plain, first-person statements ("I lead…", "I prefer drafts that…").
- Leave `team.md` and `memory.md` deliberately thin; they grow with use. In `claude.md`,
  instruct ongoing upkeep — update `memory.md` during and after each session whenever a
  durable fact comes up.

## After setup

Tell the user to start a **fresh session** and run two prompts to feel the difference:
1. "Recap what you know about me." — Cowork should play back role, voice, priorities.
2. "Given who I am, what are the three highest-leverage things you could help me with
   this week?" — the offers should now fit their job.

If the playback is generic, a file is empty or wrong — open it, fix it, and re-run.
