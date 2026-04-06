"use client";

import Link from "next/link";
import * as React from "react";
import clsx from "clsx";

type BaseProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

type ButtonVariantProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined; 
  };

type LinkVariantProps = BaseProps & {
  href: string;
};

type CustomAuthActionProps = ButtonVariantProps | LinkVariantProps;

const sharedClasses =
  "flex h-[44px] min-w-[200px] items-center justify-center gap-2 rounded-[10px] border border-[#d1d5db] bg-white shadow-sm transition hover:bg-gray-50";

export function CustomAuthAction(props: CustomAuthActionProps) {
  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={clsx(
          sharedClasses,
          "px-6 text-[13px] font-medium text-[#334155]",
          props.className
        )}
      >
        {props.icon}
        {props.children}
      </Link>
    );
  }

  const { icon, children, className, ...buttonProps } = props;

  return (
    <button
      type="button"
      className={clsx(
        sharedClasses,
        "px-8 text-[14px] font-medium text-[#111827]",
        className
      )}
      {...buttonProps}
    >
      {icon}
      {children}
    </button>
  );
}