import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Pokemon = {
  num_pokedex: number;
  nom: string;
  img: string;
  img_shiny: string;
  // tu peux ajouter d'autres champs ici
};

export default function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const res = await fetch(`http://localhost:3001/pokemon/${id}`);
        const data = await res.json();
        setPokemon(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPokemon();
  }, [id]);

  if (!pokemon) return <p>Chargement...</p>;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{pokemon.nom}</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", alignItems: "center" }}>
        <div>
          <p>Normal</p>
          <img src={pokemon.img} alt={`${pokemon.nom} normal`} style={{ maxWidth: "300px", height: "auto" }} />
        </div>
        <div>
          <p>Shiny</p>
          <img src={pokemon.img_shiny} alt={`${pokemon.nom} shiny`} style={{ maxWidth: "300px", height: "auto" }} />
        </div>
      </div>
      <p>Numéro Pokédex : {pokemon.num_pokedex}</p>
    </div>
  );
}