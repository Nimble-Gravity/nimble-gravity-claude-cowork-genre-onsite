# Recommending a Claude model per skill

Every skill in the slate should get a named model recommendation with a one-line "why" — not just "Claude." The reasoning is a tradeoff between how often the skill runs, how much judgment it requires, and how much it costs to be wrong.

## The three-tier heuristic

**Fast/cheap tier (e.g. Haiku)** — for skills that run often and involve mostly summarization, classification, or digesting, not real judgment calls:
- Daily or weekly digests pulling from already-structured sources (calendar, email, a CRM view)
- Simple filtering/classification ("is this relevant to X")
- Anything where being slightly wrong is low-cost and easily corrected next run

**Balanced tier (e.g. Sonnet)** — the default for most of a slate. Use this for:
- Synthesis across multiple sources that requires actually connecting the dots, not just concatenating
- Brand-voice or quality-sensitive writing (case studies, offer one-pagers, workshop materials)
- Judgment-based scoring (deal-fit screening, risk flagging) where the reasoning needs to hold up, but the stakes of one run being imperfect are moderate

**Top tier (e.g. Opus)** — reserve this for the single highest-stakes, most judgment-heavy skill in a slate, usually the one that most directly automates the person's actual core strategic accountability (not just a task they do, but the thing they're measured on). This is worth the added cost specifically because it runs rarely and the downside of a bad output (a wrong strategic call, a mis-scoped recommendation) is large relative to the API cost difference.

## Worked distribution from a real 10-skill slate

Out of 10 skills: 3 landed on the fast/cheap tier (frequent digests), 6 on the balanced tier (synthesis, writing, scoring), and 1 on the top tier (the skill automating the person's core "turn platform capability into a sellable offer" function). That rough 30/60/10 split is a reasonable default shape to check a new slate against — if everything is landing on the top tier, the sophistication scoring is probably inflated; if nothing is, the slate may be underselling what a top-tier model buys for the hardest problem.

## What "why" should actually explain

Don't just name the tier — tie it to the two variables that matter:
- **Frequency**: "runs daily, so cost efficiency matters more than squeezing out extra depth"
- **Judgment**: "requires real reasoning about deal fit, not just summarization"

A one-line model recommendation like "Claude Sonnet 5 — nuanced synthesis of regulatory language; lower frequency makes quality the priority over cost" does both in a sentence: names the tradeoff and resolves it.
