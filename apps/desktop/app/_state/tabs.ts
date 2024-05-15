import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export type Tab = {
  href: string;
};

export const tabsAtom = atomWithStorage('tabs', [] as Tab[]);
export const activeTabIndexAtom = atomWithStorage<number | undefined>(
  'activeTab',
  undefined,
);
export const activeTabAtom = atom((get) => {
  const activeTabIndex = get(activeTabIndexAtom);
  if (activeTabIndex === undefined) return null;
  const tabs = get(tabsAtom);
  return tabs[activeTabIndex];
});

export const openTabAtom = atom(
  null,
  (get, set, href: string, focus = true) => {
    const tabs = get(tabsAtom);
    const index = tabs.findIndex((tab) => tab.href === href);
    if (index > -1) {
      if (focus) {
        set(activeTabIndexAtom, index);
      }
    } else {
      set(tabsAtom, (tabs) => [...tabs, { href }]);
      if (focus) {
        set(activeTabIndexAtom, tabs.length);
      }
    }
  },
);

export const setActiveTabAtom = atom(
  null,
  (_get, set, index: number | null) => {
    set(activeTabIndexAtom, index !== null ? index : undefined);
  },
);

export const closeTabAtom = atom(
  null,
  (get, set, indexOrHref: number | string) => {
    const tabs = get(tabsAtom);
    let index: number;
    if (typeof indexOrHref === 'number') {
      index = indexOrHref;
    } else if (typeof indexOrHref === 'string') {
      index = tabs.findIndex((tab) => tab.href === indexOrHref);
    } else {
      throw new Error('Invalid index or href');
    }
    {
      if (index < 0 || index >= tabs.length) return;
      const activeTab = get(activeTabIndexAtom);
      if (activeTab === index) {
        if (tabs.length === 1) {
          set(activeTabIndexAtom, undefined);
        } else if (index >= tabs.length - 1) {
          set(activeTabIndexAtom, tabs.length - 2);
        }
      }
      tabs.splice(index, 1);
      set(tabsAtom, [...tabs]);
    }
    {
      const activeTab = get(activeTabIndexAtom);
      const tabs = get(tabsAtom);
      if (activeTab !== undefined && activeTab >= tabs.length) {
        set(activeTabIndexAtom, activeTab - 1);
      }
    }
  },
);
