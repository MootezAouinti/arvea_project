import { ApiError, apiClient, backendClient } from "@/libs/api/client";
import { authStorage } from "./auth-storage.service";
import type {
  LoginRequest,
  RegisterRequest,
} from "../interfaces/auth-request.interface";
import type {
  AuthUser,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RegisterResponse,
} from "../interfaces/auth-response.interface";

const AUTH_PREFIX = "/auth";

export const apiUrl = {
  me: `${AUTH_PREFIX}/me`,
  login: `${AUTH_PREFIX}/login`,
  register: `${AUTH_PREFIX}/register`,
  logout: `${AUTH_PREFIX}/logout`,
  update_profile: `${AUTH_PREFIX}/update-profile`,
  update_email: `${AUTH_PREFIX}/update-email`,
  update_phone: `${AUTH_PREFIX}/update-phone`,
  update_psw: `${AUTH_PREFIX}/update-password`,
  forgot_password: `${AUTH_PREFIX}/forgot-password`,
  verify_reset_code: `${AUTH_PREFIX}/verify-reset-code`,
  reset_password: `${AUTH_PREFIX}/reset-password`,
  send_email_verification_code: `${AUTH_PREFIX}/send-email-verification-code`,
  verify_email_code: `${AUTH_PREFIX}/verify-email-code`,
  send_phone_verification_code: `${AUTH_PREFIX}/send-phone-verification-code`,
  verify_phone_code: `${AUTH_PREFIX}/verify-phone-code`,
};

class AuthService {
  async csrf(): Promise<void> {
    await backendClient.get<void>("/sanctum/csrf-cookie");
  }

  async me() {
    try {
      const response = await apiClient.get<MeResponse>(apiUrl.me);
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

    const response = await apiClient.post<LoginResponse>(apiUrl.login, payload);
    authStorage.setToken(response.data.token);

    return response;
  }

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    await this.csrf();

    const response = await apiClient.post<RegisterResponse>(apiUrl.register, payload);
    authStorage.setToken(response.data.token);

    return response;
  }

  async logout(): Promise<LogoutResponse> {
    const response = await apiClient.post<LogoutResponse>(apiUrl.logout);

    authStorage.removeToken();

    return {
      success: response.success,
      message: response.message ?? "Logout successful.",
    };
  }

  async checkEmail(email: string): Promise<{ success: boolean; message: string; data: { exists: boolean } }> {
    await this.csrf();
    return apiClient.post("/auth/check-email", { email });
  }

  async updateProfile(data: { first_name: string; last_name: string }) {
    return apiClient.put<{ user: AuthUser }>(apiUrl.update_profile, data);
  }

  async updateEmail(data: { email: string; password: string }) {
    return apiClient.put<{ user: AuthUser }>(apiUrl.update_email, data);
  }

  async updatePhone(data: { phone: string }) {
    return apiClient.put<{ user: AuthUser }>(apiUrl.update_phone, data);
  }

  async updatePassword(data: {
    old_password: string;
    password: string;
    password_confirmation: string;
  }) {
    return apiClient.put<{ message: string }>(apiUrl.update_psw, data);
  }

  async forgotPassword(data: { email: string }) {
    return apiClient.post<{
      success: boolean;
      message: string;
      data?: { email: string; code?: string };
    }>(apiUrl.forgot_password, data);
  }

  async verifyResetCode(data: { email: string; code: string }) {
    return apiClient.post<{
      success: boolean;
      message: string;
      data?: { email: string };
    }>(apiUrl.verify_reset_code, data);
  }

  async resetForgottenPassword(data: {
    email: string;
    password: string;
    password_confirmation: string;
  }) {
    return apiClient.post<{
      success: boolean;
      message: string;
    }>(apiUrl.reset_password, data);
  }

  async sendEmailVerificationCode() {
    return apiClient.post<{
      success: boolean;
      message: string;
    }>(apiUrl.send_email_verification_code);
  }

  async verifyEmailCode(data: { code: string }) {
    return apiClient.post<{
      success: boolean;
      message: string;
    }>(apiUrl.verify_email_code, data);
  }

  async sendPhoneVerificationCode() {
    return apiClient.post<{
      success: boolean;
      message: string;
    }>(apiUrl.send_phone_verification_code);
}

  async verifyPhoneCode(data: { code: string }) {
    return apiClient.post<{
      success: boolean;
      message: string;
      data?: { user: AuthUser };
    }>(apiUrl.verify_phone_code, data);
}


}

export const authService = new AuthService();