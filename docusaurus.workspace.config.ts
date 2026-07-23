import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import internalConfig from './docusaurus.internal.config';

const config: Config = {
  ...internalConfig,
  title: 'PAD Documentation Workspace',
  tagline: 'Internal knowledge and customer documentation in one development workspace',
  url: 'http://localhost',
  baseUrl: '/',
  projectName: 'pad-platform-docs-workspace',
  customFields: {
    homeEyebrow: 'PAD documentation workspace',
    homeTitle: 'Choose your documentation space.',
    homeDescription:
      'Internal implementation knowledge and customer-facing product guidance stay separate, with one development gateway for moving between them.',
    homePrimaryPath: '/docs/internal/intro',
    homePrimaryLabel: 'Open internal docs',
    homeSecondaryPath: '/docs/public/intro',
    homeSecondaryLabel: 'Open public docs',
    homeSectionLabel: 'Documentation spaces',
    homeSectionTitle: 'Two audiences. Clear boundaries.',
    homeSectionDescription:
      'Choose the space that matches your audience. Sidebars and content remain isolated after you enter.',
    homeTargets: [
      {
        icon: 'internal',
        eyebrow: 'PAD team',
        title: 'Internal documentation',
        description:
          'Architecture, engineering, implementation, operations, support, and architectural decisions.',
        to: '/docs/internal/intro',
        linkLabel: 'Enter internal docs',
      },
      {
        icon: 'public',
        eyebrow: 'Customers & partners',
        title: 'Public documentation',
        description:
          'Task-based Help Center articles and customer-safe integration reference.',
        to: '/docs/public/intro',
        linkLabel: 'Enter public docs',
      },
    ],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'content',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.workspace.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    ...internalConfig.themeConfig,
    navbar: {
      title: 'PAD Docs',
      logo: {
        alt: 'PAD Platform documentation home',
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
        {
          type: 'docSidebar',
          sidebarId: 'publicSidebar',
          position: 'right',
          label: 'Public docs',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Internal docs', to: '/docs/internal/intro'},
            {label: 'Public docs', to: '/docs/public/intro'},
          ],
        },
        {
          title: 'Internal',
          items: [
            {
              label: 'Architecture',
              to: '/docs/internal/architecture/system-overview',
            },
            {
              label: 'Engineering',
              to: '/docs/internal/engineering/overview',
            },
            {
              label: 'Operations',
              to: '/docs/internal/operations/overview',
            },
          ],
        },
        {
          title: 'Public',
          items: [
            {label: 'Help Center', to: '/docs/public/intro'},
            {
              label: 'Integrations',
              to: '/docs/public/integrations/overview',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PAD Platform. Development workspace.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
