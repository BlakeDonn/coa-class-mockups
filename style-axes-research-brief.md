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

## POINTERS

- Digests: `reports/coa-specs/research-v3/digests/` (main repo, landed).
- Corpus + readiness: `candidates/` (landed five; full 21 in the `coa-picker-16class`
  worktree, unlanded, read-only).
- Map spec and evidence bar: `map-study-3.html` + `atlas-page-grammar.md` §5 (mockups repo).
