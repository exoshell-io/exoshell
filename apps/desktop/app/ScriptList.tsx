'use client';

import { Container, NavLink } from '@mantine/core';
import { useMemo } from 'react';

export const ScriptList: React.FC = () => {
  const tasks = useMemo(() => {
    return ['aaa', 'bbb'].map((task) => (
      <NavLink key={task} label={task} variant='subtle' active />
    ));
  }, []);
  return <Container>{tasks}</Container>;
};
