import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

export const name = "Pablo Blazquez Gil";
export const title = "Creative Full-Stack Developer & AI Enthusiast";
export const summary = "Innovative developer with a passion for building beautiful, functional web applications and exploring the frontiers of artificial intelligence. Experienced in turning complex problems into elegant solutions, with a strong focus on user experience and modern technologies.";

export const experience = [
  {
    company: "Future Systems Inc.",
    role: "Senior Frontend Developer",
    period: "2020 - Present",
    description: "Led the development of a new design system, improving development velocity by 30%. Mentored junior developers and pioneered the integration of AI-powered features into the main product.",
  },
  {
    company: "Innovate Solutions",
    role: "Full-Stack Developer",
    period: "2017 - 2020",
    description: "Developed and maintained web applications for various clients using React, Node.js, and Python. Worked in an agile environment to deliver high-quality software on schedule.",
  },
  {
    company: "Digital Creations",
    role: "Junior Web Developer",
    period: "2015 - 2017",
    description: "Assisted in building responsive and accessible websites for small businesses. Gained foundational experience in HTML, CSS, JavaScript, and version control with Git.",
  },
];

export const education = [
  {
    institution: "Tech University of Madrid",
    degree: "Master's in Artificial Intelligence",
    period: "2017 - 2019",
  },
  {
    institution: "University of Salamanca",
    degree: "Bachelor's in Computer Science",
    period: "2013 - 2017",
  },
];

export const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "UI/UX Design",
  "Machine Learning", "GenAI", "Firebase", "Tailwind CSS", "Three.js",
];

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
    title: "Project Alpha",
    description: "A comprehensive project management tool designed for agile teams.",
    longDescription: "Project Alpha is a full-featured project management platform that enables agile teams to plan, track, and release great software. It includes features like real-time Kanban boards, sprint planning, burndown charts, and seamless integration with GitHub.",
    technologies: ["Next.js", "TypeScript", "GraphQL", "PostgreSQL", "Tailwind CSS"],
    link: "#",
    image: projectImages.p1,
  },
  {
    title: "FitTrack Mobile",
    description: "A cross-platform mobile app for tracking fitness goals, workouts, and nutrition.",
    longDescription: "FitTrack helps users achieve their health and fitness goals by providing personalized workout plans, nutrition tracking, and progress analytics. It syncs with popular wearable devices and uses machine learning to offer tailored recommendations.",
    technologies: ["React Native", "Firebase", "Python", "Machine Learning"],
    link: "#",
    image: projectImages.p2,
  },
  {
    title: "DataViz Dashboard",
    description: "An interactive data visualization dashboard for financial analysis.",
    longDescription: "This powerful tool allows financial analysts to explore complex datasets through interactive charts and graphs. It provides insights into market trends, portfolio performance, and risk assessment, all within a clean and intuitive interface.",
    technologies: ["React", "D3.js", "Node.js", "Express"],
    link: "#",
    image: projectImages.p3,
  },
];

export const contact = {
  email: "pablo.blazquez.gil@example.com",
  linkedin: "https://linkedin.com/in/pabloblazquezgil",
  github: "https://github.com/pabloblazquezgil",
  cvUrl: "/pablo-blazquez-gil-cv.pdf",
};

export const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image')!;

export const cvText = `
${name}
${title}

SUMMARY
${summary}

EXPERIENCE
${experience.map(e => `
${e.role} at ${e.company} (${e.period})
${e.description}
`).join('\n')}

EDUCATION
${education.map(e => `
${e.degree}, ${e.institution} (${e.period})
`).join('\n')}

SKILLS
${skills.join(', ')}
`;
