'use client';

import { AppShell } from '@mantine/core';
import { FormRun } from './FormRun';
import { NavBar } from './NavBar';
import { Main } from './Main';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';

export const App: React.FC = () => {
  return (
    <AppShell header={{ height: 32 }} footer={{ height: 20 }}>
      <AppShell.Header data-tauri-drag-region>
        <Header />
      </AppShell.Header>

      <AppShell.Main h='100dvh' mah='100dvh'>
        <PanelGroup direction='horizontal' autoSaveId='main'>
          <Panel
            minSize={10}
            maxSize={30}
            defaultSize={10}
            className='select-none'
          >
            <NavBar />
          </Panel>
          <PanelResizeHandle className='w-px bg-gray-200' />
          <Panel>
            <Main />
          </Panel>
        </PanelGroup>
      </AppShell.Main>

      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
};

export const Header: React.FC = () => {
  return <></>;
};
