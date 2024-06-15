'use client';

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Box,
  Burger,
  Container,
  Group,
  MantineSize,
  NavLink,
} from '@mantine/core';
import { useDisclosure, useHeadroom, useWindowScroll } from '@mantine/hooks';
import { Brand } from './_ui/Brand';
import { Logo } from './_ui/Logo';

export const FrontLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [burgerOpened, { toggle: toggleBurger }] = useDisclosure();
  const showHeader = useHeadroom({ fixedAt: 70 });
  const [{ y: scrollY }] = useWindowScroll();

  return (
    <AppShell
      header={{ height: 70, collapsed: !showHeader, offset: false }}
      navbar={{
        width: 300,
        breakpoint: NAVBAR_BREAKPOINT,
        collapsed: { desktop: true, mobile: !burgerOpened },
      }}
    >
      <AppShellHeader withBorder={scrollY > 80}>
        <Container
          size='xl'
          h='100%'
          px={16}
          className='flex items-center justify-between'
        >
          <Brand />
          <Burger
            opened={burgerOpened}
            onClick={toggleBurger}
            hiddenFrom={NAVBAR_BREAKPOINT}
            size='sm'
          />
          <Group gap='xl' visibleFrom={NAVBAR_BREAKPOINT}>
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
      </AppShellHeader>
      <AppShellNavbar>
        {HEADER_MENU.map((link) => (
          <NavLink key={link.href} href={link.href} label={link.label} />
        ))}
      </AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
      <Box
        component='footer'
        className='border-0 border-t border-solid border-gray-200 py-2'
      >
        <Container
          size='xl'
          h={70}
          px={16}
          className='flex items-center justify-between'
        >
          <Group align='end'>
            <>
              <Logo />
              <span className='text-xs'>@ {new Date().getFullYear()}</span>
            </>
          </Group>
        </Container>
      </Box>
    </AppShell>
  );
};

const NAVBAR_BREAKPOINT: MantineSize = 'xs';

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
