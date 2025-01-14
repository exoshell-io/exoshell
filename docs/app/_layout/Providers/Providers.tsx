import { ThemeProvider } from 'next-themes';
import { ClientSideProviders } from './ClientSideProviders';
import { ExoshellProvider } from '@exoshell/ui';

export const Providers: React.FC<Readonly<React.PropsWithChildren>> = ({
  children,
}) => {
  return (
    <ThemeProvider attribute='class'>
      <ExoshellProvider>
        <ClientSideProviders>{children}</ClientSideProviders>
      </ExoshellProvider>
    </ThemeProvider>
  );
};
