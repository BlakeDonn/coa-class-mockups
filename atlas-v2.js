/* The Atlas as ruled — reference assembly. Classes-first toggle, ruled class cards,
   spec view with the ruled pip tooltips. Workbench intentionally not wired (ships
   unchanged from the live Atlas). */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY, C2 = window.COA_CARD2;
  if (!R || !S || !C2) throw new Error("study scripts must load first");
  const { data, specById, famById, AXIS_LABELS, CX_ORDINAL, esc, pips, glyph, qcls, cxCell, bestCtx } = R;

  const RULED = { engine: "blurb", doors: "wow-words", corner: "video" };
  const state = { view: "classes", role: "All", range: "All", q: "" };
  const el = id => document.getElementById(id);

  // ---------- specs view (shipped card + ruled pip tooltips, no bench) ----------
  function specCard(s) {
    const bc = bestCtx(s) || "boss";
    const rows = [["Core actions", "core_actions"], ["Tracking", "state_tracking"],
                  ["Reactive", "reactive_decisions"], ["Failure cost", "failure_cost"]];
    const hasPips = rows.some(([, k]) => cxCell(s, k, bc));
    return `<article class="plate spec-card ${qcls(s)}" tabindex="0" role="button" style="--class-color:${s.color}"
        data-open="${s.id}" aria-label="Open ${esc(s.name)} profile">
      <div class="card-top card-glow">
        <span class="card-glyphmark" aria-hidden="true">${glyph(s)}</span>
        <span class="spec-icon">${s.media.icons[0]
          ? `<img src="https://coabuildhub.com/skill-icons/${esc(s.media.icons[0].icon)}.jpg" alt="" loading="lazy">`
          : glyph(s)}</span>
        <div><h3>${esc(s.name)}</h3>
          <div class="sub">${esc(s.klass)} · ${[...s.roles, ...s.range].map(esc).join(" · ")}</div></div>
      </div>
      ${s.fantasy ? `<p class="card-fantasy">"${esc(s.fantasy)}"</p>` : ""}
      <div class="card-mid"><p class="clamp2">${esc(s.oneLine)}</p></div>
      ${hasPips ? `<div class="card-axes">
          <div class="axhead">Relative demand · ${R.CTX_LABELS[bc]}</div>
          ${rows.map(([n, k]) => {
            const c = cxCell(s, k, bc);
            return c ? `<span class="pip-row tipped" data-tipname="${esc(AXIS_LABELS[k])} — ${esc(c.v)}"
              data-tip="${esc(c.why || "")}">${n}${pips(CX_ORDINAL[c.v] || 0)}</span>` : "";
          }).filter(Boolean).join("")}
        </div>`
        : `<div class="card-axes"><div class="pips-na" style="margin-left:0">complexity not yet researched</div></div>`}
      <div class="card-foot">
        <span>${s.community.count ? `${s.community.count} build${s.community.count === 1 ? "" : "s"}` : "no builds"}</span>
        <span class="q-tag" style="margin-left:auto">${s.enriched ? "Curated" : "In progress"}</span>
      </div>
    </article>`;
  }

  const specMatches = s => {
    if (state.role !== "All" && !s.roles.includes(state.role)) return false;
    if (state.range !== "All" && !s.range.includes(state.range)) return false;
    if (state.q) {
      const hay = [s.name, s.klass, s.oneLine, famById[s.atlas].name, ...s.roles, ...s.range]
        .join(" ").toLowerCase();
      if (!hay.includes(state.q)) return false;
    }
    return true;
  };
  const classMatches = c => !state.q ||
    [c.name, ...c.specs.map(s => s.name)].join(" ").toLowerCase().includes(state.q);

  function render() {
    el("filters").hidden = state.view !== "specs";
    if (state.view === "classes") {
      const vis = S.classes.filter(classMatches);
      el("view").innerHTML = `<div class="v2-classes">${vis.map(c => C2.composeCard(c, RULED)).join("")}</div>`;
      el("resultCount").textContent = vis.length === 21 ? "All 21 classes" : `${vis.length} of 21 classes`;
      return;
    }
    const visible = data.specs.filter(specMatches);
    const byFam = new Map(data.families.map(f => [f.id, []]));
    visible.forEach(s => byFam.get(s.atlas).push(s));
    el("view").innerHTML = data.families.map(f => {
      const specs = byFam.get(f.id);
      if (!specs.length) return "";
      return `<section class="family-section">
        <header class="plate fam-banner">
          <div class="kick">Playstyle family · ${specs.length} spec${specs.length === 1 ? "" : "s"}</div>
          <h2>${esc(f.name)}</h2>
          <div class="fam-rule"></div>
          <p>${esc(f.tagline)} ${esc(f.feels)}</p>
        </header>
        <div class="atlas-grid">${specs.map(specCard).join("")}</div>
      </section>`;
    }).join("");
    el("resultCount").textContent = visible.length === data.specCount
      ? `Showing all ${data.specCount} specializations`
      : `Showing ${visible.length} of ${data.specCount} specializations`;
  }

  function openProfile(id) {
    const s = specById[id];
    if (!s) return;
    el("profileContent").innerHTML = R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  function init() {
    el("lens").addEventListener("click", e => {
      const b = e.target.closest("button[data-view]");
      if (!b) return;
      state.view = b.dataset.view;
      el("lens").querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      render();
    });
    document.querySelectorAll("[data-filter-group]").forEach(group => {
      group.addEventListener("click", e => {
        const b = e.target.closest("button[data-filter]");
        if (!b) return;
        state[group.dataset.filterGroup] = b.dataset.filter;
        group.querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
        render();
      });
    });
    el("searchInput").addEventListener("input", () => {
      state.q = el("searchInput").value.trim().toLowerCase();
      render();
    });
    document.addEventListener("click", e => {
      if (e.target.closest(".ri") || e.target.closest(".cl-rare li") || e.target.closest("a.cl-thumb")) return;
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest?.(".spec-card[data-open]");
        if (card) { e.preventDefault(); openProfile(card.dataset.open); }
      }
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });
    render();
  }

  // ---------- round 3 (session 6): star-map placement variants ----------
  // Grammar §5/§7: where the interim star map lives in Atlas nav. ghost = the masthead
  // ghost button (the live proposal). lens = third state on the Classes/Specs toggle.
  // band = a section door after the card grids. One renders at a time.
  function starMapVariant() {
    if (!el("smBand") || !el("lens")) return;
    const p = new URLSearchParams(location.search);
    const sm = ["ghost", "lens", "band"].includes(p.get("sm")) ? p.get("sm") : "ghost";
    document.body.classList.add(`smv-${sm}`);
    if (sm === "lens") el("lens").insertAdjacentHTML("beforeend",
      `<a class="lens-star" href="starmap.html">✦ Star Map</a>`);
    if (sm === "band") el("smBand").hidden = false;
    if (p.get("sw") === "off") return;
    const LAB = { ghost: "ghost · masthead button", lens: "lens · toggle third state", band: "band · section door" };
    document.body.insertAdjacentHTML("beforeend",
      `<aside style="position:fixed;z-index:90;right:12px;bottom:12px;width:220px;padding:10px;border:1px solid #4b4651;border-radius:5px;background:#111218f2;box-shadow:0 12px 40px #000b;font:10px/1.45 Arial,sans-serif;color:#9da0a8">
        <strong style="display:block;margin-bottom:6px;color:#d2b369;letter-spacing:.14em;text-transform:uppercase">Star-map placement</strong>
        ${["ghost", "lens", "band"].map(v =>
          `<a style="display:block;margin-top:4px;padding:5px 7px;border:1px solid ${v === sm ? "#9c6bb1" : "#34343a"};border-radius:3px;color:${v === sm ? "#f0d7ff" : "#b8bac0"};text-decoration:none;${v === sm ? "background:#2b1b31" : ""}" href="atlas-v2.html?sm=${v}">${LAB[v]}</a>`).join("")}
        <small style="display:block;margin-top:7px;color:#6f727b">Round 3: only the star map's home changes. The map itself is the ruled interim starmap.</small>
      </aside>`);
  }
  starMapVariant();

  window.COA_ATLAS_V2 = { specCard, render: null };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("lens")) init();
})();
