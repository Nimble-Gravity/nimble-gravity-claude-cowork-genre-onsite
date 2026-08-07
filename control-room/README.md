# The Control Room — Workshop 4 capstone

A browser-based governance simulation. Teams run a live Cowork control review against a 40-minute
clock: an access review, an RBAC repair, an adoption readout, and the one-page control narrative.
Each artifact they produce in Cowork yields the sign-off code that clears the next station.

Four review stations, one master status board, a leaderboard, and a facilitator view.
Vanilla ES modules + Three.js from a CDN, no build step.

## The premise

Internal Audit has given notice. The pilot ran hot — folders scoped to whole drives, roles copied
from a template, spend spiking on one desk, and no control narrative on file. The floor opens with
**four open exceptions** on the board. Teams work them down to zero.

The 3D scene is an operations floor: four review consoles facing a master status board that counts
open exceptions. A station's monitors read `NO SIGNAL` and its desk rail glows amber while its
exception is open; on sign-off the beacon above it dissolves, the feeds come online, the rail turns
teal, and the board decrements. Clear all four and the floor stands down from alert.

## Quick start

```bash
# from the repo root (this repo's dev server, with live reload)
./serve
# game:        http://localhost:8000/control-room/
# facilitator: http://localhost:8000/control-room/admin.html
```

or standalone: `cd control-room && python3 -m http.server 8000`.

ES modules and `fetch` don't work over `file://`, and code hashing needs `https://` or `localhost`.

## ⚠️ Two deployment notes

1. **Storage keys are namespaced.** This app shares an origin with the Workshop 3 lab, so it uses
   `controlRoom.state.v1`, `controlRoom.teams.v1`, and `controlRoom.resetFlags.v1`
   (`js/state.js`, `js/leaderboard.js`), and its own `CONTROL_ROOM_CONFIG` global. **Never point both
   apps at the same keys** — a Workshop 3 run in progress would bleed into this one.
2. **Running local-only this cohort.** `supabaseUrl` / `supabaseAnonKey` are deliberately blank in
   `config/app-config.js`. Codes still validate and the game is fully playable, but the leaderboard is
   final-submission-only and per-device, and `admin.html` sees only teams that played in the same
   browser. The UI states this. To switch on a shared board, see *Leaderboard backend* below.

## The four stations

| # | Station | Discipline | Lab files |
|---|---|---|---|
| 1 | The Access Map | Least privilege, folder scope, approval modes | `cowork-access-register.csv`, `least-privilege-rubric.md` |
| 2 | The Broken Role Matrix | RBAC: Custom roles, admin areas, SCIM, install prefs | `role-matrix-DRAFT.md`, `rbac-reference.md` |
| 3 | Read the Room | Authoring a reporting skill; reading the Analytics surface | `analytics-export.csv` |
| 4 | The Control Narrative | The governance one-pager + QA against an acceptance checklist | `exam-checklist.txt` |

Answer key lives in `config/rooms.source.json`. (It used to be duplicated in a
`workshop-4-script.md` facilitator appendix; that script was retired when the
programme became the three-day onsite — see `day-3-script.md`.)

All six lab files are in `lab-files/` and are linked for download from
`../pages/training/16-the-control-room.html`. They are **synthetic** — no real Gen Re data.

## Editing stations

Station content lives in `config/rooms.source.json`. (The config key is `rooms[]` — the engine's
generic term for a stage; the UI presents each one as a station.) Edit it, then regenerate:

```bash
node tools/generate-hashes.mjs                   # rooms.source.json -> rooms.json
node tools/generate-hashes.mjs --code "9Ready"   # hash a single code
```

Each station's `title` also becomes its on-screen console nameplate, so keep titles short — anything
past ~22 characters is truncated on the 3D sign.

Codes are case- and whitespace-insensitive (normalized to `UPPERCASE`, whitespace stripped) on both
sides of the comparison.

**Never put a code's literal text in a hint or lab step** — `rooms.json` is fetched by the browser, so
players can read it in devtools. The generator warns loudly if a hint/step contains its code. Hints
should point at *where* the answer is, not *what* it is.

### Keeping codes deterministic

Every code is derived from data in the lab files, so it can be recomputed rather than trusted. If you
edit `cowork-access-register.csv` or `analytics-export.csv`, **re-derive the affected code before the
session** — the aggregates are what the station checks:

- Station 1 = count of rows breaking ≥1 rubric rule, + first word of the worst offender's department.
- Station 3 = first word of the department with the highest Opus share of dispatch turns, + distinct
  users in the export.

## Security model (know the tradeoff)

- Codes ship only as SHA-256 hashes; input is hashed client-side and compared. Nothing in view-source
  reveals a code. Short codes could be brute-forced offline — fine for a workshop, not for anything real.
- **`config/rooms.source.json` contains all the answers, and it is served as a static file.** On a
  public deployment it is fetchable at a guessable URL. For public Pages deployments, move it out of
  the web root (or gitignore it) and keep it in the facilitator's drive. The generated `rooms.json` is
  the only file the game needs at runtime.
- `adminKey` on `admin.html` is a URL-param deterrent, not auth. There is deliberately no login.

## State, refresh, and skip-ahead

Game state persists to `localStorage` on every mutation, so a refresh restores the current station,
cleared stations, hints, attempts, and the timer (elapsed time derives from the wall-clock start, so
the clock keeps running through a refresh). There are no per-station URLs and `?room=` is ignored, so
skipping ahead via URL does nothing. "Reset & run again" clears state for a fresh run.

Without WebGL the 3D floor is skipped and the side panel carries the whole game — the lab is fully
playable on locked-down laptops and remote desktops.

## Leaderboard backend (optional)

To turn on a live shared board and a cross-device facilitator view, create a Supabase project and run:

```sql
create table if not exists public.control_room_teams (
  id uuid primary key,
  team_name text not null,
  current_room int not null default 0,
  cleared boolean not null default false,
  attempts int not null default 0,
  hints_used jsonb not null default '[]',
  penalty_seconds int not null default 0,
  started_at timestamptz,
  finished_at timestamptz,
  total_seconds int,
  reset_requested boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.control_room_teams enable row level security;

-- Workshop-grade policy: the publishable anon key may read/write this table.
-- Use a dedicated Supabase project for the event; wipe the table after.
create policy "workshop anon access" on public.control_room_teams
  for all to anon using (true) with check (true);
```

Then set `supabaseUrl` and `supabaseAnonKey` in `config/app-config.js`. The table name is distinct
from the Workshop 3 lab's, so the two cohorts' boards stay separate.

Between cohorts: `delete from control_room_teams;`

## Facilitator view (`admin.html`)

Shows every team's current station, live elapsed time (penalties included), hints used, attempts, and
last seen (clients heartbeat every 25 s). **Reset** flags a team's row; their browser polls every 10 s,
wipes local state, and reloads. **Remove** deletes the row. In local-only mode the view sees only this
browser's teams — the badge at the top tells you which mode you're in.

## Facilitation checklist

1. Re-verify the governance facts in `../cowork-context.md` §Module 4 (last verified 2026-07-21).
2. Distribute the six `lab-files/` to participants before the break — they are not part of this app.
3. Confirm local-only vs Supabase in `config/app-config.js`; set `adminKey` if you want one.
4. Open `admin.html` on the facilitator machine; teams open the root URL and enter a team name to start.
5. Keep the answer key (`config/rooms.source.json`) open but not screen-shared.
