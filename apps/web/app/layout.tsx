import '@mantine/core/styles/global.layer.css';
import '@mantine/code-highlight/styles.layer.css';
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.layer.css';
import './layout.css';

import { CSPostHogProvider } from '#/_analytics';
import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Signika, Sora } from 'next/font/google';
import { FrontLayout } from './FrontLayout';

const font = Sora({
  subsets: ['latin'],
  display: 'swap',
});

const logoFont = Signika({
  display: 'swap',
  variable: '--font-logo',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Home | ExoShell',
    template: '%s | ExoShell',
  },
  description: 'ExoShell is a program to run other programs',
};

const theme = createTheme({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${font.className} ${logoFont.variable} text-zinc-900`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <CSPostHogProvider>
        <body>
          <MantineProvider theme={theme}>
            <Notifications />
            <FrontLayout>{children}</FrontLayout>
          </MantineProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
