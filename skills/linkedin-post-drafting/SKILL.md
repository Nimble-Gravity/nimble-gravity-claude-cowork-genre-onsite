---
name: linkedin-post-drafting
description: Drafts a LinkedIn post from whatever content is provided — a research report, a one-pager, a results summary — in Gen Re's brand tone and visual guidelines, framed positively but strictly evidenced. Use when someone asks to "turn this into a LinkedIn post", "draft social content for X", "make a marketing post from this report", or "write something for LinkedIn about our results", always producing a labeled draft for Corporate Communications and Legal review, never a publish-ready final.
---

# LinkedIn Post Drafting

Turn source content someone hands you — a competitive-positioning one-pager, a results report, a
milestone summary — into a LinkedIn post draft in Gen Re's actual voice. This skill drafts. It does
not publish, and it does not have the ability to publish: read the M365 connector is confirmed
read-only (mail, calendar, SharePoint/OneDrive) — there is no send/post path from this skill, by
design, not just by convention.

## When to run

- Someone provides content (pasted, or a file/report to read) and asks for a LinkedIn-ready draft.
- Do not run this speculatively — it needs real source content to draft from. If no content is
  provided, ask for it rather than inventing a post from general Gen Re facts.

## Inputs

- The source content (required) — whatever the post should be based on.
- `reference/genre-tone-voice.md` and `reference/genre-brand-guidelines.md` — read both before
  drafting, every time. Do not draft from memory of "how Gen Re usually sounds"; re-read the
  reference files, since they may have been updated since the last run.

## How to draft

1. **Read the source content fully** before drafting anything. Identify the 1-2 claims in it that
   are both genuinely positive *and* fully sourced — not the most dramatic-sounding claim, the most
   defensible one.
2. **Re-read `genre-tone-voice.md`.** Apply its vocabulary rules exactly (cedent, treaty,
   facultative, associates, "Gen Re" as two words) and its core register: evidenced confidence,
   never promotional hype, no "act now" urgency language.
3. **Draft the post** — LinkedIn length and format (short paragraphs, no wall of text), leading with
   the sourced claim, not a generic opener. Every specific figure or claim in the post must trace
   back to something actually in the source content — if the source doesn't support a claim, leave
   it out rather than rounding up.
4. **Note the visual treatment** per `genre-brand-guidelines.md` if an accompanying graphic is in
   scope (navy/white palette, orange as a minor accent only) — but do not generate a logo or
   wordmark; flag that any graphic needs Gen Re's actual approved logo asset.
5. **Label the output clearly**, every time, at the top:
   `DRAFT — NOT FOR PUBLICATION. Requires Corporate Communications and Legal review before posting.`
6. **List what a reviewer should check** below the draft: every factual claim and its source, and
   anything from the source content that was deliberately left out because it couldn't be evidenced
   cleanly (this makes the reviewer's job faster, and it surfaces gaps rather than hiding them).

## Good vs. bad output

**Good** — one or two sourced claims, Gen Re's actual vocabulary used correctly, evidenced-confidence
tone (not hype), clearly labeled as a draft, a short list of what to verify before it goes out.

> DRAFT — NOT FOR PUBLICATION. Requires Corporate Communications and Legal review before posting.
>
> Disciplined underwriting continued to show up in the numbers this quarter. [specific sourced
> claim from the provided content]. It's the kind of result that comes from walking away from
> business that doesn't meet the bar — not chasing volume. — The People Behind the Promise®
>
> To verify before posting: [claim] sourced from [document/section]. [Anything omitted and why.]

**Bad** — "Gen Re CRUSHES the competition this quarter! 🚀" — hype language, no sourcing, wrong
register entirely for this brand, no draft label, invents or rounds up a figure not in the source.

## Guardrails

- **Never** omit the draft label. This skill has no publish capability, but the label matters even
  more if the output gets copy-pasted somewhere that does.
- **Never** state a competitive claim (e.g. "outperforming peer X") unless the source content
  explicitly supports it with a real figure. "Positive" means evidenced, not embellished — see
  `genre-tone-voice.md` §"What positive means for this brand."
- **Never** use "customers" for cedents, or "employees" for associates.
- If the source content itself contains an unsourced or shaky claim, flag that in the reviewer notes
  rather than passing it through into the post.
