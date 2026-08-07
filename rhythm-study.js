/* Rhythm placement study — scratch only.
   Injects the per-spec rhythm block (cadence strip + reading lines + experimental
   screen card) into the live codex at one of three placements:
   ?p=feel  — under the spec header, before the video
   ?p=stats — after the verdicts, with the pips cluster
   ?p=fold  — as the first fold, open, titled "The rhythm"
   Strips exist only where they have been authored; other specs show the honest gap. */
(() => {
  "use strict";
  const params = new URLSearchParams(location.search);
  const classSlug = params.get("c") || "cultist";
  const placement = ["feel", "stats", "fold"].includes(params.get("p")) ? params.get("p") : "fold";
  const video = ["full", "mini", "off"].includes(params.get("v")) ? params.get("v") : "mini";
  const engine = ["col", "seal", "strip", "off"].includes(params.get("e")) ? params.get("e") : "col";
  const verbEcho = ["chip", "kick", "meta", "off"].includes(params.get("w")) ? params.get("w") : "chip";

  // Seal verbs, mirrored from the seal study. One word per spec: its relation to the engine.
  // Each verb carries a plain gloss, surfaced as a tooltip: a verb must not need the seal to parse.
  const VERBS = {
    "cultist/corruption": ["Spread", "Keep damage-over-time on every target. The engine is coverage."],
    "cultist/dreadnought": ["Endure", "Hold Insanity in a managed band and turn it into survival."],
    "cultist/heretic": ["Convert", "Turn melee aggression into healing for the group."],
    "cultist/godblade": ["Cross", "Push Insanity to 100 on purpose and fight inside the dangerous payoff state."],
    "tinker/demolition": ["Detonate", "Stack explosives and machines, then fire them in one overlapping window."],
    "tinker/invention": ["Restore", "Deploy healing machines where the group will need them."],
    "tinker/mechanics": ["Overclock", "Push your machines and combat suit past their limits."],
  };
  const cardStyle = ["ship", "zoned", "style", "air", "airfam"].includes(params.get("k")) ? params.get("k") : "airfam";
  const pipsMode = ["ship", "tips", "trio", "off"].includes(params.get("s")) ? params.get("s") : "tips";
  const topMode = ["ship", "slim", "tight"].includes(params.get("t")) ? params.get("t") : "ship";
  // trio: the three axes a chooser acts on; the rest stay in the Endgame contexts fold.
  const TRIO = ["Setup burden", "Reactive decisions", "Failure cost"];

  // ADVISOR DRAFT COPY — authored to fit, needs user approval. Rephrased from researched
  // fit/caution/fantasy text only; no new claims.
  const AUTHORED = {
    "cultist/godblade": {
      line: "A Void-infused bruiser courting madness on purpose, cashing the full bar in one perfect burst.",
      yes: "Visibly risky burst windows", no: "Extra damage buys the burst window" },
    "cultist/corruption": {
      line: "A mobile affliction caster who carpets whole packs in Darkwither and grows an eye-and-beam network.",
      yes: "Multi-DoT pressure that accelerates payoffs", no: "No instant burst on a new target" },
    "cultist/heretic": {
      line: "A Yogg-Saron battle healer who marks allies and turns real melee aggression into the group's healing.",
      yes: "Healing earned by a real melee rotation", no: "Demands tracking; not a reactive healer" },
    "cultist/dreadnought": {
      line: "An eldritch shield tank who rides a dangerous Insanity floor and keeps the madness in a working band.",
      yes: "Active shield timing, resource in hand", no: "Mitigation is never passive" },
    "tinker/demolition": {
      line: "An engineer layering bombs, napalm, turrets, and oil until the whole pull is one explosive machine.",
      yes: "Overlapping bombs, turrets, drones, and oil", no: "The complete rotation arrives late" },
    "tinker/invention": {
      line: "A gadget medic surrounding allies with beacons, nanobots, and batteries that hold the group together.",
      yes: "Prepared-area healing and recovery tools", no: "Placement mistakes carry the whole event" },
    "tinker/mechanics": {
      line: "An engineer who converts gunfire into Scrap, feeds it to machines, and climbs into the combat suit.",
      yes: "Several cooperating machines at once", no: "Pet, turret, and resource upkeep" },
  };
  const R = window.COA_RENDER;

  // Loop-topology micro-glyphs, only where a strip has been authored. No invented shapes.
  const TOPO = { "cultist/godblade": "spike", "cultist/corruption": "wave", "tinker/demolition": "stack" };
  function topoGlyph(kind) {
    const art = {
      spike: `<path d="M2 15 L26 6 26 15 Z" class="tg-fill"/><rect x="32" y="3" width="12" height="12" class="tg-hot"/><path d="M50 15 L62 10 62 15 Z" class="tg-fill"/>`,
      wave: `<path d="M2 15 Q9 4 16 15 Q23 4 30 15 Q37 4 44 15 Q51 4 58 15" class="tg-line"/>`,
      stack: `<rect x="2" y="12" width="18" height="3" class="tg-fill"/><rect x="5" y="8" width="15" height="3" class="tg-fill"/><rect x="8" y="4" width="12" height="3" class="tg-fill"/><rect x="28" y="3" width="12" height="12" class="tg-hot"/><rect x="46" y="12" width="14" height="3" class="tg-fill"/>`,
    }[kind];
    return art ? `<svg class="ry-topo" viewBox="0 0 64 18" aria-hidden="true">${art}</svg>` : "";
  }

  function verbChip(specId) {
    const v = VERBS[specId];
    return v ? `<span class="ry-verb-chip" data-tipname="${v[0]}" data-tip="${v[1]}">${v[0]}</span>` : "";
  }

  function rebuiltCard(s) {
    const fam = R.famById[s.atlas];
    const famRow = `<div class="rc-family" ${fam?.tagline ? `data-tipname="${R.esc(fam.name)}" data-tip="${R.esc(fam.tagline)}"` : ""}>
      ${topoGlyph(TOPO[s.id])}<span>${R.esc(fam?.name || "")}</span></div>`;
    if (cardStyle === "air" || cardStyle === "airfam") {
      const a = AUTHORED[s.id];
      if (a) return `
        <div class="rc-top"><b>${R.esc(s.name)}</b>${verbChip(s.id)}</div>
        <div class="rc-role">${[...s.roles, ...s.range].map(R.esc).join(" · ")}</div>
        ${cardStyle === "airfam" ? famRow : ""}
        <p class="rc-line">${R.esc(a.line)}</p>
        <div class="rc-div"></div>
        <div class="rc-mark yes"><span>✓</span><span>${R.esc(a.yes)}</span></div>
        <div class="rc-mark no"><span>✕</span><span>${R.esc(a.no)}</span></div>`;
    }
    const yes = s.fit.enjoy[0]?.t || "";
    const no = s.fit.avoid[0]?.t || "";
    const styleLed = cardStyle === "style";
    return `
      <div class="rc-top"><b>${R.esc(s.name)}</b>${verbChip(s.id)}</div>
      <div class="rc-role">${[...s.roles, ...s.range].map(R.esc).join(" · ")}</div>
      ${styleLed ? famRow : ""}
      <p class="rc-fantasy ${styleLed ? "one-line" : ""}">"${R.esc(s.fantasy || s.oneLine)}"</p>
      ${yes ? `<p class="rc-yes">✓ ${R.esc(yes)}</p>` : ""}
      ${no ? `<p class="rc-no">✕ ${R.esc(no)}</p>` : ""}`;
  }

  // Class-level engine text. Drafted from researched mechanics; the phrasing is the study's proposal.
  const ENGINE = {
    cultist: {
      label: "The engine — Insanity",
      text: "Every Cultist runs on Insanity, and it climbs as you act. Held near 60 it is steady power. At 100 it pays out more and punishes you while it lasts. The four specs differ in how close to that edge they live.",
    },
    tinker: {
      label: "The engine — temporary machines",
      text: "A Tinker's power stands on the field, not on the action bar. You build machines — bombs, turrets, beacons, a mech — deploy them where the fight will be, and keep them overlapping. The three specs point the same workshop at destruction, repair, or the pilot's seat.",
    },
  };
  const codex = document.getElementById("codex");
  if (!codex) return;

  // ---------- cadence strips (authored per spec) ----------
  const corrTicks = Array.from({ length: 36 }, (_, i) =>
    `<line class="tick" x1="${30 + i * 22}" y1="118" x2="${30 + i * 22}" y2="126"/>`).join("");

  const STRIPS = {
    "cultist/godblade": {
      svg: `<svg viewBox="0 0 1000 158" role="img" aria-label="Godblade rhythm: build, hold at 60, one burst window at 100 that also endangers you, then rebuild">
        <text class="strip-note" x="986" y="18" text-anchor="end">the shape of the loop · not a rotation</text>
        <line class="thr" x1="14" y1="32" x2="986" y2="32"/><text class="thr-lab" x="14" y="26">100 · cross</text>
        <line class="thr" x1="14" y1="68" x2="986" y2="68"/><text class="thr-lab" x="14" y="62">60 · hold</text>
        <line class="ax" x1="14" y1="122" x2="986" y2="122"/>
        <path class="gb-climb" d="M20 122 L110 108 L140 112 L240 96 L275 100 L370 82 L400 85 L470 70 L500 74 L530 68 L530 122 Z"/>
        <rect class="gb-window" x="575" y="36" width="170" height="86" rx="2"/>
        <text class="gb-window-lab" x="660" y="66" text-anchor="middle">BURST WINDOW</text>
        <text class="ph2" x="660" y="84" text-anchor="middle" fill="#e8daf7">Voidborne · Rifted Hammer</text>
        <rect class="hazard" x="575" y="126" width="170" height="6"/>
        <text class="hazard-lab" x="660" y="145" text-anchor="middle">you take extra damage here</text>
        <path class="gb-climb" d="M780 122 L870 110 L900 113 L965 102 L965 122 Z"/>
        <text class="ph" x="270" y="142" text-anchor="middle">BUILD</text>
        <text class="ph2" x="270" y="156" text-anchor="middle">Insanity climbs · Rift goes down</text>
        <text class="ph" x="497" y="52" text-anchor="middle">HOLD</text>
        <text class="ph" x="878" y="142" text-anchor="middle">…REBUILD</text>
      </svg>`,
      read: "Most of the fight is preparation. The payoff is one short, loud window that also endangers you. Miss it, and the whole climb was wasted.",
      eyes: "your Insanity bar and your zone placement, then the target. The party barely exists to you.",
    },
    "cultist/corruption": {
      svg: `<svg viewBox="0 0 1000 168" role="img" aria-label="Corruption rhythm: DoT ticks never stop, medium beam payoffs repeat, refreshes sit between them, Insanity drifts toward a choice">
        <defs><marker id="ryArr" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L8 4L0 8z" fill="#8d8678"/></marker></defs>
        <text class="strip-note" x="986" y="18" text-anchor="end">the shape of the loop · not a rotation</text>
        <line class="ax" x1="14" y1="126" x2="986" y2="126"/>
        ${corrTicks}
        <path class="wave" d="M120 126 Q190 52 260 126 Z"/>
        <path class="wave" d="M400 126 Q470 52 540 126 Z"/>
        <path class="wave" d="M660 126 Q730 52 800 126 Z"/>
        <text class="ph" x="190" y="60" text-anchor="middle">BEAM &amp; GAZE</text>
        <text class="ph" x="470" y="60" text-anchor="middle">BEAM &amp; GAZE</text>
        <text class="ph" x="730" y="60" text-anchor="middle">BEAM &amp; GAZE</text>
        <path class="refresh" d="M320 96 l10 -10 l10 10 l-10 10 Z"/><text class="refresh-lab" x="330" y="78" text-anchor="middle">refresh</text>
        <path class="refresh" d="M590 96 l10 -10 l10 10 l-10 10 Z"/><text class="refresh-lab" x="600" y="78" text-anchor="middle">refresh</text>
        <path class="branch" d="M830 110 C 870 105 890 80 905 55" marker-end="url(#ryArr)"/>
        <path class="branch" d="M830 113 C 875 113 905 118 930 118" marker-end="url(#ryArr)"/>
        <text class="ph2" x="912" y="42" text-anchor="middle">Insanity 100: Wrath state</text>
        <text class="ph2" x="920" y="136" text-anchor="middle">or Sanity Tap it into mana</text>
        <text class="ph" x="190" y="146" text-anchor="middle">CARPET</text>
        <text class="ph2" x="190" y="160" text-anchor="middle">Darkwither everything · the ticks never stop</text>
        <text class="ph" x="470" y="146" text-anchor="middle">HARVEST, ENDLESSLY</text>
        <text class="ph2" x="470" y="160" text-anchor="middle">ticks accelerate the payoffs · never let the carpet lapse</text>
      </svg>`,
      read: "There is no big moment and no off switch. Damage rolls in repeating waves, and dropping the carpet stops the engine.",
      eyes: "debuff timers across the whole pack. Your own bar comes second.",
    },
    "tinker/demolition": {
      svg: `<svg viewBox="0 0 1000 168" role="img" aria-label="Demolition rhythm: layers of deployables stack, everything overlaps in one window, then the machine idles and gets rebuilt">
        <text class="strip-note" x="986" y="18" text-anchor="end">the shape of the loop · not a rotation</text>
        <line class="ax" x1="14" y1="126" x2="986" y2="126"/>
        <rect class="brick" x="40" y="112" width="330" height="12" rx="1"/><text class="brick-lab" x="48" y="121">Napalm</text>
        <rect class="brick" x="90" y="98" width="280" height="12" rx="1"/><text class="brick-lab" x="98" y="107">oil</text>
        <rect class="brick" x="150" y="84" width="220" height="12" rx="1"/><text class="brick-lab" x="158" y="93">turret — placed after the tank stacks</text>
        <rect class="brick" x="215" y="70" width="155" height="12" rx="1"/><text class="brick-lab" x="223" y="79">drone · factory</text>
        <rect class="dm-window" x="400" y="38" width="180" height="88" rx="2"/>
        <text class="dm-window-lab" x="490" y="64" text-anchor="middle">SPARKED AND READY</text>
        <text class="ph2" x="490" y="80" text-anchor="middle" fill="#e0cb9c">instant rockets while</text>
        <text class="ph2" x="490" y="94" text-anchor="middle" fill="#e0cb9c">every layer overlaps</text>
        <rect class="idle" x="612" y="70" width="120" height="56" rx="2"/>
        <text class="ph2" x="672" y="94" text-anchor="middle">pack moved —</text>
        <text class="ph2" x="672" y="108" text-anchor="middle">the machine idles</text>
        <rect class="brick" x="770" y="112" width="190" height="12" rx="1"/>
        <rect class="brick" x="810" y="98" width="150" height="12" rx="1"/>
        <rect class="brick" x="860" y="84" width="100" height="12" rx="1"/>
        <text class="ph" x="205" y="146" text-anchor="middle">BUILD THE MACHINE</text>
        <text class="ph2" x="205" y="160" text-anchor="middle">layers only pay off if they hit the same pack</text>
        <text class="ph" x="490" y="146" text-anchor="middle">FIRE ALL OF IT</text>
        <text class="ph" x="865" y="146" text-anchor="middle">REBUILD</text>
      </svg>`,
      read: "You assemble layers before the fight matters, fire everything in one overlap, then rebuild. Layers only pay off if they hit the same pack.",
      eyes: "the ground your machines cover, and the pack the tank is stacking into them.",
    },
  };

  // ---------- experimental screen cards ----------
  const HEAT = { hot: 1, med: .55, low: .38, cold: .18 };
  const SCREENS = {
    "cultist/godblade": {
      id: "godblade", color: "#b35cff", enemies: "single", ground: "rift",
      heat: { party: "cold", enemy: "med", ground: "hot", bar: "hot", actions: "med" },
      barFill: .74, barNotch: .6, barLabel: "INSANITY",
      chips: [{ t: "your Insanity bar", x: 150, y: 210, a: "start" }, { t: "your Rift", x: 240, y: 132, a: "middle" }],
    },
    "cultist/corruption": {
      id: "corruption", color: "#b35cff", enemies: "spread", ground: "tentacle", dotTimers: true,
      heat: { party: "cold", enemy: "hot", ground: "med", bar: "med", actions: "med" },
      barFill: .5, barLabel: "INSANITY",
      chips: [{ t: "DoT timers on every nameplate", x: 240, y: 30, a: "middle" }, { t: "Insanity · mana", x: 150, y: 210, a: "start" }],
    },
    "tinker/demolition": {
      id: "demolition", color: "#d9a441", enemies: "stacked", ground: "deployables",
      heat: { party: "low", enemy: "med", ground: "hot", bar: "cold", actions: "med" },
      barFill: .3, barLabel: "",
      chips: [{ t: "your machines on the ground", x: 240, y: 200, a: "middle" }, { t: "the pack, once it's stacked", x: 240, y: 30, a: "middle" }],
    },
  };

  function chip(c, color) {
    const w = Math.round(c.t.length * 5.7 + 16);
    const x = c.a === "middle" ? c.x - w / 2 : c.x;
    return `<g><rect x="${x}" y="${c.y}" width="${w}" height="17" rx="3" fill="rgba(8,6,10,.78)" stroke="${color}" stroke-opacity=".65"/>
      <text x="${x + w / 2}" y="${c.y + 12}" text-anchor="middle" font-size="10.5" fill="#efe7d6" letter-spacing=".04em">${c.t}</text></g>`;
  }
  function enemy(x, y, cfg) {
    const dots = cfg.dotTimers
      ? [0, 1, 2].map(i => `<rect x="${x - 27 + i * 9}" y="${y - 16}" width="7" height="7" rx="1" fill="${cfg.color}" opacity="${.95 - i * .22}"/>`).join("")
      : "";
    return `<rect x="${x - 28}" y="${y - 26}" width="56" height="7" rx="1.5" fill="#241f28"/>
      <rect x="${x - 28}" y="${y - 26}" width="${56 * .82}" height="7" rx="1.5" fill="#a04338"/>
      ${dots}<rect x="${x - 6}" y="${y - 5}" width="12" height="17" rx="2" fill="#4d4456"/>`;
  }
  function enemies(cfg) {
    if (cfg.enemies === "spread") return [[168, 96], [244, 78], [318, 102]].map(p => enemy(p[0], p[1], cfg)).join("");
    if (cfg.enemies === "stacked") return [[220, 92], [242, 84], [262, 96]].map(p => enemy(p[0], p[1], cfg)).join("");
    return enemy(240, 90, cfg);
  }
  function groundArt(cfg) {
    const base = `<ellipse cx="240" cy="166" rx="78" ry="19" fill="${cfg.color}" fill-opacity=".10" stroke="${cfg.color}" stroke-opacity=".8" stroke-width="1.4"/>`;
    if (cfg.ground === "rift") return base +
      `<ellipse cx="240" cy="166" rx="46" ry="11" fill="none" stroke="${cfg.color}" stroke-width="1" stroke-dasharray="5 4" opacity=".8"/>`;
    if (cfg.ground === "tentacle") return base +
      `<path d="M226 168 q4 -16 -4 -24 m18 24 q2 -12 10 -18" fill="none" stroke="${cfg.color}" stroke-width="1.6" opacity=".8"/>`;
    if (cfg.ground === "deployables") return base +
      `<path d="M198 170 L206 154 L214 170 Z" fill="none" stroke="${cfg.color}" stroke-width="1.6"/>
       <circle cx="260" cy="162" r="7" fill="none" stroke="${cfg.color}" stroke-width="1.6"/>
       <path d="M260 153 v-4 M260 171 v4 M251 162 h-4 M273 162 h-4" stroke="${cfg.color}" stroke-width="1.4"/>
       <ellipse cx="230" cy="174" rx="15" ry="4.5" fill="${cfg.color}" fill-opacity=".28"/>`;
    return base;
  }
  function partyArt(cfg) {
    const fills = cfg.partyDip ? [.92, .34, .66, .82] : [.9, .76, .64, .86];
    return fills.map((f, i) => `
      <rect x="18" y="${18 + i * 15}" width="66" height="10" rx="2" fill="#221d29"/>
      <rect x="18" y="${18 + i * 15}" width="${66 * f}" height="10" rx="2" fill="${f < .5 ? "#b0483f" : "#5f9c6a"}"/>`).join("");
  }
  function barArt(cfg) {
    const notch = cfg.barNotch
      ? `<line x1="${150 + 180 * cfg.barNotch}" y1="224" x2="${150 + 180 * cfg.barNotch}" y2="243" stroke="#c9aa71" stroke-width="1.3"/>` : "";
    return `<rect x="150" y="228" width="180" height="11" rx="2" fill="#221d29"/>
      <rect x="150" y="228" width="${180 * cfg.barFill}" height="11" rx="2" fill="${cfg.color}"/>
      ${cfg.barLabel ? `<text x="334" y="237" font-size="9" fill="#8d8678" letter-spacing=".1em">${cfg.barLabel}</text>` : ""}${notch}`;
  }
  const actionsArt = () => [0, 1, 2, 3, 4, 5].map(i =>
    `<rect x="${188 + i * 18}" y="246" width="15" height="15" rx="2" fill="#1c1822" stroke="#332c3b"/>`).join("");

  function screenSVG(cfg) {
    const h = k => HEAT[cfg.heat[k]];
    const glow = k => cfg.heat[k] === "hot" ? `filter="url(#ryg-${cfg.id})"` : "";
    return `<svg viewBox="0 0 480 270" role="img" aria-label="Stylized screen: bright regions are where attention lives">
      <defs><filter id="ryg-${cfg.id}" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <rect x="0" y="0" width="480" height="270" rx="6" fill="#0b0a0e" stroke="#26212c"/>
      <g opacity="${h("party")}" ${glow("party")}>${partyArt(cfg)}</g>
      <g opacity="${h("enemy")}" ${glow("enemy")}>${enemies(cfg)}</g>
      <g opacity="${h("ground")}" ${glow("ground")}>${groundArt(cfg)}</g>
      <g opacity="${h("bar")}" ${glow("bar")}>${barArt(cfg)}</g>
      <g opacity="${h("actions")}">${actionsArt()}</g>
      ${cfg.chips.map(c => chip(c, cfg.color)).join("")}
    </svg>`;
  }

  // ---------- block assembly + injection ----------
  function blockHTML(specId, withLab = true) {
    const d = STRIPS[specId];
    if (!d) return `<div class="ry-block ry-gap">
      ${withLab ? `<div class="ry-lab"><span>The rhythm</span></div>` : ""}
      <p class="ry-read">Not drawn yet for this spec. Strips are authored one by one from researched evidence; we don't invent them.</p>
    </div>`;
    const sc = SCREENS[specId];
    return `<div class="ry-block">
      <div class="ry-lab">${withLab ? `<span>The rhythm — shape, not script</span>` : "<span></span>"}<span>names: Data · shape: Inference</span></div>
      ${d.svg}
      <div class="ry-reads">
        <p class="ry-read"><b>How to read it:</b> ${d.read}</p>
        <p class="ry-read"><b>Where your eyes live:</b> ${d.eyes}
          ${sc ? `<button class="ry-eye-btn" type="button" aria-expanded="false">👁 experimental</button>` : ""}</p>
      </div>
      ${sc ? `<div class="ry-screen" hidden>
        <p class="ry-warn">Experimental, unreliable, untested. Our sketch of where attention goes — not the real UI.</p>
        ${screenSVG(sc)}</div>` : ""}
    </div>`;
  }

  // "mini" now means: class highlight lives as a chip in the MASTHEAD (class level),
  // and nothing about it renders in the codex. "full" keeps the shipped banner.
  function applyVideo(root) {
    const strip = root.querySelector(".cine-strip");
    if (!strip || video === "full") return;
    const label = strip.nextElementSibling;
    strip.remove();
    if (label?.classList.contains("media-label")) label.remove();
  }

  if (video === "mini") {
    const vid = R.data.specs.find(s => s.id.split("/")[0] === classSlug && s.media.classVideo)?.media.classVideo;
    const roles = document.querySelector("#mast .cp-roles");
    if (vid && roles) roles.insertAdjacentHTML("beforeend",
      `<a class="ry-mast-video" href="https://www.youtube.com/watch?v=${vid}" target="_blank" rel="noreferrer"
         title="Official Ascension class video — an older fantasy reference, not evidence">▶ Class highlight</a>`);
  }

  // Defining talents move up into the spec header's empty top-right corner.
  function applyTalents(root) {
    const strip = root.querySelector(".icon-strip");
    const head = root.querySelector(".d-head");
    if (!strip || !head || head.querySelector(".ry-head-talents")) return;
    const box = document.createElement("div");
    box.className = "ry-head-talents";
    box.setAttribute("aria-label", "Defining talents — hover or tap to read");
    box.append(...strip.querySelectorAll("img"));
    head.appendChild(box);
    strip.remove();
  }

  function applyPips(root) {
    const stats = root.querySelector(".d-stats");
    if (!stats || pipsMode === "ship" || stats.dataset.ryPips) return;
    stats.dataset.ryPips = "1";
    if (pipsMode === "off") { stats.remove(); return; }
    const spec = R.specById[root.dataset.spec];
    const ctx = spec ? R.bestCtx(spec) : null;
    const axisByLabel = Object.fromEntries(Object.entries(R.AXIS_LABELS).map(([k, l]) => [l, k]));
    stats.querySelectorAll(".stat").forEach(span => {
      const label = span.firstChild?.textContent?.trim() || "";
      if (pipsMode === "trio" && !TRIO.includes(label)) { span.remove(); return; }
      const cell = spec && (spec.complexity[axisByLabel[label]] || {})[ctx];
      if (cell?.why) {
        // Tooltip justifies THIS value: lead with the rank, drop the generated boilerplate tail.
        span.dataset.tipname = `${label} — ${cell.v}`;
        span.dataset.tip = cell.why.replace(/\s*A durable target makes repeated precision matter\.?\s*$/, "");
      }
    });
    if (pipsMode === "trio") stats.insertAdjacentHTML("beforeend",
      `<span class="ry-pips-more">all 7 axes, with reasons → Endgame contexts</span>`);
  }

  function applyTop(root) {
    if (topMode === "ship" || root.dataset.ryTop) return;
    root.dataset.ryTop = "1";
    // Cards own the fantasy now; the codex stops repeating it.
    root.querySelector(".d-flavor")?.remove();
    // tight: where a strip exists, its reading lines replace the feel sentence too.
    if (topMode === "tight" && STRIPS[root.dataset.spec]) root.querySelector(".d-feel")?.remove();
    // Collapse class-highlight row + no-spec-video row + talent strip into one media row.
    const icons = root.querySelector(".icon-strip");
    if (!icons) return;
    const mini = root.querySelector(".ry-vid-mini");
    const noSpec = [...root.querySelectorAll(".media-label")]
      .find(l => l.textContent.includes("No verified current"));
    const row = document.createElement("div");
    row.className = "ry-media-row";
    icons.querySelector(".cap")?.remove();
    row.append(...icons.querySelectorAll("img"));
    const bits = [];
    if (mini) bits.push(`<a class="ry-mr-link" href="${mini.href}" target="_blank" rel="noreferrer">▶ Class highlight</a>`);
    if (noSpec) bits.push(`<span>no verified spec video — none invented</span>`);
    row.insertAdjacentHTML("beforeend",
      `<span class="ry-mr-meta">${bits.join(`<span class="ry-mr-sep">·</span>`)}</span>`);
    icons.replaceWith(row);
    mini?.remove();
    noSpec?.remove();
  }

  // RULED: when no verified spec video exists, show nothing inline. The honest record
  // of the search lives in the Evidence & gaps fold, not in a standing row.
  function applyNoSpec(root) {
    [...root.querySelectorAll(".media-label")]
      .find(l => l.textContent.includes("No verified current"))?.remove();
  }

  function inject() {
    const root = codex.querySelector("[data-spec-root]");
    if (!root) return;
    applyVideo(root);
    applyNoSpec(root);
    applyTalents(root);
    applyPips(root);
    applyTop(root);
    if (root.querySelector(".ry-block")) return;
    const html = blockHTML(root.dataset.spec, placement !== "fold");
    if (placement === "feel") {
      root.querySelector(".d-head")?.insertAdjacentHTML("afterend", html);
    } else if (placement === "stats") {
      (root.querySelector(".d-verdicts") || root.querySelector(".d-stats"))?.insertAdjacentHTML("afterend", html);
    } else {
      root.querySelector(".folds")?.insertAdjacentHTML("afterbegin",
        `<div class="fold open"><button class="fold-head"><h4>The rhythm</h4><span class="f-hint">shape, not script</span><span class="arrow">▸</span></button>
         <div class="fold-body">${html}</div></div>`);
    }
  }
  new MutationObserver(() => inject()).observe(codex, { childList: true });
  inject();

  // ---------- verb echo on rail cards ----------
  const rail = document.getElementById("rail");
  function decorateRail() {
    if (!rail) return;
    rail.querySelectorAll(".rail-card:not([data-ry-verb])").forEach(card => {
      const spec = R.specById[card.dataset.sel];
      if (!spec) return;
      card.dataset.ryVerb = "1";
      if (cardStyle !== "ship") {
        card.classList.add("ry-card2");
        if (cardStyle === "air" || cardStyle === "airfam") card.classList.add("ry-card3");
        card.innerHTML = rebuiltCard(spec);
        return;
      }
      if (verbEcho === "off") return;
      const v = VERBS[spec.id];
      if (!v) return;
      if (verbEcho === "chip") {
        card.insertAdjacentHTML("beforeend", verbChip(spec.id));
      } else if (verbEcho === "kick") {
        card.querySelector("b")?.insertAdjacentHTML("beforebegin", `<span class="ry-verb-kick">${v[0]}</span>`);
      } else {
        card.querySelector(".m-sub")?.insertAdjacentHTML("beforeend", `<span class="ry-verb-meta"> · ${v[0]}</span>`);
      }
    });
  }
  if (rail) {
    document.body.classList.add(`ry-k-${cardStyle}`, "ry-glow");
    new MutationObserver(() => decorateRail()).observe(rail, { childList: true });
    decorateRail();
  }

  // ---------- re-spaced cultist seal for the tall col slot ----------
  // The shipped drawing was authored for a 420x205 box; in the grown slot its top-row
  // verb labels collide with the bottom orbs. Redraw at 420x260 with breathing room.
  (() => {
    if (classSlug !== "cultist" || engine !== "col") return;
    const stage = document.querySelector("#mast .cd-stage.cd-seal");
    const svg = stage?.querySelector("svg");
    if (!svg) return;
    stage.classList.add("ry-reseal");
    const nodes = [
      { id: "cultist/corruption", name: "Corruption", verb: "SPREAD", x: 73, y: 64 },
      { id: "cultist/dreadnought", name: "Dreadnought", verb: "ENDURE", x: 347, y: 64 },
      { id: "cultist/heretic", name: "Heretic", verb: "CONVERT", x: 73, y: 196 },
      { id: "cultist/godblade", name: "Godblade", verb: "CROSS", x: 347, y: 196 },
    ];
    const nodeSvg = s => `<g class="cd-node" data-cd-spec="${s.id}" role="button" tabindex="0" transform="translate(${s.x} ${s.y})">
      <circle class="node-ring" r="29"/><circle class="node-dot" r="4"/>
      <text class="node-name" text-anchor="middle" y="42">${s.name}</text>
      <text class="node-verb" text-anchor="middle" y="54">${s.verb}</text></g>`;
    svg.setAttribute("viewBox", "0 0 420 260");
    svg.innerHTML = `<title id="seal-title">Insanity expressed as four Cultist bargains</title>
      <defs>
        <radialGradient id="cdIris"><stop offset="0" stop-color="#e1b968"/><stop offset=".34" stop-color="#8e4fb2"/><stop offset="1" stop-color="#25112f"/></radialGradient>
        <filter id="cdGlow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path class="cd-tendril" d="M210 130 C130 40 105 235 22 185 M210 130 C290 40 315 235 398 185"/>
      <circle class="cd-orbit threshold" cx="210" cy="130" r="69"/><circle class="cd-orbit" cx="210" cy="130" r="88"/>
      ${nodes.map(s => `<path class="cd-link" d="M210 130 L${s.x} ${s.y}"/>`).join("")}
      <g transform="translate(210 130) scale(.72)">
        <path class="cd-eye-shell" d="M-55 0 Q0-41 55 0 Q0 41-55 0Z"/>
        <path class="cd-eye-lid" d="M-55 0 Q0-41 55 0 M-55 0 Q0 41 55 0"/>
        <circle class="cd-iris" r="24"/><ellipse class="cd-pupil" rx="7" ry="23"/>
      </g>
      <text class="cd-center-label" x="210" y="135" text-anchor="middle">INSANITY</text>
      <text class="cd-threshold" x="210" y="34" text-anchor="middle">60 · HOLD</text>
      <text class="cd-threshold" x="210" y="232" text-anchor="middle">100 · CROSS</text>
      ${nodes.map(nodeSvg).join("")}`;
    const selId = rail?.querySelector(".rail-card.sel")?.dataset.sel;
    svg.querySelectorAll("[data-cd-spec]").forEach(el =>
      el.classList.toggle("active", el.dataset.cdSpec === selId));
  })();

  // ---------- engine paragraph ----------
  (() => {
    const eg = ENGINE[classSlug];
    const mast = document.getElementById("mast");
    if (!eg || !mast || engine === "off") return;
    document.body.classList.add(`ry-e-${engine}`);
    if (engine === "col") {
      mast.querySelector(":scope > p")?.insertAdjacentHTML("afterend",
        `<div class="ry-engine"><span class="lab">${eg.label}</span><p>${eg.text}</p></div>`);
    } else if (engine === "seal") {
      mast.querySelector(".cd-stage.cd-seal")?.insertAdjacentHTML("beforeend",
        `<div class="ry-engine-cap"><span class="lab">${eg.label}</span>${eg.text}</div>`);
    } else {
      const strip = document.createElement("section");
      strip.className = "plate ry-engine-strip";
      strip.innerHTML = `<span class="lab">${eg.label}</span><p>${eg.text}</p>`;
      mast.insertAdjacentElement("afterend", strip);
    }
  })();

  document.addEventListener("click", e => {
    const b = e.target.closest(".ry-eye-btn");
    if (!b) return;
    const sc = b.closest(".ry-block").querySelector(".ry-screen");
    sc.hidden = !sc.hidden;
    b.setAttribute("aria-expanded", String(!sc.hidden));
    b.classList.toggle("on", !sc.hidden);
  });

  // ---------- switcher ----------
  const P_LABELS = { feel: "1 · Under the header, before the video", stats: "2 · After the verdicts, with the pips", fold: "3 · First fold — “The rhythm”" };
  const other = classSlug === "tinker" ? "cultist" : "tinker";
  const url = (c, p, v, e = engine, w = verbEcho, k = cardStyle, s = pipsMode, t = topMode) => `rhythm-class.html?c=${c}&p=${p}&v=${v}&e=${e}&w=${w}&k=${k}&s=${s}&t=${t}`;
  const links = ["feel", "stats", "fold"].map(p =>
    [url(classSlug, p, video), P_LABELS[p], p === placement]);
  links.push([url(other, placement, video), `${other === "tinker" ? "Tinker" : "Cultist"} · same placement`, false]);
  const vidRow = ["full", "mini", "off"].map(v =>
    `<a class="${v === video ? "current" : ""}" href="${url(classSlug, placement, v)}">${v}</a>`).join("");
  const engRow = ["col", "seal", "strip", "off"].map(e =>
    `<a class="${e === engine ? "current" : ""}" href="${url(classSlug, placement, video, e)}">${e}</a>`).join("");
  const verbRow = ["chip", "kick", "meta", "off"].map(w =>
    `<a class="${w === verbEcho ? "current" : ""}" href="${url(classSlug, placement, video, engine, w)}">${w}</a>`).join("");
  const cardRow = ["ship", "zoned", "air", "airfam"].map(k =>
    `<a class="${k === cardStyle ? "current" : ""}" href="${url(classSlug, placement, video, engine, verbEcho, k)}">${k}</a>`).join("");
  const pipsRow = ["ship", "tips", "trio", "off"].map(s =>
    `<a class="${s === pipsMode ? "current" : ""}" href="${url(classSlug, placement, video, engine, verbEcho, cardStyle, s)}">${s}</a>`).join("");
  const topRow = ["ship", "slim", "tight"].map(t =>
    `<a class="${t === topMode ? "current" : ""}" href="${url(classSlug, placement, video, engine, verbEcho, cardStyle, pipsMode, t)}">${t}</a>`).join("");
  links.push([`rhythm-preview.html`, "Form studies (strips · screens)", false]);
  links.push([`diagram-preview.html?c=${classSlug}&concept=seal`, "Seal study", false]);
  document.body.insertAdjacentHTML("beforeend", `<aside class="ry-switcher"><strong>Rhythm placement study</strong>
    ${links.slice(0, 4).map(([href, label, cur]) => `<a class="${cur ? "current" : ""}" href="${href}">${label}</a>`).join("")}
    <strong style="margin-top:8px">Class video</strong><div class="ry-sw-row">${vidRow}</div>
    <strong style="margin-top:8px">Engine text</strong><div class="ry-sw-row">${engRow}</div>
    <strong style="margin-top:8px">Verb echo</strong><div class="ry-sw-row">${verbRow}</div>
    <strong style="margin-top:8px">Spec cards</strong><div class="ry-sw-row">${cardRow}</div>
    <strong style="margin-top:8px">Pips row</strong><div class="ry-sw-row">${pipsRow}</div>
    <strong style="margin-top:8px">Codex top</strong><div class="ry-sw-row">${topRow}</div>
    ${links.slice(4).map(([href, label, cur]) => `<a href="${href}">${label}</a>`).join("")}
    <small>Only the rhythm block and the video treatment change. Godblade, Corruption, and Demolition have strips; other specs show the honest gap.</small></aside>`);
})();
