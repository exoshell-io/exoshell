import { Script } from '@/_types/Script';
import { invoke } from '@tauri-apps/api';

export async function listScripts(): Promise<Script[]> {
  return invoke('list_scripts');
}
