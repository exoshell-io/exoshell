import { Script } from '@/_types/Script';
import { atom } from 'jotai';

const tabsAtom = atom([] as Tab[]);

interface Tab {
  name: string;
}

const scripts = atom([] as Script[]);

const focusedTab = atom<string | null>(null);

const editors = atom([] as Editor[]);

interface Editor {
  name: string;
}