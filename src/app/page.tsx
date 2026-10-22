// ─────────────────────────────────────────────────────────────────────────────
// DIRECTIVA "use client"
// Marca este archivo como Componente de Cliente (Client Component) de Next.js.
// Es necesario porque usamos hooks de React (useState, useEffect) y eventos
// del navegador (onClick, scroll, cambio de idioma).
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import {
  Download, ChevronDown, Mail, X, Play, Pause, Volume2, VolumeX,
  MapPin, CalendarCheck, GraduationCap, Award, Languages, Clapperboard, ExternalLink,
} from "lucide-react";

// Todo el texto de la web vive en src/data/ (castellano y gallego).
// Para cambiar un texto, edita esos archivos, no este.
import { cv, ui, links, galleryItems, type Lang, type GalleryItem } from "@/data/web";

// ── ICONOS DE REDES ──────────────────────────────────────────────────────────
// Lucide no incluye logotipos de marcas, así que van como SVG propios.
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Título pequeño en mayúsculas que encabeza cada sección.
function Kicker({ children }: { children: React.ReactNode }) {
  return <span className="text-xs uppercase tracking-[0.2em] text-[#2C5E43] font-semibold">{children}</span>;
}

export default function Home() {
  // ── ESTADO ─────────────────────────────────────────────────────────────────
  const [lang, setLang] = useState<Lang>("es");          // Idioma activo
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [heroMuted, setHeroMuted] = useState(true);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const [heroHovered, setHeroHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);      // Iframe de Vimeo
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vimeoPlayerRef = useRef<any>(null);               // Instancia de Vimeo.Player
  const soundStartedRef = useRef(false);                   // true cuando el vídeo ya suena con audio
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null); // Proyecto abierto en el visor

  // Atajos al contenido del idioma activo.
  const t = ui[lang];
  const d = cv[lang];

  // ── IDIOMA ─────────────────────────────────────────────────────────────────
  // Al cargar: ?lang=gl en la URL tiene prioridad (útil para enviar el enlace en
  // gallego a un cluster), luego lo que eligió el visitante la última vez.
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    let saved: string | null = null;
    try { saved = localStorage.getItem("lang"); } catch {}
    const initial = fromUrl ?? saved;
    // Solo se puede leer en el navegador, después de la hidratación.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initial === "gl" || initial === "es") setLang(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem("lang", lang); } catch {}
  }, [lang]);

  // ── SCROLL Y ANIMACIONES DE ENTRADA ────────────────────────────────────────
  useEffect(() => {
    // Valores que solo existen en el navegador (no durante el renderizado estático).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentYear(new Date().getFullYear());
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);

    // El header solo aparece al dejar atrás buena parte del vídeo, para que
    // nada tape el vídeo CV.
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      setScrolled(window.scrollY > (hero ? hero.offsetHeight * 0.6 : 20));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Los elementos con clase "reveal-entry" aparecen con una animación al entrar en pantalla.
    const revealElements = document.querySelectorAll(".reveal-entry");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // ── VÍDEO CV CON SONIDO ────────────────────────────────────────────────────
  // Los navegadores (Chrome, Safari, Firefox) NO dejan que un vídeo empiece con
  // sonido si el visitante aún no ha tocado la página. Por eso:
  //   1. El vídeo arranca solo y en silencio.
  //   2. Se intenta activar el sonido; si el navegador lo permite (p. ej. a
  //      alguien que ya visitó la web), suena directamente.
  //   3. Si no, el primer clic, toque o tecla en cualquier parte de la página
  //      activa el sonido y reinicia el vídeo desde el principio.
  const startWithSound = async () => {
    const player = vimeoPlayerRef.current;
    if (!player || soundStartedRef.current) return;
    soundStartedRef.current = true;
    try {
      await player.setCurrentTime(0);
      await player.setVolume(1);
      await player.setMuted(false);
      await player.play();
      setHeroMuted(false);
      setHeroPlaying(true);
    } catch {
      soundStartedRef.current = false; // El navegador lo bloqueó: se reintenta en el siguiente gesto
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Vimeo = (window as any).Vimeo;
      if (!iframeRef.current || !Vimeo) return;
      const player = new Vimeo.Player(iframeRef.current);
      vimeoPlayerRef.current = player;

      // Paso 2: intento de sonido automático. Si el navegador lo bloquea, el
      // vídeo se pausa o da error; entonces se vuelve a silenciar y sigue.
      player.ready().then(async () => {
        try {
          await player.setVolume(1);
          await player.setMuted(false);
          await player.play();
          if (!(await player.getPaused()) && !(await player.getMuted())) {
            soundStartedRef.current = true;
            setHeroMuted(false);
            return;
          }
        } catch {}
        await player.setMuted(true).catch(() => {});
        await player.play().catch(() => {});
      });
    };
    document.head.appendChild(script);

    // Paso 3: primer gesto del visitante en cualquier parte de la página.
    // Solo si el vídeo sigue a la vista: si el visitante ya ha bajado a leer,
    // no se le pone a sonar un vídeo que no ve.
    // (Los clics dentro del vídeo los gestiona el propio vídeo, más abajo.)
    const onFirstGesture = () => {
      const hero = document.getElementById("hero");
      if (hero && hero.getBoundingClientRect().bottom > window.innerHeight * 0.5) startWithSound();
    };
    window.addEventListener("pointerdown", onFirstGesture);
    window.addEventListener("keydown", onFirstGesture);

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
      vimeoPlayerRef.current?.destroy();
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  const toggleMute = async () => {
    const player = vimeoPlayerRef.current;
    if (!player) return;
    if (!soundStartedRef.current) return startWithSound();
    await player.setMuted(!heroMuted);
    setHeroMuted(!heroMuted);
  };

  const togglePlay = async () => {
    const player = vimeoPlayerRef.current;
    if (!player) return;
    if (heroPlaying) {
      await player.pause();
      setHeroPlaying(false);
    } else {
      await player.play();
      setHeroPlaying(true);
    }
  };

  // ── VISOR DE PROYECTOS (LIGHTBOX) ──────────────────────────────────────────
  const openLightbox = (item: GalleryItem) => {
    if (item.type !== "video") return; // Los proyectos "soon" no tienen vídeo todavía
    // Al abrir otro vídeo, se pausa el vídeo CV para que no suenen los dos.
    vimeoPlayerRef.current?.pause();
    setHeroPlaying(false);
    setLightbox(item);
  };

  const closeLightbox = () => setLightbox(null);

  // Con el visor abierto: bloquea el scroll del fondo y la tecla Escape lo cierra.
  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  // Experiencia en el orden definido en el JSON del CV.
  const experience = d.orden.map((id) => d.experiencia[id as keyof typeof d.experiencia]);

  // Selector de idioma ES/GL (se usa en el header y junto al nombre).
  const langSwitch = (
    <div role="group" aria-label={t.langLabel} className="flex rounded-full border border-[#2C5E43]/30 text-xs font-semibold overflow-hidden shrink-0">
      {(["es", "gl"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-3.5 py-2.5 lg:py-1.5 uppercase transition-colors ${
            lang === l ? "bg-[#2C5E43] text-white" : "text-[#2C5E43] hover:bg-[#2C5E43]/10"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          HEADER FIJO
          Oculto mientras se ve el vídeo; aparece al bajar con el nombre, el menú
          de secciones (solo escritorio) y el selector ES/GL.
          ════════════════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#2C5E43]/10 shadow-sm transition-all duration-500 ${
          scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-12 py-3 flex items-center justify-between gap-4">
          <a href="#hero" className="text-sm md:text-base font-bold tracking-[0.25em] uppercase text-[#2C5E43]">
            Pablo Blázquez Gil
          </a>
          <nav className="flex items-center gap-6">
            <ul className="hidden md:flex items-center gap-6 text-sm text-[#53645A]">
              <li><a href="#about" className="hover:text-[#2C5E43] transition-colors">{t.nav.about}</a></li>
              <li><a href="#experience" className="hover:text-[#2C5E43] transition-colors">{t.nav.experience}</a></li>
              <li><a href="#portfolio" className="hover:text-[#2C5E43] transition-colors">{t.nav.projects}</a></li>
              <li><a href="#contact" className="hover:text-[#2C5E43] transition-colors">{t.nav.contact}</a></li>
            </ul>
            {langSwitch}
          </nav>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════════════════════
          SECCIÓN 1: VÍDEO CV A PANTALLA COMPLETA
          Sin texto encima. En escritorio ocupa toda la pantalla; en móvil mantiene
          la proporción 16:9. Una capa invisible encima del vídeo recoge los clics
          (el iframe de Vimeo no avisa a la página cuando se pulsa dentro).
          onPointerDown con stopPropagation: los clics del vídeo los gestionan sus
          propios botones, no el "primer gesto" global de arriba.
          ════════════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative w-full h-[min(56.25vw,100svh)] lg:h-screen overflow-hidden bg-black">
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          onMouseEnter={() => setHeroHovered(true)}
          onMouseLeave={() => setHeroHovered(false)}
          onPointerDown={(e) => e.stopPropagation()}
        >
          {/* Contenedor que cubre toda la sección sin franjas negras. */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "max(100%, calc(100vh * 16 / 9))",
              height: "max(100%, calc(100vw * 9 / 16))",
              transform: "translate(-50%, -50%)",
            }}
          >
            <iframe
              ref={iframeRef}
              src="https://player.vimeo.com/video/1220785662?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1"
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Vídeo CV de Pablo Blázquez Gil"
            />
          </div>

          {/* Capa invisible: el primer clic activa el sonido desde el principio;
              los siguientes pausan o reanudan. */}
          <button
            className="absolute inset-0 w-full h-full cursor-pointer"
            onClick={() => (soundStartedRef.current ? togglePlay() : startWithSound())}
            aria-label={heroMuted ? t.unmute : heroPlaying ? t.pause : t.play}
          />

          {/* Aviso de sonido: pequeño, abajo en el centro, solo mientras está en silencio. */}
          {heroMuted && (
            <button
              onClick={startWithSound}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/55 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-medium whitespace-nowrap hover:bg-black/70 transition-colors animate-pulse"
            >
              <Volume2 className="w-4 h-4" aria-hidden="true" />{t.soundHint}
            </button>
          )}

          {/* ── Controles de vídeo ──────────────────────────────────────────────
              En táctil: siempre visibles. En escritorio: aparecen al pasar el ratón. */}
          {(() => {
            const controlsVisible = heroHovered || isTouchDevice;
            return (
              <div
                className="absolute top-3 right-3 lg:top-auto lg:bottom-4 lg:right-4 flex items-center gap-2 transition-opacity duration-300"
                style={{ opacity: controlsVisible ? 1 : 0, pointerEvents: controlsVisible ? "auto" : "none" }}
              >
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 lg:w-9 lg:h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/25 text-white hover:bg-black/70 active:scale-95 transition-all duration-200"
                  aria-label={heroPlaying ? t.pause : t.play}
                  title={heroPlaying ? t.pause : t.play}
                >
                  {heroPlaying
                    ? <Pause className="w-4 h-4 lg:w-3.5 lg:h-3.5 fill-white" />
                    : <Play className="w-4 h-4 lg:w-3.5 lg:h-3.5 fill-white ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 lg:w-9 lg:h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/25 text-white hover:bg-black/70 active:scale-95 transition-all duration-200"
                  aria-label={heroMuted ? t.unmute : t.mute}
                  title={heroMuted ? t.unmute : t.mute}
                >
                  {heroMuted
                    ? <VolumeX className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                    : <Volume2 className="w-4 h-4 lg:w-3.5 lg:h-3.5" />}
                </button>
              </div>
            );
          })()}
        </div>
      </section>

      <main className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 2: PRESENTACIÓN Y PERFIL
            Foto a la izquierda; nombre, titular, disponibilidad, botones, perfil
            y competencias clave a la derecha.
            ════════════════════════════════════════════════════════════════════ */}
        <section id="about" className="scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="md:col-span-4 flex md:block justify-center">
              <div className="relative w-40 sm:w-48 md:w-full aspect-[3/4] rounded-2xl overflow-hidden border border-[#2C5E43]/10 shadow-lg">
                <Image
                  src="https://thundershoot.com/wp-content/uploads/2025/03/Pablo-Equipo-1-scaled.jpg"
                  alt="Pablo Blázquez Gil"
                  fill
                  sizes="(max-width: 768px) 192px, 320px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.2em] font-semibold text-[#2C5E43]">{t.heroKicker}</p>
                {langSwitch}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#1E2D24] leading-[1.05]">{d.nombre}</h1>
                <p className="text-lg md:text-xl font-light text-[#284B37]">{d.titular}</p>
              </div>
              <ul className="space-y-1.5 text-sm text-[#53645A]">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#2C5E43]" aria-hidden="true" />{t.location}</li>
                <li className="flex items-start gap-2"><CalendarCheck className="w-4 h-4 shrink-0 mt-0.5 text-[#2C5E43]" aria-hidden="true" />{d.disponibilidad}</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <a
                  href={links.cvPdf[lang]}
                  download
                  className="glow-effect inline-flex items-center gap-2 px-5 py-3 bg-[#2C5E43] hover:bg-[#1F4430] text-white font-medium rounded-xl text-sm transition-colors duration-300 shadow-md"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />{t.downloadCv}
                </a>
                <a
                  href={`mailto:${links.email}`}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#D5E5DA] text-[#2C5E43] hover:border-[#2C5E43]/50 font-medium rounded-xl text-sm transition-colors duration-300"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />{t.contactCta}
                </a>
              </div>
              <p className="text-[#53645A] text-sm md:text-base font-light leading-relaxed">{d.perfil}</p>
              <blockquote className="border-l-2 border-[#2C5E43] pl-4 italic text-[#284B37] text-sm">
                “{t.quote}”
              </blockquote>
              <ul className="flex flex-wrap gap-2" aria-label={d.etiquetas.clave}>
                {d.clave.map((skill) => (
                  <li key={skill} className="px-3 py-1.5 bg-[#F4F8F5] border border-[#D5E5DA] rounded-lg text-xs text-[#284B37]">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 3: EXPERIENCIA
            Lista compacta: cada puesto muestra cargo, entidad y fechas, y se
            despliega al pulsar para ver el detalle. El primero sale abierto.
            ════════════════════════════════════════════════════════════════════ */}
        <section id="experience" className="reveal-entry space-y-6 scroll-mt-24">
          <div className="space-y-2">
            <Kicker>{t.experienceKicker}</Kicker>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1E2D24]">{d.etiquetas.experiencia}</h2>
          </div>
          <ul className="divide-y divide-[#E2ECE5] border-y border-[#E2ECE5]">
            {experience.map((job, i) => (
              <li key={job.cargo + job.fechas}>
                <details className="group py-4" open={i === 0}>
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <div>
                      <h3 className="text-base font-semibold text-[#1E2D24] group-hover:text-[#2C5E43] transition-colors">{job.cargo}</h3>
                      <p className="text-sm text-[#53645A]">{job.entidad} · {job.lugar}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-medium text-[#2C5E43] whitespace-nowrap">{job.fechas}</span>
                      <ChevronDown className="w-4 h-4 text-[#2C5E43] transition-transform group-open:rotate-180" aria-hidden="true" />
                    </div>
                  </summary>
                  <ul className="mt-3 space-y-1.5 text-sm text-[#53645A] font-light leading-relaxed list-disc pl-5 marker:text-[#2C5E43]/60">
                    {job.puntos.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 4: PROYECTOS
            Tarjetas a partir de galleryItems (src/data/web.ts). Al hacer clic en
            un vídeo se abre el visor; los proyectos "soon" se muestran sin vídeo.
            ════════════════════════════════════════════════════════════════════ */}
        <section id="portfolio" className="reveal-entry space-y-6 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div className="space-y-2">
              <Kicker>{t.projectsKicker}</Kicker>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1E2D24]">{t.projectsTitle}</h2>
            </div>
            <a
              href={links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 text-sm font-medium text-[#2C5E43] hover:text-[#1F4430] underline-offset-4 hover:underline"
            >
              {t.fullPortfolio}<ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {galleryItems.map((item) => {
              const isVideo = item.type === "video";
              const cardClass =
                "group text-left bg-white border border-[#E2ECE5] rounded-2xl overflow-hidden transition-all duration-500 shadow-sm flex flex-col";
              const body = (
                <>
                  <div className="relative aspect-video overflow-hidden bg-[#1E2D24]">
                    {isVideo ? (
                      <>
                        <video
                          src={item.src}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="w-10 h-10 rounded-full bg-[#1E2D24]/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-white ml-0.5" aria-hidden="true" />
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-white/80 bg-gradient-to-br from-[#2C5E43] to-[#1E2D24]">
                        <Clapperboard className="w-7 h-7" aria-hidden="true" />
                        <span className="text-xs uppercase tracking-[0.2em]">{t.inProgress}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-xs text-[#2C5E43] font-semibold uppercase tracking-wider">{item.category[lang]}</span>
                    <h3 className="text-sm md:text-base font-medium text-[#1E2D24] group-hover:text-[#2C5E43] transition-colors duration-300">
                      {item.title[lang]}
                    </h3>
                  </div>
                </>
              );
              return isVideo ? (
                <button
                  key={item.title.es}
                  onClick={() => openLightbox(item)}
                  aria-label={`${t.playVideo}: ${item.title[lang]}`}
                  className={`${cardClass} cursor-pointer hover:border-[#2C5E43]/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#2C5E43]`}
                >
                  {body}
                </button>
              ) : (
                <div key={item.title.es} className={cardClass} title={item.desc[lang]}>{body}</div>
              );
            })}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 5: FORMACIÓN, PREMIOS, IDIOMAS Y OTROS DATOS
            Tres columnas compactas. Las competencias técnicas y los cursos van
            plegados (están completos en el PDF).
            ════════════════════════════════════════════════════════════════════ */}
        <section className="reveal-entry space-y-6">
          <div className="space-y-2">
            <Kicker>{t.educationKicker}</Kicker>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#1E2D24]">{d.etiquetas.formacion}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E2ECE5] rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C5E43]">
                <GraduationCap className="w-4 h-4" aria-hidden="true" />{d.etiquetas.formacion}
              </h3>
              <ul className="space-y-3 text-sm">
                {d.formacion.map((f) => (
                  <li key={f.titulo}>
                    <p className="font-medium text-[#1E2D24]">{f.titulo}</p>
                    <p className="text-[#53645A]">{f.entidad} · {f.fechas}</p>
                    {"nota" in f && f.nota && <p className="text-[#2C5E43]">{f.nota}</p>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-[#E2ECE5] rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C5E43]">
                <Award className="w-4 h-4" aria-hidden="true" />{d.etiquetas.premios}
              </h3>
              <ul className="space-y-2 text-sm text-[#53645A] leading-snug list-disc pl-4 marker:text-[#2C5E43]/60">
                {d.premios.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
            <div className="bg-white border border-[#E2ECE5] rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2C5E43]">
                <Languages className="w-4 h-4" aria-hidden="true" />{d.etiquetas.idiomas}
              </h3>
              <ul className="space-y-1.5 text-sm text-[#53645A] leading-snug">
                {d.idiomas.map((i) => <li key={i}>{i}</li>)}
                {d.otros.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </div>
          </div>

          <details className="group bg-[#F4F8F5] border border-[#D5E5DA] rounded-2xl px-5 py-3">
            <summary className="flex items-center justify-between gap-4 py-2 min-h-11 cursor-pointer list-none text-sm font-medium text-[#2C5E43] [&::-webkit-details-marker]:hidden">
              {t.moreSkills}
              <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {d.competencias.map((c) => (
                <p key={c.grupo} className="text-[#53645A] font-light">
                  <strong className="font-semibold text-[#284B37]">{c.grupo}:</strong> {c.items}
                </p>
              ))}
            </div>
            <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#2C5E43]">{d.etiquetas.cursos}</h3>
            <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-sm text-[#53645A] font-light list-disc pl-4 marker:text-[#2C5E43]/60">
              {d.cursos.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </details>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 6: CONTACTO
            ════════════════════════════════════════════════════════════════════ */}
        <section id="contact" className="reveal-entry scroll-mt-24">
          <div className="border-t border-[#E2ECE5] pt-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center">
            <div className="md:col-span-7 space-y-3">
              <Kicker>{t.contactKicker}</Kicker>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D24] tracking-tight">{t.contactTitle}</h2>
              <p className="text-[#53645A] text-sm md:text-base font-light">{t.contactText}</p>
              <a href={`mailto:${links.email}`} className="inline-block py-2 text-[#2C5E43] font-medium hover:underline underline-offset-4">
                {links.email}
              </a>
            </div>
            <div className="md:col-span-5 flex flex-col md:items-end gap-4">
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${links.email}`}
                  className="w-12 h-12 inline-flex items-center justify-center bg-[#2C5E43] text-white hover:bg-[#1F4430] rounded-xl transition-all duration-300 hover:scale-105 shadow-md"
                  aria-label="Email"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                {[
                  { href: links.linkedin, label: "LinkedIn", icon: <LinkedInIcon className="w-5 h-5" /> },
                  { href: links.instagram, label: "Instagram", icon: <InstagramIcon className="w-5 h-5" /> },
                  { href: links.portfolio, label: "Portfolio", icon: <ExternalLink className="w-5 h-5" /> },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 inline-flex items-center justify-center bg-white border border-[#E2ECE5] hover:border-[#2C5E43]/40 text-[#53645A] hover:text-[#2C5E43] rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <a
                href={links.cvPdf[lang]}
                download
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-[#D5E5DA] text-[#2C5E43] hover:border-[#2C5E43]/50 font-medium rounded-xl text-sm transition-colors"
              >
                <Download className="w-4 h-4" aria-hidden="true" />{t.downloadCv}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-8 border-t border-[#E2ECE5] text-center text-xs text-[#53645A] font-light bg-[#F3EFEB]/30 mt-auto">
        <div className="max-w-5xl mx-auto px-6">
          <p>&copy; {currentYear} Pablo Blázquez Gil. {t.footer}</p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════════════════════
          LIGHTBOX (visor de proyecto)
          Clic en el fondo, en la X o tecla Escape → se cierra.
          ════════════════════════════════════════════════════════════════════════ */}
      {lightbox && (
        <div
          id="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.title[lang]}
          onClick={closeLightbox}
          className="fixed inset-0 bg-[#1E2D24]/95 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in cursor-zoom-out"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white hover:bg-[#2C5E43] hover:text-white text-[#53645A] rounded-full border border-[#E2ECE5] transition-all duration-300 z-50 cursor-pointer shadow-md"
            aria-label={t.close}
            title={t.close}
          >
            <X className="w-6 h-6" />
          </button>
          <div
            className="w-full max-w-4xl flex flex-col space-y-4 cursor-default animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            {lightbox.srcs && lightbox.srcs.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {lightbox.srcs.map((videoSrc, i) => (
                  <div key={videoSrc} className="rounded-2xl overflow-hidden bg-black border border-[#E2ECE5] shadow-2xl">
                    <video className="w-full h-full object-contain" controls autoPlay={i === 0} muted={i !== 0} playsInline>
                      <source src={videoSrc} type="video/mp4" />
                    </video>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#E2ECE5] shadow-2xl">
                <video className="w-full h-full object-contain" controls autoPlay playsInline>
                  <source src={lightbox.src} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="space-y-1.5 px-4 py-3 bg-[#FAF8F5] border border-[#E2ECE5] rounded-xl">
              <h4 className="text-lg font-medium text-[#1E2D24]">{lightbox.title[lang]}</h4>
              <p className="text-sm text-[#53645A] font-light leading-relaxed">{lightbox.desc[lang]}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
