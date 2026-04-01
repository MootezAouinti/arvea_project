"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/libs/api/client";
import { authQueryKeys } from "../constants/auth.query-keys";
import { authService } from "../services/auth.service";
import type { LogoutResponse } from "../interfaces/auth-response.interface";

interface UseLogoutOptions {
  onSuccess?: (data: LogoutResponse) => void;
  onError?: (error: ApiError | Error) => void;
}

export function useLogout(options?: UseLogoutOptions) {
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, ApiError | Error>({
    mutationFn: () => authService.logout(),
    onSuccess: async (data) => {
      queryClient.setQueryData(authQueryKeys.me(), null);

      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.me(),
      });

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
}