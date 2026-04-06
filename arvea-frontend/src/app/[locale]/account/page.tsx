"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CircleHelp,
  Gift,
  LogOut,
  MapPinned,
  Package,
  RotateCcw,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import { useParams } from "next/navigation";

import Header from "@/components/shared/Header";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useAccountEdit } from "@/features/auth/hooks/use-account-edit";
import { AccountSidebar } from "@/features/auth/components/account-sidebar";
import { AccountContactSection } from "@/features/auth/components/account/account-contact-section";

export default function AccountPage() {
  const { user, refetch } = useCurrentUser();
  const params = useParams();

  const locale =
    typeof params?.locale === "string" ? params.locale : "fr";

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
    isLoggingOut
  } = useAccountEdit({
    user,
    refetch,
  });

  return (
    <main className="min-h-screen bg-[#f6f6f6] text-[#1f1f1f]">
      <Header />

      {/* Breadcrumb */}
      <div className="h-[53px] border-b border-[#e8e8e8] bg-[#f8f8f8]">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center px-6">
          <div className="flex items-center gap-2 text-[14px]">
            <Link href="/fr/account" className="underline underline-offset-2 text-[#111827] hover:text-[#0c7c89]">
              Mon compte
            </Link>
            <span className="text-[#8a8a8a]">/</span>
            <span className="underline underline-offset-2 text-[#111827] hover:text-[#0c7c89]">
              Informations du compte
            </span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-14">
        <div className="grid grid-cols-[270px_minmax(0,1fr)_274px] gap-7">

          {/* ── Left sidebar ── */}
          <AccountSidebar
            user={user}
            currentLocale={locale}
            onLogout={handleLogout}
            isLoggingOut={isLoggingOut}
          />

          {/* ── Center section ── */}
          <AccountContactSection
            user={user}
            editMode={editMode}
            isSaving={isSaving}
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

          {/* ── Right banner ── */}
          <aside className="w-full">
            <div className="relative h-[506px] w-[274px] overflow-hidden rounded-[4px] bg-[linear-gradient(180deg,#d9e4ee_0%,#c1dbe7_45%,#99d3eb_100%)]">
              <Image src="/images/account-banner.png" alt="Promotion" fill className="object-cover" priority />
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}


