<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * MODÈLE LOG
 * 
 * Ce modèle représente la table 'logs' en base de données.
 * Il est utilisé pour assurer le suivi des actions utilisateurs
 */

class Log extends Model
{
    // HasFactory pour les données de test et les seeding
    use HasFactory;

    /**
     * PROTECTION CONTRE L'ASSIGNATION DE MASSE (MASS ASSIGNMENT). L'assignation de masse c'est 
     * lorsqu'on utilise des méthodes comme Log::create() ou $log->fill() pour remplir les champs d'un modèle à partir d'un tableau de données.
     * 
     * Sécurité : Seuls les champs listés ci-dessous peuvent être remplis via 
     * les méthodes Log::create() ou $log->fill().
     * Cela empêche un utilisateur malveillant d'injecter des données dans des colonnes
     * sensibles non autorisées
     */

    protected $fillable = ['user_name', 'action'];
}