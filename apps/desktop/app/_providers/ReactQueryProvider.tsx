'use client';

import { showNotification } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'always',
      retry: false,
      refetchOnWindowFocus: false,
    },
    mutations: {
      networkMode: 'always',
      retry: false,
      onError: (error) => {
        console.error('ReactQuery mutation error:', error);
        showNotification({
          message: error as unknown as string,
          color: 'red',
          withBorder: true,
          autoClose: false,
          bottom: '12px',
          right: '-4px',
        });
      },
    },
  },
});

export const ReactQueryProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition='bottom-left' />
      {children}
    </QueryClientProvider>
  );
};
