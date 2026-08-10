# Handoff: the seal & strip authoring pass (design session, fresh)

- **Session type:** user-launched detached Fable design dialogue (high/xhigh). The render
  target is the LIVE SITE — every authored class deploys as it lands. No mockup pages.
- **Date written:** 2026-08-10, at the close of the adoption/ship session.

## STATE YOU INHERIT

- The ruled design system is LIVE for all 21 classes:
  https://blakedonn.github.io/coa_classes/ — source `reports/coa-specs/site/` (main repo,
  branch `work/quest-hint-prototype`), deploy `python3 tools/deploy_coa_site.py "msg"`.
- Cultist and Tinker are fully authored (seals, verbs, three strips between them). The
  other 19 show the honest interim: crest seat ("Seal not yet drawn"), authored tagline +
  engine blurb, dashed strip gaps.
- **The process is written:** `seal-strip-authoring-playbook.md` (this directory) — the
  per-class unit, binding rules, entry gates, verification. Follow it as written; its
  cadence row is PROPOSED and needs the user's confirm in round 1.

## ENTRY GATES AND WHO PASSES THEM TODAY

A class enters when (1) its engine identity is audited and (2) its tension numbers exist.

- **READY NOW: Witch Hunter (Rage), Guardian (formations + Energy/Motivation/stacks),
  Knight of Xoroth (Demonfire).** All three engines were audited against the corpus with
  citations on 2026-08-10 (copy round; recorded in the grammar files and
  `card-study-2.js` GROUNDING).
- **NOT ready: Chronomancer** — its engine blurb is wrongly weighted (Timewalking is
  shared utility; loops run on DoT ramps / Echo Fragments / Aeons) and awaits
  re-derivation. The other 15 await the engine audit riding the adoption session.
- Tension numbers: hand-mine `reports/coa-specs/research-v3/digests/<class>.json` (full
  formulas) until the research lane's kit-derivation output lands.
- **DATA LANDMINE:** the 16-class claim files live on the main repo's `main` branch
  (`9fcbcd7`), NOT on `work/quest-hint-prototype` — read them via
  `git show main:reports/coa-specs/research-v3/candidates/<class>.json`. The pilot five
  are on both. Six quarantined dimensions bind (artificer/inspiration/defiance fit, war
  rhythm, riftblade fit+role, moon-priest role): nothing may rest on them.

## THE FIRST ROUND

Recommend opening with **Guardian or Knight of Xoroth** (audited, mechanically distinctive,
and their audited engine lines are fresh). One class per round: engine ¶ → seal → verbs +
glosses → strips (evidenced specs only) → phone variants → deploy → user verdict on the
live page. Record every ruling as grammar rows with the user's words.

## READ FIRST, IN ORDER

1. `seal-strip-authoring-playbook.md` — the procedure. Then this file's gates.
2. `class-page-grammar.md` §§1, 2, 4, 8, 9 + the 2026-08-10 log entries.
3. The live exemplar: https://blakedonn.github.io/coa_classes/class.html?c=cultist
   (and `?c=tinker`) next to an interim class (`?c=guardian`).
4. For the class in play: its digest, its claims (see the branch landmine), and its
   authored tagline/blurb in the site's `authored-copy.js`.

## PARALLEL LANES — stay out of them

- The adoption session: the 21-class breadth pass + the data-findings adoption
  (families, engine audit for the remaining classes). Its charter:
  `design-adoption-session-handoff.md` (STATE SYNC section).
- The copy lane owns wording rulings; engine-¶ drafts you author go to the user directly
  in-round (that IS the copy process for this pass).
- The research lane: kit derivation + fold verdicts (`style-axes-research-brief.md`).

## WHERE / PRACTICE (unchanged)

- Mockups repo = reference lab only. Commit site work in the main repo; stage explicitly.
- Verify every deploy at 1280 AND the 390px iframe harness (headless Chrome via
  `/mnt/c/Program Files/Google/Chrome/Application/chrome.exe`; fresh `--user-data-dir`
  per shot; `/mnt/c` writes reach WSL late — wait, don't rerun).
- Commit `-c user.name=blakedonn -c user.email=bdonne39@gmail.com`. `GODOT LAUNCH: no-godot`.

## KICKOFF (paste into the fresh session)

Read `seal-strip-session-handoff.md` in
`C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`, then run the seal & strip
authoring pass it describes: confirm the cadence, pick the first class from the ready set,
and author it end to end on the live site.
