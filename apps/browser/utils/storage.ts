import { storage } from 'wxt/storage';

export type FileV1 = {
  id: string;
  name: string;
  content: string;
};

export type FilesV1 = FileV1[];

export const filesV1 = storage.defineItem<FilesV1>('local:files', {
  version: 1,
  fallback: [],
});

export const createFile = async (file: FileV1) => {
  await filesV1.setValue([...(await filesV1.getValue()), file]);
};

export const updateFile = async (file: FileV1) => {
  const files = await filesV1.getValue();
  await filesV1.setValue(
    files.map((_file) => {
      if (_file.id === file.id) {
        return file;
      }
      return _file;
    }),
  );
};

export type TabV1 = {
  uri: string;
};

export type TabsV1 = TabV1[];

export const tabsV1 = storage.defineItem<TabsV1>('local:tabs', {
  version: 1,
  fallback: [],
});

export const openTab = async (tab: TabV1) => {
  const tabs = await tabsV1.getValue();
  if (tabs.findIndex((_tab) => _tab.uri === tab.uri) === -1) {
    await tabsV1.setValue([...(await tabsV1.getValue()), tab]);
  }
};

export type ActiveTabV1 = string | null;

export const activeTabV1 = storage.defineItem<ActiveTabV1>('local:activeTab', {
  version: 1,
  fallback: null,
});
