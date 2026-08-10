# Handoff: the copy-verification session (all 21 classes)

- **Session type:** user-launched detached Fable design/copy dialogue, effort xhigh,
  advisor/sponsor rules. Reading and ruling work — ideal for phone. Nothing touches the main
  repo; verdicts and copy edits land in this mockups repo's grammar files and study copy.
- **Date written:** 2026-08-10, spun out of session 5 when the 16-class corpus arrived.
- **User ruling that created this session:** the copy pass "is big enough to warrant its own
  session and now all 21 classes are done."

## THE JOB

Verify every authored and drafted sentence on the design surfaces against the v3 research
corpus, class by class, all 21. For each line: quote the supporting claim, or propose a fix,
or record honest absence. The user rules line by line; record rulings with quotes in the
grammar files and update the draft copy in the study JS files.

## OPENING STATE — the five-class round is already run (session 5, 2026-08-10)

> **RESOLVED 2026-08-10:** all five awaiting items below were ruled. Fixes 1–3 accepted as
> proposed; items 4–5 kept. Records with quotes: `atlas-page-grammar.md` §8 (engine blurbs)
> and `class-page-grammar.md` session log (confirmations + Godblade). Copy landed in
> `card-study-2.js`. The session continues at "SCOPE FOR THE REMAINING 16 CLASSES".

CONFIRMED with citations (no action): the Cultist engine lede and 60/100 lines ("fuel your
kit" held — 3 of 4 specs evidence the mid-band; Heretic silent there), Heretic's Insanity
relation, the Convert gloss (near-verbatim: "Blade of Yogg-Saron turns Blade of the Empire
damage into healing for the lowest-health ally"), six of seven card blurbs, all ✓/✕ fragments,
"oil" and "batteries" (v2 kit data carries both words).

AWAITING USER RULING — three contradicted engine blurbs with proposed fixes:
1. Witch Hunter "Each spec burns its own fuel: Rage, Shadow Brands, or Stamina" → corpus:
   Rage is class-wide (Tonics and parries restore it); Stamina appears nowhere. Proposed:
   "Every Hunter runs on Rage; each spec layers its own marks and stacks on top."
2. Guardian "No resource bar. Formations and timing are the engine" → corpus: blocks restore
   Energy; Motivation is granted and consumed; Glory/Tempo/Paragon stack per spec. Proposed:
   "Formations set the stance; Energy, Motivation, and per-spec stacks do the work."
3. Knight of Xoroth "Every Knight runs on Rage, fed by demons and wounds" → corpus: Demonfire
   is the engine in all three specs; Rage and Demon's Blood are side layers. Proposed:
   "Every Knight runs on Demonfire, fed by demons and blood."

AWAITING USER RULING — two judgment calls:
4. KoX tagline "Damnation rides with you": Damnation is a Witch Hunter ability name in the
   data (Boltslinger). Keep until the ×21 authoring pass, or reword now.
5. Godblade blurb "cashing the full bar": no v3 evidence either way for Godblade at 100;
   the v2 grounding stands if kept.

> **EXECUTED 2026-08-10:** the user issued a blanket ruling ("you don't need my approval go
> ahead and just implement all 21 classes based on our research data"). Ruling 6 (Tinker
> blurb) applied; ×21 taglines + engine blurbs and ×70 archetype tags landed in
> `card-study-2.js` with citations. Remaining from the scope below: class-page engine
> PARAGRAPHS, spec-card blurbs + ✓/✕, and verbs/glosses for the 16 — they pair with the
> per-class seal/strip visual authoring. Records: `atlas-page-grammar.md` §8.

## SCOPE FOR THE REMAINING 16 CLASSES

Surfaces with copy to verify or author: engine paragraphs and taglines (only the pilot five
exist — the ×16 authoring can begin HERE, written against citations from the start), archetype
tags (11 of 70 drafted; the ×70 compression pass), spec-card blurbs and ✓/✕ fragments, verbs +
glosses. Grammar rules bind: authored to fit, no invention, stylized phrase introduces and
plain language explains (class-page grammar §8), tags describe playstyle not fantasy.

## THE CORPUS — WHERE AND ITS CAVEAT

- Landed (5 classes, 106 claims): main repo
  `reports/coa-specs/research-v3/candidates/<class>.json` on `work/quest-hint-prototype`.
- Full 21 classes, 386 claims, 91 picker targets: worktree
  `C:\Users\17274\Worktrees\coa-picker-16class\reports\coa-specs\research-v3\candidates\` —
  **unlanded working tree in final audit, READ-ONLY, another session's lane.** Confirm whether
  it has landed before treating claims as final; six targets currently carry quarantined
  dimensions (audit in progress).
- Claim shape: `{claim_kind: mechanic|player_experience, target, text, state.sources,
  limitations}`. Quote `text` verbatim in verdict tables.

## MEASURED DATA LIMITATIONS (2026-08-10, full corpus) — context for "should we research more"

Specs with any signal, of 70: PvP 9 · Burst 9 · Sustain 10 · Tankiness 16 · Mobility 17 ·
Control 17 · Utility 23 · Leveling 33. The corpus is picker-shaped; it cannot fill the six-axis
map or a PvP fold. The credible map path is a kit-derivation pass (axis values from ability
facts, claims as corroboration) — a research-lane decision, not this session's.

## READ FIRST, IN ORDER

1. This file, then `class-page-grammar.md` §8 (writing rules) and §2 (verbs/glosses).
2. `atlas-page-grammar.md` §4 (card copy rows: taglines, engine blurbs, archetype tags).
3. `choose-page-grammar.md` (session-5 rulings; the copy voice rows).
4. Draft copy under test: `card-study-2.js` (TAGLINES/ENGINES/MICRO), `rhythm-study.js`
   (AUTHORED blurbs + ✓/✕, verbs/glosses).
5. The corpus files above.

## WHERE (verified sessions 5)

- Mockups repo `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`
  (WSL: `/mnt/c/...`). Commit `-c user.name=blakedonn -c user.email=bdonne39@gmail.com`;
  push `"/mnt/c/Program Files/Git/cmd/git.exe" -C '<repo>' push origin main`.
- LANDMINES: stage files explicitly (CRLF-flipped tree); cache-bust with `?v=N`; verify every
  deployed page on real pixels (headless-Chrome harness; phone = 390px iframe; `/mnt/c` writes
  appear late to WSL — wait, don't rerun).
- `GODOT LAUNCH: no-godot`.

## KICKOFF (paste into the fresh session)

Read `copy-verification-session-handoff.md` in `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`
and run the copy-verification dialogue it describes, starting with the opening-state rulings.
