"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { type FormEvent } from "react";
import { CustomInput } from "@/components/ui/custom-input";
import { useLogin } from "../hooks/use-login";
import { loginFields } from "../constants/form";
import { CustomButton } from "@/components/ui/custom-button";


export function LoginForm() {
  const params = useParams();
  const router = useRouter();

  const locale =
    typeof params?.locale === "string" ? params.locale : "fr";

  

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
      router.push(`/${locale}/account`);
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null);
    setValidationErrors({});

    loginMutation(formData);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-neutral-900">Login</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Sign in to access your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {formError}
          </div>
        )}

        {loginFields.map(
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

        <label className="flex items-center gap-3 text-sm text-neutral-700">
          <input
            type="checkbox"
            checked={formData.remember}
            onChange={(event) =>
              setFormData({
                ...formData,
                remember: event.target.checked,
              })
            }
            className="h-4 w-4 rounded border-neutral-300"
          />
          Remember me
        </label>

        <CustomButton type="submit" isLoading={isPending}>
          Sign in
        </CustomButton>
      </form>

      <div className="mt-6 text-sm text-neutral-600">
        Don&apos;t have an account?{" "}
        <Link
          href={`/${locale}/register`}
          className="font-medium text-neutral-900 underline underline-offset-4"
        >
          Create one
        </Link>
      </div>
    </div>
  );
}