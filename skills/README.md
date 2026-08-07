# Workshop Skills

The four skills the workshop ships as real, downloadable artifacts. They *are* the product — and they demonstrate skill-authoring by being skills. Each is a standard Agent-Skills folder (a `SKILL.md` plus any referenced files), served as-is by GitHub Pages so an attendee can download and install it directly.

| Skill | Folder | Embedded in lesson | Purpose |
|---|---|---|---|
| Co-setup | `cowork-cosetup/` | `02-getting-set-up.html` | Interviews you and writes your personalization / about-me files. |
| Workflow decomposition | `workflow-decomposition/` | `11-build-a-skill-lab.html` | Interviews you about a workflow and offers to draft it as a skill. |
| Memo generation | `memo-generation/` | `09-anatomy-of-a-skill.html` | Small, finished, high-ROI example: notes/email → formatted memo. The good-vs-bad worked example. |
| Solution profile | `solution-profile/` | `04-use-cases-by-industry.html` §04 | A demo prompt packaged as a skill: legacy-system folder → cited solution profile + as-is architecture diagram. The long worked example; this finished copy is the facilitator's safety net for the Day 3 live build. **Its sample input folder is `assets/demo/solution-profile-folder/`** (the TreatyLayerPricer files) — linked from `resources.html`, and the folder the Day 3 backup demo runs against. |

## Distribution (v1 = copy-paste)

The primary install path taught on-site is **copy-paste**: the lesson shows the full `SKILL.md` in a copy block, the attendee pastes it into Cowork, and asks Claude to "make this a skill." The downloadable `SKILL.md` here is the secondary path for re-runs or later use.

## Install path

Save the skill into your Claude Cowork skills folder (ask Cowork to "list my skills"
to find it; installing your first skill is what *creates* the folder). Note: the
co-setup interview writes about-me / instruction files — those are **context files,
not skills**; only the packaged skill goes in the skills folder.

## Authoring standard

These model Anthropic's published skill-authoring guidance: a tight keyword-rich `description`, a body under 500 lines, progressive disclosure, good/bad examples, and **evals before docs**. See `09-anatomy-of-a-skill.html` for the standard quoted verbatim and date-stamped.
