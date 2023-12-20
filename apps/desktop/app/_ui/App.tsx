'use client';

import { Accordion, Group, AppShell, NavLink } from '@mantine/core';
import { Editor } from './Editor';

export const App: React.FC = () => {
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ breakpoint: 0, width: 200 }}
      aside={{ breakpoint: 0, width: 200 }}
      footer={{ height: 60 }}
    >
      <AppShell.Header></AppShell.Header>

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
      <Group></Group>
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
          <Accordion.Panel>Running</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export const ScriptList: React.FC = () => {
  return (
    <>
      <NavLink label='Youtube DL' href='/script/youtube-dl' />
      <NavLink label='Video x2' />
    </>
  );
};

export const Running: React.FC = () => {
  return <>Running</>;
};
