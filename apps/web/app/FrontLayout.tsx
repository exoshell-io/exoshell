'use client';

import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Box,
  Burger,
  Container,
  Drawer,
  Group,
  MantineSize,
  NavLink,
} from '@mantine/core';
import { useDisclosure, useHeadroom, useWindowScroll } from '@mantine/hooks';
import { Brand } from './_ui/Brand';
import { Logo } from './_ui/Logo';
import { SearchBar } from './_ui/SearchBar';
import { Auth } from './_ui/auth/Auth';

export const FrontLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [navbarOpened, { toggle: toggleNavbar }] = useDisclosure();
  const showHeader = useHeadroom({ fixedAt: 70 });
  const [{ y: scrollY }] = useWindowScroll();

  return (
    <AppShell header={{ height: 70, collapsed: !showHeader, offset: false }}>
      <AppShellHeader withBorder={scrollY > 80}>
        <Container
          size='xl'
          h='100%'
          px={16}
          className='flex items-center justify-between'
        >
          <Group>
            <Burger
              opened={navbarOpened}
              onClick={toggleNavbar}
              hiddenFrom={NAVBAR_BREAKPOINT}
              size='sm'
            />
            <Brand />
          </Group>
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
          <Group gap='xs'>
            <SearchBar />
            <Auth />
          </Group>
        </Container>
      </AppShellHeader>
      <Drawer
        opened={navbarOpened}
        onClose={toggleNavbar}
        size='xs'
        title={<Brand />}
      >
        {HEADER_MENU.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            onClick={toggleNavbar}
          />
        ))}
      </Drawer>
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
