"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { ApiError } from "@/libs/api/client";
import { authService } from "@/features/auth/services/auth.service";

export function VerifyCodeForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = typeof params?.locale === "string" ? params.locale : "fr";

  const email = useMemo(
    () => searchParams.get("email")?.trim() ?? "",
    [searchParams]
  );

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullCode = code.join("");
    setFormError(null);
    setSuccessMessage(null);

    if (!email) {
      setFormError("Adresse e-mail introuvable.");
      return;
    }

    if (fullCode.length !== 6) {
      setFormError("Veuillez saisir le code complet.");
      return;
    }

    try {
      setIsSubmitting(true);

      await authService.verifyResetCode({
        email,
        code: fullCode,
      });

      router.push(
        `/${locale}/password/reset?email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendCode = async () => {
    setFormError(null);
    setSuccessMessage(null);

    if (!email) {
      setFormError("Adresse e-mail introuvable.");
      return;
    }

    try {
      setIsResending(true);

      await authService.forgotPassword({ email });

      setSuccessMessage("Un nouveau code a été envoyé.");
      setCode(["", "", "", "", "", ""]);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError("Impossible de renvoyer le code.");
      }
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = code.every((digit) => digit !== "");

  return (
    <main className="relative min-h-screen bg-[#efefef]">
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-[420px] rounded-xl bg-white px-8 py-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold tracking-widest">ARVEA</h1>

          <h2 className="mt-4 text-[18px] font-semibold">
            Réinitialiser mot de passe !
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            Vous allez recevoir un code de vérification sur l’adresse mail
          </p>

          <p className="mt-1 text-sm font-semibold">
            {email}{" "}
            <Link href={`/${locale}/forgot-password`} className="underline">
              Modifier
            </Link>
          </p>

          <div className="mt-6 flex justify-center gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                id={`code-${i}`}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                maxLength={1}
                className="h-[48px] w-[48px] rounded-md border text-center text-xl outline-none focus:border-[#0c7c88]"
              />
            ))}
          </div>

          {formError ? (
            <p className="mt-4 text-sm text-red-600">{formError}</p>
          ) : null}

          {successMessage ? (
            <p className="mt-4 text-sm text-green-600">{successMessage}</p>
          ) : null}

          <p className="mt-4 text-sm text-gray-500">
            Vous n&apos;avez pas reçu de code ?{" "}
            <button
              type="button"
              onClick={handleResendCode}
              disabled={isResending}
              className="underline disabled:opacity-60"
            >
              {isResending ? "Renvoi..." : "Cliquez pour renvoyer."}
            </button>
          </p>

          <CustomButton
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={!isComplete || isSubmitting}
            className="mt-6 w-full"
          >
            Envoyer le code
          </CustomButton>

          <Link
            href={`/${locale}/login`}
            className="mt-4 block underline"
          >
            Annuler
          </Link>
        </div>
      </div>
    </main>
  );
}