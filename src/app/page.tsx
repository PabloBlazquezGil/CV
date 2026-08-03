// ─────────────────────────────────────────────────────────────────────────────
// DIRECTIVA "use client"
// Marca este archivo como Componente de Cliente (Client Component) de Next.js.
// Es necesario porque usamos hooks de React (useState, useEffect) y eventos
// del navegador (onClick, scroll). Sin esta directiva, Next.js intentaría
// renderizar el componente en el servidor y fallaría al encontrar estos hooks.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

// ── IMPORTACIONES ────────────────────────────────────────────────────────────
// useEffect: ejecuta código después de que el componente se monta en el DOM.
// useState: guarda valores reactivos (si cambian, la página se re-renderiza).
import { useEffect, useState } from "react";

// Componente <Image> optimizado de Next.js. Sustituye a <img> normal y añade:
// lazy-loading automático, formatos modernos (WebP/AVIF) y evita layout shift.
import Image from "next/image";

// Iconos de la librería Lucide React.
// Download → icono de descarga, ChevronDown → flecha abajo, Mail → sobre, X → cerrar.
import { Download, ChevronDown, Mail, X } from "lucide-react";

// ── TIPOS TYPESCRIPT ──────────────────────────────────────────────────────────
// Define la "forma" de cada elemento de la galería de proyectos.
// Si quieres añadir más proyectos, cada uno debe tener estas propiedades.
interface GalleryItem {
  type: "image" | "video"; // Tipo de media: imagen o vídeo
  src: string;             // Ruta del archivo (relativa a /public)
  title: string;           // Título del proyecto
  desc: string;            // Descripción corta
  category: string;        // Categoría / disciplina
}

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
// Esta es la página principal (/). Todo lo que está aquí se renderiza en la ruta raíz.
export default function Home() {
  // Estado: año actual para el copyright del footer.
  // Se inicializa en 2026 y se actualiza con JavaScript en el cliente para ser siempre correcto.
  const [currentYear, setCurrentYear] = useState<number>(2026);

  // Estado: controla si el lightbox (modal de imagen ampliada) está abierto y qué muestra.
  // isOpen: si está visible | type: imagen o vídeo | src: ruta del archivo |
  // title: título del proyecto | desc: descripción del proyecto
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

  // ── EFECTO DE INICIALIZACIÓN ────────────────────────────────────────────────
  // useEffect con array vacío [] = se ejecuta UNA SOLA VEZ cuando la página carga.
  // Aquí hacemos dos cosas:
  //   1. Actualizamos el año del copyright al año real.
  //   2. Configuramos el "scroll reveal": las secciones aparecen con animación
  //      al hacer scroll y entrar en el viewport (área visible de la pantalla).
  useEffect(() => {
    // 1. Año dinámico para el footer
    setCurrentYear(new Date().getFullYear());

    // 2. Animación de scroll reveal con IntersectionObserver
    // Seleccionamos todos los elementos con clase "reveal-entry" (definida en globals.css)
    const revealElements = document.querySelectorAll(".reveal-entry");

    // IntersectionObserver detecta cuando un elemento entra en el viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Cuando el elemento es visible, añadimos la clase "active"
            // que en globals.css activa la transición de opacidad y posición.
            entry.target.classList.add("active");
            // Dejamos de observar el elemento para que la animación solo ocurra una vez.
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,      // Se activa cuando el 10% del elemento es visible
        rootMargin: "0px 0px -50px 0px", // Margen inferior: activa 50px antes del borde
      }
    );

    // Empezamos a observar cada elemento
    revealElements.forEach((el) => observer.observe(el));

    // Función de limpieza: se ejecuta cuando el componente se desmonta.
    // Evita memory leaks desconectando el observer.
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // ── DATOS DE LA GALERÍA DE PROYECTOS ────────────────────────────────────────
  // Para añadir o modificar proyectos, edita este array.
  // Cada objeto sigue la estructura GalleryItem definida arriba.
  // Las imágenes deben estar en /public/assets/ y referenciarse con "/assets/nombre.png".
  // Para añadir un vídeo propio, sube el archivo a /public/assets/ y pon type: "video".
  const galleryItems: GalleryItem[] = [
    {
      type: "image",
      src: "/assets/project-saas.png",       // Imagen en public/assets/project-saas.png
      title: "Interfaz SaaS Analítica",
      category: "UI/UX & React Frontend",
      desc: "Diseño y modelado de un panel de analíticas empresariales de alta densidad de datos, enfocado en legibilidad visual y experiencia de usuario optimizada.",
    },
    {
      type: "image",
      src: "/assets/project-mobile.png",      // Imagen en public/assets/project-mobile.png
      title: "Fintech Mobile App Design",
      category: "Mobile UI/UX Architecture",
      desc: "Estructura de interfaz minimalista para operaciones financieras móviles. Enfoque en la accesibilidad de transacciones rápidas y flujos limpios.",
    },
    {
      type: "image",
      src: "/assets/project-brand.png",       // Imagen en public/assets/project-brand.png
      title: "Identidad de Marca Conceptual",
      category: "Branding & Visual Design",
      desc: "Conceptualización de identidad gráfica y branding minimalista para empresas de tecnología. Paleta de colores orgánicos y líneas puras.",
    },
    // ── AÑADE AQUÍ MÁS PROYECTOS con el mismo formato ──
    // {
    //   type: "image",
    //   src: "/assets/mi-nuevo-proyecto.png",
    //   title: "Nombre del proyecto",
    //   category: "Categoría",
    //   desc: "Descripción del proyecto.",
    // },
  ];

  // ── FUNCIONES DEL LIGHTBOX (MODAL) ──────────────────────────────────────────
  // openLightbox: abre el modal con la información del proyecto clicado.
  // También bloquea el scroll de la página para que no se desplace mientras el modal está abierto.
  const openLightbox = (item: GalleryItem) => {
    setLightbox({
      isOpen: true,
      type: item.type,
      src: item.src,
      title: item.title,
      desc: item.desc,
    });
    document.body.style.overflow = "hidden"; // Bloquea el scroll del fondo
  };

  // closeLightbox: cierra el modal y restaura el scroll de la página.
  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    document.body.style.overflow = "unset"; // Restaura el scroll
  };

  // ── RENDERIZADO JSX ──────────────────────────────────────────────────────────
  // El return devuelve el HTML (en realidad JSX) que se muestra en pantalla.
  // El fragmento <> </> agrupa todo sin añadir un div extra al DOM.
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════════
          SECCIÓN 1: HERO
          Ocupa toda la pantalla (min-h-screen). Contiene el nombre, el vídeo
          de presentación y el indicador de scroll.
          Para cambiar el vídeo: sustituye la URL en <source src="...">
          o sube un .mp4 a /public/assets/ y usa src="/assets/mi-video.mp4".
          Para cambiar el poster (imagen mientras carga): edita el atributo poster.
          ════════════════════════════════════════════════════════════════════════ */}
      <section id="hero" className="w-full min-h-screen flex flex-col px-6 md:px-12 py-6 justify-between max-w-6xl mx-auto">

        {/* Cabecera: solo tu nombre. Actúa como el <h1> principal de la página (SEO). */}
        <header className="text-center py-4">
          <h1 className="text-xl md:text-2xl font-bold tracking-[0.3em] text-[#2C5E43] uppercase">
            Pablo Blázquez Gil
          </h1>
        </header>

        {/* Contenedor del vídeo de presentación */}
        <div className="flex-1 w-full flex items-center justify-center py-4">
          <div className="w-full h-full max-h-[75vh] aspect-video rounded-3xl overflow-hidden border border-[#2C5E43]/10 shadow-2xl shadow-[#2C5E43]/10 bg-emerald-950/20 group relative">
            <video
              className="w-full h-full object-cover"
              controls          // Muestra los controles nativos del navegador (play, pausa, volumen)
              preload="metadata" // Carga solo los metadatos al inicio (más rápido)
              poster="/assets/project-saas.png" // Imagen de portada mientras carga el vídeo
              playsInline        // IMPORTANTE: necesario en iOS para que el vídeo no abra pantalla completa
            >
              {/* 
                CAMBIA AQUÍ EL VÍDEO:
                - URL externa (Vimeo, S3, etc.): pon la URL directa al .mp4
                - Archivo local: sube tu .mp4 a /public/assets/ y escribe src="/assets/tu-video.mp4"
              */}
              <source
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054f4d823f6607bb0d1f126c929ec37&profile_id=139&oauth2_token_id=57447761"
                type="video/mp4"
              />
              Tu navegador no soporta reproducción de video.
            </video>
          </div>
        </div>

        {/* Indicador de scroll: flecha animada que invita a seguir bajando */}
        <div className="text-center py-4 flex flex-col items-center space-y-1">
          <span className="text-xs tracking-[0.2em] text-[#53645A] uppercase font-light">Presentación Profesional</span>
          <ChevronDown className="w-4 h-4 text-[#2C5E43] animate-bounce mt-1" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          CONTENEDOR PRINCIPAL del contenido debajo del hero.
          space-y-24 / space-y-36: espacio vertical entre secciones.
          Para ajustar el espacio entre secciones, cambia estos valores.
          ════════════════════════════════════════════════════════════════════════ */}
      <main className="w-full max-w-5xl mx-auto px-6 md:px-12 py-16 space-y-24 md:space-y-36">
        
        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 2: SOBRE MÍ
            Diseño de dos columnas: foto a la izquierda, texto a la derecha.
            En móvil (menos de md = 768px) se apila en una sola columna.
            "reveal-entry" activa la animación de entrada al hacer scroll.
            ════════════════════════════════════════════════════════════════════ */}
        <section id="about" className="reveal-entry grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">

          {/* ── Columna izquierda: Foto de perfil ──────────────────────────────
              md:col-span-5 = ocupa 5 de 12 columnas en pantallas medianas y grandes.
              Para cambiar la foto:
                - URL externa: pon la nueva URL aquí y añade su dominio en next.config.ts
                - Archivo local: pon la imagen en /public/assets/ y escribe src="/assets/mi-foto.jpg" */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-full md:h-auto md:aspect-square max-w-sm rounded-2xl overflow-hidden border border-[#2C5E43]/10 shadow-lg bg-white p-2 group">
              <Image
                src="https://thundershoot.com/wp-content/uploads/2025/03/Pablo-Equipo-1-scaled.jpg"
                alt="Pablo Blázquez Gil"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
                priority // priority: carga esta imagen antes que las demás (mejora el LCP/rendimiento)
              />
            </div>
          </div>

          {/* ── Columna derecha: Bio y botón de descarga ────────────────────────
              md:col-span-7 = ocupa 7 de 12 columnas (complementa las 5 de la foto).
              Aquí editas: el título, el párrafo de presentación y las etiquetas de habilidades. */}
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#2C5E43] font-semibold">Perfil Profesional</span>
              {/* Título de la sección (h2 porque h1 ya está en el header del hero) */}
              <h2 className="text-2xl md:text-3xl font-semibold text-[#1E2D24]">Trayectoria y Visión Creativa</h2>
            </div>

            {/* Párrafo de presentación: cámbialo con tu bio personal */}
            <p className="text-[#53645A] text-sm md:text-base font-light leading-relaxed">
              Diseñador y desarrollador especializado en la conceptualización de interfaces interactivas y arquitecturas frontend modulares. Mi labor se enfoca en integrar el diseño estético de alta fidelidad con la ingeniería de código eficiente y semántica, logrando soluciones digitales memorables y adaptables.
            </p>

            {/* Etiquetas de habilidades/tecnologías
                Para añadir o quitar habilidades: copia o elimina uno de estos <span>.
                NOTA: todos usan className (no class), que es la forma correcta en JSX/React. */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Diseño UI/UX</span>
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Frontend Dev</span>
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Tailwind CSS</span>
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">JavaScript ES6</span>
              <span className="px-3 py-1 bg-white border border-[#E2ECE5] rounded-full text-xs text-[#53645A]">Figma Prototyping</span>
            </div>

            {/* Botón de descarga del CV
                href: ruta al archivo PDF (en /public/assets/).
                download: nombre con el que se guardará el archivo al descargarlo.
                Para cambiar el PDF: reemplaza /assets/cv-placeholder.pdf con tu archivo real. */}
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

        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 3: GALERÍA DE PROYECTOS
            Muestra los proyectos del array galleryItems definido arriba.
            Al hacer clic en una tarjeta, se abre el lightbox (modal).
            Para añadir proyectos: edita el array galleryItems.
            grid-cols-3: 3 columnas en escritorio, 1 columna en móvil.
            ════════════════════════════════════════════════════════════════════ */}
        <section id="portfolio" className="reveal-entry space-y-12">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2C5E43] font-semibold">Proyectos Destacados</span>
            <h2 className="text-2xl md:text-4xl font-semibold text-[#1E2D24]">Trabajos Seleccionados</h2>
          </div>

          {/* Grid de tarjetas de proyectos
              galleryItems.map() recorre el array y crea una tarjeta por cada elemento.
              key={index}: identificador único que React necesita para optimizar el renderizado. */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                onClick={() => openLightbox(item)} // Al hacer clic, abre el lightbox con este proyecto
                className="group cursor-pointer bg-white border border-[#E2ECE5] rounded-2xl overflow-hidden hover:border-[#2C5E43]/40 transition-all duration-500 shadow-sm hover:shadow-md"
              >
                {/* Imagen del proyecto con overlay de hover */}
                <div className="relative aspect-video overflow-hidden bg-stone-100">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={480}
                    height={270}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay oscuro con texto que aparece al pasar el ratón por encima */}
                  <div className="absolute inset-0 bg-[#1E2D24]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-xs text-white border border-white/20 transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                      Ver Detalles
                    </span>
                  </div>
                </div>
                {/* Texto debajo de la imagen: categoría y título */}
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

        {/* ════════════════════════════════════════════════════════════════════
            SECCIÓN 4: CONTACTO Y REDES SOCIALES
            Para editar los enlaces sociales: cambia el atributo href="..." de cada <a>.
            Para cambiar el email: edita href="mailto:tu@email.com".
            ════════════════════════════════════════════════════════════════════ */}
        <section id="contact" className="reveal-entry space-y-12">
          <div className="border-t border-[#E2ECE5] pt-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">

              {/* ── Columna izquierda: Texto de contacto ───────────────────────
                  Cambia el título y el párrafo con tu mensaje de contacto personal. */}
              <div className="md:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-[#2C5E43] font-semibold">Contacto</span>
                <h2 className="text-2xl md:text-4xl font-bold text-[#1E2D24] tracking-tight">Colaboraciones y Consultoría</h2>
                <p className="text-[#53645A] text-sm md:text-base font-light">
                  Si deseas conocer más detalles de mi trayectoria, coordinar una reunión o discutir una futura colaboración profesional, ponte en contacto directo.
                </p>
              </div>

              {/* ── Columna derecha: Iconos de redes sociales ──────────────────
                  Cada <a> es un botón de red social.
                  Para añadir una red nueva: copia uno de los bloques <a>...</a>
                  y actualiza href, title y el SVG interior. */}
              <div className="md:col-span-5 flex flex-col md:items-end space-y-4">
                <div className="flex flex-wrap gap-3">

                  {/* LINKEDIN: cambia href con tu URL de LinkedIn personal */}
                  <a
                    href="https://linkedin.com"
                    target="_blank"          // Abre en nueva pestaña
                    rel="noopener noreferrer" // Seguridad: evita que la pestaña nueva acceda al origen
                    className="w-12 h-12 inline-flex items-center justify-center bg-white border border-[#E2ECE5] hover:border-[#2C5E43]/40 text-[#53645A] hover:text-[#2C5E43] rounded-xl transition-all duration-300 hover:scale-105 shadow-sm"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* INSTAGRAM: cambia href con tu URL de Instagram personal */}
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

                  {/* YOUTUBE: cambia href con tu canal de YouTube */}
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

                  {/* EMAIL: cambia la dirección después de mailto: */}
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

      {/* ════════════════════════════════════════════════════════════════════════
          PIE DE PÁGINA (Footer)
          {currentYear} se reemplaza automáticamente con el año actual.
          Edita el texto para personalizar el aviso de copyright.
          ════════════════════════════════════════════════════════════════════════ */}
      <footer className="w-full py-8 border-t border-[#E2ECE5] text-center text-xs text-[#53645A] font-light bg-[#F3EFEB]/30 mt-auto">
        <div className="max-w-5xl mx-auto px-6">
          <p>&copy; {currentYear} Pablo Blázquez Gil. Presentación de perfil profesional y portafolio.</p>
        </div>
      </footer>

      {/* ════════════════════════════════════════════════════════════════════════
          LIGHTBOX (Modal de proyecto ampliado)
          Solo se renderiza cuando lightbox.isOpen es true.
          Al hacer clic en el fondo oscuro (div exterior), se cierra.
          Al hacer clic en el contenido (div interior), e.stopPropagation()
          evita que el clic "burbujee" y cierre el modal accidentalmente.
          ════════════════════════════════════════════════════════════════════════ */}
      {lightbox.isOpen && (
        <div
          id="lightbox"
          onClick={closeLightbox}    // Clic en el fondo oscuro → cierra el modal
          className="fixed inset-0 bg-[#1E2D24]/95 z-50 flex items-center justify-center p-4 md:p-8 animate-fade-in cursor-zoom-out"
        >
          {/* Botón X para cerrar en la esquina superior derecha */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white hover:bg-[#2C5E43] hover:text-white text-[#53645A] rounded-full border border-[#E2ECE5] transition-all duration-300 z-50 cursor-pointer shadow-md"
            title="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Contenedor del contenido del modal */}
          <div
            className="w-full max-w-4xl flex flex-col space-y-4 cursor-default animate-zoom-in"
            onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al clicar en el contenido
          >
            {/* Imagen o vídeo del proyecto ampliado */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white border border-[#E2ECE5] shadow-2xl">
              {lightbox.type === "image" ? (
                // fill: la imagen ocupa todo el contenedor padre (que tiene position: relative)
                <Image
                  src={lightbox.src}
                  alt={lightbox.title}
                  fill
                  className="object-contain"
                />
              ) : (
                // Para vídeos: se reproduce automáticamente al abrir el lightbox
                <video className="w-full h-full object-contain" controls autoPlay>
                  <source src={lightbox.src} type="video/mp4" />
                  Tu navegador no soporta la reproducción de video.
                </video>
              )}
            </div>

            {/* Ficha informativa del proyecto: título y descripción */}
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
