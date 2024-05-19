import {
  useDeleteScript,
  useDeleteScriptRun,
  useDeleteScriptRuns,
  useKillScriptRun,
  useRunScript,
  useScript,
  useScriptRuns,
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
  Loader,
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
import {
  IconBolt,
  IconCircle,
  IconPlay,
  IconRefresh,
  IconSave,
  IconTrash,
} from './icons';

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
  const scriptRuns = useScriptRuns(id);

  const [tab, setTab] = useState<string | null>(null);

  useEffect(() => {
    if (tab === null && scriptRuns.isSuccess && scriptRuns.data.length > 0) {
      setTab(scriptRuns.data[0].id?.id.String ?? null);
    }
  }, [scriptRuns.data, scriptRuns.isSuccess, tab]);

  const run = useCallback(async () => {
    const scriptRun = await runScript.mutateAsync({
      script: form.getValues(),
    });
    setTab(scriptRun.id?.id.String ?? null);
  }, [form, runScript]);

  const deleteScript = useDeleteScript();

  const deleteScriptRuns = useDeleteScriptRuns();

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
            <Button
              color='red'
              leftSection={<IconTrash />}
              onClick={() => deleteScriptRuns.mutate({ scriptId: id })}
              loading={deleteScriptRuns.isPending}
            >
              Delete all script runs
            </Button>
          </Group>
        </Stack>
      </form>
      <RendererScriptRuns scriptId={id} tab={tab} setTab={setTab} />
    </ScrollArea>
  );
};

const RendererScriptRuns: React.FC<{
  scriptId: string;
  tab: string | null;
  setTab: (value: string | null) => void;
}> = ({ scriptId, tab, setTab }) => {
  const scriptRuns = useScriptRuns(scriptId);

  return (
    <>
      <Accordion variant='contained' p='md'>
        <AccordionItem value='debug'>
          <AccordionControl px='md'>Script Runs</AccordionControl>
          <AccordionPanel>
            <CodeHighlight
              code={JSON.stringify(scriptRuns.data ?? [], undefined, 2)}
              language='json'
              withCopyButton={false}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <div className='mx-4 rounded-md border border-solid border-gray-200 p-3'>
        {scriptRuns.isPending ? (
          <Loader />
        ) : scriptRuns.isSuccess && scriptRuns.data.length === 0 ? (
          <p className='text-center text-sm text-slate-600'>
            No script runs yet
          </p>
        ) : null}
        <Tabs
          variant='outline'
          orientation='vertical'
          value={tab}
          onChange={(value) => setTab(value)}
        >
          <TabsList>
            {scriptRuns.data?.map((scriptRun) => {
              const scriptRunId = scriptRun.id!.id.String;
              return (
                <TabsTab key={scriptRunId} value={scriptRunId}>
                  {scriptRunId}
                </TabsTab>
              );
            })}
          </TabsList>
          {scriptRuns.data?.map((scriptRun) => {
            const scriptRunId = scriptRun.id!.id.String;
            return (
              <TabsPanel key={scriptRunId} value={scriptRunId} p='sm'>
                <Stack>
                  <Accordion variant='contained'>
                    <AccordionItem value='debug'>
                      <AccordionControl px='md'>Debug</AccordionControl>
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
      </div>
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
  const killScriptRun = useKillScriptRun();

  const status: 'running' | 'failed' | 'killed' | 'success' = useMemo(() => {
    if (scriptRun.finishedAt === null) {
      return 'running';
    } else if (
      scriptRun.exitStatus &&
      'exitCode' in scriptRun.exitStatus &&
      scriptRun.exitStatus.exitCode === 0
    ) {
      return 'success';
    } else if (scriptRun.exitStatus && 'signal' in scriptRun.exitStatus) {
      return 'killed';
    } else {
      return 'failed';
    }
  }, [scriptRun.exitStatus, scriptRun.finishedAt]);

  return (
    <>
      <Group>
        <Group gap={4} align='baseline'>
          {status === 'running' ? (
            <Loader size='xs' color='cyan' />
          ) : (
            <IconCircle
              className={
                status === 'failed' || status === 'killed'
                  ? 'text-red-500'
                  : 'text-green-400'
              }
              size={10}
            />
          )}
          <span className='capitalize'>{status}</span>
        </Group>
        <Button
          leftSection={<IconRefresh />}
          onClick={() =>
            queryClient.invalidateQueries({ queryKey: ['scriptRuns'] })
          }
        >
          Refresh
        </Button>
        {status !== 'running' && (
          <Button
            loading={deleteScriptRun.isPending}
            onClick={() => deleteScriptRun.mutate({ scriptId, id })}
            color='red'
            leftSection={<IconTrash />}
          >
            Delete
          </Button>
        )}
        {status === 'running' && (
          <Button
            color='Red'
            leftSection={<IconBolt />}
            onClick={() => killScriptRun.mutate({ scriptId, scriptRunId: id })}
            loading={killScriptRun.isPending}
          >
            Kill
          </Button>
        )}
      </Group>
      <Code w='100%' p='sm'>
        {logs}
      </Code>
    </>
  );
};
