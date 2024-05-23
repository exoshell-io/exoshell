import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './globals.css';

import { CSPostHogProvider } from '@/_analytics';
import { Logo } from '@/_ui/Logo';
import {
  Box,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  createTheme,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from 'next';
import { Signika, Sora } from 'next/font/google';
import { Brand } from './_ui/Brand';

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
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <CSPostHogProvider>
        <body
          className={`${font.className} ${logoFont.variable} text-zinc-900`}
        >
          <MantineProvider theme={theme}>
            <Notifications />
            <Box component='header'>
              <Container
                size='xl'
                h={70}
                px={16}
                className='flex items-center justify-between'
              >
                <Brand />
                <Group gap='xl'>
                  {HEADER_MENU.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className='font-semibold text-zinc-900 underline-offset-4 hover:underline'
                    >
                      {link.label}
                    </a>
                  ))}
                </Group>
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
                    <span className='text-xs'>
                      @ {new Date().getFullYear()}
                    </span>
                  </>
                </Group>
              </Container>
            </Box>
          </MantineProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}

const HEADER_MENU: { href: string; label: string }[] = [
  {
    href: '#faq',
    label: 'FAQ',
  },
  {
    href: '#features',
    label: 'Features',
  },
  {
    href: '#newsletter',
    label: 'Newsletter',
  },
];
