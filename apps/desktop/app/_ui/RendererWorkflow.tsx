import {
  useDeleteWorkflow,
  useUpsertWorkflow,
  useWorkflows,
  type Workflow,
} from '@/_state';
import {
  ActionIcon,
  ActionIconGroup,
  Box,
  Button,
  Stack,
  Tooltip,
} from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactFlow, {
  Background,
  Connection,
  ConnectionLineType,
  Controls,
  Handle,
  Panel,
  Position,
  ReactFlowProvider,
  SelectionMode,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { ReactFlowDevtools } from './ReactFlowDevtools';
import { IconAdd, IconTrash } from './icons';
import { Allotment } from 'allotment';

export const RendererWorkflow: React.FC<{ id: string }> = ({ id }) => {
  const workflows = useWorkflows();
  const workflow = useMemo(
    () => (workflows.isSuccess ? workflows.data[id] : null),
    [workflows, id],
  );
  const upsertWorkflow = useUpsertWorkflow();

  const form = useForm<Workflow>({
    validate: {
      name: isNotEmpty('Name is required'),
    },
  });

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized || workflow === null) return;
    form.setValues(workflow);
    form.resetDirty();
    setInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflow]);

  const onSubmit = useMemo(
    () =>
      form.onSubmit((values) => {
        upsertWorkflow.mutate({ workflow: values });
      }),
    [form, upsertWorkflow],
  );

  useEffect(() => {
    upsertWorkflow.isSuccess && form.resetDirty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upsertWorkflow.isSuccess]);

  return (
    <form onSubmit={onSubmit} className='h-full'>
      <Stack className='h-full'>
        <Box className='grow'>
          <WorkflowGraph id={id} />
        </Box>
      </Stack>
    </form>
  );
};

const WorkflowGraph: React.FC<{ id: string }> = ({ id }) => {
  return (
    <ReactFlowProvider>
      <WorkflowGraphInner id={id} />
    </ReactFlowProvider>
  );
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const WorkflowGraphInner: React.FC<{ id: string }> = ({ id }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge({ ...connection, type: 'smoothstep' }, eds)),
    [setEdges],
  );

  const addNode = useCallback(() => {
    setNodes((nodes) => [
      ...nodes,
      {
        id: String(nodes.length + 1),
        position: { x: 0, y: 0 },
        data: { label: String(nodes.length + 1) },
        type: 'script',
      },
    ]);
  }, [setNodes]);

  const deleteWorkflow = useDeleteWorkflow();

  return (
    <Allotment>
      <Allotment.Pane minSize={150} preferredSize={150}>
        <Box />
      </Allotment.Pane>
      <Allotment.Pane>
        <Box h='100%'>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            selectionMode={SelectionMode.Partial}
            proOptions={{
              hideAttribution: true,
            }}
            fitView
            snapToGrid
            elevateEdgesOnSelect
            nodeTypes={nodeTypes}
            connectionLineType={ConnectionLineType.SmoothStep}
          >
            <ReactFlowDevtools />
            <Controls position='bottom-right' />
            <Background />
            <Panel position='top-left'>
              <ActionIconGroup
                orientation='vertical'
                bg='white'
                className='rounded-md border border-solid border-gray-200'
              >
                <Tooltip label='Add node'>
                  <ActionIcon
                    size='xl'
                    variant='subtle'
                    color='dark-gray'
                    onClick={addNode}
                  >
                    <IconAdd className='h-2/5 w-2/5' />
                  </ActionIcon>
                </Tooltip>
              </ActionIconGroup>
            </Panel>
          </ReactFlow>
        </Box>
      </Allotment.Pane>
      <Allotment.Pane minSize={150} preferredSize={150}>
        <Stack p='sm'>
          <Button
            onClick={() => deleteWorkflow.mutate({ id })}
            color='red'
            leftSection={<IconTrash />}
          >
            Delete
          </Button>
        </Stack>
      </Allotment.Pane>
    </Allotment>
  );
};

const ReactFlowScriptNode: React.FC = () => {
  return (
    <Box className='rounded-md border border-solid border-gray-200 bg-white p-4'>
      <Handle type='target' position={Position.Left} />
      <Handle type='source' position={Position.Right} />
    </Box>
  );
};

const ReactFlowInputNode: React.FC = () => {
  return (
    <Box className='rounded-md border border-solid border-gray-200 bg-white p-4'>
      <Handle type='source' position={Position.Right} />
    </Box>
  );
};

const nodeTypes = { script: ReactFlowScriptNode };
