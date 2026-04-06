"use client";

import { CustomInput } from "@/components/ui/custom-input";

type EditPasswordViewProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  setOldPassword: (value: string) => void;
  setNewPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
};

export function EditPasswordView({
  oldPassword,
  newPassword,
  confirmPassword,
  setOldPassword,
  setNewPassword,
  setConfirmPassword,
  onCancel,
  onSave,
  isSaving = false,
}: EditPasswordViewProps) {
  return (
    <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <h2 className="mb-7 text-[18px] font-semibold text-[#1f1f1f]">
        Modifier mot de passe
      </h2>

      <CustomInput
        label="Ancien mot de passe"
        type="password"
        placeholder="Ancien mot de passe"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <CustomInput
        label="Mot de passe"
        type="password"
        placeholder="Mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <CustomInput
        label="Confirmer votre mot de passe"
        type="password"
        placeholder="Confirmer votre mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <div className="mt-6 flex justify-end gap-6 text-[14px]">
        <button
          type="button"
          onClick={onCancel}
          className="font-medium text-[#e53935] underline underline-offset-2 hover:opacity-80"
        >
          Annuler
        </button>

        <button
          type="button"
          onClick={onSave}
          disabled={isSaving}
          className="font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88] disabled:opacity-60"
        >
          {isSaving ? "Enregistrement..." : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}