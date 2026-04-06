import { CustomAuthAction } from "@/components/ui/custom-auth-action";
import { GoogleIcon, HomeIcon } from "./auth-action-icons";

export function AuthSecondaryActions({ locale }: { locale: string }) {
  return (
    <div className="mt-1 flex flex-col items-center gap-3">
      <CustomAuthAction icon={<GoogleIcon />} onClick={() => console.log("Google auth")}>
        Google
      </CustomAuthAction>

      <CustomAuthAction icon={<HomeIcon />} href={`/${locale}`}>
        Retour à la boutique
      </CustomAuthAction>
    </div>
  );
}