import { browser } from 'wxt/browser';
import { defineBackground } from 'wxt/sandbox';

export default defineBackground(() => {
  setupContextMenu();
});

function setupContextMenu() {
  browser.contextMenus.create({
    id: 'exoshell',
    title: 'Exoshell',
    contexts: ['all'],
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    console.log('info: ', info);
    console.log('tab: ', tab);
  });
}
