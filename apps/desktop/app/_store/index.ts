'use client';

import { listen } from '@tauri-apps/api/event';
import { create } from 'zustand';
import { EditorStore, defaultEditorStore } from './editor';
import { DatabaseStore, defaultDatabaseStore } from './database';
import { atom } from 'jotai';
import { Script } from '@/_types';

export * from './editor';
export * from './database';

export type Store = EditorStore & DatabaseStore;

export const useStore = create<Store>()(() => ({
  ...defaultEditorStore(),
  ...defaultDatabaseStore(),
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
}));

export const scripts = atom<Script[]>([]);

// Listen database events
