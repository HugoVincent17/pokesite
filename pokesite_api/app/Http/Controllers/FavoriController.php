<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FavoriController extends Controller
{
    /**
     * GET /api/favoris
     * Récupère uniquement les Pokémon mis en favoris par l'utilisateur connecté
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id; // On identifie l'utilisateur via son token

        // On va chercher dans la BDD les Pokémon qui ont une ligne dans la table favoris pour cet user
        $favorisbruts = DB::table('favoris as f')
            ->join('pokemon as p', 'f.num_pokedex', '=', 'p.num_pokedex')
            ->leftJoin('posseder as po', 'p.num_pokedex', '=', 'po.num_pokedex')
            ->leftJoin('types as t', 't.id_type', '=', 'po.id_type')
            ->where('f.user_id', $userId) 
            ->select('p.*', 't.nom as nom_type')
            ->get();

        // On groupe par Pokémon pour gérer les doubles types 
        $grouped = $favorisbruts->groupBy('num_pokedex')->map(function ($items) {
            $first = $items->first(); // Sécurité : .first() évite le crash si l'index 0 est manquant
            return [
                'num_pokedex' => $first->num_pokedex,
                'nom' => $first->nom,
                'img_mini' => $first->img_mini,
                'generation' => $first->generation,
                'rarete' => $first->rarete,
                'types' => $items->pluck('nom_type')->filter()->values(),
                'is_favorite' => true 
            ];
        });

        return response()->json($grouped->values());
    }

    /**
     * POST /api/favoris
     * Ajoute un Pokémon dans les favoris de l'utilisateur connecté
     */
    public function store(Request $request)
    {
        $request->validate([
            'num_pokedex' => 'required|integer'
        ]);

        $userId = $request->user()->id;
        $numPokedex = $request->num_pokedex;

        // Correction de la variable (sans espace !)
        $existe_deja = DB::table('favoris')
            ->where('user_id', $userId)
            ->where('num_pokedex', $numPokedex)
            ->exists();

        if (!$existe_deja) {
            DB::table('favoris')->insert([
                'user_id' => $userId,
                'num_pokedex' => $numPokedex
            ]);
        }

        return response()->json(['message' => 'Ajouté aux favoris !'], 201);
    }

    /**
     * DELETE /api/favoris/{id}
     * Retire un Pokémon des favoris de l'utilisateur connecté
     */
    public function destroy(Request $request, $id)
    {
        $userId = $request->user()->id;

        // Supprime la ligne spécifique qui lie cet utilisateur à ce Pokémon
        DB::table('favoris')
            ->where('user_id', $userId)
            ->where('num_pokedex', $id)
            ->delete();

        return response()->json(['message' => 'Retiré des favoris.']);
    }
}