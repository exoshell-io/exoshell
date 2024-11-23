import { defineConfig, type UserConfig } from 'wxt';
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifestVersion: 2,
  // extensionApi: 'chrome',
  imports: {
    eslintrc: { enabled: 9 },
  },
  modules: ['@wxt-dev/auto-icons', '@wxt-dev/module-react'],
  autoIcons: {
    grayscaleOnDevelopment: false,
  },
  runner: {
    disabled: true,
  },
  // vite: () => ({
  //   plugins: [TanStackRouterVite()],
  // }),
  manifest: () => ({
    name: 'Exoshell',
    permissions: ['storage', 'nativeMessaging', 'activeTab', 'contextMenus'],
    // default_locale: 'en',
    browser_specific_settings: {
      gecko: {
        id: 'browser@exoshell.io',
      },
    },
  }),
  zip: {
    name: 'exoshell',
  },
} as UserConfig);
