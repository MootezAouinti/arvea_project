"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ApiError } from "@/libs/api/client";
import { CustomInput } from "@/components/ui/custom-input";
import { useRegister } from "../hooks/use-register";
import { registerFields } from "../constants/form";
import { CustomButton } from "@/components/ui/custom-button";

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

        {registerFields.map(
          ({ id, name, label, type, autoComplete, placeholder }) => (
            <CustomInput
              key={id}
              id={name}
              name={name}
              type={type}
              label={label}
              autoComplete={autoComplete}
              value={formData[name]}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [name]: event.target.value,
                })
              }
              required
              placeholder={placeholder}
              error={validationErrors[name]?.[0]}
            />
          ),
        )}

        <CustomButton
            type="submit"
            isLoading={registerMutation.isPending}
          >
            Create account
        </CustomButton>
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