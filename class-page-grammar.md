# CoA class page — grammar contract (working draft)

Running record of the class-page redesign dialogue. One entry per page piece.
This is the checklist for repeating the design 21 times without drift.

- **Status labels:** `RULED` = user picked it in the design dialogue. `PROPOSED` = advisor
  recommendation awaiting a ruling. `OPEN` = not yet discussed to a decision.
- Provenance: advisor session 2026-08-06/07 (Fable-medium, detached). Rulings here are
  user decisions from that dialogue; this file is the file-backed record of them.
- Mockups live in `_previews/coa-class-diagram-mockups/`. Main study:
  `rhythm-class.html?c=<class>&p=<place>&v=<video>&e=<engine>&w=<verb>&k=<cards>`.
  Nothing has touched the repository.

---

## 1 · Masthead

| Piece | Decision | Status |
|---|---|---|
| Order | Name → tagline → engine paragraph → role chips; seal on the right | RULED |
| Tagline | Must fit ONE line at desktop width. Author or trim to fit | RULED (2026-08-07) |
| Engine paragraph | 2–4 plain sentences in the masthead column (`e=col`), class-colored left border, label "THE ENGINE — <resource/idea>" | RULED |
| Engine content | Names the resource, the loop, and the class tension. Generalizations across specs need research backing (flag: Heretic's Insanity relation unconfirmed) | RULED shape / OPEN copy per class |
| Role chips | Unchanged from shipped page | RULED (keep) |

## 2 · Seal (class diagram)

| Piece | Decision | Status |
|---|---|---|
| Mandatory slots | Engine name · ONE central mechanical tension · one verb per spec | RULED |
| Geometry | Unique per class; placement and interaction shared | RULED (pre-existing product ruling) |
| Expression level | "One-tension instrument" (option B): encodes the tension (e.g. 60 HOLD / 100 CROSS), not the full loop | RULED |
| Size | Fills masthead height, aspect preserved | RULED |
| ViewBox ratio | Author future seals near 420×260 (the col-slot ratio) so nothing letterboxes. Cultist redrawn to this in the study | PROPOSED as standing rule |
| Spacing rule | No node label may collide with another node; verify at authored ratio | RULED (from the Cultist overlap fix) |
| Interaction | Node click selects the spec card; selected node glows; selected card glows in the SAME tone | RULED |
| Glow tone | The active stroke is the LIGHTENED class color (seal uses #d3a3ef for Cultist). Card formula: `color-mix(class-color 58%, white 42%)` border + soft halo. Raw class color is wrong | RULED (2026-08-07 correction) |
| Verbs | One word per spec, its relation to the engine. Must not need the seal to parse: every verb ships with a plain gloss (tooltip) | RULED |
| Phone treatment | Full seal below the masthead text at full width, vertically tightened ~15% (420×224 arrangement: orbits 60/77, eye .66, node rows raised; nothing removed). The seal is the phone spec switcher — tap a node to select. NEVER fused with the spec card; band/rail/collapsed compactions considered and set aside (session-2 artifact). Fallback if still too tall in real use: a remembered collapsed row | RULED (2026-08-07 session 2) |

Current verb + gloss set (Cultist/Tinker):
- Spread — keep damage-over-time on every target; the engine is coverage.
- Endure — hold Insanity in a managed band and turn it into survival.
- Convert — turn melee aggression into healing for the group. *(gloss needs research confirm)*
- Cross — push Insanity to 100 on purpose and fight inside the dangerous payoff state.
- Detonate — stack explosives and machines, then fire them in one overlapping window.
- Restore — deploy healing machines where the group will need them.
- Overclock — push your machines and combat suit past their limits.

## 3 · Spec rail cards

| Piece | Decision | Status |
|---|---|---|
| Verb echo | Chip in top-right corner, class-colored, uppercase; tooltip = gloss | RULED (`chip`) |
| Selected state | Class-color glow matching the seal's active node | RULED |
| Card structure | `airfam`: name + verb chip / role line / family row (glyph + tooltip) / fantasy blurb / hairline / ✓ fragment / ✕ fragment | RULED (2026-08-07) |
| Fantasy blurb | Slightly verbose on purpose: one full sentence, ~90–105 chars, 2–3 lines. Authored to fit, never clamped | RULED |
| No truncation | Card copy is AUTHORED TO FIT, never clamped data text. ✓/✕ as short fragments (~40 chars); full sentences stay in the codex | RULED |
| Family tooltip | Family row carries the family's authored tagline as hover tooltip | RULED (via airfam) |
| Draft copy | The 7 authored blurbs + fragments in `rhythm-study.js` are ADVISOR DRAFTS, rephrased from researched text only. Need user approval before shipping | flag |
| Playstyle line | The roster families ARE the playstyle taxonomy ("Planners & Detonators" etc.); `style` variant surfaces them on cards | PROPOSED |
| Topology glyph | Tiny spike/wave/stack silhouette derived from the spec's authored strip. Only exists where a strip exists — no invented shapes | PROPOSED |
| Family tooltip | Family names are jargon; attach the family's authored tagline as tooltip (same treatment as verbs) | PROPOSED (flag raised) |
| Spec fantasy one-liner | If `style` wins, each spec needs an authored one-line fantasy (current quotes clamp mid-phrase) | PROPOSED (flag raised) |
| Phone treatment | The selected spec's airfam card renders standalone below the seal (quick-look register kept, own plate). The other specs live behind an "All 4 specializations" bottom sheet carrying the full cards; no swipe rail | RULED (2026-08-07 session 2) |

## 4 · Rhythm block (per spec, in codex)

| Piece | Decision | Status |
|---|---|---|
| Placement | FIRST FOLD: "The rhythm", open by default, above Endgame contexts. Final ruling after the codex-top compression (talents in header, video to masthead, two-column readings) made both options viable | RULED (2026-08-07 close) |
| Cadence strip | One authored "topology" per spec. No time axis, no rotation, no ability sequence. Calm styling: few labels | RULED |
| Strip labels | Phase labels in familiar WoW terms (BUILD / HOLD / BURST WINDOW / REBUILD); class flavor in sub-labels and window contents | RULED |
| Reading line | Every strip pairs with "**How to read it:** …" 1–2 plain sentences | RULED |
| Eyes line | "**Where your eyes live:** …" one plain sentence (form B2) | RULED |
| Screen card | Stylized HUD sketch behind an `👁 experimental` toggle, with warning: "Experimental, unreliable, untested … not the real UI" | RULED |
| Evidence labels | "names: Data · shape: Inference" on every strip | RULED |
| Gap state | Unauthored spec ⇒ dashed block: "Not drawn yet for this spec … we don't invent them" | RULED |
| Seal-strip continuity | Strip reuses the seal's tension vocabulary where true (hold/cross lines drawn in the Godblade strip) | RULED (pattern) |
| Phone treatment | S2: each strip gets an authored-to-fit phone redraw — same topology, fewer labels, full width, no scroll (Godblade pattern in the session-2 artifact). Vertical rotation tested and set aside: the level axis turns sideways, wave/stack topologies break, and it costs more height than S2 | RULED (2026-08-07 session 2) |

Authored strips so far: Godblade (spike), Corruption (wave), Demolition (stack).
Screen cards so far: same three, plus Invention config in the form study.

## 5 · Media area

| Piece | Decision | Status |
|---|---|---|
| Class video | Masthead chip: "▶ Class highlight" link beside the role chips, caveat as hover title. Nothing about it renders in the codex | RULED (2026-08-07, supersedes the mini row) |
| Rationale | Class-level content belongs at class level; it was repeated per spec and labeled weak by the page itself | — |
| Spec guide rows | Unchanged (verified guides with thumbnails) | RULED (keep) |
| No-spec-video row | Hidden; the search record lives in Evidence & gaps | RULED |
| Talent icons | Moved into the spec header: vertically centered right side, 46px, hover lift + gold border (they invite the click), tooltips intact. Caption dropped. Static row under 900px | RULED (2026-08-07) |
| Rhythm reading lines | Two-column row under the strip: "How to read it" left, "Where your eyes live" + experimental eye right. Stacks on phone | RULED (2026-08-07) |

## 6 · Pips, verdicts, folds (below the rhythm block)

| Piece | Decision | Status |
|---|---|---|
| Complexity pips | `tips`: all 7 axes stay, each with a hover tooltip. Tooltip title = "<axis> — <value>"; body = the reason for THAT value. Dotted underline signals it | RULED (2026-08-07) |
| Pips authoring rule | Each axis `why` must justify its specific value, not describe the axis. The generated boilerplate tail ("A durable target makes repeated precision matter.") is a data bug — strip it in the pipeline | RULED (rule) / OPEN (pipeline fix) |
| Codex top density | `ship` — keep the fantasy quote and feel line as shipped. The slim/tight compressions were rejected ("cooked too hard"); they remain in the study for reference only | RULED (2026-08-07) |
| No-spec-video row | Hidden entirely when no verified spec video exists. The honest search record lives in the Evidence & gaps fold instead of a standing row | RULED (2026-08-07) |
| Card ↔ codex blurb overlap | Card blurb is the teaser register; codex quote is the full statement. Keep both; make the registers diverge in the authoring pass so the echo softens | PROPOSED (advisor answer to user's redundancy question) |
| ✓/✕ verdicts | Unchanged; card ✓/✕ lines echo the same content | RULED (keep) |
| Folds | Nine-fold structure unchanged. No ruling sought yet | OPEN |

## 6b · Phone chrome (page-wide, below 560px)

| Piece | Decision | Status |
|---|---|---|
| Top row | Sigil + search only, one sticky 50px row. The tab row is removed entirely on phone | RULED (2026-08-07 session 2) |
| Nav | Slim (~50px) bottom deck: Atlas · Choose · Guided · Loot, glyph + label, auto-hides on downward scroll and returns on upward scroll | RULED (2026-08-07 session 2) |
| Why | One nav home in thumb reach; reading costs zero chrome; retires the shipped ~390px `nav.a-tabs` overflow recorded at the Anatomy visual gate | — |
| Scope note | The deck touches all five page shells including `loot.html`'s separate chrome; auto-hide needs real iOS momentum-scroll testing | flag |

## 7 · Evidence & honesty (page-wide)

- Tier system (Data / Players / Inference) untouched and load-bearing. RULED (keep).
- Anything persuasive gets a stronger honesty label, not a weaker one (screen card precedent).
- Never invent: strips, glyphs, glosses, engine claims all trace to researched evidence or are labeled Inference.
- Rankings/popularity: no visual form, ever (pre-existing product ruling).

## 8 · Writing rules

- Tone bar: stylized phrase may introduce; plain language must explain. "Build machines, deploy them, keep the workshop running" — yes. "Unrivaled architect of annihilation" — no.
- Tagline: one line, desktop width.
- Engine paragraph: 2–4 sentences, resource + loop + tension, no unresearched generalizations.
- Verb: one word + a gloss that stands alone.
- Reading lines: second person, concrete, one idea per sentence.
- Card copy: authored to fit its slot. Spec one-liner ≤ ~60 chars; ✓/✕ fragments ≤ ~40 chars. Clamped or ellipsized text on a card is a defect.
- Diagrams show; sentences tell. Every visual ships with its one-line reading.

## 9 · Per-class authoring checklist (× 21)

For each class:
1. Tagline that fits one line.
2. Engine paragraph (resource, loop, tension) — research-confirmed across all its specs.
3. Seal: unique geometry at ~420×260, engine center, one tension encoded, spec nodes with verbs; no label collisions.
4. Per spec (× 3–4): verb + gloss, cadence strip topology, "How to read it" line, "Where your eyes live" line, optional screen-card config, one-line fantasy (if `style` cards win), family tooltip text.
5. Anything unauthored shows its honest gap state, never a placeholder guess.

Study defaults now mirror the rulings: a bare `rhythm-class.html?c=<class>` URL renders
placement `feel`, video `mini`, engine `col`, verbs `chip`, cards `airfam`.

## 10 · Open decisions queue

1. **Phone treatment for strips and the whole ruled layout** — FIRST TOMORROW: the user will be
   on their phone, so the session naturally starts here. Strips are unreadable at 400px today;
   masthead chip, header talents (static-row fallback), and two-column readings all need a
   phone verification pass.
2. Approve or edit the 7 drafted card blurbs and ✓/✕ fragments (advisor drafts).
3. Card ↔ codex blurb registers (advisor answered "keep both, diverge in authoring"; confirm).
4. The remaining folds: Endgame contexts, Leveling story, PvP, etc. Expected LIGHT touch —
   user: "a lot of what we have here is solid stuff."
5. Choose page and Guided pilot: user wants to revisit; NOT touched in this dialogue at all,
   and prior state unknown to it. Start by surveying what ships today.
6. Seal ratio rule (420×260) — confirm as standing.
7. Verb research confirms: Heretic's Convert gloss; Heretic's Insanity relation in the engine ¶.

## 11 · Session log

- **2026-08-06/07 (desktop):** everything above through the codex-top close. Rhythm = first fold
  (final). Study defaults mirror all rulings: bare `rhythm-class.html?c=<class>` is the ruled page.
- **2026-08-07 (phone, session 2, closed):** mockups in the session-2 artifact
  (https://claude.ai/code/artifact/ca1349bc-2fcb-43d5-8834-994aa3b5e05e). Four rulings:
  (1) strips = S2 authored-to-fit phone redraws, vertical rotation evidenced and set aside;
  (2) seal = full drawing tightened ~15% (420×224), standalone, the phone spec switcher —
  fusion with the card explicitly rejected, band/rail/collapsed compactions set aside;
  (3) card = standalone quick-look kept, "All 4" sheet for the rest;
  (4) chrome = sigil-only top row + slim auto-hiding bottom deck (§6b).
- **Next:** implement the ruled phone layout in the study, verify on a real phone, then plan the
  shipped-site slice. The 7 advisor card blurbs (§3 flag) still need their approval pass.
- **Deployed:** https://blakedonn.github.io/coa-class-mockups/ (GitHub Pages, repo
  `BlakeDonn/coa-class-mockups`, public). Main study:
  https://blakedonn.github.io/coa-class-mockups/rhythm-class.html?c=cultist
