<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
* MIDDLEWARE D'AUTORISATION ADMINISTRATIVE
* 
* Ce composant agit comme une couche de sécurité intermédiaire entre la requête HTTP 
* et les ressources protégées du serveur.
* 
* 
* Garantit que seul un utilisateur possédant 'is_admin' 
* peut accéder aux fonctionnalités admin (logs)
* 
* Il intercepte les requêtes entrantes, vérifie l'identité de l'émetteur via son token,
* et rejette systématiquement les utilisateurs standards ou non-authentifiés.
*/

class AdminMiddleware
{
    /**
    * FILTRE DE SÉCURITÉ : VÉRIFICATION DES PRIVILÈGES ADMINISTRATEUR
    * Ce Middleware agit comme une barrière de contrôle d'accès. Son rôle est d'intercepter la requête avant qu'elle n'atteigne le contrôleur
    * pour s'assurer que l'utilisateur possède les droits élevés nécessaires
    *
    * @param  Closure(Request): (Response)  $next
    */
    public function handle(Request $request, Closure $next)
{
    /**
    * CONDITION D'AUTORISATION
    * Vérifie que l'utilisateur est authentifié (via $request->user()) et s'il est l'admin via le champ 'is_admin'.
    */
    if ($request->user() && $request->user()->is_admin == true) {
        // L'utilisateur est admin : on laisse passer la requête vers la route demandée
    return $next($request);
}   
    /**
    * Si l'utilisateur n'est pas admin, on bloque la requête.
    *
    * Code 403: Indique que l'identité est connue mais que les droits sont insuffisants.
     */
    return response()->json(['message' => 'Accès interdit'], 403);
}
}