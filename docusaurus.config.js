// @ts-check

// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const baseUrl = '/miRdeX-nf-docs/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'miRdeX-nf',

  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://ncrna-lab.github.io',
  baseUrl: baseUrl,

  organizationName: 'ncRNA-lab',
  projectName: 'miRdeX-nf-docs',

  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',

      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',

          editUrl:
            'https://github.com/ncRNA-lab/miRdeX-nf-docs/edit/main/',

          versions: {
            current: {
              label: 'dev',
            },
          },
        },

        blog: false,

        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  // Search bar
  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        // What to index
        indexDocs: true,
        indexBlog: false,
        indexPages: true,

        // Content language
        language: ['en'],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: false,
      },

      // NAVBAR
      navbar: {
        logo: {
          alt: 'miRdeX',
          src: 'img/logo.svg',
          srcDark: 'img/logo_dark.svg',
          href: baseUrl,
          target: '_self',
        },

        items: [
          {
            to: '/about',
            label: 'About',
            position: 'left',
          },
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/changelog',
            label: 'Changelog',
            position: 'left',
          },
          {
            type: 'search',
            position: 'right',
            className: 'navbar-search-item',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/ncRNA-lab/miRdeX-nf',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
          {
            href: 'https://www.ncrnalab.com',
            position: 'right',
            className: 'header-lab-link',
            'aria-label': 'ncRNAlab website',
          },
        ],
      },

      // FOOTER
      footer: {
        style: 'dark',

        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Documentation', to: '/docs/getting_started'},
              {label: 'Tutorial', to: '/docs/tutorial'},
              {label: 'Changelog', to: '/changelog'},
              {label: 'About', to: '/about'},
            ],
          },

          {
            title: 'Tools',
            items: [
              {
                html: `<a href="https://www.nextflow.io/" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; gap:8px">
                        Nextflow <img src="${baseUrl}img/nextflow-icon-white.svg" alt="Nextflow" height="16" />
                      </a>`,
              },
              {
                html: `<a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; gap:8px">
                        Docker <img src="${baseUrl}img/docker-mark-white.svg" alt="Docker" height="16" />
                      </a>`,
              },
              {
                html: `<a href="https://docs.sylabs.io/guides/3.5/user-guide/introduction.html" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; gap:8px">
                        Singularity <img src="${baseUrl}img/SingularityLogo.svg" alt="Singularity" height="16" />
                      </a>`,
              },
              {
                html: `<a href="https://docs.conda.io/" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; gap:8px">
                        Conda <img src="${baseUrl}img/anaconda.svg" alt="Conda" height="16" />
                      </a>`,
              },
            ],
          },

          {
            title: 'More',
            items: [
              {
                html: `<a href="https://github.com/ncRNA-lab/miRdeX-nf" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; gap:8px">
                        GitHub <img src="${baseUrl}img/GitHub_Invertocat_White.svg" alt="GitHub" height="16" />
                      </a>`,
              },
              {
                html: `<a href="https://www.ncrnalab.com" target="_blank" rel="noopener noreferrer" style="display:flex; align-items:center; gap:8px">
                        ncRNAlab <img src="${baseUrl}img/ncrnalab_small_logo_dark.svg" alt="ncRNAlab" height="16" />
                      </a>`,
              },
            ],
          },
        ],

        copyright: `miRdeX-nf · ncRNAlab ${new Date().getFullYear()}`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;