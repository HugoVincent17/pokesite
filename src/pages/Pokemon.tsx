import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { couleurType } from "../couleurType.ts"

type Pokemon = {
  num_pokedex: number;
  nom: string;
  img_mini: string;
  type: string;
};

export default function Pokemon() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
    useEffect(() => {
      async function fetchData() {
        const res = await fetch("http://localhost:3001/pokemon");
        const data = await res.json();
        setPokemons(data);
      }
      fetchData();
    }, []);
  
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {pokemons.map((pokemon) => (
          <div
          key={pokemon.num_pokedex}
          style={{
            width: "120px",
            padding: "0.5rem",
            textAlign: "center",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            background: `linear-gradient(145deg, ${couleurType[pokemon.type || "Normal"]} 0%, #ffffff20 100%)`,
            transition: "transform 0.2s, box-shadow 0.2s",
            cursor: "pointer",
          }}
        >
          <Link to={`/pokemons/${pokemon.num_pokedex}`} style={{ textDecoration: "none", color: "inherit" }}>
            <img src={pokemon.img_mini} alt={pokemon.nom} style={{ maxWidth: "100%", height: "auto", margin: "0 auto" }} />
            <p>{pokemon.num_pokedex}</p>
            <p>{pokemon.nom}</p>
          </Link>
        </div>
    ))}
      </div>
  )};
  