import '@mantine/core/styles.css';
import './globals.css';

import { Logo } from '@/_ui/Logo';
import {
  Box,
  Burger,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Stack,
  createTheme,
} from '@mantine/core';
import type { Metadata } from 'next';
import { Noto_Sans, Signika } from 'next/font/google';
import { Brand } from './_ui/Brand';

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
      <body className={`${font.className} ${logoFont.variable} text-zinc-900`}>
        <MantineProvider theme={theme}>
          <Box component='header'>
            <Container
              size='xl'
              h={70}
              px={16}
              className='flex items-center justify-between'
            >
              <Brand />
              <Burger hiddenFrom='md' size='sm' />
            </Container>
          </Box>
          <Box component='main'>{children}</Box>
          <Box
            component='footer'
            className='border-t border-solid border-gray-200 py-2'
          >
            <Container
              size='xl'
              h={70}
              px={16}
              className='flex items-center justify-between '
            >
              <Group align='end'>
                <>
                  <Logo />
                  <span className='text-xs'>@ {new Date().getFullYear()}</span>
                </>
              </Group>
            </Container>
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
