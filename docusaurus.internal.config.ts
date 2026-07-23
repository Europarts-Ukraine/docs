import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PAD Internal Docs',
  tagline: 'Internal implementation, support, engineering, and operations knowledge base',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
    faster: {
      // The persistent Rspack graph is not safe to share between the public
      // and internal configs. Keep Rspack, but rebuild its graph per process.
      rspackPersistentCache: false,
    },
  },

  url: 'https://europarts-ukraine.github.io',
  baseUrl: '/docs/',
  organizationName: 'Europarts-Ukraine',
  projectName: 'docs',
  customFields: {
    homeEyebrow: 'PAD internal documentation',
    homeTitle: 'The internal operating knowledge base.',
    homeDescription:
      'Architecture, engineering, implementation, operations, support, and decisions for the PAD team.',
    homePrimaryPath: '/docs/internal/intro',
    homePrimaryLabel: 'Open internal docs',
    homeSecondaryPath: '/docs/internal/architecture/system-overview',
    homeSecondaryLabel: 'View system architecture',
    homeSectionLabel: 'Internal knowledge',
    homeSectionTitle: 'One place to understand and operate PAD.',
    homeSectionDescription:
      'Use the knowledge base as the entry point, then move into engineering or delivery detail.',
    homeTargets: [
      {
        icon: 'internal',
        eyebrow: 'Start here',
        title: 'Internal knowledge base',
        description:
          'The product mental model, role-based paths, platform map, and authoritative sources.',
        to: '/docs/internal/intro',
        linkLabel: 'Open internal docs',
      },
      {
        icon: 'architecture',
        eyebrow: 'Understand',
        title: 'Architecture',
        description:
          'System boundaries, domain model, application ownership, runtime flows, and cross-cutting mechanisms.',
        to: '/docs/internal/architecture/system-overview',
        linkLabel: 'Explore architecture',
      },
      {
        icon: 'operations',
        eyebrow: 'Deliver',
        title: 'Implementation & operations',
        description:
          'Customer onboarding, isolated deployment, operational ownership, and support playbooks.',
        to: '/docs/internal/implementation/overview',
        linkLabel: 'Open delivery guides',
      },
    ],
  },
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

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
          include: ['internal/**/*.md', 'internal/**/*.mdx'],
          routeBasePath: '/',
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
    image: 'img/pad-social-card.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
      options: {
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      },
    },
    navbar: {
      title: 'PAD Internal Docs',
      logo: {
        alt: 'PAD Platform',
        src: 'img/pad-mark-light.svg',
        srcDark: 'img/pad-mark-dark.svg',
        href: '/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'internalSidebar',
          position: 'left',
          label: 'Internal docs',
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
          ],
        },
        {
          title: 'Understand',
          items: [
            {
              label: 'System Overview',
              to: '/docs/internal/architecture/system-overview',
            },
            {
              label: 'Domain Model',
              to: '/docs/internal/architecture/domain-model',
            },
            {
              label: 'Runtime Flows',
              to: '/docs/internal/architecture/runtime-data-flows',
            },
          ],
        },
        {
          title: 'Deliver',
          items: [
            {
              label: 'Client Onboarding',
              to: '/docs/internal/implementation/onboarding-client',
            },
            {
              label: 'Deployment Model',
              to: '/docs/internal/operations/deployment-model',
            },
            {
              label: 'Support Playbooks',
              to: '/docs/internal/support/overview',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PAD Platform. Internal use only.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
