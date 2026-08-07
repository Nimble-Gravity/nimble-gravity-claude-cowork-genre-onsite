# Cowork Workshop — Subject Brief

Read this before writing or revising lesson content. It captures who the program is for, the
agreed structure (from the "Cowork Next Steps" meeting), and the researched facts the lessons are
grounded in (from the content-research report). Sources and date-sensitive caveats are at the bottom.

> **Date-sensitive — Module 4 re-verified 2026-07-21** against Anthropic's own docs (see §5 Sources).
> Modules 1–3 still carry June-2026 stamps. Re-verify the audit gap, model lineup, and repo/plugin
> counts before each cohort.

## 1. Positioning (from the meeting)

- **Nimble Gravity's sweet spot:** enabling AI inside **regulated, enterprise, Microsoft-stack** environments.
  That's the differentiator — "we know how to deploy enterprise regulated AI," not generic AI for anyone.
- **Audience:** **knowledge workers**, not coders — and the teams enabling them. Bigger market than developers.
  Verticals: financial services, banking, insurance, capital markets, private equity, healthcare, legal.
- **Claude Cowork only for this client.** The program is delivered entirely on Claude Cowork — there is no
  alternative-stack track. Route high-assurance workloads (zero-retention / centralized audit) to Anthropic's
  audited surfaces — the API or Claude Code Enterprise — not the Cowork interface.
- **The program is the IP:** a repeatable microsite + skills library + adoption dashboard NG runs with clients.
  Reuse Anthropic's own training/material where possible; layer NG industry use cases on top.

## 2. The three-day onsite arc

*(Restructured 2026-08-07 from the original four-module, two-week/intensive curriculum into a
three-day onsite for Gen Re, plus a fourth-day-style Advanced block. Hub filenames stay
`module-1-workshop.html`…`module-4-workshop.html`; the program itself is now framed as Days, not
Workshops/Modules — see `client-notes/onsite-agenda.md` for the client's own agenda.)*

Each day is a 2-hour hybrid session (Day 3 adds a 1.5 h Advanced block back-to-back). Pre-work is
optional but encouraged; office hours run between days.

| Day | Lessons | Lab |
|---|---|---|
| **Day 1 · Foundations & Personal Value** (Tue) | What Is Cowork? · Get Set Up · The Workshop Folder · Personalize & Verify (lessons 01, 02, 06, 03) | First Cowork session, live before/after demo |
| **Day 2 · Skills & Everyday Workflows** (Wed) | Working Effectively · Anatomy of a Skill (lessons 05, 09) | The Skill Vault escape room |
| **Day 3 · Gen Re Use Cases + Governance Snapshot** (Thu) | Use-Case Ideation · Governance Snapshot (lessons 04, 17) | Live skill build, from a room-selected use case |
| **Advanced · Build Your Own** (Thu, +1.5 h) | No lessons — a bring-your-own-use-case clinic | Guided engagement on participants' own workflows |

Lessons 07, 08, 10, 11, 12, 13, 14, 15, 16 and the `control-room/` capstone are **retired** from the
live spine (they carried the old Modules 2–4's back half). They stay on disk and are reachable only
from `resources.html`'s "Deep dives (reference only)" section, for self-study — never linked from a
lesson, hub, or the nav/sidebar a participant navigates day-to-day.

## 3. Researched facts to build on (from the content report)

### Claude Cowork — what it is
Claude Code's agentic architecture inside the **Claude desktop app** (macOS + Windows x64), no terminal,
for non-developers. **Chat = collaborate; Cowork = delegate** — describe an outcome, it plans/executes, you
steer. Runs **locally**: reads/writes files in folders you grant; runs code in an **isolated VM**; always
asks before permanently deleting. On all paid plans (Pro/Max/Team/Enterprise). Desktop app must stay open
and the machine awake for tasks. Launched Jan 12 2026 (macOS preview); GA Apr 9 2026.

### Module 1 — setup
- **NG `cowork-cosetup` skill (our method — see the "Setting Up Cowork for Personal Productivity" doc):**
  a guided 20–40 min interview that generates the personalization files instead of writing them by hand —
  `claude.md` (the entry point read every session) + an `about-me/` folder (`about-me`,
  `voice-profile`, `writing-rules`, and the living `team` + `memory`). The skill installs into the personal
  skills folder (`"list my skills"` to find it). Run with `/cowork-cosetup` from a fresh session. It pre-fills
  from M365, asks in role-adaptive popups (Delivery/Operations/Sales/Enablement/Leadership), and
  `[FILL IN]`-marks skips.
- Underlying native layers it builds on: **Global instructions** (every-session prefs), **Folder
  instructions** (project context; Claude can update them — the Cowork analogue of CLAUDE.md), **Projects**
  (persistent workspaces; memory persists within Projects, not across standalone sessions).
- **M365 connector**: Anthropic's hosted MCP connector; admin consent; **delegated** permissions (sees only
  what the user can); Graph calls logged in the M365 audit log; connectors reach services via Anthropic's cloud.

### Module 2 — using it
- **Permission modes:** "Ask before acting" (approve each step; default for untrusted) vs "Act without asking"
  (faster, supervise only). **Cost discipline:** **Sonnet is the default**; reserve Opus for genuinely hard
  reasoning. Cowork "consumes more usage than chatting" — batch work, use chat for simple tasks, watch Usage.
- **Scheduled tasks:** `/schedule`; run only while the machine is awake and the app open.
- **Failure modes:** **prompt injection** is the primary risk (mitigated, not solved — least privilege, limit
  browser to trusted sites, prefer Ask-before-acting; Opus 4.5+ most robust). **Context limits:** auto-compaction;
  decompose long work into **slices** with artifacts between them.
- **Industry examples are generic reinsurance workflows — no Anthropic plugin packs are referenced.**
  Content builds its own reinsurance-flavored scenarios (treaty-submission triage, quarterly experience-summary
  drafting, document comparison against a checklist) instead of naming or demoing any Anthropic-published pack.
- **Gen Re approval status (client fact, 2026-07-28, reconfirmed 2026-07-31):** raising an Anthropic plugin
  pack by name — especially anything that reads or drafts contract/treaty wording — is a live nerve for this
  client; it risks derailing the engagement given the internal review difficulty around their insurance
  contracts. No pack is approved for use at Gen Re today. Content must not name or demo any specific
  Anthropic plugin as installable; any plugin adoption routes through the governance/review process covered
  in Day 3's governance snapshot (lesson 17).

### Module 3 — skills (highest-scrutiny; quote Anthropic verbatim, date-stamp)
*(Now taught in Day 2's lesson 09, "Anatomy of a Skill" — the scrutiny rule still applies: quote
Anthropic's skill-authoring best practices verbatim and date-stamp them.)*
- A skill = a folder with **`SKILL.md`** (YAML frontmatter + Markdown body), on the open **Agent Skills** standard;
  the same file runs in Claude Cowork and Claude Code.
- **Frontmatter:** `name` ≤ 64 chars, lowercase/numbers/hyphens, gerund form, no "anthropic"/"claude".
  `description` third person, ≤ 1024 chars, **what it does + when to use it** with trigger keywords — the most
  important field (only name+description are pre-loaded for skill selection).
- **Body:** keep under **500 lines** ("Concise is key. The context window is a public good."); **progressive
  disclosure** (SKILL.md = table of contents → detail files; references one level deep); explain-the-why over
  ALL-CAPS; positive examples; default + escape hatch; forward-slash paths.
- **Evaluation-driven development:** "Create evaluations **before** writing extensive documentation." Find gaps
  without the skill → ≥ 3 test scenarios + baseline → minimal docs → iterate; test across Haiku/Sonnet/Opus;
  author with "Claude A", test with fresh "Claude B"; no built-in eval runner.
- **skill-creator loop:** capture intent (incl. the trigger) → interview → write → test (skill vs baseline) →
  grade → improve → package a `.skill`. Be "pushy" in descriptions (Claude under-triggers). The `run_loop`
  description optimizer needs a raw **ANTHROPIC_API_KEY** — SSO-only users can't run it (flag in the lab).

### Module 4 — governance, RBAC, analytics, rollout
*Re-verified 2026-07-21 against Anthropic docs. This module pivoted to governance-first — plugins are
covered as the unit of governed distribution, not as an authoring topic.*

#### Plugins (the distribution unit)
- **Plugin** = bundle of skills + commands + sub-agents + hooks + MCP servers + **LSP servers** +
  **monitors** (+ output-styles, themes, `bin/`). Works in Cowork + Claude Code (not Chat, though
  bundled skills work in Chat).
- **Layout — verified 2026-07-22** (`code.claude.com/docs/en/plugins-reference`):
  ```
  enterprise-plugin/
  ├── .claude-plugin/plugin.json   # manifest — the ONLY thing in this dir
  ├── skills/<name>/SKILL.md       # + optional reference.md, scripts/
  ├── commands/*.md   agents/*.md
  ├── hooks/hooks.json   .mcp.json   .lsp.json   monitors/monitors.json
  ├── output-styles/  themes/  bin/  scripts/  settings.json
  ```
  ⚠️ **`.claude-plugin/` contains only `plugin.json`. Every other directory must be at the plugin
  root** — nesting them inside `.claude-plugin/` is the #1 reason a plugin fails to load.
  - **The manifest is optional.** Without it, components are auto-discovered in default locations and
    the name comes from the directory. A root `SKILL.md` with no `skills/` dir loads as a single-skill
    plugin. Set `version` if you do ship a manifest — otherwise every commit is a new version.
  - **Not everything is Markdown:** skills/commands/agents are `.md`; hooks, MCP, LSP, monitors and
    themes are **JSON**.
  - **Reload semantics:** a skill's `SKILL.md` edit applies immediately; changes to `hooks/`,
    `.mcp.json`, `agents/`, `output-styles/` need `/reload-plugins` or a restart. Matters when pushing
    a control change — don't assume a new hook is live.
  - **A `CLAUDE.md` at the plugin root is NOT loaded as context.** Ship standing instructions as a skill.
  - ⚠️ *Common confusion:* `SKILL.md` + `reference.md` + `scripts/` is the **skill** layout (what sits
    inside `skills/<name>/`), not the plugin layout. Don't present the two as the same thing.
- **Marketplaces:** built-in Knowledge Work (added by default; removable) + Financial Services, Legal,
  Life Sciences. **Edit model:** org-managed plugins can't be edited by members — copy/tweak from a template
  ("owner pushes, members copy"). **Portability:** a skill or plugin authored in the Claude Code structure
  (the superset) runs unchanged in Claude Cowork and Claude Code.
- **Admin click-path — verified 2026-07-22** (`support.claude.com/en/articles/13837433`). All at
  **Organization settings → Plugins**. ⚠️ **Prerequisite: Cowork _and_ Skills must both be enabled.**
  - Anthropic's own: **Add plugins → Browse Anthropic sources → Add**. Knowledge Work is present by
    default; remove via its menu (upper right) → *Remove*.
  - Your own, manual: **Add plugins → Upload a file → Upload to a new marketplace** (first time), name it,
    drag `.zip` files, **Upload**. Same plugin name ⇒ **overwrites the previous version automatically**.
  - Your own, as code: **Add plugin → GitHub**, repo as `owner/repo`. Must be **private or internal**
    (public rejected); Claude GitHub App required; then toggle **Sync automatically**. Syncs trigger on a
    **version-bump PR merging to the default branch — direct pushes do not**.
  - **Limits:** 50 MB/ZIP · **100 plugins manual, 500 via GitHub sync** · name ≤ 64 chars,
    lowercase-with-hyphens · 30-minute sync timeout.
- **Install preferences** (exact labels): **Required** (auto-installed, *cannot* be removed) ·
  **Installed by default** (auto-installed, member can uninstall) · **Available for install** (in the
  catalog, self-install) · **Not available** (hidden). Per-group overrides via the **Custom access**
  column → **Add groups**. Changes apply on the member's **next session or plugin refresh**.
  ⚠️ **Where a member is in several groups, the MOST PERMISSIVE setting wins** —
  Required > Installed by default > Available for install > Not available. So "Not available" for one
  group does **not** block someone who is also in a more permissive group; the real control is group
  membership.

#### RBAC — roles, groups, capabilities (Enterprise)
- **Static roles:** **User**, **Admin**, **Owner** (plus a single **Primary Owner** per org; **Billing** and
  **Developer** are also assignable). *"Owners and Primary Owners always have full access to all features."*
- **Custom roles** (Enterprise) — configured at **Organization settings → Roles**. The critical gotcha, verbatim:
  *"Members assigned to custom roles don't automatically inherit organization-enabled capabilities. Every
  capability a 'Custom' role member needs must be explicitly granted."* Also: *"The organization-level toggle
  must be on for custom roles to control per-member access."*
- **Six admin permission areas**, each set to *No access / Can view / Can manage*: **Identity & Access**
  (editing roles and groups), **Billing**, **Analytics**, **Privacy**, **User Management**, **Libraries**.
  This is how you delegate billing or identity admin without handing out Owner.
- **Capabilities tab:** per-feature toggles — Cowork, Claude Code, Web Search, Memory, Projects, Code Execution.
- **Connectors tab:** per connector, **Always allow / Needs approval / Blocked**, with per-tool granularity via
  "Custom". Note the admin guide's caveat: **no per-group connector control** — connectors are org-wide.
- **Models tab:** enable/disable specific models, **cap effort levels**, set the default model for new
  conversations. *This is the structural fix for Opus overuse — a control, not just a dashboard finding.*
- **Groups:** created manually or **synced via SCIM**; managed at the parent org and propagated to child orgs.
  **Nested IdP groups are not supported — only direct members sync.** Custom-role permissions apply via
  group-to-role mapping.
- **Permission math:** capabilities are **additive** — *"a user in multiple groups gets the union of
  permissions"* — but **group spend limits invert it**: *"the most restrictive limit across a user's groups wins."*
- **Sequencing:** configure **SSO first, then RBAC** — enforcing roles before identity is settled risks lockout.

#### Setup best practices (what IT actually does)
- Enable Cowork at **Organization settings → Capabilities**; bind identity with **SSO + SCIM**.
- **Desktop app required** (macOS / Windows). Deploy by MDM (Jamf/Kandji/Intune) or allow self-install —
  on Windows use **the MSIX installer, not the .exe**.
- Configure **network egress allowlists, mount controls, and desktop extension allowlists** in org settings.
- **Folder scoping is the real data control:** users select which folders Cowork may read from and write to.
  There are no granular per-file permissions — least privilege means picking a narrow folder.
- Set **group spend limits** per team from the admin console.

#### The audit gap (still open — decisive for a regulated reinsurer)
- Anthropic's own Cowork admin guide, verbatim: ***"the Compliance API and Audit Logs do not cover Claude
  Cowork yet."*** Cowork is excluded from **Audit Logs, the Compliance API, and Data Exports**, on every plan
  tier including Enterprise. Conversation history lives locally on the user's machine.
- Context: Anthropic shipped the **Compliance API on 2026-05-21** (28 security/compliance integrations —
  CrowdStrike, Microsoft Purview, Okta, Wiz, Zscaler) — Cowork simply isn't in scope for it yet.
- **The compensating architecture — three planes:** Compliance API = **control plane**; OpenTelemetry =
  **agent/operational plane**; an on-device proxy or LLM gateway = **network/tool plane**. A **shared user
  account identifier** lets you correlate OTel events with Compliance API records.
- **Manage it deliberately** — least privilege folder scope, approvals on for sensitive work, OTel wired to the
  SIEM, re-verify each cycle — and route work needing zero-retention or centralized audit today to Anthropic's
  audited surfaces (the API or Claude Code Enterprise), not the Cowork interface.
- **Data/retention:** commercial (Team/Enterprise/API) — no training by default, 30-day retention; ZDR only on
  API + Claude Code Enterprise (not the Cowork interface).

#### Field corrections (Cowork product prep, 2026-07-21)
Client-agnostic product corrections that override the doc-derived claims above where they conflict.
Re-confirm each cycle. **Gen Re-specific facts are not yet gathered — see `CLIENT.md` §10 for the
open discovery questions (stack, licensed products, dashboard, setup depth).**
- **"Local" is misleading and must be corrected out loud.** Cowork runs on the desktop against local
  folders, but **the model call goes to Anthropic's API** — whatever it reads from a granted folder
  leaves the machine to be processed. The *files* are local; the *reasoning over them* is not. This is
  the correction that matters most to a regulated reinsurer, because "it runs locally" makes an
  over-broad folder grant feel harmless.
- **Spend controls are weaker than the docs imply.** Moving Team → Enterprise **removes** several cost
  controls, and there is **no clean per-user spend cap**. Orgs needing one are enforcing it through an
  **API management gateway**. Model/effort caps on the Models tab remain the reliable lever. Treat the
  group-spend-limit rule as directional and verify per tenant.
- **Azure AI Foundry is the private-deployment path** for a Microsoft-stack reinsurer — Cowork/Claude Code
  on Foundry gives a materially better posture because the infrastructure is genuinely yours (real
  components installed inside your boundary) rather than a toggle. Trade: it's a deployment project.
  The same gateway layer is where per-user spend control becomes possible.
- **Confirm setup depth per client.** If the client has already stood up device management (e.g. Intune)
  and worked through activation, deliver the six setup steps as a confirm-checklist, not a tutorial.
  Verify Gen Re's actual state in discovery before deciding how much setup to teach.
- **The adoption dashboard is NG IP** the client stands up in their own environment (see the
  adoption-dashboard slot in lesson 15 and `CLIENT.md` §10). Typical live cards: token usage · number of
  users · **top expensive prompts** · cost by model · API requests by model · reliability · MCP servers ·
  daily prompts per user. **Cowork and Claude Code are separate sections on a combined board — there is
  no tool filter.**
- **The education loop** (best new teaching idea in the module): spend data is a curriculum signal, not
  a cost report. Repeated expensive patterns route to one of two fixes — **build a skill** (mine top
  expensive prompts as a backlog: is this asked often enough to package?) or **fix `CLAUDE.md`** (e.g.
  a session doing hundreds of individual file edits → instruct batched tool/file edits, same output at
  a fraction of the spend). Frame as **proactive vs retroactive enablement**.

#### Analytics & telemetry
- **Admin dashboard:** Cowork sessions, active users, actions — **T+1** refresh, CSV export.
- **Analytics API** (Enterprise): per-user daily Cowork activity, org-wide **DAU/WAU/MAU**, **skill and
  connector rankings** by invocation, per-user cost by model. Session-level auditing remains unavailable.
- **OpenTelemetry** (Team + Enterprise) — configured at **Claude Desktop → Organization settings → Cowork**:
  OTLP endpoint URL, HTTP/JSON or HTTP/protobuf, auth headers (encrypted at rest).
  ***"Events are only exported when an admin configures an OTLP endpoint. No data flows by default."***
  Emits: **user prompts (full text)**, tool/MCP invocations (server, tool, params, success/failure, duration),
  **file paths read or modified**, skills/plugins invoked, **human approval decisions (approved / rejected /
  auto-initiated)**, and API requests (model, token counts, cost estimates, errors). Events share a
  **`prompt.id`** attribute so a full response can be reconstructed. Sinks: Splunk, Cribl, Elasticsearch, Loki,
  ClickHouse, Honeycomb, Datadog.
  ⚠️ **Governance note for a regulated reinsurer:** OTel exports *prompt text and file paths* to your SIEM.
  That is a data-handling decision in its own right — scope the sink accordingly.
- **Build the partner dashboard** by pulling the Analytics API + OTel into Power BI/Databricks. Anthropic's
  KPI = weekly active usage trending up. **OTel is operational telemetry, not compliance-grade audit.**

#### Rollout (Anthropic's published guidance)
- Pilot → department → org; 2–3 champions/dept; All-Staff 101s (everyone completes a real delegation that
  produces a deliverable); exec sponsors + templates; weekly/biweekly office hours. **RBAC enables a phased
  rollout by team** — enable the Cowork capability for the pilot group only, then widen.
- **Three questions, weekly then monthly:** Are people using it? How deeply? Is it paying off?

## 4. Authoring notes
- Lessons in `pages/training/` as `NN-slug.html`; the third lesson of each module is the lab/capstone.
- Use the shared card classes so slides auto-generate — see DESIGN-SYSTEM.md "How slides are generated".
- Every lab = a real delegation producing a deliverable. Lead industry labs with regulated verticals.
- `SCAFFOLD` / `TODO` markers flag where NG IP drops in (industry use cases, the adoption-dashboard build).
- Re-verify date-sensitive facts (Sources below) before each cohort; mark provisional items as such.

## 5. Sources
- Anthropic — Claude Cowork: <https://www.anthropic.com/product/claude-cowork> · docs: <https://claude.com/docs/cowork>
- Anthropic — Skill authoring best practices: <https://platform.claude.com> (Skills) · Agent Skills standard: <https://agentskills.io>
- Anthropic — GitHub: `anthropics/skills` (skill-creator, template, spec), `anthropics/knowledge-work-plugins`, `anthropics/claude-for-legal`, `anthropics/financial-services`
- Anthropic Academy (free courses): <https://anthropic.skilljar.com> — "Introduction to Claude Cowork", "Introduction to agent skills"
- Anthropic — Cowork Enterprise Administrator Guide & Analytics API / OpenTelemetry monitoring docs (claude.com/docs)
- Internal: "Cowork Next Steps" meeting (2026-06-11); the Cowork content-research report (Anthropic best practices corpus).
