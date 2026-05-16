<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    /**
    * 1. CONFIGURATION DU ROUTAGE (ROUTING)
    * Déclare les différents fichiers de routes de l'application et charge leurs préfixes.
    * - web : Pour les routes classiques (web.php) avec sessions et cookies.
    * - api : Pour l'API REST (api.php) avec authentification token.
    * - commands : Pour les scripts de console personnalisés (Artisan).
    * - health : Crée un point de terminaison (/up) pour vérifier le statut de l'application (monitoring).
    */
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    /**
    * ENREGISTREMENT ET CONFIGURATION DES MIDDLEWARES
    * Permet d'injecter, de modifier ou de donner des alias aux filtres de sécurité.
    */
    ->withMiddleware(function (Middleware $middleware) {
        /**
        * ENREGISTREMENT DE L'ALIAS DE SÉCURITÉ
        * On associe la classe 'AdminMiddleware' au mot-clé raccourci 'can-admin'.
        * Cela permet de protéger n'importe quelle route dans le fichier api.php 
        * en écrivant simplement ->middleware('can-admin').
        * Sécurité : Ce middleware vérifie que l'utilisateur est authentifié et possède les droits d'administrateur avant 
        * d'accéder aux ressources sensibles (logs).
        */
    $middleware->alias([
        'can-admin' => \App\Http\Middleware\AdminMiddleware::class, 
    ]);
})

    //GESTION DES EXCEPTIONS
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
