import { Script } from '@/_types/Script';
import { useQuery } from '@tanstack/react-query';
import { invoke } from '@tauri-apps/api';

export async function listScripts(): Promise<Script[]> {
  return invoke('list_scripts');
}

export async function useScripts() {
  return useQuery({
    queryKey: ['scripts'],
    queryFn: listScripts,
  });
}

type CreateScript = {
  name: string;
};

export async function createScript(script: CreateScript) {
  return invoke('create_script', script);
}
