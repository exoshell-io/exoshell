'use client';

import {
  useBackendEvents,
  useLeftBarVisibility,
  useSetLeftBarVisibility,
} from '@/_state';
import {
  ActionIcon,
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Box,
  Group,
  ScrollArea,
} from '@mantine/core';
import { Allotment } from 'allotment';
import { useMemo } from 'react';
import { Main } from './Main';
import { NavBar } from './NavBar';
import { IconLeftPanelClosed, IconLeftPanelOpen } from './icons';

export const App: React.FC = () => {
  const leftBarVisibility = useLeftBarVisibility();
  const setLeftBarVisibility = useSetLeftBarVisibility();
  const handlePanelVisibilityChange = (index: number, visible: boolean) => {
    if (index === 0) {
      setLeftBarVisibility(visible);
    }
  };
  useBackendEvents();
  return (
    <Box>
      <AppShell header={{ height: 32 }} footer={{ height: 20 }}>
        <AppShellHeader data-tauri-drag-region>
          <Header />
        </AppShellHeader>

        <AppShellMain h='100dvh' mah='100dvh'>
          <Allotment onVisibleChange={handlePanelVisibilityChange}>
            <Allotment.Pane
              minSize={172}
              preferredSize={172}
              className='select-none'
              snap
              visible={leftBarVisibility}
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
  const setLeftBarVisibility = useSetLeftBarVisibility();
  const leftBarVisibility = useLeftBarVisibility();
  const iconStyles = useMemo<React.CSSProperties>(
    () => ({
      width: '90%',
      height: '90%',
    }),
    [],
  );
  return (
    <>
      <Group justify='right' data-tauri-drag-region h='100%' px='xs'>
        <ActionIcon
          variant='subtle'
          color='gray'
          onClick={() => setLeftBarVisibility(!leftBarVisibility)}
          size={20}
        >
          {leftBarVisibility ? (
            <IconLeftPanelOpen style={iconStyles} />
          ) : (
            <IconLeftPanelClosed style={iconStyles} />
          )}
        </ActionIcon>
      </Group>
    </>
  );
};
