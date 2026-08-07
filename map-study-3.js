/* Identity map round 3: game-language shape drafts + three single-canvas maps.
   Game-style values are ADVISOR DRAFTS derived live by the rules below from researched
   text and structural roles. Tiers: data (structural fact) · inf (drafted, Inference) ·
   gap (no evidence — renders hollow, never zero). */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY, M2R = window.COA_MAP_STUDY;
  if (!R || !S || !M2R) throw new Error("earlier study scripts must load first");
  const { data, specById, CLASS_GLYPHS, esc, pips } = R;
  const classes = S.classes;

  // ---------- text evidence ----------
  const RX = {
    burst: /\b(burst|payoff|window|detonat)/i,
    sustain: /\b(self.?heal|sustain|drain|lifesteal|leech|survivab|regen|shield)/i,
    control: /\b(stun|slow|root|snare|interrupt|silence|knock|crowd.?control|\bcc\b|grip|fear)/i,
    mobility: /\b(mobilit|mobile|dash|blink|teleport|charge|leap|sprint|reposition)/i,
    mobilityNeg: /\b(immobile|stationary|low mobility|no mobility|turret)/i,
    utility: /\b(buff|utilit|aura|banner|totem|blessing)/i,
  };
  function blobs(s) {
    const st = [], ca = [];
    for (const c of Object.values(s.contexts || {})) {
      if (!c) continue;
      st.push(...(c.strengths || []));
      ca.push(...(c.cautions || []));
    }
    st.push(s.oneLine || "", s.fantasy || "", ...((s.fit && s.fit.enjoy) || []).map(i => i.t || ""));
    ca.push(...(((s.fit && s.fit.avoid) || [])).map(i => i.t || ""));
    return { st, ca };
  }
  const hit = (arr, rx) => arr.find(t => rx.test(t)) || null;

  // ---------- G1: the game hexagon (drafted) ----------
  const FAM_BURST = { setup: 4, combo: 4, duelists: 3, steady: 2, commanders: 2, anchors: 2, menders: 2, marshals: 2 };

  function deriveStyle(s) {
    const { st, ca } = blobs(s);
    const roles = s.roles, fam = s.atlas;
    const ax = [];
    // Damage — structural
    ax.push(roles.includes("Damage")
      ? { key: "damage", label: "Damage", v: 5, tier: "data", ev: "Roles: " + roles.join(", ") }
      : { key: "damage", label: "Damage", v: roles.includes("Healer") && roles.length === 1 ? 1 : 2,
          tier: "data", ev: "Roles: " + roles.join(", ") });
    // Burst — family base, text nudge
    const bEv = hit(st, RX.burst);
    const bBase = FAM_BURST[fam] ?? 2;
    ax.push({ key: "burst", label: "Burst", v: bEv ? Math.min(5, bBase + 1) : bBase, tier: "inf",
      ev: bEv || `Family: ${famName(fam)} — ${famTag(fam)}` });
    // Sustain
    const suEv = hit(st, RX.sustain);
    ax.push(roles.includes("Tank")
      ? { key: "sustain", label: "Sustain", v: 5, tier: "data", ev: "Roles: Tank" }
      : suEv ? { key: "sustain", label: "Sustain", v: 4, tier: "inf", ev: suEv }
      : roles.includes("Healer") ? { key: "sustain", label: "Sustain", v: 3, tier: "inf", ev: "Healer toolkit (drafted)" }
      : { key: "sustain", label: "Sustain", v: 0, tier: "gap", ev: "" });
    // Control
    const cEv = hit(st, RX.control);
    ax.push(cEv ? { key: "control", label: "Control", v: 4, tier: "inf", ev: cEv }
      : { key: "control", label: "Control", v: 0, tier: "gap", ev: "" });
    // Mobility
    const mNeg = hit(ca, RX.mobilityNeg), mEv = hit(st, RX.mobility);
    ax.push(mNeg ? { key: "mobility", label: "Mobility", v: 1, tier: "inf", ev: mNeg }
      : mEv ? { key: "mobility", label: "Mobility", v: 4, tier: "inf", ev: mEv }
      : fam === "duelists" ? { key: "mobility", label: "Mobility", v: 3, tier: "inf", ev: `Family: ${famName(fam)} — ${famTag(fam)}` }
      : { key: "mobility", label: "Mobility", v: 0, tier: "gap", ev: "" });
    // Utility
    const uEv = hit(st, RX.utility);
    ax.push(roles.includes("Support") || fam === "marshals"
      ? { key: "utility", label: "Utility", v: 5, tier: roles.includes("Support") ? "data" : "inf",
          ev: roles.includes("Support") ? "Roles: Support" : `Family: ${famName(fam)}` }
      : uEv ? { key: "utility", label: "Utility", v: 4, tier: "inf", ev: uEv }
      : roles.includes("Healer") ? { key: "utility", label: "Utility", v: 3, tier: "inf", ev: "Healer toolkit (drafted)" }
      : { key: "utility", label: "Utility", v: 0, tier: "gap", ev: "" });
    return ax;
  }
  function famName(id) { const f = data.families.find(f => f.id === id); return f ? f.name : id; }
  function famTag(id) { const f = data.families.find(f => f.id === id); return f ? f.tagline : ""; }

  // ---------- G2: output diamond (roles only) ----------
  function deriveOutput(s) {
    const r = s.roles, ev = "Roles: " + r.join(", ");
    return [
      { label: "Damage", v: r.includes("Damage") ? 5 : r.includes("Healer") && r.length === 1 ? 1 : 2, tier: "data", ev },
      { label: "Toughness", v: r.includes("Tank") ? 5 : 1, tier: "data", ev },
      { label: "Healing", v: r.includes("Healer") ? 5 : 1, tier: "data", ev },
      { label: "Group", v: r.includes("Support") ? 5 : r.includes("Healer") ? 4 : r.includes("Tank") ? 3 : 1, tier: "data", ev },
    ];
  }

  // ---------- generic n-gon shape ----------
  const px = n => Math.round(n * 10) / 10;
  const rr = v => 0.18 + 0.82 * (v - 1) / 4;
  function polySVG(axes, color) {
    const n = axes.length, C = 50, RAD = 40;
    const ang = k => (-90 + k * 360 / n) * Math.PI / 180;
    const pt = (k, r) => [px(C + r * Math.cos(ang(k))), px(C + r * Math.sin(ang(k)))];
    const ring = f => axes.map((_, k) => pt(k, RAD * f).join(",")).join(" ");
    const lit = `color-mix(in srgb, ${color} 58%, white 42%)`;
    const spokes = axes.map((a, k) => {
      const [x2, y2] = pt(k, RAD);
      return `<line x1="${C}" y1="${C}" x2="${x2}" y2="${y2}" stroke="#1e2025"${a.v === 0 ? ' stroke-dasharray="3 3"' : ""}/>`;
    }).join("");
    const shape = axes.filter(a => a.v > 0).length
      ? `<polygon points="${axes.map((a, k) => a.v > 0 ? pt(k, RAD * rr(a.v)).join(",") : null).filter(Boolean).join(" ")}"
          fill="${color}" fill-opacity=".22" style="stroke:${lit}" stroke-width="1.6" stroke-linejoin="round"/>` : "";
    const marks = axes.map((a, k) => {
      if (a.v === 0) {
        const [x, y] = pt(k, RAD * .5);
        return `<circle cx="${x}" cy="${y}" r="2.6" fill="none" stroke="#565b62" stroke-width="1.2"/>`;
      }
      const [x, y] = pt(k, RAD * rr(a.v));
      return `<circle cx="${x}" cy="${y}" r="1.7" style="fill:${lit}"/>`;
    }).join("");
    return `<svg viewBox="0 0 100 100" role="img">
      <polygon points="${ring(1)}" fill="none" stroke="#26282d"/>
      <polygon points="${ring(rr(3))}" fill="none" stroke="#1e2025"/>${spokes}${shape}${marks}</svg>`;
  }

  // ---------- unit cards (fused: shape + evidence rows) ----------
  const TIER_TAG = { data: `<span class="tt data">data</span>`, inf: `<span class="tt inf">draft</span>`,
    gap: `<span class="tt gap">gap</span>` };
  function styleRows(axes) {
    return `<div class="pl-rows">` + axes.map(a => {
      const tipname = a.tier === "gap" ? `${a.label} — no evidence yet`
        : a.tier === "data" ? `${a.label} — ${a.v}/5, structural`
        : `${a.label} — drafted ${a.v}/5`;
      const tip = a.tier === "gap" ? "Nothing in the research supports a value. Hollow, never zero."
        : (a.ev || "").slice(0, 180);
      return `<div class="pl-row" data-tipname="${esc(tipname)}" data-tip="${esc(tip)}">
        <span>${a.label}</span>${TIER_TAG[a.tier]}${a.v ? pips(a.v) : `<span class="na">—</span>`}</div>`;
    }).join("") + `</div>`;
  }
  const head = s => `<div class="mu-head"><b>${esc(s.name)}</b>
    <span class="sub">${[...s.roles, ...s.range].map(esc).join(" · ")}</span></div>`;
  const fusedStyle = (s, axes) => `<button class="mu plate" style="--class-color:${s.color}"
    data-open="${s.id}">${head(s)}<div class="mu-fused">${polySVG(axes, s.color)}${styleRows(axes)}</div></button>`;

  // ---------- maps ----------
  function dot(s, x, y) {
    return `<g class="map-dot" data-open="${s.id}" data-tipname="${esc(s.name)}"
        data-tip="${esc(s.klass + " · " + [...s.roles, ...s.range].join(" · "))}">
      <circle cx="${px(x)}" cy="${px(y)}" r="8.5" fill="${s.color}" stroke="#101113" stroke-width="2"/>
      <text x="${px(x)}" y="${px(y) + 2.8}" text-anchor="middle">${CLASS_GLYPHS[s.klass] || "✦"}</text></g>`;
  }
  function packOffset(i, n, pitch) {
    const cols = Math.min(7, Math.ceil(Math.sqrt(n)));
    const rows = Math.ceil(n / cols);
    return [((i % cols) - (cols - 1) / 2) * pitch, (Math.floor(i / cols) - (rows - 1) / 2) * pitch];
  }
  function cluster(groups, pitch) {
    let out = "";
    for (const g of groups.values())
      g.specs.forEach((s, i) => {
        const [ox, oy] = packOffset(i, g.specs.length, pitch);
        out += dot(s, g.x + ox, g.y + oy);
      });
    return out;
  }

  // M1 · role compass
  function compassSVG() {
    const CX = 320, CY = 268, SC = 184;
    const POLE = { Support: [0, -1], Tank: [-1, 0], Healer: [1, 0], Damage: [0, 1] };
    const groups = new Map();
    for (const s of data.specs) {
      let dx = 0, dy = 0;
      for (const r of s.roles) { dx += POLE[r][0]; dy += POLE[r][1]; }
      dx = dx / s.roles.length * SC; dy = dy / s.roles.length * SC;
      const key = px(dx) + "," + px(dy);
      if (!groups.has(key)) groups.set(key, { x: CX + dx, y: CY + dy, specs: [] });
      groups.get(key).specs.push(s);
    }
    const spokes = Object.values(POLE).map(([x, y]) =>
      `<line x1="${CX}" y1="${CY}" x2="${CX + x * SC}" y2="${CY + y * SC}" stroke="#1e2025"/>`).join("");
    const labels = `<text class="pole-lab" x="${CX}" y="${CY - SC - 30}" text-anchor="middle">Support</text>
      <text class="pole-lab" x="${CX}" y="${CY + SC + 92}" text-anchor="middle">Damage</text>
      <text class="pole-lab" x="${CX - SC - 8}" y="${CY - 58}" text-anchor="middle">Tank</text>
      <text class="pole-lab" x="${CX + SC + 8}" y="${CY - 58}" text-anchor="middle">Healer</text>`;
    return spokes + labels + cluster(groups, 22);
  }

  // M2 · style field (drafted axes)
  function styleFieldSVG() {
    const W = 640, H = 560, M = { l: 64, r: 20, t: 30, b: 64 };
    const cw = (W - M.l - M.r) / 5, ch = (H - M.t - M.b) / 5;
    const groups = new Map();
    for (const s of data.specs) {
      const axes = deriveStyle(s);
      const bx = axes.find(a => a.key === "burst").v;
      const gy = s.roles.includes("Support") ? 5 : s.roles.includes("Healer") ? 4
        : s.roles.includes("Tank") ? 3 : axes.find(a => a.key === "utility").v >= 4 ? 2 : 1;
      const key = bx + "," + gy;
      if (!groups.has(key)) groups.set(key,
        { x: M.l + (bx - .5) * cw, y: H - M.b - (gy - .5) * ch, specs: [] });
      groups.get(key).specs.push(s);
    }
    let grid = "";
    for (let i = 0; i <= 5; i++) {
      grid += `<line x1="${M.l + i * cw}" y1="${M.t}" x2="${M.l + i * cw}" y2="${H - M.b}" stroke="${i === 0 ? "#4a4741" : "#1e2025"}"/>
        <line x1="${M.l}" y1="${M.t + i * ch}" x2="${W - M.r}" y2="${M.t + i * ch}" stroke="${i === 5 ? "#4a4741" : "#1e2025"}"/>`;
    }
    const labs = `<text class="axis-lab" x="${M.l + (W - M.l - M.r) / 2}" y="${H - 20}" text-anchor="middle">DAMAGE PROFILE →</text>
      <text class="axis-end" x="${M.l}" y="${H - 36}">STEADY</text>
      <text class="axis-end" x="${W - M.r}" y="${H - 36}" text-anchor="end">BURST</text>
      <text class="axis-lab" x="${M.l - 46}" y="${M.t - 10}">WHO GAINS ↑</text>
      <text class="axis-end" x="${M.l - 8}" y="${M.t + 10}" text-anchor="end">GROUP</text>
      <text class="axis-end" x="${M.l - 8}" y="${H - M.b}" text-anchor="end">SELF</text>`;
    return grid + labs + cluster(groups, 20);
  }

  // M3 · family starmap
  function starmapSVG() {
    const CX = 320, CY = 282, RX = 218, RY = 178;
    let out = "";
    const groups = new Map();
    data.families.forEach((f, k) => {
      const a = (-90 + k * 45) * Math.PI / 180;
      const x = CX + RX * Math.cos(a), y = CY + RY * Math.sin(a);
      const specs = data.specs.filter(s => s.atlas === f.id);
      groups.set(f.id, { x, y, specs });
      const labY = y < CY ? y - (Math.ceil(Math.sqrt(specs.length)) * 10 + 18) : y + Math.ceil(specs.length / 7) * 10 + 26;
      out += `<text class="region-lab" x="${px(x)}" y="${px(labY)}" text-anchor="middle"
        data-tipname="${esc(f.name)}" data-tip="${esc(f.tagline)}" style="cursor:help">${esc(f.name)}</text>`;
    });
    return out + cluster(groups, 20);
  }

  // ---------- rules table ----------
  const RULES = [
    ["Damage", "Roles: Damage → 5 · Tank/Support → 2 · pure Healer → 1", "Data"],
    ["Burst", "Family base (Planners/Combo 4 · Duelists 3 · others 2), +1 if researched text mentions burst, payoff, windows, or detonation", "Inference"],
    ["Sustain", "Tank role → 5 (Data) · text mentions self-healing, drain, survivability → 4 · Healer → 3 · else hollow", "Mixed"],
    ["Control", "Text mentions stuns, slows, roots, interrupts, or crowd control → 4 · else hollow", "Inference"],
    ["Mobility", "Caution says immobile or turret → 1 · text mentions mobility, dashes, or teleports → 4 · Duelist family → 3 · else hollow", "Inference"],
    ["Utility", "Support role → 5 (Data) · Field Marshal family → 5 · text mentions buffs or auras → 4 · Healer → 3 · else hollow", "Mixed"],
  ];

  // ---------- paint + wiring ----------
  const el = id => document.getElementById(id);
  let klass = "Cultist";

  function renderUnits() {
    const c = classes.find(x => x.name === klass) || classes[0];
    el("rowG1").innerHTML = c.specs.map(s => fusedStyle(s, deriveStyle(s))).join("");
    el("rowG2").innerHTML = c.specs.map(s => fusedStyle(s, deriveOutput(s))).join("");
    el("rowG3").innerHTML = c.specs.map(s => M2R.fusedCard(s, "boss")).join("");
  }
  function renderMaps() {
    el("mapM1").innerHTML = compassSVG();
    el("mapM2").innerHTML = styleFieldSVG();
    el("mapM3").innerHTML = starmapSVG();
  }
  function renderRules() {
    el("rulesBody").innerHTML = `<div class="inner"><table>
      <tr><th>Axis</th><th>Draft rule</th><th>Tier</th></tr>
      ${RULES.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join("")}</table>
      <p style="color:#83888f;font-size:11px;margin:10px 0 0">Every drafted row's tooltip quotes the
      researched sentence it came from. These rules are the mockup's transparency, not a shipping
      pipeline — a real pass would research each axis per spec.</p></div>`;
  }

  function openProfile(id) {
    const s = specById[id];
    if (!s) return;
    el("profileContent").innerHTML = R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  function init() {
    const uc = el("unitClass");
    uc.innerHTML = classes.map(c =>
      `<option value="${esc(c.name)}" ${c.name === klass ? "selected" : ""}>${esc(c.name)}</option>`).join("");
    uc.addEventListener("change", () => { klass = uc.value; renderUnits(); });
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });
    renderUnits(); renderMaps(); renderRules();
  }

  window.COA_MAP3 = { deriveStyle, deriveOutput, polySVG, compassSVG, styleFieldSVG, starmapSVG };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("rowG1")) init();
})();
