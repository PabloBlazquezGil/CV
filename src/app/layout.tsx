// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT RAÍZ - layout.tsx
// Este archivo envuelve TODAS las páginas de la aplicación.
// Es el equivalente al <html> y <body> principal de la web.
// Se renderiza en el SERVIDOR (no tiene "use client"), lo que mejora el SEO
// y el tiempo de carga inicial.
// ─────────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";

// Fuente optimizada por Next.js: se descarga en el servidor durante el build
// y se sirve como asset local (no depende de Google Fonts en producción).
// Si quieres cambiar la fuente, busca en https://nextjs.org/docs/app/building-your-application/optimizing/fonts
// y reemplaza "Plus_Jakarta_Sans" por el nombre de la fuente que quieras.
import { Plus_Jakarta_Sans } from "next/font/google";

// Importa los estilos globales (Tailwind + animaciones + variables de color)
import "./globals.css";

// ── CONFIGURACIÓN DE LA FUENTE ────────────────────────────────────────────────
// subsets: idiomas que necesitas (latin incluye español con acentos)
// weight: pesos a cargar (300=light, 400=regular, 500=medium, 600=semibold, 700=bold)
// variable: nombre de la variable CSS que podrás usar en globals.css
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-primary",
});

// ── METADATOS SEO ─────────────────────────────────────────────────────────────
// Next.js usa este objeto para generar automáticamente las etiquetas <title>
// y <meta description> en el HTML. Son críticos para el posicionamiento en Google.
//
// title: aparece en la pestaña del navegador y en los resultados de búsqueda.
//        Formato recomendado: "Nombre | Descripción corta" (máx. 60 caracteres)
// description: resumen que Google muestra bajo el título (máx. 160 caracteres)
//
// Para añadir más metadatos (og:image, Twitter cards, etc.) consulta:
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: "Pablo Blázquez Gil",
  description: "Bioquímico y Comunicador Audiovisual apasionado por la divulgación científica, la sostenibilidad y la narrativa visual. Con experiencia investigadora en el Centro de Astrobiología (CSIC-INTA), producción audiovisual, proyectos europeos y dirección de su primer documental.",
};

// ── COMPONENTE RootLayout ──────────────────────────────────────────────────────
// Recibe {children} que es el contenido de cada página (page.tsx).
// Readonly<{...}> es TypeScript: garantiza que las props no se modifican accidentalmente.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang="es": indica el idioma al navegador y a los lectores de pantalla (accesibilidad)
    // plusJakartaSans.variable: inyecta la variable CSS --font-primary en el elemento <html>
    // scroll-smooth: clase de Tailwind que activa desplazamiento suave con CSS
    <html
      lang="es"
      className={`${plusJakartaSans.variable} scroll-smooth`}
    >
      {/*
        min-h-screen: el body ocupa al menos toda la altura de la pantalla
        flex flex-col justify-between: ayuda a que el footer quede al fondo
        overflow-x-hidden: evita el scroll horizontal por desbordamientos
        selection:bg-[#2C5E43] selection:text-white: color del texto seleccionado
        (cuando el usuario arrastra el ratón para seleccionar texto)
      */}
      <body className="min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[#2C5E43] selection:text-white">
        {children}
      </body>
    </html>
  );
}
