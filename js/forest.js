(function () {
  if (document.getElementById("forest-journey")) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tree = (x, h, lean, burned) => {
    const top = 520 - h;
    const w = 18 + h * 0.045;
    const fill = burned ? "#1a120c" : "#0d1f18";
    const mid = burned ? "#3a2414" : "#163528";
    return `
      <g class="tree" transform="translate(${x} 0)">
        <path d="M0 520 L0 ${top + h * 0.12}" stroke="${burned ? "#2a1a10" : "#1a2e24"}" stroke-width="6" />
        <path d="M0 ${top} L${-w} ${top + h * 0.38} L${-w * 0.35} ${top + h * 0.34} L${-w * 1.15} ${top + h * 0.62} L${-w * 0.28} ${top + h * 0.56} L${-w * 0.7} ${top + h * 0.86} L0 ${top + h * 0.72} L${w * 0.7} ${top + h * 0.86} L${w * 0.28} ${top + h * 0.56} L${w * 1.15} ${top + h * 0.62} L${w * 0.35} ${top + h * 0.34} L${w} ${top + h * 0.38} Z" fill="${fill}" transform="rotate(${lean} 0 ${top + h * 0.5})"/>
        <path d="M0 ${top + 8} L${-w * 0.62} ${top + h * 0.32} L0 ${top + h * 0.22} L${w * 0.62} ${top + h * 0.32} Z" fill="${mid}" opacity=".7"/>
      </g>`;
  };

  const flame = (x, s) => `
    <g class="flame" transform="translate(${x} 508) scale(${s})">
      <path class="lick" d="M0 0 C-10 -18 -6 -34 0 -52 C6 -34 10 -18 0 0 Z" fill="#ff6b35"/>
      <path class="lick" d="M0 0 C-6 -12 -3 -24 0 -34 C3 -24 6 -12 0 0 Z" fill="#ffd166"/>
    </g>`;

  const host = document.createElement("div");
  host.id = "forest-journey";
  host.setAttribute("aria-hidden", "true");
  host.innerHTML = `
    <svg class="layer far" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#070b14" stop-opacity="0"/>
          <stop offset="1" stop-color="#070b14" stop-opacity=".55"/>
        </linearGradient>
      </defs>
      ${[90,160,240,320,410,500,590,680,770,860,950,1040,1130,1220,1310].map((x,i)=>tree(x, 210+((i*47)%90), (i%5)-2, false)).join("")}
      <rect width="1440" height="560" fill="url(#haze)"/>
    </svg>
    <svg class="layer mid" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice">
      ${[40,130,220,310,400,490,580,670,760,850,940,1030,1120,1210,1300,1390].map((x,i)=>tree(x, 280+((i*63)%120), ((i%7)-3)*0.8, i%4===0)).join("")}
    </svg>
    <svg class="layer near" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMax slice">
      <path class="ground" d="M0 520 C180 500 360 535 540 518 C720 500 900 538 1080 516 C1260 498 1380 528 1440 520 L1440 560 L0 560 Z" fill="#08110e"/>
      ${[20,110,210,305,400,510,620,730,840,960,1080,1190,1310,1410].map((x,i)=>tree(x, 340+((i*71)%160), ((i%6)-3)*1.1, i%3===0)).join("")}
      ${[210,400,620,840,1080,1310].map((x,i)=>flame(x, 0.7 + (i%3)*0.25)).join("")}
      <path class="trail" d="M-40 528 C220 508 420 536 680 512 C940 488 1160 530 1480 510" fill="none" stroke="#ff9f1c" stroke-width="1.6" stroke-dasharray="8 14" pathLength="100"/>
    </svg>
    <div class="smoke"></div>
  `;
  document.body.appendChild(host);

  const far = host.querySelector(".far");
  const mid = host.querySelector(".mid");
  const near = host.querySelector(".near");
  const trail = host.querySelector(".trail");

  const move = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    if (reduced) return;
    far.style.transform = `translate3d(${-p * 80}px, ${8 - p * 20}px, 0)`;
    mid.style.transform = `translate3d(${-p * 180}px, ${4 - p * 36}px, 0)`;
    near.style.transform = `translate3d(${-p * 320}px, ${-p * 56}px, 0)`;
    if (trail) trail.style.strokeDashoffset = `${100 - p * 100}`;
    host.style.setProperty("--fire", String(0.35 + p * 0.45));
  };
  window.addEventListener("scroll", move, { passive: true });
  move();
})();
