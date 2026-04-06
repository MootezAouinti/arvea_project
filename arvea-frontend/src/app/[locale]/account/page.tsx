"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import Header from "@/components/shared/Header";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { authService } from "@/features/auth/services/auth.service";


type EditMode = null | "profile" | "email" | "phone" | "password";

export default function AccountPage() {
  const { user, isLoading, refetch } = useCurrentUser();
  const [editMode, setEditMode] = useState<EditMode>(null);

  // Profile fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Email fields
  const [newEmail, setNewEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [showEmailPassword, setShowEmailPassword] = useState(false);

  // Phone fields
  const [newPhone, setNewPhone] = useState("");

  // Password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function openEdit(mode: EditMode) {
  setEditMode(mode);

  if (mode === "profile") {
    setFirstName(user?.first_name ?? "");
    setLastName(user?.last_name ?? "");
  }

  if (mode === "email") {
    setNewEmail(user?.email ?? "");
    setEmailPassword("");
  }

  if (mode === "phone") {
    setNewPhone(user?.phone ?? "");
  }

  if (mode === "password") {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }
}

  function close() {
    setEditMode(null);
  }

  const handleSave = async () => {
  try {
    switch (editMode) {
      case "profile":
        await authService.updateProfile({
          first_name: firstName,
          last_name: lastName,
        });
        break;

      case "email":
        await authService.updateEmail({
          email: newEmail,
          password: emailPassword,
        });
        break;

      case "phone":
        await authService.updatePhone({
          phone: newPhone,
        });
        break;

      case "password":
        await authService.updatePassword({
          old_password: oldPassword,
          password: newPassword,
          password_confirmation: confirmPassword,
        });
        break;

      default:
        return;
    }

    await refetch();
    close();
  } catch (error) {
    console.error(error);
  }
};

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
          <aside className="w-full">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[#1f1f1f] text-[24px] font-semibold text-[#29415f]">
                {user?.first_name?.charAt(0)}
              </div>
              <div className="leading-[1.05]">
                <p className="text-[18px] font-semibold text-[#1f1f1f]">Bienvenue,</p>
                <p className="text-[18px] font-semibold text-[#1f1f1f]">
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
            </div>

            <div className="mb-6 flex h-[38px] items-center justify-between rounded-[8px] bg-[#edf1f7] px-4">
              <span className="text-[15px] font-medium text-[#4b5563]">Solde CashBack</span>
              <div className="flex items-center gap-2">
                <CircleHelp size={16} className="text-[#6b7280]" />
                <span className="text-[15px] font-semibold text-[#374151]">{user?.cashback} TND</span>
              </div>
            </div>

            <nav className="space-y-5">
              <SidebarLink href="/" icon={<RotateCcw size={18} strokeWidth={2.1} />} label="Retour à la boutique" />
              <SidebarLink href="/fr/account/orders" icon={<Package size={18} strokeWidth={2.1} />} label="Mes commandes" />
            </nav>

            <div className="my-7 h-px w-[132px] bg-[#dddddd]" />
            <h3 className="mb-5 text-[16px] font-semibold text-[#111827]">Mon compte</h3>

            <nav className="space-y-5">
              <SidebarLink href="/fr/account" icon={<Users size={18} strokeWidth={2.1} />} label="Informations du compte" active />
              <SidebarLink href="/fr/account/addresses" icon={<MapPinned size={18} strokeWidth={2.1} />} label="Adresses" />
              <SidebarLink href="/fr/account/money-vouchers" icon={<Gift size={18} strokeWidth={2.1} />} label="Mes moneyVouchers" />
            </nav>

            <div className="my-7 h-px w-[132px] bg-[#dddddd]" />

            <div className="flex items-start gap-3 text-[16px] leading-[1.35] text-[#374151] hover:text-[#0c7c88]">
              <Users size={18} strokeWidth={2.1} className="mt-[3px] shrink-0" />
              <span>Parrainer un(e) ami(e) (Bientôt disponible)</span>
            </div>

            <div className="h-[56px]" />
            <SidebarLink href="/fr/login" icon={<LogOut size={18} strokeWidth={2.1} />} label="Se déconnecter" />
          </aside>

          {/* ── Center section ── */}
          <section className="min-w-0">

            {/* ══ EDIT EMAIL ══ */}
            {editMode === "email" && (
              <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <h2 className="mb-7 text-[18px] font-semibold text-[#1f1f1f]">
                  Modifier l&apos;adresse Email
                </h2>

                <div className="mb-5 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="#edf6f7" />
                    <rect x="16" y="26" width="48" height="34" rx="5" fill="#c8eaed" stroke="#0c7c88" strokeWidth="2" />
                    <path d="M16 31l24 16 24-16" stroke="#0c7c88" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="56" cy="28" r="10" fill="white" stroke="#0c7c88" strokeWidth="1.5" />
                    <path d="M51 28l4 4 7-7" stroke="#0c7c88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  <button type="button" onClick={() => setShowEmailPassword(!showEmailPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                    {showEmailPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                <button onClick={handleSave} className="mb-4 w-full rounded-[6px] bg-[#0c7c88] py-[13px] text-[15px] font-semibold text-white hover:bg-[#0a6b76] transition-colors">
                  Modifier l&apos;adresse Email
                </button>

                <div className="text-center">
                  <button onClick={close} className="text-[14px] font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]">
                    Pas maintenant
                  </button>
                </div>
              </div>
            )}

            {/* ══ EDIT PHONE ══ */}
            {editMode === "phone" && (
              <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <h2 className="mb-7 text-[18px] font-semibold text-[#1f1f1f]">
                  Mettre à jour le numéro de téléphone
                </h2>

                <div className="mb-5 flex justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <circle cx="40" cy="40" r="40" fill="#edf6f7" />
                    <rect x="28" y="14" width="24" height="42" rx="5" fill="#c8eaed" stroke="#0c7c88" strokeWidth="2" />
                    <rect x="34" y="18" width="12" height="2.5" rx="1.2" fill="#0c7c88" />
                    <circle cx="40" cy="50" r="2.5" fill="#0c7c88" />
                    <circle cx="56" cy="26" r="10" fill="white" stroke="#0c7c88" strokeWidth="1.5" />
                    <path d="M51 26l4 4 7-7" stroke="#0c7c88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <p className="mb-3 text-[13px] text-[#6b7280]">Saisissez le nouveau numéro de téléphone</p>

                <div className="mb-5 flex overflow-hidden rounded-[6px] border border-[#d1d5db] focus-within:border-[#0c7c88]">
                  <div className="flex shrink-0 items-center gap-2 border-r border-[#d1d5db] bg-[#f9fafb] px-3 py-[12px]">
                    <span className="text-[16px]">🇹🇳</span>
                    <span className="text-[14px] text-[#374151]">+216</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5l3 3 3-3" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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

                <button onClick={handleSave} className="mb-4 w-full rounded-[6px] bg-[#0c7c88] py-[13px] text-[15px] font-semibold text-white hover:bg-[#0a6b76] transition-colors">
                  Modifier téléphone
                </button>

                <div className="text-center">
                  <button onClick={close} className="text-[14px] font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]">
                    Pas maintenant
                  </button>
                </div>
              </div>
            )}

            {/* ══ EDIT PASSWORD ══ */}
            {editMode === "password" && (
              <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <h2 className="mb-7 text-[18px] font-semibold text-[#1f1f1f]">
                  Modifier mot de passe
                </h2>

                <PasswordField
                  label="Ancien mot de passe"
                  placeholder="Ancien mot de passe"
                  value={oldPassword}
                  onChange={setOldPassword}
                  show={showOld}
                  onToggle={() => setShowOld(!showOld)}
                />
                <PasswordField
                  label="Mot de passe"
                  placeholder="Mot de passe"
                  value={newPassword}
                  onChange={setNewPassword}
                  show={showNew}
                  onToggle={() => setShowNew(!showNew)}
                />
                <PasswordField
                  label="Confirmer votre mot de passe"
                  placeholder="Confirmer votre mot de passe"
                  value={confirmPassword}
                  onChange={setConfirmPassword}
                  show={showConfirm}
                  onToggle={() => setShowConfirm(!showConfirm)}
                />

                <div className="mt-6 flex justify-end gap-6 text-[14px]">
                  <button onClick={close} className="font-medium text-[#e53935] underline underline-offset-2 hover:opacity-80">
                    Annuler
                  </button>
                  <button onClick={handleSave} className="font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]">
                    Enregistrer
                  </button>
                </div>
              </div>
            )}

            {/* ══ EDIT PROFILE (name) ══ */}
            {editMode === "profile" && (
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
                    onClick={close}
                    className="font-medium text-[#e53935] underline underline-offset-2 hover:opacity-80"
                  >
                    Annuler
                  </button>

                  <button
                    type="button"
                    onClick={handleSave}
                    className="font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            )}

            {/* ══ DEFAULT VIEW ══ */}
            {editMode === null && (
              <div className="max-w-[575px] rounded-[10px] border border-[#ececec] bg-white px-[26px] pb-[28px] pt-[20px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <h2 className="mb-8 text-[18px] font-semibold text-[#1f1f1f]">
                  Informations de contact
                </h2>

                {/* Name */}
                <div className="mb-5 flex items-center justify-between gap-6">
                  <p className="text-[16px] text-[#4b5563]">{user?.first_name} {user?.last_name}</p>
                  <EditBtn onClick={() => openEdit("profile")} />
                </div>

                {/* Email */}
                <div className="mb-5 flex items-center justify-between gap-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <p className="truncate text-[16px] text-[#4b5563]">{user?.email}</p>
                    <Link href="/fr/account/verify-email" className="text-[14px] font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]">
                      Vérifier Maintenant
                    </Link>
                  </div>
                  <EditBtn onClick={() => openEdit("email")} />
                </div>

                {/* Phone */}
                <div className="mb-11 flex items-center justify-between gap-6">
                  <div className="flex min-w-0 items-center gap-8">
                    <p className="text-[16px] text-[#4b5563]">{user?.phone}</p>
                    <Link href="/fr/account/verify-phone" className="text-[14px] font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]">
                      Vérifier Maintenant
                    </Link>
                  </div>
                  <EditBtn onClick={() => openEdit("phone")} />
                </div>

                {/* Password */}
                <div>
                  <h3 className="mb-4 text-[18px] font-semibold text-[#111827]">Mot de passe</h3>
                  <div className="flex items-center justify-between gap-6">
                    <p className="text-[16px] tracking-[0.18em] text-[#4b5563]">********</p>
                    <EditBtn onClick={() => openEdit("password")} />
                  </div>
                </div>
              </div>
            )}
          </section>

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

/* ── Reusable components ── */

function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 text-[14px] font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]"
    >
      Modifier
    </button>
  );
}

function PasswordField({
  label, placeholder, value, onChange, show, onToggle,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-[13px] text-[#374151]">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-[6px] border border-[#d1d5db] px-4 py-[12px] pr-11 text-[14px] text-[#1f1f1f] outline-none placeholder:text-[#9ca3af] focus:border-[#0c7c88]"
        />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#6b7280]">
          {show ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    </div>
  );
}

function SidebarLink({
  href, icon, label, active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 text-[16px] leading-none transition-colors ${active ? "font-semibold text-[#0e7c86]" : "font-normal text-[#1f1f1f] hover:text-[#0e7c86]"
        }`}
    >
      <span className={active ? "text-[#0e7c86]" : "text-[#1f1f1f]"}>{icon}</span>
      <span className={active ? "underline underline-offset-2" : ""}>{label}</span>
    </Link>
  );
}
