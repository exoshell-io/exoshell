import '@mantine/core/styles.css';
import './globals.css';

import { Logo } from '@/_ui/Logo';
import {
  Box,
  Burger,
  ColorSchemeScript,
  Container,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import type { Metadata } from 'next';
import { Noto_Sans, Signika } from 'next/font/google';
import classes from './layout.module.css';

const logoFont = Signika({
  // weight: ['400', '700'],
  display: 'swap',
  variable: '--font-logo',
  subsets: ['latin'],
});

const font = Noto_Sans({ subsets: ['latin'], display: 'swap' });

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
      <body className={`${font.className} ${logoFont.variable}`}>
        <MantineProvider theme={theme}>
          <Box component='header' h={70} px={32} className={classes.header}>
            <Logo />
            <Burger hiddenFrom='sm' size='sm' />
          </Box>
          <Box component='main'>{children}</Box>
          <Box component='footer' h={70} px={32} className={classes.footer}>
            <Logo />
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
