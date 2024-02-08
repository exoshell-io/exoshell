import { useRunScript } from '@/_ipc';
import { Script } from '@/_types';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  ActionIcon,
  Button,
  Center,
  Fieldset,
  Group,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo } from 'react';
import { MdDelete as IconDelete } from 'react-icons/md';
import { TbGripVertical } from 'react-icons/tb';

export const Runner: React.FC = () => {
  const { onSubmit, ...form } = useForm({
    initialValues: {
      command: '',
      args: [] as string[],
      env: [] as { key: string; value: string }[],
    },
    transformValues: (values) => ({
      ...values,
      env: values.env.reduce(
        (acc, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {} as { [key: string]: string },
      ),
    }),
  });
  const runScript = useRunScript();
  const formOnSubmit = useMemo(
    () =>
      onSubmit((values) => {
        console.log(values);
        runScript.mutate({
          ...values,
          id: null,
          name: '',
          workingDir: null,
        });
      }),
    [onSubmit, runScript],
  );

  return (
    <form onSubmit={formOnSubmit}>
      <Fieldset legend='Arguments'>
        <TextInput label='Command' {...form.getInputProps('command')} />
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            destination?.index !== undefined &&
            form.reorderListItem('args', {
              from: source.index,
              to: destination.index,
            })
          }
        >
          <Droppable droppableId='dnd-list' direction='vertical'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {form.values.args.map((_, index) => (
                  <Draggable
                    key={index}
                    index={index}
                    draggableId={index.toString()}
                  >
                    {(provided) => (
                      <Group
                        ref={provided.innerRef}
                        mt='xs'
                        {...provided.draggableProps}
                      >
                        <Center {...provided.dragHandleProps}>
                          <TbGripVertical size='1.2rem' />
                        </Center>
                        <TextInput
                          placeholder='Argument'
                          {...form.getInputProps(`args.${index}`)}
                        />
                        <ActionIcon
                          onClick={() => {
                            form.removeListItem('args', index);
                          }}
                        >
                          <IconDelete />
                        </ActionIcon>
                      </Group>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button mt='md' onClick={() => form.insertListItem('args', '')}>
          Add argument
        </Button>
      </Fieldset>
      <Fieldset legend='Environment'>
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            destination?.index !== undefined &&
            form.reorderListItem('env', {
              from: source.index,
              to: destination.index,
            })
          }
        >
          <Droppable droppableId='dnd-list' direction='vertical'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {form.values.env.map((_, index) => (
                  <Draggable
                    key={index}
                    index={index}
                    draggableId={index.toString()}
                  >
                    {(provided) => (
                      <Group
                        ref={provided.innerRef}
                        mt='xs'
                        {...provided.draggableProps}
                      >
                        <Center {...provided.dragHandleProps}>
                          <TbGripVertical size='1.2rem' />
                        </Center>
                        <Group wrap='nowrap'>
                          <TextInput
                            placeholder='Key'
                            {...form.getInputProps(`env.${index}.key`)}
                          />
                          <TextInput
                            placeholder='Value'
                            {...form.getInputProps(`env.${index}.value`)}
                          />
                          <ActionIcon
                            onClick={() => {
                              form.removeListItem('args', index);
                            }}
                          >
                            <IconDelete />
                          </ActionIcon>
                        </Group>
                      </Group>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Button
          mt='md'
          onClick={() => form.insertListItem('env', { key: '', value: '' })}
        >
          Add environment variable
        </Button>
      </Fieldset>
      <Button type='submit' mt='md'>
        Run
      </Button>
    </form>
  );
};
