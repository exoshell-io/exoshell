'use client';

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  ActionIcon,
  AppShell,
  Button,
  Center,
  Group,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMemo } from 'react';
import { FaGripVertical as IconGripVertical } from 'react-icons/fa';
import { IoMdAdd as IconAdd } from 'react-icons/io';
import { MdDelete as IconDelete } from 'react-icons/md';

export const App: React.FC = () => {
  return (
    <AppShell
      header={{ height: 32 }}
      navbar={{ breakpoint: 0, width: 200 }}
      aside={{ breakpoint: 0, width: 200 }}
      footer={{ height: 20 }}
    >
      <AppShell.Header data-tauri-drag-region>
        <Header />
      </AppShell.Header>

      <AppShell.Navbar className='text-user-select-none'>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Main />
      </AppShell.Main>

      <AppShell.Aside></AppShell.Aside>

      <AppShell.Footer></AppShell.Footer>
    </AppShell>
  );
};

export const Header: React.FC = () => {
  return <></>;
};

export const NavBar: React.FC = () => {
  return <></>;
};

export const Main: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: '',
      command: '',
      env: [],
      workingDir: null,
    },
  });
  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        console.log(values);
      }),
    [form],
  );
  return (
    <form onSubmit={onSubmit}>
      <Stack p='md'>
        <TextInput
          label='Name'
          description='A name for the script.'
          required
          {...form.getInputProps('name')}
        />
        <TextInput
          label='Command'
          description='The command to run.'
          required
          {...form.getInputProps('command')}
        />
        <DragDropContext
          onDragEnd={({ destination, source }) =>
            destination?.index !== undefined &&
            form.reorderListItem('env', {
              from: source.index,
              to: destination.index,
            })
          }
        >
          <Droppable droppableId='dnd-env' direction='vertical'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Group gap='xs'>
                  <Text size='sm' fw={500}>
                    Environment variables
                  </Text>
                  <ActionIcon
                    onClick={() =>
                      form.insertListItem('env', { key: '', value: '' })
                    }
                    variant='subtle'
                    color='black'
                  >
                    <IconAdd />
                  </ActionIcon>
                </Group>
                {form.values.env.map((_, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Group
                        ref={provided.innerRef}
                        mt='sm'
                        {...provided.draggableProps}
                      >
                        <Center {...provided.dragHandleProps}>
                          <IconGripVertical />
                        </Center>
                        <TextInput
                          placeholder='Key'
                          {...form.getInputProps(`env.${index}.key`)}
                        />
                        <TextInput
                          placeholder='Value'
                          {...form.getInputProps(`env.${index}.value`)}
                        />
                        <ActionIcon
                          onClick={() => form.removeListItem('env', index)}
                          variant='subtle'
                          color='red'
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
        <TextInput
          label='Working directory'
          description='The working directory for the command. Defaults to a temporary directory.'
          {...form.getInputProps('workingDir')}
        />
        <Group justify='flex-end'>
          <Button type='submit'>Run</Button>
        </Group>
      </Stack>
    </form>
  );
};
