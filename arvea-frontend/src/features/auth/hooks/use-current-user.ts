"use client";

import { useCallback, useEffect, useState } from "react";
import { authService } from "../services/auth.service";
import type { AuthUser } from "../interfaces/auth-response.interface";

export function useCurrentUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await authService.me();

      if (!response) {
        setUser(null);
        return;
      }

      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    user,
    isLoading,
    refetch,
  };
}