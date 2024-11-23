import { browser } from 'wxt/browser';
import { defineBackground } from 'wxt/sandbox';

export default defineBackground(() => {
  browser.contextMenus.create({
    id: 'exoshell',
    title: 'Exoshell',
    contexts: ['all'],
  });

  browser.contextMenus.onClicked.addListener((info, tab) => {
    console.log('info: ', info);
    console.log('tab: ', tab);
  });

  const port = browser.runtime.connectNative(
    import.meta.env.FIREFOX ? 'exoshell' : 'io.exoshell.exoshell',
  );

  port.onMessage.addListener((msg: unknown) => {
    console.info(`Native message received: ${msg as string}`);
  });
});
