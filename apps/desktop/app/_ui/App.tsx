'use client';

import {
  ActionIcon,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Box,
  Group,
  ScrollArea,
  Tooltip,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Allotment } from 'allotment';
import { Main } from './Main';
import { NavBar } from './NavBar';
import { IconLeftPanelClosed, IconLeftPanelOpen } from './icons';

export const App: React.FC = () => {
  return (
    <Box>
      <AppShell header={{ height: 32 }} footer={{ height: 20 }}>
        <AppShellHeader data-tauri-drag-region>
          <Header />
        </AppShellHeader>

        <AppShellMain h='100dvh' mah='100dvh'>
          <Allotment>
            <Allotment.Pane
              minSize={172}
              preferredSize={172}
              className='select-none'
              snap
            >
              <ScrollArea h='100%'>
                <NavBar />
              </ScrollArea>
            </Allotment.Pane>
            <Allotment.Pane>
              <Main />
            </Allotment.Pane>
          </Allotment>
        </AppShellMain>

        <AppShellFooter></AppShellFooter>
      </AppShell>
    </Box>
  );
};

export const Header: React.FC = () => {
  const [toggle, toggleToggle] = useToggle();
  return (
    <>
      <Group justify='right' data-tauri-drag-region h='100%' px='xs'>
        <Tooltip label='TODO'>
          <ActionIcon
            variant='subtle'
            color='gray'
            onClick={() => toggleToggle()}
          >
            {toggle ? <IconLeftPanelOpen /> : <IconLeftPanelClosed />}
          </ActionIcon>
        </Tooltip>
      </Group>
    </>
  );
};
