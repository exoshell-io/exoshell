import {
  useDeleteScript,
  useDeleteScriptRun,
  useRunScript,
  useScript,
  useScriptRunsByScript,
  useUpsertScript,
  type ScriptRun,
} from '@/_state';
import { Script } from '@exoshell/model';
import { CodeHighlight } from '@mantine/code-highlight';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Button,
  Code,
  Group,
  ScrollArea,
  Stack,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  TextInput,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconPlay, IconRefresh, IconSave, IconTrash } from './icons';

export const RendererTerminal: React.FC<{ id: string }> = ({ id }) => {
  const script = useScript(id);

  const form = useForm<Script>({
    validate: {
      name: isNotEmpty('Name is required'),
    },
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized || script.data === undefined) return;
    form.setValues(script.data);
    form.resetDirty();
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script]);

  const upsertScript = useUpsertScript();
  const runScript = useRunScript();

  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        upsertScript.mutate({ script: values });
        form.resetDirty();
      }),
    [form, upsertScript],
  );

  const run = useCallback(() => {
    console.debug('Run', form.getValues());
    runScript.mutate({
      script: form.getValues(),
    });
  }, [form, runScript]);

  const deleteScript = useDeleteScript();

  return (
    <ScrollArea h='100%'>
      <form onSubmit={onSubmit} className='max-h-full'>
        <Stack p='md'>
          <TextInput
            label='ID'
            disabled
            {...form.getInputProps('id.id.String')}
          />
          <TextInput label='Name' {...form.getInputProps('name')} />
          <TextInput label='Command' {...form.getInputProps('command')} />
          <TextInput
            label='Working Directory'
            {...form.getInputProps('workingDir')}
          />
          <Group>
            {form.isDirty() ? (
              <Button
                type='submit'
                disabled={!form.isDirty()}
                loading={upsertScript.isPending}
                leftSection={<IconSave />}
              >
                Save
              </Button>
            ) : (
              <Button onClick={run} leftSection={<IconPlay />}>
                Run
              </Button>
            )}
            <Button
              type='reset'
              onClick={form.reset}
              disabled={!form.isDirty()}
              color='gray'
              leftSection={<IconRefresh />}
            >
              Discard
            </Button>
            <Button
              color='red'
              loading={deleteScript.isPending}
              onClick={() => deleteScript.mutate({ id })}
              leftSection={<IconTrash />}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </form>
      <RendererScriptRuns scriptId={id} />
    </ScrollArea>
  );
};

const RendererScriptRuns: React.FC<{ scriptId: string }> = ({ scriptId }) => {
  const scriptRuns = useScriptRunsByScript(scriptId);

  return (
    <>
      <Tabs
        variant='outline'
        orientation='vertical'
        m='sm'
        className='rounded-md border border-solid border-gray-200'
      >
        <TabsList>
          {Object.values(scriptRuns.data ?? {}).map((scriptRun) => {
            const scriptRunId = scriptRun.id!.id.String;
            return (
              <TabsTab key={scriptRunId} value={scriptRunId}>
                {scriptRunId}
              </TabsTab>
            );
          })}
        </TabsList>
        {Object.values(scriptRuns.data ?? {}).map((scriptRun) => {
          const scriptRunId = scriptRun.id!.id.String;
          return (
            <TabsPanel key={scriptRunId} value={scriptRunId} p='sm'>
              <Stack>
                <Accordion variant='contained'>
                  <AccordionItem value='debug'>
                    <AccordionControl>Debug</AccordionControl>
                    <AccordionPanel>
                      <CodeHighlight
                        code={JSON.stringify(scriptRun, undefined, 2)}
                        language='json'
                        withCopyButton={false}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                <RendererScriptRun scriptRun={scriptRun} />
              </Stack>
            </TabsPanel>
          );
        })}
      </Tabs>
    </>
  );
};

const RendererScriptRun: React.FC<{ scriptRun: ScriptRun }> = ({
  scriptRun,
}) => {
  const logs = useMemo(
    () =>
      scriptRun.log
        .map((log) => {
          if ((log as any)['stdout'] !== undefined) {
            return (log as any)['stdout'].txt;
          } else if ((log as any)['stderr'] !== undefined) {
            return (log as any)['stderr'].txt;
          }
        })
        .join(''),
    [scriptRun],
  );

  const queryClient = useQueryClient();
  const deleteScriptRun = useDeleteScriptRun();
  const scriptId = useMemo(() => scriptRun.script.id!.id.String, [scriptRun]);
  const id = useMemo(() => scriptRun.id!.id.String, [scriptRun]);

  return (
    <>
      <Group>
        <Button
          leftSection={<IconRefresh />}
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['scriptRuns'] })
          }
        >
          Refresh
        </Button>
        <Button
          loading={deleteScriptRun.isPending}
          onClick={() => deleteScriptRun.mutate({ scriptId, id })}
          color='red'
          leftSection={<IconTrash />}
        >
          Delete
        </Button>
      </Group>
      <Code w='100%' p='sm'>
        {logs}
      </Code>
    </>
  );
};
