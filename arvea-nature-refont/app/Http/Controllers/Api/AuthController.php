<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\Role;
use App\Models\User;
use App\Models\PasswordResetCode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Mail\PasswordResetCodeMail;
use App\Mail\PhoneVerificationCodeMail;
use App\Mail\EmailVerificationCodeMail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
        {
            $validated = $request->validated();

            $clientRole = Role::where('name', 'client')->first();

            if (! $clientRole) {
                return response()->json([
                    'success' => false,
                    'message' => 'Default client role not found.',
                ], 500);
            }

            $fullName = trim($validated['first_name'] . ' ' . $validated['last_name']);

            $user = User::create([
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'name' => $fullName,
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'password' => $validated['password'],
                'country_id' => $validated['country_id'] ?? null,
                'role_id' => $clientRole->id,
                'newsletter_subscribed' => $validated['newsletter'] ?? false,
                'privacy_policy_accepted_at' => now(),
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully.',
                'data' => [
                    'user' => $user->load('country', 'role'),
                    'token' => $token,
                    'token_type' => 'Bearer',
                ],
            ], 201);
        }

    public function login(LoginRequest $request): JsonResponse
        {
            $validated = $request->validated();

            $user = User::where('email', $validated['email'])
                ->with(['country', 'role'])
                ->first();

            if (! $user || ! Hash::check($validated['password'], $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                    'token_type' => 'Bearer',
                ],
            ]);
        }

    public function me(Request $request): JsonResponse
        {
            return response()->json([
                'success' => true,
                'message' => 'Authenticated user retrieved successfully.',
                'data' => $request->user()->load('country', 'role'),
            ]);
        }

    public function logout(Request $request): JsonResponse
        {
            $request->user()->currentAccessToken()?->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out successfully.',
            ]);
        }

    public function logoutAll(Request $request): JsonResponse
        {
            $request->user()->tokens()->delete();

            return response()->json([
                'success' => true,
                'message' => 'Logged out from all devices successfully.',
            ]);
        }

    public function checkEmail(Request $request): JsonResponse
        {
            $validated = $request->validate([
                'email' => ['required', 'email'],
            ]);

            $exists = User::where('email', $validated['email'])->exists();

            return response()->json([
                'success' => true,
                'message' => $exists ? 'Account found.' : 'Account not found.',
                'data' => [
                    'exists' => $exists,
                ],
            ]);
        }

        // Modifier prénom / nom
    public function updateProfile(Request $request)
        {
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name'  => 'required|string|max:255',
            ]);

            $user = $request->user();
            $user->update([
                'first_name' => $request->first_name,
                'last_name'  => $request->last_name,
            ]);

            return response()->json(['user' => $user]);
        }

    // Modifier email
    public function updateEmail(Request $request)
        {
            $request->validate([
                'email' => ['required', 'email', 'max:255', 'unique:users,email'],
                'password' => ['required', 'string'],
            ]);

            $user = $request->user();

            if (!Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'password' => ['Mot de passe incorrect.'],
                ]);
            }

            $emailChanged = $user->email !== $request->email;

            $user->forceFill([
                'email' => $request->email,
                'email_verified_at' => $emailChanged ? null : $user->email_verified_at,
            ])->save();

            return response()->json([
                'success' => true,
                'message' => $emailChanged
                    ? 'Adresse email mise à jour avec succès. Veuillez vérifier votre nouvelle adresse email.'
                    : 'Adresse email inchangée.',
                'data' => [
                    'user' => $user->fresh(),
                    'email_verification_required' => $emailChanged,
                ],
            ]);
        }

    // Modifier téléphone
    public function updatePhone(Request $request)
        {
            $request->validate([
                'phone' => ['required', 'string', 'max:20', 'unique:users,phone'],
            ]);

            $user = $request->user();

            $phoneChanged = $user->phone !== $request->phone;

            $user->forceFill([
                'phone' => $request->phone,
                'phone_verified_at' => $phoneChanged ? null : $user->phone_verified_at,
            ])->save();

            return response()->json([
                'success' => true,
                'message' => $phoneChanged
                    ? 'Numéro de téléphone mis à jour avec succès. Veuillez vérifier votre nouveau numéro.'
                    : 'Numéro de téléphone inchangé.',
                'data' => [
                    'user' => $user->fresh(),
                    'phone_verification_required' => $phoneChanged,
                ],
            ]);
        }

    // Modifier mot de passe
    public function updatePassword(Request $request)
        {
            $request->validate([
                'old_password'          => 'required',
                'password'              => 'required|min:8|confirmed', // confirmed = password_confirmation field
                'password_confirmation' => 'required',
            ]);

            $user = $request->user();

            if (!Hash::check($request->old_password, $user->password)) {
                throw ValidationException::withMessages([
                    'old_password' => ['Ancien mot de passe incorrect.'],
                ]);
            }

            $user->update(['password' => Hash::make($request->password)]);

            return response()->json(['message' => 'Mot de passe mis à jour.']);
        }

    public function forgotPassword(Request $request)
        {
            $request->validate([
                'email' => ['required', 'email'],
            ]);

            $user = User::where('email', $request->email)->first();

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aucun utilisateur trouvé avec cette adresse e-mail.',
                ], 404);
            }

            PasswordResetCode::where('email', $request->email)
                ->where('used', false)
                ->delete();

            $code = (string) random_int(100000, 999999);

            PasswordResetCode::create([
                'email' => $request->email,
                'code' => $code,
                'expires_at' => now()->addMinutes(10),
            ]);

            Mail::to($request->email)->send(new PasswordResetCodeMail($code));

            // Temporary: return code in response during dev
            // Remove this in production and send via email instead
            return response()->json([
                'success' => true,
                'message' => 'Code de réinitialisation envoyé.',
                'data' => [
                    'email' => $request->email,
                    'code' => $code,
                ],
            ]);
        }

    public function verifyResetCode(Request $request)
        {
            $request->validate([
                'email' => ['required', 'email'],
                'code' => ['required', 'digits:6'],
            ]);

            $reset = PasswordResetCode::where('email', $request->email)
                ->where('code', $request->code)
                ->where('used', false)
                ->latest()
                ->first();

            if (! $reset) {
                return response()->json([
                    'success' => false,
                    'message' => 'Code invalide.',
                ], 422);
            }

            if ($reset->expires_at->isPast()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le code a expiré.',
                ], 422);
            }

            $reset->update([
                'verified_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Code vérifié avec succès.',
                'data' => [
                    'email' => $request->email,
                ],
            ]);
        }

    public function resetPassword(Request $request)
        {
            $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required', 'string', 'min:8', 'confirmed'],
            ]);

            $reset = PasswordResetCode::where('email', $request->email)
                ->where('used', false)
                ->latest()
                ->first();

            if (! $reset) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aucune demande de réinitialisation trouvée.',
                ], 422);
            }

            if (! $reset->verified_at) {
                return response()->json([
                    'success' => false,
                    'message' => 'Veuillez vérifier le code avant de réinitialiser le mot de passe.',
                ], 422);
            }

            if ($reset->expires_at->isPast()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le code a expiré.',
                ], 422);
            }

            $user = User::where('email', $request->email)->first();

            if (! $user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Utilisateur introuvable.',
                ], 404);
            }

            $user->update([
                'password' => Hash::make($request->password),
            ]);

            $reset->update([
                'used' => true,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Mot de passe réinitialisé avec succès.',
            ]);
        }

    public function sendEmailVerificationCode(Request $request)
        {
            $user = $request->user();

            if (!$user->email) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aucune adresse email trouvée pour cet utilisateur.',
                ], 422);
            }

            if ($user->email_verified_at) {
                return response()->json([
                    'success' => true,
                    'message' => 'Votre adresse email est déjà vérifiée.',
                ]);
            }

            $code = (string) random_int(100000, 999999);

            Cache::put(
                'email_verification_code_user_' . $user->id,
                $code,
                now()->addMinutes(10)
            );

            Mail::to($user->email)->send(new EmailVerificationCodeMail($code));

            return response()->json([
                'success' => true,
                'message' => 'Le code de vérification a été envoyé avec succès.',
            ]);
        }

    public function verifyEmailCode(Request $request)
        {
            $request->validate([
                'code' => ['required', 'digits:6'],
            ]);

            $user = $request->user();

            $cacheKey = 'email_verification_code_user_' . $user->id;
            $cachedCode = Cache::get($cacheKey);

            if (!$cachedCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le code a expiré ou est introuvable.',
                ], 422);
            }

            if ($request->code !== $cachedCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le code saisi est incorrect.',
                ], 422);
            }

            $user->forceFill([
                'email_verified_at' => now(),
            ])->save();

            Cache::forget($cacheKey);

            return response()->json([
                'success' => true,
                'message' => 'Votre adresse mail a été vérifiée avec succès.',
                'data' => [
                    'user' => $user->fresh(),
                ],
            ]);
        }

    public function sendPhoneVerificationCode(Request $request)
        {
            $user = $request->user();

            if (!$user->phone) {
                return response()->json([
                    'success' => false,
                    'message' => 'Aucun numéro trouvé.',
                ], 422);
            }

            if ($user->phone_verified_at) {
                return response()->json([
                    'success' => true,
                    'message' => 'Numéro déjà vérifié.',
                ]);
            }

            $cooldownKey = 'phone_verification_cooldown_user_' . $user->id;

            if (Cache::has($cooldownKey)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Veuillez patienter quelques secondes avant de demander un nouveau code.',
                ], 429);
            }

            $code = (string) random_int(100000, 999999);

            Cache::put(
                'phone_verification_code_user_' . $user->id,
                $code,
                now()->addMinutes(10)
            );

            Cache::put($cooldownKey, true, now()->addSeconds(30));

            Mail::to($user->email)->send(new PhoneVerificationCodeMail($code));

            return response()->json([
                'success' => true,
                'message' => 'Le code de vérification a été envoyé avec succès.',
            ]);
        }

    public function verifyPhoneCode(Request $request)
        {
            $request->validate([
                'code' => ['required', 'digits:6'],
            ]);

            $user = $request->user();

            $cacheKey = 'phone_verification_code_user_' . $user->id;
            $cachedCode = Cache::get($cacheKey);

            if (!$cachedCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le code a expiré ou est introuvable.',
                ], 422);
            }

            if ($request->code !== $cachedCode) {
                return response()->json([
                    'success' => false,
                    'message' => 'Le code est incorrect.',
                ], 422);
            }

            $user->forceFill([
                'phone_verified_at' => now(),
            ])->save();

            Cache::forget($cacheKey);

            return response()->json([
                'success' => true,
                'message' => 'Votre numéro de téléphone a été vérifié avec succès.',
                'data' => [
                    'user' => $user->fresh(),
                ],
            ]);
        }
}