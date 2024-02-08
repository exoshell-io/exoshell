'use client';

import { useStore } from '@/_store';
import { Box, ScrollArea, Stack } from '@mantine/core';
import { Runner } from './Runner';

export const Editor: React.FC = () => {
  const editorLayout = useStore((state) => state.editorLayout);
  const tabs = useStore((state) => state.tabs);

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
                  <Runner />
                </Box>
              </ScrollArea>
            </Stack>
          );
        })}
      </Box>
    </>
  );
};
