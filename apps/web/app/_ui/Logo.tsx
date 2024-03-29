import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { FaTerminal } from 'react-icons/fa';

export const Logo: React.FC = () => {
  return (
    <Link href='/'>
      <Group gap='sm'>
        <FaTerminal size={28} />
        <Text fw='bold' c='black' size='lg'>
          ExoShell
        </Text>
      </Group>
    </Link>
  );
};
