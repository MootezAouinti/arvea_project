<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Vérification Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: Arial, Helvetica, sans-serif; color: #1f2937;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8; padding: 40px 16px;">
        <tr>
            <td align="center">
                <table width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 18px; overflow: hidden; box-shadow: 0 8px 30px rgba(0,0,0,0.08);">
                    
                    <tr>
                        <td style="background: linear-gradient(135deg, #0c7c88, #14a3b8); padding: 32px 24px; text-align: center;">
                            <h1 style="margin: 0; font-size: 30px; color: #ffffff;">
                                ARVEA
                            </h1>
                            <p style="margin: 10px 0 0; font-size: 14px; color: #dff7fb;">
                                Vérification de votre adresse email
                            </p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 36px 32px;">
                            <h2 style="margin-bottom: 16px;">Bonjour,</h2>

                            <p style="margin-bottom: 18px; color: #4b5563;">
                                Nous devons vérifier votre identité pour confirmer votre adresse email.
                                Utilisez le code ci-dessous :
                            </p>

                            <div style="text-align: center; margin: 28px 0;">
                                <span style="padding: 16px 28px; background-color: #f0f9fb; border: 1px dashed #0c7c88; border-radius: 14px; font-size: 32px; font-weight: 700; letter-spacing: 10px; color: #0c7c88;">
                                    {{ $code }}
                                </span>
                            </div>

                            <p style="color: #4b5563;">
                                Ce code expire dans <strong>10 minutes</strong>.
                            </p>

                            <p style="color: #4b5563;">
                                Si vous n’avez pas demandé cette action, vous pouvez ignorer cet e-mail.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>