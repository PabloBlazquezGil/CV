"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Download, ChevronDown, Mail, X } from "lucide-react";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  title: string;
  desc: string;
  category: string;
}

export default function Home() {
  const [currentYear, setCurrentYear] = useState<number>(2026);
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    type: "image" | "video";
    src: string;
    title: string;
    desc: string;
  }>({
    isOpen: false,
    type: "image",
    src: "",
    title: "",
    desc: "",
  });

  // Track scroll reveal elements
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const revealElements = document.querySelectorAll(".reveal-entry");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const galleryItems: GalleryItem[] = [
    {
      type: "image",
      src: "/assets/project-saas.png",
      title: "Interfaz SaaS Analítica",
      category: "UI/UX & React Frontend",
      desc: "Diseño y modelado de un panel de analíticas empresariales de alta densidad de datos, enfocado en legibilidad visual y experiencia de usuario optimizada.",
    },
    {
      type: "image",
      src: "/assets/project-mobile.png",
      title: "Fintech Mobile App Design",
      category: "Mobile UI/UX Architecture",
      desc: "Estructura de interfaz minimalista para operaciones financieras móviles. Enfoque en la accesibilidad de transacciones rápidas y flujos limpios.",
    },
    {
      type: "image",
      src: "/assets/project-brand.png",
      title: "Identidad de Marca Conceptual",
      category: "Branding & Visual Design",
      desc: "Conceptualización de identidad gráfica y branding minimalista para empresas de tecnología. Paleta de colores orgánicos y líneas puras.",
    },
  ];

  const openLightbox = (item: GalleryItem) => {
    setLightbox({
      isOpen: true,
      type: item.type,
      src: item.src,
      title: item.title,
      desc: item.desc,
    });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "unset";
  };

  return (
    <>
      {/* SECCIÓN 1: HERO (Immersive Video CV covering first screen) */}
      <section id="hero" className="w-full min-h-screen flex flex-col px-6 md:px-12 py-6 justify-between max-w-6xl mx-auto">
        {/* Header title (The only text on the first screen) */}
        <header className="text-center py-4">
          <h1 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-[#2C5E43] uppercase">
            Pablo Blázquez Gil
          </h1>
        </header>

        {/* Full-screen video container */}
        <div className="flex-1 w-full flex items-center justify-center py-4">
          <div className="w-full h-full max-h-[75vh] aspect-video rounded-3xl overflow-hidden border border-[#2C5E43]/10 shadow-2xl shadow-[#2C5E43]/10 bg-emerald-950/20 group relative">
            <video
              className="w-full h-full object-cover"
              controls
              preload="metadata"
              poster="/assets/project-saas.png"
              playsinline="true"
            >
              <source
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d823f6607bb0d1f126c929ec37&profile_id=139&oauth2_token_id=57447761"
                type="video/mp4"
              />
              Tu navegador no soporta reproducción de video.
            </video>
          </div>
        </div>

        {/* Minimal scroll indicator */}
        <div className="text-center py-4 flex flex-col items-center space-y-1">
          <span className="text-xs tracking-[0.2em] text-[#53645A] uppercase font-light">Presentación Profesional</span>
          <ChevronDown className="w-4 h-4 text-[#2C5E43] animate-bounce mt-1" />
        </div>
      </section>

      {/* Main Content Container for subsequent sections */}
      <main className="w-full max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-24 md:space-y-36">
        
        {/* SECCIÓN 2: SOBRE MÍ (About Me / Presentation) */}
        <section id="about" className="reveal-entry grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Columna Izquierda: Foto de perfil profesional */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-full md:h-auto md:aspect-square max-w-sm rounded-2xl overflow-hidden border border-[#2C5E43]/10 shadow-lg bg-white p-2 group">
              <Image
                src="/assets/profile.png"
                alt="Pablo Blázquez Gil"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Columna Derecha: Bio & CTA */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2C5E43] font-semibold">Perfil Profesional</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1E2D24]">Trayectoria y Visión Creativa</h2>
            </div>

            <p className="text-[#53645A] text-sm md:text-base font-light leading-relaxed">
              Diseñador y desarrollador especializado en la conceptualización de interfaces interactivas y arquitecturas frontend modulares. Mi labor se enfoca en integrar el diseño estético de alta fidelidad con la ingeniería de código eficiente y semántica, logrando soluciones digitales memorables y adaptables.
            </p>

            {/* Tech/Skills Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Diseño UI/UX</span>
              <span class="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Frontend Dev</span>
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Tailwind CSS</span>
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">JavaScript ES6</span>
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Figma Prototyping</span>
            </div>

            {/* CTA Download CV Button */}
            <div className="pt-4">
              <a
                href="/assets/cv-placeholder.pdf"
                download="CV_Pablo_Blazquez.pdf"
                className="glow-effect inline-flex items-center space-x-3 px-6 py-3.5 bg-[#2C5E43] hover:bg-[#1F4430] text-white font-medium rounded-xl text-sm transition-all duration-300 shadow-md shadow-[#2C5E43]/10 hover:shadow-[#2C5E43]/20"
              >
                <Download className="w-4 h-4" />
                <span>Descargar CV Completo (PDF)</span>
              </a>
            </div>
          </div>
        </section>

        {/* SECCIÓN 3: GALERÍA DE PROYECTOS (Portfolio) */}
        <section id="portfolio" className="reveal-entry space-y-12">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2C5E43] font-semibold">Proyectos Destacados</span>
            <h2 className="text-2xl md:text-4xl font-semibold text-[#1E2D24]">Trabajos Seleccionados</h2>
          </div>

          {/* Grid de Proyectos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => openLightbox(item)}
                className="group cursor-pointer bg-white border border-[#E2ECE5] rounded-2xl overflow-hidden hover:border-[#2C5E43]/40 transition-all duration-500 shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={480}
                    height={270}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1E2D24]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border border-white/20 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                      Ver Detalles
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-xs text-[#2C5E43] font-semibold uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-lg font-medium text-[#1E2D24] group-hover:text-[#2C5E43] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECCIÓN 4: CONTACTO Y REDES SOCIALES */}
        <section id="contact" className="reveal-entry space-y-12">
          <div className="border-t border-[#E2ECE5] pt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              {/* Mensaje Directo */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#2C5E43] font-semibold">Contacto</span>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1E2D24] tracking-tight">Colaboraciones y Consultoría</h2>
                <p className="text-[#53645A] text-sm md:text-base font-light">
                  Si deseas conocer más detalles de mi trayectoria, coordinar una reunión o discutir una futura colaboración profesional, ponte en contacto directo.
                </p>
              </div>

              {/* Redes Sociales Grid */}
              <div className="md:col-span-5 flex flex-col md:items-end space-y-4">
                <div className="flex flex-wrap gap-3">
                  {/* LinkedIn SVG */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 inline-flex items-center justify-center bg-white border border-[#E2ECE5] hover:border-[#2C5E43]/40 text-[#53645A] hover:text-[#2C5E43] rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* Instagram SVG */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 inline-flex items-center justify-center bg-white border border-[#E2ECE5] hover:border-[#2C5E43]/40 text-[#53645A] hover:text-[#2C5E43] rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
                    title="Instagram"
                  >
                    <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>

                  {/* YouTube SVG */}
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 inline-flex items-center justify-center bg-white border border-[#E2ECE5] hover:border-[#2C5E43]/40 text-[#53645A] hover:text-[#2C5E43] rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
                    title="YouTube"
                  >
                    <svg className="w-5 h-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                    </svg>
                  </a>

                  {/* Correo electrónico */}
                  <a
                    href="mailto:pablo@ejemplo.com"
                    className="w-12 h-12 inline-flex items-center justify-center bg-[#2C5E43] text-white hover:bg-[#1F4430] rounded-xl transition-all duration-300 hover:scale-105 shadow-md shadow-[#2C5E43]/10 hover:shadow-[#2C5E43]/20"
                    title="Enviar Correo"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* PIE DE PÁGINA (Footer) */}
      <footer className="w-full py-8 border-t border-[#E2ECE5] text-center text-xs text-[#53645A] font-light bg-[#F3EFEB]/30 mt-auto">
        <div className="max-w-5xl mx-auto px-6">
          <p>&copy; {currentYear} Pablo Blázquez Gil. Presentación de perfil profesional y portafolio.</p>
        </div>
      </footer>

      {/* LIGHTBOX / MODAL FLUIDO */}
      {lightbox.isOpen && (
        <div
          id="lightbox"
          onClick={closeLightbox}
          className="fixed inset-0 bg-[#1E2D24]/95 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in cursor-zoom-out"
        >
          {/* Botón Cerrar */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white hover:bg-[#2C5E43] hover:text-white text-[#53645A] rounded-full border border-[#E2ECE5] transition-all duration-300 z-50 cursor-pointer shadow-md"
            title="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Contenedor Central */}
          <div
            className="w-full max-w-4xl flex flex-col space-y-4 cursor-default animate-zoom-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white border border-[#E2ECE5] shadow-2xl">
              {lightbox.type === "image" ? (
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                />
              ) : (
                <video className="w-full h-full object-contain" controls autoPlay>
                  <source src={lightbox.src} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              )}
            </div>

            {/* Metadatos del proyecto en el Lightbox */}
            <div className="space-y-1.5 px-4 py-3 bg-[#FAF8F5] border border-[#E2ECE5] rounded-xl">
              <h4 className="text-lg font-medium text-[#1E2D24]">{lightbox.title}</h4>
              <p className="text-sm text-[#53645A] font-light leading-relaxed">{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
