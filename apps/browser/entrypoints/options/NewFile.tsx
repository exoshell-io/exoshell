import {
  Button,
  Group,
  Modal,
  SegmentedControl,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { createFile, FileV1 } from '@/utils/storage';

export interface NewFileProps {
  opened: boolean;
  close: () => unknown;
}

type NewFileForm = FileV1 & { type: 'js' | 'css' | 'folder' };

export const NewFile: React.FC<Readonly<NewFileProps>> = ({
  opened,
  close,
}) => {
  const form = useForm<NewFileForm>({
    mode: 'controlled',
    initialValues: {
      name: '',
      content: '',
      id: '',
      type: 'js',
    },
  });
  return (
    <Modal opened={opened} onClose={() => {}}>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
          void createFile({ ...values, id: Math.random().toString() });
          close();
        })}
      >
        <Stack>
          <SegmentedControl
            {...form.getInputProps('type')}
            data={['js', 'css', 'folder']}
          />
          <TextInput
            label='Name'
            placeholder='Name'
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <Group>
            <Button variant='light' onClick={() => {}}>
              Cancel
            </Button>
            <Button type='submit' disabled={!form.isValid()}>
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
