<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\DB;
use App\Models\Log;

class PokemonApiTest extends TestCase
{
    use DatabaseTransactions; // Vide la base de données de test à chaque lancement


    //Auth

    /** 
     * TEST : CRÉATION DE COMPTE (REGISTER)
     */
    public function test_user_peut_se_register_et_est_dans_les_logs()
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
    public function test_user_peut_se_connecter_et_est_dans_les_logs()
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
    public function test_user_peut_se_déconnecter_et_est_dans_les_logs()
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

    //PokemonController

    /** 
     * TEST : RÉCUPÉRATION DES POKEMON
     */
    public function test_peut_recuperer_la_liste_des_pokemon()
    {
        // On simule une requête sur l'index
        $response = $this->getJson('/api/pokemon');

        $response->assertStatus(200);
        
        $response->assertJsonStructure([
            '*' => [
                'num_pokedex', 
                'nom', 
                'img',
                'img_shiny',
                'img_mini', 
                'generation', 
                'hp', 
                'attaque',
                'defense',
                'attaque_spe',
                'defense_spe',  
                'vitesse',
                'taux_capture',
                'rarete'
            ]
        ]);
    }

    /** 
     * TEST : RÉCUPÉRATION D'UN POKEMON PRÉCIS
     */
    public function test_peut_recuperer_un_pokemon_par_son_num_pokedex()
    {
        // On récupère un numéro existant en base
        $pokemon = DB::table('pokemon')->first();

        // Si la base est vide pendant le test, on évite l'erreur
        if (!$pokemon) {
            $this->markTestSkipped('Aucun pokemon en base pour tester le detail.');
        }

        $response = $this->getJson("/api/pokemon/{$pokemon->num_pokedex}");

        $response->assertStatus(200)
                 ->assertJsonPath('num_pokedex', $pokemon->num_pokedex)
                 ->assertJsonPath('nom', $pokemon->nom);
    }

    public function test_peut_recuperer_tous_les_types_disponibles()
    {
        $response = $this->getJson('/api/types');

        $response->assertStatus(200);
        
        // On vérifie qu'on reçoit bien les noms des types (ex: Feu, Eau...)
        $response->assertJsonStructure([
            '*' => ['id_type', 'nom']
        ]);
    }

    public function test_peut_recuperer_tous_les_types_et_talents()
    {
        // Test des types
        $this->getJson('/api/types')->assertStatus(200);

        // Test des talents
        $this->getJson('/api/talents')->assertStatus(200);
    }

    public function test_renvoie_404_si_pokemon_introuvable()
    {
        $response = $this->getJson('/api/pokemon/9999'); // ID qui n'existe pas

        $response->assertStatus(404)
                 ->assertJson(['error' => 'Introuvable']);
    }

    /**
     * TEST : Erreur 400 si ID n'est pas numérique
     */
    public function test_renvoie_400_si_id_invalide()
    {
        $response = $this->getJson('/api/pokemon/abc'); 

        $response->assertStatus(400)
                 ->assertJson(['error' => 'ID invalide']);
    }

    public function test_peut_recuperer_la_liste_des_pokemon_existants()
    {
        // On tape directement dans la route
        $response = $this->getJson('/api/pokemon');

        $response->assertStatus(200);

        // On vérifie que la réponse n'est pas vide
        $this->assertNotEmpty($response->json(), "La base de données semble vide, le test ne peut pas continuer.");

        // On vérifie la structure du premier Pokémon de la liste
        $response->assertJsonStructure([
            '*' => [
                'num_pokedex', 
                'nom', 
                'img',
                'img_shiny',
                'img_mini', 
                'generation', 
                'hp', 
                'attaque',
                'defense',
                'attaque_spe',
                'defense_spe',  
                'vitesse',
                'taux_capture',
                'rarete',
                'types' // Vérifie que ton groupBy/pluck a fonctionné
            ]
        ]);
    }

    /**
     * TEST : Détail d'un Pokémon (show) sur donnée réelle
     */
    public function test_peut_recuperer_un_pokemon_reel_via_la_db()
    {
        // On va chercher dynamiquement un numéro de pokédex qui existe vraiment en base
        $pokemon = DB::table('pokemon')->first();

        // Si la base est vide, on arrête le test proprement
        if (!$pokemon) {
            $this->markTestSkipped('Aucun Pokémon trouvé en base de données.');
        }

        $id = $pokemon->num_pokedex;

        $response = $this->getJson("/api/pokemon/{$id}");

        $response->assertStatus(200)
                 ->assertJsonPath('num_pokedex', $id)
                 ->assertJsonStructure([
                     'nom', 
                     'types', 
                     'talents' // Vérifie que la jointure avec 'detenir' fonctionne
                 ]);
    }

    //AdminMiddleware

    public function test_acces_admin_refuse_si_non_authentifie()
    {
        // On tente d'accéder aux logs sans être connecté
        $response = $this->getJson('/api/admin/logs');

        // On attend un 401 (Unauthenticated)
        $response->assertStatus(401);
    }

    /**
     * TEST : Protection Admin - Utilisateur connecté mais SIMPLE USER
     */
    public function test_acces_admin_refuse_pour_utilisateur_basique()
    {
        // On crée un utilisateur avec is_admin = 0 (ou false)
        $user = User::create([
            'name' => 'Simple User',
            'email' => 'user@pokedex.com',
            'password' => Hash::make('password123'),
            'is_admin' => 0, // Assure-toi que cette colonne existe
        ]);

        // On tente d'accéder aux logs avec son token (actingAs)
        $response = $this->actingAs($user, 'sanctum')
                         ->getJson('/api/admin/logs');

        // On attend un 403 (Forbidden)
        $response->assertStatus(403);
    }

    /**
     * TEST : Protection Admin - Utilisateur ADMIN
     */
    public function test_acces_admin_autorise_pour_un_vrai_admin()
    {
        // On crée un admin
        $admin = User::create([
            'name' => 'Admin Boss',
            'email' => 'admin@pokedex.com',
            'password' => Hash::make('password123'),
            'is_admin' => 1,
        ]);

        $response = $this->actingAs($admin, 'sanctum')
                         ->getJson('/api/admin/logs');

        // On attend un 200 (OK)
        $response->assertStatus(200);
    }
    
    //Log

    /**
     * TEST : Création d'un Log
     */
    public function test_un_log_peut_etre_cree()
    {
        // 1. On crée un log via le modèle
        Log::create([
            'user_name' => 'Sacha',
            'action' => 'A consulté le Pokédex'
        ]);

        // 2. On vérifie qu'il existe bien dans la base de données
        $this->assertDatabaseHas('logs', [
            'user_name' => 'Sacha',
            'action' => 'A consulté le Pokédex'
        ]);
    }

    /**
     * TEST : Mass Assignment (Protection $fillable)
     */
    public function test_le_mass_assignment_protege_les_champs_non_autorises()
    {
        // On essaie d'insérer un champ qui n'est pas dans $fillable (ex: 'id' ou 'created_at')
        // Si quelqu'un essaie d'injecter un ID manuellement par exemple
        $log = new Log([
            'user_name' => 'Hugo',
            'action' => 'Test Fillable',
            'id' => 9999 // Ce champ ne devrait pas être rempli via le constructeur
        ]);

        // L'ID ne doit pas être 9999 car il n'est pas dans $fillable
        $this->assertNotEquals(9999, $log->id);
    }

    //User

    /**
     * TEST : Création d'un utilisateur et Mass Assignment
     */
    public function test_un_utilisateur_peut_etre_cree_avec_ses_attributs()
    {
        $userData = [
            'name'     => 'Sacha du Bourg-Palette',
            'email'    => 'sacha@pokedex.com',
            'password' => 'pikapika123',
            'is_admin' => 1
        ];

        $user = User::create($userData);

        $this->assertDatabaseHas('users', [
            'email'    => 'sacha@pokedex.com',
            'is_admin' => 1
        ]);
        
        $this->assertEquals('Sacha du Bourg-Palette', $user->name);
    }

    /**
     * TEST : Sécurité des données (Hidden)
     */
    public function test_les_donnees_sensibles_sont_masquees_lors_de_la_conversion_json()
    {
        $user = User::create([
            'name'     => 'Ondine',
            'email'    => 'ondine@pokedex.com',
            'password' => 'staross456',
        ]);

        $arrayUser = $user->toArray();

        // Le mot de passe ne doit JAMAIS apparaître dans le tableau/JSON
        $this->assertArrayNotHasKey('password', $arrayUser);
        $this->assertArrayNotHasKey('remember_token', $arrayUser);
    }

    /**
     * TEST : Cast du mot de passe (Hachage)
     */
    public function test_le_mot_de_passe_est_automatiquement_hache()
    {
        $password = 'secret_password';
        $user = User::create([
            'name'     => 'Pierre',
            'email'    => 'pierre@pokedex.com',
            'password' => $password,
        ]);

        // On vérifie que le mot de passe en base n'est PAS le texte brut
        $this->assertNotEquals($password, $user->password);
        
        // On vérifie qu'il est bien haché correctement (utilisable pour un login)
        $this->assertTrue(Hash::check($password, $user->password));
    }

    public function test_is_admin_est_bien_autorise_malgre_l_attribut_php8()
    {
        $user = new User(['is_admin' => 1]);
        
        // Si l'attribut PHP8 gagne, is_admin sera nul. 
        // Si la propriété gagne, il sera à 1.
        $this->assertEquals(1, $user->is_admin, "La propriété protected fillable doit primer sur l'Attribut.");
    }

    public function test_le_champ_email_verified_at_est_bien_un_objet_date()
    {
        $user = User::create([
            'name' => 'TestTesteur',
            'email' => 'test43@test.com',
            'password' => 'password',
            'email_verified_at' => '2026-05-15 10:00:00'
        ]);

        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, $user->email_verified_at);
    }

    public function test_l_utilisateur_peut_generer_un_token_sanctum()
    {
        $user = User::create([
            'name' => 'Sacha',
            'email' => 'sacha@pokedex.com',
            'password' => 'password',
        ]);

        $token = $user->createToken('test-token')->plainTextToken;

        $this->assertNotNull($token);
        $this->assertStringContainsString('test-token', $user->tokens()->first()->name);
    }

    //app.php

    /**
     * TEST : Vérification de la configuration globale (app.php)
     */
    public function test_le_middleware_admin_est_bien_enregistre_sous_le_bon_alias()
    {
        // On récupère directement les middlewares enregistrés dans le routeur
        $aliases = app('router')->getMiddleware();

        // On vérifie que la clé existe
        $this->assertArrayHasKey(
            'can-admin', 
            $aliases, 
            "L'alias 'can-admin' n'est pas défini dans bootstrap/app.php"
        );

        // On vérifie que l'alias pointe vers la bonne classe
        $this->assertEquals(
            \App\Http\Middleware\AdminMiddleware::class, 
            $aliases['can-admin']
        );
    }

        /**
     * TEST : Vérification que les routes API sont bien chargées
     */
    public function test_les_routes_api_sont_accessibles()
    {
        // Si le routing est mal configuré dans app.php, cette route renverra une 404
        $response = $this->getJson('/api/pokemon');
        
        // On vérifie que le statut n'est pas 404
        $response->assertStatus(200); 
        // OU si tu veux juste être sûr que la route existe (même si elle est vide) :
        // $this->assertNotEquals(404, $response->getStatusCode());
    }

}