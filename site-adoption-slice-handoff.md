# Handoff: the site-adoption slice — the ruled design onto the LIVE site

- **What this is:** a sponsor-tier candidate brief from the design track (Fable, 2026-08-10).
  It is main-repo work: paste the kickoff into a WORK session (Opus holder) and route it
  through /slice. The detached design session does not execute it.
- **The user's direction, near-verbatim:** "I just want our live site to be what's getting
  updated, so we're not fighting with mockup pages… I just want the bones built out so when
  we bring in our data from the 21 classes it just works on our live page."
- **Consequence:** the mockup-round cadence ENDS. The mockups repo becomes a reference lab;
  every further design change lands on the live site source.

## THE TARGET

Live site source: main repo `reports/coa-specs/site/` (+ its `build_*.py` pipeline, which
generates `explorer-data.js`). Deploy copy: `C:\Users\17274\Worktrees\coa_classes` (Pages,
via its deploy script). The slice updates the SOURCE; deploy follows the existing script.

## SCOPE — the bones, with honest gap states; NO per-class authoring required to ship

1. **Chrome (§6b, all shells):** the single sticky icon row on phone (⚜ ◈ ✦ ⚔, tiny
   always-visible labels); desktop keeps the labeled tabs.
2. **Class page** (the heart of the slice): ruled masthead order (name · tagline · engine ·
   plain-text strict role line) · the ×21 authored tagline + engine blurb as interim text
   (advisor recommends `eng`: premise replaced — decision point 3) · G2 crest seat where no
   seal exists (RULED) · Cultist/Tinker keep their seals · T1 corner video thumb · airfam
   spec cards with verb-chip slots (chips render only where authored) · the rhythm fold's
   dashed honest gap · pip tooltips.
3. **Atlas:** classes-first standing toggle · the closed 21-card (crest · tagline · engine ·
   ✦ computed facts · queue-icon doors with archetype tags where drafted · video corner) ·
   pip tooltips on spec cards · the ruled Cultist tagline replaces the old premise there
   (closes the recorded divergence).
4. **Choose:** B honest-icon questions · M2 results (full Atlas card, "you will probably
   like X") · E1 bare entry · chips kept.
5. **Spec-profile modal:** the LOCKED P1 slim register (name-row chip, × corner reserved).
6. **One authored-copy module:** extract TAGLINES / ENGINES / MICRO / card blurbs / verbs
   from the study JS into a single `authored-copy.js` the site imports. Single source; the
   copy session's future edits land there. (Coordinate: the copy session currently owns
   `card-study-2.js` — extract AFTER it closes, or hand it the extraction.)
7. **Assets:** the LOCAL crest sprite (`class-icons.v2.webp` — v1 died upstream; never
   hotlink the hub again), the HD queue icons, subject to decision point 2.

## DATA RULES

- The bones render today's v2 `explorer-data.js` unchanged and must not assume v3 fields.
- The v3 claim corpus (21 classes, landed on `main`) integrates LATER via the research
  lane's fold verdicts (`style-axes-research-brief.md`); the design bones must accept that
  refresh without layout change — gap states already cover every absent field.
- Absent, never invented: unauthored slots render their honest gap, never placeholders.

## DECISION POINTS (the planner-question gate must surface these)

1. **The Anatomy-merge ordering** (recorded blocker, 2026-08-07: merge
   `work/2026-08-06-coa-guided-production` first or accept the CSS-fork risk) — Sol-lane
   ruling; the user has signaled priority is the live site.
2. **Crest rights:** ship the crests now (fan-site risk accepted) or ship the glyph/ability
   fallback until rights confirm.
3. **Interim masthead text:** `eng` (authored tagline + blurb replace the premise) is the
   advisor recommendation; `both` and `ship` were mocked (`adoption-study.html` round 2).
4. **Mockup repo status:** reference lab only, or archived after the slice lands.

## REFERENCE — the proven end states (all deployed, all user-verified)

- Class page: https://blakedonn.github.io/coa-class-mockups/rhythm-class.html?c=cultist
  (authored) and `?c=reaper&m=eng` (adopted-bones state).
- Atlas: https://blakedonn.github.io/coa-class-mockups/atlas-v2.html
- Choose flow: https://blakedonn.github.io/coa-class-mockups/choose-study-3.html (Play it)
- Modal: https://blakedonn.github.io/coa-class-mockups/profile-study.html
- Rulings: `class-page-grammar.md` · `atlas-page-grammar.md` · `choose-page-grammar.md`
  (mockups repo). Standing practice: verify every page at 1280 AND in the 390px iframe
  harness before deploy (desktop headless lies below ~500px).

## KICKOFF (paste into a WORK session, not a design session)

Read `site-adoption-slice-handoff.md` in
`C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups` and run it through /slice:
adopt the ruled design system into the live site source at `reports/coa-specs/site/`, bones
first with honest gap states, decision points to the user before implementation.
