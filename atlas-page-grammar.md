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
| Workbench button (phone) | The topbar ⚖ button drops below 560px — the bottom tray already appears the moment a spec is benched. Desktop keeps it | RULED (2026-08-07) |
| Desktop chrome | Labeled tab row unchanged | RULED (keep) |

## 2 · Masthead & the altitude fork

| Piece | Decision | Status |
|---|---|---|
| Fork presentation | A standing Classes ↔ Specs toggle, always visible in the list bar. No doors, no gate. User's words: "always show the toggle between class and specs in the list" (the direction the study labeled C; recorded by description — the user's letter said "b") | RULED (2026-08-07 round 1) |
| Default altitude | The toggle starts on **Classes** — 21 cards greet the visitor; specs are one tap away | RULED (2026-08-07) |
| Guide door | Points at Guided (pilot) — not live on the shipped site. The door ships only when Guided does, or lands in a disabled "soon" state | OPEN (flag) |
| Masthead copy | "The Atlas of Seventy Paths" + "An identity guide, not a tier list" kept — it already meets the tone bar (§8: stylized phrase introduces, plain language explains) | PROPOSED (keep) |

## 3 · Spec cards (the 70)

| Piece | Decision | Status |
|---|---|---|
| Clamp divergence | RECORDED DIVERGENCE: cards clamp generated text until the pilot's authoring pass replaces it with authored-to-fit copy. Known defect under §8, accepted temporarily | RULED (2026-08-07) |
| Pips tooltips | The class page's ruled `tips` treatment (tooltip: "<axis> — <value>" + the researched why) extends to Atlas card pips NOW — demoed in `atlas-v2.html` | RULED (2026-08-07) |
| Everything else | Family sections, filters, workbench, evidence tags unchanged — "what we have is solid" | RULED (keep, user framing) |

## 4 · The Class Atlas (the 21) — new surface

| Piece | Decision | Status |
|---|---|---|
| Card form | **B identity card** as the base. Constellation shapes on cards set aside unless the map question revives them | RULED (2026-08-07 round 1) |
| Kick line | "Class · N specializations" DROPPED — the doors carry the count | RULED (2026-08-07 round 4) |
| Tagline slot | Authored-only tagline on the card, ruled styled-keyword glow; unauthored classes omit the line — absent, never invented. ×21 COMPLETE (2026-08-10): all 21 authored; the 16 new ones await the user's verbiage read (draft flag) | RULED (2026-08-07 round 4; ×21 filled 2026-08-10) |
| Family row | DROPPED from the card ("no jargon thing"). Families still live in profiles and the starmap | RULED (2026-08-07 round 4) |
| Role line | The standalone counts line is REPLACED: role info couples onto the spec doors (icon or color-coded). Treatment variant is round 5's pick | RULED direction (2026-08-07) / variant OPEN |
| Engine blurb | **E1**: one authored sentence with the class-colored engine label. ×21 COMPLETE (2026-08-10, blanket ruling): every class carries a corpus-grounded blurb with its citation in the drafts table. All citations final: the 16-class corpus landed on main the same day (`9fcbcd7`), byte-identical to the cited candidates — the re-verify flag is CLOSED | RULED (2026-08-07 round 5; ×21 filled 2026-08-10) |
| Role coupling | **R1 role icons**: ⚔ Damage · 🛡 Tank · ✚ Healer · ⚑ Support lead each spec door, tooltip names the role, range word at right | RULED (2026-08-07 round 5) |
| Composed card | Crest (name only) → tagline → engine blurb → ✦ facts → doors with role icons. User: "the first one is perfect… just great" | RULED (2026-08-07 round 5) |
| Draft taglines/engines | The four pilot drafts (Tinker, Witch Hunter, Guardian, Knight of Xoroth) are **approved as temporary copy** — user 2026-08-07: "good for now but just temporary; once we have full research we will revisit the actual verbiage." Revisit trigger: the research lands and the ×21 authoring pass runs. **2026-08-10 copy-verification:** three engine blurbs contradicted the landed v3 corpus and were replaced with user-ruled fixes (session log). Labels moved too: Witch Hunter "three fuels" → "Rage"; KoX "Rage" → "Demonfire". Taglines stay provisional; KoX "Damnation rides with you" KEPT with a name-collision flag (Damnation is a Witch Hunter Boltslinger ability) until the ×21 pass. **Later the same day** the ×21 pass ran under the user's blanket ruling — see the session-log entry above | RULED (provisional; engines re-ruled 2026-08-10; ×21 executed 2026-08-10) |
| Top-right corner | **V1 class-video thumb**: real thumbnail, play ring, "Class highlight" caption, opens the video. The ruled phone-masthead treatment, scaled to the card. All 21 classes have a video in the data | RULED (2026-08-07 round 6, "video thumb is dope") |
| Rare ✦ lines | The class-page rare-part pattern comes to the card: 1–2 terse ✦ fragments, every one tracing to a computable roster fact. No fact, no bullet | RULED pattern (2026-08-07, user ask) |
| Ordering | Alphabetical; no ordering that could read as rank | PROPOSED |
| Crest icon | **The official class crest, all 21 classes** (build-hub sprite `class-icons.v1.webp`; findings in `sol-class-icon-findings.md`). Ability icons stay as the recorded fallback. STANDING FLAG: the hub is fan-made, no license published — shipping the crests needs rights confirmation before the site slice | RULED (2026-08-07 round 7) / rights flag OPEN |
| Crest sub line | **S1, two-line form**: jobs on the first line (true-support rule), range always on its own fainter second line ("Damage · Tank · Healer" / "Melee & Ranged"). Applied to the ruled card renderer and the atlas-v2 assembly | RULED (2026-08-07 round 7 close) |
| Door role art | **The HD queue icons** — 64px frames of WoW's UI-LFG-ICON-ROLES via the canonical interface-art mirror, stored in `generated-assets/lfg-*.png`. Damage sword · Tank shield · Healer cross · Support **green flag** (same gold-rim style). The 16px client crown stays the recorded alternative | RULED (2026-08-07 round 8 close) |
| Door middle element | **M2 archetype tag** ("2H burst bruiser" · "mobile DoT caster"). AUTHORING RULE (user): tags describe **playstyle, not fantasy** — lore nouns and flavor adjectives out, mechanics words in; each tag still traces to the researched fantasy sentence. ×70 COMPLETE (2026-08-10, blanket ruling): all 70 specs tagged, max 28 chars (the phone-verified fit precedent; `.mid` clips overflow). Quarantine-flagged specs (artificer, riftblade, moon-priest) rest on surviving structural claims | RULED (2026-08-07 round 8 close; ×70 filled 2026-08-10) |
| THE CARD IS CLOSED | User verdict: "that kinda finishes the class cards, they look fantastic." Final composition: official crest · name · jobs line · range line · tagline (keyword glow) · engine blurb · ✦ computed facts · doors (queue icon + name + archetype tag + range) · video corner | RULED (2026-08-07) |
| True-support rule | Class-level "Support" appears only when a spec supports WITHOUT healing (user 2026-08-07: "wouldn't every healer be quantified as support?"). Five classes qualify: Barbarian, Stormbringer, Guardian, Ranger, Sun Cleric. Spec-level role data is untouched — doors still show a Healer+Support spec's ⚑, and the taxonomy stays research-derived | RULED (principle) |
| True-support ripples | RESOLVED: user ruled strict everywhere (2026-08-09, session 6 round 2). The class-page role line and the computed ✦ jobs facts now count under the rule; four-jobs classes drop 4 → 1 (Sun Cleric), the others fall back to the playstyles fact. Record in `class-page-grammar.md` §1 + session log | RULED (2026-08-09) |

## 5 · The identity map

| Piece | Decision | Status |
|---|---|---|
| Form (interim) | **The family starmap is the interim identity map** (`starmap.html`): eight constellations from the site's own taxonomy, class-emphasis crest strip, tap-through to profiles. Structural and editorial data only — nothing drafted | RULED (2026-08-07 round 3) |
| Form (target) | The game-language map (G1 hexagon + M2 style field, damage/sustain/control axes) is **DEFERRED, not dead**. User: "probably a data limitation — some DPS have more sustain than others and we can't plot that yet." Trigger to revisit: the five-class pilot lands and shows per-spec style evidence meets the bar. `map-study-3.html` and its printed draft rules stay as the spec for what that research must fill | RULED (deferred, 2026-08-07) |
| Game-axis evidence | RE-MEASURED 2026-08-10 against the full v3 corpus (21 classes, 386 claims, unlanded 16-class worktree): specs with ANY axis signal — Sustain 10/70, Mobility 17/70, Control 17/70, Burst 9/70, Tankiness 16/70, PvP 9/70. The picker-shaped corpus cannot fill a per-spec six-axis map; the credible path is a kit-derivation pass (axis values from ability facts, claims as corroboration), a research-lane decision. Old v2 numbers superseded | RULED (flag, load-bearing; numbers refreshed) |
| Shape language (units) | Deferred with the axes. The demand hexagon stays available in profiles as shipped; no shape ships on cards or map until the axis question resolves | RULED (deferred) |
| Starmap placement | Where the starmap lives in Atlas nav (toggle third state, masthead link, or section) | OPEN |
| Starmap phone | Interim = horizontal pan. An authored phone redraw (S2 pattern) is its own piece | OPEN |
| Axes | The six researched demand axes, fixed spoke order everywhere (core actions top; clockwise: execution, tracking, reactive, failure cost, setup). Sequencing joins as a seventh spoke with research v3 | PROPOSED |
| Gaps | An unresearched value renders as a hollow marker on a dashed spoke — never as zero. "Unknown is not zero" (user ruling 2026-08-07) | PROPOSED (law-derived) |
| Color | Measured, not eyeballed: the 21 class colors are not mutually separable (Ranger ↔ Witch Hunter ΔE 0.3; 4 of 21 read gray-adjacent on the dark surface). Color follows the class but never carries identity alone — glyphs, name labels, and emphasis interaction do the separating | PROPOSED (evidence-backed) |
| Context | One filter row above all maps (Boss / Dungeon AoE / PvP). Leveling contexts stay out of the map's first read | PROPOSED |
| Rankings | No rankings or popularity in any visual form; the axes are demand, never quality. Every map ships with its one-line reading saying so | RULED (pre-existing product law) |

## 6 · Evidence & honesty (page-wide)

- Tier system (Data / Players / Inference) untouched; the map header carries the tier note and
  "relative among researched CoA specs". RULED (keep).
- Comparative or rare claims trace to computable facts (rare-part precedent). RULED (pattern).

## 7 · Open decisions queue (post-session-4 state)

1. **Star-map placement** — the masthead ghost button in `atlas-v2.html` is a live proposal.
2. **Starmap phone redraw** — interim is a horizontal pan; an authored S2-style redraw is open.
3. ~~True-support propagation~~ — RESOLVED 2026-08-09 (session 6 round 2): strict everywhere
   (§4 ripples row).
4. **Crest rights confirmation** — before the site slice only.
5. **Spec-profile modal** — slim vs port-class-page vs remove; session 5's job
   (`choose-profile-design-handoff.md`).
6. Class-card ordering: alphabetical stands as PROPOSED; confirm when convenient.

## 8 · Session log

- **2026-08-10 (correction: the 16-class corpus IS landed):** the user caught a stale claim.
  The full corpus landed on the main repo's `main` branch at 10:15 (`9fcbcd7` "land 16-class
  scale-up"); the copy session had checked its own behind branch and the session handoff's
  caveat, and wrongly reported it unlanded. Verified now: the landed files are byte-identical
  to the candidates the ×21 pass cited — every grounding is final and the standing re-verify
  flag is CLOSED. The six quarantined dimensions landed recorded and still bind. Ripple: the
  per-class seal/strip rounds may cover all 21 classes on final data; the design-adoption
  handoff's data rules were rewritten accordingly.
- **2026-08-10 (tagline quality pass, deferred):** all 20 non-Chrono lines reviewed for the
  register defect (modern wordplay breaking fantasy voice). Five flagged with recorded
  alternatives, PROPOSED and NOT adopted — user: "those taglines are alright, we may do
  another pass but that's good for now." The shelf for that later pass:
  Barbarian "The ancestors are watching. Give them a show." · Felsworn "The demon is not a
  metaphor." · Ranger "The kill was decided three steps ago." · Runemaster "First you write
  it. Then it hits." · Witch Doctor "The best curses are homemade."
- **2026-08-10 (Chronomancer tagline re-ruled):** the user (a level-60 Chrono main) rejected
  "Undo is a class ability" as the weakest of the 21. Replacement RULED from three options:
  **"Reality is a rough draft."** (keyword "draft") — grounded in Melt Reality and the
  Timewalking/Rewind revision loop. A register note recorded: modern-UI wordplay reads flat;
  the tagline quality pass reviews the other 20 for the same defect.
- **2026-08-10 (copy-verification session, the ×21 + ×70 authoring executed):** after the five
  opening rulings landed, the user issued a BLANKET RULING (verbatim): "you don't need my
  approval go ahead and just implement all 21 classes based on our research data." Under it:
  (1) **Ruling 6 applied** — the Tinker Atlas blurb "Every Tinker runs on Scrap: gunfire in,
  machines out" was contradicted-by-absence (Scrap claims are Mechanics-only; Invention has
  zero) and replaced with the class-page lede "A Tinker's power stands on the field, not on
  the action bar" (Cultist precedent: Atlas blurb = class-page lede). Label → "temporary
  machines". (2) **×21 taglines + engine blurbs authored** — every blurb grounded in a quoted
  class-level corpus claim (GROUNDING map, rendered in the drafts table). Notable engines:
  Reaper's three-rung soul ladder, Stormbringer's Static overcharge (supercharge above 70,
  self-stun at 100), Sun Cleric's Dawn window, Bloodmage's health→Thirst→Rage chain.
  (3) **×70 archetype tags completed** — 59 new tags, playstyle-not-fantasy rule, capped at
  28 chars (the phone-verified fit precedent). (4) **Provenance:** the pilot five cite the
  LANDED corpus; the 16 new classes cite the CANDIDATE corpus (unlanded 16-class worktree,
  audit in progress) — STANDING FLAG: re-verify the 16 when the corpus lands. Quarantined
  dimensions avoided: chronomancer/artificer (fit), runemaster/riftblade (fit + role/range),
  starcaller/moon-priest (role/range) — their copy rests on surviving structural claims and
  the site roster. Tagline keyword-collision checks run (the Damnation precedent); Sun
  Cleric's "Dawn" keyword is its own engine term and noted against Witch Hunter's Dawn Blade.
  Mechanical checks: 21/21/21 tagline-engine-grounding coverage, 70/70 tags, all ids
  roster-valid, all tags ≤28 chars, all keywords present in their taglines.
- **2026-08-10 (copy-verification session, engine blurbs ruled):** the five-class verification
  round (run in session 5 against the LANDED five-class v3 corpus, 106 claims) went to the user
  for line-by-line rulings. Three contradicted engine blurbs replaced, all accepted as proposed:
  1. **Witch Hunter** — old "Each spec burns its own fuel: Rage, Shadow Brands, or Stamina" ✕.
     Corpus: "Regenerative Elixirs makes Tonics restore Rage" (class-wide); parries "restore
     missing health and Rage" (Black Knight); Boltslinger "generates Rage"; a player report has
     Inquisition Rage generation; Stamina appears in zero claims. New: "Every Hunter runs on
     Rage; each spec layers its own marks and stacks on top." Label → "The engine — Rage".
  2. **Guardian** — old "No resource bar. Formations and timing are the engine" ✕. Corpus:
     Raise Shield "blocks restore Energy", "Reprisal restores Energy after a block";
     "Motivating Strike grants Motivation, which some Guardian abilities consume"; Glory
     (Gladiator), Tempo (Inspiration), Paragon (Vanguard) stack per spec. New: "Formations set
     the stance; Energy, Motivation, and per-spec stacks do the work." Label unchanged.
  3. **Knight of Xoroth** — old "Every Knight runs on Rage, fed by demons and wounds" ✕.
     Corpus: Demonfire is generated in all three specs (Shieldgore, Seeking Flame, Gore);
     "The class tree connects Demon's Blood to Rage" — Rage and Demon's Blood are side layers;
     "a class node makes melee Physical damage generate Demon's Blood". New: "Every Knight runs
     on Demonfire, fed by demons and blood." Label → "The engine — Demonfire".
  Two judgment calls ruled KEEP: (4) KoX tagline "Damnation rides with you" stands until the
  ×21 pass, flagged — Damnation is a Witch Hunter ability ("Damnation converts Rage into
  damage", Boltslinger); (5) Godblade "cashing the full bar" stands on its v2 kit grounding —
  no v3 evidence either way. Copy landed in `card-study-2.js` (ENGINES + GROUNDING). star-map placement variants deployed on the
  reference assembly (`atlas-v2.html?sm=ghost|lens|band`): masthead ghost button (the live
  proposal) · lens third state on the Classes/Specs toggle · section-door band after the
  card grids. Build note: the variant body class collided with the band's own `.sm-band`
  class and flexed the whole body; namespaced to `smv-*`. Awaiting the pick (§5 placement
  row, §7 queue 1). Earlier same session: §4 true-support ripples RESOLVED (strict
  everywhere, round 2).

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
- **2026-08-07 (round 2 verdict → round 3):** user: shape yes, but in game language (damage /
  sustain / control); wall no — wants one plotted map of all 70. Round 3 built (`map-study-3.html`):
  three shape vocabularies (game hexagon with live-derived draft values quoting their researched
  evidence sentence; roles-only diamond; demand control) and three single-canvas maps (role compass,
  style field, family starmap). Evidence coverage measured and disclosed on the page; hollow = no
  evidence, never zero. Awaiting picks: G1/G2/G3 and M1/M2/M3.
- **2026-08-07 (round 3 verdict, map closed for now):** user read the coverage numbers as the data
  limitation they are and ruled: DEFER the game-language map until the pilot's research shows the
  axes can be filled; SHIP the family starmap as the interim. `starmap.html` built and deployed
  (emphasis strip, profiles, structural data only). Research ask recorded on the roadmap. Next
  piece: the identity-card granular round.
- **2026-08-07 (rounds 7–8, the card FINISHED):** crest = official sprite (Sol hunt); sub lines =
  jobs + range two-line form with the true-support rule; doors = HD queue icons (Damage sword,
  Tank shield, Healer cross, Support flag) + playstyle archetype tags extracted from researched
  fantasy text (11 drafted, ×70 compression pass queued). User verdict: "they look fantastic."
  All rulings propagated into `atlas-v2.html`.
- **2026-08-07 (rounds 4–6, the card, closed):** piece-by-piece rounds ruled the full card: no kick,
  authored tagline (keyword glow), no family row, E1 engine blurb, ✦ computed facts, R1 icon doors,
  V1 video corner. Pilot-five taglines/engines approved as TEMPORARY copy (revisit after research).
  Four standing calls closed: classes-first toggle, no phone ⚖, clamp recorded as divergence, pip
  tooltips extended to spec cards. **Reference assembly built: `atlas-v2.html`** — the Atlas as
  ruled, both altitudes, live data. Remaining OPEN: star-map placement (masthead ghost shown as a
  proposal), starmap phone redraw, the ×21 authoring (blocked on pilot).
