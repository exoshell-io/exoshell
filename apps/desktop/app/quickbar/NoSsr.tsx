'use client';

import { useScripts } from '@/_state';
import { useHotkeys } from '@mantine/hooks';
import { Spotlight, SpotlightActionData } from '@mantine/spotlight';
import { TauriEvent, UnlistenFn } from '@tauri-apps/api/event';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { useEffect, useMemo } from 'react';
const appWindow = getCurrentWebviewWindow();

export const NoSsr: React.FC = () => {
  useEffect(() => {
    let unlisten: UnlistenFn | null = null;
    async function listenEvents() {
      unlisten = await appWindow.listen(TauriEvent.WINDOW_BLUR, () => {
        void hideWindow();
      });
    }
    void listenEvents();
    return () => {
      unlisten?.();
    };
  });
  useHotkeys([['escape', hideWindow]], []);
  const scripts = useScripts();
  const spotlightActions = useMemo<SpotlightActionData[]>(
    () =>
      !scripts.isSuccess
        ? []
        : Object.values(scripts.data).map<SpotlightActionData>((script) => ({
            id: script.id!.id.String,
            label: script.name,
            description: script.command,
            onClick: console.log,
          })),
    [scripts.data, scripts.isSuccess],
  );
  return (
    <div>
      <Spotlight
        trapFocus={true}
        actions={spotlightActions}
        nothingFound='No results'
        size='xl'
        searchProps={{
          placeholder: 'ExoSearch',
        }}
        scrollable
        forceOpened
        withOverlay={false}
        fullScreen
        shortcut={null}
      />
    </div>
  );
};

async function hideWindow() {
  console.log('Hiding window');
  await appWindow.hide();
}
