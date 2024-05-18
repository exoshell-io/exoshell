import { useQuery } from '@/_state';
import { CodeHighlight } from '@mantine/code-highlight';
import {
  Button,
  Code,
  Group,
  ScrollArea,
  Stack,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { getHotkeyHandler } from '@mantine/hooks';
import { useMemo, useRef } from 'react';
import { IconPlay } from './icons';

export const RendererSurreal: React.FC = () => {
  const form = useForm({
    initialValues: {
      query: '',
      vars: {} as { [key: string]: unknown },
    },
  });
  const query = useQuery();
  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        console.log(values);
        query.mutate({
          query: values.query,
          vars: values.vars,
        });
      }),
    [form, query],
  );
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <ScrollArea p='md' h='100%'>
      <form onSubmit={onSubmit}>
        <Stack>
          <Textarea
            label='Query'
            {...form.getInputProps('query')}
            onKeyDown={getHotkeyHandler([
              ['mod+Enter', () => submitButtonRef.current?.click()],
            ])}
          />
          <Group>
            <Button
              ref={submitButtonRef}
              type='submit'
              loading={query.isPending}
              leftSection={<IconPlay />}
            >
              Run (⌘+Enter)
            </Button>
          </Group>
          {query.isSuccess && <CodeHighlight code={query.data} />}
          {query.isError && (
            <Code color='red'>{JSON.stringify(query.error, undefined, 2)}</Code>
          )}
        </Stack>
      </form>
    </ScrollArea>
  );
};
