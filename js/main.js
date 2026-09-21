const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const btn = document.querySelector(".menu-btn");
const links = document.querySelector(".nav-links");
if (btn && links) {
  btn.addEventListener("click", () => links.classList.toggle("open"));
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => links.classList.remove("open"))
  );
}
