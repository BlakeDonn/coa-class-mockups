/* Choose design study — session 5, round 4: THE ENTRY.
   How choose.html greets a visitor. Three chromes around the same ruled flow
   (round-3 B register). choose-study-3.js owns the flow; this file owns only the
   chrome above it. New file; choose.html untouched. */
(() => {
  "use strict";

  const CH = window.COA_CHOOSE, ST3 = window.COA_CHOOSE_STUDY3;
  if (!CH || !ST3) throw new Error("choose and choose-study-3 must load first");

  const el = id => document.getElementById(id);
  // The shipped foot line, verbatim — E2 promotes it, nothing is rewritten.
  const PROMISE = "Six questions, thirty seconds. Results come from the Atlas's researched demand axes — qualitative labels, relative among researched CoA specs, never a tier list.";
  // Entry RULED 2026-08-08 ("e1"): the bare oracle stands. Defaults mirror the ruling.
  const state4 = { entry: "E1" };

  function entryChrome(mode) {
    if (mode === "E2") return `<header class="plate atlas-mast cs-entrymast"><div>
      <div class="kick">Conquest of Azeroth</div>
      <h2>Find your class</h2>
      <p>${PROMISE}</p></div></header>`;
    if (mode === "E3") return `<div class="plate q-band">
      <div class="kick">Find your class</div>
      <div class="sub">Six questions, thirty seconds.</div></div>`;
    return "";
  }

  function applyEntry() {
    el("entryZone").innerHTML = entryChrome(state4.entry);
    el("flowFoot").style.display = state4.entry === "E2" ? "none" : "";
    el("flow").classList.toggle("q-attached", state4.entry === "E3");
  }

  function renderStatics() {
    const q1 = ST3.questionHTML(CH.QUESTIONS[0], "B", 0, false);
    ["E1", "E2", "E3"].forEach(mode => {
      el("col" + mode).innerHTML = `${entryChrome(mode)}
        <div class="plate oracle q-mini q-B${mode === "E3" ? " q-attached" : ""}">${q1}</div>
        ${mode === "E2" ? "" : `<p class="choose-foot">${PROMISE}</p>`}`;
    });
  }

  function init() {
    const group = document.querySelector("[data-pick='entry']");
    group.querySelectorAll("button[data-v]").forEach(b => b.classList.toggle("active", b.dataset.v === state4.entry));
    group.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      state4.entry = b.dataset.v;
      group.querySelectorAll("button[data-v]").forEach(x => x.classList.toggle("active", x === b));
      applyEntry();
    });
    renderStatics();
    applyEntry();
  }

  if (typeof document !== "undefined" && document.getElementById && document.getElementById("entryZone")) init();
})();
