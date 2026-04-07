<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Code de réinitialisation</title>
</head>
<body style="font-family: Arial, sans-serif; color: #1f2937;">
    <h2>Réinitialisation du mot de passe</h2>

    <p>Bonjour,</p>

    <p>Voici votre code de réinitialisation :</p>

    <div style="margin: 24px 0; font-size: 28px; font-weight: bold; letter-spacing: 6px;">
        {{ $code }}
    </div>

    <p>Ce code expire dans 10 minutes.</p>
    <p>Si vous n’avez pas demandé cette action, ignorez cet e-mail.</p>
</body>
</html>