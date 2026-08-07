# CoA Atlas page — grammar contract (working draft)

Running record of the Atlas design dialogue. One entry per page piece.
Same format and authority rules as `class-page-grammar.md`.

- **Status labels:** `RULED` = user picked it. `PROPOSED` = advisor recommendation awaiting a
  ruling. `OPEN` = not yet discussed to a decision.
- Provenance: detached design session 2026-08-07 (session 4, Fable xhigh, user-launched).
  Study page: `atlas-study.html` (this repo, deployed). The shipped Atlas files are untouched.

---

## 1 · Chrome (Atlas shell)

| Piece | Decision | Status |
|---|---|---|
| Phone top row | The ruled single-row icon chrome (class-page grammar §6b) extends to the Atlas shell: ⚜ glyph sigil, search, four icon buttons with always-visible tiny labels. Already ruled page-wide there; applied to the Atlas in the study demo | RULED (§6b) / not yet applied to `index.html` |
| Workbench button (phone) | The topbar ⚖ button drops below 560px — the bottom tray already appears the moment a spec is benched, so the button is redundant standing chrome. Desktop keeps it | PROPOSED |
| Desktop chrome | Labeled tab row unchanged | RULED (keep) |

## 2 · Masthead & the altitude fork

| Piece | Decision | Status |
|---|---|---|
| Fork presentation | A standing Classes ↔ Specs toggle, always visible in the list bar. No doors, no gate. User's words: "always show the toggle between class and specs in the list" (the direction the study labeled C; recorded by description — the user's letter said "b") | RULED (2026-08-07 round 1) |
| Default altitude | Which side the toggle starts on (classes vs specs). Not yet discussed | OPEN |
| Guide door | Points at Guided (pilot) — not live on the shipped site. The door ships only when Guided does, or lands in a disabled "soon" state | OPEN (flag) |
| Masthead copy | "The Atlas of Seventy Paths" + "An identity guide, not a tier list" kept — it already meets the tone bar (§8: stylized phrase introduces, plain language explains) | PROPOSED (keep) |

## 3 · Spec cards (the 70)

| Piece | Decision | Status |
|---|---|---|
| Clamp divergence | Cards clamp generated text (`clamp2` on the one-liner, 2-line clamp on the fantasy quote) — a defect under the authored-to-fit law (§8). Card-copy authoring at scale is FROZEN until the five-class pilot lands, so the advisor recommends recording this as a divergence now and clearing it in the pilot's authoring pass | PROPOSED |
| Pips tooltips | The class page's ruled `tips` treatment (tooltip: "<axis> — <value>" + the why) extends to Atlas card pips | OPEN (not mocked; cheap to add) |
| Everything else | Family sections, filters, workbench, evidence tags unchanged — "what we have is solid" | RULED (keep, user framing) |

## 4 · The Class Atlas (the 21) — new surface

| Piece | Decision | Status |
|---|---|---|
| Card form | **B identity card** (roles, families, spec doors). Constellation shapes on cards set aside unless the map round revives them. Piece-level detail (role line, family row, spec doors) gets its own granular round | RULED (2026-08-07 round 1) / pieces OPEN |
| Role line | Class rollup uses the ruled plain-text role-line treatment: "Damage ×2 · Tank · Healer · Support — Melee & Ranged", computed from roster facts | PROPOSED |
| Family names | Jargon carries its authored family tagline as a tooltip — same teaching pattern as the ruled verb glosses | PROPOSED (pattern reuse) |
| Ordering | Alphabetical; no ordering that could read as rank | PROPOSED |

## 5 · The identity map

| Piece | Decision | Status |
|---|---|---|
| Form | REOPENED after round 1. User reframe: the existing 1–5 pip system "was good"; the constellation shape "may be just as good — I'd have to see side by side". Round 2 (`map-study.html`) mocks the two pieces granularly: the **unit** (pip ladder vs shape vs fused) and the **wall** (pip matrix vs shape wall vs pip-card wall), same real specs in every direction. Round-1 field and muster directions set aside unless revived | OPEN (round 2 in flight) |
| Axes | The six researched demand axes, fixed spoke order everywhere (core actions top; clockwise: execution, tracking, reactive, failure cost, setup). Sequencing joins as a seventh spoke with research v3 | PROPOSED |
| Gaps | An unresearched value renders as a hollow marker on a dashed spoke — never as zero. "Unknown is not zero" (user ruling 2026-08-07) | PROPOSED (law-derived) |
| Color | Measured, not eyeballed: the 21 class colors are not mutually separable (Ranger ↔ Witch Hunter ΔE 0.3; 4 of 21 read gray-adjacent on the dark surface). Color follows the class but never carries identity alone — glyphs, name labels, and emphasis interaction do the separating | PROPOSED (evidence-backed) |
| Context | One filter row above all maps (Boss / Dungeon AoE / PvP). Leveling contexts stay out of the map's first read | PROPOSED |
| Rankings | No rankings or popularity in any visual form; the axes are demand, never quality. Every map ships with its one-line reading saying so | RULED (pre-existing product law) |

## 6 · Evidence & honesty (page-wide)

- Tier system (Data / Players / Inference) untouched; the map header carries the tier note and
  "relative among researched CoA specs". RULED (keep).
- Comparative or rare claims trace to computable facts (rare-part precedent). RULED (pattern).

## 7 · Open decisions queue

1. **Map round 2 picks:** the unit (pip ladder / shape / fused) and the wall
   (pip matrix / shape wall / pip-card wall) — `map-study.html`.
2. Toggle default altitude (classes vs specs first).
3. Identity-card pieces, granularly (round 3): role line, family row, spec doors, ordering.
4. Workbench button on phone (drop vs keep).
5. Card clamp: record divergence vs restructure now.
6. Pips tooltips on Atlas cards (extend the ruled `tips` treatment — already demoed on
   the map study's pip rows).

## 8 · Session log

- **2026-08-07 (session 4, Atlas, open):** read-first list completed (grammar contract, deployed
  study, Atlas source, data probe, sessions 2–3 artifact). Palette validator run on the 21 class
  colors against the dark surface (evidence in §5). Study page built with real roster data:
  `atlas-study.html` — chrome port, three fork directions, three class-card directions, three map
  directions; node smoke test covers every data path (70/70 specs place in all three contexts;
  worst field cell 42 specs packs inside its cell). All entries PROPOSED; awaiting user picks.
- **2026-08-07 (round 1 verdict + process correction):** user: "not loving this approach — not as
  granular as what worked on the class page." Process restored to the class-page cadence: one piece
  per round, 2–3 directions each, pick, record. Two rulings landed (standing Classes↔Specs toggle;
  identity card as the class-card base). The map REOPENED with the pip-system reframe; round 2 is
  `map-study.html` (unit + wall, side by side, same real specs).
