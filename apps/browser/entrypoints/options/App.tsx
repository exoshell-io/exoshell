import '@mantine/core/styles.css';

import { AppShell, MantineProvider } from '@mantine/core';
import { AppMain } from './AppMain';
import { FileTree } from './FileTree';

export const App: React.FC = () => {
  return (
    <MantineProvider>
      <Layout />
    </MantineProvider>
  );
};

export const Layout: React.FC = () => {
  return (
    <AppShell
      header={{
        height: 50,
      }}
      navbar={{
        width: 200,
        breakpoint: 'xs',
      }}
    >
      <AppShell.Header withBorder>Exoshell</AppShell.Header>
      <AppShell.Navbar>
        <FileTree />
      </AppShell.Navbar>
      <AppShell.Main>
        <AppMain />
      </AppShell.Main>
    </AppShell>
  );
};
