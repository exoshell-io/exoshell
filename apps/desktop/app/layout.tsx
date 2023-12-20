import '@mantine/core/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { App } from './_ui/App';
import { ReactQueryProvider } from './_ui/ReactQueryProvider';

export default function RootLayout() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
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
