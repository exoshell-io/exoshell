'use client';

import { Provider } from 'jotai';
import { DevTools } from 'jotai-devtools';

export const JotaiProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <Provider>
      <DevTools position='bottom-right' />
      {children}
    </Provider>
  );
};
