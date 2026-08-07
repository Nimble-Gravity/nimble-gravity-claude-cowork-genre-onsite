# The Skill Vault — Virtual Escape Room (Day 2)

A web-based escape room that gates the hands-on lab exercises for the Claude
Cowork training workshop. Teams complete lab steps in Cowork; the lab artifacts
contain unlock codes they enter here to open the next room. Four rooms, one
40-minute timer, a live leaderboard, and a facilitator view.

No build step, no framework: vanilla ES modules + Three.js, vendored locally
under `assets/vendor/three/` (a delivery network may block public CDNs).

## Quick start

Serve the folder from any static server (ES modules and `fetch` don't work
over `file://`, and code hashing needs `https://` or `localhost`):

```bash
# from the repo root (this repo's dev server, with live reload)
./serve
# game:        http://localhost:8000/escape-room/
# facilitator: http://localhost:8000/escape-room/admin.html
```

or standalone: `cd escape-room && python3 -m http.server 8000`.

## Project structure

```
index.html            game shell (static skeleton — all content injected from config)
admin.html            facilitator view
config/
  rooms.source.json   EDIT THIS — room content incl. plaintext codes (answers!)
  rooms.json          generated, deployed — hashes only, never edit by hand
  app-config.js       per-deployment settings: backend, admin key
css/game.css          war-room theme for the game
css/admin.css         facilitator table theme
js/
  main.js             boot, game flow, persistence wiring, heartbeat
  state.js            localStorage-backed game state (survives refresh)
  rooms.js            fetches + validates rooms.json
  crypto.js           input normalization + SHA-256
  timer.js            countdown display (wall-clock based)
  ui.js               all DOM rendering for the game page
  leaderboard.js      backend adapters: Supabase (shared) / localStorage (fallback)
  admin.js            facilitator view logic
  scene/              Three.js vault: textures.js (procedural), scene.js (geometry+loop)
tools/generate-hashes.mjs   turns rooms.source.json into rooms.json
```

## How rooms work / adding or editing rooms

All room content lives in `config/rooms.source.json`. Each room:

```jsonc
{
  "id": "room-1",                 // stable id
  "title": "The Inherited Skill",
  "narrative": "2–3 sentence scenario",
  "labSteps": ["step 1", "step 2"],   // numbered, collapsible in the UI
  "codePlaintext": "4Migrate",        // the answer — stripped at generate time
  "codeHash": "GENERATE_WITH_SCRIPT", // filled in by the tool
  "hints": ["free hint", "penalty hint"],  // max 2; #2 costs hintPenaltySeconds
  "skillsTaught": ["shown on the escape recap"]
}
```

Top-level: `workshopTitle`, `scenario` (start screen), `timeLimitMinutes`,
`hintPenaltySeconds`. Rooms are linear in array order; 3–6 rooms render fine
in the 3D corridor. Then regenerate:

```bash
node tools/generate-hashes.mjs        # rooms.source.json -> rooms.json
```

Codes are case- and whitespace-insensitive (normalized to `UPPERCASE`,
whitespace stripped) on both sides of the comparison.

**Never put the code's literal text in a hint or lab step** — `rooms.json` is
fetched by the browser, so players can read it in devtools. The generator
warns loudly if a hint/step contains the code. Hints should point at *where*
the answer is, not *what* it is.

### Generating a hash for a single code

```bash
node tools/generate-hashes.mjs --code "4Migrate"
```

## Security model (know the tradeoff)

- Codes ship only as SHA-256 hashes; input is hashed client-side and compared.
  Nothing in view-source reveals a code. Determined players could brute-force
  short codes offline — fine for a workshop, don't reuse for anything real.
- `config/rooms.source.json` **contains all the answers.** If this repo is
  public (or the folder is deployed as-is to public Pages), that file is
  fetchable at a guessable URL. For public deployments, move it out of the
  web root / gitignore it and keep it in the facilitator's drive.
- `adminKey` on admin.html is a deterrent (URL param check), not auth. There
  is deliberately no login system.

## State, refresh, and skip-ahead

- Game state persists to `localStorage` on every mutation. Refreshing
  mid-game restores the current room, unlocked doors, hints, attempts, and the
  timer (elapsed time is derived from the wall-clock start timestamp, so the
  clock keeps running through a refresh — no pausing by closing the tab).
- Progress is only readable from validated stored state; there are no
  per-room URLs and any `?room=` query param is ignored, so skipping ahead
  via URL does nothing.
- "Reset & run again" on the escape screen clears state for a fresh run.

## Leaderboard backend (Supabase) — optional but recommended

Without a backend the game still works: codes validate client-side, but the
leaderboard is **final-submission only and per-device**, and the facilitator
view only sees teams that played in the same browser. The UI states this.

With Supabase (free tier) you get a live shared leaderboard, a cross-device
facilitator view, and remote team reset. Chosen over Firebase because it needs
no SDK — plain REST `fetch` keeps the app dependency-free.

1. Create a project at supabase.com, then run in the SQL editor:

```sql
create table if not exists public.skill_vault_teams (
  id uuid primary key,
  team_name text not null,
  current_room int not null default 0,
  escaped boolean not null default false,
  attempts int not null default 0,
  hints_used jsonb not null default '[]',
  penalty_seconds int not null default 0,
  started_at timestamptz,
  finished_at timestamptz,
  total_seconds int,
  reset_requested boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.skill_vault_teams enable row level security;

-- Workshop-grade policy: the publishable anon key may read/write this table.
-- Use a dedicated Supabase project for the event; wipe the table after.
create policy "workshop anon access" on public.skill_vault_teams
  for all to anon using (true) with check (true);
```

2. In `config/app-config.js`, set `supabaseUrl` and `supabaseAnonKey`
   (Project Settings → API → Project URL / anon public key).

Between cohorts, clear the board: `delete from skill_vault_teams;`

## Facilitator view (`admin.html`)

- Shows every team: current room, live elapsed time (penalties included),
  hints used, attempts, and "last seen" (clients heartbeat every 25 s).
- **Reset** flags the team's row; the team's browser polls the flag every
  10 s, wipes its local state, and reloads to the start screen.
- **Remove** deletes the row from the board.
- Optionally set `adminKey` in `app-config.js`, then open
  `admin.html?key=<yourkey>`.
- In local (no-backend) mode the view only sees this browser's teams — the
  badge at the top tells you which mode you're in.

## Deploying to GitHub Pages

This folder is static — it deploys with the rest of this repo (already wired
via `.github/workflows/deploy.yml`); the game lands at
`https://<user>.github.io/<repo>/escape-room/`.

Standalone repo instead: push the `escape-room/` contents to a repo, then
Settings → Pages → deploy from branch. All asset paths are relative, so it
works at any subpath. Remember the note above about `rooms.source.json` on
public repos.

## Facilitation setup checklist

1. Edit `config/rooms.source.json`; run `node tools/generate-hashes.mjs`.
2. Prepare the lab input files the rooms reference (e.g.
   `vault-standup-notes.docx`, `client-formatter-SKILL.md`, `raw-notes.docx`,
   `interview-notes-jmalik.docx`, `qa-checklist.docx`) so that the labs actually
   produce the codes — distribute them to participants via your usual channel;
   they are not part of this app. Participant-facing content files are Word
   documents (business users recognize them); the `.txt` files alongside them in
   `lab-files/` are the editable sources — edit those, then regenerate the
   `.docx` with `python tools/convert-lab-files.py`. The two `SKILL.md` files
   stay Markdown deliberately: that's Cowork's skill file format, and reading
   and repairing it is the exercise. Unlock codes are derived from file
   content, so re-verify codes after any content edit.
3. Configure (or skip) Supabase in `config/app-config.js`; set `adminKey`.
4. Deploy; open `admin.html` on the facilitator machine; teams open the root
   URL, enter a team name, and the clock starts.
