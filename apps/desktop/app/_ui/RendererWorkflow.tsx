import { Workflow, useStore } from '@/_state';
import { useForm, isNotEmpty } from '@mantine/form';
import { Group, Stack, Button, TextInput } from '@mantine/core';
import { useMemo } from 'react';

export const RendererWorkflow: React.FC<{ id: string }> = ({ id }) => {
  const workflows = useStore((store) => store.workflows);
  const workflow = useMemo(() => workflows[id], [workflows, id]);
  const updateWorkflow = useStore((store) => store.updateWorkflow);
  const deleteWorkflow = useStore((store) => store.deleteWorkflow);

  const form = useForm<Workflow>({
    initialValues: workflow,
    validate: {
      name: isNotEmpty('Name is required'),
    },
  });

  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        updateWorkflow(id, values);
        form.resetDirty();
      }),
    [form, id, updateWorkflow],
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
          <Button color='gray' disabled>
            Run
          </Button>
          <Button color='red' onClick={() => deleteWorkflow(id)}>
            Delete
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
