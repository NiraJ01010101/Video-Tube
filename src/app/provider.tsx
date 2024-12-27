"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainErrorFallback } from "components/errors/main";
import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";

// import { Notifications } from '@/components/ui/notifications';
// import { queryConfig } from '@/lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  // const [queryClient] = React.useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: queryConfig,
  //     }),
  // );
  const queryClient = new QueryClient();
  // console.log("queryClient",queryClient)
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        {/* {process.env.DEV && <ReactQueryDevtools />} */}
        {/* <Notifications /> */}
        {children}
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
