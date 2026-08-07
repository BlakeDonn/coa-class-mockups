/* Spec-door study, round 8: WoW role art + the middle element, on the ruled card. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY, C2 = window.COA_CARD2;
  if (!R || !S || !C2) throw new Error("study scripts must load first");
  const { specById } = R;
  const classes = S.classes;

  const RULED = { engine: "blurb", corner: "video" };
  const state = { doors: "wow-words" };
  const el = id => document.getElementById(id);
  const DEMO = ["Cultist", "Witch Hunter"];

  function renderPairs() {
    document.querySelectorAll(".pair").forEach(p => {
      p.innerHTML = DEMO.map(n =>
        C2.composeCard(classes.find(c => c.name === n), { ...RULED, doors: p.dataset.variant })).join("");
    });
  }
  function renderGrid() {
    el("doorGrid").innerHTML = classes.map(c =>
      C2.composeCard(c, { ...RULED, doors: state.doors })).join("");
  }

  function openProfile(id) {
    const s = specById[id];
    if (!s) return;
    el("profileContent").innerHTML = R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  function init() {
    document.querySelector('[data-pick="doors"]').addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      state.doors = b.dataset.v;
      document.querySelectorAll('[data-pick="doors"] button').forEach(x =>
        x.classList.toggle("active", x === b));
      renderGrid();
    });
    document.addEventListener("click", e => {
      if (e.target.closest(".rimg") || e.target.closest(".vb") || e.target.closest(".famname")
        || e.target.closest(".cl-rare li") || e.target.closest("a.cl-thumb")) return;
      const t = e.target.closest("[data-open]");
      if (t) openProfile(t.dataset.open);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });
    renderPairs(); renderGrid();
  }

  if (typeof document !== "undefined" && document.getElementById && document.getElementById("doorGrid")) init();
})();
