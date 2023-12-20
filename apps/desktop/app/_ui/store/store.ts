'use client';

import { create } from 'zustand';

export interface Store {
  lastFocusedEditorColum?: number;
  editorLayout?: EditorLayout;
  tabs?: string[];
  newEmptyTab: () => string;
}

export const useStore = create<Store>()((set, get) => ({
  editorLayout: {
    columns: [
      {
        id: '0',
        percentage: 50,
      },
      {
        id: '1',
        percentage: 50,
      },
    ],
  },
  newEmptyTab() {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({ tabs: [...(state.tabs ?? []), id] }));
    return id;
  },
}));

export interface EditorTab {
  column: number;
}

export interface EditorLayout {
  columns: EditorColumn[];
}

export interface EditorColumn {
  id: string;
  percentage: number;
}
