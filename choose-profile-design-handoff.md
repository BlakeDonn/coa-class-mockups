# Handoff: Choose page + spec-profile dialogue (design session 5)

- **Session type:** user-launched detached Fable design dialogue, effort xhigh, advisor/sponsor
  rules. Deliberately LESS pointed than the Atlas handoff was — an open dialogue where the
  process finds the pieces. Nothing here touches the main repo or the shipped site.
- **Date written:** 2026-08-07, at the close of the Atlas session (rounds 1–8, all landed).

## THE PROCESS CONTRACT — the session-4 finding that matters most

The user corrected session 4's opening approach ("not as granular as what worked on the class
page") and then explicitly endorsed the corrected cadence. It is now the standing shape:

1. **One piece per round.** Never a page-wide pass.
2. **2–3 directions per piece**, the same subject rendered side by side, only that piece varying.
3. **Real data in every mock.** Drafts labeled as drafts; where evidence exists, quote it in the
   tooltip (the pip-why and archetype-extraction patterns).
4. **Variant stones + a live composed grid** so every pick is seen in full context instantly.
5. **Deploy every round** (push = Pages, ~2 min). Cache-bust changed assets with `?v=N` — a stale
   phone cache cost one round trip this session.
6. **Record the ruling the moment it lands** in the grammar file, with the user's words.
7. **Corrections are cheap and expected.** Re-mock, don't argue. Two "actually I meant…" turns
   produced the best pieces of the card (queue icons, archetype tags).

## JOBS — looser than last time; let the dialogue find the pieces

1. **"Find my class" — the Choose page pass.** Bring Choose under the design philosophy. Its
   scoring is user-ruled and Sol-approved; this is visual language and copy, not logic. Start by
   surveying what ships today (`choose.html` + `choose.js`).
2. **The spec-profile modal** (`profileDialog` / `profileHTML` in `profile-render.js`). Today it
   is a mini class page in a dialog. The user's framing, near-verbatim: it "may need some work or
   we get rid of it" — either a much slimmer quick-look so it stops duplicating the future class
   page, or the class page ports INTO the modal. Undecided by design — mock the registers and let
   the picks decide.
3. **Warm-up flags, if useful:** star-map placement (the masthead ghost button is a live
   proposal), and true-support propagation (the class page's ruled role line and the four-jobs
   ✦ facts still use the old counting).

## WAITING ON DATA — do not start these

- ×70 archetype-tag compression, ×16 taglines and engine blurbs, granular class-detail work:
  after the five-class pilot lands.
- The game-axes identity map: deferred; its spec is `map-study-3.html` + grammar §5.
- Crest rights confirmation: blocks the site slice only, nothing else.

## READ FIRST, IN ORDER

1. `atlas-page-grammar.md` — the full ruled contract from session 4 plus the open queue.
2. `class-page-grammar.md` — the parent philosophy; its §8 writing rules bind here too.
3. `design-roadmap.md` — the forward plan and verification queues.
4. Deployed, phone width too: https://blakedonn.github.io/coa-class-mockups/atlas-v2.html
   (the Atlas as ruled) and
   https://blakedonn.github.io/coa-class-mockups/rhythm-class.html?c=cultist (the locked class page).
5. `choose.html` + `choose.js` (the surface under study) and `profile-render.js` (the modal).

## WHERE (verified this session)

- Repo `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`; WSL sees it at
  `/mnt/c/Users/17274/Worktrees/_previews/coa-class-diagram-mockups`.
- WSL git commits with `-c user.name=blakedonn -c user.email=bdonne39@gmail.com`; push with
  `"/mnt/c/Program Files/Git/cmd/git.exe" -C '<repo>' push origin main`.
- LANDMINE: 11 site-copy files sit CRLF-flipped in the working tree (pure line-ending churn,
  not content). Stage files explicitly; never `git add -A` at the top level.
- `GODOT LAUNCH: no-godot`.

## TECHNIQUES PROVEN THIS SESSION

- **Sol legs from WSL:** `codex exec` works directly (see `sol-class-icon-hunt-brief.md` for the
  bounded-brief pattern). The crest hunt cost ~2 minutes and 62k tokens and found the sprite.
- **Fetcher blocks:** coabuildhub 403s plain fetchers but serves a browser user agent to curl.
- **Client asset extraction:** `mpyq` + Pillow read the Ascension client's MPQs at
  `/mnt/c/Ascension/Launcher/resources/ascension-live/Data` — direct path reads work without a
  listfile. HD WoW interface art: the Gethe/wow-ui-textures mirror on GitHub raw.
- **Color decisions:** run the dataviz palette validator; the 21 class colors are measured as
  non-separable (grammar §5 carries the numbers).

## KICKOFF (paste into the fresh session)

Read `choose-profile-design-handoff.md` in `C:\Users\17274\Worktrees\_previews\coa-class-diagram-mockups`
and run the design dialogue it describes, starting with the read-first list.
