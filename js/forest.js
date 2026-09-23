(function () {
  document.getElementById("forest-journey")?.remove();
  document.getElementById("world3d")?.remove();
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tree = (x, h) => {
    const g = 540;
    const top = g - h;
    const tw = 4 + h * 0.008;
    const c = 34 + h * 0.08;
    return `<g class="tree" transform="translate(${x} 0)">
      <rect class="trunk" x="${-tw / 2}" y="${top + c * 0.4}" width="${tw}" height="${g - top - c * 0.4}" rx="1.5"/>
      <ellipse class="leaf" cx="0" cy="${top + c * 0.42}" rx="${c * 0.5}" ry="${c * 0.34}"/>
      <ellipse class="leaf" cx="${-c * 0.2}" cy="${top + c * 0.28}" rx="${c * 0.32}" ry="${c * 0.24}"/>
      <ellipse class="leaf" cx="${c * 0.2}" cy="${top + c * 0.26}" rx="${c * 0.3}" ry="${c * 0.22}"/>
      <ellipse class="leaf" cx="0" cy="${top + c * 0.14}" rx="${c * 0.24}" ry="${c * 0.18}"/>
      <g class="fire" transform="translate(0 ${g})"><path class="lick" d="M0 0 C-7 -12 -4 -24 0 -34 C4 -24 7 -12 0 0Z"/></g>
      <g class="plume" transform="translate(0 ${top})"><ellipse class="p1" cx="0" cy="-18" rx="14" ry="20"/></g>
    </g>`;
  };

  const host = document.createElement("div");
  host.id = "forest-journey";
  host.setAttribute("aria-hidden", "true");
  host.innerHTML = `
    <svg class="layer left" viewBox="0 0 1440 560" preserveAspectRatio="xMinYMax meet">
      ${[36, 92, 148].map((x, i) => tree(x, 250 + i * 40)).join("")}
    </svg>
    <svg class="layer right" viewBox="0 0 1440 560" preserveAspectRatio="xMaxYMax meet">
      ${[1296, 1352, 1408].map((x, i) => tree(x, 250 + i * 36)).join("")}
    </svg>
    <div class="stage-label">Canopy · moist green</div>`;
  document.body.appendChild(host);

  const label = host.querySelector(".stage-label");
  const left = host.querySelector(".left");
  const right = host.querySelector(".right");
  const move = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    const dry = Math.min(1, Math.max(0, (p - 0.18) / 0.28));
    const fire = Math.min(1, Math.max(0, (p - 0.42) / 0.22));
    const smoke = Math.min(1, Math.max(0, (p - 0.62) / 0.22));
    document.body.style.setProperty("--dry", dry.toFixed(3));
    document.body.style.setProperty("--fire", fire.toFixed(3));
    document.body.style.setProperty("--smoke", smoke.toFixed(3));
    if (!reduced) {
      left.style.transform = `translate3d(${-p * 24}px,0,0)`;
      right.style.transform = `translate3d(${p * 24}px,0,0)`;
    }
    label.textContent = p < 0.22 ? "Canopy · moist green" : p < 0.42 ? "Stress · drying" : p < 0.68 ? "Ignition · fire" : "Plume · smoke";
  };
  window.addEventListener("scroll", move, { passive: true });
  move();
})();
