import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { couleurType } from "../couleurType.ts";

type Pokemon = {
  num_pokedex: number;
  nom: string;
  img: string;
  img_shiny: string;
  types: string[];
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

const mainType = pokemon.types[0] || "Normal";

return (
  <div
    style={{
      textAlign: "center",
      padding: "2rem",
      background: `linear-gradient(145deg, ${couleurType[mainType]} 0%, #ffffff30 100%)`,
      borderRadius: "16px",
    }}
  >
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

    {/* Afficher tous les types */}
    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "1rem" }}>
      {pokemon.types.map(t => (
        <span
          key={t}
          style={{
            padding: "4px 8px",
            borderRadius: "8px",
            background: couleurType[t],
            color: ["Sol", "Électrik", "Glace", "Plante", "Normal", "Acier"].includes(t) ? "black" : "white",
            fontWeight: "bold",
          }}
        >
          {t}
        </span>
      ))}
    </div>

    <p>Numéro Pokédex : {pokemon.num_pokedex}</p>
  </div>
)};