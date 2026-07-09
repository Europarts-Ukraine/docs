import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  publicSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Public Help Center',
      collapsed: false,
      items: [
        'overview',
        'getting-started',
        'catalog',
        'imports',
        'mappings',
        'pricing',
        'market-monitoring',
        'channels',
        'exports',
        'users-and-roles',
        'history',
        'troubleshooting',
        'faq',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        'integrations/overview',
        'integrations/authentication',
        'integrations/export-formats',
      ],
    },
  ],
};

export default sidebars;
