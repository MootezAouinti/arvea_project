"use client";

import { useCallback } from "react";
import { authService } from "@/features/auth/services/auth.service";
import { VerificationFormBase } from "@/features/auth/components/account/verification-form-base";

export function VerifyEmailForm() {
  const sendCode = useCallback(() => {
    return authService.sendEmailVerificationCode();
  }, []);

  const verifyCode = useCallback((code: string) => {
    return authService.verifyEmailCode({ code });
  }, []);

  return (
    <VerificationFormBase
      title="Vérifier votre adresse email"
      description="Nous devons vérifier votre identité pour vous permettre de confirmer l’adresse email associée à votre compte."
      successMessageDefault="Le code de vérification a été envoyé avec succès."
      verifyButtonLabel="Vérifier l’adresse Email"
      breadcrumbLabel="Vérification email"
      successRedirectQueryKey="emailVerified"
      onSendCode={sendCode}
      onVerifyCode={verifyCode}
    />
  );
}