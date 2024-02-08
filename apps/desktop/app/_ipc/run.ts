'use client';

import { Script, ScriptRun } from '@/_types';
import { invoke } from '@tauri-apps/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export async function runScript(script: Script): Promise<ScriptRun> {
  return invoke('ipc:run_script', script);
}

export function useRunScript() {
  return useMutation({
    mutationKey: ['run_script'],
    mutationFn: runScript,
  });
}
