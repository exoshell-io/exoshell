import { defineContentScript } from 'wxt/sandbox';

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    console.log('ExoShell content script running');
  },
});
