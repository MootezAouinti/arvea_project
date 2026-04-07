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
                'email'    => 'required|email|unique:users,email',
                'password' => 'required',
            ]);

            $user = $request->user();

            if (!Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'password' => ['Mot de passe incorrect.'],
                ]);
            }

            $user->update(['email' => $request->email]);

            return response()->json(['user' => $user]);
        }

    // Modifier téléphone
    public function updatePhone(Request $request)
        {
            $request->validate([
                'phone' => 'required|string|max:20',
            ]);

            $user = $request->user();
            $user->update(['phone' => $request->phone]);

            return response()->json(['user' => $user]);
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
}