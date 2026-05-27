import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { couleurType, couleurRarete } from "../parametres.ts";
import { useSearchParams } from "react-router-dom";

// Type pour les données d'un Pokémon, basé sur la structure de l'API.
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

// Type pour les clés de stats, utilisé pour le filtrage dynamique.
type StatKey = "hp" | "attaque" | "defense" | "attaque_spe" | "defense_spe" | "vitesse"; 

// Composant principal de la page d'affichage des Pokémon avec fonctionnalités de recherche et de filtrage.
export default function Pokemon() {
  // useSearchParams pour gérer les paramètres de l'URL, permettant de synchroniser les filtres avec l'URL pour une meilleure expérience utilisateur et partageabilité des liens.
  // useState pour gérer la liste des Pokémon, les critères de recherche et de filtrage.
  // Les différents états gèrent la recherche par nom, les types sélectionnés, le mode de filtrage des types (double type ou non), la rareté, la génération, les filtres de stats et le mode de filtrage des stats (ET ou OU).
  // La synchronisation des états de filtrage avec les paramètres de l'URL permet de maintenir l'état de l'application même lors du rafraîchissement de la page ou du partage du lien.
  // useEffect pour récupérer les données des Pokémon depuis l'API au chargement du composant. Les données sont ensuite stockées dans l'état "pokemons".
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.get("types")?.split(",") || []);
  const [doubleType, setDoubleType] = useState(searchParams.get("doubleType") === "true");
  const [selectedRarete, setSelectedRarete] = useState(searchParams.get("rarete") || null);
  const [selectedGeneration, setSelectedGeneration] = useState(searchParams.get("generation") ? Number(searchParams.get("generation")) : null);
  const [statFilters, setStatFilters] = useState<{ [key in StatKey]?: number }>({
    hp: searchParams.get("hp") ? Number(searchParams.get("hp")) : undefined,
    attaque: searchParams.get("attaque") ? Number(searchParams.get("attaque")) : undefined,
    defense: searchParams.get("defense") ? Number(searchParams.get("defense")) : undefined,
    attaque_spe: searchParams.get("attaque_spe") ? Number(searchParams.get("attaque_spe")) : undefined,
    defense_spe: searchParams.get("defense_spe") ? Number(searchParams.get("defense_spe")) : undefined,
    vitesse: searchParams.get("vitesse") ? Number(searchParams.get("vitesse")) : undefined,
  });
  const [statMode, setStatMode] = useState(searchParams.get("statMode") !== "false");
  // useEffect pour synchroniser les paramètres de l'URL avec les états de filtrage. 
  // Chaque fois qu'un critère de filtrage change, les paramètres de l'URL sont mis à jour en conséquence, 
  // permettant ainsi de conserver l'état de l'application dans l'URL.
  useEffect(() => {
    // Construction des paramètres de l'URL en fonction des états de filtrage. 
    // Seuls les critères actifs sont ajoutés à l'URL pour éviter les paramètres inutiles.
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
    // Le tableau de dépendances inclut tous les critères de filtrage pour s'assurer que l'URL est mise à jour
    //  à chaque changement de ces critères.
  }, [search, selectedTypes, doubleType, selectedRarete, selectedGeneration, statFilters, statMode]);

  // useEffect pour récupérer les données des Pokémon depuis l'API au chargement du composant. 
  // La fonction fetchData est définie à l'intérieur de useEffect pour éviter les 
  // problèmes de dépendances et pour s'assurer qu'elle n'est pas recréée à chaque rendu.
  useEffect(() => {
    async function fetchData() {
      const url = import.meta.env.VITE_API_URL;
      const res = await fetch(`${url}/pokemon`);
      const data = await res.json();
      setPokemons(data);
    }
    fetchData();
  }, []);
  
  // Extraction de la liste de tous les types de Pokémon disponibles à partir des données récupérées,
  // en utilisant un Set pour éviter les doublons, puis triés par ordre alphabétique pour un affichage plus agréable.
  const allTypes = Array.from(
    new Set(pokemons.flatMap((p) => p.types))
  ).sort();

  // Application des différents filtres sur la liste des Pokémon.
  let filteredPokemons = pokemons.filter((p) => {
    // Le filtre de recherche par nom est insensible à la casse et vérifie si le nom du Pokémon contient la chaîne de recherche.
    const matchesSearch = p.nom.toLowerCase().includes(search.toLowerCase());
    const matchesTypes =
    selectedTypes.length === 0 ||
    (doubleType
      ? selectedTypes.every((t) => p.types.includes(t)) // ET
      : selectedTypes.some((t) => p.types.includes(t))  // OU
    );// filtre par types, avec gestion du mode double type (ET) ou simple type (OU). 
    // Si aucun type n'est sélectionné, tous les Pokémon passent le filtre.

    return matchesSearch && matchesTypes; // application des filtres de recherche et de types
  });

  // Application des filtres de rareté, de génération et de stats uniquement si les critères correspondants sont définis.
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

    // Fonction pour gérer la sélection/désélection des types de Pokémon.
    const toggleType = (type: string) => {
      setSelectedTypes((prev) =>
        prev.includes(type)
          ? prev.filter((t) => t !== type) 
          : [...prev, type] 
      );

    }

  // Rendu du composant avec les différentes sections :
  // barre de recherche, filtres de types, rareté, génération, stats, et la liste des Pokémon filtrés.
  return (
    
    <div style={{ display: "flex", flexDirection: "column", marginTop: "2rem", marginBottom: "2rem" }}>
      
      {/* Section de recherche et de filtrage */}
      {/* La page d'affichage des Pokémon comporte une barre de recherche pour 
      filtrer les Pokémon par nom, ainsi que des filtres pour les types, la rareté, la génération et les statistiques. */}
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
            {/* Les filtres de statistiques sont clairement
            étiquetés et permettre à l'utilisateur de comprendre facilement quel critère il est en train de filtrer. */}
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
      
      {/* Les filtres de types et de rareté sont représentés sous
      forme de boutons ou de sélecteurs clairement identifiables, avec une indication visuelle du critère sélectionné. */}
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
          {/* Filtre de types : Les utilisateurs peuvent sélectionner un ou plusieurs types de Pokémon pour filtrer les résultats.
          Les types sont affichés sous forme de boutons colorés, avec une indication visuelle du type sélectionné. */}
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
        
        {/* Filtre de rareté : Les utilisateurs peuvent sélectionner la rareté des Pokémon pour affiner les résultats.
          Les raretés sont affichées sous forme de boutons colorés, avec une indication visuelle de la rareté sélectionnée. */}
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

        {/* Affichage de la liste des Pokémon filtrés. 
        Chaque Pokémon est présenté dans une carte avec son image, son nom, son numéro de Pokédex,
        ses types et sa rareté. Le fond de chaque carte est un dégradé basé sur le type principal du Pokémon, 
        et la rareté est indiquée par une couleur spécifique. */}
        {filteredPokemons.map((pokemon) => {
          const mainType = (pokemon.types && pokemon.types.length > 0) ? pokemon.types[0] : "Normal";{/* type principal pour le dégradé de fond et l'ordre des types sur la carte */}

          {/* Chaque carte de Pokémon a un lien cliquable qui mène à une page de détails spécifique à ce Pokémon. */}
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
                {/* Les cartes de Pokémon ont un effet de survol qui les fait légèrement grandir et ajoute une ombre plus prononcée pour indiquer qu'elles sont interactives. */}
              }} 
            >{/* Carte de chaque pokémon
              Link cliquable qui mène à la page de détails du Pokémon */}
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
                    >{/* Types du Pokémon affichés dans des badges colorés selon le type, 
                      avec une couleur de texte adaptée pour assurer une bonne lisibilité. */}
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
