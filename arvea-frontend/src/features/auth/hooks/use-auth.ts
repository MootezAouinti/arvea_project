"use client";

import { useQuery } from "@tanstack/react-query";
import { authQueryKeys } from "../constants/auth.query-keys";
import { authService } from "../services/auth.service";

export function useAuth() {
  const query = useQuery({
    queryKey: authQueryKeys.me(),
    queryFn: () => authService.me(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: query.data?.data ?? null,
    response: query.data ?? null,
    isAuthenticated: !!query.data?.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
    refetch: query.refetch,
  };
}