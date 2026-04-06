"use client";

type EditBtnProps = {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
};

export function EditBtn({
  onClick,
  label = "Modifier",
  disabled = false,
}: EditBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="shrink-0 text-[14px] font-medium text-[#111827] underline underline-offset-2 transition-colors duration-200 hover:text-[#0c7c88] disabled:opacity-60"
    >
      {label}
    </button>
  );
}