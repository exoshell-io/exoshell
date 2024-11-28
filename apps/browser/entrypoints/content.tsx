import { defineContentScript } from 'wxt/sandbox';
import { ipc } from '@/utils/ipc';
import ReactDOM from 'react-dom/client';
import { Quickbar } from '@/components/Quickbar';
import '@/assets/global.css';

export default defineContentScript({
  matches: ['*://*/*'],
  cssInjectionMode: 'ui',
  async main(ctx) {
    console.log('ExoShell content script running');

    // Setup quickbar
    const ui = await createShadowRootUi(ctx, {
      name: 'exoshell-quickbar',
      position: 'modal',
      anchor: 'body',
      zIndex: 999999,
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<Quickbar />);
        return { root, container };
      },
      onRemove: (root) => {
        root?.root.unmount();
        root?.container.remove();
      },
    });
    ui.mount();

    // Listen for messages from the background script
    ipc.onMessage('runScript', (message) => {
      console.log('Running script:', message.data);
      eval(message.data);
    });
  },
});
