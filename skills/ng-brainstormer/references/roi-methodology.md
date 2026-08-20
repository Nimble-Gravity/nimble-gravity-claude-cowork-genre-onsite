# ROI napkin-math methodology

Every skill in a slate needs a defensible dollar estimate, but not every skill's value shows up the same way. Forcing all ten into one formula produces numbers that are either obviously padded or obviously too conservative. Use whichever of these two categories actually fits, and say which one you used.

## Category 1: Time-savings & risk-avoidance

For any skill that's replacing time someone currently spends manually (triaging email, reading digests, prepping for a meeting, cross-referencing data by hand):

```
time saved per occurrence × frequency per year × loaded hourly rate = annual value
```

Concrete example from a real slate: a daily morning-digest skill saves ~12 minutes of manual triage a day. At ~230 working days a year, that's 46 hours/year. At a CPO-level loaded rate (~$150-250/hr), that's roughly $7K-$11.5K a year — for one person.

Two things worth adding on top of the base number:
- **Team/org scaling.** If the same pattern could run for 5-8 people in a similar role, multiply — but say explicitly that you're extrapolating, not that it's already validated at that scale.
- **Risk-avoidance value**, when relevant, layered on top of time saved: e.g., catching a staffing gap two weeks earlier avoids a scramble cost that's real but harder to price precisely. Name it, don't force a number onto it if there isn't a clean one.

## Category 2: Strategic / expected value

For skills where there's no current manual process to time-save from — the skill creates net-new capacity rather than replacing existing work (a proactive research scan nobody has time to do today, a strategic-fit screener for new opportunities):

```
probability the output leads to a real outcome × value of that outcome × close/conversion rate = expected value
```

Concrete example: a monthly regulatory/competitive scan surfaces a pursuit signal maybe once a year. At a 20% chance that signal becomes a qualified pursuit, an average deal size of $150K, and a 30% close rate on qualified pursuits: 0.20 × $150,000 × 0.30 ≈ $9,000 expected value. Call this a conservative, illustrative floor — the real upside case (if the skill automates a person's actual core strategic function) can run far higher, and it's fine to say so as a range rather than pretend precision you don't have.

## Combining into a total-ROI slide

When summing across a whole slate for a single "total ROI" headline:

1. **Never hand-type the sum.** Compute it programmatically from each skill's own `roiLow`/`roiHigh` figures (see `scripts/build_deck.js`) so the headline number can't silently drift out of sync if an individual skill's estimate changes later.
2. **Report the two categories separately, then combined.** A slate is usually 70-80% time-savings skills and a couple of strategic/expected-value skills — and the expected-value skills, being the least certain, are often also the largest numbers (see: the "how it breaks down" split in the Total ROI slide). Blending them into one number without explanation makes the deck look like it's hiding something.
3. **Add a one-line caveat on the slide itself**: something like "this blends concrete time-savings math with directional expected-value math — use it to size the opportunity, not as an audited figure." Don't bury this in speaker notes; put it where the reader will see the number and the caveat together.

## Sanity checks before presenting

- Does every number trace back to an explicit formula shown in the deck, or only asserted?
- Does the slate avoid making every high-sophistication skill also the highest-value skill? (Sophistication and value are different axes — a simple daily digest and a complex strategic screener can each be worth defending on their own terms.)
- If a data source needed for the ROI math (deal size, close rate, headcount) isn't confirmed, say so and use a labeled placeholder rather than inventing a precise-looking number.
