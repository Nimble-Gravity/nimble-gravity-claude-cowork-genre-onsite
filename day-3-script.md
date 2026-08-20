# Day 3 — Gen Re Use Cases + Governance, and the Advanced Clinic · Facilitator Script
### Claude Cowork · **two blocks, 3.5 hours total**, same room, same afternoon · onsite + hybrid

> **Block A** conforms to `pages/workshops/module-3-workshop.html#agenda`.
> **Block B** conforms to `pages/workshops/module-4-workshop.html#agenda`.
> Detailed spine *under* [`facilitator-guide.html#workshop-3`](pages/workshops/facilitator-guide.html#workshop-3)
> and [`#workshop-4`](pages/workshops/facilitator-guide.html#workshop-4).

**Block A (2 hours, everyone):** everyone installs and runs the **ng-brainstormer** skill — an interview that
returns each person a ranked slate of ten candidate skills plus a deck — then the facilitator takes one item
from a room slate and builds the skill from it live, then a ten-minute governance snapshot. **Block B
(1.5 hours, by invitation):** a clinic — no curriculum, people bring what they're stuck on.

**This is the longest day of the three**, and for anyone in both blocks it is three and a half hours in the
same chair. Two things decide whether it lands: **pre-running the brainstormer beforehand**, and **protecting
the break**.

**Legend:** **[SAY]** talk track · **[DO]** you act · **[THEY]** participants act · **[NOTE]** facilitator note

---

## Pre-session prep

1. **`TODO` — pre-run the brainstormer, end to end. Not optional.** Download
   [`ng-brainstormer.skill`](assets/ng-brainstormer.skill) from the resource library, install it, sit the
   interview on your own role, and let it build the deck — so you know the timing cold and a **known-good
   slate exists in the room** whatever the live runs produce. Then walk the *kinds* of slate item you'd pick
   for the live build past Chris and Charles. The named risk: IT-flavoured ideas — **status roll-ups are the
   specific example** — may not land with executives who *receive* reports rather than compile them. Picking a
   row the room rejects costs you the lab, and there is no recovering that inside a 130-minute agenda. Open
   item on Nimble Gravity; not yet done.
2. **`TODO` — confirm files can be staged for the build.** Whichever slate item gets picked, the live build
   needs its real files in a folder everyone can reach — so a likely demo workflow with stageable files has to
   be confirmed in advance. Open item: Gen Re, Chris sourcing. **Until it is confirmed, the backup demo is the
   plan of record rather than the fallback** — plan the block that way and be pleasantly surprised.
3. **Build and rehearse the backup skill.** Have it finished, tested, and open in a side window before the
   block starts. See [the trigger](#backup-trigger) below. The prepared skill is
   `skills/solution-profile/SKILL.md` and it runs against `assets/demo/solution-profile-folder/` — the
   TreatyLayerPricer files. **Copy that folder somewhere local and rehearse the five moves on it**, so the
   fallback is a rehearsed demo rather than an improvisation.
4. **Know the four tests cold** —
   [Lesson 1 §From list to first build](pages/training/04-use-cases-by-industry.html#start) — so when the
   slates land you can pick the demo item in front of the room and defend the pick in one sentence per test.
5. **`TODO` — re-verify the governance facts. Not yet done.** `cowork-context.md` §Module 4 was last verified
   **2026-07-21**, and the date stamps on the lesson, the cheat sheet and the Rules of the Road all say so
   deliberately — **they have not been silently bumped, because the facts have not been re-checked.** Work
   through the Sources in `cowork-context.md` §5 before Thursday: the audit-coverage gap, the retention
   numbers, the ZDR boundary, and the model lineup. If a fact has moved, fix it on
   `pages/training/17-governance-snapshot.html`, `pages/workshops/cheat-sheet.html` §06 and
   `pages/workshops/acceptable-use.html` — all three — and update the stamps together. **If you arrive not
   having done it, say so in the room** rather than presenting a month-old fact as current. Open item on
   Nimble Gravity.
6. **Test at 1366×768. Two windows.** A live build with a file tree, a skill file and a chat pane will not fit
   three ways. Decide in advance which two windows you drive and stick to them.
7. **Name your moderator.** Fill `[MODERATOR]` here and it is filled everywhere in this script:
   `[MODERATOR]` = `[FILL IN]`. And for Block B, **get the invitation list** (Gen Re open item,
   Chris) so you know how many cases you're sizing 45 minutes for.
8. **Confirm the room and the break.** Fifteen minutes, laptops down, and somebody has to have arranged
   coffee. This is the item that gets forgotten and it is the one the room will remember.

---

# BLOCK A · Gen Re Use Cases + Governance Snapshot (2 hours)

### Run of show — as published on the hub
| Time | Slot | Content |
|---|---|---|
| 0:00–0:15 | **Open** | Connect & frame — recap Days 1–2, install ng-brainstormer together |
| 0:15–0:35 | **Lab** | Run the interview — everyone gets a ranked slate of ten |
| 0:35–1:15 | **Lab** | Build a skill from the chosen slate item — live |
| 1:15–1:30 | **Break** | A real one. Laptops down. |
| 1:30–1:50 | **Debrief** | Share-out & discussion |
| 1:50–2:00 | **Teach** | Governance snapshot |
| 2:00–2:10 | **Close** | Next steps, who to contact, office hours |

## ⏱ THE ARITHMETIC PROBLEM — read this before you plan the block

**These rows total 2 hours 10 minutes against a block billed as 2 hours.** That is the client's own agenda and
the hub reproduces it faithfully; it is not a transcription error on our side. **Do not pretend it works.**
Decide before Thursday which version you are running, and say so at the open.

**Ask first:** is the room's hard stop at 2:00 or 2:10? If Block B starts immediately afterwards, or if people
have a 2:00 commitment, **the ten minutes has to come out** — Block B starting late eats the only working time
its attendees get.

**If you have to fit 120 minutes, cut in this order and stop as soon as you're inside:**

| # | Cut | From → to | Saves | Why it's first |
|---|---|---|---|---|
| 1 | **Share-out & debrief** | 20 → 15 min | 5 | The facilitator guide names this as the flex. Three shares instead of five. |
| 2 | **Connect & frame** | 15 → 10 min | 5 | Recap in three sentences and go straight to the download — the install steps live in the lesson, not in a lecture. |
| 3 | **Run the interview** | 20 → 15 min | 5 | Only if 1 and 2 weren't enough. Cap the interview short and pick from the slate as it stands — the deck build catches up on its own. |
| 4 | **Lab** | 40 → 35 min | 5 | Last resort. Switch to the backup skill earlier rather than shortening the build's ending. |

**Never cut, in any version:**
- **The break.** Fifteen minutes, laptops down. *"If you're behind, take the time from the share-out. Not the
  break."* A tired room stops asking questions and you lose the signal the debrief runs on.
- **The governance snapshot.** Ten minutes. It is the deliverable half the room's managers care about.
- **The close.** Ten minutes. Next steps and office hours are what turns three days into adoption.

**[SAY] at the open, plainly — do not hide the maths:** *"Housekeeping. The agenda you were sent runs about
ten minutes past the two hours. We finish at `[TIME]`, and I've taken the ten out of the discussion blocks
rather than the break or the build. If we're running long I'll shorten the share-out, not the lab."*

---

## Open · 0:00–0:15 (15 min) — Connect & frame

**[SAY] — hybrid PSA, verbatim (third of four today — Block B opens with a shortened one):**
> *"Same rule as Tuesday and Wednesday: the audio in this room does not carry the people on the call — **they
> cannot speak to us.** Remote, type in the chat, [MODERATOR] is watching it and will read your questions in. And
> for the second block this afternoon, that matters more than it has all week, because that block is entirely
> people asking questions."*

**[SAY] — recap in three sentences:** *"Tuesday you taught it who you are and saw what checking is worth.
Wednesday you did a workflow by hand and then wrote it down. Today Cowork does the ideation for you — a skill
interviews you and hands back ten ranked places to start — we build one of those items in front of everybody,
and then ten minutes on the questions your team will ask you: what's connected, who can turn what on, and
where the data goes."*

**[SAY] — the frame, and repeat the week's line:** *"Same steer as day one. The pitch is not that this makes
you faster. It's that it helps you **check** things — and today we're making that repeatable for one specific
piece of your work."*

### The download · ~8 min
**[DO]** Open [Lesson 1 §The brainstormer](pages/training/04-use-cases-by-industry.html#brainstormer) on the
projector — the **download button is at the top of the section**, no detour via the resource library — and
walk the room through the install together, at the pace of the slowest machine: download the zip, unzip it,
drop the `ng-brainstormer` folder into the Cowork skills folder. Drive from the lesson, not from memory.

**[SAY] — the frame for what they're installing:** *"Yesterday you wrote a skill description and learned why
the wording decides whether it ever fires. Right now you're on the other side of one — this is a finished,
shipping skill, and by the end of the block you'll have watched it interview you, hand you a ranked list of
ten places to start, and build you a deck while you weren't looking."*

**[DO]** Everyone verifies the same way: ask Cowork to *"brainstorm Cowork skills for my role"* and confirm it
announces the skill. Anyone whose install fails pairs up with a neighbour — **do not debug installs on the
projector**; hand them to [MODERATOR] and keep the room moving.

**[NOTE]** Have the zip staged somewhere local as well as on the portal — a USB stick or a shared folder —
so one flaky download doesn't cost the block its schedule.

---

## Lab 1 · 0:15–0:35 (20 min) — Run the interview

**[SAY] — mode:** *"Hands **on**. Everyone runs this against their own role, at the same time. Your pre-work
notes are the answers — the recurring meetings, what you're accountable for, which tools and data you touch.
Answer about the week you actually have, not the one your job description describes: it brainstorms from your
Tuesdays, and it's only as good as what you tell it."*

**[DO]** Everyone triggers the skill — *"brainstorm Cowork skills for my role"* — and sits the interview.
Roam. The people who wrote real pre-work notes will be at the slate in ten minutes; the people who didn't will
need a nudge toward specifics.

**[SAY] — at the checkpoint, when slates start landing:** *"It stops and shows you all ten before going
deeper. Pick the three to five that get the full treatment. Then tell it to build the deck and **leave it
running** — that's the Day 1 lesson made physical: it works through the next block and the break, and your
deck is done by the share-out."*

**[DO] — pick the demo item, out loud, at ~0:28.** Ask two or three volunteers to read a row from their
slate. Hold each against the four tests from
[Lesson 1 §From list to first build](pages/training/04-use-cases-by-industry.html#start): *"Buildable this
afternoon means four things: **documents you could put in a folder right now**; **an output you'd recognise as
right**; **nothing confidential in it**; and a **low difficulty score — a 2 or 3, not an 8.**"* Then commit to
one. You are buying a commitment, not consensus.

**[SAY] — the honest filter:** *"A row we don't build this afternoon isn't a worse idea, it's a bigger one —
and unlike every other workshop you've sat in, the ideas we're not doing go home with you ranked and priced."*

**[DO]** With the item chosen, capture the half page on the projector, in the room's words — this is the same
shape as yesterday:
1. The steps, in order.
2. Where the inputs live.
3. What good output looks like versus bad.
4. The sentence that should make it fire — *in the words somebody would actually type.*

**[SAY] — connect it back:** *"That's exactly the half page you wrote for homework, and it's most of what the
slate row already says. The only difference is this one is ours and we're going to run it."*

**[NOTE]** If no live slate produces a clean pick — thin interviews, stalled runs, or every good row failing
the confidentiality test — use **your own pre-run slate** from prep item 1 without apology: *"I'll lend you
one of mine."* That slate exists precisely so this moment can't fail.

**[NOTE]** If the room drifts into "could it also do X" — parking list, out loud, with a name against it. One
unmanaged tangent costs you the lab and there is no float in this block.

---

## Lab 2 · 0:35–1:15 (40 min) — Build it live

**[SAY] — mode:** *"Hands **on**. I'm driving on the screen and you're following on your own machine with the
same files. If you fall behind, don't panic and don't try to catch up silently — hand up."*

### The loop, out loud · 0:35–1:05
**[SAY] — lead with what we're doing:** *"Five moves, and I'll name each one as we do it. Capture what we
want. Draft the skill. Test it cold. Grade the difference. Fix only what the test caught."*

**[DO] — 0. Same folder as the last two days.** *“Open `Desktop\cowork-workshop` — the same folder you have
had open since Tuesday. Your `about-me/` files are still in it, so the skill we write today inherits the
voice and the role you set up on Day 1 rather than starting cold. That is the whole point of having written
them down.”* This is what `README.docx` told them Day 3 would do; say it out loud so the folder is open
before the build starts, not during it.

**[DO] — 1. Capture.** Paste the half page into a fresh session on the staged folder and ask for a skill:
*"turn this into a skill that fires whenever I ask for `[the trigger phrase]`."*

**[DO] — 2. Read the draft against the rules, on screen.** Point at the description: is it third person, and
does it contain the words you'd actually type? Is the body short, with the why beside each rule?
**[SAY]** *"This is the bit people skip. The model writes a fine-looking description that nobody would ever
trigger. Read it as 'would my Thursday-afternoon sentence match this?'"*

**[DO] — 3. Test it cold.** Fresh session. Run the same ask **with** and **without** the skill loaded, and
show both. **[SAY]** *"That's the grading. If you can't see a difference, the skill isn't doing anything — and
that's a real result, not a failure."*

**[DO] — 4. Fix one thing.** Add the single instruction that closes the gap the test found. Nothing else.
**[DO] — 5. Save it.**

**[SAY] — the verification habit, again:** *"And notice what we put in the body — source every claim, say when
the sources disagree, say when something isn't there. Same three sentences as yesterday. **Written down once,
so nobody has to remember them on a Friday.**"*

<a id="backup-trigger"></a>
### 🛟 The backup-demo trigger — decide the switch point before you start
**[NOTE]** The facilitator guide's call is **roughly five minutes of visible struggle**. Treat that as the
decision point and **ten minutes as the hard ceiling — never go past it.** If you are still debugging at ten
minutes, you have already lost the room.

**[SAY] — the switch line, say it plainly and without apology:** *"I'm going to show you one I built earlier,
and we'll come back to this at the end."*

**[DO]** Switch to the prepared skill, already open in a side window, and run the same five moves on it at
pace. Then, if time allows in the last five minutes, come back to the stalled one *as a debugging demo* —
which is genuinely useful content, but only when you choose it rather than when it happens to you.

**[NOTE]** Deciding to switch is not a failure of the session. A fifteen-minute silent debug in front of the
room is.

### Everyone runs it · 1:05–1:15
**[THEY]** *"Ten minutes. Load the skill on your own machine and run it against the files. Then change one
line of the description and run it again — that's the fastest way to feel what the description is doing."*
**[NOTE]** Roam. This is the last hands-on block of the week and it is where the last questions surface.

**[NOTE] — the OneDrive gotcha, one more time.** Staged files in a synced folder will bite. Local copies.

**[NOTE] — question-preempt, only if asked.** *"Can it tune the description for me automatically?"*
Anthropic's skill-creator **can** auto-tune a description with its `run_loop` optimizer, **but that step needs
a raw `ANTHROPIC_API_KEY`** — anyone signed in through SSO cannot run it. Answer: *"There's an automatic
optimizer, but it needs a raw API key and SSO sign-in doesn't provide one. You tune by hand instead, exactly
the way we just did — and honestly, on your first few skills you learn more doing it by hand."* **Do not raise
this unprompted** — it is a five-minute detour into a step nobody in Block A needs.
It was cut from **Lesson 2 (Skill Anatomy)** for being too technical, **not from the site**: if somebody looks
it up they will find it live at
[Make It a Skill §The optimizer needs a raw API key](pages/training/10-make-it-a-skill.html#caveat) and
answered on the [FAQ](pages/workshops/faq.html). Point them there rather than contradicting the portal.

---

## Break · 1:15–1:30 (15 min) — a real one

**[SAY]** *"Fifteen minutes. **Laptops down** — actually down. Coffee is `[WHERE]`. Back at `[TIME]`."*

**[NOTE] — protect this.** It is the client's explicit ask and it is the item most likely to get eaten. If you
are behind, take it from the share-out. A tired room stops asking questions and the debrief is where you find
out whether any of this landed.

**[NOTE]** Ask the moderator to tell the remote attendees the exact return time in the chat — they have no
room cues and will otherwise sit and wait.

**[NOTE]** Use the break to check the Block B invitation list against who is actually in the room, and to
confirm the room is set for the clinic.

**[SAY] — coming back from the break, repeat the PSA. This is the only break in the three days, so this is
the only place the repeat happens:** *"Welcome back — and for anyone who has joined us over the break: the
audio in this room does not carry the people on the call, **they cannot speak to us.** Remote, type in the
chat; [MODERATOR] is watching it and will read your questions in."*

**[NOTE]** `facilitator-guide.html#hybrid` is explicit that the PSA is repeated after the first break —
*"the people who join late are the ones who most need to hear it."* On Day 3 the post-break arrivals are
often the Block B invitees turning up early, and they are precisely the people who will have questions.

---

## Debrief · 1:30–1:50 (20 min — cut to 15 if the block is at 120)

**[SAY] — mode:** *"Hands off. Screens down — after one thing: open the deck. The build you kicked off at
half past finished while you were on your break. That's the other deliverable of the block — your ten,
ranked and priced, in a deck your manager can read. The total slide is napkin math and says so on the page:
treat it as a ranking and a baseline, not an audit."*

**[DO]** Take shares in this format, ninety seconds each — say the format first and hold them to it:
> **Which row from your slate you'd build first, and why · what the live-built skill got right and wrong ·
> what you'd have to check before anyone else used it.**

**[NOTE]** That third clause is the one that matters and the one people skip. Push for it every time:
*"before you let a colleague run this on Monday, what do you check?"*

**[NOTE]** Take at least one remote share, and take it **second or third** — not last. Late shares get cut and
remote attendees are always the ones cut.

**[SAY] — the honest summary, whichever way the build went:** *"Here's where we actually are. We have
something that works on the files it was built on. That's a real thing and it's less than a finished product.
The distance between them is testing it on work you didn't build it for — and that's what office hours are
for."*

**[THEY]** *"Two minutes — the knowledge check at the end of
[Governance Snapshot](pages/training/17-governance-snapshot.html)."*
**[NOTE]** Skip the knowledge check first if you are compressing this block to 15 minutes.

---

## Governance snapshot · 1:50–2:00 (10 min)
*Present [Lesson 2](pages/training/17-governance-snapshot.html). **Ten minutes. Present it; do not improvise
beyond it.***

**[NOTE]** This is the highest-scrutiny ten minutes of the week and the one where an off-the-cuff answer does
real damage. Stay on the lesson. Three sections, roughly three minutes each, then the take-back version. If a
question goes past the lesson, say *"I don't want to guess at that — I'll come back to you with the precise
answer"* and put it on the parking list. That is a better answer than a confident wrong one, in this room
especially.

**[SAY] — 1. What's connected** *([§Connected](pages/training/17-governance-snapshot.html#connected))*:
*"**Local folders — yes**, the ones you grant, and only those. **Microsoft 365 — read-only**; it's live at
Gen Re — Claude can read mail, calendar, Teams messages, and SharePoint/OneDrive, but it can't send email or
write anything back — and nothing you did this week depended on it. **Anything else — review first.** And one thing worth
saying plainly: there are no per-file permissions. The folder grant **is** the control. That's why rule one
all week was 'work only in the workshop folder'."*

**[SAY] — 2. Roles at a glance** *([§Roles](pages/training/17-governance-snapshot.html#roles))*: *"What you
decide as a member: which folders, which permission mode, which model. What only an administrator can turn on:
connectors, capabilities, and who's in what role. Two things catch people — **ask for the narrow role, not
Owner**, because Owner is not an admin convenience; and a **Custom role inherits nothing**, so a custom role
with one box ticked can do exactly one thing."*

**[SAY] — 3. How data is handled** *([§Data](pages/training/17-governance-snapshot.html#data))*: *"Your files
stay where they are — the **reading** doesn't. Content goes to Anthropic to be processed and comes back. And
here is the uncomfortable one, and I'd rather you heard it from me: **Cowork activity is not in Anthropic's
centralized audit logs today, and your session history is local to your machine.** No date has been published
for closing that. What covers it in the meantime is exactly what we've been doing all week — narrow folder
grants and approvals on. What your admins run is **three planes of monitoring, and no single one is enough**
— the **Compliance API** for organization-level administrative activity, **OpenTelemetry** for session-level
visibility, which emits nothing until an admin configures an endpoint, and an on-device **proxy or LLM
gateway** at the network boundary. And **work that genuinely needs centralized audit or zero retention routes
to Anthropic's audited surfaces — the API or Claude Code Enterprise — not to this interface.**"*

**[NOTE]** Those are the three planes named in
[§Data, item 04](pages/training/17-governance-snapshot.html#data). Say all three. "The admin dashboard" is not
one of them and is not a sufficient answer in this room.

**[NOTE]** Name the gap yourself before somebody else does. Do not overstate it and do not soften it, and do
not imply a fix date — none has been published. **Date-sensitive:** these facts were verified 2026-07-21;
re-check them against the Sources in `cowork-context.md` before you present.

**[SAY] — the take-back version** *([§Take it back](pages/training/17-governance-snapshot.html#takeaway))*:
*"You'll get asked these three in a corridor by Monday, so here they are in a form you can say standing up —
on access, on the output, and on audit when they push. They're on the lesson page and on the
[cheat sheet](pages/workshops/cheat-sheet.html). Take the cheat sheet."*

---

## Close · 2:00–2:10 (10 min)

**[SAY] — next steps, three of them, concrete:** *"Three things. **One:** finish your `[FILL IN]`s and keep
using your personalization — it decays if you never touch it. **Two:** take the skill we built, or your own
half page, and run it on next week's real version of that work. **Three:** the rank-2 on your slate that we
didn't build is first in the queue at office hours — bring it, and bring the deck."*

**[SAY] — who to contact:** *"For anything Cowork-shaped: **Derrikk Broughton at Nimble Gravity —
derrikk.broughton@nimblegravity.com**. For anything licence-, connector- or access-shaped: `[FILL IN]` at
Gen Re. Office hours are `[FILL IN]` — bring the thing that didn't work, not
the thing that did."*

**[SAY] — the close of the week:** *"Three days, and the sentence I'd want you to leave with is the same one
from Tuesday morning: it drafts, you check, you sign. Everything else was mechanics."*

**[DO]** [Feedback link](pages/workshops/feedback.html) in the chat and read out loud. Moderator posts it for
remote. **[DO]** If Block B follows, say clearly who is staying and where the rest go, and start Block B on
the clock.

---

# BLOCK B · Advanced — Build Your Own (1.5 hours, by invitation)

*A clinic, not a curriculum. There is nothing to teach — the content is whatever people bring, and your job is
to route ninety minutes at the most blocked things.*

### Run of show
| Time | Slot | Content |
|---|---|---|
| 0:00–0:15 | **Open** | Connect & frame — level-set session expectations |
| 0:15–0:35 | **Review** | Round the room: each person's use case and where it's stuck |
| 0:35–1:20 | **Work** | Guided engagement — hands on keyboards, facilitators roaming |
| 1:20–1:30 | **Close** | Recap & next steps — written follow-up actions |

**[NOTE]** Ninety minutes, and two thirds of it is working time. The first thirty-five minutes exist only to
make that working time land on the right things.

## Open · 0:00–0:15 (15 min) — Level-set expectations

**[SAY] — hybrid PSA, shortened but say it:** *"Remote attendees can't be heard in this room — chat only,
[MODERATOR] is reading it in. In a session that is entirely questions, that matters more than usual, so I'll be
checking the chat myself as well."*

**[SAY] — what this is:** *"This is a clinic. There is no deck. You brought something that isn't working or
isn't good enough, and we spend ninety minutes on the queue. We'll work it by **what's most blocked**, not by
who spoke first."*

**[SAY] — what this isn't, and be honest about it:** *"Ninety minutes will not clear every case. What I can
promise is that **nothing leaves this room as 'we'll see'** — anything we don't finish gets written down in
the last ten minutes with a name against it and a route: office hours, a direct follow-up with us, or
something Gen Re has to turn on first."*

**[SAY] — what makes a good bring-along, so people can self-correct now:** *"Three things make a case workable
in here: **the real files**, so we're not working from a description; **a workflow you own**, so you can tell
whether the output is right; and **one question, stated plainly.** 'How could I use this?' gets a vague
answer. A broken skill open on screen gets fixed. If yours is currently the first kind, spend the next block
making it the second kind."*

**[NOTE]** If the room is smaller than the invitation list, say so and re-plan the queue out loud —
fewer people means deeper on each, and that is a better session, not a worse one.

## Review · 0:15–0:35 (20 min) — round the room

**[DO]** Two minutes each, no more. Everyone hears every case **before** anyone starts working, so overlaps
surface early. Format:
> **What the case is · where exactly it's stuck · what you've already tried.**

**[DO]** Write every blocker on the board as you go. **That list is the working order for the next 45
minutes.**

**[NOTE]** Keep it to two minutes. This block overruns more reliably than any other in the three days, and
every minute it steals comes straight out of working time. Say at the start: *"two minutes each, I will cut
you off, and it's not rude."*

**[SAY] — after the round, name the pattern out loud:** *"Three of you have the same problem — `[X]`. We'll do
that one on the projector first, once, for everybody. The rest we take one-to-one."*

**[NOTE]** Take remote cases into the round in the middle of the order, not at the end, and confirm with the
moderator that you have them all before you close the round.

## Work · 0:35–1:20 (45 min) — guided engagement

**[SAY] — mode:** *"Hands on for forty-five minutes. Screens up, shared if you want a second pair of eyes.
We're coming to you."*

**[DO]** Work the board in blocked-first order. **Pull a fix onto the projector whenever two or more people
have the same problem** — fix it once, in front of everybody. Otherwise stay one-to-one and keep moving.

**[NOTE] — the usual suspects, in the order they come up:**
- *"It doesn't fire."* — the description. Nine times out of ten. Ask *"what would you actually type?"* and put
  those words in.
- *"The output isn't good enough."* — the skill says what steps to take but never says what good output looks
  like. Add that section.
- *"It works for me but not for my colleague."* — it depends on context only they have. Make the implicit
  explicit.
- *"It can't see the file."* — sync. OneDrive/SharePoint. Local copy, then re-test.
- *"Can I automate it on a schedule?"* — not until the manual version is reliable; automating an unchecked
  process produces wrong answers faster.
- *"Can it tune the description automatically?"* — the `run_loop` optimizer needs a raw `ANTHROPIC_API_KEY`
  and SSO-only sign-in doesn't provide one. Tune by hand. (Only if asked.)

**[NOTE]** Anything governance-shaped: give the Block A answer, precisely, and route the rest. Do not
improvise. The audit-coverage gap answer is the same in this room as in the last one.

**[NOTE]** Watch the clock hard. The row runs to 1:20, but **stop working at 1:15 — the last five minutes are
a deliberate buffer**, not spare working time. People need to save what they were mid-way through, and the
close is the deliverable and the first thing to get squeezed. If everyone is at a clean stopping point at
1:15, use the buffer to start the follow-up list early.

## Close · 1:20–1:30 (10 min) — recap & follow-up actions

**[SAY]** *"Ten minutes, and this is the part that makes the session count. We're writing the list."*

**[DO]** On the projector, live, so everybody sees their own item go down. **Every unresolved case gets a
row** — no exceptions, including the ones we half-fixed:

| Case | Whose | What's outstanding | Owner | Route |
|---|---|---|---|---|
| | | | | office hours / NG follow-up / Gen Re to enable |

**[SAY] — read it back:** *"I'm going to read this list out. If your thing isn't on it, say so now, because
this is what gets circulated."*

**[DO]** Confirm the **route** on each row out loud — office hours, a direct follow-up from the Nimble Gravity
team, or something Gen Re has to turn on first. A row with no route is not finished.

**[SAY] — circulation, and commit to a date:** *"This list goes out by `[FILL IN]`, to everybody in this room
and to Chris and Charles. If your item needs something switching on at Gen Re, it goes on their list, not
into a folder."*

**[SAY] — close:** *"Office hours are `[FILL IN]`. Bring the thing that didn't work. Thanks — genuinely — for
bringing real cases; a clinic only works when people are willing to show something broken."*

**[DO]** [Feedback link](pages/workshops/feedback.html), chat and out loud.

---

### Facilitator appendix

- **The single biggest risk on Day 3 is walking in without having pre-run the brainstormer.** Not the live
  build — the build has a backup. If the live interviews run thin and no known-good slate exists, there is
  nothing to pick the demo item from at 0:28 and the lab dies on stage. Do prep item 1.
- **If the live build stalls:** switch at ~5 minutes of visible struggle, hard ceiling 10. Say the line, run
  the prepared skill, come back to the stall at the end **if** you have time and want it.
- **If the room won't converge on a use case:** you pick, out loud, and own it. *"We're doing A because we
  have the files for it in the room. B goes first at office hours."* A decided-badly lab beats a
  democratically-undecided one.
- **If Block A runs to 2:10 and Block B attendees are waiting:** start Block B on time anyway and shorten its
  Open, not its working time. Their forty-five minutes is the whole reason they're there.
- **If somebody asks a governance question you can't answer precisely:** *"I don't want to guess at that."*
  Parking list, named owner, a date. This is the room where a confident wrong answer costs the most.
- **Lines worth keeping verbatim:** *"here's one I built earlier"* · *"a row we don't build isn't a worse
  idea, it's a bigger one"* · *"I'll lend you one of mine"* · *"nothing leaves this room as 'we'll see'"* ·
  *"it drafts, you check, you sign."*

### Script ↔ hub sync notes
- **Block A agenda** matches `pages/workshops/module-3-workshop.html#agenda` row for row: 0:00–0:15 /
  0:15–0:35 / 0:35–1:15 / 1:15–1:30 / 1:30–1:50 / 1:50–2:00 / 2:00–2:10. **Those rows total 2:10 against a
  2-hour block** — the hub flags the overrun in its own facilitator cue, `client-notes/onsite-agenda.md` is
  where it originates, and the cut order above is this script's answer to it. If the client re-times the
  block, all three change together.
- **The break is not flex.** `facilitator-guide.html#workshop-3` ("if you're behind, take the time from the
  share-out — not the break") and this script agree; the Day 3 hub's agenda cue was corrected to name only
  the share-out as the flex, because it previously said "the break and the share-out" and participants read
  the hub first.
- **Block B agenda** matches `pages/workshops/module-4-workshop.html#agenda`: 0:00–0:15 / 0:15–0:35 /
  0:35–1:20 / 1:20–1:30 = 1:30.
- **The four tests** = `pages/training/04-use-cases-by-industry.html#start`; the brainstormer and its
  install steps = `#brainstormer`; example slate rows = `#slate`; the skill zip = `assets/ng-brainstormer.skill`
  (unpacked at `skills/ng-brainstormer/`).
- **Governance content** = `pages/training/17-governance-snapshot.html` (§`#connected`, `#roles`, `#data`,
  `#takeaway`). Facts date-stamped 2026-07-21 in `cowork-context.md` §Module 4 — re-verify before delivery.
- **Backup demo, the brainstormer pre-run and the break** are all documented as facilitator guidance in
  `facilitator-guide.html#workshop-3`; the clinic notes in `#workshop-4`.
