"use client";

import { ContactInfoDefaultView } from "./contact-info-default-view";
import { EditEmailView } from "./edit-email-view";
import { EditPhoneView } from "./edit-phone-view";
import { EditPasswordView } from "./edit-password-view";
import { EditProfileView } from "./edit-profile-view";
import type { AuthUser } from "../../interfaces/auth-response.interface";

type EditMode = null | "profile" | "email" | "phone" | "password";

type AccountContactSectionProps = {
  user: AuthUser | null;
  editMode: EditMode;
  isSaving: boolean;
  locale: string;

  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;

  newEmail: string;
  setNewEmail: (value: string) => void;
  emailPassword: string;
  setEmailPassword: (value: string) => void;
  showEmailPassword: boolean;
  setShowEmailPassword: (value: boolean) => void;

  newPhone: string;
  setNewPhone: (value: string) => void;

  oldPassword: string;
  setOldPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;

  openEdit: (mode: EditMode) => void;
  closeEdit: () => void;
  handleSave: () => void;
};

export function AccountContactSection(props: AccountContactSectionProps) {
  return (
    <section className="min-w-0">
      {props.editMode === "email" && (
        <EditEmailView
          newEmail={props.newEmail}
          emailPassword={props.emailPassword}
          showEmailPassword={props.showEmailPassword}
          setNewEmail={props.setNewEmail}
          setEmailPassword={props.setEmailPassword}
          setShowEmailPassword={props.setShowEmailPassword}
          onCancel={props.closeEdit}
          onSave={props.handleSave}
          isSaving={props.isSaving}
        />
      )}

      {props.editMode === "phone" && (
        <EditPhoneView
          user={props.user}
          newPhone={props.newPhone}
          setNewPhone={props.setNewPhone}
          onCancel={props.closeEdit}
          onSave={props.handleSave}
          isSaving={props.isSaving}
        />
      )}

      {props.editMode === "password" && (
        <EditPasswordView
          oldPassword={props.oldPassword}
          newPassword={props.newPassword}
          confirmPassword={props.confirmPassword}
          setOldPassword={props.setOldPassword}
          setNewPassword={props.setNewPassword}
          setConfirmPassword={props.setConfirmPassword}
          onCancel={props.closeEdit}
          onSave={props.handleSave}
          isSaving={props.isSaving}
        />
      )}

      {props.editMode === "profile" && (
        <EditProfileView
          firstName={props.firstName}
          lastName={props.lastName}
          setFirstName={props.setFirstName}
          setLastName={props.setLastName}
          onCancel={props.closeEdit}
          onSave={props.handleSave}
          isSaving={props.isSaving}
        />
      )}

      {props.editMode === null && (
        <ContactInfoDefaultView
          user={props.user}
          onOpenEdit={props.openEdit}
          locale={props.locale}
        />
      )}
    </section>
  );
}