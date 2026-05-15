<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PokemonController extends Controller
{
    // GET /api/pokemon
    public function index() {
        $rows = DB::table('pokemon as p')
            ->select('p.*', 't.nom as nom_type')
            ->leftJoin('posseder as po', 'p.num_pokedex', '=', 'po.num_pokedex')
            ->leftJoin('types as t', 't.id_type', '=', 'po.id_type')
            ->orderBy('p.num_pokedex')
            ->get();

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

    // GET /api/pokemon/{id}
    public function show($id) {
        if (!is_numeric($id)) return response()->json(['error' => 'ID invalide'], 400);

        $pokemonRows = DB::table('pokemon as p')
            ->select('p.*', 't.nom as nom_type')
            ->leftJoin('posseder as po', 'p.num_pokedex', '=', 'po.num_pokedex')
            ->leftJoin('types as t', 't.id_type', '=', 'po.id_type')
            ->where('p.num_pokedex', $id)
            ->get();

        if ($pokemonRows->isEmpty()) return response()->json(['error' => 'Introuvable'], 404);

        $talents = DB::table('talents as t')
            ->join('detenir as d', 't.id_talent', '=', 'd.id_talent')
            ->where('d.num_pokedex', $id)
            ->select('t.nom', 't.description_talent')
            ->get();

        $pokemon = (array)$pokemonRows[0];
        $pokemon['types'] = $pokemonRows->pluck('nom_type')->filter()->values();
        $pokemon['talents'] = $talents;

        return response()->json($pokemon);
    }

    // GET /api/types
    public function allTypes() {
        return response()->json(DB::table('types')->get());
    }

    // GET /api/talents
    public function allTalents() {
        return response()->json(DB::table('talents')->get());
    }

    // POST /api/pokemon
    public function store(Request $request) {
        $validated = $request->validate([
            'nom' => 'required',
            'hp' => 'required|integer|min:0',
            'attaque' => 'required|integer|min:0',
            'num_pokedex' => 'required|integer',
        ]);

        // Ici tu pourrais faire le DB::table('pokemon')->insert($validated);
        return response()->json(['message' => 'Pokémon créé'], 201);
    }
}