'use client';

import { Provider } from 'jotai';

export const JotaiProvider: React.FC<Readonly<React.PropsWithChildren>> = ({
  children,
}) => {
  return <Provider>{children}</Provider>;
};
