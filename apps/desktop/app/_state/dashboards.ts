import {
  DefaultError,
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';
import { useCallback } from 'react';
import { queryKeys, useCloseTab, useOpenTab, type Dashboard } from '.';

type State = { [key: string]: Dashboard };

export const useDashboards = <T = State>(
  options?: Omit<
    UseQueryOptions<State, DefaultError, T>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: queryKeys['dashboards'],
    queryFn: async () => {
      const dashboards = await invoke<Dashboard[]>(
        'plugin:ipc|list_dashboards',
      );
      return dashboards.reduce((acc, dashboard) => {
        acc[dashboard.id!.id.String] = dashboard;
        return acc;
      }, {} as State);
    },
    ...options,
  });
};

export const useDashboard = (id: string) => {
  return useDashboards({
    select: useCallback((dashboards: State) => dashboards[id], [id]),
  });
};

export const useUpsertDashboard = () => {
  const queryClient = useQueryClient();
  const openTab = useOpenTab();
  return useMutation({
    mutationKey: ['upsertDashboard'],
    mutationFn: async ({
      dashboard,
      focus = true,
    }: {
      dashboard: Dashboard;
      focus?: boolean;
    }) => {
      const _dashboard = await invoke<Dashboard>(
        'plugin:ipc|upsert_dashboard',
        { dashboard },
      );
      const id = _dashboard.id!.id.String;
      queryClient.setQueryData(queryKeys['dashboards'], (prevData: State) => {
        return {
          ...prevData,
          [id]: _dashboard,
        };
      });
      openTab(`dashboard://${id}`, focus);
      return _dashboard;
    },
  });
};

export const useDeleteDashboard = () => {
  const queryClient = useQueryClient();
  const closeTab = useCloseTab();
  return useMutation({
    mutationKey: ['deleteDashboard'],
    mutationFn: async ({ id }: { id: string }) => {
      await invoke('plugin:ipc|delete_dashboard', { id });
      closeTab(`dashboard://${id}`);
      queryClient.setQueryData(queryKeys['dashboards'], (prevData: State) => {
        delete prevData[id];
        return { ...prevData };
      });
    },
  });
};
