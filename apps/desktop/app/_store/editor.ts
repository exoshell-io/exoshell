export interface EditorStore {
  lastFocusedEditorColum?: number;
  editorLayout?: EditorLayout;
  tabs?: EditorTab[];
}

export interface EditorTab {
  id: string;
}

export interface EditorLayout {
  columns: EditorColumn[];
}

export interface EditorColumn {
  id: string;
  percentage: number;
}

export function defaultEditorStore(): EditorStore {
  return {};
}
