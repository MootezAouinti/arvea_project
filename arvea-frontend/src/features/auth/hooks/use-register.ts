"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/libs/api/client";
import { authQueryKeys } from "../constants/auth.query-keys";
import { authService } from "../services/auth.service";
import type { RegisterRequest } from "../interfaces/auth-request.interface";
import type { RegisterResponse } from "../interfaces/auth-response.interface";

interface UseRegisterOptions {
  onSuccess?: (data: RegisterResponse) => void;
  onError?: (error: ApiError | Error) => void;
}

export function useRegister(options?: UseRegisterOptions) {
  const queryClient = useQueryClient();

  return useMutation<RegisterResponse, ApiError | Error, RegisterRequest>({
    mutationFn: (payload) => authService.register(payload),
    onSuccess: async (data) => {
      queryClient.setQueryData(authQueryKeys.me(), data.data.user);

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