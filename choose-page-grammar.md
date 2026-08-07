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
| Card language | Round 1 study built (`choose-study.html`): today's card beside **A identity result** (crest + class name + tagline + matched spec as a ruled glowing door), **B spec door card** (slim, spec-first), **C full Atlas card with match band**. Same live-scored trio in all three; persona stones + shipped adjust chips re-score everything | OPEN (round 1 ask) |
| Tier badges | Strong / Plausible / Wildcard badges kept in all directions | PROPOSED (shared) |
| Strong-match glow | The ruled lightened-class-color formula (`color-mix(class-color 58%, white 42%)`) marks the Strong match card | PROPOSED (shared) |
| Score voice | Matched / Trade-off / Confidence lines kept verbatim in all directions — the honest voice is not the piece under study | PROPOSED (keep) |
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
| Register | Slim quick-look vs port the class page into it vs remove — undecided by design; mock the registers and let the picks decide | OPEN (own round) |

## 5 · Session log

- **2026-08-07 (session 5 open, round 1 built):** read-first list completed (both grammar
  contracts, roadmap, deployed atlas-v2 + rhythm-class, choose.html/js + profile-render.js
  source). Round 1 study built and deployed: the result card in three directions, rendered by
  the real scoring engine — five persona presets, live adjust chips, node smoke test covers
  81 render paths (every direction × every persona pick × all 21 classes through direction C).
  `card-study-2.js` now exports MICRO + roleImgs for reuse (cache refs bumped to v=12).
  Awaiting the round-1 pick: A / B / C.
