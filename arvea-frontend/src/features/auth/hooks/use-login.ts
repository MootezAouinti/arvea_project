"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@/libs/api/client";
import { authQueryKeys } from "../constants/auth.query-keys";
import { authService } from "../services/auth.service";
import type { LoginRequest } from "../interfaces/auth-request.interface";
import type { LoginResponse } from "../interfaces/auth-response.interface";

type ValidationErrors = Record<string, string[]>;

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: ApiError | Error) => void;
}

const initialFormData: LoginRequest = {
  email: "",
  password: "",
  remember: false,
};

export function useLogin(options?: UseLoginOptions) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<LoginRequest>(initialFormData);
  const [formError, setFormError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const { mutate: loginMutation, isPending } = useMutation<
    LoginResponse,
    ApiError | Error,
    LoginRequest
  >({
    mutationFn: (payload) => authService.login(payload),
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

  return {
    formData,
    setFormData,
    formError,
    setFormError,
    validationErrors,
    setValidationErrors,
    loginMutation,
    isPending,
  };
}