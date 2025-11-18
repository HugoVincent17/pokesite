import React, { useState } from "react";
import "./Combat.css";

export default function CombatPage() {
  const [difficulty, setDifficulty] = useState<string | null>(null);

  const clic = (action: string) => {
    alert(`Action sélectionnée : ${action}`);
  };

  const choisirDifficulte = (niveau: string) => {
    setDifficulty(niveau);
    alert(`Difficulté sélectionnée : ${niveau}`);
  };

  return (
    <div className="combat-menu">
      {/* Barre du haut avec Profil + Paramètres */}
      <div className="profil">
        <button className="bouton-profil" onClick={() => clic("Profil")}>
          👤 Profil
        </button>
        <div className="icone" onClick={() => clic("Paramètres")}>
          <FaCog size={28} />
        </div>
      </div>

      <h1>Combat</h1>

      {/* Section du menu principal */}
      <div className="menu">
        <button onClick={() => clic("Aller dans la boutique")}>🛒 Boutique</button>
        <button onClick={() => clic("Collection & Deck")}>📜 Collection & Deck</button>
        <button onClick={() => clic("Inventaire")}>🎒 Inventaire</button>
      </div>

      {/* Section difficulté */}
      <h2 style={{ marginTop: "30px" }}>Choisir la difficulté :</h2>
      <div className="menu">
        <button className="facile" onClick={() => choisirDifficulte("Facile")}>
          🌿 Facile
        </button>
        <button className="moyen" onClick={() => choisirDifficulte("Moyen")}>
          ⚡ Moyen
        </button>
        <button className="difficile" onClick={() => choisirDifficulte("Difficile")}>
          🔥 Difficile
        </button>
        <button className="maitre" onClick={() => choisirDifficulte("Maître")}>
          🐉 Maître
        </button>
      </div>

    </div>
  );
}
