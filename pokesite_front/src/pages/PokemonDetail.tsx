import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { couleurType, couleurRarete, tableTypes } from "../parametres.ts";

type Talent = {
  id_talent: number;
  nom: string;
  description_talent: string;
};
// Ajout du taux_capture dans le type
type Pokemon = {
  num_pokedex: number;
  nom: string;
  img: string;
  img_shiny: string;
  img_mini: string;
  types: string[];
  hp: number;
  attaque: number;
  defense: number;
  attaque_spe: number;
  defense_spe: number;
  vitesse: number;
  rarete: string;
  generation: number;
  taux_capture: number;
  talents?: Talent[]; // Champ optionnel pour les talents
};

export default function PokemonDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/pokemon/${id}`)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!pokemon) return <div style={{ color: "white", textAlign: "center", padding: "5rem" }}>Chargement...</div>;

  const mainType = pokemon.types[0] || "Normal";
  
  const stats = [
    { label: "PV", val: pokemon.hp, max: 255 },
    { label: "Attaque", val: pokemon.attaque, max: 255 },
    { label: "Défense", val: pokemon.defense, max: 255 },
    { label: "Attaque Spéciale", val: pokemon.attaque_spe, max: 255 },
    { label: "Défense Spéciale", val: pokemon.defense_spe, max: 255 },
    { label: "Vitesse", val: pokemon.vitesse, max: 255 },
  ];

  const getStatColor = (val: number) => {
    if (val < 40) return "#ff4d4d";
    if (val < 60) return "#f06f11";
    if (val < 80) return "#ffcc00";
    if (val < 100) return "#33ee33";
    if (val < 120) return "#007700";
    if (val < 150) return "#00bbff";
    return "#0066ff";
  };

  const calculerAffinites = () => {
    if (!pokemon) return { faiblesses: [], resistances: [], immunites: [] };
    
    const faiblesses: [string, number][] = [];
    const resistances: [string, number][] = [];
    const immunites: string[] = [];
  
    Object.keys(tableTypes).forEach((typeAttaquant) => {
      let score = 1;
      pokemon.types.forEach((typeDefenseur) => {
        const mod = tableTypes[typeAttaquant][typeDefenseur] ?? 1;
        score *= mod;
      });
  
      if (score === 0) {
        immunites.push(typeAttaquant);
      } else if (score > 1) {
        faiblesses.push([typeAttaquant, score]);
      } else if (score < 1) {
        resistances.push([typeAttaquant, score]);
      }
    });
  
    return { faiblesses, resistances, immunites };
  };
  
  const { faiblesses, resistances, immunites } = calculerAffinites();

  return (
    <div style={{ 
      maxWidth: "1000px", 
      margin: "2rem auto", 
      background: "#1a1a1a", 
      borderRadius: "20px", 
      overflow: "hidden", 
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      color: "white",
      fontFamily: "sans-serif",
      border: `2px solid ${couleurType[mainType]}`
    }}>
      {/* Header avec bouton retour */}
      <div style={{ display: "flex", alignItems: "center", padding: "1rem", background: `linear-gradient(90deg, ${couleurType[mainType]}99, transparent)` }}>
        <button onClick={() => navigate(-1)} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "1.5rem", marginRight: "1rem" }}>←</button>
        <img src={pokemon.img_mini} alt="mini" style={{ width: "40px", marginRight: "10px" }} />
        <h1 style={{ margin: 0, fontSize: "1.8rem" || "white" }}>
          #{pokemon.num_pokedex} - {pokemon.nom}
        </h1>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1.2fr 0.8fr", 
        gap: "1.5rem", 
        padding: "1.5rem",
        alignItems: "start"
      }}>
        
        {/* COLONNE 1 : VISUELS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ flex: 1, background: "#2a2a2a", borderRadius: "15px", padding: "10px", textAlign: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "#aaa" }}>NORMAL</span>
            <img src={pokemon.img} alt="normal" style={{ width: "100%", height: "auto" }} />
          </div>
          <div style={{ background: "#2a2a2a", borderRadius: "15px", padding: "10px", textAlign: "center" }}>
            <span style={{ fontSize: "0.8rem", color: "#aaa" }}>SHINY</span>
            <img src={pokemon.img_shiny} alt="shiny" style={{ width: "100%", height: "auto" }} />
          </div>
        </div>

        {/* COLONNE 2 : STATS (Style Coup Critique) */}
        <div style={{ background: "#252525", padding: "1.5rem", borderRadius: "15px", display: "flex", flexDirection: "column", justifyContent:"space-between" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "15px" }}>
          <h3 style={{ marginTop: 0, borderBottom: "1px solid #444", paddingBottom: "5px" }}>Statistiques de base</h3>
          {stats.map(s => (
            <div key={s.label} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "4px" }}>
                <span>{s.label}</span>
                <span style={{ fontWeight: "bold" }}>{s.val}</span>
              </div>
              <div style={{ height: "8px", background: "#444", borderRadius: "4px" }}>
                <div style={{ 
                  width: `${(s.val / s.max) * 100}%`, 
                  height: "100%", 
                  background: getStatColor(s.val), 
                  borderRadius: "4px",
                  transition: "width 0.5s ease"
                }} />
              </div>
            </div>
          ))}
          </div>
          <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem", color: "#888" }}>
            Total : {pokemon.hp + pokemon.attaque + pokemon.defense + pokemon.attaque_spe + pokemon.defense_spe + pokemon.vitesse}
          </div>
          {/* Section des Talents */}
<div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#2a2a2a', borderRadius: '10px' }}>
  <h3 style={{ borderBottom: '1px solid #555', paddingBottom: '10px' }}>Talents</h3>
  
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
    {pokemon.talents && pokemon.talents.length > 0 ? (
      pokemon.talents.map((t, index) => (
        <div key={index} className="talent-card">
          <strong style={{ color: couleurRarete[pokemon.rarete] }}>{t.nom}</strong>
          <p style={{ margin: '5px 0 0 0', fontSize: '0.9em', color: '#ccc', lineHeight: '1.4' }}>
            {t.description_talent}
          </p>
        </div>
      ))
    ) : (
      <p style={{ fontStyle: 'italic', color: '#888' }}>Aucun talent répertorié pour ce Pokémon.</p>
    )}
  </div>
</div>
        </div>

        {/* COLONNE 3 : INFOS TECHNIQUES */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "#252525", padding: "1rem", borderRadius: "15px" }}>
            <h3 style={{ marginTop: 0, fontSize: "1rem" }}>Types</h3>
            <div style={{ display: "flex", gap: "5px" }}>
              {pokemon.types.map(t => (
                <span key={t} style={{ 
                  background: couleurType[t], 
                  padding: "5px 10px", 
                  borderRadius: "5px", 
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  color: ["Sol", "Électrik", "Glace", "Plante", "Normal", "Acier"].includes(t) ? "black" : "white", 
                }}>{t}</span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
  
  {/* SECTION FAIBLESSES */}
  {faiblesses.length > 0 && (
    <div>
      <h3 style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.8rem" }}>FAIBLESSES</h3>
      <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
        {faiblesses.map(([type, mult]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ background: couleurType[type], color: ["Sol", "Électrik", "Glace", "Plante", "Normal", "Acier"].includes(type.trim()) ? "black" : "white", padding: "5px 10px", borderRadius: "5px", fontWeight: "bold", fontSize: "0.8rem" }}>
              {type}
            </span>
            <span style={{ color: "#ffaa00", fontWeight: "bold" }}>x{mult}</span>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* SECTION RÉSISTANCES */}
  {resistances.length > 0 && (
    <div>
      <h3 style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.8rem" }}>RÉSISTANCES</h3>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {resistances.map(([type, mult]) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ background: couleurType[type], color: ["Sol", "Électrik", "Glace", "Plante", "Normal", "Acier"].includes(type.trim()) ? "black" : "white", padding: "5px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "0.9rem" }}>
              {type}
            </span>
            <span style={{ color: "#ffaa00", fontWeight: "bold" }}>x{mult}</span>
          </div>
        ))}
      </div>
    </div>
  )}

  {/* SECTION IMMUNITÉS */}
  {immunites.length > 0 && (
    <div>
      <h3 style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.8rem" }}>IMMUNITÉS</h3>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {immunites.map((type) => (
          <div key={type} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ background: couleurType[type], color: "#000", padding: "5px 12px", borderRadius: "6px", fontWeight: "bold", fontSize: "0.9rem" }}>
              {type}
            </span>
            <span style={{ color: "#ffaa00", fontWeight: "bold" }}>Immunisé</span>
          </div>
        ))}
      </div>
    </div>
  )}

</div>
          <div style={{ background: "#252525", padding: "1rem", borderRadius: "15px", fontSize: "0.9rem" }}>
            <p><strong>Génération :</strong> {pokemon.generation}</p>
            <p><strong>Taux de capture :</strong> {pokemon.taux_capture}</p>
            <p><span style={{ color: couleurRarete[pokemon.rarete] }}>{pokemon.rarete}</span></p>  
          </div>

          <div style={{ 
            background: `linear-gradient(45deg, #222, ${couleurType[mainType]}44)`, 
            padding: "1rem", 
            borderRadius: "15px", 
            textAlign: "center" 
          }}>
            <p style={{ margin: 0, fontSize: "0.8rem", color: "#ccc" }}>Pokédex</p>
            <p style={{ fontSize: "1.5rem", margin: "5px 0", fontWeight: "bold" }}>N° {pokemon.num_pokedex}</p>
          </div>
        </div>
          
      </div>
    </div>
  );
}