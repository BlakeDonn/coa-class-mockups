/* Identity map study, round 2: the unit (U1/U2/U3) and the wall (W1/W2/W3).
   Reuses atlas-study.js builders (radarSVG, class rollups); shipped Atlas untouched. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY;
  if (!R || !S) throw new Error("explorer-data, profile-render and atlas-study must load first");
  const { specById, AXIS_LABELS, CX_ORDINAL, CLASS_GLYPHS, esc, pips } = R;
  const AXES = S.AXES, classes = S.classes;

  const AXIS_SHORT = { core_actions: "Actions", execution: "Exec", state_tracking: "Track",
    reactive_decisions: "React", failure_cost: "Fail", setup_burden: "Setup" };
  // UI glosses for the axis names themselves (label teaching, not game claims).
  const AXIS_GLOSS = {
    core_actions: "How many buttons and procs the moment-to-moment loop juggles.",
    execution: "How precisely the plan must be performed to work.",
    state_tracking: "How much you must watch — bars, stacks, timers, positions.",
    reactive_decisions: "How much the fight interrupts your plan and demands answers.",
    failure_cost: "How hard a mistake punishes you.",
    setup_burden: "How much work happens before the payoff can exist.",
  };

  const state = { ctx: "boss", klass: "Cultist", wall: "matrix" };
  const el = id => document.getElementById(id);
  const cellOf = (s, axis, ctx) => (s.complexity[axis] || {})[ctx] || null;

  // ---------- units ----------
  function pipRows(s, ctx) {
    return `<div class="pl-rows">` + AXES.map(a => {
      const c = cellOf(s, a, ctx);
      if (!c) return `<div class="pl-row"><span>${AXIS_SHORT[a]}</span><span class="na">not researched</span></div>`;
      return `<div class="pl-row" data-tipname="${esc(AXIS_LABELS[a])} — ${esc(c.v)}" data-tip="${esc(c.why || "")}">
        <span>${AXIS_SHORT[a]}</span>${pips(CX_ORDINAL[c.v] || 0)}</div>`;
    }).join("") + `</div>`;
  }
  const head = s => `<div class="mu-head"><b>${esc(s.name)}</b>
    <span class="sub">${[...s.roles, ...s.range].map(esc).join(" · ")}</span></div>`;

  const ladderCard = (s, ctx) => `<button class="mu plate" style="--class-color:${s.color}"
    data-open="${s.id}">${head(s)}${pipRows(s, ctx)}</button>`;
  const shapeCard = (s, ctx) => `<button class="mu plate" style="--class-color:${s.color}"
    data-open="${s.id}">${head(s)}<div class="mu-shape">${S.radarSVG(s, ctx)}</div></button>`;
  const fusedCard = (s, ctx) => `<button class="mu plate" style="--class-color:${s.color}"
    data-open="${s.id}">${head(s)}<div class="mu-fused">${S.radarSVG(s, ctx)}${pipRows(s, ctx)}</div></button>`;

  // ---------- walls ----------
  const dots = n => [1, 2, 3, 4, 5].map(i => `<span class="d${i <= n ? " f" : ""}"></span>`).join("");

  function matrixHTML(ctx) {
    let h = `<div class="mx"><div class="mx-headrow"><span class="h">Spec</span>` +
      AXES.map(a => `<span class="h" data-tipname="${esc(AXIS_LABELS[a])}" data-tip="${esc(AXIS_GLOSS[a])}">${AXIS_SHORT[a]}</span>`).join("") + `</div>`;
    for (const c of classes) {
      h += `<div class="mx-class" style="--class-color:${c.color}"><span class="g">${c.glyph}</span><h4>${esc(c.name)}</h4></div>`;
      for (const s of c.specs) {
        h += `<button class="mx-row" style="--class-color:${c.color}" data-open="${s.id}">
          <span class="mx-name"><span class="g">${c.glyph}</span>${esc(s.name)}</span>` +
          AXES.map(a => {
            const cell = cellOf(s, a, ctx);
            return `<span class="mx-cell">${cell ? dots(CX_ORDINAL[cell.v] || 0) : `<span class="d gap"></span>`}</span>`;
          }).join("") + `</button>`;
      }
    }
    return h + `</div>`;
  }

  const shapeWallHTML = ctx => `<div class="st-wall">` + classes.map(c =>
    `<div class="wl-class" style="--class-color:${c.color}">
      <div class="wl-head"><span class="g">${c.glyph}</span><h4>${esc(c.name)}</h4>
        <span class="sub">${c.specs.length} specs</span></div>
      <div class="wl-specs">${c.specs.map(s =>
        `<button class="sp" data-open="${s.id}">${S.radarSVG(s, ctx)}<small>${esc(s.name)}</small></button>`).join("")}</div>
    </div>`).join("") + `</div>`;

  const cardWallHTML = ctx => classes.map(c =>
    `<div class="pw-class" style="--class-color:${c.color}">
      <div class="wl-head"><span class="g">${c.glyph}</span><h4>${esc(c.name)}</h4></div>
      <div class="pw-grid">${c.specs.map(s => ladderCard(s, ctx)).join("")}</div>
    </div>`).join("");

  const WALL_NOTES = {
    matrix: `<b>W1 · Pip matrix.</b> Every value on one surface, each pip row compressed to five dots.
      <span class="gain">Gains:</span> the densest honest read — a column scans as texture, so you see
      where high failure cost or heavy setup lives across the whole roster. <span class="cost">Costs:</span>
      diamonds shrink to dots; tap a row for the readable card. No sorting, by law.`,
    shapes: `<b>W2 · Shape wall.</b> Round 1's constellation wall, kept for the side-by-side.
      <span class="gain">Gains:</span> characters at a glance — same-shape-plays-alike jumps across
      classes without reading a number. <span class="cost">Costs:</span> values stay approximate until
      you tap through.`,
    cards: `<b>W3 · Pip cards.</b> The full ladder for all 70. <span class="gain">Gains:</span> nothing
      to learn, everything readable in place. <span class="cost">Costs:</span> the longest wall by far —
      reading it is a session, not a glance.`,
  };

  // ---------- paint ----------
  function renderHero() {
    const gb = specById["cultist/godblade"];
    el("heroPair").innerHTML = ladderCard(gb, "boss") + shapeCard(gb, "boss");
  }
  function renderUnits() {
    const c = classes.find(x => x.name === state.klass) || classes[0];
    el("rowU1").innerHTML = c.specs.map(s => ladderCard(s, state.ctx)).join("");
    el("rowU2").innerHTML = c.specs.map(s => shapeCard(s, state.ctx)).join("");
    el("rowU3").innerHTML = c.specs.map(s => fusedCard(s, state.ctx)).join("");
  }
  function renderWallSec() {
    el("wallNote").innerHTML = WALL_NOTES[state.wall];
    el("wallHost").innerHTML = state.wall === "matrix" ? matrixHTML(state.ctx)
      : state.wall === "shapes" ? shapeWallHTML(state.ctx) : cardWallHTML(state.ctx);
  }

  function openProfile(id) {
    const s = specById[id];
    if (!s) return;
    el("profileContent").innerHTML = R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  // ---------- wiring ----------
  function readUrl() {
    const p = new URLSearchParams(location.search);
    for (const k of ["ctx", "klass", "wall"]) if (p.get(k)) state[k] = p.get(k);
  }
  function writeUrl() {
    const p = new URLSearchParams();
    const defaults = { ctx: "boss", klass: "Cultist", wall: "matrix" };
    for (const [k, d] of Object.entries(defaults)) if (state[k] !== d) p.set(k, state[k]);
    const qs = p.toString();
    history.replaceState(null, "", (qs ? "?" + qs : location.pathname) + location.hash);
  }

  function init() {
    readUrl();
    document.querySelectorAll("[data-pick]").forEach(group => {
      const key = group.dataset.pick;
      group.querySelectorAll("button[data-v]").forEach(b =>
        b.classList.toggle("active", b.dataset.v === state[key]));
      group.addEventListener("click", e => {
        const b = e.target.closest("button[data-v]");
        if (!b) return;
        state[key] = b.dataset.v;
        group.querySelectorAll("button[data-v]").forEach(x => x.classList.toggle("active", x === b));
        writeUrl();
        if (key === "ctx") { renderUnits(); renderWallSec(); }
        if (key === "wall") renderWallSec();
      });
    });
    const uc = el("unitClass");
    uc.innerHTML = classes.map(c =>
      `<option value="${esc(c.name)}" ${c.name === state.klass ? "selected" : ""}>${esc(c.name)}</option>`).join("");
    uc.addEventListener("change", () => { state.klass = uc.value; writeUrl(); renderUnits(); });

    document.addEventListener("click", e => {
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });

    renderHero(); renderUnits(); renderWallSec();
  }

  window.COA_MAP_STUDY = { pipRows, matrixHTML, shapeWallHTML, cardWallHTML, ladderCard, fusedCard };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("heroPair")) init();
})();
