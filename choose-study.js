/* Choose design study — session 5, round 1: THE RESULT CARD.
   Three directions rendered from the real scoring engine (choose.js), all fed by the
   same live answer set. New file — the shipped choose.html is untouched. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY, C2 = window.COA_CARD2, CH = window.COA_CHOOSE;
  if (!R || !S || !C2 || !CH)
    throw new Error("explorer-data, profile-render, atlas-study, card-study-2 and choose must load first");
  const { specById, famById, esc, glyph, classSlug } = R;

  // ---------- personas: preset answer sets; the chips below adjust them live ----------
  const PERSONAS = [
    ["planner", "Overloaded planner", { vignette: null, role: "Damage", range: null, payoff: "setup", load: 4.75, cost: 4.75 }],
    ["striker", "Windowed striker", { vignette: null, role: "Damage", range: null, payoff: "combo", load: 3.25, cost: 3.25 }],
    ["lifeline", "Melee lifeline", { vignette: null, role: "HealerSupport", range: "Melee", payoff: null, load: 3.25, cost: 3.25 }],
    ["commander", "Calm commander", { vignette: null, role: null, range: null, payoff: "commanders", load: 1.75, cost: 1.75 }],
    ["wall", "Wall with a plan", { vignette: null, role: "Tank", range: null, payoff: null, load: 3.25, cost: 3.25 }],
  ];

  const state = { card: "A", persona: "planner" };
  let answers = { ...PERSONAS[0][2] };

  // ---------- shared pieces ----------
  const el = id => document.getElementById(id);
  const tierCls = t => t === "Strong match" ? "t-strong" : t === "Wildcard" ? "t-wild" : "t-plaus";
  const crest = s => S.crestFrame({ name: s.klass }) || `<span class="cs-glyph">${glyph(s)}</span>`;
  const classHref = s => `class.html?c=${classSlug(s)}&from=choose#${s.id.split("/")[1]}`;
  const confLine = p => p.tier === "Wildcard"
    ? "Confidence: low — thinner research for this spec, so it is shown as a wildcard, not ranked down."
    : `Confidence: ${p.confidence.toLowerCase()} — ${Math.round(p.coverage * 100)}% of your scored axes are researched for this spec.`;
  const guidedLine = s => (window.COA_GUIDED && window.COA_GUIDED.pilots.some(p => p.id === classSlug(s)))
    ? `<p class="conf"><a href="guided.html">This class is in the evidence-graded Guided pilot — preset-scenario verdicts, not your answers above.</a></p>` : "";
  const scoreLines = p => `
      <p class="why"><em>Matched:</em> ${CH.reasonsFor(p.s, answers, p).map(esc).join("; ")}.</p>
      <p class="trade"><em>Trade-off:</em> ${esc(CH.tradeoffFor(p.s))}</p>
      <p class="conf">${confLine(p)}</p>${guidedLine(p.s)}`;

  // ---------- the four renderers: today's card + directions A / B / C ----------
  // SHIP — the card exactly as choose.js renders it today.
  function shipCard(p) {
    const s = p.s;
    return `<div class="rcard" style="--class-color:${s.color}">
      <span class="rtier ${tierCls(p.tier)}">${p.tier}</span>
      <a class="rname" href="${classHref(s)}">
        <span class="rglyph">${glyph(s)}</span>${esc(s.klass)}, led by ${esc(s.name)}</a>
      <div class="m-sub">${[...s.roles, ...s.range].map(esc).join(" · ")} · ${esc(famById[s.atlas].name)}</div>
      ${scoreLines(p)}
    </div>`;
  }

  // A — identity result: the Atlas card's top row (crest + class name), the authored
  // tagline where one exists, and the matched spec as a ruled glowing door.
  function cardA(p) {
    const s = p.s, lead = p.tier === "Strong match" ? " cs-lead" : "";
    const tag = C2.TAGLINES[s.klass], micro = C2.MICRO[s.id];
    return `<article class="rcard cs-a${lead}" style="--class-color:${s.color}">
      <span class="rtier ${tierCls(p.tier)}">${p.tier}</span>
      <div class="cs-top"><span class="cs-medal">${crest(s)}</span>
        <a class="cs-name" href="${classHref(s)}">${esc(s.klass)}</a></div>
      ${tag ? `<div class="cl-tagline">${esc(tag.t).replace(esc(tag.kw), `<span class="kw">${esc(tag.kw)}</span>`)}</div>` : ""}
      <a class="cs-door" href="${classHref(s)}">${C2.roleImgs(s.roles)}<span class="nm">${esc(s.name)}</span>
        ${micro ? `<span class="mid">${esc(micro)}</span>` : ""}<span class="rs">${s.range.map(esc).join(" · ")}</span></a>
      ${scoreLines(p)}
    </article>`;
  }

  // B — spec door card: the door row grown into a slim card; spec first, class beneath.
  function cardB(p) {
    const s = p.s, lead = p.tier === "Strong match" ? " cs-lead" : "";
    const micro = C2.MICRO[s.id];
    return `<article class="rcard cs-b${lead}" style="--class-color:${s.color}">
      <span class="rtier ${tierCls(p.tier)}">${p.tier}</span>
      <div class="cs-b-top">${C2.roleImgs(s.roles)}<a class="cs-name" href="${classHref(s)}">${esc(s.name)}</a>
        ${micro ? `<span class="mid">${esc(micro)}</span>` : ""}</div>
      <div class="m-sub">${esc(s.klass)} · ${[...s.roles, ...s.range].map(esc).join(" · ")} · ${esc(famById[s.atlas].name)}</div>
      ${scoreLines(p)}
    </article>`;
  }

  // C — the full ruled Atlas card with a match band on top; the matched door glows.
  function cardC(p) {
    const s = p.s, lead = p.tier === "Strong match" ? " cs-lead" : "";
    const c = S.classes.find(x => x.name === s.klass);
    return `<div class="cs-c${lead}" data-match="${s.id}" style="--class-color:${s.color}">
      <div class="cs-band"><span class="rtier ${tierCls(p.tier)}">${p.tier}</span>${scoreLines(p)}</div>
      ${C2.composeCard(c, { engine: "blurb", doors: "wow-words", corner: "video" })}
    </div>`;
  }

  const DIRS = { ship: shipCard, A: cardA, B: cardB, C: cardC };

  function markMatches(scope) {
    scope.querySelectorAll(".cs-c").forEach(w => {
      const b = w.querySelector(`[data-open="${w.dataset.match}"]`);
      if (b) b.classList.add("cs-matched");
    });
  }

  // ---------- chips (same logic as the shipped page) ----------
  function chipGroups() {
    return CH.QUESTIONS.filter(qq => qq.scored !== false).map(qq => `
      <div class="chip-group"><span class="lab">${esc(qq.q)}</span>
        <div class="chips">${qq.choices.map((c, i) => {
          const on = answers[qq.id] === (c.v !== undefined ? c.v : i) && answers[qq.id] !== null;
          const anyOn = c.v === null && answers[qq.id] === null;
          return `<button class="${(on || anyOn) ? "on" : ""}" data-chipq="${qq.id}" data-chipi="${i}">${esc(c.t)}</button>`;
        }).join("")}</div></div>`).join("");
  }

  // ---------- paint ----------
  function renderComposed(picks) {
    el("composed").innerHTML = `
      <div class="prog">${CH.QUESTIONS.map(() => `<span class="done"></span>`).join("")}</div>
      <p class="stepline">The Atlas has read you</p>
      <h2>${picks.length ? "Three paths fit your answers" : "No spec fits those constraints"}</h2>
      <p class="hint">Scored on the researched demand axes · Boss (single-target) endgame context ·
        relative among researched CoA specs · missing research shown, never guessed</p>
      <div class="result-list cs-list-${state.card}">${picks.map(DIRS[state.card]).join("")
        || `<p class="hint">Loosen role or range below and the shortlist returns.</p>`}</div>
      <div class="adjust"><span class="adjhead">Adjust your answers — every section on this page updates live</span>${chipGroups()}</div>`;
    markMatches(el("composed"));
  }

  function renderAll() {
    const picks = CH.recommend(answers);
    document.querySelectorAll(".cs-pair").forEach(pair => {
      pair.innerHTML = picks.map(DIRS[pair.dataset.card]).join("")
        || `<p class="hint">No spec fits those constraints — loosen role or range in the composed view.</p>`;
      markMatches(pair);
    });
    renderComposed(picks);
  }

  function init() {
    // direction stones — they drive the composed view only; the pairs always show all three
    const group = document.querySelector("[data-pick='card']");
    group.querySelectorAll("button[data-v]").forEach(b => b.classList.toggle("active", b.dataset.v === state.card));
    group.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      state.card = b.dataset.v;
      group.querySelectorAll("button[data-v]").forEach(x => x.classList.toggle("active", x === b));
      renderComposed(CH.recommend(answers));
    });

    // persona stones — swap the whole answer set
    el("personaRow").addEventListener("click", e => {
      const b = e.target.closest("button[data-persona]");
      if (!b) return;
      state.persona = b.dataset.persona;
      answers = { ...PERSONAS.find(p => p[0] === state.persona)[2] };
      el("personaRow").querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      renderAll();
    });

    // chips
    el("composed").addEventListener("click", e => {
      const chip = e.target.closest("[data-chipq]");
      if (!chip) return;
      const qq = CH.QUESTIONS.find(x => x.id === chip.dataset.chipq);
      const c = qq.choices[+chip.dataset.chipi];
      answers[qq.id] = c.v !== undefined ? c.v : +chip.dataset.chipi;
      renderAll();
    });

    // C-card doors open the spec profile (tooltip spans excluded, atlas-v2 pattern)
    document.addEventListener("click", e => {
      if (e.target.closest(".rimg") || e.target.closest(".cl-rare li") || e.target.closest(".famname")
        || e.target.closest(".vb")) return;
      const t = e.target.closest("[data-open]");
      if (!t) return;
      const s = specById[t.dataset.open];
      if (!s) return;
      el("profileContent").innerHTML = R.profileHTML(s);
      el("profileDialog").showModal();
      el("profileDialog").scrollTop = 0;
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });

    renderAll();
  }

  window.COA_CHOOSE_STUDY = { PERSONAS, cardA, cardB, cardC, shipCard };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("composed")) init();
})();
