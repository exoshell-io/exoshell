import { useStore } from '@/_state';
import { ActionIcon, Tabs, Group } from '@mantine/core';
import { RendererWorkflow } from './RendererWorkflow';
import { RendererDashboard } from './RendererDashboard';
import { IconClose, IconDashboard, IconWorkflow } from './icons';

export const Main: React.FC = () => {
  const tabs = useStore((store) => store.tabs);
  const activeTab = useStore((store) => store.activeTab);
  const setActiveTab = useStore((store) => store.setActiveTab);
  const closeTab = useStore((store) => store.closeTab);
  const workflows = useStore((store) => store.workflows);
  const dashboards = useStore((store) => store.dashboards);
  return (
    <>
      <Tabs
        value={`${activeTab}`}
        onChange={(newTab) =>
          setActiveTab(newTab !== null ? parseInt(newTab) : undefined)
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
              tabLabel = workflows[tab.href.substr(11)].name;
              tabIcon = <IconWorkflow />;
            } else if (tab.href.startsWith('dashboard://')) {
              tabLabel = dashboards[tab.href.substr(12)].name;
              tabIcon = <IconDashboard />;
            } else {
              tabLabel = tab.href;
            }
            return (
              <Tabs.Tab key={`${tab.href}`} value={`${index}`} px={8}>
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
            <Tabs.Panel key={`${tab.href}`} value={`${index}`} flex='1 0 10%'>
              {tab.href.startsWith('workflow://') ? (
                <RendererWorkflow
                  id={tab.href.substring('workflow://'.length)}
                />
              ) : tab.href.startsWith('dashboard://') ? (
                <RendererDashboard
                  id={tab.href.substring('dashboard://'.length)}
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
