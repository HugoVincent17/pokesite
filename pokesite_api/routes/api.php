<?php 
use App\Http\Controllers\PokemonController;
use Illuminate\Support\Facades\Route;

// Route racine de l'API
Route::get('/', function () {
    return "API Pokédex en ligne";
});

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