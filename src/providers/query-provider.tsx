"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type QueryClientProviderProps } from "@tanstack/react-query/dist/types";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function QueryProvider({
  children,
  ...props
}: QueryClientProviderProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} {...props}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
