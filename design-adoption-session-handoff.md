# Handoff: the design-adoption session (all 21 classes onto the ruled system)

## ⚠ STATE SYNC 2026-08-10 (read this first — the plan below is superseded)

The adoption happened, faster and elsewhere. The user ended the mockup-round cadence
("I just want our live site to be what's getting updated") and authorized a direct build.
What is now TRUE:

- **The ruled system is LIVE** at https://blakedonn.github.io/coa_classes/ for all 21
  classes. Source of truth: main repo `reports/coa-specs/site/` on
  `work/quest-hint-prototype`; deploy via `tools/deploy_coa_site.py`.
- **Round 1 (G2 crest seat): ruled and shipped** — with the GLYPH/ability-icon fallback,
  crests skipped pending rights. **Round 2 (masthead text): ruled `eng` and shipped** —
  authored tagline + engine blurb replace the premise on all 19. **Consolidation: done** —
  `authored-copy.js` exists in the site source; the site imports it. The Anatomy branch is
  merged (`c8dbdf7`). Class cards and spec cards now carry real icon art; the slim modal
  chip reads "Class page" with class art; the phone modal header gives the × its own row.
- The mockups repo is a reference lab. Nothing further lands there.

**THIS SESSION'S REMAINING JOBS, on the live site source:**
1. **The 21-class breadth pass.** Every `class.html?c=<class>` clean at 1280 AND 390 (the
   390px iframe-harness rule binds; bare small windows lie). The ship build verified
   cultist, tinker, reaper, and the shared surfaces — the other 18 classes need eyes.
   Hunt: 3-vs-4-spec rails, long names, tagline overflow, interim engine blocks, seat
   layout, phone sheet. Fix in the site source, deploy through the script, record fixes
   in `class-page-grammar.md`.
2. **Adopt the new data findings into the designs** (user ask): the addendum in
   `style-axes-research-brief.md` lists them — validate every spec's playstyle family
   against the landed corpus; audit all 21 engine blurbs for wrong-weighted engines
   (Chronomancer is the proven case: Timewalking is shared utility, the spec loops run on
   DoT ramps / Echo Fragments / Aeons); respect the six quarantined dimensions. Copy fixes
   route through the copy lane's citation-first process.
3. **Out of scope, unchanged:** seals and rhythm strips (the dedicated per-class authoring
   pass), crests (rights), the identity map.

The original brief below stays for context only.

---

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

## DATA RULES

- **Structural data is safe:** `explorer-data.js` (v2 roster: specs, roles, ranges,
  families) drives all layout work. Stable, shipped-site lineage.
- **The FULL v3 corpus is landed.** All 21 classes, 386 claims, on the main repo's `main`
  branch — commit `9fcbcd7` "land 16-class scale-up", 2026-08-10 10:15. Verified
  byte-identical to the candidate files the ×21 card copy cited, so that copy's grounding
  is final. (An earlier draft of this handoff called the 16 unlanded — corrected same day.)
- **Six dimensions landed QUARANTINED and still bind:** artificer fit · inspiration fit ·
  defiance fit · war rhythm · riftblade fit+role · moon-priest role. Nothing may rest on a
  quarantined dimension; everything else in a landed claims array is fair evidence.
- **This session still authors NOTHING from claims.** Layout, gap states, and
  consolidation only. The per-class seal/strip rounds that follow can now cover all 21
  classes on final data — no pilot-five-first restriction remains.

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
