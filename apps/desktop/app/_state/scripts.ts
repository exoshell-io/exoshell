import {
  type DefaultError,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { useCallback } from 'react';
import type { Script, ScriptRun } from '.';
import { queryKeys, useCloseTab, useOpenTab } from '.';

type State = { [key: string]: Script };

export const useScripts = <T = State>(
  options?: Omit<
    UseQueryOptions<State, DefaultError, T>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: queryKeys['scripts'],
    queryFn: async () => {
      const scripts = await invoke<Script[]>('list_scripts');
      return scripts.reduce<State>((acc, script) => {
        acc[script.id!.id.String] = script;
        return acc;
      }, {});
    },
    ...options,
  });
};

export const useScript = (id: string) => {
  return useScripts({
    select: useCallback((scripts: State) => scripts[id], [id]),
  });
};

export const useUpsertScript = () => {
  const queryClient = useQueryClient();
  const openTab = useOpenTab();
  return useMutation({
    mutationKey: ['upsertScript'],
    mutationFn: async ({
      script,
      focus = true,
    }: {
      script: Script;
      focus?: boolean;
    }) => {
      const _script = await invoke<Script>('upsert_script', {
        script,
      });
      const id = _script.id!.id.String;
      queryClient.setQueryData(queryKeys['scripts'], (prevData: State) => {
        return {
          ...prevData,
          [id]: _script,
        };
      });
      openTab(`terminal://${id}`, focus);
      return _script;
    },
  });
};

export const useDeleteScript = () => {
  const queryClient = useQueryClient();
  const closeTab = useCloseTab();
  return useMutation({
    mutationKey: ['deleteScript'],
    mutationFn: async ({ id }: { id: string }) => {
      await invoke('delete_script', { id });
      closeTab(`terminal://${id}`);
      queryClient.setQueryData(['scripts'], (prevData: State) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete prevData[id];
        return { ...prevData };
      });
    },
  });
};

export const useRunScript = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['runScript'],
    mutationFn: async ({ script }: { script: Script }) => {
      const scriptRun = await invoke<ScriptRun>('run_script', {
        script,
      });
      await queryClient.invalidateQueries({
        queryKey: [...queryKeys['scriptRuns'], script.id!.id.String],
      });
      return scriptRun;
    },
  });
};
