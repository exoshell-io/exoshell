import { useSettings } from '@/_state';
import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo } from 'react';

export const RendererSettings: React.FC = () => {
  const [settings, setSettings] = useSettings();
  const form = useForm({
    initialValues: settings,
  });
  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        setSettings(values);
        form.resetDirty();
      }),
    [form, setSettings],
  );

  return (
    <Box p='md'>
      <Text size='xl' fw='bolder' mb='md'>
        Settings
      </Text>
      <form onSubmit={onSubmit}>
        <Stack>
          <TextInput
            label={
              <Tooltip label='SurrealDB connection URL'>
                <Text>Connection</Text>
              </Tooltip>
            }
            placeholder='file:///'
            {...form.getInputProps('connection')}
          />
          <Group>
            <Button type='submit' disabled={!form.isDirty()}>
              Save
            </Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
};
