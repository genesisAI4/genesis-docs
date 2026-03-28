import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Genesis AI Documentation',
  tagline: 'Universal Personal AI Assistant - Distributed Orchestration Platform',
  favicon: 'img/favicon.ico',

  // URL de production (GitHub Pages)
  url: 'https://genesisAI4.github.io',
  baseUrl: '/genesis-docs/',

  // Configuration GitHub Pages
  organizationName: 'genesisAI4',
  projectName: 'genesis-docs',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  onBrokenAnchors: 'warn',

  // Internationalization
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Mermaid pour les diagrammes
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Preset Classic
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/genesisAI4/genesis-docs/tree/main/',
          routeBasePath: 'docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/genesisAI4/genesis-docs/tree/main/',
          routeBasePath: 'blog',
          postsPerPage: 'ALL',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Theme Configuration
  themeConfig: {
    image: 'img/genesis-social-card.jpg',
    metadata: [
      {name: 'keywords', content: 'AI, orchestration, workflows, distributed, zero-knowledge, agents'},
      {name: 'author', content: 'Genesis AI Team'},
      {property: 'og:site_name', content: 'Genesis AI Documentation'},
    ],
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Genesis AI',
      logo: {
        alt: 'Genesis AI Logo',
        src: 'img/logo.svg',
        href: '/genesis-docs/',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'main',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'API Reference',
          position: 'left',
          items: [
            {
              label: 'REST API',
              to: '/docs/api-reference/rest-api',
            },
            {
              label: 'GraphQL',
              to: '/docs/api-reference/graphql',
            },
            {
              label: 'gRPC',
              to: '/docs/api-reference/grpc',
            },
            {
              label: 'SDK',
              to: '/docs/api-reference/sdk',
            },
          ],
        },
        {
          href: 'https://github.com/genesisAI4',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/genesisai',
          label: 'Discord',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/quickstart',
            },
            {
              label: 'Architecture',
              to: '/docs/introduction/architecture',
            },
            {
              label: 'Security Model',
              to: '/docs/introduction/security-model',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference/overview',
            },
          ],
        },
        {
          title: 'Projects',
          items: [
            {
              label: 'igon7 Engine',
              to: '/docs/igon7-engine/overview',
            },
            {
              label: 'Genesis Nexus',
              to: '/docs/genesis-nexus/overview',
            },
            {
              label: 'Clisis Agent',
              to: '/docs/clisis-agent/overview',
            },
            {
              label: 'Genesis Temporal',
              to: '/docs/genesis-temporal/overview',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/genesisai',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/genesis_ai',
            },
            {
              label: 'GitHub Discussions',
              href: 'https://github.com/genesisAI4/genesis-docs/discussions',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub Organization',
              href: 'https://github.com/genesisAI4',
            },
            {
              label: 'Main Website',
              href: 'https://genesisai.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Genesis AI Project. Open Source (MIT). Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'diff', 'json', 'typescript', 'go', 'rust'],
    },
    announcementBar: {
      id: 'support_us',
      content:
        '🚀 Genesis AI Documentation v1.0 is now available! <a target="_blank" rel="noopener noreferrer" href="https://github.com/genesisAI4/genesis-docs">Star on GitHub</a> ⭐',
      backgroundColor: '#030712',
      textColor: '#ffffff',
      isCloseable: true,
    },
    algolia: {
      // Configuration pour Algolia DocSearch (à configurer)
      appId: 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_KEY',
      indexName: 'genesis-docs',
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;