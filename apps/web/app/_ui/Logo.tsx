import { Group } from '@mantine/core';
import { FaTerminal } from 'react-icons/fa';

export const Logo: React.FC = () => {
  return (
    <Group gap='sm'>
      <FaTerminal size={28} />
      <p className='font-logo text-3xl font-semibold'>ExoShell</p>
    </Group>
  );
};
