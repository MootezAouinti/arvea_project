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
      disabled={disabled || isLoading}
      className={clsx(
        "h-[50px] w-full rounded-[8px] text-[16px] font-semibold text-white transition",
        "bg-[#0c7f8c] hover:opacity-95",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    >
      {isLoading ? "Création..." : children}
    </button>
  );
}