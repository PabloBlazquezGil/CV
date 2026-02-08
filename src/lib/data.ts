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
        company: "Universidad de Santiago de Compostela",
        role: "Investigador",
        period: "01/10/2020 - 02/06/2021",
        details: "Grupo de Biofarma (CIMUS)",
        description: "Realización de ensayos funcionales de un receptor asociado a la esquizofrenia y de nuevos ligandos farmacológicos.",
      },
      {
        company: "Universidad de Extremadura",
        role: "Investigador",
        period: "10/09/2019 - 29/06/2020",
        details: "Departamento de bioquímica y biología molecular",
        description: "Realización de pruebas de resistencia de microorganismos a diferentes antibióticos (polimixinas) y aplicación de técnicas de ingeniería genética para la modificación de microorganismos.",
      },
      {
        company: "CICYTEX",
        role: "Investigador",
        period: "Verano 2019",
        details: "Finca la Orden",
        description: "Realización de ensayos de toxicidad y resistencia de herbicidas en plantas de arroz y presentación oral del proyecto.",
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

export const contact = {
  email: "pabloblazquezgil@gmail.com",
  phone: "+34 608-720-216",
  linkedin: "https://www.linkedin.com/in/pabloblazquezgil/",
};

export const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image')!;

export const cvText = ``;
