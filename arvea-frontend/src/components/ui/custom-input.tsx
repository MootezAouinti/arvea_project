"use client";

import * as React from "react";
import clsx from "clsx";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function CustomInput({
  id,
  label,
  error,
  className,
  containerClassName,
  ...props
}: CustomInputProps) {
  return (
    <div className={clsx("space-y-2", containerClassName)}>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-800"
      >
        {label}
      </label>

      <input
        id={id}
        className={clsx(
          "w-full rounded-xl border px-4 py-3 text-sm outline-none transition",
          error
            ? "border-red-400 focus:border-red-500"
            : "border-neutral-300 focus:border-neutral-900",
          className
        )}
        {...props}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}