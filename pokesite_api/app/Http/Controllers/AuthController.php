<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth; 
use Illuminate\Validation\ValidationException;

/**
 * CONTRÔLEUR D'AUTHENTIFICATION ET DE GESTION DES ACCÈS
 * 
 * Centralise toutes les opérations liées au cycle de vie de la session utilisateur.
 * Elle sert d'interface entre les requêtes HTTP (Front-end) et le système d'identification 
 * de Laravel (Sanctum).
 * 
 * 
 * Inscription (Register) : Création de nouveaux comptes avec hachage sécurisé.
 * Connexion (Login) : Vérification des identifiants et délivrance de tokens d'accès.
 * Déconnexion (Logout) : Révocation et destruction des jetons d'accès.
 * Communication avec le modèle Log pour assurer la traçabilité des actions critiques (connexion, déconnexion, création de compte).
 */

class AuthController extends Controller
{
    /**
     * Gestion de l'authentification et gestion de session
     * Validation et vérification des identifiants
     * Génération de token d'accès avec Laravel Sanctum
     * Hashing sécurisé des mots de passe
     */
    public function login(Request $request)
    {
        /**
         * VALIDATION DES DONNÉES ENTRANTES
         * Assure l'intégrité des données avant traitement. 
         * Empêche l'exécution du code si les champs sont absents ou mal formatés.
         */
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        //recherche utilisateur, recherche de l'identité associée à l'email fourni dans la base de données.

        $user = User::where('email', $request->email)->first();

        /* On vérifie si l'utilisateur existe ET si le mot de passe est bon
        *
         * VÉRIFICATION DE SÉCURITÉ (Hash::check)
         * Comparaison sécurisée entre le mot de passe en clair et le hash stocké.
         * On utilise un message d'erreur générique ("Identifiants incorrects") pour éviter l'énumération d'utilisateurs 
         * (ne pas préciser si c'est l'email ou le MDP qui est faux).
         */
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }

        /**
         * GESTION DE LA SESSION (Token Personal Access)
         * Utilisation de Laravel Sanctum pour générer un jeton d'accès unique.
         * Ce token permettra d'authentifier les requêtes futures sans renvoyer le mot de passe.
         */
        $token = $user->createToken('auth_token')->plainTextToken;

        /**
         * TRAÇABILITÉ (Log)
         * Enregistrement de l'événement dans la table des logs.
         * Pour savoir qui s'est connecté et quand.
         */
        Log::create([
            'user_name' => $user->name,
            'action' => 'S\'est connecté au système'
        ]);

        /**
         * Renvoi du token et des informations essentielles de l'utilisateur.
         * Le front-end utilisera 'access_token' pour ses headers et 'is_admin' pour l'affichage conditionnel.
         */

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

    /**
     * Gestion de la déconnexion
     * Suppression du token d'accès pour invalider la session.
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        /**
         * TRAÇABILITÉ (Log)
         * Enregistrement de l'événement de déconnexion dans les logs. (AVANT de supprimer le token pour conserver l'identité de l'utilisateur)
         */
        Log::create([
            'user_name' => $user->name,
            'action' => 'S\'est déconnecté'
        ]);

        /**
         * RÉVOCATION DU JETON
         * On vérifie si un jeton d'accès est utilisé pour cette session,
         * puis on le supprime de la base de données (table personal_access_tokens).
         * Cela invalide immédiatement la session côté serveur.
         */
        if ($user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }
        //Déconnexion réussie, on renvoie une réponse de succès.
        return response()->json(['message' => 'Déconnecté']);
    }

    /**
     * Gestion de l'inscription
     * Validation des données, création de l'utilisateur, hashing du mot de passe, génération du token
     * Par défaut, les nouveaux utilisateurs ne sont pas admins
     */

    public function register(Request $request)
    {
        /**
         * VALIDATION DES DONNÉES ENTRANTES
         * Assure que les champs nécessaires sont présents et correctement formatés.
         */
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        /**
         * CRÉATION DE L'UTILISATEUR
         * Le mot de passe est immédiatement haché avec Bcrypt via Hash::make.
         * 'is_admin' est forcé à false par sécurité (Protection contre l'auto-attribution de droits).
         */

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => false, // Par défaut
        ]);

        /**
         * TRAÇABILITÉ (Log)
         * Enregistrement de l'événement de création de compte dans les logs.
         */
        Log::create([
            'user_name' => $user->name,
            'action' => 'A créé un compte'
        ]);

        /**
         * GÉNÉRATION DU TOKEN
         * Comme pour la connexion, on génère un token d'accès pour que l'utilisateur puisse être connecté immédiatement après l'inscription.
         */
        $token = $user->createToken('auth_token')->plainTextToken;

        // Réponse 201 Created avec les données nécessaires au stockage côté Front-end
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