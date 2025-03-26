import { useMutation } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api/core';

export function useQuerySurreal() {
  return useMutation({
    mutationKey: ['querySurreal'],
    mutationFn: async (args: {
      query: string;
      vars: { [key: string]: unknown };
    }) => {
      return invoke<string>('query', args);
    },
  });
}
