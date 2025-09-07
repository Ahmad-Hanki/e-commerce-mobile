import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { queryConfig } from '@/lib/react-query';
import { MainErrorFallback } from '@/components/ui/error';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      })
  );

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      {process.env.DEV && <ReactQueryDevtools />}

      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
};
