import { Group, Text } from '@mantine/core';
import Link from 'next/link';
import { Logo } from './Logo';

export const Brand: React.FC<{}> = () => {
  return (
    <Link href='/'>
      <Group gap='xs'>
        <Logo />
        <span className='text-xl font-bold'>ExoShell</span>
      </Group>
    </Link>
  );
};
