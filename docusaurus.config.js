import { themes as prismThemes } from "prism-react-renderer";

const config = {
  title: "DocuQuest",
  tagline: "Explora, aprende, domina el código",
  favicon: "#",

  future: {
    v4: true,
  },

  url: "https://your-docusaurus-site.example.com",
  baseUrl: "/",

  organizationName: "oslarcode",
  projectName: "docuQuest",
  deploymentBranch: "gh-pages",
  url: "https://oslarcode.github.io",
  baseUrl: "/docuQuest/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/OslarCode/OslarCode",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig: {
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
  },
};

export default config;
