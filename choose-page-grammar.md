# CoA Choose page — grammar contract (working draft)

Running record of the Choose + spec-profile design dialogue (session 5).
Same format and authority rules as `atlas-page-grammar.md` and `class-page-grammar.md`.

- **Status labels:** `RULED` = user picked it. `PROPOSED` = advisor recommendation awaiting a
  ruling. `OPEN` = not yet discussed to a decision.
- Provenance: detached design session 2026-08-07 (session 5, Fable xhigh, user-launched).
  Brief: `choose-profile-design-handoff.md`. Study pages: `choose-study.html` (round 1).
  The shipped `choose.html` / `choose.js` are untouched; scoring is user-ruled and
  Sol-approved (2026-08-06) and is NOT in scope — this dialogue is visual language and copy.

---

## 0 · What ships today (survey, round 0)

- **Flow:** six questions (opening vignette scored never, role, range, payoff shape, load,
  mistake cost) → three ranked class results (best spec per class) → live adjust chips.
- **Scoring (out of scope):** distance matching on researched demand axes, Boss context only,
  no percentages, tiers Strong / Plausible / Wildcard, evidence moves confidence never rank.
- **Pieces found for this dialogue:** the result card · the question card + vignette ·
  the adjust chips · entry masthead/foot copy · the spec-profile modal (job 2).

## 1 · The result card

| Piece | Decision | Status |
|---|---|---|
| Two registers | The result card follows what is being recommended. User (2026-08-07, near-verbatim): "once we have more data I think we will do a class and spec questionnaire, so depending on if the class or spec is recommended we should do A or C; if it's class we should also be like 'you will probably like X spec' so we highlight that." Direction B set aside by the same call | RULED (2026-08-07 round 1) |
| Probable-spec line | A class result always names its probable spec ("You will probably like X") and lights that spec's door | RULED (2026-08-07, user's words) |
| A↔C mapping | **M2**: class result = the full Atlas card (C) with the probable-spec band and glowing door; spec result = the compact identity card (A). User 2026-08-07: "looks good m2". Study defaults mirror it | RULED (2026-08-07 round 1b) |
| Register sequencing | Today's engine recommends classes (best spec per class), so the class register ships first; the spec questionnaire waits on the pilot's data | RULED (plan) |
| Tier badges | Strong / Plausible / Wildcard badges kept in all forms | PROPOSED (shared) |
| Strong-match glow | The ruled lightened-class-color formula (`color-mix(class-color 58%, white 42%)`) marks the Strong match card | PROPOSED (shared) |
| Score voice | Matched / Trade-off / Confidence lines kept verbatim in all forms — the honest voice is not the piece under study | PROPOSED (keep) |
| Absent copy | No tagline or archetype tag renders where none is authored — absent, never invented (default persona surfaces Pyromancer to show the gap) | law-derived |

## 2 · The question surface

| Piece | Decision | Status |
|---|---|---|
| Question card, vignette, choices | Not yet discussed | OPEN (own round) |

## 3 · Adjust chips & entry

| Piece | Decision | Status |
|---|---|---|
| Adjust chips | Not yet discussed | OPEN |
| Entry masthead / foot copy | Not yet discussed | OPEN |

## 4 · The spec-profile modal (job 2)

| Piece | Decision | Status |
|---|---|---|
| Register | **P1 slim quick-look**: one screen — identity, archetype tag, demand pips, ✓/✕, defining talents. The mini-class-page modal retires; the nine folds live on the class page only. User 2026-08-07: "p1" | RULED (2026-08-07 round 2) |
| Class-page emphasis | The modal must sell the full class page, not just link it. User (2026-08-07, near-verbatim): "make sure we emphasize the full class page, cause that's where the magic is at." The small footer link is replaced by an emphasized exit | RULED (2026-08-07, user's words) |
| Exit treatment | Which emphasis form: **X1 crest door** (bottom, class-colored portal bar with crest + tagline) · **X2 top strip** (emphasis before the scroll) · **X3 video portal** (bottom bar with the class-video thumb). Rendered side by side in `profile-study.html`; the live demo uses the exit stone | OPEN (round 2b ask) |
| Exit destination | Pilot classes demo the ruled study (`rhythm-class.html?c=<class>`); the rest link to today's `class.html` until the site slice + ×21 authoring land | note |

## 5 · Session log

- **2026-08-07 (session 5 open, round 1 built):** read-first list completed (both grammar
  contracts, roadmap, deployed atlas-v2 + rhythm-class, choose.html/js + profile-render.js
  source). Round 1 study built and deployed: the result card in three directions, rendered by
  the real scoring engine — five persona presets, live adjust chips, node smoke test covers
  81 render paths (every direction × every persona pick × all 21 classes through direction C).
  `card-study-2.js` now exports MICRO + roleImgs for reuse (cache refs bumped to v=12).
- **2026-08-07 (round 1 verdict → round 1b):** user reframed instead of picking: two future
  questionnaires (class + spec), the register follows the recommendation altitude, class results
  name their probable spec. B set aside. Recorded in §1. Process note: the mapping question was
  first asked with ASCII previews and the user rejected that — "you gotta actually show me."
  Round 1b built and deployed: `choose-study-2.html` renders both registers in both forms on
  live scores (spec register demoed via the same engine un-deduped; the Calm commander persona
  visibly shows two Barbarian specs where the class register dedupes). Smoke test: 60 paths.
  Awaiting the round-1b pick: M1 (class→A, spec→C) or M2 (class→C, spec→A).
- **2026-08-07 (round 1b verdict → round 2):** user: "looks good m2" — mapping RULED (§1), study
  defaults flipped to M2. Round 2 built and deployed: the spec-profile modal registers
  (`profile-study.html`) — Today / P1 slim / P2 class-page-in-modal / P0 remove, with a live
  door demo on two ruled cards and Godblade side by side in every register. Slim renderer
  smoke-tested across all 70 specs. Awaiting the round-2 pick.
- **2026-08-07 (round 2 verdict → round 2b):** user: "p1 but make sure we emphasize the full
  class page, cause that's where the magic is at" — register RULED P1, emphasis RULED (§4).
  Round 2b built and deployed: three exit treatments (X1 crest door, X2 top strip, X3 video
  portal) side by side on Godblade; the door demo's exit stone drives the live modal. Pilot
  classes exit to the ruled study; the rest to today's page. Smoke test: 70 specs × 3 exits.
  Awaiting the round-2b pick.
