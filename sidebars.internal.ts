import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  internalSidebar: [
    'internal/intro',
    {
      type: 'category',
      label: 'Public Docs',
      collapsed: true,
      items: [
        'public/intro',
        'public/overview',
        'public/getting-started',
        'public/catalog',
        'public/imports',
        'public/mappings',
        'public/pricing',
        'public/market-monitoring',
        'public/channels',
        'public/exports',
        'public/users-and-roles',
        'public/history',
        'public/troubleshooting',
        'public/faq',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: true,
      items: [
        'public/integrations/overview',
        'public/integrations/authentication',
        'public/integrations/export-formats',
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      collapsed: false,
      items: [
        'internal/implementation/overview',
        'internal/implementation/onboarding-client',
        'internal/implementation/data-requirements',
      ],
    },
    {
      type: 'category',
      label: 'Support',
      collapsed: false,
      items: [
        'internal/support/overview',
        'internal/support/import-failed',
        'internal/support/export-empty',
        'internal/support/pricing-not-updated',
      ],
    },
    {
      type: 'category',
      label: 'Engineering',
      collapsed: false,
      items: [
        'internal/engineering/overview',
        'internal/engineering/backend-development',
        'internal/engineering/frontend-development',
        'internal/engineering/api-sync',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      collapsed: false,
      items: [
        'internal/architecture/system-overview',
        'internal/architecture/backend-architecture',
        'internal/architecture/frontend-architecture',
        'internal/architecture/module-registry',
        'internal/architecture/entity-graph',
        'internal/architecture/rbac',
        'internal/architecture/history',
        'internal/architecture/soft-delete',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      collapsed: false,
      items: [
        'internal/operations/overview',
        'internal/operations/deployment-model',
      ],
    },
    {
      type: 'category',
      label: 'Decisions',
      collapsed: false,
      items: [
        'internal/decisions/overview',
        'internal/decisions/documentation-split',
      ],
    },
  ],
};

export default sidebars;
