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
| Engine paragraph | 2–4 plain sentences in the masthead column (`e=col`), class-colored left border, label "THE ENGINE — <resource/idea>" | RULED |
| Engine content | Names the resource, the loop, and the class tension. Generalizations across specs need research backing. Heretic's Insanity relation CONFIRMED against v3 (copy-verification, 2026-08-10) | RULED shape / OPEN copy per class |
| Interim masthead text (19 classes) | Adoption round 2 built (`adoption-study.html` + a "Masthead text" switcher on unadopted class pages): **ship** (the v2 premise line alone) · **eng** (the ×21 authored tagline with keyword glow + Atlas engine blurb under the ruled label, premise replaced) · **both** (authored text above, premise kept). The blurb is one cited sentence, honestly thinner than the ruled 2–4 sentence ¶; the full ¶ arrives with each class's authoring pass | OPEN (adoption round 2 ask) |
| Engine copy shape (amended) | Condensed: a serif-italic lede ("Every Cultist runs on Insanity, and it climbs as you act."), then "Near 60 it is steady power: strong enough to fuel your kit, safe enough to hold. Cross 100 and it pays out more, punishing you while it lasts." The paragraph deliberately teaches the seal's HOLD/CROSS words right above the seal. The four-specs sentence is dropped — the seal shows it. The "strong enough to fuel your kit" 60-band claim CONFIRMED against v3 (2026-08-10): 3 of 4 specs evidence the mid-band; Heretic silent there. The fallback line retires | RULED (2026-08-07 session 3, copy tightened same day; 60-band claim confirmed 2026-08-10) |
| Rare-part list | The engine block ends with 1–3 terse ✦ fragments naming what is strange about the class. Cultist: "Melee healer option" · "Four specs, four different playstyles". Every fragment must trace to a computable roster fact (melee healers = 2 of 70 specs; verified in snapshot). No fact, no bullet — never invented | RULED (2026-08-07 session 3) |
| Role chips | One plain-text line, sentence case, no boxes, separators only. Authored to fit ONE line at 390px. Applies at every width (desktop echo landed 2026-08-09). COUNTING: the true-support rule — class-level Support only when a spec supports WITHOUT healing (Cultist: "Damage ×2 · Healer · Tank · Melee · Ranged"; Heretic's Support stays on its spec card) | RULED (2026-08-07 session 3; strict counting ruled 2026-08-09 session 6 round 2) |

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

Current verb + gloss set (Cultist/Tinker):
- Spread — keep damage-over-time on every target; the engine is coverage.
- Endure — hold Insanity in a managed band and turn it into survival.
- Convert — turn melee aggression into healing for the group. *(confirmed against v3, 2026-08-10 — near-verbatim claim: "Blade of Yogg-Saron turns Blade of the Empire damage into healing for the lowest-health ally")*
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
