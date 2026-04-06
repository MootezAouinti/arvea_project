"use client";

import * as React from "react";
import clsx from "clsx";

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  containerClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  hint?: string;
}

export function CustomInput({
  error,
  containerClassName,
  inputClassName,
  wrapperClassName,
  leftSlot,
  rightSlot,
  hint,
  className,
  ...props
}: CustomInputProps) {
  const hasSlots = leftSlot || rightSlot;

  if (hasSlots) {
    return (
      <div className={clsx("w-full", containerClassName)}>
        <div
          className={clsx(
            "flex h-[50px] w-full items-center rounded-[8px] border border-[#dde3ec] bg-white px-4 transition-colors focus-within:border-[#0c7c88]",
            error && "border-red-400 focus-within:border-red-500",
            wrapperClassName
          )}
        >
          {leftSlot ? <div className="shrink-0">{leftSlot}</div> : null}

          <input
            className={clsx(
              "h-full flex-1 bg-transparent text-[15px] text-[#0f172a] outline-none placeholder:text-[#94a3b8]",
              className,
              inputClassName
            )}
            {...props}
          />

          {rightSlot ? <div className="shrink-0">{rightSlot}</div> : null}
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
      <input
        className={clsx(
          "h-[50px] w-full rounded-[8px] border border-[#dde3ec] bg-white px-4 text-[15px] text-[#0f172a] outline-none transition-colors placeholder:text-[#94a3b8] focus:border-[#0c7c88]",
          error && "border-red-400 focus:border-red-500",
          className,
          inputClassName
        )}
        {...props}
      />

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