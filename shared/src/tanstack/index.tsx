import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export * from "./use-products";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

export const QueryDevTool = () => <ReactQueryDevtools initialIsOpen={false} />;
