import '@mantine/core/styles.css';
import './globals.css';

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Burger,
  ColorSchemeScript,
  MantineProvider,
  Text,
  createTheme,
} from '@mantine/core';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>
          <AppShell header={{ height: 64 }}>
            <AppShellHeader
              px='md'
              display='flex'
              style={{
                alignItems: 'center',
              }}
            >
              <Text>ExoShell</Text>
              <Burger hiddenFrom='sm' size='sm' />
            </AppShellHeader>
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  );
}
