// ─────────────────────────────────────────────────────────────────────────────
// SCRIPT DEL NAVEGADOR - main.ts
// Todo lo interactivo de la web, sin frameworks:
//   1. Idioma ES/GL
//   2. Header que aparece al bajar + animaciones de entrada al hacer scroll
//   3. Vídeo CV de Vimeo (con sonido si el navegador lo permite)
//   4. Visor de proyectos (lightbox)
// ─────────────────────────────────────────────────────────────────────────────
type Lang = "es" | "gl";
type UiText = { soundHint: string; pause: string; play: string; unmute: string; mute: string; close: string };
type GalleryItem = {
  type: "video" | "soon";
  src?: string;
  srcs?: string[];
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
};

const data = JSON.parse(document.getElementById("client-data")!.textContent!) as {
  ui: Record<Lang, UiText>;
  gallery: GalleryItem[];
};
const root = document.documentElement;
const $ = <T extends HTMLElement>(sel: string) => document.querySelector<T>(sel)!;

const hero = $("#hero");
const heroLayer = $("#hero-layer");
const heroHint = $("#hero-hint");
const heroPlayBtn = $("#hero-play");
const heroMuteBtn = $("#hero-mute");
const lightbox = $("#lightbox");

// ── 1. IDIOMA ────────────────────────────────────────────────────────────────
// El idioma inicial ya lo fijó el script del <head> (?lang=gl o el último
// elegido). Aquí se actualizan los textos que no están en los dos bloques.
let lang: Lang = root.dataset.lang === "gl" ? "gl" : "es";

function heroLabels() {
  const t = data.ui[lang];
  const playing = hero.hasAttribute("data-playing");
  const muted = hero.hasAttribute("data-muted");
  heroLayer.setAttribute("aria-label", muted ? t.unmute : playing ? t.pause : t.play);
  heroPlayBtn.setAttribute("aria-label", playing ? t.pause : t.play);
  heroPlayBtn.title = playing ? t.pause : t.play;
  heroMuteBtn.setAttribute("aria-label", muted ? t.unmute : t.mute);
  heroMuteBtn.title = muted ? t.unmute : t.mute;
}

function applyLang(l: Lang) {
  lang = l;
  root.lang = l;
  root.dataset.lang = l;
  try { localStorage.setItem("lang", l); } catch {}
  document.querySelectorAll<HTMLElement>("[data-set-lang]").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.setLang === l));
  });
  const t = data.ui[l];
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    el.textContent = t[el.dataset.i18n as keyof UiText];
  });
  const closeBtn = $("#lightbox-close");
  closeBtn.setAttribute("aria-label", t.close);
  closeBtn.title = t.close;
  heroLabels();
  if (currentItem) fillLightbox(currentItem);
}

document.querySelectorAll<HTMLElement>("[data-set-lang]").forEach((b) => {
  b.addEventListener("click", () => applyLang(b.dataset.setLang as Lang));
});

// ── 2. HEADER Y ANIMACIONES DE SCROLL ────────────────────────────────────────
// Dispositivos táctiles: los controles del vídeo se ven siempre (ver global.css).
if ("ontouchstart" in window || navigator.maxTouchPoints > 0) root.dataset.touch = "";

document.querySelectorAll<HTMLElement>("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

// El header solo aparece al dejar atrás buena parte del vídeo, para que nada
// tape el vídeo CV.
const headers = document.querySelectorAll<HTMLElement>("[data-header]");
const onScroll = () => {
  const on = window.scrollY > hero.offsetHeight * 0.6;
  headers.forEach((h) => h.toggleAttribute("data-scrolled", on));
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Los elementos con clase "reveal-entry" aparecen con una animación al entrar en pantalla.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);
document.querySelectorAll(".reveal-entry").forEach((el) => observer.observe(el));

// ── 3. VÍDEO CV CON SONIDO ───────────────────────────────────────────────────
// Los navegadores NO dejan que un vídeo empiece con sonido si el visitante aún
// no ha tocado la página. Por eso:
//   1. El vídeo arranca solo y en silencio.
//   2. Se intenta activar el sonido; si el navegador lo permite, suena directamente.
//   3. Si no, el primer clic, toque o tecla en la página activa el sonido y
//      reinicia el vídeo desde el principio.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let player: any = null;
let soundStarted = false;

function setHeroState(playing: boolean, muted: boolean) {
  hero.toggleAttribute("data-playing", playing);
  hero.toggleAttribute("data-muted", muted);
  heroLabels();
}
const heroPlaying = () => hero.hasAttribute("data-playing");
const heroMuted = () => hero.hasAttribute("data-muted");

async function startWithSound() {
  if (!player || soundStarted) return;
  soundStarted = true;
  try {
    await player.setCurrentTime(0);
    await player.setVolume(1);
    await player.setMuted(false);
    await player.play();
    setHeroState(true, false);
  } catch {
    soundStarted = false; // El navegador lo bloqueó: se reintenta en el siguiente gesto
  }
}

async function togglePlay() {
  if (!player) return;
  if (heroPlaying()) {
    await player.pause();
    setHeroState(false, heroMuted());
  } else {
    await player.play();
    setHeroState(true, heroMuted());
  }
}

async function toggleMute() {
  if (!player) return;
  if (!soundStarted) return startWithSound();
  const muted = heroMuted();
  await player.setMuted(!muted);
  setHeroState(heroPlaying(), !muted);
}

const vimeoScript = document.createElement("script");
vimeoScript.src = "https://player.vimeo.com/api/player.js";
vimeoScript.async = true;
vimeoScript.onload = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Vimeo = (window as any).Vimeo;
  const iframe = document.getElementById("hero-iframe");
  if (!iframe || !Vimeo) return;
  player = new Vimeo.Player(iframe);

  // Paso 2: intento de sonido automático. Si el navegador lo bloquea, el vídeo
  // se pausa o da error; entonces se vuelve a silenciar y sigue.
  player.ready().then(async () => {
    try {
      await player.setVolume(1);
      await player.setMuted(false);
      await player.play();
      if (!(await player.getPaused()) && !(await player.getMuted())) {
        soundStarted = true;
        setHeroState(true, false);
        return;
      }
    } catch {}
    await player.setMuted(true).catch(() => {});
    await player.play().catch(() => {});
  });
};
document.head.appendChild(vimeoScript);

// Paso 3: primer gesto del visitante en cualquier parte de la página. Solo si
// el vídeo sigue a la vista: si ya ha bajado a leer, no se le pone a sonar un
// vídeo que no ve. (Los clics dentro del vídeo los gestionan sus propios botones.)
const onFirstGesture = () => {
  if (hero.getBoundingClientRect().bottom > window.innerHeight * 0.5) startWithSound();
};
window.addEventListener("pointerdown", onFirstGesture);
window.addEventListener("keydown", onFirstGesture);
$("#hero-inner").addEventListener("pointerdown", (e) => e.stopPropagation());

// Capa invisible: el primer clic activa el sonido; los siguientes pausan o reanudan.
heroLayer.addEventListener("click", () => (soundStarted ? togglePlay() : startWithSound()));
heroHint.addEventListener("click", startWithSound);
heroPlayBtn.addEventListener("click", togglePlay);
heroMuteBtn.addEventListener("click", toggleMute);

// ── 4. VISOR DE PROYECTOS (LIGHTBOX) ─────────────────────────────────────────
let currentItem: GalleryItem | null = null;
const videosBox = $("#lightbox-videos");

function fillLightbox(item: GalleryItem) {
  lightbox.setAttribute("aria-label", item.title[lang]);
  $("#lightbox-title").textContent = item.title[lang];
  $("#lightbox-desc").textContent = item.desc[lang];
}

function makeVideo(src: string, autoplay: boolean, muted: boolean, className: string) {
  const v = document.createElement("video");
  v.className = className;
  v.controls = true;
  v.autoplay = autoplay;
  v.muted = muted;
  v.playsInline = true;
  v.setAttribute("referrerpolicy", "no-referrer"); // evita que el hosting de los vídeos bloquee por referer
  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";
  v.appendChild(source);
  return v;
}

function openLightbox(item: GalleryItem) {
  if (item.type !== "video") return;
  // Al abrir otro vídeo, se pausa el vídeo CV para que no suenen los dos.
  player?.pause();
  setHeroState(false, heroMuted());

  videosBox.replaceChildren();
  if (item.srcs && item.srcs.length > 1) {
    videosBox.className = "grid grid-cols-1 md:grid-cols-2 gap-4 w-full";
    item.srcs.forEach((s, i) => {
      const wrap = document.createElement("div");
      wrap.className = "rounded-2xl overflow-hidden bg-black border border-[#E2ECE5] shadow-2xl";
      wrap.appendChild(makeVideo(s, i === 0, i !== 0, "w-full h-full object-contain"));
      videosBox.appendChild(wrap);
    });
  } else {
    videosBox.className = "relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#E2ECE5] shadow-2xl";
    videosBox.appendChild(makeVideo(item.src!, true, false, "w-full h-full object-contain"));
  }
  currentItem = item;
  fillLightbox(item);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden"; // bloquea el scroll del fondo
}

function closeLightbox() {
  currentItem = null;
  lightbox.hidden = true;
  videosBox.replaceChildren(); // para el vídeo y libera el reproductor
  document.body.style.overflow = "";
}

document.querySelectorAll<HTMLElement>("[data-gallery]").forEach((card) => {
  card.addEventListener("click", () => openLightbox(data.gallery[Number(card.dataset.gallery)]));
});
lightbox.addEventListener("click", closeLightbox);
$("#lightbox-body").addEventListener("click", (e) => e.stopPropagation());
$("#lightbox-close").addEventListener("click", closeLightbox);
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && currentItem) closeLightbox();
});

// Estado inicial de los textos según el idioma con el que arrancó la página.
applyLang(lang);
