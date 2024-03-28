import '@mantine/core/styles.css';
import './globals.css';

import {
  Box,
  Burger,
  ColorSchemeScript,
  Container,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import type { Metadata } from 'next';
import { Signika, Noto_Sans } from 'next/font/google';
import { Logo } from '@/_ui/Logo';

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
          <Box
            component='header'
            px='md'
            h={64}
            className='flex items-center justify-between border-b'
          >
            <Logo />
            <Burger hiddenFrom='sm' size='sm' />
          </Box>
          <Box component='main'>{children}</Box>
          <Box component='footer' py={30} className='border-t'>
            <Container>
              <Logo />
            </Container>
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
