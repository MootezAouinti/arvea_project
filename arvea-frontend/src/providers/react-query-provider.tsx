"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, use, useCallback, useState } from "react";
const createQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 60 * 1000,
                gcTime: 5 * 60 * 1000,
                retry: 1,
            },
            mutations: {
                retry: 0,
            },
        },
    });
export function QueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => createQueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}