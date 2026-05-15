<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * CONTRÔLEUR DE GESTION DU POKÉDEX
 * 
 * Ce contrôleur centralise toute la logique de consultation et de manipulation des Pokémon.
 * Il utilise l'interface Query Builder de Laravel (DB::table) pour des performances optimales
 * lors des jointures complexes entre les Pokémon, leurs types et leurs talents.
 */

class PokemonController extends Controller
{
    /**
     * RÉCUPÉRATION GLOBALE DES POKÉMON
     * Récupère l'intégralité du Pokédex avec les types associés.
     */
    public function index() {
        $rows = DB::table('pokemon as p')
            ->select('p.*', 't.nom as nom_type')
            ->leftJoin('posseder as po', 'p.num_pokedex', '=', 'po.num_pokedex')
            ->leftJoin('types as t', 't.id_type', '=', 'po.id_type')
            ->orderBy('p.num_pokedex')
            ->get();

    /**
     * STRUCTURATION DES DONNÉES (Génération du JSON)
     * On groupe les lignes par numéro de Pokédex pour fusionner les doublons de types
     * en un tableau propre
     */

        $grouped = $rows->groupBy('num_pokedex')->map(function ($items) {
            $first = $items[0];
            return [
                'num_pokedex' => $first->num_pokedex,
                'nom' => $first->nom,
                'img' => $first->img,
                'img_shiny' => $first->img_shiny,
                'img_mini' => $first->img_mini,
                'generation' => $first->generation,
                'rarete' => $first->rarete,
                'hp' => $first->hp,
                'attaque' => $first->attaque,
                'defense' => $first->defense,
                'attaque_spe' => $first->attaque_spe,
                'defense_spe' => $first->defense_spe,
                'vitesse' => $first->vitesse,
                'taux_capture' => $first->taux_capture,
                'types' => $items->pluck('nom_type')->filter()->values()
            ];
        });

        return response()->json($grouped->values());
    }

    /**
     * RÉCUPÉRATION DÉTAILLÉE D'UN POKÉMON (Detail)
     * Inclut les types et les talents spécifiques.
     */
    public function show($id) {
        // Sécurité : Vérifie que l'ID est bien un nombre pour éviter les injections ou erreurs SQL
        if (!is_numeric($id)) return response()->json(['error' => 'ID invalide'], 400);

        /**
         * RÉCUPÉRATION DU POKÉMON AVEC TYPES
         * Jointure pour obtenir les types associés au Pokémon via la table de liaison 'posseder'.
         */
        $pokemonRows = DB::table('pokemon as p')
            ->select('p.*', 't.nom as nom_type')
            ->leftJoin('posseder as po', 'p.num_pokedex', '=', 'po.num_pokedex')
            ->leftJoin('types as t', 't.id_type', '=', 'po.id_type')
            ->where('p.num_pokedex', $id)
            ->get();

        if ($pokemonRows->isEmpty()) return response()->json(['error' => 'Introuvable'], 404);

        /**
         * RÉCUPÉRATION DES TALENTS
         * Jointure séparée pour obtenir les talents via la table de liaison 'detenir'
         */
        $talents = DB::table('talents as t')
            ->join('detenir as d', 't.id_talent', '=', 'd.id_talent')
            ->where('d.num_pokedex', $id)
            ->select('t.nom', 't.description_talent')
            ->get();

        // Formatage final : Fusion des infos Pokémon + tableau de types + tableau de talents

        $pokemon = (array)$pokemonRows[0];
        $pokemon['types'] = $pokemonRows->pluck('nom_type')->filter()->values();
        $pokemon['talents'] = $talents;

        return response()->json($pokemon);
    }

    //récupération de tous les types
    public function allTypes() {
        return response()->json(DB::table('types')->get());
    }

    //récupération de tous les talents
    public function allTalents() {
        return response()->json(DB::table('talents')->get());
    }
}