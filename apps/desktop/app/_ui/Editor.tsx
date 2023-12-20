'use client';

import { listScripts } from '@/_backend';
import { useStore } from '@/_ui/store';
import { Box, Button, Code, ScrollArea, Stack } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

export const Editor: React.FC = () => {
  const editorLayout = useStore((state) => state.editorLayout);

  const scripts = useQuery({
    queryKey: ['scripts'],
    queryFn: listScripts,
  });

  return (
    <>
      <Box
        display='flex'
        mih='calc(100dvh - var(--app-shell-header-offset) - var(--app-shell-footer-offset))'
        mah='calc(100dvh - var(--app-shell-header-offset) - var(--app-shell-footer-offset))'
        style={{ border: 'solid 5px red' }}
      >
        {editorLayout?.columns.map((column) => {
          return (
            <Stack
              key={column.id}
              w={`${column.percentage}%`}
              style={{ border: 'solid 5px blue' }}
              gap={0}
            >
              <Box h='40px' style={{ border: 'solid 5px green' }}></Box>
              <ScrollArea style={{ border: 'solid 5px yellow' }}>
                <Box h='100dvh'>
                  <Button onClick={scripts.refetch}>Refresh</Button>
                  {scripts.data?.map((script) => (
                    <Code key={script.id}>{script.name}</Code>
                  ))}
                </Box>
              </ScrollArea>
            </Stack>
          );
        })}
      </Box>
    </>
  );
};
