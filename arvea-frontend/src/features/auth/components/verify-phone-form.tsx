"use client";

import { useCallback } from "react";
import { authService } from "@/features/auth/services/auth.service";
import { VerificationFormBase } from "@/features/auth/components/account/verification-form-base";

export function VerifyPhoneForm() {
  const sendCode = useCallback(() => {
    return authService.sendPhoneVerificationCode();
  }, []);

  const verifyCode = useCallback((code: string) => {
    return authService.verifyPhoneCode({ code });
  }, []);

  return (
    <VerificationFormBase
      title="Vérifier le numéro de téléphone"
      description="Nous devons vérifier votre identité pour vous permettre de modifier votre numéro de téléphone associé à votre compte."
      successMessageDefault="Le code de vérification a été envoyé avec succès."
      verifyButtonLabel="Vérifier le numéro de téléphone"
      breadcrumbLabel="Vérification téléphone"
      successRedirectQueryKey="phoneVerified"
      onSendCode={sendCode}
      onVerifyCode={verifyCode}
    />
  );
}