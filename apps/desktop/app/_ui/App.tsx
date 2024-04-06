'use client';

import { AppShell } from '@mantine/core';

export const App: React.FC = () => {
  return (
    <AppShell
      header={{ height: 32 }}
      navbar={{ breakpoint: 0, width: 200 }}
      aside={{ breakpoint: 0, width: 200 }}
      footer={{ height: 20 }}
    >
      <AppShell.Header data-tauri-drag-region>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar className='text-user-select-none'>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Main />
      </AppShell.Main>

      <AppShell.Aside></AppShell.Aside>

      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
};

export const Header: React.FC = () => {
  return <></>;
};

export const NavBar: React.FC = () => {
  return <></>;
};

export const Main: React.FC = () => {
  return <></>;
};
