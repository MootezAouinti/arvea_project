export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  password: string;
  password_confirmation: string;
  country_id?: number;
  accept_privacy_policy: boolean;
  newsletter?: boolean;
  remember?: boolean;
}