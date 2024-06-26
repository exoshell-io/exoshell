import {
  useActiveTabIndex,
  useCloseTab,
  useDashboards,
  useScripts,
  useSetActiveTab,
  useTabs,
  useWorkflows,
} from '@/_state';
import { ActionIcon, Group, Tabs } from '@mantine/core';
import { RendererDashboard } from './RendererDashboard';
import { RendererSettings } from './RendererSettings';
import { RendererTerminal } from './RendererTerminal';
import { RendererWorkflow } from './RendererWorkflow';
import {
  IconClose,
  IconCompass,
  IconDashboard,
  IconSettings,
  IconSurreal,
  IconTerminal,
  IconWorkflow,
} from './icons';
import { RendererSurreal } from './RendererSurreal';
import { RendererDevModeOnly } from './RendererDevModeOnly';

export const Main: React.FC = () => {
  const tabs = useTabs();
  const activeTab = useActiveTabIndex();
  const scripts = useScripts();
  const workflows = useWorkflows();
  const dashboards = useDashboards();
  const closeTab = useCloseTab();
  const setActiveTab = useSetActiveTab();

  return (
    <>
      <Tabs
        value={`${activeTab}`}
        onChange={(newTab) =>
          setActiveTab(newTab !== null ? parseInt(newTab) : null)
        }
        activateTabWithKeyboard={false}
        display='flex'
        style={{ flexDirection: 'column' }}
        h='100%'
      >
        <Tabs.List>
          {tabs.map((tab, index) => {
            let tabLabel: string;
            let tabIcon: React.ReactNode;
            if (tab.href.startsWith('workflow://')) {
              tabLabel = workflows.isSuccess
                ? workflows.data[tab.href.substring('workflow://'.length)]?.name
                : workflows.isError
                  ? `Error: ${workflows.error}`
                  : `Loading`;
              tabIcon = <IconWorkflow />;
            } else if (tab.href.startsWith('dashboard://')) {
              tabLabel = dashboards.isSuccess
                ? dashboards.data[tab.href.substring('dashboard://'.length)]
                    ?.name
                : dashboards.isError
                  ? `Error: ${dashboards.error}`
                  : `Loading`;
              tabIcon = <IconDashboard />;
            } else if (tab.href.startsWith('terminal://')) {
              tabLabel = scripts.isSuccess
                ? scripts.data[tab.href.substring('terminal://'.length)]?.name
                : scripts.isError
                  ? `Error: ${scripts.error}`
                  : `Loading`;
              tabIcon = <IconTerminal />;
            } else if (tab.href === 'surreal') {
              tabLabel = 'Surreal';
              tabIcon = <IconSurreal />;
            } else if (tab.href === 'settings') {
              tabLabel = 'Settings';
              tabIcon = <IconSettings />;
            } else if (tab.href === 'devMode') {
              tabLabel = 'Dev Mode';
              tabIcon = <IconCompass />;
            } else {
              tabLabel = tab.href;
            }
            return (
              <Tabs.Tab
                key={`${tab.href}`}
                value={`${index}`}
                px={8}
                component='div' // Fix "forbidden button in button" warning
              >
                <Group
                  gap={6}
                  onClick={(e) => {
                    // Close tab on middle click
                    if (e.button === 1) {
                      e.stopPropagation();
                      closeTab(index);
                    }
                  }}
                >
                  {tabIcon}
                  {tabLabel}
                  <ActionIcon
                    variant='subtle'
                    color='black'
                    size='sm'
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(index);
                    }}
                  >
                    <IconClose />
                  </ActionIcon>
                </Group>
              </Tabs.Tab>
            );
          })}
        </Tabs.List>
        {tabs.map((tab, index) => {
          return (
            <Tabs.Panel
              key={`${tab.href}`}
              value={`${index}`}
              flex='1 0 10%'
              className='overflow-hidden'
            >
              {tab.href.startsWith('workflow://') ? (
                <RendererWorkflow
                  id={tab.href.substring('workflow://'.length)}
                />
              ) : tab.href.startsWith('dashboard://') ? (
                <RendererDashboard
                  id={tab.href.substring('dashboard://'.length)}
                />
              ) : tab.href.startsWith('terminal://') ? (
                <RendererTerminal
                  id={tab.href.substring('terminal://'.length)}
                />
              ) : tab.href === 'surreal' ? (
                <RendererSurreal />
              ) : tab.href === 'settings' ? (
                <RendererSettings />
              ) : tab.href === 'devMode' ? (
                <RendererDevModeOnly />
              ) : (
                tab.href
              )}
            </Tabs.Panel>
          );
        })}
      </Tabs>
    </>
  );
};
