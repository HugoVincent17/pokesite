import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  const buttons = [
    { label: "Pokémons", path: "/pokemons" },
    { label: "Objets", path: "/objets" },
    { label: "Types", path: "/types" },
    { label: "Attaques", path: "/attaques" },
    { label: "Talents", path: "/talents" },
    { label: "Statuts", path: "/statuts" },
    { label: "Mécaniques", path: "/mecaniques" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2rem" }}>
      <h1>Bienvenue sur le Pokésite</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => navigate(btn.path)}
            style={{ padding: "1rem 2rem", fontSize: "1rem", borderRadius: "8px", cursor: "pointer" }}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

