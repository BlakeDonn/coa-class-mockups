/* Choose design study — session 5, round 2: THE SPEC-PROFILE MODAL.
   Job 2 of the handoff: today's modal is a mini class page; slim it, port the class
   page into it, or remove it. All registers rendered for real; same spec side by side.
   New file — profile-render.js and the shipped pages are untouched. */
(() => {
  "use strict";

  const R = window.COA_RENDER, S = window.COA_STUDY, C2 = window.COA_CARD2;
  if (!R || !S || !C2)
    throw new Error("explorer-data, profile-render, atlas-study and card-study-2 must load first");
  const { specById, famById, esc, classSlug } = R;

  // Register RULED 2026-08-07: P1, with the full class page emphasized ("that's where
  // the magic is at"). Exit RULED through rounds 2b/2c: header row beside the spec name,
  // crest + "View class page" in text, clear of the dialog's × close.
  const state = { reg: "P1" };
  const el = id => document.getElementById(id);
  const classHref = s => `class.html?c=${classSlug(s)}&from=study#${s.id.split("/")[1]}`;

  // Exit destination: pilot classes demo the ruled class-page study; the rest go to
  // today's class page until the site slice + ×21 authoring land.
  const PILOT_PAGES = { cultist: 1, tinker: 1 };
  const classPageHref = s => PILOT_PAGES[classSlug(s)]
    ? `rhythm-class.html?c=${classSlug(s)}` : classHref(s);
  const classVideo = s => {
    const c = S.classes.find(x => x.name === s.klass);
    const v = c && c.specs.find(x => x.media.classVideo);
    return v ? v.media.classVideo : null;
  };
  const crestBox = (s, size) => `<span class="slim-crest" style="width:${size}px;height:${size}px">
    ${S.crestFrame({ name: s.klass }) || ""}</span>`;

  // The emphasized class-page exit — RULED form: crest + "View class page" in text,
  // header row beside the spec name. In the dialog it clears the × close via CSS margin.
  function exitHTML(s) {
    return `<a class="slim-exit-chip" href="${classPageHref(s)}"
      data-tipname="${esc(s.klass)}" data-tip="The full class page — engine, specializations, evidence.">
      ${crestBox(s, 20)}View class page<span class="arr">⇢</span></a>`;
  }

  // ---------- P1 · the slim quick-look (RULED register) ----------
  // One phone screen: who this spec is and whether the door is worth opening. Everything
  // deeper lives on the class page. Built only from researched fields; gaps stay absent.
  function slimHTML(s) {
    const bc = R.bestCtx(s) || "boss";
    const feel = s.contexts[bc]?.feel || "";
    const micro = C2.MICRO[s.id];
    const stats = Object.entries(R.AXIS_LABELS).map(([k, label]) => {
      const c = R.cxCell(s, k, bc);
      return c ? `<span class="stat">${label}${R.pips(R.CX_ORDINAL[c.v] || 0)}</span>` : "";
    }).filter(Boolean).join("");
    const yes = s.fit.enjoy.slice(0, 2).map(i => i.t);
    const no = s.fit.avoid.slice(0, 2).map(i => i.t);
    const icons = s.media.icons.length ? `<div class="icon-strip">${s.media.icons.map(i =>
      `<img src="https://coabuildhub.com/skill-icons/${esc(i.icon)}.jpg" alt="${esc(i.name)}" loading="lazy"
         data-tipname="${esc(i.name)}" data-tip="${esc(i.tip)}">`).join("")}
      <span class="cap">Defining talents — hover or tap to read</span></div>` : "";
    return `<div class="slim" style="--class-color:${s.color}">
      <header class="d-head ${s.enriched ? "q-c" : "q-w"}">
        <div class="slim-h2row"><h2>${esc(s.name)}</h2>${exitHTML(s)}</div>
        <div class="d-meta"><span>${esc(s.klass)}</span><span>${[...s.roles, ...s.range].map(esc).join(" · ")}</span>
          <span>${esc(famById[s.atlas].name)}</span>
          <span class="wb-q ${s.enriched ? "c" : "w"}">${s.enriched ? "Curated · " + esc(s.confidence) : "Research in progress"}</span></div>
        ${micro ? `<span class="slim-tag">${esc(micro)}</span>` : ""}
        <p class="d-flavor">"${esc(s.fantasy || s.oneLine)}"</p>
        ${feel ? `<p class="d-feel">${esc(feel)}</p>` : ""}
      </header>
      <div class="d-stats">${stats}</div>
      ${(yes.length || no.length) ? `<div class="d-verdicts">
        <div>${yes.map(t => `<p class="v-yes">✓ ${esc(t)}</p>`).join("")}</div>
        <div>${no.map(t => `<p class="v-no">✕ ${esc(t)}</p>`).join("")}</div>
      </div>` : ""}
      ${icons}
      <div class="slim-foot"><span>${R.CTX_LABELS[bc]} context · qualitative labels, relative among researched CoA specs</span></div>
    </div>`;
  }

  // ---------- P2 · the class page in the modal (pilot demo via the ruled study page) ----------
  const frameHTML = s => `<iframe class="reg-frame" src="rhythm-class.html?c=${classSlug(s)}"
    title="${esc(s.klass)} class page"></iframe>
    <p class="reg-cap" style="padding:0 14px 10px">Pilot demo: the ruled class-page study, loaded
    inside the dialog. A spec preselect would be added if this register wins.</p>`;

  // ---------- registers wired to the demo doors ----------
  function openRegister(s) {
    if (state.reg === "P0") { location.href = classHref(s); return; }
    el("profileContent").innerHTML =
      state.reg === "P1" ? slimHTML(s)
      : state.reg === "P2" ? frameHTML(s)
      : R.profileHTML(s);
    el("profileDialog").showModal();
    el("profileDialog").scrollTop = 0;
  }

  function renderDemo() {
    el("demoCards").innerHTML = ["Cultist", "Tinker"].map(n =>
      C2.composeCard(S.classes.find(c => c.name === n),
        { engine: "blurb", doors: "wow-words", corner: "video" })).join("");
  }

  function renderStatics() {
    const s = specById["cultist/godblade"];
    el("regToday").innerHTML = R.profileHTML(s);
    el("regSlim").innerHTML = slimHTML(s);
    el("exitRuled").innerHTML = slimHTML(s);
  }

  function init() {
    const group = document.querySelector("[data-pick='reg']");
    group.addEventListener("click", e => {
      const b = e.target.closest("button[data-v]");
      if (!b) return;
      state.reg = b.dataset.v;
      group.querySelectorAll("button[data-v]").forEach(x => x.classList.toggle("active", x === b));
    });


    document.addEventListener("click", e => {
      if (e.target.closest(".rimg") || e.target.closest(".cl-rare li") || e.target.closest(".famname")
        || e.target.closest(".vb")) return;
      const t = e.target.closest("[data-open]");
      if (!t) return;
      const s = specById[t.dataset.open];
      if (s) openRegister(s);
    });
    el("profileClose").addEventListener("click", () => el("profileDialog").close());
    el("profileDialog").addEventListener("click", e => { if (e.target === el("profileDialog")) el("profileDialog").close(); });

    renderDemo();
    renderStatics();
  }

  window.COA_PROFILE_STUDY = { slimHTML };
  if (typeof document !== "undefined" && document.getElementById && document.getElementById("demoCards")) init();
})();
