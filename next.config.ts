// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE NEXT.JS
// Este archivo controla el comportamiento del framework.
// Los cambios aquí requieren reiniciar el servidor de desarrollo (npm run dev).
// ─────────────────────────────────────────────────────────────────────────────
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── OPTIMIZACIÓN DE IMÁGENES ──────────────────────────────────────────────
  // Next.js optimiza automáticamente las imágenes locales (en /public/).
  // Si usas imágenes de dominios externos (CDN, Cloudinary, S3, etc.),
  // debes añadir aquí su hostname para que Next.js las acepte y optimice.
  //
  // Por ahora solo están configurados los dominios del vídeo de demostración.
  // Si subes la foto de perfil o proyectos a un servicio externo,
  // añade su hostname en este array siguiendo el mismo formato.
  images: {
    remotePatterns: [
      // ── player.vimeo.com ─────────────────────────────────────────────────
      // Necesario si usas el componente <Image> de Next.js con URLs de Vimeo.
      // (El <video> del hero usa <source src="..."> directamente, no <Image>,
      //  así que este patrón es por si en el futuro usas thumbnails de Vimeo.)
      {
        protocol: "https",
        hostname: "player.vimeo.com",
        pathname: "/**",
      },
      // ── Añade aquí más dominios si tienes imágenes externas ──────────────
      // Ejemplo para Cloudinary:
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      //   pathname: "/tu-cloud-name/**",
      // },
      // Ejemplo para un bucket S3:
      // {
      //   protocol: "https",
      //   hostname: "mi-bucket.s3.eu-west-1.amazonaws.com",
      //   pathname: "/**",
      // },
    ],
  },
};

export default nextConfig;
