# Diverpark (Astro)

Versión del sitio Diverpark con **Astro**: estático, multidioma (es/ca/en) y mismas secciones que el proyecto Nuxt.

## Comandos Astro

```bash
# Desarrollo (servidor con hot reload)
npm run dev

# Build estático (genera dist/)
npm run build

# Vista previa del build
npm run preview

# CLI Astro (info, check, etc.)
npx astro --help
```

## Stack

- **Astro 5** – SSG y enrutado
- **i18n nativo** – `astro.config.mjs` con `locales: ['es', 'ca', 'en']`, `defaultLocale: 'es'`, `prefixDefaultLocale: false` (es en `/`, ca en `/ca`, en en `/en`)
- **Tailwind CSS 4** – vía `@tailwindcss/vite`
- **@astrojs/sitemap** – sitemap automático

## Estructura

- `src/pages/` – Español (locale por defecto): `index.astro`, `contacto.astro`, `castillos-pequenos.astro`, `castillos-grandes.astro`
- `src/pages/ca/` – Páginas en catalán
- `src/pages/en/` – Páginas en inglés
- `src/layouts/Layout.astro` – Layout base con meta y Tailwind
- `src/locales/*.json` – Traducciones (nav, home)
- `src/utils/i18n.ts` – Helper `t(locale, path)` para claves anidadas

## URLs generadas

| Ruta        | ES (default)     | CA    | EN    |
|------------|------------------|-------|-------|
| Inicio     | `/`              | `/ca` | `/en` |
| Contacto   | `/contacto`      | `/ca/contacto` | `/en/contacto` |
| Castillos pequeños | `/castillos-pequenos` | `/ca/castillos-pequenos` | `/en/castillos-pequenos` |
| Castillos grandes  | `/castillos-grandes`  | `/ca/castillos-grandes`  | `/en/castillos-grandes`  |

Sitemap: `dist/sitemap-index.xml` (y sitemaps por idioma si aplica).

## Formulario de contacto (GitHub Pages)

El formulario usa [FormSubmit.co](https://formsubmit.co) (gratis, sin registro). Los envíos llegan a **catidiver@hotmail.com**. La primera vez, FormSubmit enviará un correo de activación a ese email; hay que hacer clic en el enlace para activar el formulario.
