const header = document.querySelector("[data-site-header]");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href") || "";
    return href.startsWith("#") ? document.querySelector(href) : null;
  })
  .filter(Boolean);

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function closeNavigation() {
  if (!header || !navToggle) return;
  header.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = header?.classList.toggle("nav-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-30% 0px -56% 0px",
    threshold: [0.1, 0.25, 0.5],
  }
);

sections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();
