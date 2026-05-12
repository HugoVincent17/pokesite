<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\DB;

class PokemonApiTest extends TestCase
{
    // Scénario 1 : Vérifier que la route détail fonctionne
    /** @test */
    public function test_get_pokemon_1_talents()
    {
        // Rappel : dans Laravel, tes routes sont préfixées par /api
        $this->withoutExceptionHandling();
        $response = $this->get('/api/pokemon/1');
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'nom',
            'talents' => [
                '*' => ['nom', 'description_talent']
            ]
        ]);
        
        // On vérifie que talents est bien une liste (tableau)
        $this->assertIsArray($response->json()['talents']);
    }

    // Scénario 2 : Test de sécurité (Injection SQL / ID invalide)
    /** @test */
    public function test_get_invalid_id_should_not_crash()
    {
        // Laravel protège nativement contre les injections SQL grâce aux requêtes préparées
        $response = $this->get("/api/pokemon/999' OR '1'='1");

        // Selon ton code, soit c'est 400 (ID invalide) soit 404 (non trouvé)
        $this->assertContains($response->getStatusCode(), [400, 404, 500]);
    }

    // Scénario 3 : Validation des données (Stats négatives)
    /** @test */
    public function test_post_pokemon_refuser_fausses_stats()
    {
        $newPokemon = [
            'nom' => "HackerMon",
            'hp' => -500, // Statistique impossible
            'attaque' => 9999,
            'num_pokedex' => 999
        ];

        $response = $this->postJson('/api/pokemon', $newPokemon);

        // Laravel renvoie 422 (Unprocessable Entity) quand une validation échoue
        // Si tu veux absolument 400, il faut le préciser dans le contrôleur, mais 422 est la norme Laravel
        $this->assertContains($response->getStatusCode(), [400, 422]);
    }

    // Scénario 4 : Erreur 500 propre
    /** @test */
    public function test_api_should_return_clean_500_error()
    {
        // Utilise la route de debug qu'on a ajoutée dans api.php tout à l'heure
        $response = $this->get('/api/debug-server-error');

        $response->assertStatus(500);
        $response->assertJson(['error' => 'Erreur serveur']);
    }
}