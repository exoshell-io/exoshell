import { Panel, useStore } from 'reactflow';

export const ReactFlowDevtools: React.FC = () => {
  return (
    <>
      <ReactFlowNodeInspectorPanel />
    </>
  );
};

export const ReactFlowNodeInspectorPanel: React.FC = () => {
  const viewport = useStore(
    (s) =>
      `x: ${s.transform[0].toFixed(2)}, y: ${s.transform[1].toFixed(
        2,
      )}, zoom: ${s.transform[2].toFixed(2)}`,
  );
  return <Panel position='top-right'>{viewport}</Panel>;
};
