'use client';

import { ScriptEditor } from './ScriptEditor';
import { ScriptList } from './ScriptList';

export default function Home() {
  return (
    <main>
      <ScriptEditor />
      <ScriptList />
    </main>
  );
}
