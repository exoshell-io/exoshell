import { assignRef } from '@mantine/hooks';
import Editor, { type EditorProps, loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

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
void loader.init();

export interface FileEditorsProps {
  path: string;
  ref?: React.Ref<Parameters<NonNullable<EditorProps['onMount']>>[0]>;
}

export const FileEditor: React.FC<Readonly<FileEditorsProps>> = ({
  path,
  ref,
}) => {
  const monacoRef =
    useRef<Parameters<NonNullable<EditorProps['onMount']>>[1]>(null);

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
        assignRef(ref, editor);
        monacoRef.current = monaco;
      }}
      path={path}
    />
  );
};
