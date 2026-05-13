<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth; // <-- Il manquait cet import !
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        // Correction : On vérifie si l'utilisateur existe ET si le mot de passe est bon
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        // On crée le token
        $token = $user->createToken('auth_token')->plainTextToken;

        // On enregistre le log
        Log::create([
            'user_name' => $user->name,
            'action' => 'S\'est connecté au système'
        ]);

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        // On log l'action AVANT de supprimer le token
        Log::create([
            'user_name' => $user->name,
            'action' => 'S\'est déconnecté'
        ]);

        $user->currentAccessToken()->delete();

        return response()->json(['message' => 'Déconnecté']);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => false, // Par défaut
        ]);

        Log::create([
            'user_name' => $user->name,
            'action' => 'A créé un compte'
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user' => [
                'name' => $user->name,
                'email' => $user->email,
                'is_admin' => $user->is_admin,
            ]
        ], 201);
    }
}