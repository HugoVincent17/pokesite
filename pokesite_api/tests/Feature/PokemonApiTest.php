<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

class PokemonApiTest extends TestCase
{
    use RefreshDatabase; // Vide la base de données de test à chaque lancement

    /** 
     * TEST : CRÉATION DE COMPTE (REGISTER)
     */
    public function test_user_can_register_and_it_is_logged()
    {
        $userData = [
            'name' => 'Jean Log',
            'email' => 'jean@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson('/api/register', $userData);

        // On vérifie que le compte est créé
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'jean@example.com']);

        // On vérifie que le LOG est bien là
        $this->assertDatabaseHas('logs', [
            'user_name' => 'Jean Log',
            'action' => 'A créé un compte'
        ]);
    }

    /** 
     * TEST : CONNEXION (LOGIN)
     */
    public function test_user_can_login_and_it_is_logged()
    {
        // On crée un utilisateur manuellement d'abord
        $user = User::create([
            'name' => 'Utilisateur Test',
            'email' => 'test@example.com',
            'password' => Hash::make('password123'),
        ]);

        $loginData = [
            'email' => 'test@example.com',
            'password' => 'password123',
        ];

        $response = $this->postJson('/api/login', $loginData);

        // On vérifie que le login fonctionne
        $response->assertStatus(200);
        $response->assertJsonStructure(['access_token']);

        // On vérifie que le LOG de connexion est présent
        $this->assertDatabaseHas('logs', [
            'user_name' => 'Utilisateur Test',
            'action' => 'S\'est connecté au système'
        ]);
    }

    /** 
     * TEST : DÉCONNEXION (LOGOUT)
     */
    public function test_user_can_logout_and_it_is_logged()
    {
        // On crée et on connecte un utilisateur via Sanctum
        $user = User::create([
            'name' => 'Admin Logout',
            'email' => 'admin@example.com',
            'password' => Hash::make('password123'),
        ]);

        // On simule une requête authentifiée (actingAs)
        $response = $this->actingAs($user, 'sanctum')
                         ->postJson('/api/logout');

        // On vérifie que la réponse est OK
        $response->assertStatus(200);

        // On vérifie que le LOG de déconnexion a été écrit AVANT la perte du token
        $this->assertDatabaseHas('logs', [
            'user_name' => 'Admin Logout',
            'action' => 'S\'est déconnecté'
        ]);
    }

}