import { useStore } from '@/_store';
import { NavLink, Text } from '@mantine/core';

export const ScriptRunList: React.FC = () => {
  const scriptRuns = useStore((state) => state.scriptRuns);

  if (scriptRuns.length === 0) {
    return <Text c='dimmed'>No scripts</Text>;
  }

  return scriptRuns.map((scriptRun) => (
    <NavLink key={scriptRun.id!.id} label={scriptRun.id!.id} />
  ));
};
