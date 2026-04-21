import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Genesis AI Documentation Sidebar
 * Comprehensive structure covering all 12+ projects in the ecosystem
 */
const sidebars: SidebarsConfig = {
  main: [
    {
      type: 'category',
      label: 'Introduction',
      link: {
        type: 'doc',
        id: 'introduction/overview',
      },
      items: [
        'introduction/overview',
        'introduction/architecture',
        'introduction/core-concepts',
        'introduction/security-model',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'doc',
        id: 'getting-started/quickstart',
      },
      items: [
        'getting-started/quickstart',
        'getting-started/installation',
        'getting-started/configuration',
        'getting-started/first-workflow',
      ],
    },
    {
      type: 'category',
      label: 'igon7 Engine',
      link: {
        type: 'doc',
        id: 'igon7-engine/overview',
      },
      items: [
        'igon7-engine/overview',
        'igon7-engine/architecture',
        'igon7-engine/packages',
        'igon7-engine/workflow-dag',
        'igon7-engine/orchestration',
        'igon7-engine/api-reference',
        'igon7-engine/examples',
      ],
    },
    {
      type: 'category',
      label: 'Genesis Nexus',
      link: {
        type: 'doc',
        id: 'genesis-nexus/overview',
      },
      items: [
        'genesis-nexus/overview',
        'genesis-nexus/a2a-protocol',
        'genesis-nexus/neural-routing',
        'genesis-nexus/installation',
        'genesis-nexus/configuration',
        'genesis-nexus/agent-types',
        'genesis-nexus/a2a-protocol-spec',
        'genesis-nexus/routing-algorithms',
      ],
    },
    {
      type: 'category',
      label: 'Clisis Agent',
      link: {
        type: 'doc',
        id: 'clisis-agent/overview',
      },
      items: [
        'clisis-agent/overview',
        'clisis-agent/installation',
        'clisis-agent/guardian-layer',
        'clisis-agent/system-modules',
        'clisis-agent/cli-commands',
      ],
    },
    {
      type: 'category',
      label: 'Genesis Temporal',
      link: {
        type: 'doc',
        id: 'genesis-temporal/overview',
      },
      items: [
        'genesis-temporal/overview',
        'genesis-temporal/installation',
        'genesis-temporal/chasm-layer',
        'genesis-temporal/workflow-types',
        'genesis-temporal/services',
        'genesis-temporal/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Cloud API',
      link: {
        type: 'doc',
        id: 'cloud-api/overview',
      },
      items: [
        'cloud-api/overview',
        'cloud-api/installation',
        'cloud-api/e2ee-implementation',
        'cloud-api/api-endpoints',
        'cloud-api/database-schema',
      ],
    },
    {
      type: 'category',
      label: 'Desktop Applications',
      link: {
        type: 'doc',
        id: 'desktop-apps/overview',
      },
      items: [
        'desktop-apps/overview',
        'desktop-apps/installation',
        'desktop-apps/glassmorphism-ui',
        'desktop-apps/embedded-nexus',
      ],
    },
    {
      type: 'category',
      label: 'Mobile App',
      link: {
        type: 'doc',
        id: 'mobile-app/overview',
      },
      items: [
        'mobile-app/overview',
        'mobile-app/installation',
        'mobile-app/navigation',
        'mobile-app/components',
        'mobile-app/state-management',
      ],
    },
    {
      type: 'category',
      label: 'Web Portal',
      link: {
        type: 'doc',
        id: 'web-portal/overview',
      },
      items: [
        'web-portal/overview',
      ],
    },
    {
      type: 'category',
      label: 'Browser Extension',
      link: {
        type: 'doc',
        id: 'browser-extension/overview',
      },
      items: [
        'browser-extension/overview',
        'browser-extension/installation',
        'browser-extension/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Marketplace',
      link: {
        type: 'doc',
        id: 'marketplace/overview',
      },
      items: [
        'marketplace/overview',
        'marketplace/installation',
        'marketplace/smart-contracts',
      ],
    },
    {
      type: 'category',
      label: 'DevOps & Operations',
      link: {
        type: 'doc',
        id: 'genesis-ops/overview',
      },
      items: [
        'genesis-ops/overview',
        'genesis-ops/installation',
        'genesis-ops/kubernetes',
        'genesis-ops/monitoring',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      link: {
        type: 'doc',
        id: 'api-reference/overview',
      },
      items: [
        'api-reference/overview',
        'api-reference/rest-api',
        'api-reference/graphql',
        'api-reference/grpc',
        'api-reference/websocket',
        'api-reference/sdk',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Topics',
      items: [
        'advanced/performance-optimization',
        'advanced/scaling-strategies',
        'advanced/custom-agents',
        'advanced/workflow-patterns',
        'advanced/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
