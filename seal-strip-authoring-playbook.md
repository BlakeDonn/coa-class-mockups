# Seal & strip authoring playbook (the ×19 pass)

How a class gets its seal, verbs, engine paragraph, and rhythm strips. Consolidated
2026-08-10 from `class-page-grammar.md` §1/§2/§4/§8/§9 and the Cultist/Tinker sessions,
so class #3 onward follows a written process instead of archaeology.

Authority: the grammar files stay the binding record. This playbook is procedure.

## WHAT THESE ARTIFACTS ARE

- **The seal** is a one-tension instrument. It encodes the class engine and ONE central
  mechanical tension (Cultist: 60 HOLD / 100 CROSS) — never the full loop.
- **A strip** is one spec's authored rhythm topology. Shape, not script: no time axis, no
  rotation, no ability sequence.
- Both are authored per class from evidence. Nothing generates them. Until authored, the
  live site shows the crest seat and the dashed strip gap — shipping honest gaps is fine.

## SEQUENCING — when a class may enter the pass

1. **Its engine identity has passed the audit.** The seal's center IS the engine; the
   Chronomancer case proved a cited blurb can still name the wrong engine (Timewalking is
   shared utility; the spec loops run on DoT ramps / Echo Fragments / Aeons). No audit,
   no seal.
2. **Its tension numbers exist.** Thresholds, windows, stack counts, charge timings — from
   the kit-derivation research pass when it lands, or hand-mined from
   `reports/coa-specs/research-v3/digests/<class>.json` (full descriptions with formulas)
   until then. Every number on a seal or strip must trace to the digest or a claim.
3. The breadth pass is NOT a dependency. Classes land one at a time; the crest seat yields
   per class as each seal ships.

## THE PER-CLASS UNIT (one class = one round)

1. **Engine paragraph** (§1 shape): serif-italic lede naming the engine, then 1–3 plain
   sentences with the loop and the tension. It must teach the seal's threshold words right
   above the seal (the HOLD/CROSS pattern). Cross-spec generalizations need claims for
   EVERY spec, or the paragraph says the split honestly (Guardian: "no shared engine").
2. **Seal**: unique geometry; engine name at center; the ONE tension encoded with its real
   numbers; one node per spec.
3. **Verbs**: one word per spec — its relation to the engine — plus a gloss that stands
   alone without the seal. Glosses need claim backing (Convert was confirmed near-verbatim).
4. **Strips**: one topology per spec that has evidence for one; specs without stay dashed.
5. **Phone variants**: the seal tightened to the 420×224 arrangement, detached plate below
   the masthead; each strip gets an authored-to-fit S2 redraw (fewer labels, full width,
   no scroll).
6. **✦ rare facts**: only computable roster facts, via the shared `factsFor` — never
   hand-written counts (the Cultist "four playstyles" line died this way).

## SEAL RULES (binding, from §2)

- ViewBox ~420×260 (the col-slot ratio); nothing letterboxes.
- No node label may collide with another node; verify at the authored ratio.
- Node click selects the spec card; selected node and card glow in the SAME tone.
- The glow is the lightened class color: `color-mix(in srgb, var(--class-color) 58%, white 42%)`.
  The raw class color is wrong.
- Geometry is unique per class; placement and interaction are shared. The seal is the
  phone spec switcher.

## STRIP RULES (binding, from §4)

- Phase labels in familiar WoW terms (BUILD / HOLD / BURST WINDOW / REBUILD); class flavor
  lives in sub-labels and window contents.
- Every strip ships with "**How to read it:**" (1–2 plain sentences) and "**Where your
  eyes live:**" (one sentence, second person).
- Evidence label on every strip: "names: Data · shape: Inference".
- Reuse the seal's tension vocabulary where true (Godblade's strip draws the hold/cross
  lines).
- Screen cards are optional, behind the 👁 experimental toggle with its warning, only
  where a config was authored.

## COPY RULES (from §8, the ones that bite here)

- Stylized phrase introduces; plain language explains.
- Verb ≤ one word; gloss stands alone. Card fragments ≤ ~40 chars, authored to fit.
- Never invent: engine claims, glosses, topologies all trace to digests or claims, or the
  surface shows its gap.

## CADENCE (RULED 2026-08-10 — confirmed at round 1, Knight of Xoroth)

One class per round. The geometry language is established, so a round is: one proposed
seal + verbs + strips, rendered LIVE on the class page (the site is the render target
now), user verdict, corrections re-mocked cheaply. Full 2–3-direction rounds return only
if a class resists its first reading. Record each class's rulings as new grammar rows.

## VERIFICATION, EVERY CLASS

1. Label-collision check at the authored ratio.
2. Screenshots at 1280 AND via the 390px iframe harness (desktop headless lies below
   ~500px; `/mnt/c` writes reach WSL late — wait, don't rerun).
3. Deploy via `tools/deploy_coa_site.py`; the user verifies on their phone.
4. A grammar row + session-log entry per class, with the user's words.

## EXEMPLARS

- Seals: `class-diagram-study.js` (`seal()` for Cultist, the Tinker block) — ported into
  the site's class page.
- Strips: Godblade (spike), Corruption (wave), Demolition (stack) in the site source;
  S2 phone redraws per the session-2 artifact.
- The digests carry the numbers: e.g. "Cycle of Despair consumes both at 20 stacks",
  "Hellfire Form lasts 15 seconds", "Gore has two charges with an eight-second recharge".
