"use client";

import * as React from "react";
import clsx from "clsx";

interface CustomCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: React.ReactNode;
  error?: string;
  containerClassName?: string;
}

export function CustomCheckbox({
  label,
  error,
  containerClassName,
  className,
  ...props
}: CustomCheckboxProps) {
  return (
    <div className={clsx("w-full", containerClassName)}>
      <label className="flex cursor-pointer items-start gap-3 text-[13px] text-[#475569]">
        <input
          type="checkbox"
          className={clsx(
            "mt-[2px] h-4 w-4 rounded border-[#cbd5e1] accent-[#0c7c88]",
            className
          )}
          {...props}
        />
        <span>{label}</span>
      </label>

      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}