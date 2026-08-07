# CLIENT.md — Gen Re

Client context brief for the Cowork enablement engagement. Read this before writing or
editing any client-facing content, the same way you read `cowork-context.md` before writing
about Cowork itself.

- **Client:** Gen Re (General Reinsurance Corporation / General Reinsurance AG)
- **Industry:** Reinsurance — Property & Casualty and Life & Health
- **Researched:** 2026-07-22, from public sources (see **Sources** at the end)
- **Status:** Engagement live. Client contact: **Chris Engelhardt, Ph.D., VP, Head of AI
  Services, Gen Re Global IT — Enterprise Data and AI Services** (Stamford). Items still
  needing confirmation are marked **[CONFIRM]**.

## 0. Engagement facts (confirmed by the client — 2026-07-27; updated by the 07-31 call)

Feedback from Chris Engelhardt (2026-07-27) established the following; these override the
pre-discovery assumptions below where they conflict. The 2026-07-31 call then restructured
the engagement into a three-day onsite and corrected the cohort and proof-point list below —
where this section and the 07-31 call disagree, the call is authoritative.

- **The pilot cohort is manager-level Gen Re business people — actuarial, underwriting,
  claims, and finance** (not Global IT). This superseded an earlier 07-27 read that anchored
  the workshops on Global IT's own VBA-documentation and code-review use cases; those are
  **out of scope** for this cohort. Participant materials open with this framing directly:
  "Gen Re managers and business leaders — actuarial, underwriting, claims, finance. No prior
  agentic-AI experience assumed, and nothing here requires you to write code" (`index.html`).
- **The M365 connector is NOT available at Gen Re — it is under IT Security review**, though
  Gen Re (Charles) is pushing to have it live before Day 1. All materials teach
  local-folder-first regardless; the facilitator says exactly that if the connector isn't
  there yet.
- **Pre-work and homework are optional** and framed that way everywhere; key components are
  covered live in each session. (Chris: "I am not sure people will do that.")
- **The site carries a "piloting scalable training materials" note** (homepage + Start Here)
  so incomplete/generic material is expected rather than jarring.
- **No draft-pending-sign-off banner and no acknowledgment gate** on the Rules of the Road —
  removed at Chris's request.
- **Gen Re runs a Claude pilot community** with documented wins to cite (their own examples).
  **As of the 2026-07-31 call, treaty-and-amendment interpretation is OUT as a proof point** —
  machine-reading contract/treaty wording is a live nerve for this client (the reason no
  Anthropic-published plugin pack is named anywhere in the materials either — see
  `cowork-context.md` §Module 2), and the client was explicit that raising it derails the
  engagement. Do not cite it, reword it, or gesture at it. The remaining, still-usable proof
  points: IFRS 18 impact analysis
  (half a day → ~1 hour), an expected-loss/pricing view drafted from a 70-tab submission
  (minutes; some of it came back clean and some needed real correction, which is rather the
  point — don't frame this as a property-vs-casualty quality comparison between named business
  units), claims-outlier segmentation, a disability-income claim form redesign (~4 minutes),
  legacy Excel/VBA → Python spec translation, R scripts → process docs, and code review that
  once caught an error human review missed — alongside false positives. Use these as proof
  points; never oversell beyond their own caveats.


---

## 1. Who they are

Gen Re is one of the world's leading Property & Casualty and Life & Health reinsurers, and a
wholly owned **Berkshire Hathaway** company.

| Fact | Value |
|---|---|
| Ownership | Wholly owned subsidiary of Berkshire Hathaway Inc. (acquired 1998) |
| US HQ | Stamford, Connecticut |
| Associates | ~2,150 |
| Offices / countries | 36 offices across 22 countries |
| Capital | $20.0 billion |
| Net premiums written | $14.8 billion |
| Financial-strength ratings | A.M. Best **A++** · Moody's **Aa1** · S&P **AA+** |
| Tagline | *"The People Behind the Promise®"* |

**Lineage.** Two roots: General Reinsurance Corporation (US, **1921**) and Cologne Re
(*Kölnische Rückversicherungs-Gesellschaft*, Germany, **1846** — described as the world's first
independent professional reinsurance company). Allied in 1994, acquired by Berkshire in 1998,
unified under the **Gen Re** brand in 2003. Cologne Re is today **General Reinsurance AG**.

**Why the lineage matters for content:** this is a ~180-year-old, dual-continent institution
with a long-memory, low-churn professional culture. Content that reads as move-fast startup
enthusiasm will land badly. Content framed as *durable craft, better-supported judgment* will land.

## 2. What they actually sell

Gen Re reinsures **primary insurers** (cedents) — it does not sell to consumers. Its own
positioning: *"As your reinsurer, we do not merely assume your risks — we help you manage them."*
It calls itself an **underwriting company**, not a market-driven capacity provider, and
distributes **direct** (no broker layer), so clients reach underwriters, actuaries, and claims
experts personally.

**Property & Casualty**
- Property, Engineering, Marine
- Casualty (General Liability, Products Liability, Personal Accident)
- Auto / Motor
- Specialty Lines
- Claims (including reinsurance claims support to cedents on third-party liability covers)
- Mutual Practice (a dedicated segment for mutual insurers)

**Life & Health**
- Individual Life
- Group Life
- Medicare Supplement
- Disability
- Underwriting, Claims, and Research/Analytics

Both lines are written on **Treaty** (whole-portfolio) and **Facultative** (individual-risk)
bases — a distinction worth getting right in any example we write.

## 3. The Berkshire operating culture

This is the single most important cultural input, and it is unusually well documented.

- **Underwriting discipline over volume.** Gen Re states it prioritizes underwriting quality
  over premium growth and will walk away from underpriced business. Berkshire's decentralized
  model means Gen Re runs its own operations with minimal corporate overhead.
- **Long-term client view.** Relationships are measured in decades, not renewal cycles.
- **Buffett framing on the site:** *"Price is what you pay. Value is what you get."*
- **Code of Business Conduct** is prominent. Reputational conservatism is a stated value, not
  a compliance checkbox — Berkshire's "lose money and I'll be understanding; lose reputation and
  I'll be ruthless" posture is the ambient standard.

**Content implication:** every Cowork claim must be conservative and verifiable. Do not promise
efficiency multipliers. Frame Cowork as *removing the assembly work so the expert judgment gets
more of the day* — that is the pitch that survives a Berkshire audience.

## 4. Leadership **[CONFIRM]**

- **Charlie Shamieh** — Chairman of Gen Re and Chair of the Executive Board of General
  Reinsurance AG. In **May 2026** reported as Berkshire Hathaway's choice to succeed
  **Ajit Jain** as insurance chief.
- **Nancy Roos** — appointed to the Executive Board of General Reinsurance AG effective
  **2026-04-01**, succeeding **Mike O'Dea** (retired).
- **Margaret McAuliffe** and **Alexander Zeller** — also appointed to the AG Executive Board.

> These are press-reported and may have moved. **Do not put a named executive in client-facing
> content until Gen Re confirms it** — especially the sponsor slot on `why-cowork.html`.

## 5. Their own public position on generative AI ⭐

This is the highest-leverage finding in the whole brief. Gen Re published
**"Actuarial Intelligence with Generative AI — A Framework Illustrated Through Critical Illness
Claims" (June 2026)**. Their stated framework is *almost exactly* what this curriculum teaches:

| Gen Re's published principle | Where our curriculum already teaches it |
|---|---|
| **Decompose** complex judgment into sequential, specialized steps | Module 3, `workflow-decomposition` / the blueprint lesson |
| **Transparency** — each reasoning step explicit and auditable, not a black box | Module 2 (permission modes, watching the work) + Module 4 |
| **Validation** — "golden datasets," hand-labeled reference data, multi-layered testing | Module 3's **evals before docs** rule |
| **Documentation** — records of prompts, model settings, decision pathways | Module 3 `SKILL.md` practice; Module 4 monitoring planes |
| **Human-in-the-loop** — edge cases routed to reviewers on confidence thresholds | The "Cowork drafts, you sign off" spine of the whole program |
| *"Reliability is a property of the entire workflow rather than the model alone"* | Module 4 governance framing |
| *"Generative AI... supplements rather than replaces human decision-making"* | `why-cowork.html` §augmentation-not-replacement |

**Use this.** Open the program by quoting Gen Re's own framework back to them and showing that
the four modules are the operational version of it. It converts the engagement from
"vendor teaching us AI" to "operationalizing the standard you already published." It also
pre-answers the jobs question in their own words.

Their Knowledge Center also lists **Generative AI** as a standing trending topic alongside
Behavioral Economics, PFAS, Mental Health, and Inflation — so the topic is already legitimized
internally.

## 6. Audience — who is in the room

Knowledge workers across a research-and-judgment institution. Expect:

| Function | The document work they do |
|---|---|
| **Treaty underwriters** | Read cedent submissions, portfolio experience data, and program terms; write treaty analyses and renewal recommendations |
| **Facultative underwriters** | Assess individual large/complex risks; write risk write-ups |
| **Actuaries / pricing** | Experience studies, pricing analyses, reserving; Gen Re's own paper notes 60–80% of actuarial project time goes to data gathering and cleaning |
| **Claims professionals** | Adjudicate and support cedent claims on liability, property, life, disability, Medicare supplement |
| **Life & Health underwriting** | Medical/financial underwriting standards, manual work, mortality/morbidity research |
| **Research / Knowledge Center** | Publications, evidence synthesis, trend and emerging-exposure analysis, webinars and academies |
| **Risk, Compliance, Legal, Internal Audit** | Regulatory reporting, control narratives, policy work |
| **IT / InfoSec / Identity** | The Module 4 audience |

No coding assumed. Deep domain expertise assumed. **These are people who are paid for judgment
and are professionally trained to be skeptical of unexplainable outputs** — the actuarial
mindset is literally described in their own paper as decomposing ambiguous problems into
testable, explainable components. Lean into that; do not fight it.

## 7. Banking → reinsurance recast

The Axos build baked in banking scenarios. Each needs a reinsurance equivalent. Proposed
mapping — **[CONFIRM] all of these in discovery**:

| Axos artifact | Where | Gen Re replacement (proposed) |
|---|---|---|
| Commercial loan file → one-page credit summary | `07-use-cowork-lab.html` (`canonical-scenario-m2`) | **Cedent treaty submission → one-page underwriting summary with flagged exposures** |
| Credit memo from a loan file | `04-use-cases-by-industry.html` (`industry-usecases-m2`) | **Treaty renewal analysis drafted from submission + prior-year experience** |
| Deposit / treasury-management relationship summary | same | **Cedent relationship / portfolio performance summary for a renewal meeting** |
| Fraud / AML alert queue triage | same | **Claims queue triaged into a prioritized brief** (fraud is a live Gen Re research topic — medical fraud, AI-enabled property claim deception) |
| Loan terms compared across a portfolio | same | **Treaty terms / clause language compared across a portfolio of contracts** |
| "Good first tasks at Axos" | `01-what-is-cowork.html` | Good first tasks at Gen Re — reading a submission pack, summarizing a Knowledge Center source set, drafting a claims file chronology |
| **Maya Chen, Commercial Credit Analyst** | `assets/demo/maya-profile/`, `workshop-1-script.md` | New persona — a **Treaty Underwriter** or **Actuarial Analyst**. Keep the fictional-persona disclaimer. |
| `sample-loan-file.md` | `assets/demo/` | Synthetic **cedent submission pack** |
| `sample-variance-dataset.md` | `assets/demo/` | Synthetic **experience / loss-ratio dataset** |
| Access register, role matrix, rubrics | `control-room/lab-files/` | Same structure, Gen Re org names (see §8) |
| "every output is a draft a **banker** signs off on" | throughout | "a draft an **underwriter / actuary / claims professional** signs off on" |
| "the choice in front of every **bank**" | `why-cowork.html` | "every **reinsurer**" / "every carrier" |

**Group-name conventions** used in the Control Room lab files (`axos-cowork-pilot`,
`axos-commercial-lending`, `axos-risk-compliance`, `axos-contractors`, `axos-capital-markets`,
`axos-credit-memo`, `axos-disclaimer-footer`) should become `genre-*` with reinsurance
functions — e.g. `genre-cowork-pilot`, `genre-treaty-underwriting`, `genre-claims`,
`genre-actuarial`, `genre-risk-compliance`, `genre-contractors`.

## 8. Regulatory and governance posture

Different from a bank, and in some ways **harder**:

- **Multi-jurisdictional by construction.** US operations sit under state insurance regulation
  (NAIC solvency framework; the reinsurer's home state has sole solvency authority).
  General Reinsurance **AG** sits under **BaFin** and **Solvency II** (Pillar III reporting and
  disclosure). 22 countries means more than two regimes. **[CONFIRM]** which entities and
  regulators are actually in scope for the cohort.
- **Cross-border data.** A US/Germany dual structure raises **GDPR** and data-residency
  questions that a single-country bank build never had to answer. This is a first-class
  Module 4 topic here, not a footnote. **[CONFIRM]** with their Legal/Privacy function.
- **Sensitive data classes.** Not customer PII in the retail sense — instead **cedent
  confidential submission data** (a competitor's book, shared in trust) and, on the L&H side,
  **medical/health information**. Both are arguably *more* sensitive than the banking examples.
  The Rules of the Road (`acceptable-use.html`) must be rewritten around these two classes.
- **Berkshire reputational conservatism** raises the bar on the audit-coverage gap conversation.
  Expect the honest answer — *manage it on Cowork; route work needing centralized audit or zero
  retention to Anthropic's audited surfaces (API or Claude Code Enterprise)* — to be scrutinized
  hard, and to be **well received precisely because it is honest**. Do not soften it.
- **Internal Audit** is a real, empowered function at a Berkshire company. The Control Room
  capstone's "the examiner is in the room" framing works even better here than at a bank.

## 9. Tone and language rules

- **Say "reinsurer," "cedent," "treaty," "facultative," "submission," "experience," "cession"** —
  and use them correctly. Getting reinsurance vocabulary wrong in front of underwriters costs
  credibility instantly. If unsure of a term, don't use it.
- **Never** say "customers" when you mean **cedents** or **clients**. Gen Re's customers are
  insurance companies.
- **"Associates,"** not "employees" — that is Gen Re's own word for its people.
- Avoid hype. Berkshire-culture audiences discount it. Understate and evidence.
- Keep the practitioner-to-practitioner tone the repo already uses. It fits this audience well.
- **Gen Re** is two words with a capital R. Not "GenRe," not "Gen-Re." The legal entities are
  **General Reinsurance Corporation** (US) and **General Reinsurance AG** (Germany).

## 10. Open questions for discovery **[CONFIRM]**

Carry these into the discovery call (`pages/customization/discovery-checklist.html`):

1. **Which entity/entities and which countries** are in the cohort? US only, or US + AG?
2. **Which functions** are the pilot audience — underwriting, actuarial, claims, research, or a mix?
3. **Executive sponsor** — named, plus a signed note for the `sponsor-message` slot.
4. **Stack** — Microsoft 365 confirmed? Which connectors are approved?
5. **Which Claude products are licensed** — Cowork, Claude Code, API/Enterprise?
6. **Data classification tiers** — Gen Re's actual scheme, to replace the generic Public/Internal/
   Confidential/Restricted placeholders. Specifically: how is **cedent-confidential** data classed?
   How is **medical/health** data on the L&H side classed?
7. **Cross-border / GDPR** — can a US associate's Cowork session touch AG data, and vice versa?
8. **Legal / Compliance / InfoSec sign-off** owner for the Rules of the Road.
9. **Brand** — logo, colors, and the memo-skill letterhead
   (`skills/memo-generation/reference/memo-format.md`).
10. **Real use cases** to replace the §7 proposals.
11. **Adoption dashboard** — does Gen Re want the OTel → dashboard IP handoff (as scoped for the
    prior client), and into what BI stack?
12. **Hosting** — same gated-host constraint applies; do **not** publish Gen Re-branded content
    to the public GitHub Pages site (see `ACCESS.md`).
13. **Does Gen Re want the tie-in to their own June-2026 generative-AI paper** (§5)? Confirm the
    authors are comfortable being cited back to their colleagues.

## Sources

- [Gen Re — home](https://www.genre.com/)
- [Gen Re — About Us](https://www.genre.com/us/aboutus)
- [Gen Re — Knowledge Center](https://www.genre.com/us/knowledge)
- [Gen Re — Actuarial Intelligence with Generative AI (June 2026)](https://www.genre.com/us/knowledge/publications/2026/june/actuarial-intelligence-with-generative-ai-en)
- [Gen Re — Specialty Lines](https://www.genre.com/us/propertycasualty/specialty-lines) · [Claims](https://www.genre.com/us/propertycasualty/claims) · [Casualty](https://www.genre.com/int/propertycasualty/casualty) · [Property, Engineering, Marine](https://www.genre.com/int/propertycasualty/property-engineering-marine) · [Mutual Practice](https://www.genre.com/gl/propertycasualty/mutual-practice)
- [General Reinsurance AG — 2025 Annual Report (PDF)](https://www.genre.com/content/dam/generalreinsuranceprogram/documents/argrag25-en.pdf)
- [Wikipedia — Gen Re](https://en.wikipedia.org/wiki/Gen_Re)
- [Insurance Journal — Berkshire Selects Gen Re's Shamieh to Succeed Jain (2026-05-05)](https://www.insurancejournal.com/news/national/2026/05/05/868621.htm)
- [InsurTech Digital — Why is General Reinsurance Seeing Leadership Changes?](https://insurtechdigital.com/news/why-is-general-reinsurance-seeing-leadership-changes)
- [BaFin — Solvency II Pillar III reporting and disclosure](https://www.bafin.de/EN/Aufsicht/VersichererPensionsfonds/Berichtspflichten/Berichtswesen/berichtswesen_node_en.html)
- [NAIC — Insurer Solvency Regulation (PDF)](https://content.naic.org/sites/default/files/naic_archive/topics_solvency_surveillance_brief.pdf)
- [RAA — Reinsurance Regulation](https://www.reinsurance.org/RAA/RAA/About-the-RAA/Fundamentals/Reinsurance%20Regulation.aspx)

> **Date-sensitive.** Re-verify headcount, capital/premium figures, ratings, and especially
> leadership before each cohort. The Berkshire insurance-chief succession was in flux as of
> mid-2026.
