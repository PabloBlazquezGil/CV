import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export const name = "Pablo Blázquez Gil";
export const title = "Comunicador y Divulgador Científico";
export const summary = "Comunicador y divulgador científico con sólida formación en Bioquímica y Neurociencia. Especializado en conectar la ciencia con la sociedad mediante contenidos creativos, formatos audiovisuales y experiencias interactivas. Mi pasión es la innovación educativa y la narrativa científica, usando pensamiento crítico, empatía y creatividad para generar impacto. Domino herramientas de diseño, vídeo y comunicación digital, y tengo experiencia en la coordinación de proyectos con centros de investigación y entidades públicas. Me caracterizo por mi capacidad de aprendizaje rápido y mi habilidad para transformar ideas complejas en mensajes accesibles.";

export const experience = [
  {
    category: "Divulgación y Comunicación",
    items: [
      {
        company: "VermisLAB",
        role: "Divulgador Científico",
        period: "07/2025 – 01/2026",
        description: "Creación de experiencias para traducir conceptos científicos al lenguaje social. Diseño de actividades interactivas para despertar curiosidad STEAM. Dinamización de grupos y promoción del pensamiento crítico. Coordinación de proyectos educativos para fomentar vocaciones científicas.",
      },
      {
        company: "ANOVAciencia",
        role: "Divulgador Científico",
        period: "2023 – 12/2025",
        description: "Diseño y ejecución de vídeos de divulgación para público general. Creación de contenidos para redes sociales especializadas en ciencia y tecnología.",
      },
      {
        company: "Centro de Astrobiología",
        role: "Comunicador Científico",
        period: "03/2023 – 03/2025",
        description: "Implementación de estrategias de comunicación y producción audiovisual corporativa. Coordinación de campañas de SEO y narrativa estratégica en medios digitales. Organización de eventos institucionales e internacionales con adaptación de mensajes.",
      },
    ]
  },
  {
    category: "Investigación",
    items: [
       {
        company: "Grupo BioFarma (Neurociencia)",
        role: "Investigador Científico",
        period: "09/2020 – 06/2021",
        description: "Ejecución de proyectos de investigación en Bioquímica y Neurociencia. Elaboración de informes técnicos y comunicaciones para congresos y publicaciones.",
      },
      {
        company: "Universidad de Extremadura (Microbiología)",
        role: "Investigador Científico",
        period: "03/2019 – 06/2020",
        description: "Ejecución de proyectos de investigación en Bioquímica y Neurociencia. Elaboración de informes técnicos y comunicaciones para congresos y publicaciones.",
      },
    ]
  }
];

export const education = [
  {
    institution: "Universidad de Santiago de Compostela",
    degree: "Máster en Neurociencia",
    period: "2020 – 2021",
  },
  {
    institution: "Universidad de Extremadura",
    degree: "Grado en Bioquímica",
    period: "2016 – 2020",
  },
];

export const complementaryEducation = [
    {
        title: "Tecnología y Emprendimiento",
        details: "Santander X Explorer (2024) y LocalCreativeJam (2025)",
    },
    {
        title: "Drones",
        details: "Licencia de piloto A1/A2/A3 y STS (2024)",
    },
    {
        title: "Audiovisual",
        details: "Realización de documentales (Domestika), Photoshop (RBG Escuela)",
    },
    {
        title: "Digital",
        details: "Creación de páginas web (210h), Community Management y gestión de blogs",
    }
]

export const skills = {
  technical: [
    "Adobe Premiere Pro", "Adobe After Effects", "Adobe Lightroom", "Adobe Photoshop",
    "DaVinci Resolve", "Blender", "Canva", "SEO", "Comunicación Digital"
  ],
  personal: [
    "Creatividad Aplicada", "Aprendizaje Autónomo", "Empatía", "Comunicación Efectiva", "Adaptabilidad", "Pensamiento Crítico"
  ],
  languages: [
      { lang: "Castellano", level: "Lengua materna" },
      { lang: "Inglés", level: "Nivel B2-C1" },
      { lang: "Gallego", level: "Nivel B1" },
  ]
};

export type Project = {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  link: string;
  image: ImagePlaceholder;
}

const projectImages = {
  p1: PlaceHolderImages.find(img => img.id === 'project-1')!,
  p2: PlaceHolderImages.find(img => img.id === 'project-2')!,
  p3: PlaceHolderImages.find(img => img.id === 'project-3')!,
}

export const portfolioProjects: Project[] = [
  {
    title: "Proyecto de Divulgación",
    description: "Campaña de comunicación para un centro de investigación.",
    longDescription: "Diseño e implementación de una campaña integral de comunicación para el Centro de Astrobiología, incluyendo producción de videos, gestión de redes sociales y organización de eventos para aumentar la visibilidad y el impacto de la investigación.",
    technologies: ["Producción Audiovisual", "SEO", "Redes Sociales", "Comunicación Estratégica"],
    link: "#",
    image: projectImages.p1,
  },
  {
    title: "Canal de YouTube Científico",
    description: "Creación y gestión de un canal de divulgación científica.",
    longDescription: "Desarrollo de un canal de YouTube desde cero, enfocado en explicar conceptos complejos de neurociencia y bioquímica de manera accesible y entretenida para el público general. Responsable del guion, grabación, edición y promoción de los videos.",
    technologies: ["Adobe Premiere", "After Effects", "Blender", "YouTube", "SEO"],
    link: "#",
    image: projectImages.p2,
  },
  {
    title: "Talleres STEAM",
    description: "Diseño de talleres interactivos de ciencia para jóvenes.",
    longDescription: "Creación de un programa de talleres prácticos para VermisLAB, diseñados para fomentar el interés por la ciencia y la tecnología en estudiantes de secundaria. Las actividades cubren temas desde la microbiología hasta la astrofísica, utilizando materiales de bajo coste.",
    technologies: ["Diseño Instruccional", "Gamificación", "Dinamización de Grupos"],
    link: "#",
    image: projectImages.p3,
  },
];

export const contact = {
  email: "pabloblazquezgil@gmail.com",
  phone: "+34 608-720-216",
  linkedin: "https://linkedin.com/in/pabloblazquezgil-example", // placeholder
  github: "https://github.com/pabloblazquezgil-example", // placeholder
  cvUrl: "/pablo-blazquez-gil-cv.pdf",
};

export const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image')!;

export const cvText = ``;
