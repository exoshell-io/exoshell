import { useQueryClient } from '@tanstack/react-query';
import { listen, type UnlistenFn } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/tauri';
import { useEffect } from 'react';
import { queryKeys } from '.';

export const useBackendEvents = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    let isMounted = true;
    let unlisten: UnlistenFn | undefined = undefined;
    async function handleDatabaseEvents() {
      unlisten = await listen('plugin_ipc:script_run', (_event) => {
        if (isMounted)
          queryClient.invalidateQueries({ queryKey: queryKeys.scriptRuns });
      });
      await invoke('plugin:ipc|initialize');
    }
    handleDatabaseEvents();
    return () => {
      isMounted = false;
      unlisten?.();
    };
  }, [queryClient]);
};
