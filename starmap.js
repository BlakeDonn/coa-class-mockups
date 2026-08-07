/* The Star Map — interim identity map (ruled 2026-08-07). Family constellations,
   class emphasis, tap-through to the full spec profile. Structural data only. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY;
  if (!R || !S) throw new Error("explorer-data, profile-render and atlas-study must load first");
  const { data, specById, CLASS_GLYPHS, esc } = R;
  const classes = S.classes;

  const px = n => Math.round(n * 10) / 10;
  let klass = null;

  // ---------- layout: eight constellations on an ellipse ----------
  const CX = 480, CY = 306, RX = 330, RY = 218, PITCH = 26;
  function packOffset(i, n) {
    const cols = Math.min(7, Math.ceil(Math.sqrt(n)));
    const rows = Math.ceil(n / cols);
    return [((i % cols) - (cols - 1) / 2) * PITCH, (Math.floor(i / cols) - (rows - 1) / 2) * PITCH, rows];
  }
  const groups = data.families.map((f, k) => {
    const a = (-90 + k * 45) * Math.PI / 180;
    return { fam: f, x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a),
      specs: data.specs.filter(s => s.atlas === f.id) };
  });

  function skySVG() {
    let dim = "", lit = "", labels = "";
    for (const g of groups) {
      const n = g.specs.length;
      const rows = Math.ceil(n / Math.min(7, Math.ceil(Math.sqrt(n))));
      const half = ((rows - 1) * PITCH + 22) / 2;
      const labY = g.y < CY ? g.y - half - 16 : g.y + half + 24;
      labels += `<text class="sky-region-lab" x="${px(g.x)}" y="${px(labY)}" text-anchor="middle"
          data-tipname="${esc(g.fam.name)}" data-tip="${esc(g.fam.tagline)}">${esc(g.fam.name)}</text>
        <text class="sky-region-sub" x="${px(g.x)}" y="${px(labY + (g.y < CY ? -14 : 14))}"
          text-anchor="middle">${n} SPECS</text>`;
      g.specs.forEach((s, i) => {
        const [ox, oy] = packOffset(i, n);
        const x = px(g.x + ox), y = px(g.y + oy);
        const sel = klass && s.klass === klass;
        const mark = `<g class="sky-dot${klass && !sel ? " dim" : ""}" data-open="${s.id}"
            data-tipname="${esc(s.name)}" data-tip="${esc(s.klass + " · " + [...s.roles, ...s.range].join(" · "))}">
          <circle cx="${x}" cy="${y}" r="10" fill="${s.color}" stroke="#0d0e11" stroke-width="2"/>
          <text class="g" x="${x}" y="${y + 3}" text-anchor="middle">${CLASS_GLYPHS[s.klass] || "✦"}</text>
          ${sel ? `<text class="nm" x="${x}" y="${y + (i % 2 ? 24 : -16)}" text-anchor="middle"
            style="fill:color-mix(in srgb, ${s.color} 58%, white 42%)">${esc(s.name)}</text>` : ""}</g>`;
        if (sel) lit += mark; else dim += mark;
      });
    }
    return dim + labels + lit;
  }

  // ---------- paint + wiring ----------
  const el = id => document.getElementById(id);
  function renderSky() { el("sky").innerHTML = skySVG(); }
  function renderStrip() {
    el("classStrip").innerHTML = `<button class="all${klass ? "" : " active"}">All</button>` +
      classes.map(c => `<button style="--class-color:${c.color}" title="${esc(c.name)}"
        aria-label="${esc(c.name)}" data-klass="${esc(c.name)}"
        class="${klass === c.name ? "active" : ""}">${c.glyph}</button>`).join("");
  }
  function openProfile(id) {
    const s = specById[id];
    if (!s) return;
    el("profileContent").innerHTML = R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  function init() {
    el("classStrip").addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b) return;
      klass = b.dataset.klass && klass !== b.dataset.klass ? b.dataset.klass : null;
      renderStrip(); renderSky();
    });
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });
    renderStrip(); renderSky();
  }

  window.COA_STARMAP = { skySVG, groups };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("sky")) init();
})();
