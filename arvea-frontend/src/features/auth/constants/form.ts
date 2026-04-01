

type LoginFieldName = "email" | "password";

interface LoginFieldConfig {
  id: number;
  name: LoginFieldName;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}

export const loginFields: LoginFieldConfig[] = [
  {
    id: 1,
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
  },
  {
    id: 2,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "current-password",
    placeholder: "••••••••",
  },
];

export type RegisterFieldName =
  | "name"
  | "email"
  | "password"
  | "password_confirmation";

interface RegisterFieldConfig {
  id: number;
  name: RegisterFieldName;
  label: string;
  type: string;
  autoComplete: string;
  placeholder: string;
}

export const registerFields: RegisterFieldConfig[] = [
  {
    id: 1,
    name: "name",
    label: "Name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your full name",
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    placeholder: "you@example.com",
  },
  {
    id: 3,
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "••••••••",
  },
  {
    id: 4,
    name: "password_confirmation",
    label: "Confirm password",
    type: "password",
    autoComplete: "new-password",
    placeholder: "••••••••",
  },
];