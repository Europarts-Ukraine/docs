import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PAD Platform Docs',
  tagline: 'Customer Help Center and integration reference',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
    faster: {
      // The persistent Rspack graph is not safe to share between the public
      // and internal configs. Keep Rspack, but rebuild its graph per process.
      rspackPersistentCache: false,
    },
  },

  url: 'https://docs.pad-platform.example.com',
  baseUrl: '/',
  organizationName: 'pad-platform',
  projectName: 'pad-platform-docs',
  customFields: {
    homeEyebrow: 'PAD customer documentation',
    homeTitle: 'Find the right product guide.',
    homeDescription:
      'Task-based help and integration reference for teams using PAD Platform.',
    homePrimaryPath: '/docs/public/intro',
    homePrimaryLabel: 'Open Help Center',
    homeSecondaryPath: '/docs/public/integrations/overview',
    homeSecondaryLabel: 'Browse integrations',
    homeSectionLabel: 'Customer documentation',
    homeSectionTitle: 'Guides organized around real product work.',
    homeSectionDescription:
      'Start with everyday workflows, connect an external system, or diagnose a problem.',
    homeTargets: [
      {
        icon: 'guide',
        eyebrow: 'Product users',
        title: 'Help Center',
        description:
          'Catalog, import, mapping, pricing, channel, export, permissions, and history workflows.',
        to: '/docs/public/intro',
        linkLabel: 'Open Help Center',
      },
      {
        icon: 'integration',
        eyebrow: 'Developers & partners',
        title: 'Integration reference',
        description:
          'Authentication, supported contracts, export formats, and external data exchange.',
        to: '/docs/public/integrations/overview',
        linkLabel: 'Open integrations',
      },
      {
        icon: 'support',
        eyebrow: 'Problem solving',
        title: 'Troubleshooting',
        description:
          'Practical checks for imports, prices, exports, access, and common workflow failures.',
        to: '/docs/public/troubleshooting',
        linkLabel: 'Diagnose an issue',
      },
    ],
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
          path: 'content/public',
          routeBasePath: 'docs/public',
          sidebarPath: './sidebars.public.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/pad-social-card.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'PAD Platform Docs',
      logo: {
        alt: 'PAD Platform',
        src: 'img/pad-mark-light.svg',
        srcDark: 'img/pad-mark-dark.svg',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'publicSidebar',
          position: 'left',
          label: 'Help Center',
        },
        {
          to: '/docs/public/integrations/overview',
          label: 'Integrations',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Public Docs',
              to: '/docs/public/intro',
            },
            {
              label: 'Integrations',
              to: '/docs/public/integrations/overview',
            },
          ],
        },
        {
          title: 'Workflows',
          items: [
            {label: 'Imports', to: '/docs/public/imports'},
            {label: 'Catalog', to: '/docs/public/catalog'},
            {label: 'Exports', to: '/docs/public/exports'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PAD Platform.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
