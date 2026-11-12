# Web CV de Pablo Blázquez Gil

Web estática hecha con [Astro](https://astro.build) y Tailwind CSS 4. Castellano y gallego en la misma página (selector ES/GL, o `?lang=gl` en la URL).

## Comandos

```bash
npm install        # instala dependencias (Node 24, ver .nvmrc)
npm run dev        # servidor local en http://localhost:4321
npm run build      # genera la web estática en dist/
npm run preview    # sirve dist/ para probarla
npm run check      # comprueba tipos
```

## Dónde está cada cosa

- `src/data/cv_es.json`, `cv_gl.json`: contenido del CV (copias de `cv-base/datos/`).
- `src/data/web.ts`: textos de la interfaz, enlaces y galería de proyectos.
- `src/pages/index.astro`, `src/components/`: la página.
- `src/scripts/main.ts`: idioma, vídeo CV de Vimeo, visor de proyectos y animaciones.
- `public/cv/`: PDF del CV en castellano y gallego. Sustitúyelos al exportar uno nuevo.
- `astro.config.mjs`: dominio (`site`) para sitemap y metadatos.

## Despliegue (Hostinger desde GitHub)

Tipo de sitio: estático. Comando de compilación `npm run build`, carpeta de salida `dist`, Node 24.
