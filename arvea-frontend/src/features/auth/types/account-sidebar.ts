import type { ReactNode  } from "react";

export type AccountSidebarItem = {
  href?: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};