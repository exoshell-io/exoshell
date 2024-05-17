import {
  useMutation,
  useQuery,
  useQueryClient,
  type DefaultError,
  type UseQueryOptions,
} from '@tanstack/react-query';
import { type ScriptRun, queryKeys } from '.';
import { invoke } from '@tauri-apps/api/tauri';

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
        'plugin:ipc|list_script_runs_by_script',
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
      await invoke('plugin:ipc|delete_script_run', { id });
      queryClient.invalidateQueries({
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
      await invoke('plugin:ipc|delete_script_runs', { scriptId });
      queryClient.invalidateQueries({
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
      await invoke('plugin:ipc|drop_script_runs');
      queryClient.invalidateQueries({ queryKey: queryKeys['scriptRuns'] });
    },
  });
};
