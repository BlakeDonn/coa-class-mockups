# Handoff: Atlas design pass + spec-map exploration

- **Session type:** user-launched detached design dialogue. Fable, effort xhigh (user's call).
- **Date written:** 2026-08-07, by the session that ran the class-page dialogue sessions 2–3.
- **Authority model:** advisor/sponsor rules. Every substantive choice is mocked first and needs a
  USER ruling before it is built. Rulings are recorded file-backed. This session owns nothing in
  the main repo and never touches the shipped site.

## GOAL & SCOPE

Two jobs, in order:

1. **Bring the Atlas page (`index.html`) under the class-page design philosophy** ruled in
   `class-page-grammar.md`. The user's framing, verbatim in spirit: "it's really good already,
   I don't want to go too crazy — what we have is solid." This is an additive pass, not a rebuild.
2. **Explore the spec map.** The user's sketch: a "map" so users can view all specs at once —
   "like one of the web charts that has different axes (damage, control, sustain, etc.)".
   This is a direction to explore and mock, not a ruled feature.

**OUT of scope:** the Choose page and the Guided surfaces (later sessions — see sequencing note);
granular class-page detail work (endgame folds etc.) is FROZEN until the five-class research pilot
lands (user ruling 2026-08-07); the main repo; the shipped site; any candidate/snapshot data edits.

## WHERE

- **Repo:** `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups` — standalone git repo,
  origin `BlakeDonn/coa-class-mockups`. Pushes deploy to
  https://blakedonn.github.io/coa-class-mockups/ (GitHub Pages, ~2 min build + 10 min asset cache).
- WSL sees it at `/mnt/c/Users/17274/Worktrees/_previews/coa-class-diagram-mockups`.
- WSL git has no GitHub credentials — push with
  `"/mnt/c/Program Files/Git/cmd/git.exe" -C 'C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups' push origin main`.
- Commit identity: `blakedonn <bdonne39@gmail.com>` (pass with `-c`; WSL git has no global identity).
- LANDMINE: several site-copy files are stored with CRLF. Claude edit tools normalize to LF and the
  diff explodes to whole-file. Fix: rebuild from `git show HEAD:<file>` bytes and re-apply the change
  (precedent: commit `61c6672`'s parent handling of `class.js`).
- `GODOT LAUNCH: no-godot` — static HTML/CSS/JS mockups only.

## READ FIRST, IN ORDER

1. `class-page-grammar.md` — the binding design-philosophy record and the rulings format to copy.
2. The deployed class page: https://blakedonn.github.io/coa-class-mockups/rhythm-class.html?c=cultist
   — the locked look this pass must feel native to. View at phone width too.
3. `index.html` + `explorer.css` + `explorer.js` — the Atlas as shipped (this repo holds a copy).
4. `explorer-data.js` — real data for mockups: 21 classes, 70 specs, per-context complexity axes
   with evidence tiers, roles, ranges, playstyle families.
5. The dialogue artifact for how sessions 2–3 ran (mock → pick → record → implement → deploy):
   https://claude.ai/code/artifact/ca1349bc-2fcb-43d5-8834-994aa3b5e05e

## THE DESIGN PHILOSOPHY TO CARRY (distilled from class-page-grammar.md — it binds here)

- **Mock first.** 2–3 directions with REAL project data, trade-off notes, user picks before building.
- **Plain language explains; one stylized phrase may introduce.** Tone bar is explicit in §8.
- **Authored to fit.** Clamped or ellipsized text is a defect. Copy is written for its slot.
- **Evidence honesty is load-bearing.** Data / Players / Inference tiers untouched. No rankings or
  popularity in any visual form, ever (standing product ruling). Unresearched shows as an honest gap.
- **Comparative claims trace to computable facts.** Precedent: the rare-part ✦ rule — no fact, no bullet.
- **Phone chrome vocabulary:** one sticky row — ⚜ glyph sigil, search, four icon buttons
  (⚜ Atlas · ◈ Choose · ✦ Guided · ⚔ Loot) with tiny always-visible labels. Desktop keeps labeled tabs.
- **Styled keyword rule:** one word may carry the class outline tone
  (`color-mix(class-color 58%, white 42%)`); decoration only.
- **Mobile-first, desktop echoes the same cadence.**
- **Diagrams show; sentences tell.** Every visual ships with its one-line reading.

## THE MAP — CONSTRAINTS THAT ARE NOT NEGOTIABLE

- **The Atlas is an identity guide, not a tier list.** A radar/web chart slides toward power ranking
  fast. Axes must be IDENTITY or DEMAND axes, never performance. The researched complexity axes
  (core actions, state tracking, setup burden, sequencing, reactive decisions, execution, failure cost)
  exist per-context with tiers. Roles, range, and family are structural Data. "Damage / control /
  sustain" as the user sketched them need translating into that evidence-backed space — propose the
  translation, show the options, get the ruling.
- **Unknown is not zero.** A radar spoke at zero reads as "bad", not "unresearched". Whatever form
  wins must render gaps honestly or exclude honestly, stated on the surface.
- **70 specs on one chart is noise.** Consider class rollups, small multiples, family lenses,
  filter-driven overlays. Scale is a design question the mockups must answer, not hand-wave.
- Evidence never changes ordering; nothing sorts by fit or strength.

## STATE (2026-08-07)

- Class-page phone layout: LOCKED and deployed (sessions 2–3; grammar contract records everything).
- Five-class research pilot (cultist, tinker, witch-hunter, guardian, knight-of-xoroth) runs in a
  separate worktree of the main repo. Its outputs reshape class-detail surfaces, not Atlas structure.
- Main repo: the Anatomy branch (`work/2026-08-06-coa-guided-production`) is unmerged; it touches
  Guided surfaces only. The shipped Atlas was deployed 2026-08-06 AM (Guided is not live).
- Sequencing recommendation already given to the user: Atlas pass now (data-independent),
  Choose next (scoring is ruled and Sol-approved; mostly visual language), Guided LAST — after the
  pilot imports and the Anatomy merge, because Guided is evidence-bound and would need redoing.

## RULINGS CAPTURE

- Create `atlas-page-grammar.md` in this repo, same table format as `class-page-grammar.md`
  (piece / decision / status: RULED · PROPOSED · OPEN, with provenance and a session log).
- Mockups live in this repo; deploy via push for phone verification.

## KICKOFF (paste into the fresh session)

Read `atlas-map-design-handoff.md` in `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`
and run the Atlas design dialogue it describes, starting with the read-first list.
