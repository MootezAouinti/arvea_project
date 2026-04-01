import { ApiError, apiClient, backendClient } from "@/libs/api/client";
import { authStorage } from "./auth-storage.service";
import type {
  LoginRequest,
  RegisterRequest,
} from "../interfaces/auth-request.interface";
import type {
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RegisterResponse,
} from "../interfaces/auth-response.interface";

class AuthService {
  async csrf(): Promise<void> {
    await backendClient.get<void>("/sanctum/csrf-cookie");
  }

  async me() {
    try {
      const response = await apiClient.get<MeResponse>("/auth/me");
      return response;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return null;
      }

      throw error;
    }
  }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    await this.csrf();

    const response = await apiClient.post<LoginResponse>("/auth/login", payload);

    authStorage.setToken(response.data.token);

    return response;
  }

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    await this.csrf();

    const response = await apiClient.post<RegisterResponse>("/auth/register", payload);

    authStorage.setToken(response.data.token);

    return response;
  }

  async logout(): Promise<LogoutResponse> {
    const response = await apiClient.post<LogoutResponse>("/auth/logout");

    authStorage.removeToken();

    return {
      success: response.success,
      message: response.message ?? "Logout successful.",
    };
  }
}

export const authService = new AuthService();