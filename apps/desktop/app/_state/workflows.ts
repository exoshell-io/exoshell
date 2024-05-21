import {
  DefaultError,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';
import { useCallback } from 'react';
import { queryKeys, useCloseTab, useOpenTab, type Workflow } from '.';

type Data = { [key: string]: Workflow };

export const useWorkflows = <T = Data>(
  options?: Omit<
    UseQueryOptions<Data, DefaultError, T>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: queryKeys['workflows'],
    queryFn: async () => {
      const workflows = await invoke<Workflow[]>('plugin:ipc|list_workflows');
      return workflows.reduce((acc, workflow) => {
        acc[workflow.id!.id.String] = workflow;
        return acc;
      }, {} as Data);
    },
    ...options,
  });
};

export const useWorkflow = (id: string) => {
  return useWorkflows({
    select: useCallback((workflows: Data) => workflows[id], [id]),
  });
};

export const useUpsertWorkflow = () => {
  const queryClient = useQueryClient();
  const openTab = useOpenTab();
  return useMutation({
    mutationKey: ['upsertWorkflow'],
    mutationFn: async ({
      workflow,
      focus = true,
    }: {
      workflow: Workflow;
      focus?: boolean;
    }) => {
      const _workflow = await invoke<Workflow>('plugin:ipc|upsert_workflow', {
        workflow,
      });
      const id = _workflow.id!.id.String;
      queryClient.setQueryData(queryKeys['workflows'], (prevData: Data) => {
        return {
          ...prevData,
          [id]: _workflow,
        };
      });
      openTab(`workflow://${id}`, focus);
      return _workflow;
    },
  });
};

export const useDeleteWorkflow = () => {
  const queryClient = useQueryClient();
  const closeTab = useCloseTab();
  return useMutation({
    mutationKey: ['deleteWorkflow'],
    mutationFn: async ({ id }: { id: string }) => {
      await invoke('plugin:ipc|delete_workflow', { id });
      closeTab(`workflow://${id}`);
      queryClient.setQueryData(queryKeys['workflows'], (prevData: Data) => {
        delete prevData[id];
        return { ...prevData };
      });
    },
  });
};
