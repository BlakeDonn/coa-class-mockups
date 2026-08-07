/* Atlas design study (session 4). Renders the three study sections from the real
   explorer data. New file — shipped Atlas files untouched. Pure builders are exposed
   on window.COA_STUDY so a node smoke test can exercise the data paths. */
(() => {
  "use strict";

  const R = window.COA_RENDER;
  if (!R) throw new Error("profile-render.js must load before atlas-study.js");
  const { data, specById, famById, AXIS_LABELS, CX_ORDINAL, CLASS_GLYPHS, esc, pips } = R;

  // Six demand axes present in research v2, ordered so related demands sit adjacent:
  // hands (actions, execution) · head (tracking, reactive) · stakes (failure, setup).
  const AXES = ["core_actions", "execution", "state_tracking",
                "reactive_decisions", "failure_cost", "setup_burden"];
  const AXIS_SHORT = { core_actions: "Actions", execution: "Execution", state_tracking: "Tracking",
    reactive_decisions: "Reactive", failure_cost: "Failure cost", setup_burden: "Setup" };
  const ROLES = ["Damage", "Tank", "Healer", "Support"];
  const RANGES = ["Melee", "Hybrid", "Ranged"];

  const state = { fork: "mast", cards: "constel", ctx: "boss", fam: "All",
    klass: null, x: "setup_burden", y: "reactive_decisions", alt: "classes" };

  const ord = (s, axis, ctx) => {
    const c = (s.complexity[axis] || {})[ctx];
    return c ? (CX_ORDINAL[c.v] || 0) : 0;
  };
  const lite = color => `color-mix(in srgb, ${color} 58%, white 42%)`;

  // ---------- class rollups ----------
  const byClass = new Map();
  for (const s of data.specs) {
    if (!byClass.has(s.klass)) byClass.set(s.klass,
      { name: s.klass, color: s.color, glyph: CLASS_GLYPHS[s.klass] || "✦", specs: [] });
    byClass.get(s.klass).specs.push(s);
  }
  const classes = [...byClass.values()].sort((a, b) => a.name.localeCompare(b.name));

  function roleLine(c) {
    const counts = ROLES.map(r => [r, c.specs.filter(s => s.roles.includes(r)).length])
      .filter(([, n]) => n > 0)
      .map(([r, n]) => n > 1 ? `${r} ×${n}` : r);
    const ranges = RANGES.filter(r => c.specs.some(s => s.range.includes(r)));
    return `${counts.join("<i> · </i>")}<i> — </i>${ranges.join(ranges.length > 2 ? "<i> · </i>" : " &amp; ")}`;
  }
  function famLine(c) {
    const seen = data.families.filter(f => c.specs.some(s => s.atlas === f.id));
    return seen.map(f => `<span class="famname" data-tipname="${esc(f.name)}" data-tip="${esc(f.tagline)}">${esc(f.name)}</span>`)
      .join(" · ");
  }

  // ---------- radar glyph (one spec = one shape; gaps hollow, never zero) ----------
  const angle = k => (-90 + k * 60) * Math.PI / 180;
  const rr = v => 0.18 + 0.82 * (v - 1) / 4;
  const px = n => Math.round(n * 10) / 10;

  function radarSVG(s, ctx, opts = {}) {
    const C = 50, RAD = 40;
    const pt = (k, r) => [px(C + r * Math.cos(angle(k))), px(C + r * Math.sin(angle(k)))];
    const ringAt = f => AXES.map((_, k) => pt(k, RAD * f).join(",")).join(" ");
    const vals = AXES.map(a => ord(s, a, ctx));
    const spokes = AXES.map((_, k) => {
      const [x2, y2] = pt(k, RAD);
      const gap = vals[k] === 0;
      return `<line x1="${C}" y1="${C}" x2="${x2}" y2="${y2}" stroke="#1e2025" stroke-width="1"${gap ? ' stroke-dasharray="3 3"' : ""}/>`;
    }).join("");
    const shapePts = vals.map((v, k) => v > 0 ? pt(k, RAD * rr(v)) : null).filter(Boolean);
    const gaps = vals.map((v, k) => v === 0
      ? `<circle cx="${pt(k, RAD * .5)[0]}" cy="${pt(k, RAD * .5)[1]}" r="2.6" fill="none" stroke="#565b62" stroke-width="1.2"/>`
      : "").join("");
    const dots = vals.map((v, k) => {
      if (v === 0) return "";
      const [x, y] = pt(k, RAD * rr(v));
      return `<circle cx="${x}" cy="${y}" r="1.7" style="fill:${lite(s.color)}"/>`;
    }).join("");
    return `<svg viewBox="0 0 100 100" role="img" aria-label="${esc(s.name)} demand shape">
      <polygon points="${ringAt(1)}" fill="none" stroke="#26282d" stroke-width="1"/>
      <polygon points="${ringAt(rr(3))}" fill="none" stroke="#1e2025" stroke-width="1"/>
      ${spokes}
      ${shapePts.length ? `<polygon points="${shapePts.map(p => p.join(",")).join(" ")}"
        fill="${s.color}" fill-opacity=".22" style="stroke:${lite(s.color)}" stroke-width="1.6" stroke-linejoin="round"/>` : ""}
      ${dots}${gaps}
      ${opts.center ? `<text x="${C}" y="${C + 3}" text-anchor="middle" font-size="8" fill="#565b62">${esc(opts.center)}</text>` : ""}
    </svg>`;
  }

  function legendSVG() {
    const s = specById["cultist/godblade"];
    const C = 118, CY = 72, RAD = 46;
    const pt = (k, r) => [px(C + r * Math.cos(angle(k))), px(CY + r * Math.sin(angle(k)))];
    const vals = AXES.map(a => ord(s, a, "boss"));
    const labels = AXES.map((a, k) => {
      const [x, y] = pt(k, RAD + 13);
      const anchor = Math.abs(x - C) < 8 ? "middle" : x > C ? "start" : "end";
      return `<text x="${x}" y="${y + 3}" text-anchor="${anchor}" font-size="8.5" fill="#8d8678"
        font-weight="700" letter-spacing=".04em">${AXIS_SHORT[a].toUpperCase()}</text>`;
    }).join("");
    const ring = f => AXES.map((_, k) => pt(k, RAD * f).join(",")).join(" ");
    const shape = vals.map((v, k) => pt(k, RAD * rr(v)).join(",")).join(" ");
    return `<svg viewBox="0 0 236 148" role="img" aria-label="How to read a demand shape">
      <polygon points="${ring(1)}" fill="none" stroke="#26282d"/>
      <polygon points="${ring(rr(3))}" fill="none" stroke="#1e2025"/>
      ${AXES.map((_, k) => { const [x2, y2] = pt(k, RAD); return `<line x1="${C}" y1="${CY}" x2="${x2}" y2="${y2}" stroke="#1e2025"/>`; }).join("")}
      <polygon points="${shape}" fill="${s.color}" fill-opacity=".22" style="stroke:${lite(s.color)}" stroke-width="1.8" stroke-linejoin="round"/>
      ${labels}
    </svg>`;
  }

  // ---------- the field: pure layout, then paint ----------
  function fieldCells(xAxis, yAxis, ctx) {
    const cells = new Map();
    for (const s of data.specs) {
      const vx = ord(s, xAxis, ctx), vy = ord(s, yAxis, ctx);
      if (!vx || !vy) continue;
      const key = vx + "," + vy;
      if (!cells.has(key)) cells.set(key, []);
      cells.get(key).push(s);
    }
    return cells;
  }

  // Bounded grid packing: n dots centered in the cell, ≤7 columns at a 12px pitch,
  // so even the worst observed cell (42 specs, PvP) stays inside its 100×90 cell.
  function packOffset(i, n) {
    const cols = Math.min(7, Math.ceil(Math.sqrt(n)));
    const rows = Math.ceil(n / cols);
    const col = i % cols, row = Math.floor(i / cols);
    return [(col - (cols - 1) / 2) * 12, (row - (rows - 1) / 2) * 12];
  }

  function fieldSVG() {
    const W = 560, H = 508, M = { l: 46, r: 12, t: 16, b: 46 };
    const pw = W - M.l - M.r, ph = H - M.t - M.b;
    const cw = pw / 5, ch = ph / 5;
    const cx = v => M.l + (v - .5) * cw;
    const cy = v => H - M.b - (v - .5) * ch;
    let grid = "";
    for (let i = 0; i <= 5; i++) {
      grid += `<line x1="${M.l + i * cw}" y1="${M.t}" x2="${M.l + i * cw}" y2="${H - M.b}" stroke="${i === 0 ? "#4a4741" : "#1e2025"}"/>`;
      grid += `<line x1="${M.l}" y1="${M.t + i * ch}" x2="${W - M.r}" y2="${M.t + i * ch}" stroke="${i === 5 ? "#4a4741" : "#1e2025"}"/>`;
    }
    const cells = fieldCells(state.x, state.y, state.ctx);
    let dots = "", labels = "";
    for (const [key, specs] of cells) {
      const [vx, vy] = key.split(",").map(Number);
      specs.forEach((s, i) => {
        const [ox, oy] = packOffset(i, specs.length);
        const x = px(cx(vx) + ox), y = px(cy(vy) + oy);
        const famOut = state.fam !== "All" && s.atlas !== state.fam;
        const sel = state.klass && s.klass === state.klass;
        const mute = (state.klass && !sel) || famOut;
        const tip = `${s.name} — ${s.klass} · ${AXIS_SHORT[state.x]} ${((s.complexity[state.x] || {})[state.ctx] || {}).v || "?"} · ${AXIS_SHORT[state.y]} ${((s.complexity[state.y] || {})[state.ctx] || {}).v || "?"}`;
        dots += `<circle cx="${x}" cy="${y}" r="5.5" fill="${mute ? "#3a3d42" : s.color}"
          stroke="#101113" stroke-width="2" data-open="${s.id}" data-tipname="${esc(s.name)}" data-tip="${esc(tip)}"
          style="cursor:pointer"${famOut ? ' opacity=".25"' : ""}/>`;
        if (sel && !famOut) labels += `<text x="${x}" y="${y - 9}" text-anchor="middle" font-size="9.5"
          fill="#e9e5d9" paint-order="stroke" stroke="#101113" stroke-width="3">${esc(s.name)}</text>`;
      });
    }
    const ax = `<text x="${M.l + pw / 2}" y="${H - 14}" text-anchor="middle" font-size="10.5" font-weight="800"
        letter-spacing=".1em" fill="#8d8678">${AXIS_SHORT[state.x].toUpperCase()} →</text>
      <text x="${M.l}" y="${H - 28}" font-size="8.5" fill="#565b62">LOW</text>
      <text x="${W - M.r}" y="${H - 28}" text-anchor="end" font-size="8.5" fill="#565b62">HIGH</text>
      <text x="${M.l - 6}" y="${M.t + 8}" text-anchor="end" font-size="8.5" fill="#565b62">HIGH</text>
      <text x="${M.l - 6}" y="${H - M.b}" text-anchor="end" font-size="8.5" fill="#565b62">LOW</text>
      <text x="${M.l - 34}" y="${M.t - 4}" font-size="10.5" font-weight="800" letter-spacing=".1em"
        fill="#8d8678">${AXIS_SHORT[state.y].toUpperCase()} ↑</text>`;
    return grid + dots + labels + ax;
  }

  // ---------- muster board ----------
  function musterHTML() {
    let h = `<div class="st-muster"><div class="mh"></div>` +
      ROLES.map(r => `<div class="mh">${r}</div>`).join("");
    for (const rg of RANGES) {
      h += `<div class="mr">${rg}</div>`;
      for (const ro of ROLES) {
        const specs = data.specs
          .filter(s => s.roles.includes(ro) && s.range.includes(rg))
          .sort((a, b) => a.klass.localeCompare(b.klass) || a.name.localeCompare(b.name));
        h += `<div class="mc">` + (specs.length ? specs.map(s => {
          const famOut = state.fam !== "All" && s.atlas !== state.fam;
          return `<button data-open="${s.id}" style="--class-color:${s.color}"${famOut ? ' class="dimmed"' : ""}>
            <span class="g">${CLASS_GLYPHS[s.klass] || "✦"}</span>${esc(s.name)}</button>`;
        }).join("") : `<span class="empty">—</span>`) + `</div>`;
      }
    }
    return h + `</div>`;
  }

  // ---------- section 2: class cards ----------
  function crestCard(c) {
    return `<article class="plate cl-card" style="--class-color:${c.color}">
      <div class="cl-top"><span class="cl-medal">${c.glyph}</span>
        <div><h3>${esc(c.name)}</h3><div class="sub">Class · ${c.specs.length} specializations</div></div></div>
      <div class="cl-roles">${roleLine(c)}</div></article>`;
  }
  function richCard(c) {
    return `<article class="plate cl-card" style="--class-color:${c.color}">
      <div class="cl-top"><span class="cl-medal">${c.glyph}</span>
        <div><h3>${esc(c.name)}</h3><div class="sub">Class · ${c.specs.length} specializations</div></div></div>
      <div class="cl-roles">${roleLine(c)}</div>
      <div class="cl-fams">Runs in: ${famLine(c)}</div>
      <div class="cl-div"></div>
      <div class="cl-specchips">${c.specs.map(s => `<button data-open="${s.id}">${esc(s.name)}</button>`).join("")}</div>
    </article>`;
  }
  function constelCard(c) {
    return `<article class="plate cl-card" style="--class-color:${c.color}">
      <div class="cl-top"><span class="cl-medal">${c.glyph}</span>
        <div><h3>${esc(c.name)}</h3><div class="sub">Class · ${c.specs.length} specializations</div></div></div>
      <div class="cl-roles">${roleLine(c)}</div>
      <div class="cl-fams">Runs in: ${famLine(c)}</div>
      <div class="cl-constel">${c.specs.map(s =>
        `<button class="sp" data-open="${s.id}">${radarSVG(s, "boss")}<small>${esc(s.name)}</small></button>`).join("")}</div>
    </article>`;
  }

  // ---------- section 1: chrome + fork ----------
  function chromeHTML() {
    return `<div class="a-topbar">
      <a class="a-sigil">⚜<span class="sg-word"> COA ATLAS</span></a>
      <nav class="a-tabs" aria-label="Site pages (demo)">
        <a class="active">Atlas</a><a>Choose</a><a>Guided · pilot</a><a>Loot 45+</a>
      </nav>
      <label class="a-search"><span aria-hidden="true" style="color:var(--faint)">⌕</span>
        <input type="search" placeholder="Search specs, families, abilities…" readonly><kbd>/</kbd></label>
      <span class="ph-icons">
        <a class="active">⚜<span class="tl">Atlas</span></a><a>◈<span class="tl">Choose</span></a>
        <a>✦<span class="tl">Guided</span></a><a>⚔<span class="tl">Loot</span></a>
      </span>
      <button class="wb-button st-wb">⚖ Workbench</button>
    </div>`;
  }

  const DOORS = [
    { id: "guide", g: "✦", name: "Guide me", sub: "A few questions, then a shortlist" },
    { id: "classes", g: "⚜", name: "The 21 classes", sub: "Browse by class, then descend" },
    { id: "specs", g: "◇", name: "All 70 specs", sub: "The full atlas, family by family" },
  ];
  const doorsHTML = () => DOORS.map(d =>
    `<button class="door ${state.alt === d.id ? "active" : ""}" data-alt="${d.id}">
      <span class="dg">${d.g}</span><b>${d.name}</b><small>${d.sub}</small></button>`).join("");

  function altPreviewHTML() {
    if (state.alt === "guide") return `<div class="st-demo-hint">Opens the Guided path (pilot).
      Not live on the shipped site — this study links the repo copy only.</div>`;
    if (state.alt === "specs") return `<div class="st-demo-hint">The shipped Atlas continues below,
      unchanged — families, filters, cards, workbench.</div>`;
    return `<div class="st-classgrid g-crest" style="padding:0 12px 6px">${classes.slice(0, 4).map(crestCard).join("")}</div>
      <div class="st-demo-hint">…and 17 more — the full grid is section 2.</div>`;
  }

  function forkHTML() {
    if (state.fork === "gate") return chromeHTML() + `<div class="plate st-gate">
      <div class="kick">Conquest of Azeroth</div><h2>The Atlas of Seventy Paths</h2>
      <p class="st-gate-q">How do you want to enter?</p>
      <div class="doors">${doorsHTML()}</div>
      <p class="st-gate-small">Your pick is remembered — change it any time from the Atlas masthead.</p>
    </div><div class="st-demo-below"></div>`;
    if (state.fork === "lens") return chromeHTML() + `<header class="plate atlas-mast">
        <div><div class="kick">Conquest of Azeroth</div><h2>The Atlas of Seventy Paths</h2>
          <p>Every spec, mapped by how it actually feels to play. An identity guide, not a tier list.</p></div>
        <div class="mast-cta"><a class="primary">⚜ Find my class</a><a class="ghost">✦ Guide me</a></div>
      </header>
      <div class="bar-row" style="padding-bottom:12px">
        <span class="st-lens"><button class="${state.alt !== "specs" ? "active" : ""}" data-alt="classes">21 Classes</button><button
          class="${state.alt === "specs" ? "active" : ""}" data-alt="specs">70 Specs</button></span>
        <span class="counter"><b>70</b> specs · <b>21</b> classes · <b>70</b> curated</span>
      </div><div class="st-demo-below">${state.alt === "specs"
        ? `<div class="st-demo-hint">The shipped family view renders here, unchanged.</div>`
        : `<div class="st-classgrid g-crest">${classes.slice(0, 4).map(crestCard).join("")}</div>
           <div class="st-demo-hint">…and 17 more.</div>`}</div>`;
    return chromeHTML() + `<header class="plate atlas-mast st-mast-doors">
        <div><div class="kick">Conquest of Azeroth</div><h2>The Atlas of Seventy Paths</h2>
          <p>Every spec, mapped by how it actually feels to play. An identity guide, not a tier list.</p></div>
        <div class="doors">${doorsHTML()}</div>
      </header>
      <div class="st-demo-below" id="altPreview">${altPreviewHTML()}</div>`;
  }

  const FORK_NOTES = {
    mast: `<b>Masthead doors.</b> The pick lives where the eye already lands, and browsing continues below
      without a wall. <span class="gain">Gains:</span> teaches all three surfaces on every visit; return
      visits just keep scrolling. <span class="cost">Costs:</span> a taller masthead on phone; the Guide
      door points at a surface not yet live on the shipped site. The default altitude below the doors is
      its own decision — this demo defaults to the 21 classes.`,
    gate: `<b>First-visit gate.</b> The literal reading of "pick on landing": one explicit choice, nothing
      competing. <span class="gain">Gains:</span> the strongest teaching moment. <span class="cost">Costs:</span>
      friction on every fresh visit; needs a remembered pick; deep links and search arrivals skip it anyway.`,
    lens: `<b>Bar-row lens.</b> Altitude becomes a browsing control, not a landing ceremony.
      <span class="gain">Gains:</span> the smallest change; flip class/spec altitude mid-scroll; the masthead
      stays as shipped. <span class="cost">Costs:</span> the weakest answer to "pick on landing" — a control
      you discover, not an offer you're made; Guide stays a nav tab only.`,
  };
  const CARD_NOTES = {
    crest: `<b>Crest roll.</b> A muster roll — 21 rows scan in two screens. <span class="cost">Costs:</span>
      each card is a doorway, not a portrait; nothing of how the class feels.`,
    rich: `<b>Identity card.</b> A portrait per class: jobs, families (tap a family name for its meaning),
      and each spec as a door. <span class="cost">Costs:</span> a taller page; family names are jargon on
      first read — the tooltip carries the teaching.`,
    constel: `<b>Constellation card.</b> The class IS its specs — four shapes say more than a sentence, and
      the Class Atlas and the identity map become one surface. <span class="cost">Costs:</span> the heaviest
      card; the six spokes must be learned once (legend in section 3). Shapes use the Boss context.`,
  };

  // ---------- paint ----------
  const el = id => document.getElementById(id);

  function renderFork() {
    el("forkNote").innerHTML = FORK_NOTES[state.fork];
    el("forkDemo").innerHTML = forkHTML();
  }
  function renderCards() {
    el("cardsNote").innerHTML = CARD_NOTES[state.cards];
    const builder = state.cards === "crest" ? crestCard : state.cards === "rich" ? richCard : constelCard;
    el("classGrid").className = "st-classgrid g-" + state.cards;
    el("classGrid").innerHTML = classes.map(builder).join("");
  }
  function renderWall() {
    el("mapLegend").innerHTML = legendSVG() + `<div class="lg-note">The reference shape is
      <b>Godblade (Boss)</b> — real data. Farther out = more of that demand. The spokes hold one
      fixed order everywhere: core actions at the top, then clockwise — execution, tracking,
      reactive, failure cost, setup.</div>`;
    el("mapA").className = "st-wall";
    el("mapA").innerHTML = classes.map(c => `<div class="wl-class" style="--class-color:${c.color}">
      <div class="wl-head"><span class="g">${c.glyph}</span><h4>${esc(c.name)}</h4>
        <span class="sub">${c.specs.length} specs</span></div>
      <div class="wl-specs">${c.specs.map(s => {
        const famOut = state.fam !== "All" && s.atlas !== state.fam;
        return `<button class="sp${famOut ? " dimmed" : ""}" data-open="${s.id}">
          ${radarSVG(s, state.ctx)}<small>${esc(s.name)}</small></button>`;
      }).join("")}</div></div>`).join("");
  }
  function renderField() {
    el("fieldRead").innerHTML = `<b>How to read it:</b> across = ${AXIS_LABELS[state.x].toLowerCase()},
      up = ${AXIS_LABELS[state.y].toLowerCase()} — demand rises rightward and upward. Demand, not quality.
      Neighbors on this field ask similar things of you.`;
    el("mapB").innerHTML = fieldSVG();
  }
  function renderMuster() { el("mapC").innerHTML = musterHTML(); }
  function renderStrip() {
    el("classStrip").innerHTML = `<button class="all${state.klass ? "" : " active"}">All</button>` +
      classes.map(c => `<button style="--class-color:${c.color}" title="${esc(c.name)}"
        aria-label="${esc(c.name)}" data-klass="${esc(c.name)}"
        class="${state.klass === c.name ? "active" : ""}">${c.glyph}</button>`).join("");
  }

  function openProfile(id) {
    const s = specById[id];
    if (!s) return;
    el("profileContent").innerHTML = R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  // ---------- state sync ----------
  function readUrl() {
    const p = new URLSearchParams(location.search);
    for (const k of ["fork", "cards", "ctx", "fam", "x", "y"]) if (p.get(k)) state[k] = p.get(k);
  }
  function writeUrl() {
    const p = new URLSearchParams();
    const defaults = { fork: "mast", cards: "constel", ctx: "boss", fam: "All", x: "setup_burden", y: "reactive_decisions" };
    for (const [k, d] of Object.entries(defaults)) if (state[k] !== d) p.set(k, state[k]);
    const qs = p.toString();
    history.replaceState(null, "", (qs ? "?" + qs : location.pathname) + location.hash);
  }

  function init() {
    readUrl();
    // pickers
    document.querySelectorAll("[data-pick]").forEach(group => {
      const key = group.closest("[data-pick]").dataset.pick || group.dataset.pick;
      group.querySelectorAll("button[data-v]").forEach(b =>
        b.classList.toggle("active", b.dataset.v === state[key]));
      group.addEventListener("click", e => {
        const b = e.target.closest("button[data-v]");
        if (!b) return;
        state[key] = b.dataset.v;
        group.querySelectorAll("button[data-v]").forEach(x => x.classList.toggle("active", x === b));
        writeUrl();
        if (key === "fork") renderFork();
        if (key === "cards") renderCards();
        if (key === "ctx") { renderWall(); renderField(); }
      });
    });
    // family lens
    const fl = el("famLens");
    fl.innerHTML = `<option value="All">All families</option>` +
      data.families.map(f => `<option value="${f.id}" ${state.fam === f.id ? "selected" : ""}>${esc(f.name)}</option>`).join("");
    fl.addEventListener("change", () => { state.fam = fl.value; writeUrl(); renderWall(); renderField(); renderMuster(); });
    // axis pickers
    for (const [id, key] of [["axisX", "x"], ["axisY", "y"]]) {
      const sel = el(id);
      sel.innerHTML = AXES.map(a => `<option value="${a}" ${state[key] === a ? "selected" : ""}>${AXIS_LABELS[a]}</option>`).join("");
      sel.addEventListener("change", () => { state[key] = sel.value; writeUrl(); renderField(); });
    }
    // class emphasis strip
    el("classStrip").addEventListener("click", e => {
      const b = e.target.closest("button");
      if (!b) return;
      state.klass = b.dataset.klass && state.klass !== b.dataset.klass ? b.dataset.klass : null;
      renderStrip(); renderField();
    });
    // doors inside the fork demo
    el("forkDemo").addEventListener("click", e => {
      const d = e.target.closest("[data-alt]");
      if (d) { state.alt = d.dataset.alt; renderFork(); }
    });
    // profiles
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });

    renderFork(); renderCards(); renderWall(); renderField(); renderMuster(); renderStrip();
  }

  window.COA_STUDY = { classes, roleLine, famLine, radarSVG, legendSVG, fieldCells, musterHTML, AXES };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("forkDemo")) init();
})();
