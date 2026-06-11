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
        //on crée un utilisateur temporaire pour le test d'inscription
        $userData = [
            'name' => 'PokeLog',
            'email' => 'poke@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $response = $this->postJson('/api/register', $userData);

        // On vérifie que le compte est créé
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', ['email' => 'jean@example.com']);

        // On vérifie que le LOG est bien là
        $this->assertDatabaseHas('logs', [
            'user_name' => 'PokeLog',
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

        // On tente de se connecter avec les identifiants
        $loginData = [
            'email' => 'test@example.com',
            'password' => 'password123',
        ];

        // On simule une requête POST vers /api/login
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

        // On vérifie que la requête est un succès
        $response->assertStatus(200);
        
        // On vérifie que la réponse est un tableau de Pokémon avec les champs
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
        // On récupère un numéro existant dans la base de données de test
        $pokemon = DB::table('pokemon')->first();

        // Si la base est vide pendant le test, on évite l'erreur
        if (!$pokemon) {
            $this->markTestSkipped('Aucun pokemon dans la base de données pour tester le detail.');
        }

        // On simule une requête sur le détail du Pokémon
        $response = $this->getJson("/api/pokemon/{$pokemon->num_pokedex}");

        // On vérifie que la requête est un succès
        $response->assertStatus(200)
                 ->assertJsonPath('num_pokedex', $pokemon->num_pokedex)
                 ->assertJsonPath('nom', $pokemon->nom);
    }

    public function test_peut_recuperer_tous_les_types_disponibles()
    {   
        // On simule une requête sur la route des types
        $response = $this->getJson('/api/types');

        // On vérifie que la requête est un succès
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
        // On simule une requête sur un numéro de pokédex qui n'existe pas
        $response = $this->getJson('/api/pokemon/9999'); // ID qui n'existe pas
        // On vérifie que la réponse est un 404 avec le message d'erreur
        $response->assertStatus(404)
                 ->assertJson(['error' => 'Introuvable']);
    }

    /**
     * TEST : Erreur 400 si ID n'est pas numérique
     */
    public function test_renvoie_400_si_id_invalide()
    {
        // On simule une requête avec un ID non numérique
        $response = $this->getJson('/api/pokemon/abc'); 

        // On vérifie que la réponse est un 400 avec le message d'erreur
        $response->assertStatus(400)
                 ->assertJson(['error' => 'ID invalide']);
    }

    public function test_peut_recuperer_la_liste_des_pokemon_existants()
    {
        // On simule une requête sur l'index pour récupérer tous les Pokémon
        $response = $this->getJson('/api/pokemon');

        // On vérifie que la requête est un succès
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
                'types' // Vérifie que les types sont bien inclus dans la réponse de l'index
            ]
        ]);
    }

    /**
     * TEST : Détail d'un Pokémon sur donnée réelle
     */
    public function test_peut_recuperer_un_pokemon_reel_via_la_db()
    {
        // On va chercher dynamiquement un numéro de pokédex qui existe vraiment dans la base de données de test
        $pokemon = DB::table('pokemon')->first();

        // Si la base de donnéesest vide, on arrête le test proprement
        if (!$pokemon) {
            $this->markTestSkipped('Aucun Pokémon trouvé dans la base de données.');
        }

        // On utilise le numéro de pokédex du Pokémon trouvé pour tester la route de détail
        $id = $pokemon->num_pokedex;

        // On simule une requête sur le détail du Pokémon
        $response = $this->getJson("/api/pokemon/{$id}");

        // On vérifie que la requête est un succès et que les données correspondent
        $response->assertStatus(200)
                 ->assertJsonPath('num_pokedex', $id)
                 ->assertJsonStructure([
                     'nom', 
                     'types', // Vérifie que les types sont bien inclus dans la réponse du détail
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
        // On crée un utilisateur avec is_admin = 0 
        $user = User::create([
            'name' => 'Simple User',
            'email' => 'user@poke.com',
            'password' => Hash::make('password123'),
            'is_admin' => 0
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
            'name' => 'Admin Poke',
            'email' => 'admin@poke.com',
            'password' => Hash::make('password123'),
            'is_admin' => 1,
        ]);

        // On tente d'accéder aux logs avec son token (actingAs)

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
        // On crée un log via le modèle
        Log::create([
            'user_name' => 'Hugo',
            'action' => 'A consulté le Pokédex'
        ]);

        // On vérifie qu'il existe bien dans la base de données
        $this->assertDatabaseHas('logs', [
            'user_name' => 'Hugo',
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
        // On crée un utilisateur en utilisant le constructeur avec un tableau de données
        $userData = [
            'name'     => 'Hugo le développeur',
            'email'    => 'hugo@poke.com',
            'password' => 'hugo1234',
            'is_admin' => 1
        ];

        // Grâce à $fillable, tous les champs du tableau sont autorisés à être remplis
        $user = User::create($userData);

        // On vérifie que l'utilisateur est bien dans la base de données avec les bons attributs
        $this->assertDatabaseHas('users', [
            'email'    => 'hugo@poke.com',
            'is_admin' => 1
        ]);
        // On vérifie que les données sont correctement assignées à l'objet User
        $this->assertEquals('Hugo le développeur', $user->name);
    }

    /**
     * TEST : Sécurité des données (Hidden)
     */
    public function test_les_donnees_sensibles_sont_masquees_lors_de_la_conversion_json()
    {
        // On crée un utilisateur
        $user = User::create([
            'name'     => 'Hugo',
            'email'    => 'hugo@dev.com',
            'password' => 'hugo1234',
        ]);

        // On convertit l'utilisateur en tableau (comme lors d'une réponse JSON)
        $arrayUser = $user->toArray();

        // Le mot de passe ne doit JAMAIS apparaître dans le tableau/JSON
        // Le remember_token non plus
        // Ces champs sont protégés par $hidden dans le modèle User
        $this->assertArrayNotHasKey('password', $arrayUser);
        $this->assertArrayNotHasKey('remember_token', $arrayUser);
    }

    /**
     * TEST : Cast du mot de passe (Hachage)
     */
    public function test_le_mot_de_passe_est_automatiquement_hache()
    {
        // On crée un utilisateur avec un mot de passe en texte brut
        $password = 'secret_password';
        $user = User::create([
            'name'     => 'Moi',
            'email'    => 'moi@poke.com',
            'password' => $password,
        ]);

        // On vérifie que le mot de passe dans la base de données n'est PAS le texte brut
        $this->assertNotEquals($password, $user->password);
        
        // On vérifie qu'il est bien haché correctement (utilisable pour un login)
        $this->assertTrue(Hash::check($password, $user->password));
    }

    public function test_is_admin_est_bien_autorise_malgre_l_attribut_php8()
    {
        // On crée un utilisateur en utilisant le constructeur avec un champ 'is_admin' même si c'est un Attribut PHP8
        $user = new User(['is_admin' => 1]);
        
        // Si l'attribut PHP8 gagne, is_admin sera nul. 
        // Si la propriété gagne, il sera à 1.
        $this->assertEquals(1, $user->is_admin, "La propriété protected fillable doit primer sur l'Attribut.");
    }

    public function test_le_champ_email_verified_at_est_bien_un_objet_date()
    {
        // On crée un utilisateur avec une date de vérification d'email
        $user = User::create([
            'name' => 'TestTesteur',
            'email' => 'test43@test.com',
            'password' => 'password',
            'email_verified_at' => '2026-05-15 10:00:00'
        ]);

        // On vérifie que le champ email_verified_at est bien converti en objet Carbon (date)
        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, $user->email_verified_at);
    }

    public function test_l_utilisateur_peut_generer_un_token_sanctum()
    {
        // On crée un utilisateur
        $user = User::create([
            'name' => 'Utilisateur',
            'email' => 'utilisateur@poke.com',
            'password' => 'password',
        ]);

        // On génère un token d'accès pour cet utilisateur
        $token = $user->createToken('test-token')->plainTextToken;

        // On vérifie que le token est généré et stocké dans la base de données
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
        // On simule une requête sur la route d'index des Pokémon pour vérifier que les routes sont bien chargées
        $response = $this->getJson('/api/pokemon');
        
        // On vérifie que la route est accessible (200 OK) et pas un 404 (Not Found)
        $response->assertStatus(200); 
    }

    // test si un utilisateur peut ajouter un favori

    public function test_un_utilisateur_peut_ajouter_un_favori()
    {
        // Créer un utilisateur fictif
        $user = User::factory()->create();

        // Données envoyées par le Front-end (React)
        $data = [
            'num_pokedex' => 25 
        ];

        // Simuler la connexion de l'utilisateur et envoyer la requête POST
        $response = $this->actingAs($user)
            ->postJson('/api/favoris', $data);

        // Vérifier que Laravel répond bien avec un statut 201 (Créé)
        $response->assertStatus(201)
                 ->assertJson(['message' => 'Ajouté aux favoris !']);

        // Vérifier que la ligne a bien été insérée dans la table de la BDD
        $this->assertDatabaseHas('favoris', [
            'user_id' => $user->id,
            'num_pokedex' => 25
        ]);
    }

    
     //Test : Est-ce qu'un utilisateur peut bien retirer un favori
     
    public function test_un_utilisateur_peut_retirer_un_favori()
    {
        // Créer un utilisateur fictif
        $user = User::factory()->create();

        // Insérer manuellement un favori en BDD pour cet utilisateur
        DB::table('favoris')->insert([
            'user_id' => $user->id,
            'num_pokedex' => 6 
        ]);

        // Simuler la connexion et envoyer la requête DELETE sur l'id (num_pokedex)
        $response = $this->actingAs($user)
            ->deleteJson('/api/favoris/6');

        // Vérifier la réponse de succès
        $response->assertStatus(200)
                 ->assertJson(['message' => 'Retiré des favoris.']);

        // Vérifier que la ligne a bien été SUPPRIMÉE de la BDD
        $this->assertDatabaseMissing('favoris', [
            'user_id' => $user->id,
            'num_pokedex' => 6
        ]);
    }

    
     //3. Test : Est-ce que les favoris sont différents selon les utilisateurs
    
    public function test_les_favoris_sont_differents_selon_les_utilisateurs()
    {
        // Créer deux utilisateurs distincts
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        // Ajouter un favori (Pikachu) uniquement à l'utilisateur A
        DB::table('favoris')->insert([
            'user_id' => $userA->id,
            'num_pokedex' => 25
        ]);

        // Ajouter un favori différent (Carapuce) uniquement à l'utilisateur B
        DB::table('favoris')->insert([
            'user_id' => $userB->id,
            'num_pokedex' => 7
        ]);

        // On vérifie la liste de l'utilisateur A 
        $responseA = $this->actingAs($userA)->getJson('/api/favoris');
        
        $responseA->assertStatus(200);
        // L'utilisateur A doit avoir le pokémon 25 mais PAS le pokémon 7
        $this->assertTrue(collect($responseA->json())->contains('num_pokedex', 25));
        $this->assertFalse(collect($responseA->json())->contains('num_pokedex', 7));

        // ÉTAPE 2 : On vérifie la liste de l'utilisateur B
        $responseB = $this->actingAs($userB)->getJson('/api/favoris');
        
        $responseB->assertStatus(200);
        // L'utilisateur B doit avoir le pokémon 7 mais PAS le pokémon 25
        $this->assertTrue(collect($responseB->json())->contains('num_pokedex', 7));
        $this->assertFalse(collect($responseB->json())->contains('num_pokedex', 25));
    }

}