import {
  type ActiveTabV1,
  activeTabV1,
  type FilesV1,
  filesV1,
  type FileV1,
  tabsV1,
  type TabsV1,
  type TabV1,
} from '@/utils/storage';
import { useState, useEffect, useCallback } from 'react';

export const useFiles = () => {
  const [files, setFiles] = useState<FilesV1>([]);
  useEffect(() => {
    const unwatch = filesV1.watch((files) => {
      setFiles(files);
    });
    filesV1
      .getValue()
      .then(setFiles)
      .catch((err: unknown) => {
        console.error(`Failed to get files from storage: ${err as string}`);
        throw err;
      });
    return () => {
      unwatch();
    };
  }, []);
  return files;
};

export type TabWithContentV1 = TabV1 &
  (
    | {
        type: 'file';
        uri: `file://${string}`;
        file?: FileV1;
      }
    | {
        type: 'unimplemented';
      }
  );

export type TabsWithContentV1 = TabWithContentV1[];

export const useTabsWithContent = () => {
  const [tabsWithContent, setTabsWithContent] = useState<TabsWithContentV1>([]);
  const files = useFiles();
  const computeTabsWithContent = useCallback(
    (tabs: TabsV1): TabsWithContentV1 => {
      return tabs.reduce<TabsWithContentV1>((acc, tab) => {
        if (tab.uri.startsWith('file://')) {
          const fileId = tab.uri.substring('file://'.length);
          const file = files.find((file) => file.id === fileId);
          return [
            ...acc,
            {
              ...tab,
              type: 'file' as const,
              file,
              uri: tab.uri as `file://${string}`,
            },
          ];
        } else {
          return [...acc, { ...tab, type: 'unimplemented' as const }];
        }
      }, []);
    },
    [files],
  );
  useEffect(() => {
    const unwatch = tabsV1.watch((tabs) => {
      setTabsWithContent(computeTabsWithContent(tabs));
    });
    tabsV1
      .getValue()
      .then((tabs) => {
        setTabsWithContent(computeTabsWithContent(tabs));
      })
      .catch((err: unknown) => {
        console.error(`Failed to get tabs from storage: ${err as string}`);
        throw err;
      });
    return () => {
      unwatch();
    };
  }, [computeTabsWithContent]);
  return tabsWithContent;
};

export const useActiveTab = () => {
  const [activeTab, setActiveTab] = useState<ActiveTabV1>(null);
  useEffect(() => {
    const unwatch = activeTabV1.watch((activeTab) => {
      setActiveTab(activeTab);
    });
    return () => {
      unwatch();
    };
  }, []);
  return [activeTab, setActiveTab] as const;
};
