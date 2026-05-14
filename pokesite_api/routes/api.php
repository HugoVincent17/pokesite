<?php 
use App\Http\Controllers\PokemonController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\Log;

Route::post('/login', [AuthController::class, 'login']);

// Route racine de l'API
Route::get('/', function () {
    return "API Pokédex en ligne";
});

/*Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});*/

// Routes Pokemon
Route::get('/pokemon', [PokemonController::class, 'index']);
Route::get('/pokemon/{id}', [PokemonController::class, 'show']);
Route::post('/pokemon', [PokemonController::class, 'store']);

// Nouvelles routes pour correspondre à tes besoins
Route::get('/types', [PokemonController::class, 'allTypes']);
Route::get('/talents', [PokemonController::class, 'allTalents']);

// Route de test d'erreur 500
Route::get('/pokemon/error-trigger', function () {
    return response()->json(['error' => 'Erreur serveur'], 500);
});
Route::get('/debug-server-error', function () {
    return response()->json(['error' => 'Erreur serveur'], 500);
});


Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    
    // Tout le monde (connecté) peut se déconnecter
    Route::post('/logout', [AuthController::class, 'logout']);

    // SEULS les admins peuvent voir les logs
    Route::middleware('can-admin')->group(function () {
        Route::get('/admin/logs', function () {
            return \App\Models\Log::orderBy('created_at', 'desc')->get();
        });
        
        
    });
});