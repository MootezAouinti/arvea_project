"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomInput } from "@/components/ui/custom-input";
import { ApiError } from "@/libs/api/client";
import { authService } from "@/features/auth/services/auth.service";

export function ResetPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = typeof params?.locale === "string" ? params.locale : "fr";

  const email = useMemo(
    () => searchParams.get("email")?.trim() ?? "",
    [searchParams]
  );

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setFormError(null);

    if (!email) {
      setFormError("Adresse e-mail introuvable.");
      return;
    }

    if (!password || !confirm) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    }

    if (password !== confirm) {
      setFormError("La confirmation du mot de passe ne correspond pas.");
      return;
    }

    try {
      setIsSubmitting(true);

      await authService.resetForgottenPassword({
        email,
        password,
        password_confirmation: confirm,
      });

      router.push(`/${locale}/login`);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormError(error.message);
      } else {
        setFormError("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#efefef]">
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="w-full max-w-[420px] rounded-xl bg-white px-8 py-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold tracking-widest">ARVEA</h1>

          <h2 className="mt-4 text-[18px] font-semibold">
            Créer un nouveau mot de passe
          </h2>

          <div className="mt-6 space-y-4">
            <CustomInput
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={formError && !password ? formError : undefined}
            />

            <CustomInput
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {formError ? (
            <p className="mt-3 text-left text-sm text-red-600">{formError}</p>
          ) : null}

          <CustomButton
            onClick={handleSubmit}
            isLoading={isSubmitting}
            className="mt-6 w-full"
          >
            Enregistrer le mot de passe
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