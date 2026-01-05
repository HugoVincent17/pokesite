import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { couleurType, couleurRarete } from "../parametres.ts";
import { useSearchParams } from "react-router-dom";

//type pokémon
type Pokemon = {
  num_pokedex: number;
  nom: string;
  img_mini: string;
  types: string[];
  rarete: string;
  generation: number;
  hp: number;
  attaque: number;
  defense: number;
  attaque_spe: number;
  defense_spe: number;
  vitesse: number;
};

type StatKey = "hp" | "attaque" | "defense" | "attaque_spe" | "defense_spe" | "vitesse"; //type pour les stats

//fonction pokemon useState et useEffect 
export default function Pokemon() {// composant principal
  const [searchParams, setSearchParams] = useSearchParams();// gestion des paramètres de l'URL
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);// état pour la liste des pokémons
  const [search, setSearch] = useState(searchParams.get("search") || "");// état pour la recherche par nom
  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get("types")?.split(",") || []);// état pour les types sélectionnés
  const [doubleType, setDoubleType] = useState(searchParams.get("doubleType") === "true");// état pour le mode double type
  const [selectedRarete, setSelectedRarete] = useState(searchParams.get("rarete") || null);// état pour la rareté sélectionnée
  const [selectedGeneration, setSelectedGeneration] = useState(searchParams.get("generation") ? Number(searchParams.get("generation")) : null);// état pour la génération sélectionnée
  const [statFilters, setStatFilters] = useState<{ [key in StatKey]?: number }>({
    hp: searchParams.get("hp") ? Number(searchParams.get("hp")) : undefined,
    attaque: searchParams.get("attaque") ? Number(searchParams.get("attaque")) : undefined,
    defense: searchParams.get("defense") ? Number(searchParams.get("defense")) : undefined,
    attaque_spe: searchParams.get("attaque_spe") ? Number(searchParams.get("attaque_spe")) : undefined,
    defense_spe: searchParams.get("defense_spe") ? Number(searchParams.get("defense_spe")) : undefined,
    vitesse: searchParams.get("vitesse") ? Number(searchParams.get("vitesse")) : undefined,
  });// état pour les filtres de stats
  const [statMode, setStatMode] = useState(searchParams.get("statMode") !== "false");
  // synchronisation des états de filtrage avec les paramètres de l'URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedTypes.length > 0) params.set("types", selectedTypes.join(","));
    params.set("doubleType", String(doubleType));
    if (selectedRarete) params.set("rarete", selectedRarete);
    if (selectedGeneration) params.set("generation", String(selectedGeneration));
    if (statFilters.hp) params.set("hp", String(statFilters.hp));
    if (statFilters.attaque) params.set("attaque", String(statFilters.attaque));
    if (statFilters.defense) params.set("defense", String(statFilters.defense));
    if (statFilters.attaque_spe) params.set("attaque_spe", String(statFilters.attaque_spe));
    if (statFilters.defense_spe) params.set("defense_spe", String(statFilters.defense_spe));
    if (statFilters.vitesse) params.set("vitesse", String(statFilters.vitesse));
    params.set("statMode", String(statMode));// mise à jour des paramètres de l'URL
  
    setSearchParams(params);
  }, [search, selectedTypes, doubleType, selectedRarete, selectedGeneration, statFilters, statMode]);// synchronisation des paramètres de l'URL avec les états de filtrage
  

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3001/pokemon");
      const data = await res.json();
      setPokemons(data);
    }
    fetchData();
  }, []);// récupération des données des pokémons
  

  const allTypes = Array.from(
    new Set(pokemons.flatMap((p) => p.types))
  ).sort();// liste de tous les types de pokémon disponibles

  let filteredPokemons = pokemons.filter((p) => {
    const matchesSearch = p.nom.toLowerCase().includes(search.toLowerCase());
    const matchesTypes =
  selectedTypes.length === 0 ||
  (doubleType
    ? selectedTypes.every((t) => p.types.includes(t)) // ET
    : selectedTypes.some((t) => p.types.includes(t))  // OU
  );// filtre par nom et types

    return matchesSearch && matchesTypes;
  });// application des filtres

if (selectedRarete) {
  filteredPokemons = filteredPokemons.filter(p => p.rarete === selectedRarete);
}// filtre par rareté

if (selectedGeneration) {
  filteredPokemons = filteredPokemons.filter(p => p.generation === selectedGeneration);
}// filtre par génération

if (Object.values(statFilters).some((val) => val !== undefined)) {
  filteredPokemons = filteredPokemons.filter((p) => {
    if (statMode) {
      // Mode ET : Toutes les stats doivent correspondre
      return (
        (!statFilters.hp || (p.hp ?? 0) >= statFilters.hp) &&
        (!statFilters.attaque || (p.attaque ?? 0) >= statFilters.attaque) &&
        (!statFilters.defense || (p.defense ?? 0) >= statFilters.defense) &&
        (!statFilters.attaque_spe || (p.attaque_spe ?? 0) >= statFilters.attaque_spe) &&
        (!statFilters.defense_spe || (p.defense_spe ?? 0) >= statFilters.defense_spe) &&
        (!statFilters.vitesse || (p.vitesse ?? 0) >= statFilters.vitesse)
      );
    } else {
      // Mode OU : Au moins une stat doit correspondre
      return (
        (statFilters.hp && (p.hp ?? 0) >= statFilters.hp) ||
        (statFilters.attaque && (p.attaque ?? 0) >= statFilters.attaque) ||
        (statFilters.defense && (p.defense ?? 0) >= statFilters.defense) ||
        (statFilters.attaque_spe && (p.attaque_spe ?? 0) >= statFilters.attaque_spe) ||
        (statFilters.defense_spe && (p.defense_spe ?? 0) >= statFilters.defense_spe) ||
        (statFilters.vitesse && (p.vitesse ?? 0) >= statFilters.vitesse)
      );
    }// filtre par stats
  });}
  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type) 
        : [...prev, type] 
    );// fonction pour sélectionner/désélectionner un type

  }

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
      />{/* barre de recherche */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", justifyContent: "center" }}>
  {(["hp", "attaque", "defense", "attaque_spe", "defense_spe", "vitesse"] as StatKey[]).map((stat) => (
    <div key={stat} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <label style={{ fontSize: "0.7rem", marginBottom: "0.2rem", textTransform: "uppercase" }}>
        {stat === "hp" ? "PV" :
         stat === "attaque" ? "ATTAQUE" :
         stat === "defense" ? "DÉFENSE" :
         stat === "attaque_spe" ? "ATTAQUE SPÉCIALE" :
         stat === "defense_spe" ? "DÉFENSE SPÉCIALE" :
         "VITESSE"}
      </label> {/* barre de recherche pour chaque stat */}
      <input
        type="number"
        min={0}
        style={{ width: "50px", padding: "2px 4px", borderRadius: "4px", textAlign: "center" }}
        value={statFilters[stat] || ""}
        onChange={(e) =>
          setStatFilters((prev) => ({
            ...prev,
            [stat]: e.target.value ? Number(e.target.value) : undefined,
          }))
        }
      />
    </div>
  ))}
</div>

<div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
    <input
      type="checkbox"
      checked={statMode}
      onChange={() => setStatMode(!statMode)}
    />
    <strong>{statMode ? "Stats combinées" : "Au moins une stat"}</strong>
  </label>
</div>{/* toggle pour le mode des stats */}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", gap: "0.5rem" }}>
  <label>
    Génération :
    <select
      value={selectedGeneration || ""}
      onChange={(e) => setSelectedGeneration(e.target.value ? Number(e.target.value) : null)}
      style={{ marginLeft: "0.5rem", padding: "0.3rem 0.5rem", borderRadius: "4px" }}
    >
      <option value="">Toutes</option>
      {Array.from(new Set(pokemons.map(p => p.generation))).sort().map(g => (
        <option key={g} value={g}>{g}</option>
      ))}
    </select>
  </label>
</div>{/* filtre par génération */}

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
  <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
    <input
      type="checkbox"
      checked={doubleType}
      onChange={() => setDoubleType(!doubleType)}
    />
    <strong>{doubleType ? "Double Type" : "Au moins un type"}</strong>
  </label>
</div>{/* toggle pour double type */}

      <div
        style={{
          display: "grid",
          flexWrap: "wrap",
          gridTemplateColumns: "repeat(9, max-content)",
          justifyContent: "center",
          gap: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        {allTypes.map((t) => (
          <button
            key={t}
            onClick={() => toggleType(t)}
            style={{
              background: couleurType[t],
              color: ["Sol", "Électrik", "Glace", "Plante", "Normal", "Acier"].includes(t) ? "black" : "white",
              border: selectedTypes.includes(t) ? "3px solid #fff" : "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              boxSizing: "border-box",
              width: "100px",
              textAlign: "center"
            }}
          >
            {t}
          </button>
        ))}{/* boutons pour chaque type de pokémon */}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, max-content)", justifyContent: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
  {Object.keys(couleurRarete).map((r) => (
    <button
      key={r}
      onClick={() => setSelectedRarete(selectedRarete === r ? null : r)}
      style={{
        background: couleurRarete[r],
        color: ["Légendaire", "Fabuleux", "Fossile", "Starter"].includes(r) ? "black" : "white",
        border: selectedRarete === r ? "3px solid #fff" : "none",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      {r}
    </button>
  ))}{/* boutons pour chaque rareté de pokémon */}
</div>
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
          const mainType = (pokemon.types && pokemon.types.length > 0) ? pokemon.types[0] : "Normal";{/* type principal pour le dégradé de fond et l'ordre des types sur la carte */}

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
                transition: "transform 0.3s ease, box-shadow 0.3s ease", 
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
            >{/* carte de chaque pokémon */}
              <Link to={`/pokemons/${pokemon.num_pokedex}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img src={pokemon.img_mini} alt={pokemon.nom} style={{ maxWidth: "100%", height: "auto", margin: "0 auto" }} />
                <p>{pokemon.num_pokedex}</p>
                <p
                  style={{
                    fontWeight: "bold",
                    color: couleurRarete[pokemon.rarete] || "white"
                  }}
                >
                  {pokemon.nom}
                </p>{/*couleur selon la rareté */}
        
                
                <div style={{ display: "flex", gap: "4px", justifyContent: "center" }}>
                  {(pokemon.types || []).map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: "2px 6px",
                        borderRadius: "6px",
                        background: couleurType[t],
                        color: ["Sol", "Électrik", "Glace", "Plante", "Normal", "Acier"].includes(t) ? "black" : "white",
                        fontSize: "0.7rem",
                      }}
                    >{/* badge de type */}
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
