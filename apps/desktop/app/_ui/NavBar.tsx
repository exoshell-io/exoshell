import {
  useActiveTab,
  useDashboards,
  useDeleteScript,
  useOpenTab,
  useScripts,
  useUpsertDashboard,
  useUpsertScript,
  useUpsertWorkflow,
  useWorkflows,
} from '@/_state';
import { Box, NavLink, ScrollArea } from '@mantine/core';
import { useContextMenu } from 'mantine-contextmenu';
import { useMemo } from 'react';
import { LuWorkflow as IconWorkflow } from 'react-icons/lu';
import { MdDashboard as IconDashboard } from 'react-icons/md';
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

  // Workflows
  const workflows = useWorkflows();
  const workflowsLinks = useMemo(() => {
    if (!workflows.isSuccess) return [];
    return Object.values(workflows.data ?? []).map((workflow) => ({
      id: workflow.id!.id.String,
      label: workflow.name,
      link: `workflow://${workflow.id!.id.String}`,
    }));
  }, [workflows]);

  // Dashboards
  const dashboards = useDashboards();
  const dashboardsLinks = useMemo(() => {
    if (!dashboards.isSuccess) return [];
    return Object.values(dashboards.data ?? []).map((dashboard) => ({
      id: dashboard.id?.id!.String,
      label: dashboard.name,
      link: `dashboard://${dashboard.id!.id.String}`,
    }));
  }, [dashboards]);

  // Handlers
  const createScript = useUpsertScript();
  const createWorkflow = useUpsertWorkflow();
  const createDashboard = useUpsertDashboard();
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
        <NavLink label='Workflows' leftSection={<IconWorkflow />}>
          {useMemo(
            () =>
              workflowsLinks.map((workflow) => (
                <NavLink
                  key={workflow.id}
                  label={workflow.label}
                  onClick={() => {
                    openTab(workflow.link);
                  }}
                  active={activeTab?.href === workflow.link}
                />
              )),
            [activeTab?.href, openTab, workflowsLinks],
          )}
          <NavLink
            label='New'
            leftSection={<IconAdd />}
            onClick={() =>
              createWorkflow.mutate({
                workflow: {
                  id: null,
                  name: 'Untitled',
                },
              })
            }
          />
        </NavLink>
        <NavLink label='Dashboards' leftSection={<IconDashboard />}>
          {useMemo(
            () =>
              dashboardsLinks.map((dashboard) => (
                <NavLink
                  key={dashboard.id}
                  label={dashboard.label}
                  onClick={() => {
                    openTab(dashboard.link);
                  }}
                />
              )),
            [dashboardsLinks, openTab],
          )}
          <NavLink
            label='New'
            leftSection={<IconAdd />}
            onClick={() =>
              createDashboard.mutate({
                dashboard: { id: null, name: 'Untitled' },
              })
            }
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
