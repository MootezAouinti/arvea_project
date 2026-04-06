"use client";

import * as React from "react";
import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  hint?: string;
  label?: string;
}

export function CustomInput({
  error,
  containerClassName,
  inputClassName,
  wrapperClassName,
  leftSlot,
  rightSlot,
  hint,
  label,
  className,
  type,
  ...props
}: CustomInputProps) {
  const isPasswordField = type === "password";
  const [showPassword, setShowPassword] = React.useState(false);

  const resolvedType =
    isPasswordField && showPassword ? "text" : type;

  const passwordToggle = isPasswordField ? (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="shrink-0 text-[#9ca3af] transition-colors hover:text-[#6b7280]"
      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
    >
      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
    </button>
  ) : null;

  const finalRightSlot = rightSlot ?? passwordToggle;
  const hasSlots = leftSlot || finalRightSlot;

  if (hasSlots) {
    return (
      <div className={clsx("w-full", containerClassName)}>
        {label ? (
          <label className="mb-1 block text-[13px] text-[#374151]">
            {label}
          </label>
        ) : null}

        <div
          className={clsx(
            "flex h-[50px] w-full items-center rounded-[8px] border border-[#dde3ec] bg-white px-4 transition-colors focus-within:border-[#0c7c88]",
            error && "border-red-400 focus-within:border-red-500",
            wrapperClassName
          )}
        >
          {leftSlot ? <div className="shrink-0">{leftSlot}</div> : null}

          <input
            type={resolvedType}
            className={clsx(
              "h-full flex-1 bg-transparent text-[15px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]",
              className,
              inputClassName
            )}
            {...props}
          />

          {finalRightSlot ? <div className="shrink-0">{finalRightSlot}</div> : null}
        </div>

        <div className="mt-1 min-h-[20px]">
          {error ? (
            <p className="text-xs text-red-600">{error}</p>
          ) : hint ? (
            <div className="flex justify-end">
              <span className="text-[11px] text-[#64748b]">{hint}</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className={clsx("w-full", containerClassName)}>
      {label ? (
        <label className="mb-1 block text-[13px] text-[#374151]">
          {label}
        </label>
      ) : null}

      <div className="relative">
        <input
          type={resolvedType}
          className={clsx(
            "h-[50px] w-full rounded-[8px] border border-[#dde3ec] bg-white px-4 text-[15px] text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#0c7c88]",
            isPasswordField && "pr-11",
            error && "border-red-400 focus:border-red-500",
            className,
            inputClassName
          )}
          {...props}
        />

        {passwordToggle ? (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {passwordToggle}
          </div>
        ) : null}
      </div>

      <div className="mt-1 min-h-[20px]">
        {error ? (
          <p className="text-xs text-red-600">{error}</p>
        ) : hint ? (
          <div className="flex justify-end">
            <span className="text-[11px] text-[#64748b]">{hint}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}