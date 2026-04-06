"use client";

import { useState } from "react";
import { authService } from "../services/auth.service";
import type { AuthUser } from "../interfaces/auth-response.interface";
import { useParams, useRouter } from "next/navigation";
import { useLogout } from "./use-logout";

export type EditMode = "profile" | "email" | "phone" | "password" | null;

type UseAccountEditParams = {
    user: AuthUser | null;
    refetch: () => Promise<unknown>;
};

export function useAccountEdit({ user, refetch }: UseAccountEditParams) {

    const router = useRouter();
    const params = useParams();

    const [editMode, setEditMode] = useState<EditMode>(null);
    const [isSaving, setIsSaving] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [newEmail, setNewEmail] = useState("");
    const [emailPassword, setEmailPassword] = useState("");
    const [showEmailPassword, setShowEmailPassword] = useState(false);

    const [newPhone, setNewPhone] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    function resetProfileFields() {
        setFirstName(user?.first_name ?? "");
        setLastName(user?.last_name ?? "");
    }

    function resetEmailFields() {
        setNewEmail(user?.email ?? "");
        setEmailPassword("");
        setShowEmailPassword(false);
    }

    function resetPhoneFields() {
        setNewPhone(user?.phone ?? "");
    }

    function resetPasswordFields() {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
    }

    function openEdit(mode: EditMode) {
        setEditMode(mode);

        switch (mode) {
            case "profile":
                resetProfileFields();
                break;
            case "email":
                resetEmailFields();
                break;
            case "phone":
                resetPhoneFields();
                break;
            case "password":
                resetPasswordFields();
                break;
            default:
                break;
        }
    }

    function closeEdit() {
        setEditMode(null);
    }

    async function handleSave() {
        if (!editMode) return;

        try {
            setIsSaving(true);

            switch (editMode) {
                case "profile":
                    await authService.updateProfile({
                        first_name: firstName,
                        last_name: lastName,
                    });
                    break;

                case "email":
                    await authService.updateEmail({
                        email: newEmail,
                        password: emailPassword,
                    });
                    break;

                case "phone":
                    await authService.updatePhone({
                        phone: newPhone,
                    });
                    break;

                case "password":
                    await authService.updatePassword({
                        old_password: oldPassword,
                        password: newPassword,
                        password_confirmation: confirmPassword,
                    });
                    break;
            }

            await refetch();
            closeEdit();
        } catch (error) {
            console.error("Failed to update account:", error);
            throw error;
        } finally {
            setIsSaving(false);
        }
    }

    const locale =
        typeof params?.locale === "string" ? params.locale : "fr";

    const logoutMutation = useLogout({
        onSuccess: () => {
            router.push(`/${locale}/login`);
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });

    const handleLogout = () => {
        logoutMutation.mutate();
    };

    return {
        editMode,
        isSaving,

        firstName,
        setFirstName,
        lastName,
        setLastName,

        newEmail,
        setNewEmail,
        emailPassword,
        setEmailPassword,
        showEmailPassword,
        setShowEmailPassword,

        newPhone,
        setNewPhone,

        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,

        openEdit,
        closeEdit,
        handleSave,
        handleLogout,
        isLoggingOut: logoutMutation.isPending
    };
}