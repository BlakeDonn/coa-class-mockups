/* Choose design study — session 5, round 1b: THE TWO REGISTERS.
   User reframe (2026-08-07): with more data, Choose asks at two altitudes — a class
   questionnaire and a spec questionnaire. The result card follows what is recommended
   (form A or form C), and a class result names its probable spec ("you will probably
   like X"). This page renders BOTH mappings on live scores. Round 1 page kept as-is. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY, C2 = window.COA_CARD2, CH = window.COA_CHOOSE;
  if (!R || !S || !C2 || !CH)
    throw new Error("explorer-data, profile-render, atlas-study, card-study-2 and choose must load first");
  const { data, specById, famById, esc, glyph, classSlug } = R;

  const PERSONAS = [
    ["planner", "Overloaded planner", { vignette: null, role: "Damage", range: null, payoff: "setup", load: 4.75, cost: 4.75 }],
    ["striker", "Windowed striker", { vignette: null, role: "Damage", range: null, payoff: "combo", load: 3.25, cost: 3.25 }],
    ["lifeline", "Melee lifeline", { vignette: null, role: "HealerSupport", range: "Melee", payoff: null, load: 3.25, cost: 3.25 }],
    ["commander", "Calm commander", { vignette: null, role: null, range: null, payoff: "commanders", load: 1.75, cost: 1.75 }],
    ["wall", "Wall with a plan", { vignette: null, role: "Tank", range: null, payoff: null, load: 3.25, cost: 3.25 }],
  ];

  const OPTS = { engine: "blurb", doors: "wow-words", corner: "video" };
  const state = { mapping: "M1", altitude: "class", persona: "planner" };
  let answers = { ...PERSONAS[0][2] };

  // ---------- shared pieces (round-1 vocabulary) ----------
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
  const doorHTML = s => {
    const micro = C2.MICRO[s.id];
    return `<a class="cs-door" href="${classHref(s)}">${C2.roleImgs(s.roles)}<span class="nm">${esc(s.name)}</span>
      ${micro ? `<span class="mid">${esc(micro)}</span>` : ""}<span class="rs">${s.range.map(esc).join(" · ")}</span></a>`;
  };

  // ---------- spec-level recommendation: the same engine, not deduped by class.
  // A live demo of the future spec questionnaire; the questionnaire itself waits on data.
  const roleMatches = (s, role) => !role
    || (role === "HealerSupport" ? s.roles.includes("Healer") || s.roles.includes("Support") : s.roles.includes(role));
  const rangeMatches = (s, range) => !range || s.range.includes(range) || s.range.includes("Hybrid");
  function recommendSpecs(a) {
    const pool = data.specs.filter(s => roleMatches(s, a.role) && rangeMatches(s, a.range));
    return pool.map(s => ({ s, ...CH.scoreSpec(s, a) })).sort((x, y) => y.match - x.match)
      .slice(0, 3).map((r, i) => ({
        ...r,
        tier: r.confidence === "Low" ? "Wildcard" : (i === 0 ? "Strong match" : "Plausible match"),
      }));
  }

  // ---------- CLASS register: the class is the recommendation, its probable spec named ----------
  function classA(p) {
    const s = p.s, lead = p.tier === "Strong match" ? " cs-lead" : "";
    const tag = C2.TAGLINES[s.klass];
    return `<article class="rcard cs-a${lead}" style="--class-color:${s.color}">
      <span class="rtier ${tierCls(p.tier)}">${p.tier}</span>
      <div class="cs-top"><span class="cs-medal">${crest(s)}</span>
        <a class="cs-name" href="${classHref(s)}">${esc(s.klass)}</a></div>
      ${tag ? `<div class="cl-tagline">${esc(tag.t).replace(esc(tag.kw), `<span class="kw">${esc(tag.kw)}</span>`)}</div>` : ""}
      <div class="cs-problabel">You will probably like</div>
      ${doorHTML(s)}
      ${scoreLines(p)}
    </article>`;
  }
  function classC(p) {
    const s = p.s, lead = p.tier === "Strong match" ? " cs-lead" : "";
    const c = S.classes.find(x => x.name === s.klass);
    return `<div class="cs-c${lead}" data-match="${s.id}" style="--class-color:${s.color}">
      <div class="cs-band"><span class="rtier ${tierCls(p.tier)}">${p.tier}</span>
        <p class="cs-prob">You will probably like <b>${esc(s.name)}</b>.</p>
        ${scoreLines(p)}</div>
      ${C2.composeCard(c, OPTS)}
    </div>`;
  }

  // ---------- SPEC register: the spec itself is the recommendation ----------
  function specA(p) {
    const s = p.s, lead = p.tier === "Strong match" ? " cs-lead" : "";
    return `<article class="rcard cs-a cs-a2${lead}" style="--class-color:${s.color}">
      <span class="rtier ${tierCls(p.tier)}">${p.tier}</span>
      <div class="cs-top"><span class="cs-medal">${crest(s)}</span>
        <div><a class="cs-name" href="${classHref(s)}">${esc(s.name)}</a>
          <div class="m-sub">${esc(s.klass)} · ${[...s.roles, ...s.range].map(esc).join(" · ")} · ${esc(famById[s.atlas].name)}</div></div></div>
      ${doorHTML(s)}
      ${scoreLines(p)}
    </article>`;
  }
  function specC(p) {
    const s = p.s, lead = p.tier === "Strong match" ? " cs-lead" : "";
    const c = S.classes.find(x => x.name === s.klass);
    return `<div class="cs-c${lead}" data-match="${s.id}" style="--class-color:${s.color}">
      <div class="cs-band"><span class="rtier ${tierCls(p.tier)}">${p.tier}</span>
        <p class="cs-bandtop"><a class="cs-bandname" href="${classHref(s)}">${esc(s.name)}</a>
          <span class="cs-bandsub">the ${esc(s.klass)} path</span></p>
        ${scoreLines(p)}</div>
      ${C2.composeCard(c, OPTS)}
    </div>`;
  }

  const FORMS = { classA, classC, specA, specC };

  function markMatches(scope) {
    scope.querySelectorAll(".cs-c").forEach(w => {
      const b = w.querySelector(`[data-open="${w.dataset.match}"]`);
      if (b) b.classList.add("cs-matched");
    });
  }

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
  function renderComposed() {
    const isClass = state.altitude === "class";
    const picks = isClass ? CH.recommend(answers) : recommendSpecs(answers);
    const form = isClass ? (state.mapping === "M1" ? "classA" : "classC")
      : (state.mapping === "M1" ? "specC" : "specA");
    el("composed").innerHTML = `
      <div class="prog">${CH.QUESTIONS.map(() => `<span class="done"></span>`).join("")}</div>
      <p class="stepline">The Atlas has read you</p>
      <h2>${picks.length ? (isClass ? "Three paths fit your answers" : "Three specializations fit your answers")
        : "No spec fits those constraints"}</h2>
      <p class="hint">Scored on the researched demand axes · Boss (single-target) endgame context ·
        relative among researched CoA specs${isClass ? "" : " · spec-register demo — the spec questionnaire itself arrives with the pilot data"}</p>
      <div class="result-list cs-list-${form.endsWith("C") ? "C" : "A"}">${picks.map(FORMS[form]).join("")
        || `<p class="hint">Loosen role or range below and the shortlist returns.</p>`}</div>
      <div class="adjust"><span class="adjhead">Adjust your answers — every section on this page updates live</span>${chipGroups()}</div>`;
    markMatches(el("composed"));
  }

  function renderAll() {
    const classPicks = CH.recommend(answers);
    const specPicks = recommendSpecs(answers);
    document.querySelectorAll(".cs-pair").forEach(pair => {
      const form = pair.dataset.form;
      const picks = form.startsWith("class") ? classPicks : specPicks;
      pair.innerHTML = picks.map(FORMS[form]).join("")
        || `<p class="hint">No spec fits those constraints — loosen role or range in the composed view.</p>`;
      markMatches(pair);
    });
    renderComposed();
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
        renderComposed();
      });
    });

    el("personaRow").addEventListener("click", e => {
      const b = e.target.closest("button[data-persona]");
      if (!b) return;
      state.persona = b.dataset.persona;
      answers = { ...PERSONAS.find(p => p[0] === state.persona)[2] };
      el("personaRow").querySelectorAll("button").forEach(x => x.classList.toggle("active", x === b));
      renderAll();
    });

    el("composed").addEventListener("click", e => {
      const chip = e.target.closest("[data-chipq]");
      if (!chip) return;
      const qq = CH.QUESTIONS.find(x => x.id === chip.dataset.chipq);
      const c = qq.choices[+chip.dataset.chipi];
      answers[qq.id] = c.v !== undefined ? c.v : +chip.dataset.chipi;
      renderAll();
    });

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

  window.COA_CHOOSE_STUDY2 = { PERSONAS, classA, classC, specA, specC, recommendSpecs };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("composed")) init();
})();
