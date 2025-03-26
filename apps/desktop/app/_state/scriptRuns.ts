import {
  useMutation,
  useQuery,
  useQueryClient,
  type DefaultError,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';
import { queryKeys, type ScriptRun } from '.';

export const useScriptRuns = <T = ScriptRun[]>(
  scriptId: string,
  options?: Omit<
    UseQueryOptions<ScriptRun[], DefaultError, T>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: [...queryKeys['scriptRuns'], scriptId],
    queryFn: async () => {
      const scriptRuns = await invoke<ScriptRun[]>(
        'list_script_runs_by_script',
        { scriptId },
      );
      return scriptRuns;
    },
    ...options,
  });
};

export const useDeleteScriptRun = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteScriptRun'],
    mutationFn: async ({ scriptId, id }: { scriptId?: string; id: string }) => {
      await invoke('delete_script_run', { id });
      await queryClient.invalidateQueries({
        queryKey: [...queryKeys['scriptRuns'], scriptId],
      });
    },
  });
};

export const useDeleteScriptRuns = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteScriptRuns'],
    mutationFn: async ({ scriptId }: { scriptId: string }) => {
      await invoke('delete_script_runs', { scriptId });
      await queryClient.invalidateQueries({
        queryKey: [...queryKeys['scriptRuns'], scriptId],
      });
    },
  });
};

export const useDropScriptRuns = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['dropScriptRuns'],
    mutationFn: async () => {
      await invoke('drop_script_runs');
      await queryClient.invalidateQueries({
        queryKey: queryKeys['scriptRuns'],
      });
    },
  });
};

export const useKillScriptRun = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['killScriptRun'],
    mutationFn: async ({
      scriptId,
      scriptRunId,
    }: {
      scriptId: string;
      scriptRunId: string;
    }) => {
      await invoke('kill_script', { id: scriptRunId });
      await queryClient.invalidateQueries({
        queryKey: [...queryKeys['scriptRuns'], scriptId],
      });
    },
  });
};
