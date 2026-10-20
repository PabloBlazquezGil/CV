// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO DE LA WEB (castellano y gallego)
// El contenido del CV (perfil, experiencia, formación, premios, idiomas…) se lee
// de cv_es.json y cv_gl.json, que son copias de los datos del generador de CVs
// (cv-base/datos/). Si cambia tu trayectoria, actualiza esos JSON y la web y los
// PDF dirán lo mismo.
// Aquí solo están los textos propios de la web: menú, botones, títulos de
// sección y la galería de proyectos.
// ─────────────────────────────────────────────────────────────────────────────
import cvEs from "./cv_es.json";
import cvGl from "./cv_gl.json";

export type Lang = "es" | "gl";

// Forma de los datos del CV (la misma en los dos idiomas).
export type CvData = typeof cvEs;

export const cv: Record<Lang, CvData> = { es: cvEs, gl: cvGl };

// ── ENLACES ──────────────────────────────────────────────────────────────────
export const links = {
  email: "pabloblazquezgil@gmail.com",
  linkedin: "https://www.linkedin.com/in/pabloblazquezgil/",
  portfolio: "https://pabloblazquezgil.vercel.app/",
  instagram: "https://www.instagram.com/pabloblazquezgil/",
  // PDF del CV en cada idioma, alojados en /public/cv/ (mismo dominio, así el
  // atributo download funciona). Sustitúyelos cuando exportes uno nuevo.
  cvPdf: {
    es: "/cv/CV_Pablo_Blazquez_Gil.pdf",
    gl: "/cv/CV_Pablo_Blazquez_Gil_GL.pdf",
  } as Record<Lang, string>,
};

// ── TEXTOS DE LA INTERFAZ ────────────────────────────────────────────────────
export const ui = {
  es: {
    nav: { about: "Perfil", experience: "Experiencia", projects: "Proyectos", contact: "Contacto" },
    heroKicker: "Bioquímico · Máster en Neurociencias",
    location: "Pontecesures (Pontevedra) · Galicia",
    contactCta: "Contactar",
    downloadCv: "Descargar CV (PDF)",
    scrollHint: "Conóceme",
    aboutKicker: "Perfil profesional",
    aboutTitle: "Ciencia contada con rigor y con imagen",
    quote: "De nada sirve el conocimiento científico si no somos capaces de que la sociedad se emocione y se conecte con él.",
    experienceKicker: "Trayectoria",
    projectsKicker: "Proyectos destacados",
    projectsTitle: "Trabajos seleccionados",
    playVideo: "Reproducir vídeo",
    inProgress: "En montaje",
    fullPortfolio: "Ver portfolio completo de foto y vídeo",
    educationKicker: "Formación y logros",
    skillsKicker: "Herramientas",
    contactKicker: "Contacto",
    contactTitle: "¿Hablamos?",
    contactText:
      "Busco proyectos de comunicación científica, divulgación, producción audiovisual o gestión de proyectos en empresas y clusters de Galicia. Escríbeme y lo hablamos.",
    soundHint: "Toca 🔊 para activar sonido",
    pause: "Pausar",
    play: "Reproducir",
    unmute: "Activar sonido",
    mute: "Silenciar",
    close: "Cerrar",
    footer: "Web CV y portafolio.",
    langLabel: "Idioma",
  },
  gl: {
    nav: { about: "Perfil", experience: "Experiencia", projects: "Proxectos", contact: "Contacto" },
    heroKicker: "Bioquímico · Mestrado en Neurociencias",
    location: "Pontecesures (Pontevedra) · Galicia",
    contactCta: "Contactar",
    downloadCv: "Descargar CV (PDF)",
    scrollHint: "Coñéceme",
    aboutKicker: "Perfil profesional",
    aboutTitle: "Ciencia contada con rigor e con imaxe",
    quote: "De nada serve o coñecemento científico se non somos capaces de que a sociedade se emocione e se conecte con el.",
    experienceKicker: "Traxectoria",
    projectsKicker: "Proxectos destacados",
    projectsTitle: "Traballos seleccionados",
    playVideo: "Reproducir vídeo",
    inProgress: "En montaxe",
    fullPortfolio: "Ver o portfolio completo de foto e vídeo",
    educationKicker: "Formación e logros",
    skillsKicker: "Ferramentas",
    contactKicker: "Contacto",
    contactTitle: "Falamos?",
    contactText:
      "Busco proxectos de comunicación científica, divulgación, produción audiovisual ou xestión de proxectos en empresas e clústeres de Galicia. Escríbeme e falámolo.",
    soundHint: "Toca 🔊 para activar o son",
    pause: "Pausar",
    play: "Reproducir",
    unmute: "Activar o son",
    mute: "Silenciar",
    close: "Pechar",
    footer: "Web CV e portafolio.",
    langLabel: "Lingua",
  },
} satisfies Record<Lang, unknown>;

// ── GALERÍA DE PROYECTOS ─────────────────────────────────────────────────────
// Para añadir un proyecto, copia un bloque y cambia los datos.
// type "video": src es un .mp4 (srcs si hay varios vídeos en el mismo proyecto).
// type "soon": proyecto sin vídeo publicado todavía (se muestra como tarjeta,
//              sin abrir el visor). Cuando tengas el tráiler, cámbialo a "video".
export interface GalleryItem {
  type: "video" | "soon";
  src?: string;
  srcs?: string[];
  title: Record<Lang, string>;
  category: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export const galleryItems: GalleryItem[] = [
  {
    type: "video",
    src: "https://thundershoot.com/wp-content/uploads/2024/11/Dia-de-la-Mujer-y-la-Nina-en-la-Ciencia-11_02_2024-Centro-de-Astrobiologia-CAB-CSIC-INTA-1.mp4",
    title: {
      es: "Día de la Mujer y la Niña en la Ciencia",
      gl: "Día da Muller e a Nena na Ciencia",
    },
    category: {
      es: "Campaña audiovisual · CAB (CSIC-INTA)",
      gl: "Campaña audiovisual · CAB (CSIC-INTA)",
    },
    desc: {
      es: "Campaña audiovisual para el Centro de Astrobiología (CSIC-INTA) por el 11 de febrero, que da visibilidad al papel de las investigadoras y tecnólogas en la astrobiología y la exploración espacial.",
      gl: "Campaña audiovisual para o Centro de Astrobioloxía (CSIC-INTA) polo 11 de febreiro, que dá visibilidade ao papel das investigadoras e tecnólogas na astrobioloxía e na exploración espacial.",
    },
  },
  {
    type: "video",
    src: "https://thundershoot.com/wp-content/uploads/2026/06/Short-Film-San-Lorenzo-1.mp4",
    srcs: [
      "https://thundershoot.com/wp-content/uploads/2026/06/Short-Film-San-Lorenzo-1.mp4",
      "https://thundershoot.com/wp-content/uploads/2026/06/SHORT-FILM-CASA-BEATNIK-1080.mp4",
    ],
    title: {
      es: "Shorts para floristería: San Lorenzo y Casa Beatnik",
      gl: "Shorts para floraría: San Lorenzo e Casa Beatnik",
    },
    category: {
      es: "Contenido para redes sociales",
      gl: "Contido para redes sociais",
    },
    desc: {
      es: "Dos vídeos para redes sociales, hechos con otro videógrafo, sobre el trabajo de una floristería en San Lorenzo y Casa Beatnik. Concepto, rodaje y edición pensados para plataformas digitales.",
      gl: "Dous vídeos para redes sociais, feitos con outro videógrafo, sobre o traballo dunha floraría en San Lorenzo e Casa Beatnik. Concepto, rodaxe e edición pensados para plataformas dixitais.",
    },
  },
  {
    type: "soon",
    title: {
      es: "Docu Galicia · episodio piloto",
      gl: "Docu Galicia · episodio piloto",
    },
    category: {
      es: "Documental · codirección y producción",
      gl: "Documental · codirección e produción",
    },
    desc: {
      es: "Episodio piloto de una serie documental sobre Galicia, rodado en 2026 junto a un realizador. Ahora en fase de montaje.",
      gl: "Episodio piloto dunha serie documental sobre Galicia, rodado en 2026 xunto a un realizador. Agora en fase de montaxe.",
    },
  },
];
