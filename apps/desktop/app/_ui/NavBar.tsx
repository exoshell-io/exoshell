'use client';

import { Dashboard, Workflow, useStore } from '@/_state';
import { Box, NavLink, ScrollArea } from '@mantine/core';
import { useMemo } from 'react';
import { LuWorkflow as IconWorkflow } from 'react-icons/lu';
import { MdDashboard as IconDashboard } from 'react-icons/md';
import { IoMdAdd as IconAdd } from 'react-icons/io';

export const NavBar: React.FC = () => {
  // Workflows
  const workflows = useStore((store) => store.workflows);
  const workflowsLinks = useMemo(() => {
    return Object.values<Workflow>(workflows).map((workflow) => ({
      label: workflow.name,
      link: `workflow://${workflow.id}`,
    }));
  }, [workflows]);

  // Dashboards
  const dashboards = useStore((store) => store.dashboards);
  const dashboardsLinks = useMemo(() => {
    return Object.values<Dashboard>(dashboards).map((dashboard) => ({
      label: dashboard.name,
      link: `dashboard://${dashboard.id}`,
    }));
  }, [dashboards]);

  // Handlers
  const openTab = useStore((store) => store.openTab);
  const createWorkflow = useStore((store) => store.createWorkflow);
  const createDashboard = useStore((store) => store.createDashboard);

  return (
    <Box component='nav'>
      <ScrollArea>
        <NavLink label='Workflows' leftSection={<IconWorkflow />}>
          {useMemo(
            () =>
              workflowsLinks.map((workflow) => (
                <NavLink
                  key={workflow.label}
                  label={workflow.label}
                  onClick={() => {
                    console.log('workflow.link', workflow.link);
                    openTab(workflow.link);
                  }}
                />
              )),
            [openTab, workflowsLinks],
          )}
          <NavLink
            label='New'
            leftSection={<IconAdd />}
            onClick={() => createWorkflow(true)}
          />
        </NavLink>
        <NavLink label='Dashboards' leftSection={<IconDashboard />}>
          {useMemo(
            () =>
              dashboardsLinks.map((dashboard) => (
                <NavLink
                  key={dashboard.label}
                  label={dashboard.label}
                  onClick={() => {
                    console.log('dashboard.link', dashboard.link);
                    openTab(dashboard.link);
                  }}
                />
              )),
            [dashboardsLinks, openTab],
          )}
          <NavLink
            label='New'
            leftSection={<IconAdd />}
            onClick={() => createDashboard(true)}
          />
        </NavLink>
      </ScrollArea>
    </Box>
  );
};
