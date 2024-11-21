import { defineConfig, type UserConfig } from 'wxt';
// import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  imports: {
    eslintrc: { enabled: 9 },
  },
  modules: ['@wxt-dev/auto-icons', '@wxt-dev/module-react'],
  autoIcons: {
    grayscaleOnDevelopment: false,
  },
  // vite: () => ({
  //   plugins: [TanStackRouterVite()],
  // }),
  manifest: () => ({
    name: 'Exoshell',
    permissions: ['storage', 'nativeMessaging', 'activeTab'],
    // default_locale: 'en',
    browser_specific_settings: {
      gecko: {
        id: 'browser@exoshell.io',
      },
    },
    page_action: {
      default_title: 'Exoshell',
      default_icon: 'icons/48.png',
      show_matches: ['*://*/*'],
    },
  }),
} as UserConfig);
