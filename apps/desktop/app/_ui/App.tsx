'use client';

import { Accordion, AppShell, Button, Group, NavLink } from '@mantine/core';
import { Editor } from './Editor';
import { ScriptList } from './ScriptList';
import { addScript, addScriptRunLog } from '@/_store';
import { ScriptRunList } from './ScriptRunList';

export const App: React.FC = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ breakpoint: 0, width: 200 }}
      aside={{ breakpoint: 0, width: 200 }}
      footer={{ height: 60 }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Editor />
      </AppShell.Main>

      <AppShell.Aside></AppShell.Aside>

      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
};

export const Header: React.FC = () => {
  return (
    <>
      <Group>
        <Button
          onClick={() => {
            addScript();
          }}
        >
          C
        </Button>
        <Button
          onClick={() => {
            addScriptRunLog();
          }}
        >
          A
        </Button>
      </Group>
    </>
  );
};

export const NavBar: React.FC = () => {
  return (
    <>
      <NavLink label='Home' href='/' />
      <Accordion>
        <Accordion.Item value='Scripts'>
          <Accordion.Control>Scripts</Accordion.Control>
          <Accordion.Panel>
            <ScriptList />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value='Running'>
          <Accordion.Control>Running</Accordion.Control>
          <Accordion.Panel>
            <ScriptRunList />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};
