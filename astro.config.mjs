// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE ASTRO
// La web es 100 % estática: `npm run build` genera HTML, CSS y JS sueltos en
// la carpeta dist/, que es lo que se sirve en Hostinger (o en cualquier hosting).
// ─────────────────────────────────────────────────────────────────────────────
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Dominio público: se usa para el sitemap y las URL absolutas (Open Graph).
  // Cuando la web viva en su dominio de Hostinger, cámbialo aquí.
  site: "https://pabloblazquezgilcv.vercel.app",
  output: "static",
  outDir: "dist",
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
