import { defineConfig, type UserConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 3,
  imports: {
    eslintrc: { enabled: 9 },
  },
  extensionApi: 'chrome',
  modules: ['@wxt-dev/auto-icons', '@wxt-dev/module-react'],
  autoIcons: {
    grayscaleOnDevelopment: false,
  },
  runner: {
    // Disable opening the browser on dev start
    disabled: true,
  },
  manifest: () => ({
    name: 'Exoshell',
    permissions: ['storage', 'nativeMessaging', 'activeTab', 'contextMenus'],
    browser_specific_settings: {
      gecko: {
        id: 'browser@exoshell.io',
      },
    },
    version: process.env['npm_package_version'],
    version_name: process.env['VERSION_NAME'],
    web_accessible_resources: [
      {
        resources: ['quickbar.html'],
        matches: ['*://*/*'],
      },
    ],
  }),
  zip: {
    name: 'exoshell',
  },
} as UserConfig);
