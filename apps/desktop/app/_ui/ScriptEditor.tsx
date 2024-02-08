import { TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export interface ScriptEditorProps {}

export const ScriptEditor: React.FC<ScriptEditorProps> = () => {
  const { onSubmit: formOnSubmit, ...form } = useForm({
    initialValues: {
      name: '',
    },
  });

  return (
    <>
      <form>
        <TextInput label='Name' {...form.getInputProps('name')} />
      </form>
    </>
  );
};
