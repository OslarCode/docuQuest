// @ts-check
// Las anotaciones `@type` de JSDoc permiten la autocompletación del editor y la comprobación de tipos
// (cuando se combinan con `@ts-check`).
// Hay varias formas equivalentes de declarar tu configuración de Docusaurus.
// Ver: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// Esto se ejecuta en Node.js - No uses código del lado del cliente aquí (APIs del navegador, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "DocuQuest",
  tagline: "Explora, aprende, domina el código",
  favicon: "#",

  // Flags para características futuras, ver https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Mejora la compatibilidad con la futura versión Docusaurus v4
  },

  // Establece aquí la URL de producción de tu sitio
  url: "https://your-docusaurus-site.example.com",
  // Establece el pathname /<baseUrl>/ bajo el cual se sirve tu sitio
  // Para despliegues en GitHub Pages, normalmente es '/<projectName>/'
  baseUrl: "/",

  // Configuración para despliegue en GitHub Pages.
  // Si no usas GitHub Pages, no necesitas esto.
  organizationName: "oslarcode", // Normalmente tu nombre de usuario u organización en GitHub.
  projectName: "docuQuest", // Normalmente el nombre de tu repositorio.

  onBrokenLinks: "throw", // Lanza error si hay enlaces rotos
  onBrokenMarkdownLinks: "warn", // Muestra advertencia si hay enlaces Markdown rotos

  // Aunque no uses internacionalización, puedes usar este campo para establecer
  // metadatos útiles como el idioma del HTML. Por ejemplo, si tu sitio está en chino,
  // puedes reemplazar "en" por "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Por favor, cambia esto por tu repositorio.
          // Elimina esta línea si no quieres que aparezca el enlace "editar esta página".
          editUrl: "https://github.com/OslarCode/OslarCode",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css", // Estilos personalizados
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Reemplaza con la imagen social de tu proyecto
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "DocuQuest",

        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Documentos",
          },
          {
            href: "https://github.com/OslarCode/OslarCode",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Navegación",
            items: [
              { label: "Inicio", to: "/" },
              { label: "Documentación", to: "/docs/intro" },
              { label: "Blog", to: "/blog" },
            ],
          },
          {
            title: "Recursos",
            items: [
              { label: "GitHub", href: "https://github.com/OslarCode" },
              { label: "Contacto", href: "mailto:tuemail@ejemplo.com" },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} OslarCode. Todos los derechos reservados.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
