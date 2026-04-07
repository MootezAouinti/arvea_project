"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomInput } from "@/components/ui/custom-input";
import { ApiError } from "@/libs/api/client";
import { authService } from "@/features/auth/services/auth.service";

export function ForgotPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = typeof params?.locale === "string" ? params.locale : "fr";

  const emailFromQuery = useMemo(
    () => searchParams.get("email")?.trim() ?? "",
    [searchParams]
  );

  const [email, setEmail] = useState(emailFromQuery);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      setFormError("Veuillez saisir votre adresse e-mail.");
      return;
    }

    try {
      setIsSubmitting(true);

      await authService.forgotPassword({
        email: email.trim(),
      });

      router.push(
        `/${locale}/password/verify-code?email=${encodeURIComponent(
          email.trim()
        )}`
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#efefef]">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/patterns/auth-pattern.png')",
          backgroundRepeat: "repeat",
          opacity: 0.12,
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between bg-transparent px-4 py-10">
        <div className="flex w-full max-w-[500px] flex-1 flex-col items-center justify-center gap-6 rounded-2xl bg-white/60 px-10 py-10 backdrop-blur-sm">
          <div className="text-center">
            <h1
              className="font-bold tracking-[0.2em] text-[#111827]"
              style={{ fontSize: 30 }}
            >
              ARVEA
              <sup
                style={{
                  fontSize: 11,
                  verticalAlign: "super",
                  fontWeight: 700,
                }}
              >
                ®
              </sup>
            </h1>

            <h2 className="mt-4 text-[19px] font-semibold text-[#1f2a44]">
              Réinitialiser mot de passe !
            </h2>

            <p className="mx-auto mt-4 max-w-[320px] text-[13px] leading-6 text-[#64748b]">
              Pas de souci ! Entrez votre e-mail pour recevoir un code
              de réinitialisation de mot de passe.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-[420px] space-y-4">
            {formError ? (
              <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            ) : null}

            <CustomInput
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="h-[52px] rounded-[8px]"
            />

            <CustomButton
              type="submit"
              isLoading={isSubmitting}
              className="rounded-[5px]"
            >
              {isSubmitting ? "Envoi..." : "Recevoir le code"}
            </CustomButton>

            <div className="pt-1 text-center">
              <Link
                href={`/${locale}/login${
                  email ? `?email=${encodeURIComponent(email)}` : ""
                }`}
                className="text-[16px] font-semibold text-[#111827] underline underline-offset-[3px]"
              >
                Annuler
              </Link>
            </div>
          </form>
        </div>

        <footer className="mt-6 flex w-full max-w-[1200px] items-center justify-between px-4 text-[12px] text-[#64748b]">
          <span>© 2026 – ARVEA, Tous droits réservés.</span>
          <span>Développé par MaisonDuWeb</span>
        </footer>
      </div>
    </main>
  );
}