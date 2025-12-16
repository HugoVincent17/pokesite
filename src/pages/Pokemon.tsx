import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { couleurType } from "../couleurType.ts";

type Pokemon = {
  num_pokedex: number;
  nom: string;
  img_mini: string;
  types: string[];
};

export default function Pokemon() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3001/pokemon");
      const data = await res.json();
      setPokemons(data);
    }
    fetchData();
    
  }, []);

  const filteredPokemons = pokemons.filter((p) =>
    p.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: "2rem", marginBottom: "2rem" }}>
      <h1 style={{ textAlign: "center", width: "100%" }}>Liste des Pokémons</h1>
      <input
        type="text"
        placeholder="Rechercher un Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.5rem 1rem",
          marginBottom: "1.5rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          width: "250px",
          textAlign: "left",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          maxWidth: "100%"
        }}
      >
        {filteredPokemons.map((pokemon) => {
          const mainType = (pokemon.types && pokemon.types.length > 0) ? pokemon.types[0] : "Normal";

          return (
            <div
              key={pokemon.num_pokedex}
              style={{
                width: "120px",
                padding: "0.5rem",
                textAlign: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                background: `linear-gradient(145deg, ${couleurType[mainType] || couleurType["Normal"]} 0%, #ffffff30 100%)`,
                cursor: "pointer",
              }}
            >
              <Link to={`/pokemons/${pokemon.num_pokedex}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={pokemon.img_mini} alt={pokemon.nom} style={{ maxWidth: "100%", height: "auto", margin: "0 auto" }} />
                <p>{pokemon.num_pokedex}</p>
                <p>{pokemon.nom}</p>
        
                
                <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
                  {(pokemon.types || []).map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "2px 6px",
                        borderRadius: "6px",
                        background: couleurType[t],
                        color: ["Sol", "Électrik", "Glace", "Plante", "Normal"].includes(t) ? "black" : "white",
                        fontSize: "0.7rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
