import {
  type TabWithContentV1,
  useActiveTab,
  useTabsWithContent,
} from '@/hooks/storage';
import {
  ActionIcon,
  Box,
  Loader,
  ScrollArea,
  Stack,
  Tabs,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { Allotment } from 'allotment';
import { FaCode as IconCode, FaCog as IconSettings } from 'react-icons/fa';
import { FileEditor } from './FileEditor';
import { FileSettingsEditor } from './FileSettingsEditor';
import { Settings } from './Settings';
import { IconSave, IconDiff } from '@/utils/icons';
import { updateFile } from '@/utils/storage';

export const AppMain: React.FC = () => {
  const [activeTab, setActiveTab] = useActiveTab();
  const tabsWithContent = useTabsWithContent();

  const activeTabWithContent = useMemo(() => {
    return tabsWithContent.find((tab) => tab.uri === activeTab)!;
  }, [activeTab, tabsWithContent]);

  return (
    <Stack gap={0} h='calc(100dvh - var(--app-shell-header-height))'>
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value='settings'>Settings</Tabs.Tab>
          {tabsWithContent.map((tab) => {
            if (tab.type === 'file') {
              return (
                <Tabs.Tab key={tab.uri} value={tab.uri}>
                  {tab.file?.name ?? 'Loading'}
                </Tabs.Tab>
              );
            }
            return null;
          })}
        </Tabs.List>
      </Tabs>
      {activeTab === 'settings' || activeTab === null ? (
        <Settings />
      ) : (
        <Inner tab={activeTabWithContent} />
      )}
    </Stack>
  );
};

interface InnerProps {
  tab: TabWithContentV1;
}

const Inner: React.FC<Readonly<InnerProps>> = ({ tab }) => {
  const [isCodeVisible, toggleCodeVisible] = useToggle([true, false]);
  const [isSettingsVisible, toggleSettingsVisible] = useToggle([true, false]);

  const editorRef = useRef<React.ComponentRef<typeof FileEditor>>(null);

  const handlePanelVisibilityChange = (index: number, visible: boolean) => {
    if (index === 0) {
      toggleCodeVisible(visible);
    } else if (index === 1) {
      toggleSettingsVisible(visible);
    }
  };

  return (
    <Stack h='100%' gap={0}>
      {tab.type === 'file' && (
        <>
          <Box
            style={{
              borderBottom: '1px solid gray',
            }}
          >
            <ActionIcon.Group p='xs'>
              <ActionIcon
                variant='default'
                title='editor'
                onClick={() => {
                  toggleCodeVisible();
                }}
              >
                <IconCode
                  stroke='1.5rem'
                  color={isCodeVisible ? 'blue' : undefined}
                />
              </ActionIcon>
              <ActionIcon
                variant='default'
                title='settings'
                onClick={() => {
                  toggleSettingsVisible();
                }}
              >
                <IconSettings
                  stroke='1.5rem'
                  color={isSettingsVisible ? 'blue' : undefined}
                />
              </ActionIcon>
              <ActionIcon
                variant='default'
                title='Save'
                onClick={() => {
                  if (tab.file !== undefined) {
                    const value = editorRef.current?.getValue();
                    if (value)
                      void updateFile({
                        ...tab.file,
                        content: value,
                      });
                  }
                }}
              >
                <IconSave />
              </ActionIcon>
              <ActionIcon variant='default' title='Diff'>
                <IconDiff />
              </ActionIcon>
            </ActionIcon.Group>
          </Box>
          <Allotment onVisibleChange={handlePanelVisibilityChange}>
            <Allotment.Pane visible={isCodeVisible}>
              {tab.file !== undefined ? (
                <FileEditor path={tab.file.id} ref={editorRef} />
              ) : (
                <Loader />
              )}
            </Allotment.Pane>
            <Allotment.Pane
              visible={isSettingsVisible}
              minSize={172}
              preferredSize={500}
              snap
            >
              <ScrollArea h='100%'>
                {tab.file !== undefined ? (
                  <FileSettingsEditor path={tab.file.id} />
                ) : (
                  <Loader />
                )}
              </ScrollArea>
            </Allotment.Pane>
          </Allotment>
        </>
      )}
    </Stack>
  );
};
