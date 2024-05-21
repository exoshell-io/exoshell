'use client';

import { useScripts } from '@/_state';
import { useHotkeys } from '@mantine/hooks';
import { Spotlight, SpotlightActionData } from '@mantine/spotlight';
import { UnlistenFn, listen } from '@tauri-apps/api/event';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect, useMemo } from 'react';

export const NoSsr: React.FC = () => {
  useEffect(() => {
    let mounted = true;
    let unlisten: UnlistenFn | null = null;
    async function listenEvents() {
      unlisten = await listen('tauri://blur', async (e) => {
        if (e.windowLabel === 'quickbar') {
          hideWindow();
        }
      });
    }
    listenEvents();
    return () => {
      mounted = false;
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
            description: `${script.command}`,
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

function hideWindow() {
  appWindow.hide();
}
