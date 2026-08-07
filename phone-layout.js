/* Ruled phone layout for the rhythm study (grammar contract, sessions 2-3).
   Loads last on rhythm-class.html. Five jobs, all at 560px and below:
   1. Chrome 6b (session 3): one sticky row — glyph sigil, search, icon nav with
      labels that fade on scroll. The session-2 bottom deck is superseded.
   2. Video: the class-highlight thumbnail returns, masthead top-right.
   3. Seal 2: swap the cultist drawing to the tightened 420x224 arrangement.
   4. Cards 3: All-4 bottom sheet behind the standalone selected card.
   5. Strips 4: swap in the authored-to-fit S2 phone redraws. */
(() => {
  "use strict";
  const params = new URLSearchParams(location.search);
  const classSlug = params.get("c") || "cultist";
  const rail = document.getElementById("rail");
  const codex = document.getElementById("codex");
  if (!rail || !codex) return;
  const mq = matchMedia("(max-width: 560px)");

  // ---------- 1 · single-row icon chrome (session 3) ----------
  // The class page has no search backend; the box links to the Atlas search for now
  // (grammar 6b scope note). Labels fade once scrolled; icons stand alone.
  const topbar = document.querySelector(".a-topbar");
  if (topbar) topbar.insertAdjacentHTML("beforeend", `
    <a class="ph-search" href="index.html" aria-label="Search the Atlas">⌕&nbsp;&nbsp;Search specs, abilities…</a>
    <nav class="ph-icons" aria-label="Site pages">
      <a class="active" href="index.html" aria-label="Atlas">⚜<span class="tl">Atlas</span></a>
      <a href="choose.html" aria-label="Choose">◈<span class="tl">Choose</span></a>
      <a href="guided.html" aria-label="Guided">✦<span class="tl">Guided</span></a>
      <a href="loot.html" aria-label="Loot 45+">⚔<span class="tl">Loot</span></a>
    </nav>`);
  let wasScrolled = false;
  addEventListener("scroll", () => {
    const scrolled = scrollY > 56;
    if (scrolled !== wasScrolled) {
      wasScrolled = scrolled;
      document.body.classList.toggle("ph-scrolled", scrolled);
    }
  }, { passive: true });

  // On phone the sigil is its glyph alone; the wordmark returns above 560px.
  const sigil = document.querySelector(".a-sigil");
  const sigilFull = sigil ? sigil.textContent : "";
  function applySigil() { if (sigil) sigil.textContent = mq.matches ? "⚜" : sigilFull; }

  // ---------- 2 · class-highlight thumbnail, masthead top-right ----------
  const R = window.COA_RENDER;
  const vid = R?.data.specs.find(s => s.id.split("/")[0] === classSlug && s.media.classVideo)?.media.classVideo;
  const mast = document.getElementById("mast");
  if (vid && mast) mast.insertAdjacentHTML("beforeend", `
    <a class="ph-thumb" href="https://www.youtube.com/watch?v=${vid}" target="_blank" rel="noreferrer"
       title="Official Ascension class video — an older fantasy reference, not evidence">
      <img src="https://i.ytimg.com/vi/${vid}/mqdefault.jpg" alt="" loading="lazy">
      <span class="play">▶</span><span class="cap">Class highlight</span></a>`);

  // ---------- 2 · tightened cultist seal ----------
  // The ruled 420x224 arrangement: orbits 60/77, eye at .66, node rows raised,
  // nothing removed. Tinker's 420x205 schematic is already compact and untouched.
  const NODES = [
    { id: "cultist/corruption", name: "Corruption", verb: "SPREAD", x: 73, y: 56 },
    { id: "cultist/dreadnought", name: "Dreadnought", verb: "ENDURE", x: 347, y: 56 },
    { id: "cultist/heretic", name: "Heretic", verb: "CONVERT", x: 73, y: 167 },
    { id: "cultist/godblade", name: "Godblade", verb: "CROSS", x: 347, y: 167 },
  ];
  const nodeSvg = s => `<g class="cd-node" data-cd-spec="${s.id}" role="button" tabindex="0" transform="translate(${s.x} ${s.y})">
    <circle class="node-ring" r="29"/><circle class="node-dot" r="4"/>
    <text class="node-name" text-anchor="middle" y="40">${s.name}</text>
    <text class="node-verb" text-anchor="middle" y="52">${s.verb}</text></g>`;
  const TIGHT_SEAL = `<title id="seal-title">Insanity expressed as four Cultist bargains</title>
    <defs>
      <radialGradient id="cdIris"><stop offset="0" stop-color="#e1b968"/><stop offset=".34" stop-color="#8e4fb2"/><stop offset="1" stop-color="#25112f"/></radialGradient>
      <filter id="cdGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>
    <path class="cd-tendril" d="M210 110 C130 30 105 200 22 158 M210 110 C290 30 315 200 398 158"/>
    <circle class="cd-orbit threshold" cx="210" cy="110" r="60"/><circle class="cd-orbit" cx="210" cy="110" r="77"/>
    ${NODES.map(s => `<path class="cd-link" d="M210 110 L${s.x} ${s.y}"/>`).join("")}
    <g transform="translate(210 110) scale(.66)">
      <path class="cd-eye-shell" d="M-55 0 Q0-41 55 0 Q0 41-55 0Z"/>
      <path class="cd-eye-lid" d="M-55 0 Q0-41 55 0 M-55 0 Q0 41 55 0"/>
      <circle class="cd-iris" r="24"/><ellipse class="cd-pupil" rx="7" ry="23"/>
    </g>
    <text class="cd-center-label" x="210" y="152" text-anchor="middle">INSANITY</text>
    <text class="cd-threshold" x="210" y="32" text-anchor="middle">60 · HOLD</text>
    <text class="cd-threshold" x="210" y="192" text-anchor="middle">100 · CROSS</text>
    ${NODES.map(nodeSvg).join("")}`;

  const sealSvg = document.querySelector("#mast .cd-seal svg");
  let desktopSeal = null;
  function applySeal() {
    if (classSlug !== "cultist" || !sealSvg) return;
    if (mq.matches) {
      if (desktopSeal === null) desktopSeal = { html: sealSvg.innerHTML, vb: sealSvg.getAttribute("viewBox") };
      sealSvg.setAttribute("viewBox", "0 0 420 224");
      sealSvg.innerHTML = TIGHT_SEAL;
    } else if (desktopSeal !== null) {
      sealSvg.setAttribute("viewBox", desktopSeal.vb);
      sealSvg.innerHTML = desktopSeal.html;
      desktopSeal = null;
    }
    syncActive();
  }
  function syncActive() {
    const id = rail.querySelector(".rail-card.sel")?.dataset.sel;
    if (!id) return;
    document.querySelectorAll("[data-cd-spec]").forEach(el =>
      el.classList.toggle("active", el.dataset.cdSpec === id));
  }

  // ---------- 3 · All-4 sheet ----------
  // Sheet cards carry data-cd-spec, so class-diagram-study's document-level
  // delegation routes taps to the real rail card and sync() keeps .active fresh.
  rail.insertAdjacentHTML("afterend",
    `<button class="ph-all-btn" type="button" aria-haspopup="dialog">All ${rail.children.length || 4} specializations ▾</button>
     <div class="ph-backdrop"></div>
     <div class="ph-sheet" role="dialog" aria-label="Choose a specialization"><div class="grip"></div>
       <h4>${classSlug === "tinker" ? "Tinker" : "Cultist"} · specializations</h4><div class="ph-sheet-cards"></div></div>`);
  const allBtn = document.querySelector(".ph-all-btn");
  const backdrop = document.querySelector(".ph-backdrop");
  const sheetCards = document.querySelector(".ph-sheet-cards");
  function buildSheet() {
    sheetCards.innerHTML = "";
    rail.querySelectorAll(".rail-card").forEach(card => {
      const clone = card.cloneNode(true);
      clone.removeAttribute("id");
      clone.removeAttribute("aria-selected");
      clone.classList.remove("sel");
      clone.dataset.cdSpec = clone.dataset.sel;
      delete clone.dataset.sel;
      sheetCards.appendChild(clone);
    });
    allBtn.textContent = `All ${rail.children.length} specializations ▾`;
  }
  function openSheet(want) {
    if (want) buildSheet();
    document.body.classList.toggle("ph-sheet-open", want);
    if (want) syncActive(); else allBtn.focus();
  }
  allBtn.addEventListener("click", () => openSheet(true));
  backdrop.addEventListener("click", () => openSheet(false));
  sheetCards.addEventListener("click", e => {
    if (e.target.closest("[data-cd-spec]")) openSheet(false);
  });
  addEventListener("keydown", e => {
    if (e.key === "Escape" && document.body.classList.contains("ph-sheet-open")) openSheet(false);
  });

  // ---------- 4 · S2 phone strips ----------
  // Authored-to-fit redraws: same topology, fewer labels, full width, no scroll.
  // Reading lines are untouched — only the drawing swaps.
  const PHONE_STRIPS = {
    "cultist/godblade": `<svg viewBox="0 0 380 214" role="img" aria-label="Godblade rhythm, phone: build, hold at 60, one burst window at 100 that also endangers you, then rebuild">
      <text class="strip-note" x="372" y="14" text-anchor="end">shape, not rotation</text>
      <line class="thr" x1="8" y1="40" x2="372" y2="40"/><text class="thr-lab" x="8" y="33">100 · cross</text>
      <line class="thr" x1="8" y1="82" x2="372" y2="82"/><text class="thr-lab" x="8" y="75">60 · hold</text>
      <line class="ax" x1="8" y1="150" x2="372" y2="150"/>
      <path class="gb-climb" d="M12 150 L58 132 L72 137 L110 116 L124 120 L158 96 L172 99 L186 88 L186 150 Z"/>
      <rect class="gb-window" x="205" y="46" width="98" height="104" rx="2"/>
      <text class="gb-window-lab" x="254" y="76" text-anchor="middle">BURST</text>
      <text class="gb-window-lab" x="254" y="92" text-anchor="middle">WINDOW</text>
      <text class="ph2" x="254" y="110" text-anchor="middle" fill="#e6ccff">Voidborne</text>
      <text class="ph2" x="254" y="123" text-anchor="middle" fill="#e6ccff">Rifted Hammer</text>
      <rect class="hazard" x="205" y="154" width="98" height="6"/>
      <path class="gb-climb" d="M318 150 L344 138 L354 141 L370 132 L370 150 Z"/>
      <text class="ph" x="98" y="170" text-anchor="middle">BUILD</text>
      <text class="ph2" x="98" y="184" text-anchor="middle">Insanity climbs</text>
      <text class="ph" x="176" y="66" text-anchor="middle">HOLD</text>
      <text class="ph" x="344" y="170" text-anchor="middle">…REBUILD</text>
      <text class="hazard-lab" x="254" y="172" text-anchor="middle">extra damage here</text>
    </svg>`,
    "cultist/corruption": `<svg viewBox="0 0 380 212" role="img" aria-label="Corruption rhythm, phone: DoT ticks never stop, beam payoffs repeat, refreshes sit between them, Insanity drifts toward a choice">
      <text class="strip-note" x="372" y="14" text-anchor="end">shape, not rotation</text>
      <line class="ax" x1="8" y1="150" x2="372" y2="150"/>
      ${Array.from({ length: 16 }, (_, i) => `<line class="tick" x1="${16 + i * 22}" y1="146" x2="${16 + i * 22}" y2="154"/>`).join("")}
      <path class="wave" d="M55 150 Q120 62 185 150 Z"/>
      <path class="wave" d="M220 150 Q285 62 350 150 Z"/>
      <text class="ph" x="120" y="56" text-anchor="middle">BEAM &amp; GAZE</text>
      <text class="ph" x="285" y="56" text-anchor="middle">BEAM &amp; GAZE</text>
      <path class="refresh" d="M195 112 l8 -8 l8 8 l-8 8 Z"/>
      <text class="refresh-lab" x="203" y="94" text-anchor="middle">refresh</text>
      <text class="ph" x="120" y="170" text-anchor="middle">CARPET</text>
      <text class="ph2" x="120" y="184" text-anchor="middle">Darkwither everything</text>
      <text class="ph" x="285" y="170" text-anchor="middle">HARVEST</text>
      <text class="ph2" x="285" y="184" text-anchor="middle">ticks accelerate the payoffs</text>
      <text class="ph2" x="190" y="204" text-anchor="middle">Insanity drifts: Wrath state at 100 — or Sanity Tap it into mana</text>
    </svg>`,
    "tinker/demolition": `<svg viewBox="0 0 380 214" role="img" aria-label="Demolition rhythm, phone: layers of deployables stack, everything overlaps in one window, then the machine idles and gets rebuilt">
      <text class="strip-note" x="372" y="14" text-anchor="end">shape, not rotation</text>
      <line class="ax" x1="8" y1="150" x2="372" y2="150"/>
      <rect class="brick" x="16" y="136" width="124" height="11" rx="1"/><text class="brick-lab" x="21" y="145">Napalm</text>
      <rect class="brick" x="32" y="122" width="108" height="11" rx="1"/><text class="brick-lab" x="37" y="131">oil</text>
      <rect class="brick" x="48" y="108" width="92" height="11" rx="1"/><text class="brick-lab" x="53" y="117">turret</text>
      <rect class="brick" x="64" y="94" width="76" height="11" rx="1"/><text class="brick-lab" x="69" y="103">drone</text>
      <rect class="dm-window" x="160" y="52" width="100" height="98" rx="2"/>
      <text class="dm-window-lab" x="210" y="82" text-anchor="middle">FIRE</text>
      <text class="dm-window-lab" x="210" y="98" text-anchor="middle">ALL OF IT</text>
      <text class="ph2" x="210" y="116" text-anchor="middle" fill="#f2dcae">instant rockets,</text>
      <text class="ph2" x="210" y="129" text-anchor="middle" fill="#f2dcae">every layer overlaps</text>
      <rect class="idle" x="272" y="84" width="70" height="40" rx="2"/>
      <text class="ph2" x="307" y="100" text-anchor="middle">pack moved —</text>
      <text class="ph2" x="307" y="113" text-anchor="middle">it idles</text>
      <rect class="brick" x="300" y="136" width="64" height="11" rx="1"/>
      <rect class="brick" x="316" y="122" width="48" height="11" rx="1"/>
      <text class="ph" x="85" y="170" text-anchor="middle">BUILD</text>
      <text class="ph2" x="85" y="184" text-anchor="middle">layers must hit the same pack</text>
      <text class="ph" x="210" y="170" text-anchor="middle">SPARKED &amp; READY</text>
      <text class="ph" x="332" y="170" text-anchor="middle">REBUILD</text>
    </svg>`,
  };

  function applyStrips() {
    const root = codex.querySelector("[data-spec-root]");
    const block = root?.querySelector(".ry-block");
    const svg = block?.querySelector(":scope > svg");
    if (!root || !block || !svg) return;
    const phone = PHONE_STRIPS[root.dataset.spec];
    if (mq.matches && phone && block.dataset.phSwapped !== "1") {
      block.dataset.phDesktop = svg.outerHTML;
      svg.outerHTML = phone;
      block.dataset.phSwapped = "1";
    } else if (!mq.matches && block.dataset.phSwapped === "1") {
      block.querySelector(":scope > svg").outerHTML = block.dataset.phDesktop;
      delete block.dataset.phSwapped;
      delete block.dataset.phDesktop;
    }
  }

  let strippling = false;
  new MutationObserver(() => {
    if (strippling) return;
    strippling = true;
    requestAnimationFrame(() => { strippling = false; applyStrips(); syncActive(); });
  }).observe(codex, { childList: true, subtree: true });

  mq.addEventListener("change", () => { applySigil(); applySeal(); applyStrips(); });
  applySigil();
  applySeal();
  applyStrips();
})();
