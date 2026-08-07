# Sol web hunt: official CoA class icons

- **Session type:** bounded Sol leg (Codex, gpt-5.6-sol, medium), dispatched 2026-08-07 from the
  Atlas design session. Timebox: ~8 minutes of work.
- **Goal:** find official per-class icon or crest art for the 21 Conquest of Azeroth classes,
  publicly linkable, for use in the Atlas class cards.
- **Deliverable:** write `sol-class-icon-findings.md` in this directory. Format: a 3-line summary,
  then a table — class | best candidate URL | source | confidence (high/medium/low). Write NONE
  for a class with no candidate. Add one line on licensing/provenance risk. URLs and metadata
  only — do NOT bulk-download image sets.

## The 21 classes

Barbarian, Bloodmage, Chronomancer, Cultist, Felsworn, Guardian, Knight of Xoroth, Necromancer,
Primalist, Pyromancer, Ranger, Reaper, Runemaster, Starcaller, Stormbringer, Sun Cleric, Templar,
Tinker, Venomancer, Witch Doctor, Witch Hunter.

## Verified facts (do not re-derive)

- `coabuildhub.com` returns 403 to plain fetchers but **200 with a browser user agent**
  (`curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) ..."`). Network access works from this box.
- Ability icons are already public at `https://coabuildhub.com/skill-icons/<name>.jpg`.
- `https://coabuildhub.com/class-icons/<slug>.jpg` guesses return 404.
- `ascension.gg/en/features/new-wow-classes-coa` shows ~21 class images but behind hashed
  `assets.ascension.gg/uploads/<uuid>.webp` URLs with no readable names.
- The game ships custom class icons (confirmed by marketing copy), so real assets exist somewhere.

## Suggested probes, in order

1. Fetch `coabuildhub.com` HTML with the browser UA. Find its JS bundle URLs. Grep the bundles for
   class asset paths, API routes, or an icon manifest (search for class names, "class", "crest",
   "icon" path fragments). The builder UI almost certainly renders class icons from somewhere.
2. `project-ascension.fandom.com` — search for class pages or icon files (Fandom image URLs are
   public and hotlinkable). Try `Special:Search` for two or three class names.
3. `conquest-of-azeroth-wiki.wiki` classes pages — check what images they use and from where.
4. `features.ascension.gg/play-coa` — inspect img tags for alt text or ordering that maps the
   hashed gallery images to class names.

## Rules

- Cite the exact URL you checked for every claim. An unverified guess is marked as such.
- If nothing clean exists, say so plainly — the fallback (in-data ability icons) is already built.
- Do not edit any other file in this repository.
