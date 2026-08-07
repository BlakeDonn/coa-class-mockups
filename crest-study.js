/* Class crest study, round 7: pick each class's identity ability icon; try the sub line.
   Candidates are the class's own researched ability icons; unverified art renders dim. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY;
  if (!R || !S) throw new Error("explorer-data, profile-render and atlas-study must load first");
  const { esc } = R;
  const classes = S.classes;

  const ROLES = ["Damage", "Tank", "Healer", "Support"];
  const RANGES = ["Melee", "Hybrid", "Ranged"];
  const state = { sub: "roles" };
  let verified = {};
  const picks = {}; // class name -> icon entry | { official: true }

  // Official class-crest sprite found by the Sol hunt (sol-class-icon-findings.md):
  // 21 frames, 5% steps, roster order. Fan-hub asset — rights unconfirmed for shipping.
  const SPRITE = "https://coabuildhub.com/icons/class-icons.v1.webp";
  const CREST_POS = { "Barbarian": 0, "Witch Doctor": 5, "Felsworn": 10, "Witch Hunter": 15,
    "Stormbringer": 20, "Knight of Xoroth": 25, "Guardian": 30, "Templar": 35, "Bloodmage": 40,
    "Ranger": 45, "Chronomancer": 50, "Necromancer": 55, "Pyromancer": 60, "Cultist": 65,
    "Starcaller": 70, "Sun Cleric": 75, "Tinker": 80, "Venomancer": 85, "Reaper": 90,
    "Primalist": 95, "Runemaster": 100 };
  const crestFrame = c => `<span class="crest-frame" style="background:url('${SPRITE}') ${CREST_POS[c.name]}% 0 / 2100% 100% no-repeat"></span>`;

  function candidates(c) {
    const seen = new Map();
    for (const s of c.specs)
      for (const e of (s.media.icons || []))
        if (e.icon && !seen.has(e.icon)) seen.set(e.icon, { ...e, spec: s.name });
    return [...seen.values()];
  }
  const defaultPick = c => c.name in CREST_POS ? { official: true }
    : (candidates(c).find(e => verified[e.icon]) || candidates(c)[0] || null);
  const videoId = c => {
    const s = c.specs.find(s => (s.media || {}).classVideo);
    return s ? s.media.classVideo : null;
  };

  // True-support rule (user, 2026-08-07): "Support" appears only when a spec supports
  // WITHOUT healing — otherwise every healer class would wear the word.
  const classRoles = c => ROLES.filter(r => c.specs.some(s => r === "Support"
    ? s.roles.includes("Support") && !s.roles.includes("Healer")
    : s.roles.includes(r)));

  function subLine(c) {
    if (state.sub === "none") return "";
    const ranges = RANGES.filter(r => c.specs.some(s => s.range.includes(r)));
    const rangeTxt = ranges.join(ranges.length > 2 ? " · " : " & ");
    if (state.sub === "count")
      return `<div class="cl-sub">${c.specs.length} specs — ${esc(rangeTxt)}</div>`;
    return `<div class="cl-sub">${classRoles(c).map(esc).join(" · ")} — ${esc(rangeTxt)}</div>`;
  }

  const SUB_NOTES = {
    roles: `<b>S1 · Jobs & range.</b> What the class can be, under the true-support rule: "Support"
      appears only when a spec supports without healing. Five classes carry it — Barbarian,
      Stormbringer, Guardian, Ranger, Sun Cleric. Healers no longer wear the word for free.
      Cultist now reads "Damage · Tank · Healer — Melee & Ranged".`,
    count: `<b>S2 · Spec count & range.</b> "4 specs — Melee & Ranged". Leaner, but it half-revives
      the dropped kick line and the doors already show the count.`,
    none: `<b>S0 · No sub line.</b> The ruled status quo — the name stands alone and the doors carry
      everything.`,
  };

  const el = id => document.getElementById(id);

  function crestBlock(c) {
    const p = picks[c.name];
    const vid = videoId(c);
    const medal = !p ? c.glyph : p.official ? crestFrame(c)
      : `<img src="https://coabuildhub.com/skill-icons/${esc(p.icon)}.jpg" alt="">`;
    const pickName = !p ? "—" : p.official ? "Official class crest (build hub)" : esc(p.name);
    return `<article class="plate cl-card cr-block" style="--class-color:${c.color}" data-cr="${esc(c.name)}">
      <div class="cl-top">
        <span class="cl-medal">${medal}</span>
        <div><h3>${esc(c.name)}</h3>${subLine(c)}</div>
        ${vid ? `<a class="cl-thumb" href="https://www.youtube.com/watch?v=${esc(vid)}" target="_blank" rel="noreferrer">
          <img src="https://i.ytimg.com/vi/${esc(vid)}/mqdefault.jpg" alt="" loading="lazy">
          <span class="play">▶</span><span class="cap">Class highlight</span></a>` : ""}
      </div>
      <div class="cr-pickname">Crest: <b>${pickName}</b>${p && !p.official ? ` — from ${esc(p.spec)}` : ""}</div>
      <div class="cr-strip">
        ${c.name in CREST_POS ? `<button class="${p && p.official ? "sel" : ""}" data-icon="__official__"
          title="Official class crest — build hub sprite (rights unconfirmed)">${crestFrame(c)}</button>` : ""}
        ${candidates(c).map(e =>
        `<button class="${p && !p.official && e.icon === p.icon ? "sel" : ""}${verified[e.icon] ? "" : " unv"}"
          data-icon="${esc(e.icon)}" title="${esc(e.name)} — ${esc(e.spec)}${verified[e.icon] ? "" : " (icon art unverified)"}">
          <img src="https://coabuildhub.com/skill-icons/${esc(e.icon)}.jpg" alt="${esc(e.name)}" loading="lazy"></button>`).join("")}</div>
    </article>`;
  }

  function render() {
    el("subNote").innerHTML = SUB_NOTES[state.sub];
    el("crests").innerHTML = classes.map(crestBlock).join("");
  }

  function init() {
    for (const c of classes) picks[c.name] = defaultPick(c);
    render();
    document.querySelector('[data-pick="sub"]').addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      state.sub = b.dataset.v;
      document.querySelectorAll('[data-pick="sub"] button').forEach(x =>
        x.classList.toggle("active", x === b));
      render();
    });
    el("crests").addEventListener("click", e => {
      const b = e.target.closest("button[data-icon]");
      if (!b) return;
      const block = e.target.closest("[data-cr]");
      const c = classes.find(x => x.name === block.dataset.cr);
      picks[c.name] = b.dataset.icon === "__official__" ? { official: true }
        : candidates(c).find(x => x.icon === b.dataset.icon);
      render();
    });
  }

  window.COA_CREST = { candidates, subLine, state, setVerified: v => { verified = v || {}; } };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("crests")) {
    fetch("icon-verification.json").then(r => r.json()).catch(() => ({}))
      .then(v => { verified = v || {}; init(); });
  }
})();
