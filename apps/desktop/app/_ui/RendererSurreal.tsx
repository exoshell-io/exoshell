import { useQuery } from '@/_state';
import {
  Box,
  Button,
  Code,
  Group,
  ScrollArea,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo } from 'react';
import { CodeHighlight } from '@mantine/code-highlight';

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
  return (
    <ScrollArea p='md' h='100%'>
      <form onSubmit={onSubmit}>
        <Stack>
          <Textarea label='Query' {...form.getInputProps('query')} />
          <Group>
            <Button type='submit' loading={query.isPending}>
              Run
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
