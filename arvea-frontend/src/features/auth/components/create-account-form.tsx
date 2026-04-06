"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { ApiError } from "@/libs/api/client";
import { useRegister } from "../hooks/use-register";

type ValidationErrors = Record<string, string[]>;

export function CreateAccountForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const locale = typeof params?.locale === "string" ? params.locale : "fr";
  const emailFromQuery = useMemo(
    () => searchParams.get("email")?.trim() ?? "",
    [searchParams],
  );

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: emailFromQuery,
    phone: "",
    password: "",
    password_confirmation: "",
    accept_privacy_policy: false,
    newsletter: false,
    remember: false,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const registerMutation = useRegister({
    onSuccess: () => {
      router.push(`/${locale}/CustomerPortal/account`);
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        setFormError(error.message);
        setValidationErrors(error.errors ?? {});
        return;
      }

      setFormError(error.message || "Une erreur est survenue.");
      setValidationErrors({});
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null);
    setValidationErrors({});

    registerMutation.mutate({
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone || undefined,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      country_id: 1,
      accept_privacy_policy: formData.accept_privacy_policy,
      newsletter: formData.newsletter,
      remember: formData.remember,
    });
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-[460px] rounded-[28px] bg-white px-8 py-10 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-light tracking-[0.2em] text-neutral-900">
            ARVEA
          </h1>

          <h2 className="mt-6 text-3xl font-semibold text-[#1f2a44]">
            Bienvenue parmi nous !
          </h2>

          {formData.email ? (
            <p className="mt-2 text-sm text-[#64748b]">
              {formData.email}{" "}
              <Link
                href={`/${locale}/login`}
                className="font-semibold underline underline-offset-4"
              >
                CHANGER
              </Link>
            </p>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formError ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {formError}
            </div>
          ) : null}

          <div>
            <input
              type="text"
              placeholder="Prénom"
              value={formData.first_name}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  first_name: event.target.value,
                }))
              }
              className="h-12 w-full rounded-md border border-[#dfe5ec] px-4 text-sm outline-none placeholder:text-[#9aa4b2] focus:border-[#0b7c88]"
              required
            />
            {validationErrors.first_name?.[0] ? (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.first_name[0]}
              </p>
            ) : null}
          </div>

          <div>
            <input
              type="text"
              placeholder="Nom de famille"
              value={formData.last_name}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  last_name: event.target.value,
                }))
              }
              className="h-12 w-full rounded-md border border-[#dfe5ec] px-4 text-sm outline-none placeholder:text-[#9aa4b2] focus:border-[#0b7c88]"
              required
            />
            {validationErrors.last_name?.[0] ? (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.last_name[0]}
              </p>
            ) : null}
          </div>

          <div>
            <input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              className="h-12 w-full rounded-md border border-[#dfe5ec] px-4 text-sm outline-none placeholder:text-[#9aa4b2] focus:border-[#0b7c88]"
              required
            />
            {validationErrors.email?.[0] ? (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.email[0]}
              </p>
            ) : null}
          </div>

          <div>
            <input
              type="tel"
              placeholder="+216 20 123 456"
              value={formData.phone}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  phone: event.target.value,
                }))
              }
              className="h-12 w-full rounded-md border border-[#dfe5ec] px-4 text-sm outline-none placeholder:text-[#9aa4b2] focus:border-[#0b7c88]"
            />
            {validationErrors.phone?.[0] ? (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.phone[0]}
              </p>
            ) : null}
          </div>

          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              className="h-12 w-full rounded-md border border-[#dfe5ec] px-4 text-sm outline-none placeholder:text-[#9aa4b2] focus:border-[#0b7c88]"
              required
            />
            {validationErrors.password?.[0] ? (
              <p className="mt-1 text-sm text-red-600">
                {validationErrors.password[0]}
              </p>
            ) : null}
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirmer votre mot de passe"
              value={formData.password_confirmation}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  password_confirmation: event.target.value,
                }))
              }
              className="h-12 w-full rounded-md border border-[#dfe5ec] px-4 text-sm outline-none placeholder:text-[#9aa4b2] focus:border-[#0b7c88]"
              required
            />
          </div>

          <div className="space-y-3 pt-1 text-sm text-[#334155]">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.accept_privacy_policy}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    accept_privacy_policy: event.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-neutral-300"
              />
              <span>J&apos;accepte la politique de confidentialité</span>
            </label>
            {validationErrors.accept_privacy_policy?.[0] ? (
              <p className="text-sm text-red-600">
                {validationErrors.accept_privacy_policy[0]}
              </p>
            ) : null}

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.newsletter}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    newsletter: event.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-neutral-300"
              />
              <span>S&apos;inscrire à la newsletter</span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={formData.remember}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    remember: event.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-neutral-300"
              />
              <span>Garder ma session ouverte</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="mt-2 h-12 w-full rounded-md bg-[#0b7c88] text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerMutation.isPending ? "Création..." : "Créer un compte"}
          </button>

          <Link
            href={`/${locale}/login`}
            className="block text-center text-sm font-medium text-[#334155] underline underline-offset-4"
          >
            Annuler
          </Link>
        </form>
      </div>
    </section>
  );
}