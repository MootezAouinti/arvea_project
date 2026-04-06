"use client";

import PhoneIcon from "@/icons/phone-icon";
import type { AuthUser } from "../../interfaces/auth-response.interface";

type EditPhoneViewProps = {
  user: AuthUser | null;
  newPhone: string;
  setNewPhone: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
};

export function EditPhoneView({
  user,
  newPhone,
  setNewPhone,
  onCancel,
  onSave,
  isSaving = false,
}: EditPhoneViewProps) {
  return (
    <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <h2 className="mb-7 text-[18px] font-semibold text-[#1f1f1f]">
        Mettre à jour le numéro de téléphone
      </h2>

      <div className="mb-5 flex justify-center">
        <PhoneIcon />
      </div>

      <p className="mb-3 text-[13px] text-[#6b7280]">
        Saisissez le nouveau numéro de téléphone
      </p>

      <div className="mb-5 flex overflow-hidden rounded-[6px] border border-[#d1d5db] focus-within:border-[#0c7c88]">
        <div className="flex shrink-0 items-center gap-2 border-r border-[#d1d5db] bg-[#f9fafb] px-3 py-[12px]">
          <span className="text-[16px]">🇹🇳</span>
          <span className="text-[14px] text-[#374151]">+216</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 4.5l3 3 3-3"
              stroke="#6b7280"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <input
          type="tel"
          placeholder={user?.phone ?? ""}
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
          className="flex-1 px-4 py-[12px] text-[14px] text-[#1f1f1f] outline-none placeholder:text-[#9ca3af]"
        />
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="mb-4 w-full rounded-[6px] bg-[#0c7c88] py-[13px] text-[15px] font-semibold text-white transition-colors hover:bg-[#0a6b76] disabled:opacity-60"
      >
        {isSaving ? "Enregistrement..." : "Modifier téléphone"}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onCancel}
          className="text-[14px] font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]"
        >
          Pas maintenant
        </button>
      </div>
    </div>
  );
}