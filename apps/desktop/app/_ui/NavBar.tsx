import {
  useActiveTab,
  useDeleteScript,
  useOpenTab,
  useScripts,
  useUpsertScript,
} from '@/_state';
import { Box, NavLink, ScrollArea } from '@mantine/core';
import { useContextMenu } from 'mantine-contextmenu';
import { useMemo } from 'react';
import {
  IconAdd,
  IconCompass,
  IconConnection,
  IconRefresh,
  IconSettings,
  IconSurreal,
  IconTerminal,
  IconTrash,
} from './icons';

export const NavBar: React.FC = () => {
  const activeTab = useActiveTab();
  const openTab = useOpenTab();

  const scripts = useScripts();
  const scriptsLinks = useMemo(() => {
    return Object.values(scripts.data ?? []).map((terminal) => ({
      id: terminal.id!.id.String,
      label: terminal.name,
      link: `terminal://${terminal.id!.id.String}`,
    }));
  }, [scripts]);

  // Handlers
  const createScript = useUpsertScript();
  const deleteScript = useDeleteScript();

  const { showContextMenu } = useContextMenu();

  return (
    <Box component='nav'>
      <ScrollArea>
        <NavLink
          label='Terminals'
          leftSection={<IconTerminal />}
          onContextMenu={showContextMenu([
            {
              key: 'Refresh',
              icon: <IconRefresh size={16} />,
              onClick: () => scripts.refetch(),
            },
          ])}
        >
          {scriptsLinks.map((terminal) => (
            <NavLink
              key={terminal.id}
              label={<>{terminal.label}</>}
              onClick={() => {
                openTab(terminal.link);
              }}
              active={activeTab?.href === terminal.link}
              onContextMenu={showContextMenu([
                {
                  key: 'Refresh',
                  icon: <IconRefresh size={16} />,
                  onClick: () => scripts.refetch(),
                },
                {
                  key: 'Delete',
                  color: 'red',
                  icon: <IconTrash size={16} />,
                  onClick: () => deleteScript.mutate({ id: terminal.id }),
                },
              ])}
            />
          ))}
          <NavLink
            label='New'
            leftSection={<IconAdd />}
            onClick={() => {
              createScript.mutate({
                script: {
                  id: null,
                  name: 'Untitled',
                  command: '',
                  args: [],
                  env: {},
                  workingDir: null,
                },
                focus: true,
              });
            }}
          />
        </NavLink>

        <NavLink label='Connections' leftSection={<IconConnection />}>
          <NavLink label='Local' />
          <NavLink label='New' leftSection={<IconAdd />} />
        </NavLink>
        <NavLink label='Queries' leftSection={<IconSurreal />}>
          <NavLink
            label='Add'
            leftSection={<IconAdd />}
            onClick={() => openTab('surreal')}
          />
        </NavLink>
        <NavLink
          label='Settings'
          leftSection={<IconSettings />}
          onClick={() => openTab('settings')}
        />
        {process.env.NODE_ENV === 'development' && (
          <NavLink
            label='DevModeOnly'
            leftSection={<IconCompass />}
            onClick={() => openTab('devMode')}
          />
        )}
      </ScrollArea>
    </Box>
  );
};
