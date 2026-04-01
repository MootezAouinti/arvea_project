"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/libs/api/client";
import { CustomInput } from "@/components/ui/custom-input";
import { useRegister } from "../hooks/use-register";

type ValidationErrors = Record<string, string[]>;

export function RegisterForm() {
  const router = useRouter();
  const params = useParams();

  const locale =
    typeof params?.locale === "string" ? params.locale : "fr";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    country_id: 1,
  });

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const registerMutation = useRegister({
    onSuccess: (data) => {
      setFormError(null);
      setValidationErrors({});
      setFormSuccess(data.message || "Registration successful.");

      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 1200);
    },
    onError: (error) => {
      setFormSuccess(null);

      if (error instanceof ApiError) {
        setFormError(error.message);
        setValidationErrors(error.errors ?? {});
        return;
      }

      setFormError(error.message || "Something went wrong.");
      setValidationErrors({});
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null);
    setFormSuccess(null);
    setValidationErrors({});

    registerMutation.mutate(formData);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Register</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Create your account to get started.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        {formSuccess && (
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {formSuccess}
          </div>
        )}

        <CustomInput
          id="name"
          name="name"
          type="text"
          label="Name"
          autoComplete="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          required
          placeholder="Your full name"
          error={validationErrors.name?.[0]}
        />

        <CustomInput
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
          required
          placeholder="you@example.com"
          error={validationErrors.email?.[0]}
        />

        <CustomInput
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
          required
          placeholder="••••••••"
          error={validationErrors.password?.[0]}
        />

        <CustomInput
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          label="Confirm password"
          autoComplete="new-password"
          value={formData.password_confirmation}
          onChange={(event) =>
            setFormData({
              ...formData,
              password_confirmation: event.target.value,
            })
          }
          required
          placeholder="••••••••"
          error={validationErrors.password_confirmation?.[0]}
        />

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {registerMutation.isPending ? "Creating account..." : "Create account"}
        </button>
      </form>

      <div className="mt-6 text-sm text-neutral-600">
        Already have an account?{" "}
        <Link
          href={`/${locale}/login`}
          className="font-medium text-neutral-900 underline underline-offset-4"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}