<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'remember_token'])]

/**
* MODÈLE UTILISATEUR 
* 
* Ce modèle représente un utilisateur du système dans la base de données.
* Contrairement aux autres modèles, il hérite de 'Authenticatable', ce qui lui permet 
* de s'intégrer directement dans le système d'authentification et de sécurité de Laravel.
*/

class User extends Authenticatable
{
    /**
    * - HasFactory : Permet la génération de faux utilisateurs pour les tests (Seeders).
    * - Notifiable : Offre la possibilité d'envoyer des notifications
    * - HasApiTokens : Essentiel pour Laravel Sanctum. Donne au modèle la capacité 
    *   de générer et de valider des jetons d'accès
    */
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
    * ASSIGNATION DE MASSE 
    * Déclare les champs autorisés à être modifiés ou créés via des formulaires/requêtes API.
    * Note de sécurité : Inclure 'is_admin' ici impose de forcer sa valeur à 'false' 
    * manuellement dans le script d'inscription pour éviter qu'un utilisateur ne s'auto-attribue les droits d'admin.
    */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_admin',
        'email_verified_at',
    ];

    /**
    * PROTECTION DE LA CONFIDENTIALITÉ (CHAMPS MASQUÉS)
    * Ces attributs seront automatiquement exclus des réponses JSON envoyées au Front-end (React).
    * Sécurité majeure : Garantit que le mot de passe haché ou le token de session
    * ne transitent jamais sur le réseau vers le client, prévenant les fuites de données sensibles.
    */

    protected $hidden = [
        'password',
        'remember_token',
    ];
    /**
    * TYPAGE ET SÉCURITÉ AUTOMATIQUE DES ATTRIBUTS (CASTS)
    * Définit comment Laravel doit interpréter et transformer les données à l'entrée et à la sortie de la base.
    * 
    * @return array<string, string>
    */
    protected function casts(): array
    {
        return [
            // Convertit automatiquement la chaîne de la BDD en objet DateTime utilisable en PHP
            'email_verified_at' => 'datetime',
            // Sécurité critique : Demande à Laravel de hacher automatiquement le mot de passe
            // avec l'algorithme sécurisé par défaut lors de la sauvegarde.
            'password' => 'hashed',
        ];
    }
}
