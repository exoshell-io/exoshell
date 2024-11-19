import { Button, Stack, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

export interface FileSettingsEditorProps {
  path: string;
}

export const FileSettingsEditor: React.FC<FileSettingsEditorProps> = () => {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      enabled: true,
      runsOn: ['default'],
      runsOnlyOnTopFrame: 'default',
      runsIn: 'default',
      checkForUpdates: true,
      updateUrl: '',
      tags: [],
      includes: [],
      excludes: [],
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) => {
        console.log(values);
      })}
    >
      <Stack p='md'>
        <TextInput
          label='Name'
          placeholder='Name'
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <Button type='submit'>Save</Button>
      </Stack>
    </form>
  );
};
