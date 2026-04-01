

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