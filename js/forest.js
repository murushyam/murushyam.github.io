(function () {
  const old = document.getElementById("forest-journey");
  if (old) old.remove();
  const globe = document.getElementById("world3d");
  if (globe) globe.remove();

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tree = (x, h, delay) => {
    const ground = 520;
    const top = ground - h;
    const trunkW = 7 + h * 0.012;
    const canopy = 42 + h * 0.12;
    return `
      <g class="tree" style="--d:${delay}" transform="translate(${x} 0)">
        <rect class="trunk" x="${-trunkW / 2}" y="${top + canopy * 0.35}" width="${trunkW}" height="${ground - (top + canopy * 0.35)}" rx="2"/>
        <ellipse class="leaf a" cx="0" cy="${top + canopy * 0.42}" rx="${canopy * 0.55}" ry="${canopy * 0.38}"/>
        <ellipse class="leaf b" cx="${-canopy * 0.22}" cy="${top + canopy * 0.28}" rx="${canopy * 0.38}" ry="${canopy * 0.28}"/>
        <ellipse class="leaf c" cx="${canopy * 0.22}" cy="${top + canopy * 0.26}" rx="${canopy * 0.36}" ry="${canopy * 0.26}"/>
        <ellipse class="leaf d" cx="0" cy="${top + canopy * 0.12}" rx="${canopy * 0.28}" ry="${canopy * 0.22}"/>
        <g class="fire" transform="translate(0 ${ground})">
          <path class="lick" d="M0 0 C-9 -16 -5 -30 0 -46 C5 -30 9 -16 0 0 Z"/>
          <path class="lick inner" d="M0 0 C-5 -10 -2 -20 0 -28 C2 -20 5 -10 0 0 Z"/>
        </g>
        <g class="plume" transform="translate(0 ${top})">
          <ellipse class="p1" cx="-6" cy="-10" rx="16" ry="22"/>
          <ellipse class="p2" cx="10" cy="-28" rx="20" ry="28"/>
          <ellipse class="p3" cx="0" cy="-52" rx="26" ry="34"/>
        </g>
      </g>`;
  };

  const xsFar = [80,170,260,350,440,530,620,710,800,890,980,1070,1160,1250,1340];
  const xsMid = [30,120,210,300,390,480,570,660,750,840,930,1020,1110,1200,1290,1380];
  const xsNear = [10,100,200,295,390,500,610,720,830,950,1070,1180,1300,1405];

  const host = document.createElement("div");
  host.id = "forest-journey";
  host.setAttribute("aria-hidden", "true");
  host.innerHTML = `
    <div class="sky-shift"></div>
    <svg class="layer far" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice">
      ${xsFar.map((x,i)=>tree(x, 200 + ((i * 53) % 80), (i % 5) * 0.12)).join("")}
    </svg>
    <svg class="layer mid" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice">
      ${xsMid.map((x,i)=>tree(x, 270 + ((i * 61) % 110), (i % 6) * 0.1)).join("")}
    </svg>
    <svg class="layer near" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice">
      <path class="ground" d="M0 520 C200 506 420 534 700 516 C980 498 1220 532 1440 518 L1440 560 L0 560 Z"/>
      ${xsNear.map((x,i)=>tree(x, 330 + ((i * 67) % 150), (i % 4) * 0.08)).join("")}
    </svg>
    <div class="stage-label">Canopy · moist</div>
  `;
  document.body.appendChild(host);

  const far = host.querySelector(".far");
  const mid = host.querySelector(".mid");
  const near = host.querySelector(".near");
  const label = host.querySelector(".stage-label");

  const stageOf = (p) => {
    if (p < 0.22) return ["Canopy · moist green", 0];
    if (p < 0.42) return ["Stress · drying brown", 1];
    if (p < 0.68) return ["Ignition · surface fire", 2];
    return ["Plume · smoke column", 3];
  };

  const move = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    const dry = Math.min(1, Math.max(0, (p - 0.18) / 0.28));
    const fire = Math.min(1, Math.max(0, (p - 0.42) / 0.22));
    const smoke = Math.min(1, Math.max(0, (p - 0.62) / 0.22));
    document.body.style.setProperty("--dry", dry.toFixed(3));
    document.body.style.setProperty("--fire", fire.toFixed(3));
    document.body.style.setProperty("--smoke", smoke.toFixed(3));
    host.style.setProperty("--dry", dry.toFixed(3));
    host.style.setProperty("--fire", fire.toFixed(3));
    host.style.setProperty("--smoke", smoke.toFixed(3));
    if (!reduced) {
      far.style.transform = `translate3d(${-p * 70}px,0,0)`;
      mid.style.transform = `translate3d(${-p * 160}px,0,0)`;
      near.style.transform = `translate3d(${-p * 280}px,0,0)`;
    }
    const [name, id] = stageOf(p);
    label.textContent = name;
    host.dataset.stage = String(id);
  };
  window.addEventListener("scroll", move, { passive: true });
  move();
})();
