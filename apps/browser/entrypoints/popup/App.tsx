import '@mantine/core/styles.css';

import { Button, MantineProvider, ScrollArea, Stack } from '@mantine/core';
import { useFiles } from '@/hooks/storage';

export const App: React.FC = () => {
  return (
    <MantineProvider>
      <Inner />
    </MantineProvider>
  );
};

const Inner: React.FC = () => {
  const files = useFiles();

  return (
    <Stack gap={0}>
      <ScrollArea h='200px'>
        {files.map((file) => {
          return (
            <Button
              key={file.id}
              variant='light'
              onClick={() => {
                console.log(`Executing ${JSON.stringify(file)}`);
                void browser.tabs.executeScript({
                  code: file.content,
                });
              }}
            >
              {file.name}
            </Button>
          );
        })}
      </ScrollArea>
      <Button
        variant='subtle'
        onClick={() => {
          void browser.runtime.openOptionsPage();
        }}
      >
        Preferences
      </Button>
    </Stack>
  );
};
