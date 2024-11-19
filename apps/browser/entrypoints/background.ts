export default defineBackground(() => {
  browser.contextMenus.create({
    id: 'exoshell',
    title: 'Exoshell',
    contexts: ['all'],
  });

  const port = browser.runtime.connectNative(
    import.meta.env.FIREFOX ? 'exoshell' : 'io.exoshell.exoshell',
  );

  port.onMessage.addListener((msg: string) => {
    console.info(`Native message received: ${msg}`);
  });
});
