'use client';

import { Box, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export const ScriptEditor: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: '',
      env: [],
    },
  });
  return (
    <Box maw={340} mx='auto'>
      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <TextInput label='Name' placeholder='Task name' required />
        <Button type='submit'>Submit</Button>
      </form>
    </Box>
  );
};
