(() => {
  "use strict";
  const params = new URLSearchParams(location.search);
  const concept = params.get("concept") || "seal";
  const classSlug = params.get("c") || "cultist";
  if (!["cultist", "tinker"].includes(classSlug)) return;

  const mast = document.getElementById("mast");
  const rail = document.getElementById("rail");
  if (!mast || !rail) return;

  const cultistSpecs = [
    { id: "cultist/corruption", name: "Corruption", verb: "SPREAD", x: 73, y: 55 },
    { id: "cultist/dreadnought", name: "Dreadnought", verb: "ENDURE", x: 347, y: 55 },
    { id: "cultist/heretic", name: "Heretic", verb: "CONVERT", x: 73, y: 153 },
    { id: "cultist/godblade", name: "Godblade", verb: "CROSS", x: 347, y: 153 },
  ];

  const tinkerSpecs = [
    { id: "tinker/demolition", name: "Demolition", verb: "DETONATE", x: 78, y: 50, icon: "bomb" },
    { id: "tinker/invention", name: "Invention", verb: "RESTORE", x: 342, y: 50, icon: "beacon" },
    { id: "tinker/mechanics", name: "Mechanics", verb: "OVERCLOCK", x: 210, y: 149, icon: "mech" },
  ];

  function defs() {
    return `<defs>
      <radialGradient id="cdIris"><stop offset="0" stop-color="#e1b968"/><stop offset=".34" stop-color="#8e4fb2"/><stop offset="1" stop-color="#25112f"/></radialGradient>
      <filter id="cdGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>`;
  }

  function eye(cx, cy, scale = 1) {
    return `<g transform="translate(${cx} ${cy}) scale(${scale})">
      <path class="cd-eye-shell" d="M-55 0 Q0-41 55 0 Q0 41-55 0Z"/>
      <path class="cd-eye-lid" d="M-55 0 Q0-41 55 0 M-55 0 Q0 41 55 0"/>
      <circle class="cd-iris" r="24"/><ellipse class="cd-pupil" rx="7" ry="23"/>
    </g>`;
  }

  function node(s) {
    return `<g class="cd-node" data-cd-spec="${s.id}" role="button" tabindex="0" transform="translate(${s.x} ${s.y})">
      <circle class="node-ring" r="29"/><circle class="node-dot" r="4"/>
      <text class="node-name" text-anchor="middle" y="42">${s.name}</text>
      <text class="node-verb" text-anchor="middle" y="54">${s.verb}</text>
    </g>`;
  }

  function seal() {
    const sealSpecs = cultistSpecs.map((s, i) => ({ ...s, y: i < 2 ? 55 : 137 }));
    mast.classList.add("cd-with-seal");
    mast.insertAdjacentHTML("beforeend", `<div class="cd-stage cd-seal" aria-label="Cultist class engine diagram">
      <svg viewBox="0 0 420 205" role="img" aria-labelledby="seal-title"><title id="seal-title">Insanity expressed as four Cultist bargains</title>${defs()}
        <path class="cd-tendril" d="M210 102 C130 20 105 190 22 145 M210 102 C290 20 315 190 398 145"/>
        <circle class="cd-orbit threshold" cx="210" cy="102" r="69"/><circle class="cd-orbit" cx="210" cy="102" r="88"/>
        ${sealSpecs.map(s => `<path class="cd-link" d="M210 102 L${s.x} ${s.y}"/>`).join("")}
        ${eye(210, 102, .72)}
        <text class="cd-center-label" x="210" y="107" text-anchor="middle">INSANITY</text>
        <text class="cd-threshold" x="210" y="28" text-anchor="middle">60 · HOLD</text>
        <text class="cd-threshold" x="210" y="183" text-anchor="middle">100 · CROSS</text>
        ${sealSpecs.map(node).join("")}
      </svg></div>`);
  }

  function ritualPlate() {
    mast.insertAdjacentHTML("afterend", `<section class="cd-stage cd-ritual-plate" aria-label="Cultist ritual blueprint">
      <span class="plate-title">Cultist · anatomy of a bargain</span><span class="plate-note">Select a path to open its original profile</span>
      <svg viewBox="0 0 1000 286" role="img" aria-labelledby="plate-title"><title id="plate-title">Cultist ritual circle with four specializations</title>${defs()}
        <path class="cd-tendril" d="M500 148 C390 30 320 252 102 192 M500 148 C610 30 680 252 898 192 M500 148 C370 120 305 34 132 76 M500 148 C630 120 695 34 868 76"/>
        <circle class="cd-orbit" cx="500" cy="148" r="111"/><circle class="cd-orbit threshold" cx="500" cy="148" r="89"/>
        <circle class="cd-orbit" cx="500" cy="148" r="63"/>
        <path class="cd-link-soft" d="M74 143 H926 M500 28 V265"/>
        <path class="cd-link" d="M500 148 L210 74 M500 148 L790 74 M500 148 L210 216 M500 148 L790 216"/>
        ${eye(500,148,1)}
        <text class="cd-center-label" x="500" y="153" text-anchor="middle">INSANITY</text>
        <text class="cd-threshold" x="500" y="49" text-anchor="middle">60 · THE HELD LINE</text>
        <text class="cd-threshold" x="500" y="254" text-anchor="middle">100 · THE OPEN EYE</text>
        ${[
          {...cultistSpecs[0],x:210,y:74},{...cultistSpecs[1],x:790,y:74},{...cultistSpecs[2],x:210,y:216},{...cultistSpecs[3],x:790,y:216}
        ].map(node).join("")}
        <text class="cd-rune" x="92" y="147" text-anchor="middle">WHISPER</text><text class="cd-rune" x="908" y="147" text-anchor="middle">ANSWER</text>
      </svg></section>`);
    const plate = mast.nextElementSibling;
    if (matchMedia("(max-width: 620px)").matches) requestAnimationFrame(() => {
      plate.scrollLeft = (plate.scrollWidth - plate.clientWidth) / 2;
    });
  }

  function compass() {
    mast.insertAdjacentHTML("afterend", `<section class="cd-stage cd-compass" aria-label="Interactive Cultist spec compass">
      <span class="compass-title">The four bargains</span>
      <svg class="compass-lines" viewBox="0 0 1000 206" preserveAspectRatio="none" aria-hidden="true">${defs()}
        <circle class="cd-orbit threshold" cx="500" cy="106" r="72"/><path class="cd-link" d="M500 106 L206 70 M500 106 L794 70 M500 106 L206 168 M500 106 L794 168"/>
        <path class="cd-link-soft" d="M500 8 V198 M330 106 H670"/>
      </svg>
      <div class="compass-core" aria-hidden="true"></div><span class="core-label">Insanity</span>
      ${cultistSpecs.map((s,i) => `<button class="compass-node n-${s.id.split("/")[1]}" data-cd-spec="${s.id}"><b>${s.name}</b><span>${s.verb}</span></button>`).join("")}
    </section>`);
  }

  function gearPoints(cx, cy, outer, inner, teeth = 12) {
    return Array.from({ length: teeth * 2 }, (_, i) => {
      const angle = -Math.PI / 2 + (i * Math.PI / teeth);
      const radius = i % 2 ? inner : outer;
      return `${(cx + Math.cos(angle) * radius).toFixed(1)},${(cy + Math.sin(angle) * radius).toFixed(1)}`;
    }).join(" ");
  }

  function tinkerDefs() {
    return `<defs>
      <radialGradient id="tkCore"><stop offset="0" stop-color="#f4d67c"/><stop offset=".42" stop-color="#b66d24"/><stop offset="1" stop-color="#2b2114"/></radialGradient>
      <linearGradient id="tkMetal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d7b16b"/><stop offset=".45" stop-color="#64513a"/><stop offset="1" stop-color="#201c18"/></linearGradient>
      <filter id="tkGlow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      <pattern id="tkGrid" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M14 0H0V14" fill="none" stroke="#d9a441" stroke-width=".45" opacity=".12"/></pattern>
    </defs>`;
  }

  function tinkerIcon(s) {
    if (s.icon === "bomb") return `<circle class="tk-icon-line" r="9"/><path class="tk-icon-line" d="M5-8 Q12-17 17-10 M14-13l5-3m-3 6 5 1"/>`;
    if (s.icon === "beacon") return `<path class="tk-icon-line" d="M-9 10V-8H9V10M-14 10H14M0-4v9M-5 .5H5"/><path class="tk-signal" d="M-15-8Q0-21 15-8M-10-5Q0-14 10-5"/>`;
    return `<path class="tk-icon-line" d="M-13-8H13V10H-13ZM-7 10v6m14-6v6M-5-1h2m6 0h2M-6 5H6"/><path class="tk-signal" d="M0-8v-7m-4 0h8"/>`;
  }

  function tinkerNode(s) {
    return `<g class="cd-node tk-node" data-cd-spec="${s.id}" role="button" tabindex="0" transform="translate(${s.x} ${s.y})">
      <circle class="node-ring" r="27"/><circle class="tk-bolt" r="21"/>${tinkerIcon(s)}
      <text class="node-name" text-anchor="middle" y="39">${s.name}</text>
      <text class="node-verb" text-anchor="middle" y="51">${s.verb}</text>
    </g>`;
  }

  function tinkerSeal() {
    mast.classList.add("cd-with-seal", "cd-tinker-mast");
    mast.insertAdjacentHTML("beforeend", `<div class="cd-stage cd-seal cd-tinker-seal" aria-label="Tinker class engine diagram">
      <svg viewBox="0 0 420 205" role="img" aria-labelledby="tinker-seal-title"><title id="tinker-seal-title">A workshop core routes Tinker's machines into demolition, healing invention, or an overclocked mech</title>${tinkerDefs()}
        <rect class="tk-grid" x="8" y="8" width="404" height="189" rx="2"/>
        <path class="tk-trace" d="M210 94 L78 50 M210 94 L342 50 M210 94 L210 149"/>
        <path class="tk-trace tk-trace-hot" d="M210 94 L78 50 M210 94 L342 50 M210 94 L210 149"/>
        <circle class="tk-orbit" cx="210" cy="94" r="58"/><circle class="tk-orbit dashed" cx="210" cy="94" r="47"/>
        <polygon class="tk-gear" points="${gearPoints(210,94,43,35,12)}"/>
        <circle class="tk-core" cx="210" cy="94" r="27"/><circle class="tk-core-ring" cx="210" cy="94" r="17"/>
        <text class="tk-center-label" x="210" y="96" text-anchor="middle">BUILD</text>
        <text class="tk-center-sub" x="210" y="106" text-anchor="middle">MACHINES</text>
        <text class="tk-legend" x="18" y="20">WORKSHOP SCHEMATIC // TEMPORARY MACHINES</text>
        <text class="tk-legend right" x="402" y="190" text-anchor="end">BUILD · DEPLOY · ADAPT</text>
        ${tinkerSpecs.map(tinkerNode).join("")}
      </svg></div>`);
  }

  function generatedSeal() {
    const generatedSpecs = classSlug === "cultist"
      ? [
          { ...cultistSpecs[0], px: 17.3, py: 22.5 },
          { ...cultistSpecs[1], px: 82.7, py: 22.5 },
          { ...cultistSpecs[2], px: 17.3, py: 78, lower: true },
          { ...cultistSpecs[3], px: 82.7, py: 78, lower: true },
        ]
      : [
          { ...tinkerSpecs[0], px: 18.6, py: 28 },
          { ...tinkerSpecs[1], px: 81.4, py: 28 },
          { ...tinkerSpecs[2], px: 50, py: 74, lower: true },
        ];
    mast.classList.add("cd-with-seal", "cd-generated-mast");
    mast.insertAdjacentHTML("beforeend", `<div class="cd-stage cd-seal cd-generated-seal cd-generated-${classSlug}" aria-label="Interactive generated ${classSlug} class diagram">
      ${generatedSpecs.map(s => `<button class="cd-generated-hotspot${s.lower ? " lower" : ""}" style="--hotspot-x:${s.px}%;--hotspot-y:${s.py}%" data-cd-spec="${s.id}" aria-label="Select ${s.name}: ${s.verb.toLowerCase()}">
        <span><b>${s.name}</b><small>${s.verb}</small></span>
      </button>`).join("")}
    </div>`);
  }

  function overviewDeck() {
    const layout = ["split", "unified", "band", "orbit", "orbit-core"].includes(params.get("layout")) ? params.get("layout") : "split";
    const artifact = mast.querySelector(".cd-seal");
    if (!artifact) return;
    mast.classList.remove("cd-with-seal", "cd-tinker-mast");
    artifact.classList.add("cd-deck-artifact");

    const deck = document.createElement("section");
    deck.className = `cd-overview-deck cd-layout-${layout} cd-${classSlug}-deck${classSlug === "tinker" ? " cd-three-specs" : " cd-four-specs"}`;
    deck.setAttribute("aria-label", `${classSlug === "tinker" ? "Tinker" : "Cultist"} class diagram and specialization cards`);
    mast.insertAdjacentElement("afterend", deck);
    deck.append(artifact, rail);
  }

  if (classSlug === "cultist" && (concept === "seal" || concept === "deck")) seal();
  if (classSlug === "cultist" && concept === "ritual") ritualPlate();
  if (classSlug === "cultist" && concept === "compass") compass();
  if (classSlug === "tinker" && (concept === "seal" || concept === "deck")) tinkerSeal();
  if (concept === "generated") generatedSeal();
  if (concept === "deck") overviewDeck();

  const className = classSlug === "tinker" ? "Tinker" : "Cultist";
  const links = [
    [`${classSlug}&concept=generated`, "Generated art · interactive"],
    [`${classSlug}&concept=deck&layout=orbit`, "A · Cards around diagram"],
    [`${classSlug}&concept=deck&layout=orbit-core`, "B · Cards become endpoints"],
    [`${classSlug}&concept=deck&layout=split`, "A · Split deck"],
    [`${classSlug}&concept=deck&layout=unified`, "B · Unified codex"],
    [`${classSlug}&concept=deck&layout=band`, "C · Compact band"],
    [`${classSlug}&concept=seal`, `${className} · Header version`],
    [`${classSlug === "tinker" ? "cultist" : "tinker"}&concept=deck&layout=split`, `${classSlug === "tinker" ? "Cultist" : "Tinker"} · Split deck`],
  ];
  const currentQuery = `${classSlug}&concept=${concept}${concept === "deck" ? `&layout=${params.get("layout") || "split"}` : ""}`;
  document.body.insertAdjacentHTML("beforeend", `<aside class="cd-switcher"><strong>Class diagram study</strong>
    ${links.map(([query,label]) => `<a class="${query === currentQuery ? "current" : ""}" href="diagram-preview.html?c=${query}${location.hash}">${label}</a>`).join("")}
    <a href="class.html?c=${classSlug}${location.hash}">Untouched shipped page</a>
    <small>Only the diagram changes. Original cards and profile remain.</small></aside>`);

  function selectedId() {
    return rail.querySelector(".rail-card.sel")?.dataset.sel || (classSlug === "tinker" ? "tinker/demolition" : "cultist/godblade");
  }
  function sync() {
    const id = selectedId();
    document.querySelectorAll("[data-cd-spec]").forEach(el => el.classList.toggle("active", el.dataset.cdSpec === id));
  }
  document.addEventListener("click", event => {
    const target = event.target.closest("[data-cd-spec]");
    if (!target) return;
    rail.querySelector(`[data-sel="${target.dataset.cdSpec}"]`)?.click();
    sync();
  });
  document.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-cd-spec]")) {
      event.preventDefault(); event.target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });
  new MutationObserver(() => requestAnimationFrame(sync)).observe(rail, { childList: true });
  sync();
})();
