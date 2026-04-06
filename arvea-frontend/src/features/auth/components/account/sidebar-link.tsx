"use client";

import Link from "next/link";
import { AccountSidebarItem } from "../../types/account-sidebar";

type SidebarLinkProps = AccountSidebarItem;

export function SidebarLink({
  href,
  icon,
  label,
  active = false,
  onClick,
  disabled = false,
}: SidebarLinkProps) {
  const className = `flex items-center gap-3 text-[16px] leading-none transition-colors ${
    active
      ? "font-semibold text-[#0e7c86]"
      : "font-normal text-[#1f1f1f] hover:text-[#0e7c86]"
  } ${disabled ? "opacity-60" : ""}`;

  const content = (
    <>
      <span className={active ? "text-[#0e7c86]" : "text-[#1f1f1f]"}>
        {icon}
      </span>
      <span className={active ? "underline underline-offset-2" : ""}>
        {label}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${className} text-left`}
    >
      {content}
    </button>
  );
}