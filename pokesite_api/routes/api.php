<?php 
/**
* ROUTES DE L'API (ROUTING & MIDDLEWARES)
* 
* Ce fichier définit tous les points d'entrée de l'API REST.
* Toutes ces routes sont automatiquement préfixées par '/api' grâce à la configuration de Laravel.
*/

use App\Http\Controllers\PokemonController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Log;

/**
* ==========================================
*  ROUTES PUBLIQUES (OUVERTES)
* ==========================================
*/

// Point de contrôle pour tester la disponibilité de l'API
Route::get('/', function () {
    return "API Pokédex en ligne";
});

// Authentification & Inscription : Permet aux utilisateurs d'entrer dans le système
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// Permet au Front-end d'afficher les données Pokémon 
Route::get('/pokemon', [PokemonController::class, 'index']);
Route::get('/pokemon/{id}', [PokemonController::class, 'show']);
Route::post('/pokemon', [PokemonController::class, 'store']);

// Fournit les listes de référence pour l'interface utilisateur
Route::get('/types', [PokemonController::class, 'allTypes']);
Route::get('/talents', [PokemonController::class, 'allTalents']);

/**
* ROUTES DE SIMULATION DE PANNES (TESTING)
* Ces routes sont destinées à simuler des erreurs serveur pour tester la résilience du Front-end et la gestion des erreurs.
* Elles ne font que retourner une réponse JSON avec un code d'erreur 500.
* Ces routes sont utilisées uniquement pour les tests de développement et doivent être retirées ou protégées en production.
*/
Route::get('/pokemon/error-trigger', function () {
    return response()->json(['error' => 'Erreur serveur'], 500);
});
Route::get('/debug-server-error', function () {
    return response()->json(['error' => 'Erreur serveur'], 500);
});

/**
* ==========================================
*  ROUTES SÉCURISÉES (MIDDLEWARES)
* ==========================================
*/

/**
* Authentification obligatoire via Laravel Sanctum
* Le middleware 'auth:sanctum' intercepte la requête et vérifie la validité du Token fourni dans le header.
*/
Route::middleware('auth:sanctum')->group(function () {
    
    // Déconnexion : Nécessite logiquement d'être connecté pour révoquer son propre token
    Route::post('/logout', [AuthController::class, 'logout']);

    /**
    * Contrôle d'accès basé sur les rôles
    * Utilise l'alias 'can-admin' (déclaré dans bootstrap/app.php) pour filtrer les requêtes.
    * Seuls les utilisateurs connectés possédant 'is_admin == true' franchissent cette barrière.
    */
    Route::middleware('can-admin')->group(function () {
        /**
        * CONSULTATION DU JOURNAL (LOGS)
        * Récupère l'historique complet des actions utilisateurs, trié du plus récent au plus ancien.
        * Sécurité : Cette route est doublement protégée (doit être connecté + doit être admin).
        */
        Route::get('/admin/logs', function () {
            return \App\Models\Log::orderBy('created_at', 'desc')->get();
        });
        
        
    });
});