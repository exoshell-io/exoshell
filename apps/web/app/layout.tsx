import '@mantine/core/styles.css';
import './globals.css';

import {
  Box,
  Burger,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Text,
  createTheme,
} from '@mantine/core';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FaTerminal } from 'react-icons/fa';

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

const Logo: React.FC = () => {
  return (
    <Group gap='sm'>
      <FaTerminal size={28} />
      <Text size='xl' fw='bold'>
        ExoShell
      </Text>
    </Group>
  );
};
