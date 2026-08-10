# Question packet: style axes — what's cached, what needs refetching

- **Status:** advisor findings + a proposal from the design track (session 5, 2026-08-10).
  NOT binding. Hand to a dedicated research session; it decides routing and scope there.
- **The question it answers:** did the picker focus discard good info, and would a broader
  refetch be needed for sustain / tankiness / mobility / control / burst / PvP?

## FINDINGS — what is actually cached (verified on disk 2026-08-10)

1. **Community text is NOT cached.** `sources.json` stores url + claim-level paraphrase only
   ("Third-party content; url and claim-level paraphrase only"). `capture_reddit.py` freezes
   TIMESTAMPS, not content ("Freeze a timestamp for every url"). Whatever the researchers read
   beyond the picker dimensions did not survive into any artifact. Re-mining old threads means
   re-reading them live. The timestamp cache makes date verification free on a re-read; the
   Reddit spacing cost applies to content fetches only.
2. **The kit digests ARE cached, in full.** `reports/coa-specs/research-v3/digests/<class>.json`
   holds every skill and talent with complete descriptions and formulas (Cultist alone: 132
   skills + 196 talents, e.g. "dealing 21+ShaP*0.5+AP*0.2 Shadow damage to enemies or healing
   allies…"). This is Data-tier mechanical truth, already on disk, for all classes present.
3. **Measured axis signal in the claim corpus** (21 classes, 386 claims, unlanded worktree):
   specs with any signal of 70 — PvP 9 · Burst 9 · Sustain 10 · Tankiness 16 · Mobility 17 ·
   Control 17 · Utility 23. The corpus is picker-shaped; it cannot fill a six-axis map.

## PROPOSAL — three tiers, cheapest first

1. **Kit-derivation pass over the digests. No refetch, no Reddit cost.** Derive per-spec axis
   values from ability facts: self-heals and leech → Sustain; absorbs, blocks, mitigation →
   Tankiness; movement effects → Mobility; stuns, slows, taunts, pulls → Control; timed
   forms and windows → Burst; ally-affecting effects → Utility. Data tier; claims corroborate.
   This alone may meet the identity map's bar ("unknown is not zero" still governs gaps).
2. **Optional: re-read the already-cited urls with a broader extraction prompt.** The url set
   is known and timestamped; the picker audit already vetted the sources. Yields Players-tier
   color on top of tier 1. Real fetch cost; decide after seeing tier-1 coverage.
3. **PvP: genuinely new capture, or nothing.** Kits cannot tell PvP viability, and the corpus
   holds 11 PvP claims. Defer until the map question is live and tier 1 has landed.

## WHAT THE DESIGN TRACK NEEDS BACK

Per spec, six values (or honest gaps) with provenance tiers — the shape `map-study-3.html`
and `atlas-page-grammar.md` §5 already specify. The map stays DEFERRED until then; the family
starmap remains the interim by standing ruling.

## SECOND QUESTION: THE CLASS-PAGE FOLDS (added 2026-08-10, same measurement pass)

The folds (Endgame contexts, Leveling story, PvP, Mechanics in detail, How it fails, What
players say, Performance, Evidence & gaps) render from the v2 enrichment. Measured:

1. **v2 coverage is COMPLETE, not thin.** All 70 specs carry every fold: endgame contexts
   70/70, pvp 70/70, leveling bands 70/70, mechanics loop 70/70, failure modes 70/70,
   sentiment 70/70. The thin rows: conflicts/known issues 5/70, DPS entries 62/70, verified
   spec guides 4/70.
2. **But the provenance doesn't discriminate.** Context sections carry blanket three-tier tags
   (every endgame/leveling/pvp feel is tagged Data AND Players AND Inference — 140/140/140,
   210/210/210, 70/70/70). Failure modes lean Inference (208 inference vs 142 data tags).
   Sentiment alone is genuinely sourced (players 141, inference 41, data 0). So the folds are
   full of synthesis whose per-item evidence quality is unmeasurable from the tags.
3. **What v3 + digests can refresh, per fold:** Mechanics in detail → hardened to Data tier
   from the digests (full formulas on disk). What players say / How it fails → replace or
   corroborate with provenance-hard claims. Leveling story → the corpus's strongest signal
   (33/70 specs). Endgame contexts → partial corroboration. Guides → the audited adopted set
   (12 for the pilot five) supersedes v2's 4 verified. **PvP → v3 can verify almost nothing
   (9/70); the fold survives on honest labeling or gets its own capture, same decision as the
   PvP axis above.**

ASK: when the corpus integrates into the site data, decide per fold: replace, corroborate, or
keep-with-tier-downgrade. The design track freezes granular fold work until that integration
(standing ruling 2026-08-07); it needs the per-fold verdicts to unfreeze.

## ADDENDUM 2026-08-10 — asks for the DATA-ADOPTION session (from the user + design track)

1. **Validate the playstyle-family assignments against v3** (user ask). The `atlas` family per
   spec is v2-era editorial; the corpus now carries rhythm_payoff dimensions per target. Check
   every spec's family against its landed claims; propose moves where they disagree. Design
   note: the Cultist card's "four playstyles" ✦ fact already fell to a family fact
   (Godblade and Corruption both sit in `setup`) — family correctness is now user-visible.
2. **Engine-blurb audit, class level** (user-flagged via Chronomancer). The ×21 Atlas engine
   blurbs are cited, but citation is not weighting: Chrono's blurb leans on the shared
   Timewalking/Rewind claim while the spec loops run on other economies (Infinite: DoT ramps
   via Melt Reality/Anomaly Spikes; Artificer: Echo Fragments; Time: Aeons/Epoch). User:
   "the engine of chrono is a kinda weak point… the rewind isn't that significant." Re-derive
   each class's engine identity from kit digests + claims; where no shared engine exists,
   say so Guardian-style ("each spec runs its own clock"). Fix candidates route to the copy
   lane for rulings.
3. **Fold verdicts** (standing ask above): per fold, replace / corroborate / downgrade.
4. **Quarantine awareness:** six dimensions landed quarantined (artificer, inspiration,
   defiance fit; war rhythm; riftblade fit+role; moon-priest role) — nothing may rest on
   them. Chronomancer is data-soft generally (also the standing Time `Hybrid` range check in
   `design-roadmap.md`).
5. **The live site is now the render target.** The ruled design shipped 2026-08-10; data
   integration lands into `reports/coa-specs/site/` (main repo) and deploys via
   `tools/deploy_coa_site.py`. Gap states absorb missing fields; no layout work needed.

## POINTERS

- Digests: `reports/coa-specs/research-v3/digests/` (main repo, landed).
- Corpus + readiness: `candidates/` (landed five; full 21 in the `coa-picker-16class`
  worktree, unlanded, read-only).
- Map spec and evidence bar: `map-study-3.html` + `atlas-page-grammar.md` §5 (mockups repo).
- Fold renderers: `profile-render.js` (mockups repo) — the field shapes the site consumes.
