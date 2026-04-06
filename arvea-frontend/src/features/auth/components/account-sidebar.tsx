"use client";

import Link from "next/link";
import {
  CircleHelp,
  Gift,
  LogOut,
  MapPinned,
  Package,
  RotateCcw,
  Users,
} from "lucide-react";
import type { AuthUser } from "../interfaces/auth-response.interface";
import { AccountSidebarItem } from "@/features/auth/types/account-sidebar";


type AccountSidebarProps = {
  user: AuthUser | null;
  currentLocale: string;
  onLogout: () => void;
  isLoggingOut?: boolean;
};

function SidebarItem({
  href,
  icon,
  label,
  active = false,
  onClick,
  disabled = false,
}: AccountSidebarItem) {
  const baseClassName =
    "flex items-start gap-3 text-[16px] leading-[1.35] transition-colors duration-200";
  const activeClassName = active
    ? "font-semibold text-[#0c7c88]"
    : "text-[#374151] hover:text-[#0c7c88]";

  if (href) {
    return (
      <Link href={href} className={`${baseClassName} ${activeClassName}`}>
        <span className="mt-[3px] shrink-0">{icon}</span>
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClassName} ${activeClassName} text-left disabled:opacity-60`}
    >
      <span className="mt-[3px] shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function AccountSidebar({
  user,
  currentLocale,
  onLogout,
  isLoggingOut = false,
}: AccountSidebarProps) {
  const primaryLinks: AccountSidebarItem[] = [
    {
      href: "/",
      icon: <RotateCcw size={18} strokeWidth={2.1} />,
      label: "Retour à la boutique",
    },
    {
      href: `/${currentLocale}/account/orders`,
      icon: <Package size={18} strokeWidth={2.1} />,
      label: "Mes commandes",
    },
  ];

  const accountLinks: AccountSidebarItem[] = [
    {
      href: `/${currentLocale}/account`,
      icon: <Users size={18} strokeWidth={2.1} />,
      label: "Informations du compte",
      active: true,
    },
    {
      href: `/${currentLocale}/account/addresses`,
      icon: <MapPinned size={18} strokeWidth={2.1} />,
      label: "Adresses",
    },
    {
      href: `/${currentLocale}/account/money-vouchers`,
      icon: <Gift size={18} strokeWidth={2.1} />,
      label: "Mes moneyVouchers",
    },
  ];

  return (
    <aside className="w-full">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#1f1f1f] text-[24px] font-semibold text-[#29415f]">
          {user?.first_name?.charAt(0)?.toUpperCase() ?? ""}
        </div>

        <div className="leading-[1.05]">
          <p className="text-[18px] font-semibold text-[#1f1f1f]">
            Bienvenue,
          </p>
          <p className="text-[18px] font-semibold text-[#1f1f1f]">
            {user?.first_name} {user?.last_name}
          </p>
        </div>
      </div>

      <div className="mb-6 flex h-[38px] items-center justify-between rounded-[8px] bg-[#edf1f7] px-4">
        <span className="text-[15px] font-medium text-[#4b5563]">
          Solde CashBack
        </span>

        <div className="flex items-center gap-2">
          <CircleHelp size={16} className="text-[#6b7280]" />
          <span className="text-[15px] font-semibold text-[#374151]">
            {user?.cashback ?? 0} TND
          </span>
        </div>
      </div>

      <nav className="space-y-5">
        {primaryLinks.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="my-7 h-px w-[132px] bg-[#dddddd]" />

      <h3 className="mb-5 text-[16px] font-semibold text-[#111827]">
        Mon compte
      </h3>

      <nav className="space-y-5">
        {accountLinks.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </nav>

      <div className="my-7 h-px w-[132px] bg-[#dddddd]" />

      <div className="flex items-start gap-3 text-[16px] leading-[1.35] text-[#374151] hover:text-[#0c7c88]">
        <Users size={18} strokeWidth={2.1} className="mt-[3px] shrink-0" />
        <span>Parrainer un(e) ami(e) (Bientôt disponible)</span>
      </div>

      <div className="h-[56px]" />

      <SidebarItem
        icon={<LogOut size={18} strokeWidth={2.1} />}
        label={isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
        onClick={onLogout}
        disabled={isLoggingOut}
      />
    </aside>
  );
}