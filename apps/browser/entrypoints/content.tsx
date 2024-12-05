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
      onMount: (container, _shadow, shadowHost) => {
        shadowHost.style.display = 'none';
        const wrapper = document.createElement('div');
        const root = ReactDOM.createRoot(wrapper);
        root.render(<Quickbar />);
        container.appendChild(wrapper);
        return { root, wrapper };
      },
      onRemove: (root) => {
        root?.root.unmount();
        root?.wrapper.remove();
      },
    });
    ui.mount();

    ipc.onMessage('toggleQuickBar', (_message) => {
      if (ui.mounted === undefined) {
        // Quickbar is not mounted
        // TODO: display notification about reloading the page
        return;
      }
      if (_message.data !== undefined) {
        ui.shadowHost.style.display = _message.data ? 'block' : 'none';
      } else {
        ui.shadowHost.style.display =
          ui.shadowHost.style.display === 'none' ? 'block' : 'none';
      }
    });

    // Listen for messages from the background script
    ipc.onMessage('runScript', (message) => {
      console.log('Running script:', message.data);
      eval(message.data);
    });
  },
});
