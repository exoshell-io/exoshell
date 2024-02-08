import { listScripts } from '@/_ipc';
import { Script, ScriptRun, ScriptRunLog } from '@/_types';
import { useStore } from '.';
import { listen } from '@tauri-apps/api/event';

export interface DatabaseStore {
  scripts: Script[];
  scriptRuns: ScriptRun[];
}

export function defaultDatabaseStore(): DatabaseStore {
  return {
    scripts: [],
    scriptRuns: [],
  };
}

export async function fetchScripts() {
  const scripts = await listScripts();
  useStore.setState({ scripts });
}

export async function addScript() {
  useStore.setState({
    scriptRuns: [
      {
        id: {
          id: 'xxx',
          tb: 'xx',
        },
        exitCode: 42,
        finishedAt: null,
        spawnedAt: '12.12.12',
        log: [],
        script: {
          id: {
            id: 'xx',
            tb: 'xx',
          },
          args: [],
          command: 'x',
          env: {},
          name: 'xx',
          workingDir: null,
        },
      },
    ],
  });
}

export async function addScriptRunLog() {
  useStore.setState({
    scriptRuns: useStore.getState().scriptRuns.map((scriptRun) => {
      scriptRun.log.push({
        stdout: {
          ts: 'xxx',
          txt: 'xxxx',
        },
      });
      return scriptRun;
    }),
  });
}

listen<ScriptRun>('ipc:script_run', (scriptRun) => {
  const id = scriptRun.payload.id!.id;
  const scriptRuns = useStore.getState().scriptRuns.map((_scriptRun) => {
    if (_scriptRun.id?.id === id) {
      return scriptRun;
    }
    return _scriptRun;
  });
});
