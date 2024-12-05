// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Soul Machines Developer Docs',
  tagline: 'Build custom UI using Soul Machines API',
  url: 'https://docs.soulmachines.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'Soul Machines', // Usually your GitHub org/user name.
  projectName: 'developer-docs', // Usually your repo name.
  deploymentBranch: 'master',
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve('./src/plugins/changelog/index.js'),
      {
        blogTitle: 'WebSDK changelog',
        blogDescription:
          'Keep yourself up-to-date about new features in every release',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'WebSDK Changelog',
        routeBasePath: '/web-sdk/changelog',
        showReadingTime: false,
        postsPerPage: 20,
        archiveBasePath: null,
        authorsMapPath: 'authors.json',
        feedOptions: {
          type: 'all',
          title: 'Docusaurus changelog',
          description:
            'Keep yourself up-to-date about new features in every release',
          copyright: `Copyright © ${new Date().getFullYear()} Soul Machines`,
          language: 'en',
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'web-sdk',
        path: 'web-sdk',
        routeBasePath: 'web-sdk',
        sidebarPath: require.resolve('./web-sdk/sidebar.js'),
        includeCurrentVersion: true,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        hideOnScroll: true,
        title: 'Developer Docs',
        logo: {
          alt: 'SM Logo',
          src: 'img/logo.png',
          srcDark: 'img/logoDark.png'
        },
        items: [
          {
            to: 'web-sdk',
            label: 'Web SDK',
            position: 'left',
          },
          {
            label: 'User Guide',
            position: 'left',
            href: 'https://soulmachines-support.atlassian.net/wiki/spaces/SSAS/pages/95092901/Digital+DNA+Studio+User+Guide',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/soulmachines',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Website',
                href: 'https://www.soulmachines.com/',
              },
              {
                label: 'Learn',
                href: 'https://soulmachinesacademy.thinkific.com/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Soul Machines Ltd.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        // If Algolia did not provide you any appId, use 'BH4D9OD16A'
        appId: 'DT8WZDLYZX',

        // Public API key: it is safe to commit it
        apiKey: 'eb3399ab835f6a32cfe00a64d2fea004',

        indexName: 'soulmachines doc',

        // Optional: see doc section below
        contextualSearch: true,
      },
    }),
};

module.exports = config;
