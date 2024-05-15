'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';
import { useSetAtom } from 'jotai';
import type { Script, ScriptRun } from '.';
import { closeTabAtom, openTabAtom } from '.';

const queryKeys = {
  scripts: ['scripts'] as const,
  scriptRuns: ['scriptRuns'] as const,
} as const;

type Data = {
  scripts: { [key: string]: Script };
  scriptRuns: { [key: string]: { [key: string]: ScriptRun } };
};

export const useScripts = () => {
  return useQuery<Data['scripts']>({
    queryKey: queryKeys.scripts,
    queryFn: async () => {
      const scripts = await invoke<Script[]>('plugin:ipc|list_scripts');
      return scripts.reduce(
        (acc, script) => {
          acc[script.id!.id.String] = script;
          return acc;
        },
        {} as Data['scripts'],
      );
    },
  });
};

export const useUpsertScript = () => {
  const queryClient = useQueryClient();
  const openTab = useSetAtom(openTabAtom);
  return useMutation({
    mutationKey: ['upsertScript'],
    mutationFn: async ({
      script,
      focus = true,
    }: {
      script: Script;
      focus?: boolean;
    }) => {
      const _script = await invoke<Script>('plugin:ipc|upsert_script', {
        script,
      });
      const id = _script.id!.id.String;
      queryClient.setQueryData(
        queryKeys.scripts,
        (prevData: Data['scripts']) => {
          return {
            ...prevData,
            [id]: _script,
          };
        },
      );
      openTab(`terminal://${id}`, focus);
      return _script;
    },
  });
};

export const useDeleteScript = () => {
  const queryClient = useQueryClient();
  const closeTab = useSetAtom(closeTabAtom);
  return useMutation({
    mutationKey: ['deleteScript'],
    mutationFn: async ({ id }: { id: string }) => {
      await invoke('plugin:ipc|delete_script', { id });
      closeTab(`terminal://${id}`);
      queryClient.setQueryData(['scripts'], (prevData: Data['scripts']) => {
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
      const scriptRun = await invoke<ScriptRun>('plugin:ipc|run_script', {
        script,
      });
      queryClient.setQueryData(
        queryKeys.scriptRuns,
        (prevData: Data['scriptRuns']) => {
          return {
            ...prevData,
            [script.id!.id.String]: {
              ...prevData[script.id!.id.String],
              [scriptRun.id!.id.String]: scriptRun,
            },
          };
        },
      );
    },
  });
};

export const useScriptRuns = () => {
  return useQuery<Data['scriptRuns']>({
    queryKey: queryKeys.scriptRuns,
    queryFn: async () => {
      const scriptRuns = await invoke<ScriptRun[]>(
        'plugin:ipc|list_script_runs',
      );
      return scriptRuns.reduce(
        (acc, scriptRun) => {
          const scriptId = scriptRun.script.id!.id.String;
          if (acc[scriptId] === undefined) {
            acc[scriptId] = {};
          }
          acc[scriptId][scriptRun.id!.id.String] = scriptRun;
          return acc;
        },
        {} as Data['scriptRuns'],
      );
    },
  });
};

export const useDeleteScriptRun = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteScriptRun'],
    mutationFn: async ({ scriptId, id }: { scriptId?: string; id: string }) => {
      await invoke('plugin:ipc|delete_script_run', { id });
      queryClient.setQueryData(
        ['scriptRuns'],
        (prevData: Data['scriptRuns']) => {
          if (scriptId !== undefined) {
            delete prevData[scriptId][id];
          } else {
            Object.keys(prevData).forEach((scriptId) => {
              delete prevData[scriptId][id];
            });
          }
          return { ...prevData };
        },
      );
    },
  });
};
