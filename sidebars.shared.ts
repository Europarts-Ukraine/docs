import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

type SidebarConfig = SidebarsConfig[string];

function id(prefix: string, value: string): string {
  return `${prefix}${value}`;
}

export function createInternalSidebar(prefix = 'internal/'): SidebarConfig {
  return [
    {
      type: 'doc',
      id: id(prefix, 'intro'),
      label: 'Start here',
      className: 'sidebar-entry--home',
    },
    {
      type: 'category',
      label: 'Architecture',
      className: 'sidebar-category--architecture',
      collapsed: false,
      items: [
        id(prefix, 'architecture/system-overview'),
        id(prefix, 'architecture/domain-model'),
        id(prefix, 'architecture/backend-applications'),
        id(prefix, 'architecture/runtime-data-flows'),
        id(prefix, 'architecture/backend-architecture'),
        id(prefix, 'architecture/frontend-architecture'),
        id(prefix, 'architecture/module-registry'),
        id(prefix, 'architecture/entity-graph'),
        id(prefix, 'architecture/rbac'),
        id(prefix, 'architecture/history'),
        id(prefix, 'architecture/soft-delete'),
      ],
    },
    {
      type: 'category',
      label: 'Engineering',
      className: 'sidebar-category--engineering',
      collapsed: true,
      items: [
        id(prefix, 'engineering/overview'),
        id(prefix, 'engineering/backend-development'),
        id(prefix, 'engineering/frontend-development'),
        id(prefix, 'engineering/api-sync'),
      ],
    },
    {
      type: 'category',
      label: 'Implementation',
      className: 'sidebar-category--implementation',
      collapsed: true,
      items: [
        id(prefix, 'implementation/overview'),
        id(prefix, 'implementation/onboarding-client'),
        id(prefix, 'implementation/data-requirements'),
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      className: 'sidebar-category--operations',
      collapsed: true,
      items: [
        id(prefix, 'operations/overview'),
        id(prefix, 'operations/deployment-model'),
      ],
    },
    {
      type: 'category',
      label: 'Support',
      className: 'sidebar-category--support',
      collapsed: true,
      items: [
        id(prefix, 'support/overview'),
        id(prefix, 'support/import-failed'),
        id(prefix, 'support/export-empty'),
        id(prefix, 'support/pricing-not-updated'),
      ],
    },
    {
      type: 'category',
      label: 'Decisions',
      className: 'sidebar-category--decisions',
      collapsed: true,
      items: [
        id(prefix, 'decisions/overview'),
        id(prefix, 'decisions/documentation-split'),
      ],
    },
  ];
}

export function createPublicSidebar(prefix = ''): SidebarConfig {
  return [
    id(prefix, 'intro'),
    {
      type: 'category',
      label: 'Public Help Center',
      collapsed: false,
      items: [
        id(prefix, 'overview'),
        id(prefix, 'getting-started'),
        id(prefix, 'catalog'),
        id(prefix, 'imports'),
        id(prefix, 'mappings'),
        id(prefix, 'pricing'),
        id(prefix, 'market-monitoring'),
        id(prefix, 'channels'),
        id(prefix, 'exports'),
        id(prefix, 'users-and-roles'),
        id(prefix, 'history'),
        id(prefix, 'troubleshooting'),
        id(prefix, 'faq'),
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      collapsed: false,
      items: [
        id(prefix, 'integrations/overview'),
        id(prefix, 'integrations/authentication'),
        id(prefix, 'integrations/export-formats'),
      ],
    },
  ];
}
