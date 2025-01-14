'use client';

import { useRouter } from 'next/navigation';
import { I18nProvider, RouterProvider, useLocale } from 'react-aria-components';

export interface ClientSideProvidersProps {}

export const ClientSideProviders: React.FC<
  Readonly<React.PropsWithChildren<ClientSideProvidersProps>>
> = ({ children }) => {
  const router = useRouter();
  const { locale } = useLocale();
  return (
    <I18nProvider locale={locale}>
      <RouterProvider
        navigate={(path, routerOptions) => {
          router.push(path, routerOptions);
        }}
      >
        {children}
      </RouterProvider>
    </I18nProvider>
  );
};
