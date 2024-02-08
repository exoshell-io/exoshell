import { useStore } from '@/_store';
import { NavLink, Text } from '@mantine/core';

export const ScriptList: React.FC = () => {
  const scripts = useStore((state) => state.scripts);

  if (scripts.length === 0) {
    return <Text c='dimmed'>No scripts</Text>;
  }

  return scripts.map((script) => (
    <NavLink
      key={script.id!.id}
      label={script.name}
      href={`/scripts/${script.id!.id}`}
    />
  ));
};
