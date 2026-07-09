import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'BAS Internal Docs',
  tagline: 'Internal implementation, support, engineering, and operations knowledge base',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://internal-docs.bas-platform.example.com',
  baseUrl: '/',
  organizationName: 'bas-platform',
  projectName: 'bas-platform-internal-docs',
  customFields: {
    homePrimaryPath: '/docs/internal/intro',
    homePrimaryLabel: 'Open internal docs',
    homeSecondaryPath: '/docs/public/intro',
    homeSecondaryLabel: 'Open public docs',
  },
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'content',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.internal.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'BAS Internal Docs',
      logo: {
        alt: 'BAS Platform',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'internalSidebar',
          position: 'left',
          label: 'Internal Docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Internal Docs',
          items: [
            {
              label: 'Knowledge Base',
              to: '/docs/internal/intro',
            },
            {
              label: 'Customer Docs',
              to: '/docs/public/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BAS Platform. Internal use only.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
