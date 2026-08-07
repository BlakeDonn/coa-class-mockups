/* Identity card study, round 5: engine blurb, computed ✦ facts, role-coupled doors.
   Taglines/engine blurbs: Cultist authored; four pilot-class ADVISOR DRAFTS (approval
   required). Every ✦ fact is computed from the roster — no fact, no bullet. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY;
  if (!R || !S) throw new Error("explorer-data, profile-render and atlas-study must load first");
  const { data, specById, esc } = R;
  const classes = S.classes;

  // ---------- authored + drafted copy (pilot five) ----------
  const TAGLINES = {
    "Cultist": { t: "The whispers offer power. Will you listen?", kw: "whispers", draft: false },
    "Tinker": { t: "Build it. Deploy it. Keep the workshop running.", kw: "workshop", draft: true },
    "Witch Hunter": { t: "The hunt is holy. The tools are not.", kw: "hunt", draft: true },
    "Guardian": { t: "Hold the line. The line holds everyone.", kw: "line", draft: true },
    "Knight of Xoroth": { t: "Damnation rides with you.", kw: "Damnation", draft: true },
  };
  const ENGINES = {
    "Cultist": { lab: "The engine — Insanity", p: "Every Cultist runs on Insanity, and it climbs as you act.", draft: false },
    "Tinker": { lab: "The engine — Scrap", p: "Every Tinker runs on Scrap: gunfire in, machines out.", draft: true },
    "Witch Hunter": { lab: "The engine — three fuels", p: "Each spec burns its own fuel: Rage, Shadow Brands, or Stamina.", draft: true },
    "Guardian": { lab: "The engine — formations", p: "No resource bar. Formations and timing are the engine.", draft: true },
    "Knight of Xoroth": { lab: "The engine — Rage", p: "Every Knight runs on Rage, fed by demons and wounds.", draft: true },
  };
  const GROUNDING = {
    "Tinker": "Mechanics: “converts gunfire into Scrap”; grammar §8's own workshop exemplar",
    "Witch Hunter": "Inquisition/Black Knight fantasies; resources Rage · Shadow Brand · Stamina (data)",
    "Guardian": "All three fantasies center formations/shield-wall; roster shows no class resource",
    "Knight of Xoroth": "Mounted infernal spellblade; Defiance “feeds Rage”, War stacks wounds (data)",
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
    const distinctRoles = [...new Set(c.specs.flatMap(s => s.roles))];
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
  // WoW icon art (round 8): verified live in the zamimg icon namespace. The literal LFG
  // atlas trio is not publicly hosted; these carry the same visual language.
  const ROLE_ICON = { Damage: "ability_dualwield", Tank: "ability_defend",
    Healer: "spell_chargepositive", Support: "inv_banner_02" };
  const roleImgs = roles => `<span class="rimg" data-tipname="${esc(roles.join(" + "))}"
    data-tip="${esc("Role" + (roles.length > 1 ? "s" : "") + ": " + roles.join(", "))}">${roles.map(r =>
    `<img src="https://wow.zamimg.com/images/wow/icons/medium/${ROLE_ICON[r]}.jpg" alt="${esc(r)}">`).join("")}</span>`;

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
  const MICRO = {
    "cultist/corruption": "rot on every target",
    "cultist/dreadnought": "madness held steady",
    "cultist/heretic": "violence becomes healing",
    "cultist/godblade": "courts madness for burst",
    "tinker/demolition": "everything explodes at once",
    "tinker/invention": "gadgets keep allies standing",
    "tinker/mechanics": "gunfire feeds the machines",
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
  const state = { engine: "blurb", doors: "icons", corner: "video" };
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
      <p style="color:#83888f;font-size:11px;margin:10px 0 0">Four drafts need your yes/no (or edits).
      Every ✦ fact line is computed live from the roster and needs no approval — hover one to see its
      fact. The other sixteen classes get taglines and engines in the ×21 authoring pass.</p></div>`;
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

  window.COA_CARD2 = { composeCard, factsFor, cleanResource, TAGLINES, ENGINES };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("liveGrid")) init();
})();
