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
| Tagline copy (cultist) | "The whispers offer power. Will you listen?" — replaces "Whispers from below, answered…". The shipped Atlas keeps the old premise line (at `coa_classes\class.js:24`) until the site slice lands — divergence RECONFIRMED as the resolution path, no hot-patch (session 6) | RULED (2026-08-07 session 3; resolution 2026-08-09) |
| Styled keyword | One tagline word may carry the class color with a soft glow (cultist: "whispers"). The color is the ruled outline tone — `color-mix(class-color 58%, white 42%)`, same as the seal's active ring and the selected card. Decoration only — never an information channel, text stays readable | RULED (2026-08-07 session 3) |
| Engine paragraph | In the masthead column (`e=col`), class-colored left border, label "THE ENGINE — <resource/idea>". SHAPE BAR (amended 2026-08-10, design-pass round 2): serif lede + at most TWO plain sentences; one idea per sentence, parallel halves fine, chained clauses not; game words first (build · generate · spend · consume · stacks — the Sol vocabulary rule), flavor verbs only after the mechanic is clear; no spec-count sentences (the seal shows them). BINDS the ×19 paragraphs the seal session authors. Exemplar: the KoX body ("Build Demonfire stacks, then spend them to increase an ability's damage or duration. At six stacks, certain abilities trigger an additional effect.") | RULED (2026-08-10 design-pass round 2; supersedes "2–4 sentences") |
| Engine content | Names the resource, the loop, and the class tension. Generalizations across specs need research backing. Heretic's Insanity relation CONFIRMED against v3 (copy-verification, 2026-08-10) | RULED shape / OPEN copy per class |
| Interim masthead text (19 classes) | Adoption round 2 built (`adoption-study.html` + a "Masthead text" switcher on unadopted class pages): **ship** (the v2 premise line alone) · **eng** (the ×21 authored tagline with keyword glow + Atlas engine blurb under the ruled label, premise replaced) · **both** (authored text above, premise kept). The blurb is one cited sentence, honestly thinner than the ruled 2–4 sentence ¶; the full ¶ arrives with each class's authoring pass | OPEN (adoption round 2 ask) |
| Engine copy shape (amended) | Condensed: a serif-italic lede ("Every Cultist runs on Insanity, and it climbs as you act."), then "Near 60 it is steady power: strong enough to fuel your kit, safe enough to hold. Cross 100 and it pays out more, punishing you while it lasts." The paragraph deliberately teaches the seal's HOLD/CROSS words right above the seal. The four-specs sentence is dropped — the seal shows it. The "strong enough to fuel your kit" 60-band claim CONFIRMED against v3 (2026-08-10): 3 of 4 specs evidence the mid-band; Heretic silent there. The fallback line retires | RULED (2026-08-07 session 3, copy tightened same day; 60-band claim confirmed 2026-08-10) |
| Rare-part list | The engine block ends with 1–3 terse ✦ fragments naming what is strange about the class. Cultist: "Melee healer option" · "Four specs, four different playstyles". Every fragment must trace to a computable roster fact (melee healers = 2 of 70 specs; verified in snapshot). No fact, no bullet — never invented | RULED (2026-08-07 session 3) |
| Class name | ONE line at every width — the name never wraps. The `fit` form RULED: a self-correcting JS guard measures the rendered name and scales only one that overflows (KoX 24→23.1px at phone; every other class untouched). Picked over a fixed smaller phone size and tracking/condensed styling. `white-space: nowrap` + guard in `class.js`; refits on resize, ResizeObserver, frame and load ticks | RULED (2026-08-10 design-pass round 1) |
| Role chips | TWO REGISTERS (amended 2026-08-10, design-pass round 3): the jobs line (plain text, sentence case, no boxes, separators only), then ranges on their own fainter line (`#565b62`) — the Atlas card S1 form at the class page, card order (Melee · Hybrid · Ranged) and card join ("&" at ≤2, "·" at 3). One plain-text line PER REGISTER at every width; the Sun Cleric 11px tight guard RETIRED (jobs alone fit full-size at 390, harness-verified). COUNTING unchanged: the true-support rule — class-level Support only when a spec supports WITHOUT healing (Heretic's Support stays on its spec card) | RULED (2026-08-07 session 3; strict counting 2026-08-09; two registers 2026-08-10 round 3 "b is good") |

## 2 · Seal (class diagram)

| Piece | Decision | Status |
|---|---|---|
| Mandatory slots | Engine name · ONE central mechanical tension · one verb per spec | RULED |
| Empty seal slot (19 classes) | **G2 · the crest seat**: the official crest holds the seal slot with "Seal not yet drawn" under it; masthead geometry matches authored classes. User 2026-08-10: "yeah g2 is fine." G1 (calm text) and G3 (node plate) set aside, kept in the switcher for reference. Phone unaffected: below 900px the slot hides and the sheet keeps switching. Each authored seal replaces its crest seat class by class | RULED (2026-08-10 adoption round 1) |
| Seal authoring sequencing | Seals are a DEDICATED per-class pass, not adoption work (advisor recommendation, user asked 2026-08-10): the §9 unit is engine ¶ + seal + verbs + strip per class, and it should consume the kit-derivation output (thresholds, windows, stack counts from the digests) so the tension numbers arrive pre-extracted instead of hand-mined ×19 | PROPOSED (sequencing) |
| Crest sprite source | The hub retired `class-icons.v1.webp` (404, found 2026-08-10); `v2` has identical frame order. The studies now serve a LOCAL copy (`generated-assets/class-icons.v2.webp`) — hotlinking a fan hub's versioned asset broke every crest silently. Rights flag unchanged | RULED (fix, 2026-08-10) |
| Geometry | Unique per class; placement and interaction shared | RULED (pre-existing product ruling) |
| Expression level | "One-tension instrument" (option B): encodes the tension (e.g. 60 HOLD / 100 CROSS), not the full loop | RULED |
| Size | Fills masthead height, aspect preserved | RULED |
| ViewBox ratio | Author future seals near 420×260 (the col-slot ratio) so nothing letterboxes. Cultist redrawn to this in the study | PROPOSED as standing rule |
| Spacing rule | No node label may collide with another node; verify at authored ratio | RULED (from the Cultist overlap fix) |
| Interaction | Node click selects the spec card; selected node glows; selected card glows in the SAME tone | RULED |
| Glow tone | The active stroke is the LIGHTENED class color (seal uses #d3a3ef for Cultist). Card formula: `color-mix(class-color 58%, white 42%)` border + soft halo. Raw class color is wrong | RULED (2026-08-07 correction) |
| Verbs | One word per spec, its relation to the engine. Must not need the seal to parse: every verb ships with a plain gloss (tooltip) | RULED |
| Phone treatment | Full seal at full width, vertically tightened ~15% (420×224 arrangement: orbits 60/77, eye .66, node rows raised; nothing removed). Post-verify amendment: the seal sits DETACHED in its own plate directly below the masthead, not inside it. The seal is the phone spec switcher — tap a node to select. NEVER fused with the spec card; band/rail/collapsed compactions considered and set aside (session-2 artifact). Fallback if still too tall in real use: a remembered collapsed row | RULED (2026-08-07 sessions 2–3) |

Current verb + gloss set (Cultist/Tinker/Knight of Xoroth):
- Spread — keep damage-over-time on every target; the engine is coverage.
- Endure — hold Insanity in a managed band and turn it into survival.
- Convert — turn melee aggression into healing for the group. *(confirmed against v3, 2026-08-10 — near-verbatim claim: "Blade of Yogg-Saron turns Blade of the Empire damage into healing for the lowest-health ally")*
- Cross — push Insanity to 100 on purpose and fight inside the dangerous payoff state.
- Detonate — stack explosives and machines, then fire them in one overlapping window.
- Restore — deploy healing machines where the group will need them.
- Overclock — push your machines and combat suit past their limits.
- Unleash — bank Demonfire to six and cash it as fire; a full Flames of Xoroth calls down Rain of Chaos. *(near-verbatim h3)*
- Cycle — spend Demonfire to refresh Gore's charges; stacks turn back into strikes, and the loop keeps turning. *(w1)*
- Stoke — Shieldgore and beckoned imps feed the fire two stacks at a time; defense fills the bar. *(d1)*

## 3 · Spec rail cards

| Piece | Decision | Status |
|---|---|---|
| Verb echo | Chip in top-right corner, class-colored, uppercase; tooltip = gloss | RULED (`chip`) |
| Selected state | Class-color glow matching the seal's active node | RULED |
| Card structure | `airfam`: name + verb chip / role line / family row (glyph + tooltip) / fantasy blurb / hairline / ✓ fragment / ✕ fragment | RULED (2026-08-07) |
| Fantasy blurb | Slightly verbose on purpose: one full sentence, ~90–105 chars, 2–3 lines. Authored to fit, never clamped | RULED |
| No truncation | Card copy is AUTHORED TO FIT, never clamped data text. ✓/✕ as short fragments (~40 chars); full sentences stay in the codex | RULED |
| Family tooltip | Family row carries the family's authored tagline as hover tooltip | RULED (via airfam) |
| Draft copy | VERIFIED + RULED (copy-verification, 2026-08-10): six of the 7 blurbs and all ✓/✕ fragments confirmed with v3 citations (incl. "oil" and "batteries" via v2 kit data); Godblade's "cashing the full bar" KEPT by user ruling — no v3 evidence either way, the v2 kit grounding stands | RULED (2026-08-10) |
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
| Class video | Desktop: real thumbnail, 112×63, at the TEXT COLUMN's top-right corner, level with the class name (T1, the literal phone echo) — the seal owns the far right. Provenance micro-caption on the image; caveat as hover title. The "▶ Class highlight" chip is RETIRED. Nothing about it renders in the codex | RULED (2026-08-09 session 6 round 1, supersedes the chip) |
| Class video (phone) | Real thumbnail: 96×54 in the masthead's top-right corner, provenance micro-caption on the image, links to the video. Below 560px. Desktop echo landed 2026-08-09 (T1 above) | RULED (2026-08-07 session 3) |
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
| Top row | ONE sticky 48px row holds everything: ⚜ sigil (glyph only on phone), search, and four icon nav buttons (⚜ Atlas · ◈ Choose · ✦ Guided · ⚔ Loot). No tab row on phone, ever | RULED (2026-08-07 session 3) |
| Icon labels | Tiny labels under the icons, ALWAYS visible at every scroll position. The scroll-fade version shipped first and was removed after the user's phone verify — words stay; full buttons never return | RULED (2026-08-07 session 3, amended post-verify) |
| Bottom deck | Session 2's auto-hiding bottom deck was implemented, then superseded the same day by the single-row icon chrome. Removed | superseded |
| Why | One row of standing chrome, labels re-teach the glyphs on every return to the top, and the shipped ~390px `nav.a-tabs` overflow stays retired | — |
| Desktop | Keeps the labeled tab row; icon mode is phone-only | RULED (2026-08-07 session 3) |
| Scope notes | The class page has no search backend — its search box links to the Atlas search until one exists. Chrome still touches all five shells including `loot.html`. Icon labels (~8px) and the fade hand-off need a real-device check | flag |

## 7 · Evidence & honesty (page-wide)

- Tier system (Data / Players / Inference) untouched and load-bearing. RULED (keep).
- Anything persuasive gets a stronger honesty label, not a weaker one (screen card precedent).
- Never invent: strips, glyphs, glosses, engine claims all trace to researched evidence or are labeled Inference.
- Rankings/popularity: no visual form, ever (pre-existing product ruling).

## 8 · Writing rules

- Tone bar: stylized phrase may introduce; plain language must explain. "Build machines, deploy them, keep the workshop running" — yes. "Unrivaled architect of annihilation" — no.
- Tagline: one line, desktop width.
- Engine paragraph: lede + ≤2 sentences, one idea each (amended 2026-08-10, round 2).
  Game words first — build, generate, spend, consume, stacks; flavor after the mechanic.
  Resource + loop + tension; no unresearched generalizations; no spec-count sentences.
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
2. ~~Approve or edit the 7 drafted card blurbs and ✓/✕ fragments~~ — RESOLVED 2026-08-10
   (copy-verification): six confirmed with citations, Godblade kept by ruling (§3 draft-copy row).
3. Card ↔ codex blurb registers (advisor answered "keep both, diverge in authoring"; confirm).
4. The remaining folds: Endgame contexts, Leveling story, PvP, etc. Expected LIGHT touch —
   user: "a lot of what we have here is solid stuff."
5. Choose page and Guided pilot: user wants to revisit; NOT touched in this dialogue at all,
   and prior state unknown to it. Start by surveying what ships today.
6. Seal ratio rule (420×260) — confirm as standing.
7. ~~Verb research confirms: Heretic's Convert gloss; Heretic's Insanity relation in the engine ¶~~
   — RESOLVED 2026-08-10 (copy-verification): both confirmed against v3 (§1 + §2 rows).

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
- **2026-08-07 (masthead + chrome, session 3, closed):** same artifact, Frame 2. Five rulings, all
  LOCKED by the user ("this is fantastic — lock it in"): (1) chrome = single sticky row with icon
  nav + fading labels, deck removed (§6b rewritten); (2) role chips = one plain-text line (§1);
  (3) class video = corner thumbnail on phone (§5); (4) engine copy = condensed lede + 60-band feel
  line, four-specs sentence dropped, "fuel your kit" flagged for research confirm (§1); (5) rare-part
  ✦ list with the computable-fact rule (§1). Roster facts verified this session: melee healers =
  2 of 70 (Heretic, Life); four-role classes = 4 of 21.
- **2026-08-07 (post-verify tweaks):** user phone-verified the deploy ("looks super good"; masthead
  reads in one glance up to the seal). Two amendments from that read: icon labels always visible
  (scroll fade removed), and the seal detached into its own plate below the masthead.
- **2026-08-07 (copy pass):** engine 60/100 lines tightened to echo the seal's HOLD/CROSS vocabulary.
  Cultist tagline replaced with "The whispers offer power. Will you listen?" plus the styled-keyword
  rule ("whispers" in class-color glow). Shipped Atlas keeps the old premise until the site slice.
- **Next:** research-confirm the two engine flags ("fuel your kit", Heretic's Insanity relation);
  approve the 7 advisor card blurbs (§3 flag); author tinker's rare-part bullets from computable
  facts; then plan the shipped-site slice (after the Anatomy merge).
- **2026-08-09 (session 6 open, desktop echo, round 1 built):** read-first list completed.
  The ruled plain-text role line now applies at every width on `rhythm-class.html` (promoted
  out of the 560px gate; §1 "own pass" executed). Engine block verified at desktop parity.
  Round 1 built and deployed: the corner video thumb at the text column's right edge, three
  placements (`?v=t1` top corner / `t2` roles row / `t3` engine corner), chip kept as the
  baseline until the pick; compare page `desktop-echo-study.html` (real renders, trade-offs,
  Tinker cross-check links). 1280/1440 desktop + 390 phone screenshots verified pre-deploy.
  Awaiting the round-1 pick.
- **2026-08-09 (round 1 verdict):** user picked **T1 · top corner** (the recommended literal
  phone echo). §5 updated; the chip is retired; study default flipped so the bare URL renders
  T1. T2/T3 stay in the switcher for reference. Round 2 opens on true-support propagation
  (the role line's Support counting), the first Atlas warm-up flag.
- **2026-08-09 (round 2 verdict, true-support propagated):** user ruled **strict everywhere**.
  Computed ripples disclosed before the pick: 12 → 5 classes show class-level Support
  (Barbarian, Stormbringer, Guardian, Ranger, Sun Cleric); four-jobs classes 4 → 1
  (Sun Cleric alone keeps the "four different jobs" ✦ fact; Cultist, Bloodmage, Primalist
  fall back to the playstyles fact). Applied: `class.js` roleChips (this page + `class.html`),
  `card-study-2.js` factsFor (Atlas cards, Choose results, profile studies — the card's jobs
  line already obeyed the rule). `?su=ship` keeps the retired counting for reference.
  Atlas grammar §4 ripples flag closed.
- **2026-08-09 (job 2 resolved):** the shipped-Atlas tagline divergence resolves in the SITE
  SLICE, not a hot-patch (user accepted the recommendation). The old premise stays at
  `coa_classes\class.js:24` until then. §1 row updated. Round 3 opens on star-map placement,
  the last warm-up flag.
- **2026-08-10 (copy-verification session, five-class round ruled):** the session-5 verification
  of every authored sentence against the LANDED five-class v3 corpus went to the user for
  rulings. CONFIRMED, flags closed: the Cultist engine lede and 60/100 lines ("fuel your kit"
  held — 3 of 4 specs evidence the mid-band); Heretic's Insanity relation (§1); the Convert
  gloss, near-verbatim (§2); six of seven card blurbs, all ✓/✕ fragments, "oil" and "batteries"
  (§3). RULED: Godblade's "cashing the full bar" kept on its v2 kit grounding (no v3 evidence
  either way). Queue items 2 and 7 closed. The three Atlas engine-blurb fixes from the same
  round are recorded in `atlas-page-grammar.md` §8. Later the same day: Tinker verified —
  the class-page engine paragraph CONFIRMED (bombs, turrets, beacons, Mechsuit, and the
  "destruction, repair, or the pilot's seat" split all carry claims); the Atlas blurb's
  "Every Tinker runs on Scrap" was contradicted-by-absence (Scrap is Mechanics-only) and
  replaced with this page's lede under the user's blanket ruling. The ×21 Atlas authoring
  then ran in full — record in `atlas-page-grammar.md` §8. Class-page engine PARAGRAPHS for
  the 16 new classes remain unwritten: they belong with the per-class seal/verb/strip
  authoring (§9 checklist), not the card pass.
- **2026-08-10 (21-class breadth pass, live site):** run by the copy session per the
  adoption handoff's STATE SYNC. Method: `harness.html` (now committed in the site source) —
  42 renders (21 classes × 390/1280) in fixed-width iframes, mechanical checks (document
  overflow, clipped elements, tagline/role wrap), results POSTed back; headless Chrome
  stdout/screenshot both hang through WSL interop on this box, so the POST-back harness is
  the working pattern. Results: 34/42 clean at first pass. Real defect: **Sun Cleric's role
  line clipped at 390** (327px in a 301px slot; the only class over — the one-line law's
  computed content can exceed the slot on the 4-jobs class). Fix shipped: a self-correcting
  guard in `class.js` adds `.tight` (11px spans) only when the line overflows; verified
  re-render fits, all other classes untouched at 12px. RECOMMENDED for a future ruling: the
  Atlas S1 two-line form (ranges on a fainter second line) at phone width as the durable
  fix. False positives recorded: seal SVG `<text>` metrics; the `⌕ Search` pill clips ~15px
  into its trailing ellipsis on phone (shipped chrome, cosmetic, left alone). Deployed
  `374d20e` → coa_classes `7c5b6db`.
- **Deployed:** https://blakedonn.github.io/coa-class-mockups/ (GitHub Pages, repo
  `BlakeDonn/coa-class-mockups`, public). Main study:
  https://blakedonn.github.io/coa-class-mockups/rhythm-class.html?c=cultist
- **2026-08-10 (design-adoption session opened, round 1 built):** the adoption handoff landed in
  the standing design session. Round 1 = the empty seal slot on the 19 seal-less classes:
  G1 calm text / G2 crest seat / G3 node plate, all real full-page renders via a `?gap=` mode
  on `rhythm-class.html` plus the `adoption-study.html` compare page (Barbarian + the
  Knight of Xoroth long-name stress). Found en route: the hub's crest sprite went 404 (v1
  retired); v2 verified frame-identical and adopted as a LOCAL asset across all studies.
  Verified at 1280 on real pixels; phone hides the slot below 900px. Awaiting the round-1 pick.
- **2026-08-10 (adoption round 1 verdict):** user: "yeah g2 is fine" — the crest seat RULED as
  the seal-less masthead; study default flipped so every bare class URL renders it. On "create
  the seals now?": recorded as PROPOSED sequencing — seals stay a dedicated per-class pass
  (§9 unit: engine ¶ + seal + verbs + strip), fed by the kit-derivation research output.
  Next adoption rounds: the interim engine block (the ×21 Atlas blurbs as masthead copy),
  the 21-class breadth pass, consolidation after the copy session closes its file.
- **2026-08-10 (adoption round 2 built):** the interim masthead text on the 19 unadopted
  classes — ship / eng (the ×21 authored tagline + engine blurb in the ruled masthead order,
  read live from `card-study-2.js`, loaded read-only) / both. Compare renders on Reaper in
  `adoption-study.html`; verified at 1280 and in the 390px harness (tagline glow, engine
  label, roles, crest seat, guide rows all clean). Awaiting the round-2 pick.
- **2026-08-10 (ADOPTION DIALOGUE CLOSED EARLY — user reframe):** "I just want our live site
  to be what's getting updated… I just want the bones built out so when we bring in our data
  from the 21 classes it just works on our live page." The mockup-round cadence ends; the
  remaining adoption legs (interim masthead text, breadth pass, consolidation) fold into the
  SITE-ADOPTION SLICE (`site-adoption-slice-handoff.md`, work-session lane). Round 2's pick is
  deferred into that slice as a decision point (advisor recommends eng). The mockups repo
  becomes a reference lab.
- **2026-08-10 (session close, handovers written):** the ship session ends. Standing docs:
  `seal-strip-authoring-playbook.md` (the ×19 process), `seal-strip-session-handoff.md`
  (fresh-session kickoff; ready set WH/Guardian/KoX), the adoption session's STATE SYNC,
  and the research brief's addendum (families + engine audit + fold verdicts). The live
  site is the single render target for all of it.
- **2026-08-10 (seal & strip session, round 1 — Knight of Xoroth authored):** cadence
  CONFIRMED by the user at round open: one proposed seal + verbs + strips per round,
  rendered live; 2–3-direction rounds return only if a class resists (playbook row now
  RULED). KoX authored end to end and DEPLOYED (main repo `dd077a9`; live via the 13:03
  pages build): engine ¶ (audited lede kept verbatim; body teaches FEED / 6 · UNLEASH —
  six-stack bar from Demon Heart, per-stack-consumed payoffs, and a six-stack rider in
  each spec tree: Rain of Chaos · Pestilence Unbound · Stoke the Flames), six-ember
  hexagonal seal (crown ember = the sixth stack; 420×224 phone arrangement; the seal-swap
  code generalized from the Cultist-only special case), verbs Unleash/Cycle/Stoke with
  claim-backed glosses, three strip topologies (Hellfire stack-climb h2/h3/h6 · War wheel
  w1/w2/w3/w6 · Defiance imp bank d1/d2/d4/d6) with S2 phone redraws, and pips/wheel/bank
  card topo glyphs. QUARANTINE INTERPRETATION (flag for the user): war/rhythm_payoff and
  defiance/enjoy_avoid_fit are quarantined DIMENSIONS (their picker sentences died in
  audit, claims:none); the strips rest only on the landed structural claims, per the
  adoption ruling "everything else in a landed claims array is fair evidence" — nothing
  rests on the dead dimensions. Verified: 1280 + 390 iframe screenshots ×3 specs, zero
  horizontal overflow at both widths, Cultist seal-swap regression clean. AWAITING the
  user's live-page verdict; engine ¶ / seal / verbs / strips become RULED rows on it.
- **2026-08-10 (round 1 corrections, applied + redeployed):** user's live read, two fixes:
  "the text on the glyph for 'demonfire' is hidden behind the actual diagram" and "a
  weird … arrow on the left side that isn't connected to the diagram itself." Fixes
  (`acadfc8`, live): the center label pair carries a dark paint-order halo (new standing
  trick for text over seal geometry), and the FEED arc is re-anchored — it now starts at
  the first ember and lands at the crown, on both the desktop and phone drawings.
  Second pass ("demonfire needs like z axis, it's still behind the fire icon"): halo alone
  lost to the flame glow on device. The label pair now paints LAST on a soft dark plate
  (`kx-lab-plate`), both arrangements. STANDING RULE for future seals: the center label
  draws above all seal art, with a halo, and a plate if it crosses bright geometry.
  Third report ("still rendering behind") diagnosed as STALE CACHE, not z-order: three
  builds shipped in ~30 min and Pages caches 10 min, so the phone mixed old files. Fix
  in tooling: `deploy_coa_site.py` now stamps every css/js reference with a content hash
  at package time — a fresh page load can never mix stale runtime files again.
  Final label ruling ("ok cool that works but do we really need the black backfill?"):
  plate REMOVED, halo alone carries readability. The §2 standing rule amends to: center
  label paints last with a dark halo; no plate.
- **2026-08-10 (round 1 VERDICT — Knight of Xoroth RULED):** user on the live page after
  the plate removal: "perfect!" The KoX engine ¶, six-ember seal (both arrangements),
  Unleash/Cycle/Stoke verbs + glosses, all three strips with S2 phone redraws, and the
  pips/wheel/bank card glyphs are RULED as shipped. The war-strip quarantine reading
  (strips rest on landed structural claims; dead dimensions carry nothing) stands
  unobjected. Round 2 opens on Guardian — the honest-split engine case.
- **2026-08-10 (STRIP CAPTION ROUND — §4 amended, deployed):** user paused Guardian:
  reading lines "a bit too long winded … the graph isn't super self explanatory", and
  asked for a Sol-xhigh assist plus options. Process: Sol-xhigh advisory leg (findings in
  the main repo, `reports/coa-specs/strip-legibility-sol-findings.md`; ~3 min, detached
  codex exec) → a desktop compare page (A/B/C caption systems) REJECTED ("i dont really
  like these", must be phone-first, no sideways scroll) → two phone-first artifact
  rounds. RULINGS, all applied and live (`site` commit + deploy 2026-08-10):
  · Captions are BULLETS now: 2–4 dash bullets under "HOW TO READ IT", plain player
    words first, at most ONE ability name per bullet, numbers kept; the eyes line
    becomes one gold "👁 watch:" line with two attention objects. User: "bullets are
    definitely the play but we gotta get better vocabulary ccuase a lot of this feels
    like givverish." Sol's ≤14/≤10-word budgets fold into this shape.
  · The two per-strip labels ("names: Data · shape: Inference" + "shape, not rotation")
    MERGE into one line, wording user-picked: "drawn from research · not a rotation
    guide". The in-svg notes are removed from every strip.
  · WAR redrawN: desktop = one closed three-station loop (BUILD → SPEND → BOOST WINDOW,
    return edge "free Meatsaw · the bar refills") — Sol's diagnosis that the repeated
    row read as a forbidden button-sequence; phone = the W2 LADDER (user pick; W1 wheel
    and W3 ship set aside). Hellfire and Defiance drawings ruled good as shipped and
    kept ("i do think defiance and hellfire originals are good").
  · Set aside: caption directions B (numbered beacons) and C (legend chips), and the
    first desktop-format compare (mockups repo `strip-caption-study.html`, reference).
  Verified at 1280 + 390 iframe (war, godblade); Cultist/Tinker strips converted to the
  same bullet grammar from their verified prose. Compare artifact:
  https://claude.ai/code/artifact/361b3534-834e-41b6-a08d-ca63271f03a0
- **2026-08-10 (seal & strip round 3 — WITCH HUNTER authored, deployed, awaiting
  verdict):** the shared-bar case, the mirror of Guardian's split: one Rage under four
  spec layers (audited; Tonics restore it class-wide, c1). Engine ¶ under the
  two-sentence bar — build/spend/restore plus the four layer names. SEAL: a Rage vial
  at the center of a hunter's diamond; corner nodes carry their LAYER tags
  (BOLTS · HOUNDS · BRANDS · DAWN·DUSK); threshold "ONE RAGE · SHARED"; legend the
  shared tools "VAULT · TRAP · TONIC" (c1/c2). Verbs: Unload · Loose · Riposte ·
  Balance, glosses claim-backed (bl1, hm1/hm2, bk1/bk2, iq2). Strips: boltslinger
  Damnation loop with the Twilight Frenzy window · houndmaster pack loop with the 20 s
  Decimate window · black-knight parry gate (avoid unlocks Desecrate) · inquisition
  DUAL CLIMB — Dawn and Dusk tracks to a 20 gate into Cycle of Despair (6 s), a new
  topology. Desktop horizontals + phone ladders (200-wide windows). Build fix en
  route: the phone legend moved top-left (bottom-left hit Black Knight's labels —
  same bug as Guardian round; corner legends now default TOP-left on phone).
  Verified 1280 ×4 specs + 390 iframe; live. Post-verdict fix (user: "move the middle
  text a bit more left so the arrow doesn't overlap it"): all six desktop loop strips'
  return labels moved to x≈310 — left of the return arc's dip — as the standing rule.
  Clarified target ("i meant like build · fire dawn steel dusk"): the Inquisition phone
  ladder's BUILD sub split into two short lines ("fire builds Dawn" / "steel builds
  Dusk") and every phone-ladder return arc pushed 8px further right. Standing: ladder
  station subs stay ≤ ~20 chars; split before they reach the arc's lane. Follow-up
  ("all the labels that are on that column… can be a bit more left"): the station
  label column moved 185→165, beside the glyphs it describes — the arc owns the
  right rail alone. Standing ladder geometry: glyphs ≤ x150 · labels at x165 ·
  window 200 wide · arc sweeps x≥356.
- **2026-08-10 (round 2 VERDICT — Guardian RULED):** user on the live page after the
  ladder-window fix: "ok cool this is good to keep going i think." The banner seal
  (TOWER · GUARD / LINE · MARCH), the meter-marked node rank (10 · 3 · 3),
  Block/Rally/Duel, the engine body under the two-sentence bar, and all three strips are
  RULED as shipped. Round 3 opens on Witch Hunter — the last of the ready set.
- **2026-08-10 (seal & strip round 2 — GUARDIAN authored, deployed, awaiting verdict):**
  the honest-split case, built under every ruling landed today (two-sentence engine bar,
  bullet captions, honesty line, ladder phone grammar, center-label halo painted last).
  Engine ¶: audited lede kept; body names the split plainly — each spec its own stacks
  at its own mark (ten Paragon · three Tempo · three Glory, all claim-numbered) plus the
  shared floor (blocks restore Energy; Motivating Strike grants Motivation). SEAL: a war
  banner between the two stances — TOWER · GUARD (tight 3×3 grid) and LINE · MARCH
  (spread rank) from the c-formations trade-off claim; the three spec nodes stand in a
  RANK below, each carrying its own meter mark (10 · 3 · 3) — the split made visible
  without breaking the one-tension rule. LADDER AMENDMENT (user fix, same day): the
  payoff window is 200 wide, not full-width — the return arc owns the freed right rail,
  and the return label sits on its own line under the window. Binds all phone ladders. Verbs: Block (blocks pay Energy/Paragon/High
  Guard) · Rally (Ballads → three Tempo → Sound of War) · Duel (Glory ×3 → boosted Ram;
  net → Centurion crits). Strips: Vanguard Paragon bank (10 · the mark) · Inspiration
  tempo cycle with the Hero's March 15 s window · Gladiator glory wheel — desktop
  horizontal loops/banks + phone ladders, bullet captions, all numbers claim-traced.
  Quarantine: inspiration/enjoy_avoid_fit carries nothing. One build fix en route: the
  seal legend moved top-left (bottom-left collided with the Vanguard node's labels).
  Verified 1280 ×3 specs + 390 iframe; live.
- **2026-08-10 (PHONE LADDER GRAMMAR — adopted, deployed):** user, after the caption
  round landed: "war is great for our mobile view" — asked what would bring the other
  two up to par. Advisor read: War won because it reads top-to-bottom. Mocked Hellfire
  and Defiance as ladders on the same artifact (today vs ladder, phone-first). User:
  "on desktop we may prefer the horizontal slice but yeah on mobile these are both
  good." RULED and live: the LADDER is the standing S2 phone grammar — stacked
  stations, each spec's own furniture inside them, a full-width payoff window, one
  return arrow; DESKTOP keeps the wide horizontal drawings. Applies to future classes'
  phone redraws. The 2026-08-07 "vertical rotation set aside" ruling is untouched —
  ladders re-compose stations, they do not rotate the level axis.
- **2026-08-10 (design-pass session opened, round 1 built — the one-line class name):**
  from `2026-08-10-coa-class-page-design-pass-handoff.md`. Baseline measured on the live
  source: only Knight of Xoroth wraps, and only at phone width — 202px of name against
  197px of slot at 390 (the 30px h1 fits everything at 1280; availW there is 537px).
  Three directions built behind a TEMPORARY `?n=` switcher on the live `class.html`
  (baseline stays the bare-URL default until the pick; switcher and its harness are
  removed when the verdict lands): **fit** = a self-correcting JS guard in the role-line
  style — nowrap, measure, scale ONLY the overflowing name (KoX 24→23.1px; every other
  class untouched; holds at ANY width and under font substitution; ResizeObserver added
  after the harness caught a late-scrollbar miss) · **small** = one smaller fixed phone
  size for every class (20px; KoX 168/197 with margin; short names pay for the long one)
  · **tight** = tracking 0 everywhere + a 7% scaleX squeeze at phone only (KoX 170/197;
  desktop names measurably narrower, e.g. KoX 252→233 at 1280). Verified: six long names
  (KoX · Chronomancer · Stormbringer · Witch Doctor · Witch Hunter · Sun Cleric) × 390/
  1280 × all four forms, mechanical one-line checks green except the baseline's known
  KoX wrap; 21-class breadth harness re-run clean (only the recorded false positives:
  seal SVG text metrics at 1280, the ⌕ Search pill at 390). Method note: the round
  harness (`name-harness.html`, committed) POSTs measurements back AND
  `--virtual-time-budget` + `--screenshot` makes Windows headless Chrome reliable from
  WSL — screenshots landed for all four forms this run. Deployed `e1ccd32` → coa_classes
  `5b9ec92`. AWAITING the round-1 pick (advisor recommends fit).
- **2026-08-10 (design-pass round 1 VERDICT — fit RULED):** user: "yeah a is good." The
  one-line name law is baked: `white-space: nowrap` on the masthead h1 plus the class.js
  guard for every class, `?n=` switcher and its harness removed (§1 row added). En route
  the engine harness caught a late-scrollbar race — the guard's first run happens before
  the codex fills, so a scrollbar can narrow the h1 afterward; frame and load re-checks
  added alongside the ResizeObserver. Bare-URL KoX verified 1 line at 23.1px ×8 renders;
  21-class breadth re-run clean (same two false-positive families only). Deployed
  `017997c` → coa_classes `bf1905f`.
- **2026-08-10 (design-pass round 2 built — the engine-paragraph shape bar):** the
  handoff's piece 2 (user: the KoX ¶ is "long winded and isn't the most clear"). PROPOSED
  bar: serif lede + ≤2 plain sentences · one idea per sentence, parallel halves allowed,
  chained clauses not · teach the seal's words where true (Cultist precedent) · no
  spec-count sentences (the seal shows them). Tightens §8's "2–4 sentences" to lede+2;
  Cultist already obeys unchanged. Three KoX rewrites live behind a TEMPORARY `?e2=`
  switcher rendering from `class.js` — CLASS_ENGINE in authored-copy.js is the seal
  session's active region and stays untouched until the pick. All three keep the audited
  lede verbatim, rephrase only the shipped seal-session-verified sentences, and drop two
  on purpose ("Spend thin…" restates the scaling rule; "each spec keeps a six-stack
  reward…" follows the Cultist four-specs precedent out — the crown ember and verbs show
  it). r1 "the rule" (16w) · r2 "rule + command" (17w, teaches feed/unleash) · r3 "the
  ember" (18w, one extra phone line). Measured: ¶ block 167px → 104/104/125px at 390;
  38 → 16–18 words. On the verdict: winner lands in authored-copy.js as the exemplar,
  §8 amends, and the USER RELAYS the ruled bar to the seal session (its ×19 authoring
  binds to it). AWAITING the round-2 pick (advisor recommends r2).
- **2026-08-10 (round 2 RE-MOCKED — user verdict + a Sol-xhigh leg):** user on r1–r3:
  "the vocabulary just feels weird like it doesnt explain things very well," and asked
  for sol-xhigh. Bounded file-backed leg (codex exec, gpt-5.6-sol, xhigh; brief + the
  landed KoX digest; answer archived as `sol-engine-vocabulary-answer.md` here).
  DIAGNOSIS: the candidates led with metaphor before mechanics — "bar" hides the
  resource and its stack units, "payoff/burns" hide which abilities spend, "ember"
  invents a second unit name, "strikes" is too narrow (imps, Demon Heart, on-attacked
  also generate), and "harder it hits" wrongly reduces scaling to damage (spenders
  also scale DURATION: "Lasts 3 sec for each Demonfire consumed", Suffuse +2s/stack —
  newly surfaced, digest-cited). VOCABULARY RULE (Sol, adopted for the re-mock): game
  words first — build · generate · spend · consume · stacks; flavor verbs only after
  the mechanic is clear. New candidates behind `?e2=` (r1–r3 retired): **r4** cleanest
  ("Build Demonfire stacks, then spend them to increase an ability's damage or
  duration. At six stacks, certain abilities trigger an additional effect.") · **r5**
  conversational (consume-every-stack named) · **r6** keeps FEED/UNLEASH, each
  translated inline. All 22–25 words, ¶ 146px at 390, name law + overflow clean ×8
  renders. FLAG raised by Sol, held as a DECISION POINT (edits the RULED KoX seal —
  the seal session's surface, no change shipped): rename seal labels to BUILD /
  SPEND, crown pip "6 · BONUS", since six adds riders, not one universal unleash;
  "unleash" also risks confusion with Unleash Pestilence. Deployed `0d93a96` →
  coa_classes `4955068`. AWAITING the round-2 pick (advisor + Sol recommend r4).
- **2026-08-10 (round 2 VERDICT — the shape bar + r4 RULED):** user: "it feels a little
  long still but if we think that necessary thats cool, idk i think this length is
  needed cause it does describe the class well" — read with both advisor
  recommendations as: r4 accepted, length trade accepted. BAKED: r4 lands in
  `authored-copy.js` CLASS_ENGINE as the exemplar (surgical hunk; the file stays the
  seal session's region); the `?e2=` switcher and engine harness retire. §1 row and §8
  amended: lede + ≤2 sentences, one idea each, game-words-first, no spec-count
  sentences — supersedes "2–4 sentences". THE BAR NOW BINDS the ×19 engine paragraphs:
  USER still to RELAY it to the seal session. OPEN decision point (Sol's, logged last
  entry): the seal-label rename BUILD / SPEND / "6 · BONUS" — no seal change shipped,
  user has not addressed it. Verified: baked KoX bare URL renders r4, name law 1 line,
  breadth clean. Deployed `6ec1971` → coa_classes `8b9e913`.
- **2026-08-10 (design-pass round 3 built — jobs vs ranges on the role line):** the
  handoff's piece 3 (user: "more visual distinction that some of these are roles, the
  others the playstyle… like we have on two separate lines on the card"); supersedes
  fold-verdicts handoff Job 2. This round would EDIT the ruled one-line law
  (2026-08-07/09), so both directions ship behind a TEMPORARY `?r3=` switcher and the
  law stands until the pick: **dim** = one line kept, range words in the card's fainter
  `#565b62` inline (law intact; Sun Cleric still needs the 11px tight guard at 390) ·
  **two** = the Atlas card S1 echo — jobs line as ruled, ranges on their own fainter
  second line, card order (Melee · Hybrid · Ranged) and card join ("&" at ≤2), which
  RETIRES the Sun Cleric tight guard (jobs alone fit full-size at 390, verified).
  Harness: `role-harness.html` (Sun Cleric · KoX · Cultist · Stormbringer × 390/1280 ×
  3 forms) — zero overflow, name law holds ×24; tight fires only on base/dim Sun
  Cleric at 390. A card-fidelity fix en route: the two-line ranges follow the card's
  fixed order, not spec order. Deployed with the r4 bake (`6ec1971`). AWAITING the
  round-3 pick (advisor recommends two — it is the user's own reference form, and it
  ends the guard).
- **2026-08-10 (round 3 VERDICT — two registers RULED):** user: "b is good." BAKED:
  `roleLines()` renders the jobs line + the fainter ranges line on every class page;
  the `?r3=` switcher, the tight guard, and `role-harness.html` all retire; §1 row
  amended. Verified post-bake: bare URLs render two registers on all four harness
  classes, zero overflow, no guard firing anywhere; 21-class breadth clean (same two
  false-positive families). Deployed `a2a40a4` → coa_classes `d2f0e04`. Round 4 opens
  on the handoff's last piece: blocked assets on managed networks.
- **2026-08-10 (design-pass round 4 built — blocked assets, two decisions):** evidence
  measured on the live source: SIX render sites hotlink `coabuildhub.com/skill-icons/`
  (277 distinct icons in use, ~1–2MB; the hub's own tracker shows 1,120 of 2,415 icons
  already dead) and three files hotlink `i.ytimg.com` thumbs. DECISION 1 (ruling, no
  mock): localize the 277 icons into `generated-assets/skill-icons/` — the crest
  precedent (v1 retirement broke every crest silently; local copy RULED as the fix),
  same rights posture, and it fixes managed-network icons entirely. DECISION 2 (pick):
  the thumb fallback. The real mechanism shipped this round: every thumb img wires an
  error handler that marks its anchor `.noimg`. Two states behind a TEMPORARY `?r4=`
  switcher, with `?r4sim=1` faking the blocked CDN from any network: **hide** (failed
  thumb disappears; guide rows keep text) · **card** (masthead thumb becomes a bordered
  "▶ CLASS HIGHLIGHT" link chip; guide rows a ▶ tile; `.cine-strip` already degrades
  gracefully via background-image). Harness `thumb-harness.html`: Cultist + Heretic's
  guide row × 390/1280 × sim-only/hide/card — all three `.noimg` anchors fire, zero
  overflow. Deployed `a952b49` → coa_classes `467b587`. AWAITING both calls (advisor
  recommends localize + card).
- **2026-08-10 (round 4 VERDICT — localize + card RULED; DESIGN PASS COMPLETE):** user:
  "ok go ahead." EXECUTED: all 277 in-use skill icons downloaded (browser-UA curl, every
  file verified JPEG, 0.69MB) into `generated-assets/skill-icons/`; the six render
  sites now build LOCAL urls (the hub keeps only outbound `/build/<uuid>` links);
  `deploy_coa_site.py` enumerates the icon directory at package time. The card thumb
  fallback BAKED ungated: a failed thumb img marks its anchor `.noimg` (error listener
  + a complete-but-broken naturalWidth check) and renders as the masthead link chip /
  guide-row ▶ tile; the `?r4` switcher and `thumb-harness.html` retire. PROOF RENDER:
  Cultist with BOTH CDNs blocked via `--host-resolver-rules` — local icons load, the
  chip renders, zero broken art (a managed-network page is now whole). Breadth clean
  (32/42; the seal-svg false-positive count grew with the parallel session's new
  Guardian seal). Deployed `918ab5a` → coa_classes `b81b69e`. Rights posture: same as
  the crest — fan-hub-mirrored game art, flag recorded, unresolved. ALL FOUR handoff
  pieces are now RULED and live: name (fit) · engine bar (r4 exemplar) · role line
  (two registers) · assets (localize + card). Still parked for the user: relay the
  ruled shape bar to the seal session, and Sol's optional seal-label rename
  (BUILD / SPEND / 6 · BONUS).
- **2026-08-10 (post-pass correction — modal hover tooltips):** user: "it seems like
  hover doesn't work in the class preview modal." Diagnosis: the slim quick-look is a
  native `<dialog>` shown with `showModal()`, which paints in the browser TOP LAYER —
  above ANY z-index on body children, so the body-parented `.talent-tip` (z-index 90)
  was created on hover but painted invisibly underneath. Fix in the shared tooltip
  runtime (`profile-render.js`): the tip parents to the topmost open dialog when one
  exists, else body; `position: fixed` keeps viewport coordinates (the dialog carries
  no transform). Verified: harness opened the Godblade quick-look, synthesized the
  hover, asserted the tip inside the open dialog, and screenshotted the Rift gloss
  rendering over the modal. Non-modal surfaces unaffected (no open dialog → body, as
  before). STANDING TRAP for future overlays: anything inside a modal dialog that
  spawns a floating element on body must re-parent it into the top layer. Deployed
  `aa9c4f6` → coa_classes `6f2f74c`.
