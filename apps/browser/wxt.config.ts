import { defineConfig, type UserConfig } from 'wxt';
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

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
  }),
  zip: {
    name: 'exoshell',
  },
} as UserConfig);
