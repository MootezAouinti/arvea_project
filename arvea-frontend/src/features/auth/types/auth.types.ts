export type UserRole = "admin" | "client" | string;

export type User = {
  id: number;
  name: string;
  email: string;
  country_id?: number | null;
  country_code?: string | null;
  roles?: UserRole[];
};

export type LoginPayload = {
  email: string;
  password: string;
  remember?: boolean;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type AuthResponse = {
  user: User;
  message?: string;
};

export type LogoutResponse = {
  message?: string;
};