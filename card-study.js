/* Identity card study, round 4: piece-by-piece variants + live composed grid.
   Authored content (taglines, verbs) renders ONLY where it exists — absent, never invented. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY;
  if (!R || !S) throw new Error("explorer-data, profile-render and atlas-study must load first");
  const { specById, esc } = R;
  const classes = S.classes;

  // Authored set (class-page grammar §2/§1). Heretic's Convert gloss carries a research flag.
  const VERBS = {
    "cultist/corruption": ["Spread", "Keep damage-over-time on every target; the engine is coverage."],
    "cultist/dreadnought": ["Endure", "Hold Insanity in a managed band and turn it into survival."],
    "cultist/heretic": ["Convert", "Turn melee aggression into healing for the group."],
    "cultist/godblade": ["Cross", "Push Insanity to 100 on purpose and fight inside the dangerous payoff state."],
    "tinker/demolition": ["Detonate", "Stack explosives and machines, then fire them in one overlapping window."],
  };
  // Tinker's other two verbs map by role: the healing spec Restores, the remaining one Overclocks.
  for (const s of R.data.specs.filter(s => s.klass === "Tinker" && !VERBS[s.id])) {
    VERBS[s.id] = s.roles.includes("Healer")
      ? ["Restore", "Deploy healing machines where the group will need them."]
      : ["Overclock", "Push your machines and combat suit past their limits."];
  }
  const TAGLINES = { Cultist: { text: "The whispers offer power. Will you listen?", kw: "whispers" } };

  const BASE = { doors: "chips", fams: "keep", tag: "none", kick: "count" };
  const state = { doors: "rows-verb", fams: "keep", tag: "authored", kick: "count" };

  // ---------- the card, composed ----------
  function doorsHTML(c, mode) {
    if (mode === "chips")
      return `<div class="cl-specchips">${c.specs.map(s =>
        `<button data-open="${s.id}">${esc(s.name)}</button>`).join("")}</div>`;
    return `<div class="cl-specrows">${c.specs.map(s => {
      const v = mode === "rows-verb" && VERBS[s.id];
      return `<button data-open="${s.id}"><span class="nm">${esc(s.name)}</span>
        ${v ? `<span class="vb" data-tipname="${esc(v[0])}" data-tip="${esc(v[1])}">${esc(v[0])}</span>` : ""}
        <span class="rs">${[...s.roles, ...s.range].map(esc).join(" · ")}</span></button>`;
    }).join("")}</div>`;
  }
  function tagHTML(c) {
    const t = TAGLINES[c.name];
    if (!t) return "";
    return `<div class="cl-tagline">${esc(t.text).replace(esc(t.kw), `<span class="kw">${esc(t.kw)}</span>`)}</div>`;
  }
  function composeCard(c, o) {
    return `<article class="plate cl-card" style="--class-color:${c.color}">
      <div class="cl-top"><span class="cl-medal">${c.glyph}</span>
        <div><h3>${esc(c.name)}</h3>${o.kick === "count"
          ? `<div class="sub">Class · ${c.specs.length} specializations</div>` : ""}</div></div>
      ${o.tag === "authored" ? tagHTML(c) : ""}
      <div class="cl-roles">${S.roleLine(c)}</div>
      ${o.fams === "keep" ? `<div class="cl-fams">Runs in: ${S.famLine(c)}</div>` : ""}
      <div class="cl-div"></div>
      ${doorsHTML(c, o.doors)}
    </article>`;
  }

  // ---------- paint ----------
  const el = id => document.getElementById(id);
  const DEMO = ["Cultist", "Witch Hunter"];

  function renderPairs() {
    document.querySelectorAll(".pair").forEach(p => {
      const o = { ...BASE, [p.dataset.piece]: p.dataset.variant };
      p.innerHTML = DEMO.map(n => composeCard(classes.find(c => c.name === n), o)).join("");
    });
  }
  function renderLive() {
    el("liveGrid").innerHTML = classes.map(c => composeCard(c, state)).join("");
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
        renderLive();
      });
    });
    document.addEventListener("click", e => {
      if (e.target.closest(".vb")) return; // verb chips read their gloss; they don't open the profile
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });
    renderPairs(); renderLive();
  }

  window.COA_CARD_STUDY = { composeCard, VERBS, TAGLINES };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("liveGrid")) init();
})();
