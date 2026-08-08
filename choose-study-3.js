/* Choose design study — session 5, round 3: THE QUESTION SURFACE.
   The choice buttons rendered three ways on the same questions, side by side, plus
   the full questionnaire playable under the picked direction — ending in the ruled
   M2 results whose doors open the LOCKED slim modal. New file; choose.html untouched. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY, C2 = window.COA_CARD2,
    CH = window.COA_CHOOSE, PS = window.COA_PROFILE_STUDY;
  if (!R || !S || !C2 || !CH || !PS)
    throw new Error("explorer-data, profile-render, atlas-study, card-study-2, choose and profile-study must load first");
  const { specById, famById, esc, glyph, classSlug } = R;

  const OPTS = { engine: "blurb", doors: "wow-words", corner: "video" };
  const state = { q: "B" };
  let step = 0;
  let answers = { vignette: null, role: null, range: null, payoff: null, load: null, cost: null };

  const el = id => document.getElementById(id);

  // ---------- honest art for direction B: only where a real mapping exists ----------
  const LFG = n => `generated-assets/lfg-${n}.png`;
  const imgs = (srcs, sm) => `<span class="qc-art${sm ? " sm" : ""}">${srcs.map(s =>
    `<img src="${s}" alt="">`).join("")}</span>`;
  function artFor(qid, c) {
    if (qid === "role") {
      if (c.v === "Damage") return imgs([LFG("damage")]);
      if (c.v === "Tank") return imgs([LFG("tank")]);
      if (c.v === "HealerSupport") return imgs([LFG("healer"), LFG("flag")]);
      return imgs([LFG("damage"), LFG("tank"), LFG("healer"), LFG("flag")], true);
    }
    if ((qid === "load" || qid === "cost") && typeof c.v === "number")
      return `<span class="q-pips">${R.pips(Math.round(c.v))}</span>`;
    return "";
  }

  // ---------- one question card, three registers ----------
  function choicesHTML(qq, mode) {
    return qq.choices.map((c, i) => {
      if (mode === "C") return `<button data-i="${i}" class="qc-scene"><b>${esc(c.t)}</b>
        <span class="qc-line">${esc(c.d)}</span></button>`;
      const art = mode === "B" ? artFor(qq.id, c) : "";
      const after = art.startsWith(`<span class="q-pips"`);
      return `<button data-i="${i}">${after ? "" : art}<span class="qc-body"><b>${esc(c.t)}</b>${esc(c.d)}</span>${after ? art : ""}</button>`;
    }).join("");
  }
  function questionHTML(qq, mode, stepIx, interactive) {
    const n = CH.QUESTIONS.indexOf(qq);
    return `
      <div class="prog">${CH.QUESTIONS.map((_, i) => `<span class="${i < (stepIx ?? n) ? "done" : ""}"></span>`).join("")}</div>
      <p class="stepline">Question ${n + 1} of ${CH.QUESTIONS.length}</p>
      ${qq.scene ? `<div class="scene">Opening vignette · ${esc(qq.scene)}</div>` : ""}
      <h2>${esc(qq.q)}</h2><p class="hint">${esc(qq.hint)}</p>
      <div class="choices">${choicesHTML(qq, mode)}</div>
      ${interactive ? `<div class="navrow">${n > 0 ? `<button data-nav="back">← Back</button>` : ""}
        <button data-nav="skip">Skip — no preference</button></div>` : ""}`;
  }

  // ---------- the ruled M2 results (round 1b), doors opening the LOCKED modal ----------
  const tierCls = t => t === "Strong match" ? "t-strong" : t === "Wildcard" ? "t-wild" : "t-plaus";
  const confLine = p => p.tier === "Wildcard"
    ? "Confidence: low — thinner research for this spec, so it is shown as a wildcard, not ranked down."
    : `Confidence: ${p.confidence.toLowerCase()} — ${Math.round(p.coverage * 100)}% of your scored axes are researched for this spec.`;
  const guidedLine = s => (window.COA_GUIDED && window.COA_GUIDED.pilots.some(p => p.id === classSlug(s)))
    ? `<p class="conf"><a href="guided.html">This class is in the evidence-graded Guided pilot — preset-scenario verdicts, not your answers above.</a></p>` : "";
  const scoreLines = p => `
      <p class="why"><em>Matched:</em> ${CH.reasonsFor(p.s, answers, p).map(esc).join("; ")}.</p>
      <p class="trade"><em>Trade-off:</em> ${esc(CH.tradeoffFor(p.s))}</p>
      <p class="conf">${confLine(p)}</p>${guidedLine(p.s)}`;
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

  // ---------- the live flow ----------
  function drawFlow() {
    if (step >= CH.QUESTIONS.length) return drawResults();
    el("flow").className = "plate oracle cs-composed q-live-" + state.q;
    el("flow").innerHTML = questionHTML(CH.QUESTIONS[step], state.q, step, true);
  }
  function drawResults() {
    const picks = CH.recommend(answers);
    el("flow").className = "plate oracle cs-composed";
    el("flow").innerHTML = `
      <div class="prog">${CH.QUESTIONS.map(() => `<span class="done"></span>`).join("")}</div>
      <p class="stepline">The Atlas has read you</p>
      <h2>${picks.length ? "Three paths fit your answers" : "No spec fits those constraints"}</h2>
      <p class="hint">Scored on the researched demand axes · Boss (single-target) endgame context ·
        relative among researched CoA specs · missing research shown, never guessed</p>
      <div class="result-list cs-list-C">${picks.map(classC).join("")
        || `<p class="hint">Loosen role or range below and the shortlist returns.</p>`}</div>
      <div class="adjust"><span class="adjhead">Adjust your answers — results update live</span>${chipGroups()}</div>
      <div class="navrow"><button data-nav="again">Ask again from the start</button></div>`;
    markMatches(el("flow"));
  }

  // ---------- statics: the same three questions in each register ----------
  const DEMO_QS = ["vignette", "role", "load"];
  function renderStatics() {
    ["A", "B", "C"].forEach(mode => {
      el("col" + mode).innerHTML = DEMO_QS.map(id => {
        const qq = CH.QUESTIONS.find(x => x.id === id);
        return `<div class="plate oracle q-mini q-${mode}">${questionHTML(qq, mode, undefined, false)}</div>`;
      }).join("");
    });
  }

  function init() {
    const group = document.querySelector("[data-pick='q']");
    group.querySelectorAll("button[data-v]").forEach(b => b.classList.toggle("active", b.dataset.v === state.q));
    group.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      state.q = b.dataset.v;
      group.querySelectorAll("button[data-v]").forEach(x => x.classList.toggle("active", x === b));
      drawFlow();
    });

    el("flow").addEventListener("click", e => {
      const chip = e.target.closest("[data-chipq]");
      if (chip) {
        const qq = CH.QUESTIONS.find(x => x.id === chip.dataset.chipq);
        const c = qq.choices[+chip.dataset.chipi];
        answers[qq.id] = c.v !== undefined ? c.v : +chip.dataset.chipi;
        drawResults();
        return;
      }
      const b = e.target.closest("button");
      if (!b || b.dataset.open) return;
      if (b.dataset.nav === "back") { step--; return drawFlow(); }
      if (b.dataset.nav === "skip") { answers[CH.QUESTIONS[step].id] = null; step++; return drawFlow(); }
      if (b.dataset.nav === "again") {
        step = 0;
        answers = { vignette: null, role: null, range: null, payoff: null, load: null, cost: null };
        return drawFlow();
      }
      if (b.dataset.i !== undefined && b.closest("#flow .choices")) {
        const qq = CH.QUESTIONS[step];
        const c = qq.choices[+b.dataset.i];
        answers[qq.id] = qq.scored === false ? +b.dataset.i : (c.v !== undefined ? c.v : +b.dataset.i);
        step++;
        drawFlow();
      }
    });

    // result-card doors open the LOCKED slim modal
    document.addEventListener("click", e => {
      if (e.target.closest(".rimg") || e.target.closest(".cl-rare li") || e.target.closest(".famname")
        || e.target.closest(".vb")) return;
      const t = e.target.closest("[data-open]");
      if (!t) return;
      const s = specById[t.dataset.open];
      if (!s) return;
      el("profileContent").innerHTML = PS.slimHTML(s);
      el("profileDialog").showModal();
      el("profileDialog").scrollTop = 0;
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });

    renderStatics();
    drawFlow();
  }

  window.COA_CHOOSE_STUDY3 = { questionHTML, choicesHTML, artFor, classC };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("flow")) init();
})();
