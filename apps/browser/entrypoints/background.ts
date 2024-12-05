import { browser } from 'wxt/browser';
import { defineBackground } from 'wxt/sandbox';
import { ipc } from '@/utils/ipc';

export default defineBackground(() => {
  setupButtonAction();
  setupContextMenu();
});

function setupButtonAction() {
  browser.action.onClicked.addListener((tab) => {
    if (tab.id === undefined) {
      // TODO: display notification about no tab id
      console.warn('No tab id to toggle quickbar');
      return;
    }
    void ipc.sendMessage('toggleQuickBar', undefined, tab.id);
  });
}

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
