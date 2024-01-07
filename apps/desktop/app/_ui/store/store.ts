'use client';

import { create } from 'zustand';

export interface Store {
  lastFocusedEditorColum?: number;
  editorLayout?: EditorLayout;
  tabs?: EditorTab[];
  newEmptyTab: () => EditorTab;
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
    const tab = {
      id,
    } satisfies EditorTab;
    set((state) => ({
      tabs: [...(state.tabs ?? []), tab],
    }));
    return tab;
  },
}));

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
