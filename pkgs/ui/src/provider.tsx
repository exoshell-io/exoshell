'use client';

import { useRouter } from 'next/navigation';
import { RouterProvider } from 'react-aria-components';

// =============================================================================
// #region ExoshellProvider

export const ExoshellProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/unbound-method
  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
};

// #endregion
