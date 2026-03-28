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
        'genesis-nexus/agent-system',
        'genesis-nexus/state-management',
        'genesis-nexus/simulations',
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
        'clisis-agent/system-integration',
        'clisis-agent/guardian-layer',
        'clisis-agent/sandboxed-execution',
        'clisis-agent/hardware-access',
        'clisis-agent/security',
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
        'genesis-temporal/architecture',
        'genesis-temporal/workflows',
        'genesis-temporal/activities',
        'genesis-temporal/chasm-layer',
        'genesis-temporal/deployment',
        'genesis-temporal/monitoring',
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
        'cloud-api/zero-knowledge-sync',
        'cloud-api/e2ee-implementation',
        'cloud-api/api-endpoints',
        'cloud-api/database-schema',
        'cloud-api/authentication',
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
        'desktop-apps/genesis-desktop',
        'desktop-apps/genesis-companion',
        'desktop-apps/glassmorphism-ui',
        'desktop-apps/embedded-nexus',
        'desktop-apps/ipc-communication',
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
        'mobile-app/architecture',
        'mobile-app/validation-cockpit',
        'mobile-app/nexus-connection',
        'mobile-app/components',
        'mobile-app/build-deployment',
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
        'web-portal/nextjs-architecture',
        'web-portal/landing-page',
        'web-portal/cloud-app',
        'web-portal/authentication',
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
        'browser-extension/chrome-mv3',
        'browser-extension/context-injection',
        'browser-extension/bridge-protocol',
        'browser-extension/permissions',
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
        'marketplace/blueprint-trading',
        'marketplace/encryption',
        'marketplace/smart-contracts',
        'marketplace/agent-publishing',
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
        'genesis-ops/infrastructure',
        'genesis-ops/docker-compose',
        'genesis-ops/kubernetes',
        'genesis-ops/monitoring',
        'genesis-ops/ci-cd',
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
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/development-setup',
        'contributing/coding-standards',
        'contributing/testing',
        'contributing/documentation',
      ],
    },
  ],
};

export default sidebars;
