import {
  activeTabIndexAtom,
  closeTabAtom,
  setActiveTabAtom,
  tabsAtom,
  useDashboards,
  useScripts,
  useWorkflows,
} from '@/_state';
import { ActionIcon, Group, Tabs } from '@mantine/core';
import { useAtomValue, useSetAtom } from 'jotai';
import { RendererDashboard } from './RendererDashboard';
import { RendererTerminal } from './RendererTerminal';
import { RendererWorkflow } from './RendererWorkflow';
import { IconClose, IconDashboard, IconTerminal, IconWorkflow } from './icons';

export const Main: React.FC = () => {
  const tabs = useAtomValue(tabsAtom);
  const activeTab = useAtomValue(activeTabIndexAtom);
  const scripts = useScripts();
  const workflows = useWorkflows();
  const dashboards = useDashboards();
  const closeTab = useSetAtom(closeTabAtom);
  const setActiveTab = useSetAtom(setActiveTabAtom);

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
            } else {
              tabLabel = tab.href;
            }
            return (
              <Tabs.Tab
                key={`${tab.href}`}
                value={`${index}`}
                px={8}
                component='div' // Fix button in button warning
              >
                <Group gap={6}>
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
