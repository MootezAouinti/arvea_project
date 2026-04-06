"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { ApiError } from "@/libs/api/client";
import { CustomAuthAction } from "@/components/ui/custom-auth-action";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { CustomInput } from "@/components/ui/custom-input";
import { useLogin } from "../hooks/use-login";
import { GoogleIcon, HomeIcon } from "./auth-action-icons";
import { PasswordToggleButton } from "./password-toggle-button";

type ValidationErrors = Record<string, string[]>;


export function AccountPasswordForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const locale = typeof params?.locale === "string" ? params.locale : "fr";

  const emailFromQuery = useMemo(
    () => searchParams.get("email")?.trim() ?? "",
    [searchParams]
  );

  const {
    setFormData,
    formData,
    loginMutation,
    setFormError,
    setValidationErrors,
    formError,
    validationErrors,
    isPending,
  } = useLogin({
    onSuccess: () => {
      router.push(`/${locale}/CustomerPortal/account`);
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        setFormError(error.message);
        setValidationErrors(error.errors ?? {});
        return;
      }

      setFormError(error.message || "Something went wrong.");
      setValidationErrors({});
    },
  });

  function updateField<K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) {
    setFormData({
      ...formData,
      email: emailFromQuery,
      [key]: value,
    });
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    setValidationErrors({});

    loginMutation({
      email: emailFromQuery,
      password: formData.password,
      remember: formData.remember,
    });
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

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between bg-transparent px-4 py-15">
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

            <h2 className="mt-3 text-[19px] font-semibold text-[#1f2a44]">
              Bienvenue parmi nous !
            </h2>

            {emailFromQuery ? (
              <p className="mt-1 text-[13px] text-[#64748b]">
                {emailFromQuery}{" "}
                <Link
                  href={`/${locale}/login`}
                  className="font-semibold uppercase text-[#b8860b] underline underline-offset-2"
                >
                  CHANGER
                </Link>
              </p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            {formError ? (
              <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            ) : null}

            <div>
              <CustomInput
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={formData.password}
                onChange={(event) => updateField("password", event.target.value)}
                error={validationErrors.password?.[0]}
                required
                className="h-[52px] rounded-[8px]"
                inputClassName="pr-3"
                rightSlot={
                  <PasswordToggleButton
                    shown={showPassword}
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                }
              />

              <div className="mt-1 text-right">
                <Link
                  href={`/${locale}/forgot-password`}
                  className="text-[13px] text-[#64748b] underline underline-offset-1 hover:text-[#0c7c88]"
                >
                  Mot de passe oublié?
                </Link>
              </div>
            </div>

            <CustomCheckbox
              checked={formData.remember}
              onChange={(event) => updateField("remember", event.target.checked)}
              label={<>Gardez ma session ouverte</>}
              containerClassName="text-[14px]"
            />

            <CustomButton
              type="submit"
              isLoading={isPending}
              className="rounded-[5px]"
            >
              {isPending ? "Connexion..." : "Connexion"}
            </CustomButton>
          </form>

          <div className="w-full">
            <div className="relative flex items-center justify-center py-1">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#d1d5db]" />
              <span className="relative bg-transparent px-4 text-[15px] font-medium uppercase text-[#6b7a90]">
                OU
              </span>
            </div>

            <p className="mt-1 text-center text-[13px] font-medium uppercase tracking-wide text-[#6b7a90]">
              CONTINUER AVEC COMPTE
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <CustomAuthAction
              icon={<GoogleIcon />}
              onClick={() => {
                // add Google auth logic here
              }}
              className="h-[46px] rounded-[8px] px-8 text-[15px]"
            >
              Google
            </CustomAuthAction>

            <CustomAuthAction
              href={`/${locale}`}
              icon={<HomeIcon />}
              className="h-[46px] rounded-[8px] px-8 text-[15px]"
            >
              Retour à la boutique
            </CustomAuthAction>
          </div>
        </div>

        <footer className="mt-6 flex w-full max-w-[1200px] items-center justify-between px-4 text-[12px] text-[#64748b]">
          <span>© 2026 – ARVEA, Tous droits réservés.</span>
          <span>Développé par MaisonDuWeb</span>
        </footer>
      </div>
    </main>
  );
}