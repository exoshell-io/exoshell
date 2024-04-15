import { Dashboard, useStore } from '@/_state';
import { Button, Group, Stack, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useMemo } from 'react';

export const RendererDashboard: React.FC<{ id: string }> = ({ id }) => {
  const dashboards = useStore((store) => store.dashboards);
  const dashboard = useMemo(() => dashboards[id], [dashboards, id]);
  const updateDashboard = useStore((store) => store.updateDashboard);
  const deleteDashboard = useStore((store) => store.deleteDashboard);

  const form = useForm<Dashboard>({
    initialValues: dashboard,
    validate: {
      name: isNotEmpty('Name is required'),
    },
  });

  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        updateDashboard(id, values);
        form.resetDirty();
      }),
    [form, id, updateDashboard],
  );

  return (
    <form onSubmit={onSubmit}>
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
          <Button color='red' onClick={() => deleteDashboard(id)}>
            Delete
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
