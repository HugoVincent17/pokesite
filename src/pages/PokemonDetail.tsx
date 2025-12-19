import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { couleurType, couleurRarete } from "../parametres.ts";

type Pokemon = {
  num_pokedex: number;
  nom: string;
  img: string;
  img_shiny: string;
  types: string[];
  hp: number;
  attaque: number;
  defense: number;
  attaque_spe: number;
  defense_spe: number;
  vitesse: number;
  rarete: string;
  generation: number;
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

  const stats = [
    { label: "PV", value: pokemon?.hp },
    { label: "ATTAQUE", value: pokemon?.attaque },
    { label: "DÉFENSE", value: pokemon?.defense },
    { label: "ATTAQUE SPÉCIALE", value: pokemon?.attaque_spe },
    { label: "DÉFENSE SPÉCIALE", value: pokemon?.defense_spe },
    { label: "VITESSE", value: pokemon?.vitesse },
  ];
  
  
  const getStatColor = (value: number) => {
    if (value <= 49) return "red";
    if (value <= 79) return "orange";
    if (value <= 99) return "yellow";
    if (value <= 119) return "#7CFC00";
    if (value <= 149) return "green";
    return "blue";
  };

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
    <h1
      style={{
        fontWeight: "bold",
        color: couleurRarete[pokemon.rarete] || "white"
      }}
    >
      {pokemon.nom}
    </h1>

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

    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
  {stats.map((stat) => (
    <div key={stat.label} style={{ textAlign: "center", minWidth: "80px" }}>
      <p style={{ fontWeight: "bold" }}>{stat.label}</p>
      <p style={{ color: getStatColor(stat.value ?? 0), fontWeight: "bold", fontSize: "1.2rem" }}>{stat.value}</p>
    </div>
  ))}
</div>
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
    <p>Génération : {pokemon.generation}</p>
  </div>
)};