# Day 1 — Foundations & Personal Value · Facilitator Script
### Claude Cowork · 2 hours, hands-on · **onsite + hybrid** (conference room, some attendees dialled in)

> **Conforms to the Day 1 hub** (`pages/workshops/module-1-workshop.html#agenda`) minute for minute —
> six slots, 2 hours. This is the detailed spine *under*
> [`facilitator-guide.html#workshop-1`](pages/workshops/facilitator-guide.html#workshop-1); the guide holds
> the standing rules and room logistics, this holds the talk track. Where they disagree, the guide wins and
> somebody fixes this file.

**Outcome:** every participant leaves with (1) their own personalization files written by them and living in
`Desktop\cowork-workshop`, and (2) a way to **check** whether what Cowork hands back is actually supported by
the document it read.

**The client's steer, and the frame for the whole day:** *"we can help people **check** things"* — not "we can
help people whip through things." This room is manager-level insurance business people — actuaries,
underwriters, claims, finance. Speed is not the pitch. Verification is.

**Legend:** **[SAY]** talk track · **[DO]** you act · **[THEY]** participants act · **[NOTE]** facilitator note

---

## Pre-session prep

1. **Stage TWO folders on the presenter machine. This is the mechanism the whole day runs on** — the demo
   has to be **cold at 0:50** and **personalized at 1:50**, on one machine, in front of the room. You get
   that from two folders, not two laptops:

   - **`Desktop\cowork-workshop`** — the **cold** folder. Extract `assets/workshop-folder.zip` **to the
     Desktop**. The zip's own root folder is already named `cowork-workshop`, so pick **Desktop** as the
     destination and let it create the folder; do **not** type the folder name into the extract path or you
     get `Desktop\cowork-workshop\cowork-workshop` and every prompt in the room is wrong. Leave it exactly
     as it ships — the thin `claude.md`, the template-only `about-me/`. **Never run a personalization
     session against this folder.**
   - **`Desktop\cowork-workshop-after`** — the **personalized** folder. Copy the whole folder, then drop
     your own real `claude.md` and `about-me/` files into the copy (yours need a `writing-rules.md` that
     says something like *never state a figure you can't source*, or the after-run has nothing to do). Build
     this **before Tuesday**, not live.

   **How you switch, and it is the only move:** the folder picker, plus a **fresh session**. Cowork reads
   `claude.md` and `about-me/` **from the folder you granted, at session start** — not mid-conversation. So
   same machine, same sign-in, same app: cold or personalized depends purely on which folder you pointed it
   at and whether you opened a new session. Rehearse the switch until it takes you fifteen seconds, because
   you do it live at 1:50.

   **One thing defeats all of the above:** any **global instructions** of your own in Settings apply to every
   session regardless of folder. Clear them before Tuesday and put them back afterwards.

2. **Test the whole demo at 1366×768.** Set your own display to it and dry-run both demo runs. Two windows
   maximum — Claude Desktop and File Explorer, snapped with `Win`+`←` / `Win`+`→`. No demo may need a
   third pane, a second monitor, or your native font size. This is an open item on Nimble Gravity.
3. **Rehearse the cold run against the cold folder, and keep the output.** See the [🧊 note](#the-cold-run)
   below — the single highest-value fifteen minutes of prep in the three days. **Print the rehearsal's cold
   summary and bring it in the folder with you.** You need a paper copy at 1:50 for the side-by-side, and
   the rehearsal copy is your insurance for the day the live save doesn't happen.
4. **Confirm the zip link works** from the [pre-work page](pages/workshops/pre-work.html#day-1) *on the Gen Re
   network*, and have `workshop-folder.zip` on a USB stick as well. Somebody will arrive without it.
5. **Name your moderator** — one person, named out loud at the open, watching chat for remote questions.
   Fill it in here before Tuesday and it is filled everywhere in this script: `[MODERATOR]` = `[FILL IN]`.
6. **`TODO` — swap the demo document.** `demo/treaty-layer-summary.docx` is a stand-in. Gen Re owes us a real
   genericized document (open item: *Gen Re to source; Nimble Gravity to genericize*). When it lands, swap it
   in, **re-plant the two defects or find the ones already there**, and re-run both prompts against it before
   Tuesday. The demo is materially weaker with a made-up cedent, because the whole argument is *this is your
   work, not a sample*.

### Run of show — the 2-hour agenda
| Time | Slot | Content |
|---|---|---|
| 0:00–0:15 | **Open** | Ground rules (hybrid), why Gen Re is investing, what it means for your daily work |
| 0:15–0:30 | **Teach** | Rules of the road: what's safe, what isn't, how to work confidently |
| 0:30–0:50 | **Teach** | Chat vs. Cowork — and hand over the folder |
| 0:50–1:05 | **Demo** | Gen Re document, **before** the lab — hands off keyboards |
| 1:05–1:50 | **Lab** | Set up your personalization (About Me and folder structure) |
| 1:50–2:00 | **Demo** | Gen Re document, **after** the lab — same document, same question |

**[NOTE] — the mode rule, all day.** The room is in exactly one of two modes and you say which one every time
it changes: **hands off** (watch me) or **hands on** (now you). Never both. Never narrate a live run while
thirty people are also trying to do it — that is the single loudest piece of client feedback we have.

**[NOTE] — show every step twice.** Once at pace so they see the shape, once slowly with the room following.
Then turn them loose. It costs two minutes a step and it saves the lab.

**[NOTE] — tangents.** Name it, write it on the parking list at the front of the room, say who comes back on
it, move. Say the words: *"That's a good question and it's not this hour — it's on the list, Charles will come
back to you."*

---

## Open · 0:00–0:15 (15 min)

### Ground rules, first — before anything else (3 min)
**[SAY] — the hybrid PSA, verbatim, at the top of every session:**
> *"Before we start: some of you are in this room and some of you are dialled in. The audio in here does not
> carry the people on the call — **they cannot speak to us.** So: if you're remote, type your question in the
> chat. Don't wait for a gap, there won't be one. [MODERATOR] is watching the chat and will interrupt me to read
> them in. If you're in the room, that means when I ask 'any questions?' I'm going to wait — because the
> question might be arriving in writing."*

**[NOTE]** Say the moderator's name out loud. Repeat this PSA after the mid-session demo — the people who join
late are the ones who most need it. Never say *"shout if you have a question."* They physically cannot.

**[SAY] — the other two rules:** *"Two more. One: I will stop and let you catch up, on purpose. If it goes
quiet, that's the design, not a technical fault. Two: everything I show you, I'll show you twice."*

### Why we're here (12 min) — *follow along: [Lesson 1 §Why](pages/training/01-what-is-cowork.html#why)*
**[SAY]** *"Quick show of hands — who has opened Claude, looked at the box, and closed it again?"* **[DO]**
Wait for the hands. **[NOTE]** Ask the moderator to report the remote hands too — that is the first live proof
the chat channel works, and it is worth spending fifteen seconds on.

**[SAY] — the frame:** *"Here is what this is for, and it is not what you think. It is not 'get through your
work faster.' The pitch is: **it helps you check things.** You already write the summary. You already read the
submission. What you don't always have is a second reader who will go through it claim by claim before it goes
out with your name on it. That is the job we're giving this thing. It drafts, you check, you sign. That order,
all three days."*

**[SAY] — repeat it back, different words:** *"Say that the other way round: nothing you produce this week
leaves the room without a person having read it against the source. If that sounds like extra work — it is the
work. The gain is that it moves from 'rewrite this' to 'check this'."*

**[SAY] — the honest version of what changes:** *"Time back on document-heavy work, yes. Your judgment stays
in the loop, because you have manager-level licences and that means **you** own verification — there is no
approval queue behind you catching it. And I'm going to answer the question every one of you is already
holding — 'should I let an AI touch my work, at a reinsurer?' — but I'm going to answer it by showing you,
not telling you, and the answer lands at 1:05 and again at 1:50."*

---

## Teach · 0:15–0:30 (15 min) — Rules of the road
*Follow along: [Lesson 1 §Rules](pages/training/01-what-is-cowork.html#rules) ·
[Rules of the Road](pages/workshops/acceptable-use.html)*

**[SAY] — lead with what to do:** *"Four rules. Do these, and everything else this week is safe. Then I'll
tell you why each one is there."*

1. **[SAY]** *"Work only in the workshop folder — `Desktop\cowork-workshop`. Not Downloads, not a network
   drive, not OneDrive."*
2. **[SAY]** *"Keep confidential cedent and client material out of this pilot. Use the sample documents we
   ship. Larkspur Mutual does not exist, and that is on purpose."*
3. **[SAY]** *"Review every output before it goes anywhere — a colleague's inbox, a client, a shared drive.
   The test: **you can name the source document each claim came from.** If you can't, it isn't ready."*
4. **[SAY]** *"When something doesn't work or doesn't make sense, say so in the room. We would rather find it
   here than in a feedback form."*

**[SAY] — now the why, briefly:** *"Rule three is the only one that's really about you. One and two are about
the pilot's blast radius; three is about your name on a document. That's the standing rule for the whole
week, and I'll be repeating it enough that you'll get bored of it."*

**[NOTE]** If asked about the audit-coverage gap here, answer in one sentence and route it: *"Cowork's activity
isn't in Anthropic's centralized audit logs today, which is exactly why rules one and two exist. The full
answer is Day 3, and I'll give it to you properly there."* Do not improvise governance depth on Day 1.

**[NOTE]** M365 connector: *"It's live and read-only — Claude can read mail, calendar, Teams messages, and
SharePoint/OneDrive, but it can't send email or write anything back. Nothing in these three days depends on it
— everything runs from the local folder."* That is the whole answer. Move.

---

## Teach · 0:30–0:50 (20 min) — Chat vs. Cowork, and hand over the folder
*Follow along: [Lesson 1 §Chat vs. Cowork](pages/training/01-what-is-cowork.html#delegate) ·
[Lesson 2](pages/training/02-getting-set-up.html) · [Lesson 3](pages/training/06-folder-access-walkthrough.html)*

### (a) The distinction · ~6 min
**[SAY]** *"One distinction makes the rest of the week click. **Chat is collaborate. Cowork is delegate.** In
a chat, Claude cannot open your files — so whatever it suggests, you go and do. In Cowork you describe the
result, you hand it a folder, and it does the work and checks in as it goes. You get back a document, not a
transcript you still have to act on."*

**[SAY] — paraphrase it back:** *"Same thing again: in chat, you paste the document in. In Cowork, you point
at the folder and stay in your chair. The reason that matters for you specifically is that your work lives in
files, and pasting a fifteen-page treaty summary into a chat box is not a thing anybody does twice."*

**[SAY] — where it runs, one pass:** *"It only touches the folders you grant it. Code runs in an isolated VM,
not on your laptop. It asks before it deletes anything for good. That is the safety answer, and I'm giving it
to you now so it isn't hanging over the demo."*

### (b) Same screen, same starting line · ~5 min
**[NOTE]** Mode: **hands on**. Say it. This is the one teach block where the room types.

**[THEY]** Four checks, on your call, one at a time — **show each on the projector first, then wait**:
1. Claude opens in its **own window**, not a browser tab.
2. Signed in on the **Gen Re work account** — workspace name shows in the account area.
3. **Cowork** is in the left rail and opens a **folder picker**, not a plain chat box.
   **[NOTE]** If it isn't there, that is a licence setting — flag it, pair them with a neighbour, keep moving.
   Do not debug sign-in live.
4. Model selector reads **Sonnet**.

**[SAY] — Sonnet, and say it again on Day 2:** *"Leave it on Sonnet. It is the right model for reading
documents and drafting from them, and it costs a fraction of the alternative. One task per session, fresh
session for the next job."*

### (c) Hand over the folder · ~7 min — the two-window layout
**[DO]** On the projector: snap Claude Desktop left and File Explorer right with `Win`+`←` / `Win`+`→`.
**[SAY]** *"Two windows. That's the layout for three days. Thirty seconds now saves ten 'I lost the window'
moments later."*

**[DO]** Open the folder picker, select `Desktop\cowork-workshop`. **[DO]** Ask *"Which folder are you
working in?"* — read the answer out loud. **[DO]** Now do it **again**, slowly, while the room follows.

**[THEY]** *"Your turn. Point Cowork at `Desktop\cowork-workshop`, then ask it the same question. Then ask it
to list everything in the folder and compare against `README.docx` — you should see `about-me/`, `demo/`,
`day-2/`, `README.docx` and a `claude.md`. Anything missing means the extract didn't finish. Hand up."*

**[NOTE]** This is the first hand-up moment of the day and it is where the folder problems surface. Circulate.
Anyone without the folder: USB stick, Extract All to Desktop, keep the room moving on something else.
**[NOTE] — the OneDrive line, say it once here:** *"If your Desktop is synced to OneDrive, copy the folder
somewhere local. Sync can hold a file open while Cowork is trying to write to it, and it looks exactly like
Cowork failing."*

### (d) What personalizing produces · ~2 min
**[SAY]** *"Last thing before the demo. In an hour you'll run an interview and it will write plain text files
into that folder — a short `claude.md` and an `about-me/` folder. They are just text files. You can open them
in Notepad, you can edit them, and they are yours to keep after this week. That's the whole mechanism.
There's no profile in the cloud."*

---

## Demo · 0:50–1:05 (15 min) — the cold read
*Follow along (read-only): [Lesson 4 §Before](pages/training/03-first-cowork-session.html#demo-before)*

**[SAY] — mode change, explicitly:** *"Hands off keyboards for the next fifteen minutes. Nothing to type,
nothing to follow. Close the laptop lid if it helps. Watch the screen and watch what I do **before** I ask
Claude anything."*

### (a) Open the document in Word first — do not skip this · ~5 min
**[DO]** Open `demo\treaty-layer-summary.docx` **in Word**, on the projector, and scroll it end to end.
**[SAY] as you scroll — name the touchpoints out loud, pointing at each:**
- *"Header. Quarterly treaty-layer summary, Larkspur Mutual, property cat excess of loss, 2026 treaty year.
  Prepared by treaty operations, circulated to portfolio and monitoring."*
- *"Key dates. Inception, expiry, the period covered, and the **renewal notice date under Article 14** — hold
  on to that one."*
- *"The programme. Four layers, attaching at two and a half million, thirty-two and a half million of limit,
  our signed share twenty-two and a half per cent."*
- *"The layer table. Cover, **ceded premium**, rate on line, incurred at the quarter end. That premium column
  matters in a minute."*
- *"Loss activity — two convective storm events. Points for the review. Next steps."*

**[SAY] — say why you just did that:** *"Thirty seconds of scrolling. That is the whole difference between
supervising this work and receiving it. **You cannot check a summary of a document you have never looked
at.** If you take one thing out of today it is that sentence."*

**[NOTE]** This is the tell–show–recap beat. Do not rush it to protect the run time. If you are behind, cut
something from the Teach block, not this.

### (b) The cold ask · ~10 min
**[DO]** **Fresh** Cowork session granted the **cold** folder — `Desktop\cowork-workshop`, the one you have
never personalized (prep item 1). Say the folder name out loud as you pick it; the room needs to see that
nothing is up your sleeve. Paste the ask exactly as it appears in Lesson 4:

> *Read `demo/treaty-layer-summary.docx` and write me a one-page summary I can take into the quarterly
> review. Cover what the treaty covers, how the layers sit, how the quarter went, and anything I should raise
> before the meeting. Don't invent anything — if the document doesn't say, tell me it doesn't say.*

**[DO]** **Stop talking while it runs.** Let the room read the plan and the file-approval prompts. Approve
them one at a time so the room sees the pause happen.

**[SAY]** when it lands: *"Read that. It's good. It's fluent, it's the right length, it sounds like something
one of us wrote on a Friday afternoon."* **[DO]** Pause. Let them read.

**[SAY] — the reveal:** *"Two things in that document don't agree with each other, and they are in there on
purpose. **One: the ceded premium column doesn't sum.** The four layers add to four million four hundred and
forty thousand. The total row says four million four hundred and five. Thirty-five thousand out — and the
loss ratio in the narrative is calculated off the wrong one. **Two: the renewal notice date.** Key dates say
the Article 14 notice date is the second of October. Next steps say issue renewal terms by the fifteenth of
October, 'per the Article 14 notice date.' Both cannot be true."*

**[DO] — before you move on, keep the cold output.** Save it (or print it) now, while it's on screen. You
need it at 1:50 for the side-by-side and you will not have time to re-run it. If saving fails, you still have
the printed rehearsal copy from prep item 3.

**[SAY]** *"Now look at the summary again. It repeated both of them, in confident prose, and told you
nothing. Not because it's stupid — because **nobody asked it to check.** It was asked to summarize, and it
summarized beautifully."*

**[SAY] — land the frame:** *"That is the answer to 'should I let an AI touch my work.' You should — and you
should never let it be the last reader. In forty-five minutes you're going to teach it what you refuse to put
your name to, and then we run this **exact same sentence** on this **exact same document**, and we'll see
what changes."*

<a id="the-cold-run"></a>
**[NOTE] 🧊 — REHEARSE THIS. The cold run is the whole demo, and it is fragile.**
The payoff depends on Cowork *not* checking. The `claude.md` shipped in the workshop folder was
**deliberately stripped of any verification instruction** — it describes who the user is and how they write,
and says nothing about totalling columns or cross-checking dates. **Do not add one.** And do not run the cold
pass against `cowork-workshop-after`, or against a folder you once ran the interview in: either one
pre-loads the checking behaviour and the demo lands flat in front of the room. **Model behaviour varies run to
run** — some runs will catch the arithmetic unprompted. Dry-run it against the cold folder at least twice
before Tuesday so you know what you're likely to get,
and have the line ready if it *does* catch one: *"It caught one of two — and it stayed quiet about the other.
Which is worse than catching neither, because now you'd trust it."*

---

## Lab · 1:05–1:50 (45 min) — Teach Cowork who you are
*Follow along: [Lesson 4 §Lab](pages/training/03-first-cowork-session.html#lab). **Protect this block.***

**[SAY] — mode change, explicitly:** *"Hands **on**. This is yours for the next forty-five minutes. I'll set
it up, then I'll be quiet and walking around."*

**[SAY] — set the expectation before they start:** *"You are not going to finish this today, and you don't
need to. The interview runs twenty to forty minutes if you let it. We're doing the first pass, and when I call
time you'll tell it to write the files with whatever it has. **A half-finished profile that exists beats a
thorough one you never wrote.** The gaps come back as `[FILL IN]` markers and finishing them is tonight."*

### Step 1 — the folder · 1:05–1:10
**[DO]** On the projector: show `about-me/` inside the workshop folder in Explorer. Then **show it again** —
close Explorer, reopen it, navigate there a second time at half the speed.
**[THEY]** *"Confirm you can see an `about-me` folder inside `Desktop\cowork-workshop`. It ships in the zip,
so it should be there — hand up if it isn't."*
**[NOTE]** A missing `about-me/` means the extract didn't finish. Have them re-extract rather than
hand-create the folder — a hand-made one is missing `ABOUT-ME-TEMPLATE.docx` and they'll be a step behind.

### Step 2 — start the interview · 1:10–1:15
**[SAY] — connectors, before they paste it in:** *"One thing before you start. The M365 connector is live and
read-only. If it's on for you, the interview's first move will try reading your own mail, calendar, and Teams
messages to save you typing — that's your own data, nothing beyond what you can already see, and it can't send
or write anything back. If you'd rather just answer the questions directly, that's fine too — say so, or say
skip."* Follow along:
[Lesson 4 §Connectors](pages/training/03-first-cowork-session.html#connectors).

**[DO]** Fresh session on the workshop folder. Paste the interview prompt from
[Lesson 4 §Lab](pages/training/03-first-cowork-session.html#lab) — the room copies it from the lesson page
with the Copy button. Show where that button is. Show it twice.
**[SAY]** *"Fresh session. Nothing from the demo still in play — everything in your files should come from
your answers, not from a treaty summary it read ten minutes ago."*

### Step 3 — the silent blocks · 1:15–1:35 (three × ~5 min silent, two × 2-min checks)
**[NOTE] — the clock, so you don't drift.** Three announced silent periods with a short check between each:
**1:15–1:20 silent · 1:20–1:22 check · 1:22–1:27 silent · 1:27–1:29 check · 1:29–1:35 silent (six).**
Twenty minutes, all of it assigned. The checks are 120 seconds — a hand count and one sentence, not a
discussion.

**[SAY] — opening the first block (1:15):** *"**Five minutes. No talking from me.** It's going to ask you one
question at a time in a popup. Answer as yourself — your real role, your real reviewers, the phrases you
actually refuse to sign off on. If a question needs a document you don't have, say **skip**; it leaves a
marker and moves on. Facilitators are walking around — put a hand up rather than turning to your neighbour,
because the person next to you is in the middle of their own interview."*

**[NOTE]** Mean it. Do not fill the silence with commentary. Circulate and answer one-to-one, quietly. This is
the client's explicit ask and it is the part most facilitators break.

**[SAY] — check 1 (1:20, 2 min):** *"That's five. Hands up if it's still asking you questions. Hands up if it
has stopped."* **[NOTE]** Anyone whose session has stopped early has a stalled or errored interview — that is
the one thing worth fixing on the spot. **[SAY]** *"Another five, same rules."*

**[SAY] — check 2 (1:27, 2 min):** *"Ten minutes in. One sentence from me and then the last block: the
questions it is asking you **now** are the ones worth answering properly — voice and writing style. If you
have been giving it one-word answers, give this bit real ones."*

**[SAY] — the last block (1:29, six minutes):** *"**Six minutes, last silent block.** Get as far as you can.
When I call time you're writing the files with whatever you've got."*

**[NOTE]** The second and third blocks are where the depth comes from. Do not let either collapse into a
room-wide Q&A — that is what the two-minute checks are for.

**[NOTE] — remote attendees during silent work.** They cannot put a hand up. Ask the moderator to explicitly
prompt the chat at the start of each silent block: *"remote — type here if you're stuck."*

### Step 4 — write the files · 1:35–1:42
**[SAY]** *"Time. Tell it: **'write the files now with what you have.'** It will read back what it heard
before it writes anything — read that recap and correct anything wrong, because once it's in
`voice-profile.md` every draft you get for the rest of the week inherits it."*

### Step 5 — the verification test · 1:42–1:50
**[NOTE]** This is the "simple test that confirms personalization worked" the client asked for. Run it on the
projector **first**, then have every person run it. Use these words exactly.

**[DO]** On the projector, in a **fresh** session granted **`Desktop\cowork-workshop-after`** — the
personalized copy from prep item 1, *not* the cold folder. The cold folder has no profile in it, so running
this test there returns the generic answer you are about to tell the room means failure. Type the test
question and read the answer aloud.
**[NOTE]** The room runs it against **their own** `Desktop\cowork-workshop` — that is where they just wrote
their files. Only the projector needs the `-after` copy, and only because your own workshop folder is kept
cold for the demo.
**[SAY]** *"Here is how you know it worked. Fresh session, and you ask it this:*

> **"What do you know about how I work?"**

*What you should see back is **your own answers, in your own words** — your role, your team, the way you said
you write. If what comes back is generic — 'I aim to be helpful and clear' — it didn't take, or your files
are thin. Open `about-me/voice-profile.md`, look at it, and fix the thin bit."*

**[THEY]** *"Everybody run it. **Hand up if your answer looks generic** rather than like you."*
**[NOTE]** Count the hands before you move on. This is your only reliable read on how many people are actually
set up for Day 2, and anyone who fails here is a spectator on Wednesday. Champions mop up during the last
demo; catch the rest at the Day 2 open.

---

## Demo · 1:50–2:00 (10 min) — the same ask, personalized
*Follow along (read-only): [Lesson 4 §After](pages/training/03-first-cowork-session.html#demo-after)*

**[SAY] — mode change:** *"Hands off again. Last ten minutes."*

**[DO]** **Fresh** session, and this time grant **`Desktop\cowork-workshop-after`** — the copy carrying your
own `claude.md` and `about-me/` (prep item 1). Same document, `demo\treaty-layer-summary.docx`. **Say the
folder name out loud** so the room sees the only thing that changed. Paste the **identical** prompt from the
cold run and say out loud that it is identical.

**[NOTE]** Fresh session is not optional — Cowork reads those files when the session opens. Reusing the
morning's session, or forgetting to switch folders, reproduces the cold output and the day's payoff
collapses. Check the folder name in the app **before** you paste.

**[SAY]** while it runs — then stop and let it run: *"Same document. Same sentence. The only thing that
changed in this room in the last hour is a handful of text files describing who I am."*

**[DO]** Put the two outputs side by side if the screen allows at 1366×768; if it doesn't, read the cold one
out from the copy you saved at 1:03 or the printed rehearsal copy, rather than shrinking the fonts.

**[SAY] — what changed:** *"Bottom line first, in my register, at the length I said I write. And it went back
to the premium column and re-added it, and it flagged the date pair as a question rather than a sentence.
That's the profile doing that — because I told it what I won't put my name to."*

**[SAY] — what didn't change, and say it slowly:** *"Your accountability. This is a better **first reader**,
not a signature. It will still miss things — including, some days, both of these. It is still your name on
the summary that goes into the review. What personalization buys you is that the work moves from *rewrite
this* to *check this*. That's the whole gain, and it's a big one."*

**[NOTE]** If the after-run does **not** flag either defect: **first check the setup, not the model.** Is the
granted folder `cowork-workshop-after`? Is this a fresh session? Are your own global instructions still
cleared? An output identical to the cold run is a setup failure, not model variance — and if you narrate it
as variance you will never diagnose it. Once you have ruled that out, do not pretend. Say: *"It didn't catch
them this time. That is real and you should see it. What that tells you is that my `writing-rules.md` isn't specific
enough — and that's the homework: where yours stays quiet, that's a line missing from your file."* This is a
stronger ending than a lucky run, and it is the honest one.

**[SAY] — the comparison to take away:** *"Ask yourself what you'd have caught reading only the first one.
That answer — not the time saved — is what you tell your team you did today."*

**[SAY] — close, 90 seconds:** *"Tonight: finish your `[FILL IN]`s, and run the same document, same prompt,
against your own profile and see what yours flags. Tomorrow is Day 2 — we take one workflow you run every
week, do it by hand, and then write it down so you never have to hold it in your head again. Bring the same
laptop and the same folder."*
**[DO]** Drop the [feedback link](pages/workshops/feedback.html) in the chat *and* say the URL out loud for
the room. **[NOTE]** Ask the moderator to post it for the remote attendees too.

---

### Facilitator appendix

- **If you are behind, cut from the Teach blocks — never the Lab or the two demos.** In order: the "what
  personalizing produces" sub-block (0:48–0:50), then the "why" half of the Rules block. The 45-minute lab and
  the before/after pair are the session; everything else is scaffolding around them.
- **If the cold demo runs long,** cut the after-demo commentary, not the after-demo. The room needs to see the
  second run even if you only get to say one sentence about it.
- **Someone grants a real data folder.** Redirect immediately and restate rule two out loud, for everyone —
  it's a teaching moment, not a telling-off.
- **Someone can't find Cowork in the left rail.** Licence setting. Pair them with a neighbour, flag it to
  Gen Re IT during the lab, and make sure they get a working seat before Day 2 — Days 2 and 3 both run on
  what's produced today.
- **Asked "does it read my email?"** No, not for this week's work — it reads the folder you handed it, and
  nothing else. The M365 connector is separate: it's live and read-only (mail, calendar, Teams messages,
  SharePoint/OneDrive; no sending, no writing back), and nothing this week depends on it.
- **Lines worth keeping verbatim:** *"you cannot check a summary of a document you have never looked at"* ·
  *"it drafts, you check, you sign"* · *"a better first reader, not a signature"* · *"from rewrite this to
  check this."*

### Script ↔ hub sync notes
- **Agenda** matches `pages/workshops/module-1-workshop.html#agenda` exactly: 0:00–0:15 / 0:15–0:30 /
  0:30–0:50 / 0:50–1:05 / 1:05–1:50 / 1:50–2:00 = 2:00. Change one, change both.
- **Demo document and prompt:** `demo/treaty-layer-summary.docx`, prompt verbatim from
  `pages/training/03-first-cowork-session.html#demo-before`. Held constant across both runs — that is the
  experiment.
- **Verify test** matches the step-5 check in `03-first-cowork-session.html#lab` and the Day 1 note in
  `facilitator-guide.html#workshop-1`.
- **Standing rules and hybrid guidance** live in `facilitator-guide.html#standing-rules` and `#hybrid`. This
  script applies them; it does not restate them in full.
