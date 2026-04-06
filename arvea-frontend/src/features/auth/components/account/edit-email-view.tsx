"use client";

import { Eye, EyeOff } from "lucide-react";
import { EmailIcon } from "@/icons";

type EditEmailViewProps = {
  newEmail: string;
  emailPassword: string;
  showEmailPassword: boolean;
  setNewEmail: (value: string) => void;
  setEmailPassword: (value: string) => void;
  setShowEmailPassword: (value: boolean) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
};

export function EditEmailView({
  newEmail,
  emailPassword,
  showEmailPassword,
  setNewEmail,
  setEmailPassword,
  setShowEmailPassword,
  onCancel,
  onSave,
  isSaving = false,
}: EditEmailViewProps) {
  return (
    <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <h2 className="mb-7 text-[18px] font-semibold text-[#1f1f1f]">
        Modifier l&apos;adresse Email
      </h2>

      <div className="mb-5 flex justify-center">
        <EmailIcon />
      </div>

      <p className="mb-5 text-center text-[15px] font-semibold text-[#1f1f1f]">
        Mettre à jour l&apos;adresse email
      </p>

      <input
        type="email"
        placeholder="Entrez votre nouvelle adresse e-mail"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        className="mb-3 w-full rounded-[6px] border border-[#d1d5db] px-4 py-[12px] text-[14px] text-[#1f1f1f] outline-none placeholder:text-[#9ca3af] focus:border-[#0c7c88]"
      />

      <div className="relative mb-5">
        <input
          type={showEmailPassword ? "text" : "password"}
          placeholder="Entrez votre mot de passe actuel"
          value={emailPassword}
          onChange={(e) => setEmailPassword(e.target.value)}
          className="w-full rounded-[6px] border border-[#d1d5db] px-4 py-[12px] pr-11 text-[14px] text-[#1f1f1f] outline-none placeholder:text-[#9ca3af] focus:border-[#0c7c88]"
        />
        <button
          type="button"
          onClick={() => setShowEmailPassword(!showEmailPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"
        >
          {showEmailPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className="mb-4 w-full rounded-[6px] bg-[#0c7c88] py-[13px] text-[15px] font-semibold text-white transition-colors hover:bg-[#0a6b76] disabled:opacity-60"
      >
        {isSaving ? "Enregistrement..." : "Modifier l&apos;adresse Email"}
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