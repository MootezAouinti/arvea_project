"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/shared/Header";
import { AccountSidebar } from "@/features/auth/components/account-sidebar";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";

type VerificationFormBaseProps = {
  title: string;
  description: string;
  successMessageDefault: string;
  verifyButtonLabel: string;
  breadcrumbLabel: string;
  successRedirectQueryKey: "emailVerified" | "phoneVerified";
  onSendCode: () => Promise<unknown>;
  onVerifyCode: (code: string) => Promise<unknown>;
};

export function VerificationFormBase({
  title,
  description,
  successMessageDefault,
  verifyButtonLabel,
  breadcrumbLabel,
  successRedirectQueryKey,
  onSendCode,
  onVerifyCode,
}: VerificationFormBaseProps) {
  const router = useRouter();
  const params = useParams();
  const locale = typeof params?.locale === "string" ? params.locale : "fr";

  const { user } = useCurrentUser();

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>(
    successMessageDefault
  );
  const [errorMessage, setErrorMessage] = useState("");
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const joinedCode = useMemo(() => code.join(""), [code]);
  const hasSentInitialCodeRef = useRef(false);

  useEffect(() => {
    if (hasSentInitialCodeRef.current) return;
    hasSentInitialCodeRef.current = true;

    async function sendInitialCode() {
        try {
        await onSendCode();
        } catch (error) {
        console.error("Failed to send verification code:", error);
        setErrorMessage("Impossible d’envoyer le code de vérification.");
        }
  }

  sendInitialCode();
}, [onSendCode]);

  function handleChange(index: number, value: string) {
    if (!/^\d?$/.test(value)) return;

    const next = [...code];
    next[index] = value;
    setCode(next);
    setErrorMessage("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    if (joinedCode.length !== 6) {
      setErrorMessage("Veuillez saisir le code complet à 6 chiffres.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await onVerifyCode(joinedCode);

      router.push(
        `/${locale}/CustomerPortal/account?${successRedirectQueryKey}=1`
      );
    } catch (error) {
      console.error("Failed to verify code:", error);
      setErrorMessage("Le code saisi est incorrect ou expiré.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    try {
      setIsResending(true);
      setErrorMessage("");

      await onSendCode();
      setCode(["", "", "", "", "", ""]);
      setSuccessMessage(successMessageDefault);
      inputsRef.current[0]?.focus();
    } catch (error) {
      console.error("Failed to resend code:", error);
      setErrorMessage("Impossible de renvoyer le code.");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f6f6] text-[#1f1f1f]">
      <Header />

      <div className="h-[53px] border-b border-[#e8e8e8] bg-[#f8f8f8]">
        <div className="mx-auto flex h-full w-full max-w-[1400px] items-center px-6">
          <div className="flex items-center gap-2 text-[14px]">
            <button
              type="button"
              onClick={() => router.push(`/${locale}/CustomerPortal/account`)}
              className="text-[#111827] underline underline-offset-2 hover:text-[#0c7c89]"
            >
              Mon compte
            </button>

            <span className="text-[#8a8a8a]">/</span>

            <span className="text-[#111827]">{breadcrumbLabel}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-14">
        <div className="grid grid-cols-[270px_minmax(0,1fr)_274px] gap-7">
          <AccountSidebar
            user={user}
            currentLocale={locale}
            onLogout={() => {}}
            isLoggingOut={false}
          />

          <section className="min-w-0">
            <div className="max-w-[675px] rounded-[10px] border border-[#ececec] bg-white px-[32px] pb-[36px] pt-[28px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              {successMessage ? (
                <div className="mb-8 flex items-center justify-between rounded-[10px] bg-[#e6f4ee] px-5 py-4 text-[#11875d]">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} />
                    <span className="text-[15px] font-medium">
                      {successMessage}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSuccessMessage("")}
                    className="text-[#11875d]"
                    aria-label="Fermer le message de succès"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : null}

              <div className="mb-6 flex justify-center">
                <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full border border-[#d9e5ea] bg-[#f8fbfc]">
                  <span className="text-[34px]">🔒</span>
                </div>
              </div>

              <p className="mb-6 text-center text-[18px] font-semibold text-[#1f1f1f]">
                {title}
              </p>

              <p className="mx-auto mb-6 max-w-[580px] text-center text-[15px] leading-6 text-[#667085]">
                {description}
              </p>

              <div className="mb-5 flex justify-center gap-2">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-[48px] w-[48px] rounded-[6px] border border-[#cfd8dc] text-center text-[28px] font-semibold text-[#111827] outline-none focus:border-[#8fd3f4] focus:ring-2 focus:ring-[#d7eef9]"
                  />
                ))}
              </div>

              {errorMessage ? (
                <p className="mb-4 text-center text-[14px] font-medium text-red-600">
                  {errorMessage}
                </p>
              ) : null}

              <p className="mb-4 text-center text-[14px] text-[#667085]">
                Vous n’avez pas reçu de code ?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88] disabled:opacity-60"
                >
                  {isResending ? "Renvoi..." : "Cliquez pour renvoyer."}
                </button>
              </p>

              <button
                type="button"
                onClick={handleVerify}
                disabled={isSubmitting}
                className="mb-4 w-full rounded-[6px] bg-[#0c7c88] py-[13px] text-[18px] font-semibold text-white transition-colors hover:bg-[#0a6b76] disabled:opacity-60"
              >
                {isSubmitting ? "Vérification..." : verifyButtonLabel}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => router.push(`/${locale}/CustomerPortal/account`)}
                  className="text-[14px] font-medium text-[#111827] underline underline-offset-2 hover:text-[#0c7c88]"
                >
                  Pas maintenant
                </button>
              </div>
            </div>
          </section>

          <aside className="w-full" />
        </div>
      </div>
    </main>
  );
}