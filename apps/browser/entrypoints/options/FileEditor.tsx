import { assignRef } from '@mantine/hooks';
import Editor, { EditorProps, loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { forwardRef } from 'react';

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker();
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker();
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker();
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

loader.config({ monaco });
await loader.init();

export interface FileEditorsProps {
  path: string;
}

export const FileEditor = forwardRef<
  Parameters<NonNullable<EditorProps['onMount']>>[0],
  FileEditorsProps
>(({ path }, editorRef) => {
  const monacoRef =
    useRef<Parameters<NonNullable<EditorProps['onMount']>>[1]>();

  return (
    <Editor
      height='90vh'
      defaultLanguage='javascript'
      defaultValue='// some comment'
      beforeMount={(monaco) => {
        monaco.languages.typescript.javascriptDefaults.addExtraLib(
          'declare class "foo" {}',
          'foo.d.ts',
        );
      }}
      onMount={(editor, monaco) => {
        assignRef(editorRef, editor);
        monacoRef.current = monaco;
      }}
      path={path}
    />
  );
});
