'use client';

import { Script } from '@/_types';
import { invoke } from '@tauri-apps/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export async function listScripts(): Promise<Script[]> {
  return invoke('ipc:list_scripts');
}

export function useScripts() {
  return useQuery({
    queryKey: ['scripts'],
    queryFn: listScripts,
  });
}

export async function createScript(script: Script) {
  return invoke('ipc:create_script', script);
}

export function useCreateScript() {
  return useMutation({
    mutationKey: ['create_script'],
    mutationFn: createScript,
  });
}
