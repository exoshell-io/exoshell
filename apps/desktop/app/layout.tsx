import '@mantine/code-highlight/styles.layer.css';
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import '@mantine/spotlight/styles.layer.css';
import 'allotment/dist/style.css';
import 'mantine-contextmenu/styles.layer.css';
import 'reactflow/dist/style.css';
import './layout.css';

import { JotaiProvider, ReactQueryProvider } from '@/_providers';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ContextMenuProvider } from 'mantine-contextmenu';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>
          <Notifications />
          <ContextMenuProvider borderRadius='md'>
            <JotaiProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </JotaiProvider>
          </ContextMenuProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
