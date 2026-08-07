# CoA design & content roadmap

Living plan for everything queued beyond the current session. Written 2026-08-07 at the close of
the class-page dialogue (sessions 2–3). Update this file as items land or reorder; it is the
one place that answers "what were we going to do next?"

Authority note: entries here are plans, not rulings. Rulings live in the grammar contracts
(`class-page-grammar.md`, and `atlas-page-grammar.md` once the Atlas session creates it).

## NOW

| Item | Where | State |
|---|---|---|
| Atlas design session (session 4, 2026-08-07) | This repo | **CLOSED, all landed.** Eight rounds; the class card finished ("they look fantastic"). Rulings in `atlas-page-grammar.md`; assembly `atlas-v2.html`; interim map `starmap.html`. The bit-by-bit round cadence is now the standing process (contract in the session-5 handoff) |
| Design session 5: Choose page + spec-profile modal | This repo, briefed in `choose-profile-design-handoff.md` | Handoff ready. Kickoff line at its bottom. Less pointed by design; jobs: "find my class" visual pass, and the profile modal (slim it vs port the class page into it vs remove) |
| Five-class research pilot (cultist, tinker, witch-hunter, guardian, knight-of-xoroth) | Main repo, worktree `coa-picker-pilot`, branch `work/2026-08-07-coa-picker-pilot` | In flight, separate session. Its outputs unblock half this file |

## NEXT (design track, in order)

1. **Session 5 (handoff ready): Choose page pass + the spec-profile modal question.** Choose is
   unblocked — scoring is ruled and Sol-approved; this is visual language. The modal question:
   today's spec profile duplicates the future class page; slim it, port the class page into it,
   or drop it.
2. **Desktop echo pass.** Carry the session-3 rulings to desktop: plain-text role line, corner
   video thumb (at the text column's right edge — the seal owns the far right), engine styling.
   Plus the shipped-Atlas tagline swap (the old premise line still shows there; recorded divergence).
3. **Guided Verdict pass. Deliberately LAST.** Guided renders v3 evidence, so a redesign before the
   pilot imports means doing it twice. Also waits on the Anatomy merge (below).

## BLOCKED — waiting on the pilot's research

- **Granular class-page details:** endgame folds, leveling story, PvP, and friends. FROZEN by user
  ruling 2026-08-07 — the research will change them.
- **Per-class authoring at scale** (`class-page-grammar.md` §9, ×21): taglines, engine paragraphs,
  seals, verbs + glosses, cadence strips (desktop + S2 phone variants), rare-part bullets.
- **Anatomy extension past the three Guided pilot classes** (main repo) — grammar is ready,
  data is the constraint.
- **Six style axes per spec** (Damage · Burst · Sustain · Control · Mobility · Utility) — research
  ask from the Atlas map deferral, ruled 2026-08-07. Today's evidence coverage: Control 10/70,
  Mobility 31/70, Sustain 38/70. The draft rules and evidence bar live in `map-study-3.html` and
  `atlas-page-grammar.md` §5. Unblocks the game-language identity map (deferred, not dead); the
  family starmap (`starmap.html`) holds the interim.

## BLOCKED — waiting on a main-repo merge

- **The Anatomy branch** (`work/2026-08-06-coa-guided-production`, 2 commits) is still unmerged into
  `work/quest-hint-prototype`. It must merge before:
  - the **shipped-site slice** that carries the class-page redesign (chrome, masthead, seal, sheet,
    strips, tagline) from this study into production — otherwise the CSS forks;
  - the Guided pass implementation.

## DATA VERIFICATION QUEUE (for the research track)

- **Chronomancer/Time's `Hybrid` range tag** (surfaced 2026-08-07 in the Atlas session): the kit
  text shows a wand/temporal healer with no visible melee element. Verify against research-v2
  sources; if wrong, the fix belongs upstream — the explorer pipeline passes `range` through
  verbatim (`build_explorer_data.py:347`).

## COPY & APPROVAL QUEUE (small, user-facing)

- Research-confirm two engine flags: "strong enough to fuel your kit" (fallback recorded:
  "steady power you ride, not spend") and Heretic's Insanity relation.
- User approval pass on the 7 advisor-draft card blurbs + ✓/✕ fragments (`rhythm-study.js`).
- Author Tinker's rare-part ✦ bullets from computable roster facts (rule: no fact, no bullet).
- Confirm the seal ratio standing rule (420×260 desktop / 420×224 phone arrangement).

## FURTHER OUT (not yet planned in detail)

- The 16-class research run — explicitly unapproved until the pilot's numbers are in.
- "Not yet researched" picker treatment surfacing in the site once picker data integrates.
- Choose-to-Guided integration — deferred by standing ruling until validated v3 relationships
  exist beyond the three pilot classes.

## POINTERS

- Rulings: `class-page-grammar.md` (this repo) — the binding record, with session log.
- Next session brief: `atlas-map-design-handoff.md` (this repo).
- Dialogue artifact (mockups, sessions 2–3): https://claude.ai/code/artifact/ca1349bc-2fcb-43d5-8834-994aa3b5e05e
- Deployed study: https://blakedonn.github.io/coa-class-mockups/rhythm-class.html?c=cultist
- Shipped site deploy checkout: `C:\Users\17274\Worktrees\coa_classes` (Pages).
- Main-repo handoffs live in `docs/plans/` on `work/quest-hint-prototype`.
