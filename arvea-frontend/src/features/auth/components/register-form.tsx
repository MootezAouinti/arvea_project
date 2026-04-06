"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from "react";import { ApiError } from "@/libs/api/client";
import { CustomButton } from "@/components/ui/custom-button";
import { CustomInput } from "@/components/ui/custom-input";
import { useRegister } from "../hooks/use-register";
import { registerFields } from "../constants/register-fields";
import { CustomCheckbox } from "@/components/ui/custom-checkbox";
import { registerCheckboxes } from "../constants/register-checkboxes";
import { CustomAuthAction } from "@/components/ui/custom-auth-action";
import { GoogleIcon, HomeIcon } from "./auth-action-icons";
import { PasswordToggleButton } from "@/features/auth/components/password-toggle-button";

type ValidationErrors = Record<string, string[]>;

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: object) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}


function PhonePrefix() {
  return (
    <div className="flex items-center">
      <div className="flex shrink-0 items-center gap-1 pr-3 text-[14px] text-[#111827]">
        <span>🇹🇳</span>
        <span className="font-medium">+216</span>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <div className="mr-3 h-5 w-px bg-[#dde3ec]" />
    </div>
  );
}

function CloudflareTurnstile({
  onVerify,
  onExpire,
}: {
  onVerify: (token: string) => void;
  onExpire: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    const existingScript = document.getElementById("cf-turnstile-script");

    const initWidget = () => {
      if (!containerRef.current || !window.turnstile) return;

      if (widgetIdRef.current) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      containerRef.current.innerHTML = "";

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey:
          process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
          "1x00000000000000000000AA",
        callback: (token: string) => onVerify(token),
        "expired-callback": () => onExpire(),
        theme: "light",
        size: "normal",
      });
    };

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = initWidget;
      document.head.appendChild(script);
    } else if (window.turnstile) {
      initWidget();
    } else {
      existingScript.addEventListener("load", initWidget);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onVerify, onExpire]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-[65px] w-full justify-center"
    />
  );
}

export function RegisterForm() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const emailFromQuery = useMemo(
    () => searchParams.get("email")?.trim() ?? "",
    [searchParams]
  );

  const locale = typeof params?.locale === "string" ? params.locale : "fr";

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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
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

      setFormError(error.message || "Something went wrong.");
      setValidationErrors({});
    },
  });

  function updateField<K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K]
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

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

  const handleTurnstileVerify = useCallback((token: string) => {
  setTurnstileToken(token);
}, []);

const handleTurnstileExpire = useCallback(() => {
  setTurnstileToken(null);
}, []);

  return (
  <main className="relative h-screen overflow-hidden bg-[#efefef]">
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: "url('/patterns/auth-pattern.png')",
        backgroundRepeat: "repeat",
        opacity: 0.12,
      }}
    />

    <div className="relative z-10 grid h-full grid-rows-[1fr_auto] px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[540px] rounded-[24px] bg-white/72 px-8 py-5 backdrop-blur-sm md:px-12 md:py-6">
          <div className="text-center">
            <h1
              className="font-bold tracking-[0.2em] text-[#111827]"
              style={{ fontSize: 28 }}
            >
              ARVEA
              <sup
                style={{
                  fontSize: 10,
                  verticalAlign: "super",
                  fontWeight: 700,
                }}
              >
                ®
              </sup>
            </h1>

            <h2 className="mt-2 text-[18px] font-semibold text-[#1f2a44]">
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

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-5 w-full max-w-[420px] space-y-2.5"
          >
            {formError ? (
              <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {formError}
              </div>
            ) : null}

            {registerFields.map((field) => (
              <CustomInput
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
                error={validationErrors[field.key]?.[0]}
                required={field.required}
              />
            ))}

            <CustomInput
              type="tel"
              placeholder="20 123 456"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              error={validationErrors.phone?.[0]}
              leftSlot={<PhonePrefix />}
              hint="Optionnel"
            />

            <CustomInput
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              error={validationErrors.password?.[0]}
              inputClassName="pr-3"
              rightSlot={
                <PasswordToggleButton
                  shown={showPassword}
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              }
              required
            />

            <CustomInput
              type={showPasswordConfirmation ? "text" : "password"}
              placeholder="Confirmer votre mot de passe"
              value={formData.password_confirmation}
              onChange={(e) =>
                updateField("password_confirmation", e.target.value)
              }
              error={validationErrors.password_confirmation?.[0]}
              inputClassName="pr-3"
              rightSlot={
                <PasswordToggleButton
                  shown={showPasswordConfirmation}
                  onClick={() =>
                    setShowPasswordConfirmation((prev) => !prev)
                  }
                />
              }
              required
            />

            <div className="space-y-1.5 pt-1">
              {registerCheckboxes.map((item) => (
                <CustomCheckbox
                  key={item.key}
                  checked={formData[item.key]}
                  onChange={(e) => updateField(item.key, e.target.checked)}
                  label={item.label}
                  error={
                    item.key === "accept_privacy_policy"
                      ? validationErrors.accept_privacy_policy?.[0]
                      : undefined
                  }
                />
              ))}
            </div>

            <div className="flex min-h-[74px] justify-center py-1">
              <div className="flex w-full justify-center">
                <div>
                  <CloudflareTurnstile
                    onVerify={handleTurnstileVerify}
                    onExpire={handleTurnstileExpire}
                  />
                </div>
              </div>
            </div>

            <CustomButton
              type="submit"
              isLoading={registerMutation.isPending}
            >
              Créer un compte
            </CustomButton>

            <div className="pt-0.5 text-center">
              <Link
                href={`/${locale}/login`}
                className="text-[16px] font-semibold text-[#111827] underline underline-offset-[3px]"
              >
                Annuler
              </Link>
            </div>

            <div className="relative flex items-center justify-center py-1">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-[#d1d5db]" />
              <span className="relative bg-transparent px-4 text-[13px] font-medium uppercase text-[#6b7a90]">
                OU
              </span>
            </div>

            <p className="-mt-1 text-center text-[12px] font-medium uppercase tracking-wide text-[#6b7a90]">
              CONTINUER AVEC COMPTE
            </p>

            <div className="mt-1 flex flex-col items-center gap-3">
              <CustomAuthAction
                icon={<GoogleIcon />}
                onClick={() => {
                  // add Google auth logic here
                }}
              >
                Google
              </CustomAuthAction>

              <CustomAuthAction href={`/${locale}`} icon={<HomeIcon />}>
                Retour à la boutique
              </CustomAuthAction>
            </div>
          </form>
        </div>
      </div>

      <footer className="flex w-full items-center justify-between px-4 pt-2 text-[11px] text-[#64748b]">
        <span>© 2026 – ARVEA, Tous droits réservés.</span>
        <span>Développé par MaisonDuWeb</span>
      </footer>
    </div>
  </main>
);
}