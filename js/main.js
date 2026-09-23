const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

(() => {
  if (!document.querySelector('link[href*="overrides.css"]')) {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "css/overrides.css";
    document.head.appendChild(css);
  }
  if (!document.querySelector('script[src*="scene3d.js"]')) {
    const s = document.createElement("script");
    s.src = "js/scene3d.js";
    document.body.appendChild(s);
  }
})();

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

document.querySelectorAll("[data-count]").forEach((el) => {
  const end = Number(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  el.textContent = `${end}${suffix}`;
});

let counted = false;
const countIo = new IntersectionObserver((entries) => {
  if (!entries.some((e) => e.isIntersecting) || counted) return;
  counted = true;
  document.querySelectorAll("[data-count]").forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    if (reduced) {
      el.textContent = `${end}${suffix}`;
      return;
    }
    const start = performance.now();
    const dur = 900;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(end * eased)}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
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

document.querySelectorAll(".hero-card, .site-card, .tile, .panel").forEach((card) => {
  if (reduced || !window.matchMedia("(hover: hover)").matches) return;
  card.style.transformStyle = "preserve-3d";
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "none";
  });
});
