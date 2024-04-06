import '@mantine/core/styles.css';
import './global.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { App } from './_ui/App';
import { ReactQueryProvider } from './_ui/ReactQueryProvider';

export default function RootLayout() {
  return (
    <html>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ReactQueryProvider>
          <MantineProvider>
            <App />
          </MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
