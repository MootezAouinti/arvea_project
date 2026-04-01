export type UserRole = "admin" | "client" | string;

export interface Country {
  id: number;
  name: string;
  currency: string;
  default_language_id: number | null;
  status: string;
  config_type_stock: string;
  is_active_for_admin: boolean;
  domain: string | null;
  main_domain: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  admin: boolean;
  user_default_language_id: number | null;
  created_at: string;
  updated_at: string;
  country_id: number;
  role_id: number | null;
  country: Country | null;
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export interface LoginResponse {
  success: boolean;
  type: string;
  message: string;
  data: {
    user: AuthUser;
    token: string;
    token_type: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user: AuthUser;
    token: string;
    token_type: string;
  };
}

export interface LogoutResponse {
  success?: boolean;
  message: string;
}