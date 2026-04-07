"use client";

import Link from "next/link";
import type { AuthUser } from "../../interfaces/auth-response.interface";

type EditMode = null | "profile" | "email" | "phone" | "password";

type ContactInfoDefaultViewProps = {
  user: AuthUser | null;
  onOpenEdit: (mode: EditMode) => void;
  locale: string;
};

function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-[14px] font-medium text-[#111827] underline underline-offset-2 transition-colors duration-200 hover:text-[#0c7c88]"
    >
      Modifier
    </button>
  );
}

function VerifiedBadge() {
  return (
    <span className="text-[14px] font-medium text-[#10b981]">
      Vérifié
    </span>
  );
}

export function ContactInfoDefaultView({
  user,
  onOpenEdit,
  locale,
}: ContactInfoDefaultViewProps) {
  const isEmailVerified = Boolean(user?.email_verified_at);
  const isPhoneVerified = Boolean(user?.phone_verified_at);

  return (
    <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[26px] pb-[28px] pt-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <h2 className="mb-8 text-[18px] font-semibold text-[#1f1f1f]">
        Informations de contact
      </h2>

      <div className="mb-5 flex items-center justify-between gap-6">
        <p className="text-[16px] text-[#4b5563]">
          {user?.first_name} {user?.last_name}
        </p>
        <EditBtn onClick={() => onOpenEdit("profile")} />
      </div>

      <div className="mb-5 flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3">
          <p className="truncate text-[16px] text-[#4b5563]">
            {user?.email ?? "-"}
          </p>

          {isEmailVerified ? (
            <VerifiedBadge />
          ) : (
            <Link
              href={`/${locale}/account/verify-email`}
              className="shrink-0 text-[14px] font-medium text-[#111827] underline underline-offset-2 transition-colors duration-200 hover:text-[#0c7c88]"
            >
              Vérifier Maintenant
            </Link>
          )}
        </div>

        <EditBtn onClick={() => onOpenEdit("email")} />
      </div>

      <div className="mb-11 flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-3">
          <p className="text-[16px] text-[#4b5563]">
            {user?.phone ?? "-"}
          </p>

          {isPhoneVerified ? (
            <VerifiedBadge />
          ) : (
            <Link
              href={`/${locale}/account/verify-phone`}
              className="shrink-0 text-[14px] font-medium text-[#111827] underline underline-offset-2 transition-colors duration-200 hover:text-[#0c7c88]"
            >
              Vérifier Maintenant
            </Link>
          )}
        </div>

        <EditBtn onClick={() => onOpenEdit("phone")} />
      </div>

      <div>
        <h3 className="mb-4 text-[18px] font-semibold text-[#111827]">
          Mot de passe
        </h3>

        <div className="flex items-center justify-between gap-6">
          <p className="text-[16px] tracking-[0.18em] text-[#4b5563]">
            ********
          </p>
          <EditBtn onClick={() => onOpenEdit("password")} />
        </div>
      </div>
    </div>
  );
}