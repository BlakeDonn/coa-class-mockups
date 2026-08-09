# Handoff: the desktop echo pass (design session 6)

- **Session type:** user-launched detached Fable design dialogue, effort xhigh, advisor/sponsor
  rules. Nothing here touches the main repo or the shipped site.
- **Date written:** 2026-08-08, at the close of session 5 (Choose + modal, all ruled).

## THE PROCESS CONTRACT — unchanged, plus one standing practice

The session-4/5 cadence binds: one piece per round · 2–3 directions side by side, same subject ·
real data, drafts labeled · variant stones + a live composed view · deploy every round with
`?v=N` cache-busts · record rulings the moment they land, in the user's words · corrections are
cheap, re-mock, don't argue. Decision previews must be REAL deployed renders, never sketches.

**Standing practice added in session 5:** before every deploy, screenshot the changed page in
the headless-Chrome width harness. Desktop headless lays out at ~500px minimum, so phone width
needs a 390px `<iframe>` harness page; this is a DESKTOP pass, so shoot 1280 and 1440 directly
too. WSL sees `/mnt/c` writes late — wait for the file, don't rerun. One fresh `--user-data-dir`
per shot.

## JOBS

1. **Carry the session-3 phone rulings to desktop** on `rhythm-class.html`:
   - the plain-text role line (§1 ruled "Desktop follows the same treatment in its own pass");
   - the corner video thumb at the TEXT COLUMN's right edge — the seal owns the far right; the
     "▶ Class highlight" chip retires when this lands;
   - engine block styling parity.
2. **The shipped-Atlas tagline swap divergence:** the old premise line still shows in the Atlas
   masthead copy of this repo's `index.html`; the class page carries the ruled "The whispers
   offer power. Will you listen?" Decide where the divergence note resolves.
3. **Warm-up flags, if useful:** star-map placement (the masthead ghost button in `atlas-v2.html`
   is a live proposal) and true-support propagation (the class page's ruled role line and the
   four-jobs ✦ facts still use the old counting — `atlas-page-grammar.md` §4 ripples row).

## WAITING ON DATA — do not start these

- ×70 archetype tags, ×16 taglines/engines, granular class detail, the six style axes, the
  two-altitude Choose questionnaire: all wait on the pilot's landing (gates green as of
  2026-08-08; landing pending its Sol-high review).
- The site slice: waits on the Anatomy merge + crest rights confirmation.

## READ FIRST, IN ORDER

1. `class-page-grammar.md` — §1 (role line, video), §5 (media), §8 (writing rules), open queue.
2. `atlas-page-grammar.md` — §4 ripples + §7 open queue (the two warm-up flags live there).
3. `choose-page-grammar.md` — session 5's rulings; the LOCKED modal binds any door you touch.
4. `design-roadmap.md` — the forward plan.
5. Deployed, DESKTOP width: https://blakedonn.github.io/coa-class-mockups/rhythm-class.html?c=cultist
   and https://blakedonn.github.io/coa-class-mockups/atlas-v2.html
6. `rhythm-class.html` + `rhythm-study.js` (the surface under study).

## WHERE (verified session 5)

- Repo `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`; WSL sees it at
  `/mnt/c/Users/17274/Worktrees/_previews/coa-class-diagram-mockups`. The session may flip
  between WSL and Windows tooling — Bash blocks `C:` paths when Windows-native; use PowerShell
  there, and the Windows git exe for pushes either way:
  `"/mnt/c/Program Files/Git/cmd/git.exe" -C '<repo>' push origin main`.
- Commit with `-c user.name=blakedonn -c user.email=bdonne39@gmail.com`.
- LANDMINE: 11 site-copy files sit CRLF-flipped in the working tree. Stage files explicitly;
  never `git add -A`.
- LANDMINE: `.stone` button rows never wrap on their own; study pages carry a ≤700px
  `flex: 1 1 100%` fix in `choose-study.css` / `profile-study.css`. Reuse it.
- Headless screenshots: `"/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
  --headless=new --disable-gpu --user-data-dir=<fresh> --window-size=W,H --screenshot=<out.png>
  <file:///C:/...>`; phone via the 390px-iframe harness pattern.
- `GODOT LAUNCH: no-godot`.

## KICKOFF (paste into the fresh session)

Read `desktop-echo-design-handoff.md` in `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`
and run the design dialogue it describes, starting with the read-first list.
