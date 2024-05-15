'use client';

import {
  Dashboard,
  useDashboards,
  useDeleteDashboard,
  useUpsertDashboard,
} from '@/_state';
import { Button, Group, ScrollArea, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useEffect, useMemo, useState } from 'react';

export const RendererDashboard: React.FC<{ id: string }> = ({ id }) => {
  const dashboards = useDashboards();
  const dashboard = useMemo(
    () => (dashboards.isSuccess ? dashboards.data[id] : null),
    [dashboards, id],
  );
  const updateDashboard = useUpsertDashboard();
  const deleteDashboard = useDeleteDashboard();

  const form = useForm<Dashboard>({
    validate: {
      name: isNotEmpty('Name is required'),
    },
  });

  const [initialized, setInitialized] = useState(false);

  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        updateDashboard.mutate({ dashboard: values });
      }),
    [form, updateDashboard],
  );

  useEffect(() => {
    updateDashboard.isSuccess && form.resetDirty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDashboard.isSuccess]);

  useEffect(() => {
    if (initialized || dashboard === null) return;
    form.setValues(dashboard);
    form.resetDirty();
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboard]);

  return (
    <ScrollArea h='100%'>
      <form onSubmit={onSubmit} className='max-h-full'>
        <Stack p='md'>
          <TextInput label='ID' disabled value={id} />
          <TextInput
            label='Name'
            placeholder='Name'
            {...form.getInputProps('name')}
          />
          <Group>
            <Button type='submit' disabled={!form.isDirty()}>
              Save
            </Button>
            <Button
              type='reset'
              onClick={form.reset}
              disabled={!form.isDirty()}
              color='gray'
            >
              Discard
            </Button>
            <Button color='red' onClick={() => deleteDashboard.mutate({ id })}>
              Delete
            </Button>
          </Group>
        </Stack>
      </form>
    </ScrollArea>
  );
};
