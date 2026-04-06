"use client";

type EditProfileViewProps = {
  firstName: string;
  lastName: string;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
};

export function EditProfileView({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  onCancel,
  onSave,
  isSaving = false,
}: EditProfileViewProps) {
  return (
    <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <h2 className="mb-7 text-[18px] font-semibold text-[#1f1f1f]">
        Informations de contact
      </h2>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-[13px] text-[#374151]">
            Prénom
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded-[6px] border border-[#d1d5db] px-3 py-[12px] text-[14px] text-[#1f1f1f] outline-none focus:border-[#0c7c88]"
          />
        </div>

        <div>
          <label className="mb-1 block text-[13px] text-[#374151]">
            Nom de famille
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-[6px] border border-[#d1d5db] px-3 py-[12px] text-[14px] text-[#1f1f1f] outline-none focus:border-[#0c7c88]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-6 text-[14px]">
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