'use client';

import { TextInput } from '@mantine/core';
import { UnlistenFn, listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/tauri';
import { appWindow } from '@tauri-apps/api/window';
import { useEffect } from 'react';

export const NoSsr: React.FC = () => {
  useEffect(() => {
    let mounted = true;
    let unlisten: UnlistenFn | null = null;
    async function listenEvents() {
      unlisten = await listen('tauri://blur', async (e) => {
        console.log(e);
        appWindow.hide();
        await invoke('close-quickbar');
      });
    }
    listenEvents();
    return () => {
      mounted = false;
    };
  });
  return (
    <div className='h-dvh w-dvw' data-tauri-drag-region>
      <TextInput />
    </div>
  );
};
