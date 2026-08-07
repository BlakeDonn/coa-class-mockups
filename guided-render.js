/* Dense Guided pilot renderer. This is deliberately display-only: recommendation
   relationships arrive precomputed in COA_GUIDED and are never scored here. */
(() => {
  "use strict";

  const D = window.COA_GUIDED;
  const R = window.COA_RENDER;
  if (!D || !R) throw new Error("Guided data or shared renderer failed to load.");
  const { esc, glyph, classSlug, specById } = R;
  const visual = state => D.schema.visual_eligibility[state] || D.schema.visual_eligibility.unknown;
  const pilotById = Object.fromEntries(D.pilots.map(pilot => [pilot.id, pilot]));

  function siteSpec(pilot, spec) { return specById[`${pilot.id}/${spec.id}`]; }
  function evidence(state) {
    const item = visual(state);
    return `<span class="guided-evidence" data-evidence="${esc(state)}"><b>${esc(item.badge)}</b><span>${esc(item.treatment)}</span></span>`;
  }
  function specLink(klass, spec, label) {
    const known = specById[`${klass}/${spec.id}`];
    const slug = known ? classSlug(known) : klass;
    return `<a href="class.html?c=${esc(slug)}&from=guided#${esc(spec.id)}">${label}</a>`;
  }
  function relationship(spec, klass) {
    return `<div class="guided-relationship guided-${esc(spec.relationship)}">
      <div><strong>${specLink(klass, spec, esc(spec.name))}</strong><small>${esc(spec.reason)}</small></div>
      <div class="guided-relationship-verdict"><b>${esc(spec.relationship.replace(/_/g, " "))}</b>
        <span class="guided-evidence-group">${spec.evidence_states.map(evidence).join("")}</span></div>
    </div>`;
  }
  function verdictCard(klass) {
    const pilot = pilotById[klass.id];
    const lead = klass.specs.find(spec => spec.relationship === "lead");
    const site = siteSpec(pilot, lead);
    return `<article class="guided-card guided-verdict-card" style="--class-color:${esc(site?.color || "var(--gold)")}">
      <div class="guided-card-top"><span class="guided-glyph">${glyph(site || { klass: klass.name })}</span><div>
        <span class="guided-kicker">${esc(klass.name)} · lead score ${esc(klass.lead_score)}</span>
        <h3>${specLink(klass.id, lead, esc(lead.name))}</h3>
      </div></div>
      <p class="guided-lead-reason">${esc(lead.reason)}</p>
      <div class="guided-relationship-list">${klass.specs.filter(spec => spec.relationship !== "lead").map(spec => relationship(spec, klass.id)).join("")}</div>
      <p class="guided-flexibility">Flexibility: <b>${esc(klass.flexibility)}</b> · only the recorded tie-break may use this.</p>
    </article>`;
  }
  function ledgerCard(pilot) {
    const first = siteSpec(pilot, pilot.specs[0]);
    return `<article class="guided-card guided-ledger-card" style="--class-color:${esc(first?.color || "var(--gold)")}">
      <div class="guided-card-top"><span class="guided-glyph">${glyph(first || { klass: pilot.name })}</span><div><span class="guided-kicker">Pilot class</span><h3>${esc(pilot.name)}</h3></div></div>
      <p class="guided-chassis">${esc(pilot.shared_chassis.value)}</p>${evidence(pilot.shared_chassis.state)}
      <div class="guided-tiles">${pilot.specs.map(spec => specLink(pilot.id, spec,
        `<span class="guided-tile">${esc(spec.name)} · ${esc(spec.roles.value.join(" / "))}</span>`)).join("")}</div>
    </article>`;
  }
  function loopMarkup(spec) {
    if (spec.loop.kind === "dependency_card") {
      return `<div class="guided-diagram">${spec.loop.edges.map(edge => `<div class="guided-edge"><b>${esc(edge.from)} → ${esc(edge.to)}</b><small>${esc(edge.text)}</small>${evidence(edge.state)}</div>`).join("")}</div>`;
    }
    return `<p class="guided-loop-note">Unordered kit tiles: ${esc(spec.loop.reason)}</p><div class="guided-tiles">${spec.kit_tiles.map(tile => `<span class="guided-tile">${esc(tile)}</span>`).join("")}</div>`;
  }
  function engineSpec(pilot, spec) {
    const site = siteSpec(pilot, spec);
    return `<section class="guided-engine-spec" style="--class-color:${esc(site?.color || "var(--gold)")}"><h3>${esc(spec.name)}</h3>
      <div class="guided-engine-facts"><span>${esc(spec.roles.value.join(" / "))}</span>${evidence(spec.roles.state)}<span>${esc(spec.range.value || "range unknown")}</span>${evidence(spec.range.state)}</div>
      ${loopMarkup(spec)}</section>`;
  }
  function renderScenario(index) {
    const scenario = D.recommendations.scenarios[index];
    const target = document.getElementById("guided-verdict");
    if (target) target.innerHTML = scenario.classes.map(verdictCard).join("");
    const title = document.getElementById("scenario-title");
    if (title) title.textContent = scenario.title;
    document.querySelectorAll("[data-scenario]").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
      button.setAttribute("aria-pressed", String(buttonIndex === index));
    });
  }
  function renderGuidedPage() {
    const bar = document.getElementById("scenario-bar");
    const ledger = document.getElementById("class-ledger");
    if (bar) {
      D.recommendations.scenarios.forEach((scenario, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.dataset.scenario = index;
        button.textContent = scenario.title;
        button.addEventListener("click", () => renderScenario(index));
        bar.appendChild(button);
      });
      renderScenario(0);
    }
    if (ledger) ledger.innerHTML = D.pilots.map(ledgerCard).join("");
  }
  function renderEngineRoom() {
    const target = document.getElementById("engine-room");
    if (!target) return;
    const klass = new URLSearchParams(location.search).get("c") || "chronomancer";
    const pilot = pilotById[klass];
    if (!pilot) return;
    target.hidden = false;
    target.innerHTML = `<div class="guided-engine-head"><span class="guided-kicker">Guided pilot</span><h2>${esc(pilot.name)} Engine Room</h2><p>${esc(pilot.shared_chassis.value)}</p></div>${pilot.specs.map(spec => engineSpec(pilot, spec)).join("")}`;
  }

  renderGuidedPage();
  renderEngineRoom();
})();
