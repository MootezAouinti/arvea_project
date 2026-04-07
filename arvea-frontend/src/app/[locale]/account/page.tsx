"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import Header from "@/components/shared/Header";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useAccountEdit } from "@/features/auth/hooks/use-account-edit";
import { AccountSidebar } from "@/features/auth/components/account-sidebar";
import { AccountContactSection } from "@/features/auth/components/account/account-contact-section";
import { CheckCircle2, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function AccountPage() {
  const { user, refetch } = useCurrentUser();
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = typeof params?.locale === "string" ? params.locale : "fr";

  const emailVerified = searchParams.get("emailVerified") === "1";
  const phoneVerified = searchParams.get("phoneVerified") === "1";

  const successMessage = emailVerified
    ? "Vérification réussie! Votre adresse mail a été vérifiée avec succès."
    : phoneVerified
      ? "Vérification réussie! Votre numéro de téléphone a été vérifié avec succès."
      : "";

  const [showSuccessBanner, setShowSuccessBanner] = useState(
    emailVerified || phoneVerified
  );

  useEffect(() => {
    setShowSuccessBanner(emailVerified || phoneVerified);
  }, [emailVerified, phoneVerified]);

  const {
    editMode,
    isSaving,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    newEmail,
    setNewEmail,
    emailPassword,
    setEmailPassword,
    showEmailPassword,
    setShowEmailPassword,
    newPhone,
    setNewPhone,
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    openEdit,
    closeEdit,
    handleSave,
    handleLogout,
    isLoggingOut,
  } = useAccountEdit({
    user,
    refetch,
  });

  return (
    <main className="min-h-screen bg-[#f6f6f6] text-[#1f1f1f]">
      <Header />

      <div className="h-[53px] border-b border-[#e8e8e8] bg-[#f8f8f8]">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center px-6">
          <div className="flex items-center gap-2 text-[14px]">
            <Link
              href={`/${locale}/account`}
              className="underline underline-offset-2 text-[#111827] hover:text-[#0c7c89]"
            >
              Mon compte
            </Link>
            <span className="text-[#8a8a8a]">/</span>
            <span className="underline underline-offset-2 text-[#111827] hover:text-[#0c7c89]">
              Informations du compte
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-14">
        <div className="grid grid-cols-[270px_minmax(0,1fr)_274px] gap-7">
          <AccountSidebar
            user={user}
            currentLocale={locale}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />

          <section className="min-w-0">
            {showSuccessBanner ? (
              <div className="mb-4 max-w-[675px] flex items-center justify-between rounded-[10px] bg-[#e6f4ee] px-5 py-4 text-[#11875d]">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} />
                  <span className="text-[15px] font-medium">
                    {successMessage}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSuccessBanner(false)}
                  className="text-[#11875d]"
                >
                  <X size={20} />
                </button>
              </div>
            ) : null}

            <AccountContactSection
              user={user}
              editMode={editMode}
              isSaving={isSaving}
              locale={locale}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              newEmail={newEmail}
              setNewEmail={setNewEmail}
              emailPassword={emailPassword}
              setEmailPassword={setEmailPassword}
              showEmailPassword={showEmailPassword}
              setShowEmailPassword={setShowEmailPassword}
              newPhone={newPhone}
              setNewPhone={setNewPhone}
              oldPassword={oldPassword}
              setOldPassword={setOldPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              openEdit={openEdit}
              closeEdit={closeEdit}
              handleSave={handleSave}
            />
          </section>

          <aside className="w-full">
            <div className="relative h-[506px] w-[274px] overflow-hidden rounded-[4px] bg-[linear-gradient(180deg,#d9e4ee_0%,#c1dbe7_45%,#99d3eb_100%)]">
              <Image
                src="/images/account-banner.png"
                alt="Promotion"
                fill
                className="object-cover"
                priority
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}