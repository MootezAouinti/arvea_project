"use client";

import * as React from "react";
import clsx from "clsx";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function CustomButton({
  children,
  isLoading = false,
  disabled,
  className,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={clsx(
        "w-full rounded-xl px-4 py-3 text-sm font-medium text-white transition",
        "bg-neutral-900 hover:opacity-90",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}