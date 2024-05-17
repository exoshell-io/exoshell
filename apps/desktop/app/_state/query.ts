import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/tauri';

export function useQuery() {
  return useMutation({
    mutationKey: ['query'],
    mutationFn: async (args: {
      query: string;
      vars: { [key: string]: unknown };
    }) => {
      return invoke<string>('plugin:ipc|query', args);
    },
  });
}
