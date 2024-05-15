import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/code-highlight/styles.css';
import 'mantine-contextmenu/styles.css';
import 'allotment/dist/style.css';
import 'reactflow/dist/style.css';
import 'jotai-devtools/styles.css';
import './global.css';

import { JotaiProvider, ReactQueryProvider } from '@/_providers';
import { App } from '@/_ui/App';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ContextMenuProvider } from 'mantine-contextmenu';

export default function RootLayout() {
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <ContextMenuProvider borderRadius='md'>
            <ReactQueryProvider>
              <JotaiProvider>
                <App />
              </JotaiProvider>
            </ReactQueryProvider>
          </ContextMenuProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
