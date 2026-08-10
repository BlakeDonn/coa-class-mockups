# Handoff: the design-adoption session (all 21 classes onto the ruled system)

- **Session type:** user-launched detached Fable design dialogue (high/xhigh). The user is
  pasting this into their standing Fable-high design session — the full ruled shelf should
  already be in its context; the read-first list below re-anchors it either way.
- **Date written:** 2026-08-10, spun out of the copy-verification session after the ×21
  Atlas copy landed.
- **Why this session exists (user + advisor agreement):** the ruled design lives across
  eight study pages while the class page, Atlas, and Choose surfaces sit at different ages.
  Adopt every class into the agreed design system FIRST, with honest gap states; per-class
  authoring (seals, strips) comes after. Not a /slice — mockups repo only, shipped site
  untouched.

## THE JOB — three legs, ruled one piece at a time (the class-page cadence)

1. **Gap-state rulings.** Nineteen classes have no seal; most have no verbs, strips, or
   engine paragraph. Rule what each empty slot renders: the seal plate (hide, crest
   placeholder, or something else — mock 2–3 directions), verb chips, strip plates (a
   dashed honest state already exists — verify it reads well ×67), masthead engine block.
   Law: absent, never invented; gap states are honest, never placeholder guesses.
2. **Breadth pass.** `rhythm-class.html?c=<class>` must render all 21 cleanly at 1280 and
   390. Hunt layout breakage: 3-spec vs 4-spec rails, long names (Knight of Xoroth,
   Shadowhunting in doors), no-seal mastheads, role lines at one line. Fix in the study
   CSS; record each fix.
3. **Consolidation.** One canonical reference set: `atlas-v2.html` (Atlas),
   `rhythm-class.html` (class page), the ruled Choose flow, §6b single-row icon chrome on
   every shell in the set. Extract the authored copy maps (TAGLINES, ENGINES, GROUNDING,
   MICRO in `card-study-2.js`) into one shared `authored-copy.js` module all pages import —
   the future site slice ports that one file. Keep exports back-compatible
   (`window.COA_CARD2` consumers: choose/profile/door studies).

## DATA RULES — the thing the user is worried about

- **Structural data is safe:** `explorer-data.js` (v2 roster: specs, roles, ranges,
  families) drives all layout work. Stable, shipped-site lineage.
- **The v3 claim corpus is only PARTLY landed.** Landed on the main repo
  (`work/quest-hint-prototype`, commit `69b6e98`): Cultist, Tinker, Witch Hunter, Guardian,
  Knight of Xoroth — final. The 16-class corpus (386 claims) is UNLANDED in
  `C:\Users\17274\Worktrees\coa-picker-16class` — candidate only, audit in progress, three
  spec dimensions quarantined (artificer fit; riftblade fit+role; moon-priest role).
- **Therefore this session authors NOTHING from claims.** No seals, no verbs, no strips,
  no engine paragraphs. Layout and gap states only. Per-class seal/strip rounds start
  AFTER this session, with the landed pilot five; the 16 wait for their corpus to land.
- Existing card copy for the 16 already carries a re-verify-on-landing flag — leave it.

## READ FIRST, IN ORDER

1. This file.
2. `class-page-grammar.md` — the full contract; §6b chrome, §9 checklist, session log.
3. `atlas-page-grammar.md` §4 (the closed card) and the 2026-08-10 log entries.
4. `choose-page-grammar.md` (ruled flow; the phone-quality standing practice at the end).
5. Deployed pages: `rhythm-class.html?c=cultist` (the proven end state), `?c=barbarian`
   (the unadopted state), `atlas-v2.html`, `choose-study-4.html`.

## RULES THAT BIND

- One piece per round, 2–3 real-render directions, user picks, record in the grammar.
  ASCII previews were rejected once already — "you gotta actually show me."
- Tone bar §8; absent-never-invented; no rankings in any visual form.
- Before any deploy: screenshot changed pages in the 390px iframe harness (bare
  `--window-size=390` lies; `/mnt/c` writes reach WSL late — wait, don't rerun).

## WHERE

- Repo `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups` (WSL `/mnt/c/...`).
- Commit `-c user.name=blakedonn -c user.email=bdonne39@gmail.com`; stage files EXPLICITLY
  (CRLF-flipped tree); push `"/mnt/c/Program Files/Git/cmd/git.exe" -C '<repo>' push origin main`.
- Cache-bust every touched script/css ref (`?v=N`). Deployed at
  https://blakedonn.github.io/coa-class-mockups/
- `GODOT LAUNCH: no-godot`.

## KICKOFF (paste into the design session)

Read `design-adoption-session-handoff.md` in
`C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups` and run the design-adoption
dialogue it describes, starting with the empty-seal-slot round.
