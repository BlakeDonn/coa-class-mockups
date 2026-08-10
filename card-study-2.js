/* Identity card study, round 5: engine blurb, computed ✦ facts, role-coupled doors.
   ×21 taglines + engines and ×70 archetype tags completed 2026-08-10 under the user's
   blanket ruling. Pilot-five engines corpus-verified against the LANDED v3 corpus; the
   16 new classes are grounded in the CANDIDATE corpus (unlanded — re-verify on landing).
   Every ✦ fact is computed from the roster — no fact, no bullet. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY;
  if (!R || !S) throw new Error("explorer-data, profile-render and atlas-study must load first");
  const { data, specById, esc } = R;
  const classes = S.classes;

  // ---------- authored copy, all 21 classes ----------
  // ×21 pass executed 2026-08-10 under the user's blanket ruling ("you don't need my
  // approval, go ahead and implement all 21 classes based on our research data").
  // Pilot-five evidence: the LANDED v3 corpus. The 16 new classes: the CANDIDATE corpus
  // (unlanded 16-class worktree, audit in progress) — re-verify on landing.
  // draft:true = verbiage not yet eyeballed by the user; evidence grounding is in GROUNDING.
  const TAGLINES = {
    "Cultist": { t: "The whispers offer power. Will you listen?", kw: "whispers", draft: false },
    "Tinker": { t: "Build it. Deploy it. Keep the workshop running.", kw: "workshop", draft: true },
    "Witch Hunter": { t: "The hunt is holy. The tools are not.", kw: "hunt", draft: true },
    "Guardian": { t: "Hold the line. The line holds everyone.", kw: "line", draft: true },
    "Knight of Xoroth": { t: "Damnation rides with you.", kw: "Damnation", draft: true },
    "Barbarian": { t: "Fury of the north, fed by ale and ancestors.", kw: "north", draft: true },
    "Bloodmage": { t: "Blood remembers what mana forgets.", kw: "Blood", draft: true },
    "Chronomancer": { t: "Undo is a class ability.", kw: "Undo", draft: true },
    "Felsworn": { t: "The demon inside is load-bearing.", kw: "demon", draft: true },
    "Necromancer": { t: "The dead work for you now.", kw: "dead", draft: true },
    "Primalist": { t: "The wild does not negotiate.", kw: "wild", draft: true },
    "Pyromancer": { t: "Everything burns. Some things burn twice.", kw: "burns", draft: true },
    "Ranger": { t: "Every step is part of the aim.", kw: "aim", draft: true },
    "Reaper": { t: "Everything owes you a soul.", kw: "soul", draft: true },
    "Runemaster": { t: "Power, spelled correctly.", kw: "spelled", draft: true },
    "Starcaller": { t: "The stars aim back.", kw: "stars", draft: true },
    "Stormbringer": { t: "Hold the charge. Not too long.", kw: "charge", draft: true },
    "Sun Cleric": { t: "Dawn breaks. So does everything else.", kw: "Dawn", draft: true },
    "Templar": { t: "An oath is a weapon you keep.", kw: "oath", draft: true },
    "Venomancer": { t: "Patience is a poison too.", kw: "poison", draft: true },
    "Witch Doctor": { t: "Pain, prepared properly.", kw: "prepared", draft: true },
  };
  const ENGINES = {
    "Cultist": { lab: "The engine — Insanity", p: "Every Cultist runs on Insanity, and it climbs as you act.", draft: false },
    "Tinker": { lab: "The engine — temporary machines", p: "A Tinker's power stands on the field, not on the action bar.", draft: false },
    "Witch Hunter": { lab: "The engine — Rage", p: "Every Hunter runs on Rage; each spec layers its own marks and stacks on top.", draft: false },
    "Guardian": { lab: "The engine — formations", p: "Formations set the stance; Energy, Motivation, and per-spec stacks do the work.", draft: false },
    "Knight of Xoroth": { lab: "The engine — Demonfire", p: "Every Knight runs on Demonfire, fed by demons and blood.", draft: false },
    "Barbarian": { lab: "The engine — Energy", p: "Every Barbarian runs on Energy; Enrage speeds the whole kit up.", draft: false },
    "Bloodmage": { lab: "The engine — blood", p: "The spells cost blood; spent health returns as Thirst and Rage.", draft: false },
    "Chronomancer": { lab: "The engine — Timewalking", p: "Timewalking stores a past self, and Rewind returns you to it.", draft: false },
    "Felsworn": { lab: "The engine — Felfury", p: "Build Felfury, spend it in pairs, and bank six to unleash Inner Demon.", draft: false },
    "Necromancer": { lab: "The engine — Life Force", p: "Life Force raises your undead; Runic Power gives them their orders.", draft: false },
    "Primalist": { lab: "The engine — Rage", p: "Every Primalist runs on Rage; one active Boon tunes how you earn and spend it.", draft: false },
    "Pyromancer": { lab: "The engine — Embers and Heat", p: "Every Pyromancer runs on two gauges: Embers to spend, Heat that climbs as you cast.", draft: false },
    "Ranger": { lab: "The engine — Advantage", p: "Every Ranger builds Advantage from basic attacks and spends it on scaled finishers.", draft: false },
    "Reaper": { lab: "The engine — the soul ladder", p: "Every Reaper climbs the same ladder: three Fragments to a Soul, three Souls to an Infusion.", draft: false },
    "Runemaster": { lab: "The engine — engravings", p: "Write first, release second: engravings on weapons, glyphs in sequence, brands on the target.", draft: false },
    "Starcaller": { lab: "The engine — Scattered Stars", p: "Every spec pins Scattered Stars onto enemies, then consumes them for its own payoff.", draft: false },
    "Stormbringer": { lab: "The engine — Static", p: "Static climbs as you cast: above 70 your spells supercharge, at 100 the storm turns on you.", draft: false },
    "Sun Cleric": { lab: "The engine — Dawn", p: "Solar Power builds between Dawns; inside a Dawn window your actions become Vows instead.", draft: false },
    "Templar": { lab: "The engine — Oaths", p: "Every Templar swears Oaths through strikes, then breaks them for the payoff.", draft: false },
    "Venomancer": { lab: "The engine — Venoms", p: "You keep two active Venoms; they trigger from your casts and strikes.", draft: false },
    "Witch Doctor": { lab: "The engine — Spirits", p: "Collected Spirits refund health and mana; each spec runs its own economy on top.", draft: false },
  };
  const GROUNDING = {
    "Cultist": "Authored; v3 confirmed 2026-08-10 — the 60-band “fuel your kit” claim held (3 of 4 specs evidence the mid-band)",
    "Tinker": "v3 ruled 2026-08-10: Scrap claims are Mechanics-only; machines span every spec (turrets+bombs, beacons, Mechsuit). Blurb reuses the class-page lede — the Cultist precedent",
    "Witch Hunter": "v3 ruled 2026-08-10: Rage in all four specs (“Regenerative Elixirs makes Tonics restore Rage” is class-wide); Stamina absent from the corpus",
    "Guardian": "v3 ruled 2026-08-10: blocks “restore Energy” (Raise Shield, Reprisal); “Motivating Strike grants Motivation”; Glory/Tempo/Paragon stack per spec",
    "Knight of Xoroth": "v3 ruled 2026-08-10: Demonfire generated in all three specs (Shieldgore, Seeking Flame, Gore); melee damage “generate[s] Demon's Blood”",
    "Barbarian": "v3: “Hodir's Wrath… establishing Energy as a shared Barbarian resource”; “Enrage reduces Barbarian ability global cooldowns”",
    "Bloodmage": "v3 class tree: “A shared health-cost spell interaction grants Thirst, and the Thirst effect generates Rage”",
    "Chronomancer": "v3: “Timewalking stores health, mana, and location in an Infinite Clone that Rewind can return to”",
    "Felsworn": "v3 shared entries: a spender “consumes two Felfury”; “At six Felfury, activating Inner Demon restores 50 Energy”",
    "Necromancer": "v3: “summon undead using Life Force… minion scaling is tied to the Life Force used”; “Command spells have Runic Power costs”",
    "Primalist": "v3: “Geode Barrage and Seismic Crash generate Rage”; Boons “alter melee Rage generation or spell costs and haste”; Rage claims in all four specs",
    "Pyromancer": "v3: “Lava Shard creates an Ember, while Ember Touch and Pyroclasm each consume one”; “Flare Bolt and Cinderheart generate Heat”",
    "Ranger": "v3 class claim: “Quick Shot and Wild Strike each generate Advantage, Precision Shot gains damage per Advantage stack”",
    "Reaper": "v3: “the class ladder converts three Soul Fragments into a Reaped Soul and three Reaped Souls into Soul Infusion”",
    "Runemaster": "v3: “Zenith raises Weapon Engraving trigger chance by 100%”; glyph sequences (Arcane) and Runic Brand marks (Runic) are the per-spec expressions",
    "Starcaller": "v3 class claim: stars applied by Cycle of the Moon and auto attacks, consumed by Lunar Lance; all four specs apply and consume stars",
    "Stormbringer": "v3: “Static enables Supercharged spell effects above 70%; reaching 100% stuns the caster and deals heavy damage”",
    "Sun Cleric": "v3: “Dawn turns damaging or healing actions into Vow Fulfillments and stops Solar Power generation during its active window”",
    "Templar": "v3: “Righteous Lunge grants an Oath, Blade of Faith consumes Oaths”; spenders are named Oath Breakers in all three specs",
    "Venomancer": "v3: “The shared Venom layer permits at most two unique active Venoms, whose effects can trigger from casts or harmful spells and abilities”",
    "Witch Doctor": "v3: “The shared kit can collect Spirits that regenerate health and mana”; spec economies on top: Threads, Spirits+Hunger, Ingredients",
  };

  // ---------- computed pieces ----------
  function cleanResource(c) {
    const res = [];
    for (const s of c.specs)
      for (const r of ((s.mech || {}).resources || [])) if (!res.includes(r)) res.push(r);
    return res.length === 1 ? res[0] : null;
  }
  const NWORD = { 3: "Three", 4: "Four" };
  const roleRangeTotal = (role, range) =>
    data.specs.filter(s => s.roles.includes(role) && s.range.includes(range)).length;
  const meleeHealersTotal = roleRangeTotal("Healer", "Melee");
  const meleeSupportTotal = roleRangeTotal("Support", "Melee");

  // Rarity rule: a bullet must be interesting, so common patterns rank low and the
  // playstyles line only appears when the jobs line hasn't already said it.
  function factsFor(c) {
    const out = [];
    // True-support rule (ruled 2026-08-09): the jobs counting ignores Support on specs
    // that also heal — same rule the subLines jobs line already applies. Doors untouched.
    const distinctRoles = [...new Set(c.specs.flatMap(s =>
      s.roles.filter(r => r !== "Support" || !s.roles.includes("Healer"))))];
    const distinctFams = [...new Set(c.specs.map(s => s.atlas))];
    const n = c.specs.length;
    const mh = c.specs.find(s => s.roles.includes("Healer") && s.range.includes("Melee"));
    if (mh) out.push(["Melee healer option", `${mh.name}: ${meleeHealersTotal} of 70 specs heal from melee range.`]);
    const ms = c.specs.find(s => s.roles.includes("Support") && s.range.includes("Melee"));
    if (ms && meleeSupportTotal <= 4)
      out.push(["Melee support option", `${ms.name}: ${meleeSupportTotal} of 70 specs support from melee range.`]);
    if (distinctRoles.length === 4) out.push([`Four specs, four different jobs`,
      `Roles across the specs: ${distinctRoles.join(", ")}.`]);
    if (c.specs.every(s => s.roles.length === 1 && s.roles[0] === "Damage"))
      out.push([`All ${(NWORD[n] || n).toLowerCase()} specs share one calling: damage`,
        `Every ${c.name} spec's only role is Damage.`]);
    if (c.specs.every(s => s.range.length === 1 && s.range[0] === "Melee"))
      out.push(["Every spec fights in melee", "No ranged or hybrid option anywhere in the class."]);
    if (c.specs.every(s => s.range.length === 1 && s.range[0] === "Ranged"))
      out.push(["Every spec fights from range", "No melee or hybrid option anywhere in the class."]);
    if (out.length < 2 && distinctRoles.length === 3 && n === 3)
      out.push([`Three specs, three different jobs`, `Roles: ${distinctRoles.join(", ")}.`]);
    if (!out.some(f => f[0].includes("jobs")) && out.length < 2 && distinctFams.length === n && n === 4)
      out.push([`Four specs, four different playstyles`,
        `Each spec sits in a different playstyle family: ${distinctFams.map(f =>
          (data.families.find(x => x.id === f) || { name: f }).name).join(", ")}.`]);
    return out.slice(0, 2);
  }

  // ---------- role coupling ----------
  const ICONS = { Damage: "⚔", Tank: "🛡", Healer: "✚", Support: "⚑" };
  const COLORS = { Damage: "#cf8484", Tank: "#7fb2ff", Healer: "#8fd6a0", Support: "#d9c27e" };
  // The real queue icons, HD (round 8, quality fix): 64px frames from WoW's
  // UI-LFG-ICON-ROLES texture (Gethe/wow-ui-textures mirror of the game's interface art).
  // Support = the texture's green flag (matching gold-rim style — the user's original ask);
  // the client's 16px leader crown remains the recorded alternative (lfg-leader.png).
  const ROLE_ICON = { Damage: "generated-assets/lfg-damage.png", Tank: "generated-assets/lfg-tank.png",
    Healer: "generated-assets/lfg-healer.png", Support: "generated-assets/lfg-flag.png" };
  const roleImgs = roles => `<span class="rimg" data-tipname="${esc(roles.join(" + "))}"
    data-tip="${esc("Role" + (roles.length > 1 ? "s" : "") + ": " + roles.join(", "))}">${roles.map(r =>
    `<img src="${ROLE_ICON[r]}" alt="${esc(r)}">`).join("")}</span>`;

  // Round-8 middle elements. Verbs/glosses: the authored set (class-page grammar §2).
  // Micro-words: ADVISOR DRAFTS for Cultist/Tinker only, grounded in researched text.
  const VERBS = {
    "cultist/corruption": ["Spread", "Keep damage-over-time on every target; the engine is coverage."],
    "cultist/dreadnought": ["Endure", "Hold Insanity in a managed band and turn it into survival."],
    "cultist/heretic": ["Convert", "Turn melee aggression into healing for the group."],
    "cultist/godblade": ["Cross", "Push Insanity to 100 on purpose and fight inside the dangerous payoff state."],
    "tinker/demolition": ["Detonate", "Stack explosives and machines, then fire them in one overlapping window."],
    "tinker/invention": ["Restore", "Deploy healing machines where the group will need them."],
    "tinker/mechanics": ["Overclock", "Push your machines and combat suit past their limits."],
  };
  // Archetype tags, RULED round 8. Authoring rule (user 2026-08-07): describe PLAYSTYLE,
  // not fantasy — lore nouns and flavor adjectives out, mechanics words in. Each tag still
  // traces to the spec's researched fantasy sentence.
  // ×70 pass completed 2026-08-10 (blanket ruling). 16-class tags trace to the CANDIDATE
  // corpus + roster fantasy; max length 28 chars (the phone-verified precedent).
  // Quarantine flags: chronomancer/artificer (fit), runemaster/riftblade (fit+role),
  // starcaller/moon-priest (role) — those tags rest on surviving rhythm/structural claims.
  const MICRO = {
    "cultist/corruption": "mobile DoT caster",
    "cultist/dreadnought": "retaliation shield tank",
    "cultist/heretic": "melee battle healer",
    "cultist/godblade": "2H burst bruiser",
    "tinker/demolition": "explosive burst engineer",
    "tinker/invention": "gadget field medic",
    "tinker/mechanics": "scrap-fueled combat engineer",
    "witch-hunter/boltslinger": "run-and-gun crossbow gunner",
    "witch-hunter/houndmaster": "pet pack marksman",
    "witch-hunter/black-knight": "tonic-switching parry tank",
    "witch-hunter/inquisition": "four-school burst caster",
    "guardian/vanguard": "shield-wall block tank",
    "guardian/inspiration": "tempo-stacking party buffer",
    "guardian/gladiator": "formation-switching duelist",
    "knight-of-xoroth/hellfire": "demon-form burst spellblade",
    "knight-of-xoroth/war": "2H wound-stack executioner",
    "knight-of-xoroth/defiance": "self-healing block tank",
    "barbarian/brutality": "2H execute bruiser",
    "barbarian/headhunting": "run-and-gun spear thrower",
    "barbarian/ancestry": "pet-partnered party buffer",
    "bloodmage/sanguine": "stack-banking burst caster",
    "bloodmage/accursed": "form-swapping burst brawler",
    "bloodmage/eternal": "life-leech avoidance tank",
    "bloodmage/fleshweaver": "atonement-style blood medic",
    "chronomancer/infinite": "self-feeding DoT caster",
    "chronomancer/artificer": "fragment-banking wand gunner",
    "chronomancer/time": "aeon-swapping blanket healer",
    "felsworn/slayer": "crit-cleave glaive fighter",
    "felsworn/infernal": "crit-chaining burn caster",
    "felsworn/tyrant": "dodge-to-armor leech tank",
    "necromancer/death": "disease-ramp execute caster",
    "necromancer/rime": "freeze-combo frost artillery",
    "necromancer/animation": "minion-army field commander",
    "primalist/primal": "pet-partnered bleed brawler",
    "primalist/geomancy": "state-upkeep stone caster",
    "primalist/life": "strike-to-heal party medic",
    "primalist/mountain-king": "proc-driven dual-wield tank",
    "pyromancer/incineration": "burn-banking burst caster",
    "pyromancer/flameweaving": "ember-banking burst healer",
    "pyromancer/draconic": "cooldown-cycling form caster",
    "ranger/farstrider": "horn-cycling party marksman",
    "ranger/archery": "long-range stack marksman",
    "ranger/brigand": "in-and-out bleed skirmisher",
    "reaper/harvest": "soul-stacking executioner",
    "reaper/soul": "hit-and-run stealth striker",
    "reaper/domination": "summon-backed sustain tank",
    "runemaster/runic": "brand-burst proc fighter",
    "runemaster/arcane": "combo-sequence glyph caster",
    "runemaster/riftblade": "fast-tempo upkeep skirmisher",
    "starcaller/moon-guard": "star-cycling block tank",
    "starcaller/moon-priest": "star-harvest area healer",
    "starcaller/sentinel": "star-detonating marksman",
    "starcaller/warden": "teleporting star skirmisher",
    "stormbringer/lightning": "turret-style burst caster",
    "stormbringer/wind": "ally-moving elemental buffer",
    "stormbringer/maelstrom": "channel-weaving stack caster",
    "sun-cleric/piety": "two-school swap caster",
    "sun-cleric/blessings": "vow-cycling blessing healer",
    "sun-cleric/seraphim": "instant-weaving block tank",
    "sun-cleric/valkyrie": "double-2H execute bruiser",
    "templar/zealot": "dual-wield combo fighter",
    "templar/oathkeeper": "damage-staggering parry tank",
    "templar/crusader": "whirlwind cleave fighter",
    "venomancer/venom": "field-infecting DoT caster",
    "venomancer/stalking": "mark-spending ambush fighter",
    "venomancer/fortitude": "hit-converting counter tank",
    "venomancer/vizier": "HoT-weaving form healer",
    "witch-doctor/voodoo": "damage-banking hex caster",
    "witch-doctor/brewing": "potion-combo area healer",
    "witch-doctor/shadowhunting": "run-and-gun spirit archer",
  };

  function doorsHTML(c, mode) {
    return `<div class="cl-specrows">${c.specs.map(s => {
      const roles = s.roles, range = s.range.join(" · ");
      if (mode.startsWith("wow-")) {
        const fam = data.families.find(f => f.id === s.atlas);
        const mid = mode === "wow-family"
          ? `<span class="mid famname" data-tipname="${esc(fam.name)}" data-tip="${esc(fam.tagline)}">${esc(fam.name)}</span>`
          : mode === "wow-words" && MICRO[s.id] ? `<span class="mid">${esc(MICRO[s.id])}</span>`
          : mode === "wow-verb" && VERBS[s.id]
            ? `<span class="vb" data-tipname="${esc(VERBS[s.id][0])}" data-tip="${esc(VERBS[s.id][1])}">${esc(VERBS[s.id][0])}</span>`
          : "";
        return `<button data-open="${s.id}">${roleImgs(roles)}<span class="nm">${esc(s.name)}</span>
          ${mid}<span class="rs">${esc(range)}</span></button>`;
      }
      if (mode === "icons")
        return `<button data-open="${s.id}"><span class="ri" data-tipname="${esc(roles.join(" + "))}"
            data-tip="${esc("Role" + (roles.length > 1 ? "s" : "") + ": " + roles.join(", "))}">${roles.map(r => ICONS[r]).join("")}</span>
          <span class="nm">${esc(s.name)}</span><span class="rs">${esc(range)}</span></button>`;
      if (mode === "edge")
        return `<button data-open="${s.id}" class="role-edge" style="border-left-color:${COLORS[roles[0]]}">
          <span class="nm">${esc(s.name)}</span>
          <span class="rs"><span class="rw" style="color:${COLORS[roles[0]]}">${esc(roles.join(" · "))}</span> · ${esc(range)}</span></button>`;
      return `<button data-open="${s.id}"><span class="nm">${esc(s.name)}</span>
        <span class="rs">${[...roles, ...s.range].map(esc).join(" · ")}</span></button>`;
    }).join("")}</div>`;
  }

  // ---------- the card, composed under the rulings ----------
  const videoId = c => {
    const s = c.specs.find(s => (s.media || {}).classVideo);
    return s ? s.media.classVideo : null;
  };
  function cornerHTML(c, mode) {
    if (mode === "video") {
      const id = videoId(c);
      if (!id) return "";
      return `<a class="cl-thumb" href="https://www.youtube.com/watch?v=${esc(id)}" target="_blank"
        rel="noreferrer" aria-label="${esc(c.name)} class highlight video">
        <img src="https://i.ytimg.com/vi/${esc(id)}/mqdefault.jpg" alt="" loading="lazy">
        <span class="play">▶</span><span class="cap">Class highlight</span></a>`;
    }
    if (mode === "glyph") return `<span class="cl-glyphmark" aria-hidden="true">${c.glyph}</span>`;
    return "";
  }
  // Ruled sub lines (round 7): jobs under the name via the true-support rule
  // ("Support" only when a spec supports without healing), range always on its own line.
  const RANGES = ["Melee", "Hybrid", "Ranged"];
  const JOBS = ["Damage", "Tank", "Healer", "Support"];
  function subLines(c) {
    const jobs = JOBS.filter(r => c.specs.some(s => r === "Support"
      ? s.roles.includes("Support") && !s.roles.includes("Healer")
      : s.roles.includes(r)));
    const ranges = RANGES.filter(r => c.specs.some(s => s.range.includes(r)));
    return `<div class="cl-sub">${jobs.map(esc).join(" · ")}</div>
      <div class="cl-sub cl-sub-range">${ranges.join(ranges.length > 2 ? " · " : " &amp; ")}</div>`;
  }

  function composeCard(c, o) {
    const tag = TAGLINES[c.name];
    const eng = o.engine === "blurb" ? ENGINES[c.name]
      : o.engine === "chip" ? (cleanResource(c) ? { lab: "The engine — " + cleanResource(c), p: null } : null)
      : null;
    const facts = factsFor(c);
    const corner = o.corner || "none";
    const medal = (S.crestFrame && S.crestFrame(c)) || c.glyph;
    return `<article class="plate cl-card${corner === "video" && videoId(c) ? " has-thumb" : ""}"
        style="--class-color:${c.color}">
      <div class="cl-top"><span class="cl-medal">${medal}</span><div><h3>${esc(c.name)}</h3>${subLines(c)}</div>
        ${cornerHTML(c, corner)}</div>
      ${tag ? `<div class="cl-tagline">${esc(tag.t).replace(esc(tag.kw), `<span class="kw">${esc(tag.kw)}</span>`)}</div>` : ""}
      ${eng ? `<div class="cl-engine${eng.p ? "" : " chip"}"><span class="lab">${esc(eng.lab)}</span>${eng.p ? `<p>${esc(eng.p)}</p>` : ""}</div>` : ""}
      ${facts.length ? `<ul class="cl-rare">${facts.map(f =>
        `<li data-tipname="${esc(f[0])}" data-tip="${esc(f[1])}"><span class="mark">✦</span>${esc(f[0])}</li>`).join("")}</ul>` : ""}
      <div class="cl-div"></div>
      ${doorsHTML(c, o.doors)}
    </article>`;
  }

  // ---------- paint ----------
  const el = id => document.getElementById(id);
  const state = { engine: "blurb", doors: "wow-words", corner: "video" };
  const DEMO = ["Cultist", "Witch Hunter"];

  function renderPairs() {
    document.querySelectorAll(".pair").forEach(p => {
      const o = { ...state, [p.dataset.piece]: p.dataset.variant };
      p.innerHTML = DEMO.map(n => composeCard(classes.find(c => c.name === n), o)).join("");
    });
  }
  function renderLive() {
    el("liveGrid").innerHTML = classes.map(c => composeCard(c, state)).join("");
  }
  function renderDrafts() {
    el("draftsBody").innerHTML = `<div class="inner"><table>
      <tr><th>Class</th><th>Tagline</th><th>Engine blurb</th><th>Grounding</th></tr>
      ${Object.keys(TAGLINES).map(k => `<tr><td>${esc(k)}${TAGLINES[k].draft ? "" : " (authored)"}</td>
        <td>${esc(TAGLINES[k].t)}</td><td>${esc(ENGINES[k].p)}</td>
        <td>${esc(GROUNDING[k] || "Ruled in the class-page grammar")}</td></tr>`).join("")}</table>
      <p style="color:#83888f;font-size:11px;margin:10px 0 0">All 21 classes carry authored
      taglines and corpus-grounded engine blurbs (×21 pass, 2026-08-10, blanket ruling). The
      16 new classes cite the CANDIDATE corpus — re-verify when it lands. Taglines marked
      draft await the user's verbiage read. Every ✦ fact line is computed live from the
      roster and needs no approval — hover one to see its fact.</p></div>`;
  }

  function openProfile(id) {
    const s = specById[id];
    if (!s) return;
    el("profileContent").innerHTML = R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  function init() {
    document.querySelectorAll("[data-pick]").forEach(group => {
      const key = group.dataset.pick;
      group.querySelectorAll("button[data-v]").forEach(b =>
        b.classList.toggle("active", b.dataset.v === state[key]));
      group.addEventListener("click", e => {
        const b = e.target.closest("button[data-v]");
        if (!b) return;
        state[key] = b.dataset.v;
        group.querySelectorAll("button[data-v]").forEach(x => x.classList.toggle("active", x === b));
        renderPairs(); renderLive();
      });
    });
    document.addEventListener("click", e => {
      if (e.target.closest(".ri") || e.target.closest(".cl-rare li") || e.target.closest(".rimg")
        || e.target.closest(".vb") || e.target.closest(".famname")) return; // tooltips, not doors
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });
    renderPairs(); renderLive(); renderDrafts();
  }

  window.COA_CARD2 = { composeCard, factsFor, cleanResource, TAGLINES, ENGINES, MICRO, roleImgs };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("liveGrid")) init();
})();
