const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const btn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
if (btn && links) {
  btn.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  });
});

const chapters = [...document.querySelectorAll("section[id]")];
const journey = [...document.querySelectorAll(".journey a")];
const navAnchors = [...document.querySelectorAll(".nav-links a")];
const bar = document.querySelector(".scroll-progress i");

const markActive = (id) => {
  journey.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
};

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      markActive(entry.target.id);
    });
  },
  { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
);
chapters.forEach((s) => io.observe(s));

const onScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = max > 0 ? window.scrollY / max : 0;
  if (bar) bar.style.width = `${Math.min(100, p * 100)}%`;
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

document.querySelectorAll(".item, .pub, .tile, .skill-box, .find, .list li, .thesis .panel").forEach((el, i) => {
  el.classList.add("reveal-on");
  el.style.transitionDelay = `${(i % 6) * 0.05}s`;
});
const revealIo = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealIo.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
);
document.querySelectorAll(".reveal-on").forEach((el) => revealIo.observe(el));

let counted = false;
const countIo = new IntersectionObserver((entries) => {
  if (!entries.some((e) => e.isIntersecting) || counted) return;
  counted = true;
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const dur = 1100;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(end * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    if (reduced) el.textContent = `${end}${suffix}`;
    else requestAnimationFrame(tick);
  });
});
const stats = document.querySelector(".stats");
if (stats) countIo.observe(stats);

document.querySelectorAll(".filter").forEach((btnEl) => {
  btnEl.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("on"));
    btnEl.classList.add("on");
    const kind = btnEl.dataset.filter;
    document.querySelectorAll(".pub").forEach((p) => {
      p.classList.toggle("gone", kind !== "all" && p.dataset.kind !== kind);
    });
  });
});

const notes = {
  similipal: {
    title: "Similipal · moist deciduous, Odisha",
    body: "The 25–29 April 2021 fire is the thesis core case. Against nearby non-fire controls, sensible heat rose ~22.4%, latent heat collapsed ~33%, VPD spiked 94.6% to 5.04 ± 0.41 kPa, LST climbed ~5 °C, ET fell ~33%, and AOD more than tripled. About 47% of above-ground biomass was lost. Soil-moisture coupling is the amplifier that turns a burn scar into a hotter, drier surface."
  },
  bandhavgarh: {
    title: "Bandhavgarh · dry deciduous, Madhya Pradesh",
    body: "Lower fuel loads and a drier baseline produce the most restrained flux response of the three sites (SH +10.2%, LH −14.5%, ~12% AGB loss). The land–air coupling is still steep: the slope between daily maximum temperature and volumetric soil water stays strongly negative, so modest drying still lifts surface heating."
  },
  chamba: {
    title: "Chamba / Uttarakhand · montane Himalaya",
    body: "Higher-altitude buffering flips the pattern: SH surged 42.9% while LH fell only 9.9%. The 2022 Uttarakhand fires cut biomass 16.75%, then monsoon recharge drove 40.85% recovery and a net 14.35% gain. Extreme pre-monsoon VPD and dry soils set the burn; SAVI and VCI show secondary succession once moisture returns."
  }
};

const detail = document.getElementById("site-detail");
const openNote = (key) => {
  const note = notes[key];
  if (!note || !detail) return;
  detail.hidden = false;
  detail.querySelector("h3").textContent = note.title;
  detail.querySelector("p").textContent = note.body;
  detail.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest" });
};
document.querySelectorAll(".site-card").forEach((card) => {
  const go = () => openNote(card.dataset.site);
  card.addEventListener("click", go);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  });
});
document.querySelector(".close-detail")?.addEventListener("click", () => {
  if (detail) detail.hidden = true;
});

const tiltCard = document.querySelector(".hero-card.tilt");
if (tiltCard && !reduced) {
  tiltCard.addEventListener("mousemove", (e) => {
    const r = tiltCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltCard.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  tiltCard.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "none";
  });
}

(function atmosphere() {
  const canvas = document.getElementById("atmosphere");
  if (!canvas || reduced) return;
  const ctx = canvas.getContext("2d");
  let w = 0;
  let h = 0;
  let particles = [];
  let sparks = [];
  let wind = 0;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const n = Math.min(140, Math.floor((w * h) / 14000));
    particles = Array.from({ length: n }, () => spawn());
  };

  const spawn = (y) => ({
    x: Math.random() * w,
    y: y == null ? Math.random() * h : y,
    r: Math.random() * 1.8 + 0.3,
    vx: Math.random() * 0.25 + 0.05,
    vy: Math.random() * -0.18 - 0.02,
    a: Math.random() * 0.35 + 0.08,
    ember: Math.random() > 0.78
  });

  const spark = () => ({
    x: Math.random() * w * 0.5 + w * 0.25,
    y: h + 10,
    vx: (Math.random() - 0.5) * 0.6,
    vy: -Math.random() * 1.6 - 0.4,
    life: 1,
    r: Math.random() * 1.6 + 0.6
  });

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    wind = Math.sin(performance.now() / 2400) * 0.25;

    ctx.strokeStyle = "rgba(125,211,252,0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i += 1) {
      const y = ((performance.now() / 40 + i * 90) % (h + 80)) - 40;
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= w; x += 40) {
        ctx.lineTo(x, y + Math.sin(x / 90 + i) * 10);
      }
      ctx.stroke();
    }

    particles.forEach((p) => {
      p.x += p.vx + wind;
      p.y += p.vy;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) Object.assign(p, spawn(h + 8));
      ctx.beginPath();
      ctx.fillStyle = p.ember
        ? `rgba(255,107,53,${p.a})`
        : `rgba(125,211,252,${p.a})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (Math.random() < 0.04 && sparks.length < 24) sparks.push(spark());
    sparks = sparks.filter((s) => s.life > 0);
    sparks.forEach((s) => {
      s.x += s.vx + wind * 0.4;
      s.y += s.vy;
      s.life -= 0.008;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,159,28,${Math.max(0, s.life) * 0.7})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", resize);
  resize();
  draw();
})();
