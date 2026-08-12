import { iconPaths } from "./icons.js";
import { extraIconPaths } from "./extra-icons.js";
import {
  profile,
  heroTechs,
  socials,
  experiences,
  techGroups,
  projects,
  highlights,
  sections,
  dict,
} from "./data.js";

/* ------------------------------------------------------------------ */
/* i18n                                                                */
/* ------------------------------------------------------------------ */

let lang = "pt";
const t = (key) => dict[key][lang];
const brandPaths = { ...iconPaths, ...extraIconPaths };

function applyLang() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-t]").forEach((n) => {
    n.textContent = t(n.dataset.t);
  });
  document.querySelectorAll("[data-localized]").forEach((n) => {
    n.textContent = n.dataset[lang];
  });
  document.querySelectorAll("[data-aria-localized]").forEach((n) => {
    n.setAttribute("aria-label", n.dataset[lang]);
  });
  const cvLink = document.querySelector("[data-cv-download]");
  if (cvLink) {
    cvLink.href = profile.cvUrls[lang];
    cvLink.download = `renan-mischiatti-cv-${lang}.pdf`;
  }
  document.querySelectorAll("[data-lang-btn]").forEach((b) => {
    const on = b.dataset.langBtn === lang;
    b.classList.toggle("text-accent", on);
    b.classList.toggle("hover:text-foreground", !on);
    b.setAttribute("aria-pressed", String(on));
  });
}

function setLang(l) {
  lang = l;
  applyLang();
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isDesktop = () =>
  window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const localValue = (value) =>
  value && typeof value === "object" && "en" in value ? value[lang] : value;

const projectHandle = (value) =>
  localValue(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const loc = (value) => {
  if (!value || typeof value !== "object" || !("en" in value)) return esc(value);
  return `<span data-localized data-en="${esc(value.en)}" data-pt="${esc(value.pt)}">${esc(value[lang])}</span>`;
};

function brandIcon(slug, cls = "") {
  const p = brandPaths[slug];
  if (!p) return "";
  return `<svg viewBox="0 0 24 24" role="img" aria-hidden="true" focusable="false" class="${cls}" fill="currentColor"><path d="${p}"/></svg>`;
}

const lucide = {
  arrowRight: (cls = "", size = 14, sw = 2) =>
    `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  arrowUpRight: (cls = "", size = 14, sw = 2) =>
    `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
  arrowDown: (cls = "", size = 14, sw = 1.5) =>
    `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`,
  arrowUp: (cls = "", size = 13, sw = 2) =>
    `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>`,
  download: (cls = "", size = 14, sw = 2) =>
    `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
  menu: (cls = "", size = 20, sw = 1.5) =>
    `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: (cls = "", size = 20, sw = 1.5) =>
    `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
};

/** scroll progress helper mirroring framer-motion useScroll offsets */
const OFFSET = { start: 0, center: 0.5, end: 1 };
function frac(token) {
  if (token in OFFSET) return OFFSET[token];
  if (token.endsWith("%")) return parseFloat(token) / 100;
  return parseFloat(token) || 0;
}
function parsePair(str) {
  const [a, b] = str.split(" ");
  return [frac(a), frac(b)];
}
function scrollProgress(el, o1, o2) {
  const rect = el.getBoundingClientRect();
  const top = rect.top + window.scrollY;
  const h = rect.height;
  const vh = window.innerHeight;
  const [a1, b1] = parsePair(o1);
  const [a2, b2] = parsePair(o2);
  const start = top + a1 * h - b1 * vh;
  const end = top + a2 * h - b2 * vh;
  if (end === start) return 0;
  return Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
}
const mix = (a, b, p) => a + (b - a) * p;

/* rAF ticker */
const tickers = [];
const onTick = (fn) => tickers.push(fn);
function loop() {
  for (const fn of tickers) fn();
  requestAnimationFrame(loop);
}

/* in-view observer -> adds .is-in */
function observeReveal(root = document) {
  root.querySelectorAll("[data-reveal]:not([data-observed])").forEach((n) => {
    n.setAttribute("data-observed", "");
    const once = n.dataset.revealOnce !== "false";
    const margin = n.dataset.revealMargin || "-15% 0px";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            n.classList.add("is-in");
            if (once) io.disconnect();
          } else if (!once) {
            n.classList.remove("is-in");
          }
        });
      },
      { rootMargin: margin },
    );
    io.observe(n);
  });
}

/* ------------------------------------------------------------------ */
/* sections markup                                                     */
/* ------------------------------------------------------------------ */

function sectionHeader(index, title, subtitleKey, id, titleKey) {
  return `
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-4">
      <span class="label-mono text-accent">${index}</span>
      <span class="h-px w-12 bg-hairline"></span>
      ${id ? `<span class="label-mono text-muted-foreground">${id}</span>` : ""}
    </div>
    <h2 class="display-lg anim-rise" data-reveal ${titleKey ? `data-t="${titleKey}"` : ""}>${titleKey ? "" : esc(title)}</h2>
    <p class="max-w-md text-base text-muted-foreground" data-t="${subtitleKey}"></p>
  </div>`;
}

function heroHTML() {
  return `
<section id="home" class="hero-shell relative flex min-h-svh items-center px-6 pb-16 pt-28 lg:px-12 lg:pt-20">
  <div class="hero-grid mx-auto grid w-full max-w-[1600px] items-center gap-12 lg:grid-cols-12">
    <div id="hero-text" class="lg:col-span-6 xl:col-span-5">
      <div class="anim-rise" data-rise="0.35">
        <div class="flex items-center gap-4">
          <span class="h-px w-10 bg-accent"></span>
          <span class="label-mono text-muted-foreground" data-t="hello"></span>
        </div>
      </div>

      <h1 class="display-xl mt-6">
        <span class="block anim-rise" data-rise="0.45">${esc(profile.firstName)}</span>
        <span class="block text-accent anim-rise" data-rise="0.57">${esc(profile.lastName)}.</span>
      </h1>

      <p class="mt-6 font-display text-lg font-medium lg:text-xl anim-rise" data-rise="0.6">
        ${esc(profile.role)}<span class="text-muted-foreground"> &amp; ${loc(profile.secondaryRole)}</span>
      </p>

      <p class="mt-4 max-w-md text-base leading-relaxed text-muted-foreground anim-rise" data-rise="0.75" data-t="tagline"></p>

      <ul class="hero-techs mt-7 flex flex-wrap items-center gap-6 anim-rise" data-rise="0.82" aria-label="Core technologies">
        ${heroTechs
          .map(
            (tech) => `<li title="${esc(tech.name)}" class="inline-flex items-center" style="color:#${tech.hex}">
          ${brandIcon(tech.slug, "h-8 w-8 shrink-0 transition-transform duration-300 hover:scale-110")}
          <span class="sr-only">${esc(tech.name)}</span>
        </li>`,
          )
          .join("")}
      </ul>

      <div class="mt-10 flex flex-wrap items-center gap-3 anim-rise" data-rise="0.9">
        <a href="#projects" class="group inline-flex items-center gap-3 bg-foreground px-6 py-3.5 text-background transition-colors hover:bg-accent">
          <span class="label-mono" data-t="viewWork"></span>
          ${lucide.arrowRight("transition-transform duration-300 group-hover:translate-x-1")}
        </a>
        <a href="${profile.cvUrls[lang]}" data-cv-download download="renan-mischiatti-cv-${lang}.pdf" class="group inline-flex items-center gap-3 border border-hairline px-6 py-3.5 transition-colors hover:border-accent hover:text-accent">
          <span class="label-mono" data-t="downloadCv"></span>
          ${lucide.download()}
        </a>
      </div>

      <ul class="hero-socials mt-16 flex items-center gap-6 anim-rise" data-rise="1.2">
        ${socials
          .map(
            (s) => `<li><a href="${s.url}" target="_blank" rel="noreferrer noopener" aria-label="${esc(s.name)}" class="group block text-muted-foreground transition-colors" style="--brand:#${s.hex}">
          ${brandIcon(s.slug, "h-[18px] w-[18px] transition-all duration-300 group-hover:scale-110 group-hover:[color:var(--brand)]")}
        </a></li>`,
          )
          .join("")}
      </ul>
    </div>

    <div class="hero-visual relative lg:col-span-6 lg:col-start-7">
      <svg id="hero-art" aria-hidden="true" viewBox="0 0 400 400" class="absolute inset-0 h-full w-full text-foreground/10 opacity-0">
        <circle cx="200" cy="150" r="150" fill="none" stroke="currentColor" stroke-width="0.5"/>
        <circle cx="200" cy="150" r="105" fill="none" stroke="currentColor" stroke-width="0.5"/>
        <path d="M40 300 L200 150 L360 300" fill="none" stroke="currentColor" stroke-width="0.5"/>
        <path d="M200 20 L200 380" stroke="currentColor" stroke-width="0.5"/>
        <rect x="120" y="70" width="160" height="160" fill="none" stroke="currentColor" stroke-width="0.5" transform="rotate(45 200 150)"/>
      </svg>

      <div id="hero-photo" class="relative mx-auto w-full max-w-[420px] lg:max-w-none">
        <img src="assets/portrait.png" alt="${esc(profile.firstName)} ${esc(profile.lastName)}, ${esc(profile.role)}" width="1254" height="1254" fetchpriority="high" class="hero-portrait mx-auto h-auto w-full object-contain"/>
      </div>

      <div class="absolute bottom-2 left-0 hidden border-l border-accent bg-background px-3 py-2 lg:block anim-rise" data-rise="1.3">
        <p class="label-mono text-muted-foreground">STATUS: <span class="text-accent">${esc(profile.status)}</span></p>
        <p class="label-mono mt-2 text-muted-foreground">LOCATION: ${esc(profile.location.toUpperCase())}</p>
      </div>
    </div>
  </div>

  <div id="hero-scroll" class="absolute bottom-10 right-6 hidden flex-col items-center gap-4 opacity-0 transition-opacity duration-[800ms] lg:right-12 lg:flex">
    <span class="label-mono [writing-mode:vertical-rl] text-muted-foreground" data-t="scroll"></span>
    <div class="relative h-16 w-px bg-hairline">
      <div id="hero-line" class="absolute inset-0 bg-accent" style="transform:scaleY(0);transform-origin:top"></div>
    </div>
    ${lucide.arrowDown("text-accent")}
  </div>
</section>`;
}

function experienceHTML() {
  const items = experiences
    .map((exp, i) => {
      const left = i % 2 === 0;
      return `
    <li class="timeline-item relative grid grid-cols-[auto_1fr] gap-x-6 pb-24 md:grid-cols-2 md:gap-x-16 md:pb-32">
      <span aria-hidden="true" class="absolute left-0 top-2 -translate-x-1/2 md:left-1/2">
        <span class="dot block h-3 w-3 rounded-full ring-4 ring-background"></span>
      </span>
      <article class="content col-start-2 md:col-start-1 ${left ? "md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"}">
        <div class="flex items-center gap-3 ${left ? "md:justify-end" : ""}">
          <span class="label-mono text-muted-foreground">${exp.id}</span>
          <span class="h-px w-6 bg-hairline"></span>
          <span class="label-mono text-accent">${loc(exp.period)}</span>
        </div>
        <h3 class="mt-4 font-display text-2xl font-semibold tracking-tight lg:text-3xl">${loc(exp.role)}</h3>
        <p class="mt-1 text-base">${esc(exp.company)}<span class="text-muted-foreground"> — ${loc(exp.place)}</span></p>
        <p class="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:inline-block">${loc(exp.description)}</p>
        <ul class="mt-5 flex flex-col gap-1.5 text-sm text-muted-foreground ${left ? "md:items-end" : ""}">
          ${exp.bullets
            .map(
              (b) =>
                `<li class="flex items-center gap-2"><span class="h-1 w-1 shrink-0 rounded-full bg-accent"></span>${loc(b)}</li>`,
            )
            .join("")}
        </ul>
        <ul class="mt-6 flex flex-wrap gap-2 ${left ? "md:justify-end" : ""}">
          ${exp.stack
            .map(
              (s) =>
                `<li class="label-mono border border-border bg-card px-2.5 py-1.5 text-muted-foreground">${esc(s)}</li>`,
            )
            .join("")}
        </ul>
      </article>
    </li>`;
    })
    .join("");

  return `
<section id="experience" class="relative px-6 py-28 lg:px-12 lg:py-40">
  <div class="mx-auto max-w-[1600px]">
    ${sectionHeader("02", "", "experienceSub", "TIMELINE", "experience")}
    <div id="timeline-track" class="relative mt-20 md:mt-28">
      <div aria-hidden="true" class="absolute bottom-0 left-0 top-0 w-px bg-hairline md:left-1/2">
        <div id="timeline-rail" class="h-full w-px bg-accent" style="transform:scaleY(0);transform-origin:top"></div>
      </div>
      <ol class="relative pl-8 md:pl-0">${items}</ol>
      <div aria-hidden="true" class="relative -mt-10 h-40 md:h-52">
        <div class="absolute left-0 top-0 h-16 w-px bg-hairline md:left-1/2"></div>
        <span class="branch-node absolute left-0 top-16 block h-4 w-4 rounded-full border border-accent bg-background md:left-1/2" data-reveal data-reveal-margin="0px"></span>
        <svg viewBox="0 0 800 120" preserveAspectRatio="none" class="absolute left-0 top-[4.5rem] h-24 w-full text-hairline md:left-0">
          <path id="branch-path" d="M400 0 V40 M400 40 C400 100 120 60 120 120 M400 40 C400 100 680 60 680 120 M400 40 V120" fill="none" stroke="currentColor" stroke-width="1" vector-effect="non-scaling-stroke"/>
        </svg>
      </div>
    </div>
  </div>
</section>`;
}

function stackHTML() {
  const groups = techGroups
    .map(
      (group, gi) => `
    <div class="bg-card p-7 lg:p-9 anim-rise" data-reveal data-reveal-margin="-10% 0px" style="transition-delay:${gi * 0.06}s">
      <div class="flex items-baseline justify-between">
        <h3 class="font-display text-lg font-semibold tracking-tight">${loc(group.title)}</h3>
        <span class="label-mono text-muted-foreground">${group.id}</span>
      </div>
      <ul class="mt-7 flex flex-col gap-1">
        ${group.items
          .map(
            (tech) => `
        <li data-tech="${esc(tech.name)}">
          <button type="button" aria-expanded="false" style="--brand:#${tech.hex}"
            class="tech-btn group flex w-full items-center gap-3 border-b border-border/60 py-3 text-left transition-opacity duration-300 opacity-100">
            ${tech.icon ? `<img src="${esc(tech.icon)}" alt="" aria-hidden="true" class="h-4 w-5 shrink-0 object-contain opacity-70 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"/>` : brandIcon(tech.slug, "h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:[color:var(--brand)] group-focus-visible:[color:var(--brand)]")}
            <span class="min-w-0 flex-1 truncate text-sm">${esc(tech.name)}</span>
            <span class="label-mono text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">${loc(group.title)}</span>
          </button>
          <p class="tech-note overflow-hidden py-0 text-xs leading-relaxed text-muted-foreground" style="height:0;opacity:0">${loc(tech.note)}</p>
        </li>`,
          )
          .join("")}
      </ul>
    </div>`,
    )
    .join("");

  return `
<section id="stack" class="relative px-6 py-28 lg:px-12 lg:py-40">
  <div class="mx-auto max-w-[1600px]">
    ${sectionHeader("03", "Tech Stack", "stackSub", "SYSTEM_MAP")}
    <div id="tech-grid" class="mt-16 grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">${groups}</div>
  </div>
</section>`;
}

function projectsHTML() {
  const items = projects
    .map((project, i) => {
      const reverse = i % 2 === 1;
      return `
    <article class="project-item grid items-center gap-10 border-t border-border py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
      <div class="project-visual lg:col-span-6 ${reverse ? "lg:order-2 lg:col-start-7" : ""}">
        <div class="overflow-hidden border border-border bg-card">
          <div class="flex items-center gap-2 border-b border-border px-4 py-3">
            <span class="h-2 w-2 rounded-full bg-hairline"></span>
            <span class="h-2 w-2 rounded-full bg-hairline"></span>
            <span class="h-2 w-2 rounded-full bg-hairline"></span>
            <span class="label-mono ml-3 truncate text-muted-foreground">${esc(projectHandle(project.name))}.app</span>
          </div>
          <div class="relative aspect-[16/10] w-full" style="background:${project.image ? project.imageBackground || "#effbff" : `linear-gradient(140deg, ${project.accent} 0%, #454C5E 100%)`}">
            ${project.image ? `<img src="${project.image}" alt="${esc(localValue(project.name))}" loading="lazy" width="1024" height="1024" class="absolute inset-0 h-full w-full ${project.imageClass || "object-contain p-10"}"/>` : `
            <div class="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]"></div>
            <div class="absolute inset-x-8 bottom-8 top-10 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="h-2.5 w-24 bg-white/70"></div>
                <div class="h-2 w-40 bg-white/30"></div>
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div class="h-16 bg-white/15"></div>
                <div class="h-16 bg-white/10"></div>
                <div class="h-16 bg-white/20"></div>
              </div>
            </div>`}
          </div>
        </div>
      </div>

      <div class="anim-rise-lg lg:col-span-5 ${reverse ? "lg:order-1 lg:col-start-1" : ""}" data-reveal data-reveal-margin="-20% 0px">
        <div class="flex items-center gap-3">
          <span class="font-display text-5xl font-bold text-hairline">${project.index}</span>
          <div>
            <p class="label-mono text-accent">${loc(project.category)}</p>
            <p class="label-mono mt-1 text-muted-foreground">${project.id}</p>
          </div>
        </div>
        <h3 class="display-md mt-6">${loc(project.name)}</h3>
        <p class="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">${loc(project.description)}</p>
        <p class="mt-4 max-w-md border-l border-accent pl-4 text-sm leading-relaxed">${loc(project.problem)}</p>
        <ul class="mt-6 flex flex-wrap gap-2">
          ${project.stack
            .map(
              (s) =>
                `<li class="label-mono border border-border bg-card px-2.5 py-1.5 text-muted-foreground">${esc(s)}</li>`,
            )
            .join("")}
        </ul>
        ${project.links.length ? `<div class="mt-8 flex flex-wrap gap-6">
          ${project.links
            .map(
              (l) => `<a href="${l.url}" class="group inline-flex items-center gap-2 hover:text-accent">
            <span class="label-mono link-underline">${esc(l.label)}</span>
            ${lucide.arrowUpRight("transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5")}
          </a>`,
            )
            .join("")}
        </div>` : ""}
      </div>
    </article>`;
    })
    .join("");

  return `
<section id="projects" class="relative px-6 py-28 lg:px-12 lg:py-40">
  <div class="mx-auto max-w-[1600px]">
    ${sectionHeader("04", "Selected Work", "projectsSub", "PROJECTS")}
    <div class="mt-16">${items}</div>
  </div>
</section>`;
}

function aboutHTML() {
  const details = [
    { label: "Location", value: [profile.location] },
    { label: "Work", value: [profile.work] },
    { label: "Focus", value: ["Backend", "Full Stack", "Software Engineering"] },
    { label: "Languages", value: [{ en: "Portuguese", pt: "Português" }, { en: "English (B2)", pt: "Inglês (B2)" }] },
  ];

  return `
<section id="about" class="relative px-6 py-28 lg:px-12 lg:py-40">
  <div class="mx-auto max-w-[1600px]">
    ${sectionHeader("05", "About", "aboutSub", "PROFILE")}
    <p class="display-md mt-20 max-w-3xl text-balance lg:mt-28 anim-rise-lg" data-reveal data-t="aboutStatement"></p>
    <div class="mt-16 grid gap-14 lg:grid-cols-12">
      <div class="space-y-6 text-base leading-relaxed text-muted-foreground lg:col-span-6">
        <p data-t="aboutBody1"></p>
        <p data-t="aboutBody2"></p>
      </div>
      <dl class="grid grid-cols-2 gap-8 lg:col-span-5 lg:col-start-8">
        ${details
          .map(
            (d, i) => `<div class="border-t border-hairline pt-4 anim-rise-sm" data-reveal data-reveal-margin="0px" style="transition-delay:${i * 0.08}s">
          <dt class="label-mono text-muted-foreground">${d.label}</dt>
          <dd class="mt-3 space-y-1 text-sm">${d.value.map((v) => `<p>${loc(v)}</p>`).join("")}</dd>
        </div>`,
          )
          .join("")}
      </dl>
    </div>
    <div class="mt-24 grid grid-cols-2 gap-10 border-t border-hairline pt-12 lg:grid-cols-4">
      ${highlights
        .map(
          (h) => `<div>
        <span class="counter font-display text-4xl font-bold tabular-nums lg:text-5xl" data-value="${h.value === null ? "" : h.value}" data-suffix="${h.suffix}">${h.value === null ? h.suffix : "0" + h.suffix}</span>
        <p class="label-mono mt-3 text-muted-foreground">${loc(h.label)}</p>
      </div>`,
        )
        .join("")}
    </div>
  </div>
</section>`;
}

function contactHTML() {
  return `
<section id="contact" class="relative px-6 py-28 lg:px-12 lg:py-40">
  <div class="mx-auto max-w-[1600px]">
    <div class="flex items-center gap-4">
      <span class="label-mono text-accent">06</span>
      <span class="h-px w-12 bg-hairline"></span>
      <span class="label-mono text-muted-foreground">CONTACT</span>
    </div>
    <h2 class="display-xl mt-10">
      <span id="contact-left" class="block">Let&apos;s build</span>
      <span id="contact-right" class="block text-accent">something.</span>
    </h2>
    <div class="mt-20 grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <p class="display-md max-w-lg text-muted-foreground" data-t="contactQuestion"></p>
        <a href="mailto:${profile.email}" class="group mt-10 inline-flex items-center gap-4 border-b border-foreground pb-3 transition-colors hover:border-accent hover:text-accent" data-cursor="MAIL">
          <span class="font-display text-2xl font-semibold tracking-tight lg:text-3xl" data-t="letsTalk"></span>
          ${lucide.arrowRight("transition-transform duration-300 group-hover:translate-x-2", 22, 1.75)}
        </a>
      </div>
      <ul class="grid gap-px self-start bg-border lg:col-span-5 lg:col-start-8">
        <li class="bg-background">
          <a href="mailto:${profile.email}" class="group flex items-center justify-between gap-4 py-5">
            <span class="label-mono text-muted-foreground">Email</span>
            <span class="link-underline truncate text-sm">${esc(profile.email)}</span>
          </a>
        </li>
        ${socials
          .map(
            (s) => `<li class="bg-background">
          <a href="${s.url}" target="_blank" rel="noreferrer noopener" style="--brand:#${s.hex}" class="group flex items-center justify-between gap-4 py-5">
            <span class="label-mono text-muted-foreground">${esc(s.name)}</span>
            ${brandIcon(s.slug, "h-[18px] w-[18px] text-muted-foreground transition-all duration-300 group-hover:scale-110 group-hover:[color:var(--brand)]")}
          </a>
        </li>`,
          )
          .join("")}
      </ul>
    </div>
  </div>
</section>`;
}

function footerHTML() {
  return `
<footer class="relative border-t border-border px-6 py-10 lg:px-12">
  <div class="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
    <div>
      <p class="font-display text-sm font-semibold">${esc(profile.firstName)} ${esc(profile.lastName)} © 2026</p>
      <p class="label-mono mt-3 text-muted-foreground">${esc(profile.role)}</p>
      <p class="label-mono mt-1.5 text-muted-foreground">${esc(profile.location)} — Available worldwide</p>
    </div>
    <div class="flex items-end gap-8">
      <ul class="flex gap-6">
        ${socials
          .map(
            (s) =>
              `<li><a href="${s.url}" target="_blank" rel="noreferrer noopener" class="label-mono link-underline text-muted-foreground hover:text-foreground">${esc(s.name)}</a></li>`,
          )
          .join("")}
      </ul>
      <a href="#home" class="group inline-flex items-center gap-2 hover:text-accent">
        <span class="label-mono">Back to top</span>
        ${lucide.arrowUp("transition-transform duration-300 group-hover:-translate-y-1")}
      </a>
    </div>
  </div>
</footer>`;
}

function chromeHTML() {
  const navLinks = sections
    .map(
      (s) =>
        `<li><a href="#${s.id}" data-nav="${s.id}" class="label-mono link-underline transition-colors text-muted-foreground hover:text-foreground">${loc(s.label)}</a></li>`,
    )
    .join("");

  const mobileLinks = sections
    .map(
      (s, i) =>
      `<li class="border-b border-border pb-4 anim-rise-sm" style="transition-delay:${(0.06 * i).toFixed(2)}s">
      <a href="#${s.id}" data-close-menu class="flex items-baseline gap-4">
        <span class="label-mono text-muted-foreground">${s.index}</span>
        <span class="display-md">${loc(s.label)}</span>
      </a>
    </li>`,
    )
    .join("");

  return `
<div id="loader" class="fixed inset-0 z-[90] flex flex-col justify-end bg-background px-6 pb-10 lg:px-12">
  <div class="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
    <div class="flex items-end justify-between gap-6">
      <div>
        <p class="label-mono text-muted-foreground">Loading experience</p>
        <h1 class="display-md mt-3">${esc(profile.firstName)} <span class="text-accent">${esc(profile.lastName)}</span></h1>
      </div>
      <span id="loader-num" class="font-display text-4xl tabular-nums lg:text-6xl">0</span>
    </div>
    <div class="h-px w-full bg-hairline">
      <div id="loader-bar" class="h-px bg-accent transition-[width] duration-200 ease-out" style="width:0%"></div>
    </div>
  </div>
</div>

<div aria-hidden="true" class="pointer-events-none fixed inset-0 z-0 hidden md:block">
  <div class="mx-auto flex h-full max-w-[1600px] px-6 lg:px-12">
    ${Array.from({ length: 10 })
      .map(
        (_, i) =>
          `<div class="h-full flex-1 border-l border-grid ${i === 9 ? "border-r" : ""} ${i > 5 ? "hidden lg:block" : ""}"></div>`,
      )
      .join("")}
  </div>
</div>

<div id="cursor" aria-hidden="true" class="pointer-events-none fixed z-[70] -translate-x-1/2 -translate-y-1/2 hidden">
  <div id="cursor-dot" class="flex items-center justify-center rounded-full border" style="width:12px;height:12px;background-color:transparent;border-color:var(--hairline)">
    <span id="cursor-label" class="label-mono text-[9px] text-accent-foreground"></span>
  </div>
</div>

<header id="navbar" class="fixed inset-x-0 top-0 border-b border-transparent transition-all duration-500 nav-enter" style="z-index:80;animation-fill-mode:backwards">
  <nav id="nav-inner" aria-label="Main" class="mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-6 px-6 transition-all duration-500 lg:px-12">
    <a href="#home" class="font-display text-sm font-bold tracking-tight transition-colors hover:text-accent">RM<span class="text-accent">.</span></a>
    <ul class="hidden items-center gap-8 lg:flex">${navLinks}</ul>
    <div class="flex items-center gap-4">
      <div class="label-mono flex items-center gap-2 text-muted-foreground">
        <span class="flex items-center gap-2"><button type="button" data-lang-btn="pt" class="transition-colors">PT</button></span>
        <span class="flex items-center gap-2"><span class="opacity-40">/</span><button type="button" data-lang-btn="en" class="transition-colors">EN</button></span>
      </div>
      <button type="button" id="menu-open" data-aria-localized data-en="Open menu" data-pt="Abrir menu" class="lg:hidden" aria-label="Open menu">${lucide.menu()}</button>
    </div>
  </nav>

  <div id="mobile-menu" class="fixed inset-0 hidden bg-background px-6 pb-10 pt-6 opacity-0 transition-opacity duration-300 lg:hidden" style="z-index:80">
    <div class="flex items-center justify-between">
      <span class="font-display text-sm font-bold">RM<span class="text-accent">.</span></span>
      <button type="button" id="menu-close" data-aria-localized data-en="Close menu" data-pt="Fechar menu" aria-label="Close menu">${lucide.x()}</button>
    </div>
    <ul id="mobile-links" class="mt-16 flex flex-col gap-6">${mobileLinks}</ul>
  </div>
</header>

<div aria-hidden="true" class="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
  <span id="indicator-index" class="label-mono tabular-nums">01</span>
  <div class="relative h-32 w-px bg-hairline">
    <div id="indicator-bar" class="absolute inset-0 w-px bg-accent" style="transform:scaleY(0);transform-origin:top"></div>
  </div>
  <span class="label-mono tabular-nums text-muted-foreground">${sections[sections.length - 1].index}</span>
</div>`;
}

/* ------------------------------------------------------------------ */
/* mount                                                               */
/* ------------------------------------------------------------------ */

const app = document.getElementById("app");
app.innerHTML = `
${chromeHTML()}
<main class="relative z-10">
  ${heroHTML()}
  ${experienceHTML()}
  ${stackHTML()}
  ${projectsHTML()}
  ${aboutHTML()}
  ${contactHTML()}
</main>
${footerHTML()}`;

applyLang();
observeReveal();

/* ---------------- language buttons ---------------- */
document.querySelectorAll("[data-lang-btn]").forEach((b) => {
  b.addEventListener("click", () => setLang(b.dataset.langBtn));
});

/* ---------------- loader ---------------- */
(function loader() {
  const node = document.getElementById("loader");
  const num = document.getElementById("loader-num");
  const bar = document.getElementById("loader-bar");
  let progress = 0;
  let frame = 0;
  let done = false;

  const tick = () => {
    frame += 1;
    const target = document.readyState === "complete" ? 100 : 88;
    progress = Math.min(progress + Math.max(0.6, (target - progress) * 0.08), target);
    num.textContent = String(Math.round(progress));
    bar.style.width = progress + "%";
    if (progress >= 99.4 && !done) {
      done = true;
      setTimeout(() => {
        node.style.transition = "clip-path 0.9s cubic-bezier(0.76,0,0.24,1)";
        node.style.clipPath = "inset(0 0 100% 0)";
        setTimeout(() => node.remove(), 950);
      }, 350);
      return;
    }
    if (frame < 400 && !done) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();

/* ---------------- hero entrance ---------------- */
(function heroEntrance() {
  document.querySelectorAll("[data-rise]").forEach((n) => {
    n.style.transitionDelay = `${n.dataset.rise}s`;
    requestAnimationFrame(() => n.classList.add("is-in"));
  });
  const art = document.getElementById("hero-art");
  art.style.transition = "opacity 1.2s ease 0.2s";
  requestAnimationFrame(() => (art.style.opacity = "1"));

  const photo = document.getElementById("hero-photo");
  photo.style.clipPath = "inset(100% 0 0 0)";
  photo.style.opacity = "0";
  photo.style.transition =
    "clip-path 1.1s cubic-bezier(0.22,1,0.36,1) 1.05s, opacity 1.1s cubic-bezier(0.22,1,0.36,1) 1.05s";
  requestAnimationFrame(() => {
    photo.style.clipPath = "inset(0% 0 0 0)";
    photo.style.opacity = "1";
  });

  const scroll = document.getElementById("hero-scroll");
  setTimeout(() => (scroll.style.opacity = "1"), 1400);
})();

/* ---------------- navbar ---------------- */
(function navbar() {
  const header = document.getElementById("navbar");
  const inner = document.getElementById("nav-inner");
  const menu = document.getElementById("mobile-menu");
  const openBtn = document.getElementById("menu-open");
  const closeBtn = document.getElementById("menu-close");

  const onScroll = () => {
    const scrolled = window.scrollY > 40;
    header.classList.toggle("border-border", scrolled);
    header.classList.toggle("bg-background/70", scrolled);
    header.classList.toggle("backdrop-blur-md", scrolled);
    header.classList.toggle("border-transparent", !scrolled);
    inner.classList.toggle("h-14", scrolled);
    inner.classList.toggle("h-20", !scrolled);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const open = () => {
    menu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      menu.style.opacity = "1";
      menu.querySelectorAll(".anim-rise-sm").forEach((n) => n.classList.add("is-in"));
    });
  };
  const close = () => {
    menu.style.opacity = "0";
    document.body.style.overflow = "";
    setTimeout(() => {
      menu.classList.add("hidden");
      menu.querySelectorAll(".anim-rise-sm").forEach((n) => n.classList.remove("is-in"));
    }, 300);
  };
  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  menu.querySelectorAll("[data-close-menu]").forEach((a) => a.addEventListener("click", close));
})();

/* ---------------- active section ---------------- */
(function activeSection() {
  const indicator = document.getElementById("indicator-index");
  const links = document.querySelectorAll("[data-nav]");
  let active = sections[0].id;

  const paint = () => {
    links.forEach((a) => {
      const on = a.dataset.nav === active;
      a.classList.toggle("text-accent", on);
      a.classList.toggle("text-muted-foreground", !on);
      a.classList.toggle("hover:text-foreground", !on);
      if (on) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
    const s = sections.find((x) => x.id === active) || sections[0];
    indicator.textContent = s.index;
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) {
        active = visible.target.id;
        paint();
      }
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
  );
  sections.forEach((s) => {
    const el = document.getElementById(s.id);
    if (el) io.observe(el);
  });
  paint();
})();

/* ---------------- section indicator progress ---------------- */
(function indicatorProgress() {
  const bar = document.getElementById("indicator-bar");
  let current = 0;
  onTick(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const target = max > 0 ? window.scrollY / max : 0;
    current += (target - current) * 0.12; // spring-ish
    bar.style.transform = `scaleY(${current})`;
  });
})();

/* ---------------- custom cursor ---------------- */
(function customCursor() {
  if (!isDesktop() || prefersReduced()) return;
  const wrap = document.getElementById("cursor");
  const dot = document.getElementById("cursor-dot");
  const labelEl = document.getElementById("cursor-label");
  wrap.classList.remove("hidden");

  let tx = -100;
  let ty = -100;
  let x = -100;
  let y = -100;
  let label = null;
  let hovering = false;
  let w = 12;
  let h = 12;

  dot.style.transition = "width .3s cubic-bezier(.22,1,.36,1), height .3s cubic-bezier(.22,1,.36,1), background-color .3s, border-color .3s";

  window.addEventListener(
    "pointermove",
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target.closest("[data-cursor], a, button");
      if (!target) {
        hovering = false;
        label = null;
      } else {
        hovering = true;
        label = target.dataset.cursor || null;
      }
      const size = label ? 68 : hovering ? 34 : 12;
      if (size !== w) {
        w = h = size;
        dot.style.width = size + "px";
        dot.style.height = size + "px";
      }
      dot.style.backgroundColor = label ? "var(--accent)" : "transparent";
      dot.style.borderColor = hovering ? "var(--accent)" : "var(--hairline)";
      labelEl.textContent = label || "";
    },
    { passive: true },
  );

  onTick(() => {
    x += (tx - x) * 0.35;
    y += (ty - y) * 0.35;
    wrap.style.left = x + "px";
    wrap.style.top = y + "px";
  });
})();

/* ---------------- hero parallax ---------------- */
(function heroParallax() {
  const section = document.getElementById("home");
  const text = document.getElementById("hero-text");
  const photo = document.getElementById("hero-photo");
  const art = document.getElementById("hero-art");
  const line = document.getElementById("hero-line");
  const reduced = prefersReduced();

  onTick(() => {
    const p = scrollProgress(section, "start start", "end start");
    line.style.transform = `scaleY(${p})`;
    if (reduced) return;
    photo.style.transform = `translateY(${mix(0, -14, p)}%)`;
    art.style.transform = `translateY(${mix(0, -32, p)}%)`;
    text.style.opacity = String(mix(1, 0.25, Math.min(p / 0.7, 1)));
  });
})();

/* ---------------- experience timeline ---------------- */
(function timeline() {
  const track = document.getElementById("timeline-track");
  const rail = document.getElementById("timeline-rail");
  let current = 0;
  onTick(() => {
    const target = scrollProgress(track, "start 65%", "end 65%");
    current += (target - current) * 0.09;
    rail.style.transform = `scaleY(${current})`;
  });

  document.querySelectorAll(".timeline-item").forEach((item) => {
    const content = item.querySelector(".content");
    const dot = item.querySelector(".dot");
    let passed = false;
    const ioIn = new IntersectionObserver(
      ([e]) => {
        const inView = e.isIntersecting;
        content.style.opacity = String(inView ? 1 : passed ? 0.55 : 0.28);
        dot.style.transform = `scale(${inView ? 1 : 0.55})`;
        dot.style.backgroundColor = inView || passed ? "var(--accent)" : "var(--hairline)";
      },
      { rootMargin: "-45% 0px -35% 0px" },
    );
    const ioPassed = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          passed = true;
          ioPassed.disconnect();
        }
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    ioIn.observe(item);
    ioPassed.observe(item);
  });

  const path = document.getElementById("branch-path");
  if (path) {
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        path.style.transition = "stroke-dashoffset 1.2s ease-in-out";
        path.style.strokeDashoffset = "0";
        io.disconnect();
      }
    });
    io.observe(path);
  }
})();

/* ---------------- tech stack interactions ---------------- */
(function techStack() {
  const grid = document.getElementById("tech-grid");
  const items = [...grid.querySelectorAll("[data-tech]")];
  let active = null;

  function paint() {
    items.forEach((li) => {
      const name = li.dataset.tech;
      const btn = li.querySelector(".tech-btn");
      const note = li.querySelector(".tech-note");
      const dim = active !== null && active !== name;
      btn.classList.toggle("opacity-35", dim);
      btn.classList.toggle("opacity-100", !dim);
      const on = active === name;
      btn.setAttribute("aria-expanded", String(on));
      note.style.transition = "height .3s ease, opacity .3s ease, padding .3s ease";
      note.style.height = on ? note.scrollHeight + 16 + "px" : "0px";
      note.style.opacity = on ? "1" : "0";
      note.style.paddingTop = on ? "0.5rem" : "0";
      note.style.paddingBottom = on ? "0.5rem" : "0";
    });
  }

  items.forEach((li) => {
    const btn = li.querySelector(".tech-btn");
    const name = li.dataset.tech;
    btn.addEventListener("mouseenter", () => {
      active = name;
      paint();
    });
    btn.addEventListener("focus", () => {
      active = name;
      paint();
    });
    btn.addEventListener("click", () => {
      active = active === name ? null : name;
      paint();
    });
  });
  grid.addEventListener("mouseleave", () => {
    active = null;
    paint();
  });
})();

/* ---------------- project parallax ---------------- */
(function projectParallax() {
  const reduced = prefersReduced();
  document.querySelectorAll(".project-item").forEach((item) => {
    const visual = item.querySelector(".project-visual");
    onTick(() => {
      const p = scrollProgress(item, "start end", "end start");
      if (reduced) return;
      const y = mix(6, -6, p);
      const scale = mix(0.95, 1, Math.min(p / 0.5, 1));
      visual.style.transform = `translateY(${y}%) scale(${scale})`;
    });
  });
})();

/* ---------------- counters ---------------- */
(function counters() {
  const reduced = prefersReduced();
  document.querySelectorAll(".counter").forEach((el) => {
    const raw = el.dataset.value;
    if (raw === "") return;
    const value = Number(raw);
    const suffix = el.dataset.suffix;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        if (reduced) {
          el.textContent = `${value}${suffix}`;
          return;
        }
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1200, 1);
          el.textContent = `${Math.round(value * (1 - Math.pow(1 - p, 3)))}${suffix}`;
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = `${value}${suffix}`;
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: "-20% 0px" },
    );
    io.observe(el);
  });
})();

/* ---------------- contact split text ---------------- */
(function contactSplit() {
  const section = document.getElementById("contact");
  const left = document.getElementById("contact-left");
  const right = document.getElementById("contact-right");
  const reduced = prefersReduced();
  if (reduced) return;
  onTick(() => {
    const p = scrollProgress(section, "start end", "center center");
    left.style.transform = `translateX(${mix(-16, 0, p)}%)`;
    right.style.transform = `translateX(${mix(16, 0, p)}%)`;
  });
})();

requestAnimationFrame(loop);
