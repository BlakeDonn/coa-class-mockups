(() => {
  "use strict";

  const data = window.COA_DATA;
  if (!data) throw new Error("CoA data failed to load.");

  const state = { search: "", role: "All", combat: "All", tag: "All", load: "All" };
  const el = {
    classList: document.querySelector("#classList"),
    classSections: document.querySelector("#classSections"),
    resultCount: document.querySelector("#resultCount"),
    emptyState: document.querySelector("#emptyState"),
    search: document.querySelector("#searchInput"),
    dialog: document.querySelector("#specDialog"),
    dialogContent: document.querySelector("#dialogContent"),
    classRail: document.querySelector("#classRail"),
  };

  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
  const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  function loadMatches(value) {
    if (state.load === "All") return true;
    if (state.load === "1-2") return value <= 2;
    if (state.load === "3") return value === 3;
    return value >= 4;
  }

  function specMatches(coaClass, spec) {
    const query = state.search.trim().toLowerCase();
    const haystack = [
      coaClass.name, coaClass.intro, spec.name, spec.descriptor, spec.summary,
      ...spec.roles, ...spec.combat, ...spec.tags, ...spec.notable,
      spec.community.topTitle || ""
    ].join(" ").toLowerCase();
    return (!query || haystack.includes(query))
      && (state.role === "All" || spec.roles.includes(state.role))
      && (state.combat === "All" || spec.combat.includes(state.combat))
      && (state.tag === "All" || spec.tags.includes(state.tag))
      && loadMatches(spec.load.value);
  }

  function filteredClasses() {
    return data.classes.map((coaClass, classIndex) => ({
      ...coaClass,
      classIndex,
      visibleSpecs: coaClass.specs
        .map((spec, specIndex) => ({ ...spec, specIndex }))
        .filter(spec => specMatches(coaClass, spec))
    }));
  }

  function meter(value) {
    return `<div class="load-meter" aria-label="Learning load ${value} out of 5">${
      [1,2,3,4,5].map(step => `<i class="${step <= value ? "on" : ""}"></i>`).join("")
    }</div>`;
  }

  function cardTemplate(coaClass, spec) {
    return `<article class="spec-card" tabindex="0" role="button"
      style="--class-color:${coaClass.color}" data-class-index="${coaClass.classIndex}" data-spec-index="${spec.specIndex}"
      aria-label="Open ${escapeHtml(spec.name)} details">
      <div class="spec-top">
        <div><h3>${escapeHtml(spec.name)}</h3><p class="descriptor">${escapeHtml(spec.descriptor)}</p></div>
        <div class="role-pills">${spec.roles.map(role => `<span class="role-pill">${escapeHtml(role)}</span>`).join("")}</div>
      </div>
      <p class="spec-summary">${escapeHtml(spec.summary)}</p>
      <div class="tag-row">${spec.tags.slice(0,5).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="card-footer">
        <div><div class="load-label">${escapeHtml(spec.load.label)} learning load</div>${meter(spec.load.value)}</div>
        <div class="community-count"><strong>${spec.community.count}</strong> recent build${spec.community.count === 1 ? "" : "s"}</div>
      </div>
    </article>`;
  }

  function sectionTemplate(coaClass) {
    const glyph = coaClass.name.split(/\s+/).map(word => word[0]).join("").slice(0,2);
    return `<section class="class-section" id="class-${slugify(coaClass.name)}" data-class-index="${coaClass.classIndex}" style="--class-color:${coaClass.color}">
      <header class="class-header" data-glyph="${escapeHtml(glyph)}">
        <div class="class-kicker">Class ${coaClass.order} of ${data.classCount} · ${coaClass.visibleSpecs.length} path${coaClass.visibleSpecs.length === 1 ? "" : "s"} shown</div>
        <h2>${escapeHtml(coaClass.name)}</h2>
        <p>${escapeHtml(coaClass.intro)}</p>
      </header>
      <div class="spec-grid">${coaClass.visibleSpecs.map(spec => cardTemplate(coaClass, spec)).join("")}</div>
    </section>`;
  }

  function renderRail(classes) {
    el.classList.innerHTML = classes.map(coaClass => {
      const glyph = coaClass.name.split(/\s+/).map(word => word[0]).join("").slice(0,2);
      return `<button class="class-link ${coaClass.visibleSpecs.length ? "" : "is-empty"}" style="--class-color:${coaClass.color}"
        data-target="class-${slugify(coaClass.name)}" ${coaClass.visibleSpecs.length ? "" : "disabled"}>
        <span class="class-glyph">${escapeHtml(glyph)}</span>
        <span><b>${escapeHtml(coaClass.name)}</b><small>${coaClass.specs.length} specializations</small></span>
        <span class="class-visible-count">${coaClass.visibleSpecs.length}</span>
      </button>`;
    }).join("");

    el.classList.querySelectorAll(".class-link:not(:disabled)").forEach(button => {
      button.addEventListener("click", () => {
        document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classRail.classList.remove("open");
      });
    });
  }

  function render() {
    const classes = filteredClasses();
    const visibleClasses = classes.filter(coaClass => coaClass.visibleSpecs.length);
    const count = visibleClasses.reduce((total, coaClass) => total + coaClass.visibleSpecs.length, 0);
    renderRail(classes);
    el.classSections.innerHTML = visibleClasses.map(sectionTemplate).join("");
    el.resultCount.textContent = count === data.specCount
      ? `Showing all ${data.specCount} specializations`
      : `Showing ${count} of ${data.specCount} specializations`;
    el.emptyState.hidden = count !== 0;
    bindCards();
    observeSections();
  }

  function bindCards() {
    document.querySelectorAll(".spec-card").forEach(card => {
      const open = () => openDialog(Number(card.dataset.classIndex), Number(card.dataset.specIndex));
      card.addEventListener("click", open);
      card.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); }
      });
    });
  }

  function openDialog(classIndex, specIndex) {
    const coaClass = data.classes[classIndex];
    const spec = coaClass.specs[specIndex];
    const evidence = spec.community.count
      ? `<div class="evidence-card"><strong>${spec.community.count} recent community build${spec.community.count === 1 ? "" : "s"} captured</strong>
          <p>Top documented build: ${escapeHtml(spec.community.topTitle)}</p>
          ${spec.community.topUrl ? `<a href="${escapeHtml(spec.community.topUrl)}" target="_blank" rel="noreferrer">Open community build ↗</a>` : ""}</div>`
      : `<div class="evidence-card"><strong>No recent submitted build captured</strong><p>This is a documentation gap, not evidence that the specialization is weak.</p></div>`;

    el.dialogContent.innerHTML = `<div style="--class-color:${coaClass.color}">
      <header class="dialog-hero">
        <div class="class-kicker">${escapeHtml(coaClass.name)} · ${spec.roles.map(escapeHtml).join(" / ")}</div>
        <h2>${escapeHtml(spec.name)}</h2>
        <p>${escapeHtml(spec.descriptor)}</p>
      </header>
      <div class="dialog-body">
        <p>${escapeHtml(spec.summary)}</p>
        <div class="tag-row">${[...spec.combat,...spec.tags].map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}</div>
        <section class="detail-block"><h3>Learning load</h3><div class="load-label">${escapeHtml(spec.load.label)}</div>${meter(spec.load.value)}</section>
        <section class="detail-block"><h3>Defining talents and abilities</h3><div class="notable-list">${spec.notable.map(name => `<span>${escapeHtml(name)}</span>`).join("")}</div></section>
        <section class="detail-block"><h3>Recent documentation</h3>${evidence}</section>
        <section class="detail-block"><h3>Evidence note</h3><div class="evidence-card"><p>Identity is based on the August 5 talent snapshot. Learning load is our inference. Exact balance, coefficients, and bug status can change through hotfixes.</p></div></section>
      </div>
    </div>`;
    el.dialog.showModal();
  }

  let observer;
  function observeSections() {
    observer?.disconnect();
    observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      document.querySelectorAll(".class-link").forEach(link => link.classList.toggle("active", link.dataset.target === visible.target.id));
    }, { rootMargin: "-100px 0px -65% 0px", threshold: [0,.15,.4] });
    document.querySelectorAll(".class-section").forEach(section => observer.observe(section));
  }

  function clearAll() {
    Object.assign(state, { search: "", role: "All", combat: "All", tag: "All", load: "All" });
    el.search.value = "";
    document.querySelectorAll("[data-filter-group]").forEach(group => group.querySelectorAll(".filter-button").forEach(button => button.classList.toggle("active", button.dataset.filter === "All")));
    render();
  }

  document.querySelectorAll("[data-filter-group]").forEach(group => {
    group.addEventListener("click", event => {
      const button = event.target.closest(".filter-button");
      if (!button) return;
      state[group.dataset.filterGroup] = button.dataset.filter;
      group.querySelectorAll(".filter-button").forEach(candidate => candidate.classList.toggle("active", candidate === button));
      render();
    });
  });
  el.search.addEventListener("input", () => { state.search = el.search.value; render(); });
  document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement !== el.search && !el.dialog.open) { event.preventDefault(); el.search.focus(); }
  });
  document.querySelector("#clearButton").addEventListener("click", clearAll);
  document.querySelector("#emptyResetButton").addEventListener("click", clearAll);
  document.querySelector("#dialogClose").addEventListener("click", () => el.dialog.close());
  el.dialog.addEventListener("click", event => { if (event.target === el.dialog) el.dialog.close(); });
  document.querySelector("#menuButton").addEventListener("click", () => el.classRail.classList.add("open"));
  document.querySelector("#closeMenuButton").addEventListener("click", () => el.classRail.classList.remove("open"));
  document.querySelector("#surpriseButton").addEventListener("click", () => {
    const cards = [...document.querySelectorAll(".spec-card")];
    if (!cards.length) { clearAll(); return; }
    cards[Math.floor(Math.random() * cards.length)].click();
  });

  document.querySelector("#classCount").textContent = data.classCount;
  document.querySelector("#specCount").textContent = data.specCount;
  document.querySelector("#buildCount").textContent = data.communityBuildCount;
  render();
})();
