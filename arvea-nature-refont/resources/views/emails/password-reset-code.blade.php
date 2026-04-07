<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Code de réinitialisation</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f6f8; margin: 0; padding: 0;">
        <tr>
            <td align="center" style="padding: 40px 16px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
                    
                    <tr>
                        <td style="background: linear-gradient(135deg, #0c7c88, #14a3b8); padding: 32px 24px; text-align: center;">
                            <h1 style="margin: 0; font-size: 30px; font-weight: 700; letter-spacing: 4px; color: #ffffff;">
                                ARVEA
                            </h1>
                            <p style="margin: 10px 0 0; font-size: 14px; color: #dff7fb;">
                                Réinitialisation de votre mot de passe
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 36px 32px;">
                            <h2 style="margin: 0 0 16px; font-size: 24px; color: #111827;">
                                Bonjour,
                            </h2>

                            <p style="margin: 0 0 18px; font-size: 16px; line-height: 1.7; color: #4b5563;">
                                Nous avons reçu une demande de réinitialisation de votre mot de passe.
                                Utilisez le code ci-dessous pour continuer :
                            </p>

                            <div style="margin: 28px 0; text-align: center;">
                                <span style="display: inline-block; padding: 16px 28px; background-color: #f0f9fb; border: 1px dashed #0c7c88; border-radius: 14px; font-size: 32px; font-weight: 700; letter-spacing: 10px; color: #0c7c88;">
                                    {{ $code }}
                                </span>
                            </div>

                            <p style="margin: 0 0 14px; font-size: 15px; line-height: 1.7; color: #4b5563;">
                                Ce code expire dans <strong style="color: #111827;">10 minutes</strong>.
                            </p>

                            <p style="margin: 0 0 24px; font-size: 15px; line-height: 1.7; color: #4b5563;">
                                Si vous n’avez pas demandé cette action, vous pouvez ignorer cet e-mail en toute sécurité.
                            </p>

                            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #6b7280;">
                                    Cet e-mail a été envoyé automatiquement. Merci de ne pas y répondre.
                                </p>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 20px 24px; text-align: center; background-color: #f9fafb; border-top: 1px solid #eef2f7;">
                            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                                © {{ date('Y') }} ARVEA. Tous droits réservés.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>