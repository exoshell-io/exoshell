'use client';

import { Button, Group, Stack } from '@mantine/core';
import { IconJotai, IconReactQuery } from './icons';

export const RendererDevModeOnly: React.FC = () => {
  return (
    <Stack p='md'>
      <Group>
        <Button
          color='black'
          variant='outline'
          leftSection={<IconReactQuery />}
          onClick={() => {
            const button = document.querySelector<HTMLButtonElement>(
              'button.tsqd-open-btn',
            );
            if (button !== null) {
              button?.click();
            } else {
              const button = document.querySelector<HTMLButtonElement>(
                'button.tsqd-minimize-btn',
              );
              button?.click();
            }
          }}
        >
          React Query DevTools
        </Button>
        <Button
          color='black'
          variant='outline'
          leftSection={<IconJotai />}
          onClick={() => {
            const button = document.querySelector<HTMLButtonElement>(
              'button.jotai-devtools-trigger-button',
            );
            if (button !== null) {
              button?.click();
            } else {
              const button = document.querySelector<HTMLButtonElement>(
                'button.jotai-devtools-focus[title="Minimize panel"]',
              );
              button?.click();
            }
          }}
        >
          Jotai DevTools
        </Button>
      </Group>
    </Stack>
  );
};
