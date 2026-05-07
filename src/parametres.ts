export const couleurRarete: { [key: string]: string } = {
    Légendaire: "#FFBF2A",     // vrai or
    Fabuleux: "#BB86FC",      // violet clair
    Surpuissant: "#FF7500",    // orange “jeune”, moins saturé
    Starter: "#00FF00",       // vert vif
    Fossile: "#D2B48C" ,       // marron clair
    Chimère: "#FF2C00",      // rouge vif
    Paradoxe: "#009999",     // cyan
  };

  export const couleurType: { [key: string]: string } = {
    Plante: "#55D944",
    Feu: "#FF3322",
    Eau: "#0099FF",
    Électrik: "#FFFF00", //
    Glace: "#51FFFF",
    Combat: "#FF6A00", 
    Poison: "#BF00FF", 
    Sol: "#E5B032", 
    Vol: "#A890F0",
    Psy: "#F85888",
    Insecte: "#A2C11C",
    Roche: "#9B7A01",
    Spectre: "#705898",
    Dragon: "#7038F8",
    Ténèbres: "#2F2F2F",
    Acier: "#FEEFDD",
    Fée: "#FF99CC",
    Normal: "#FFFFFF",
  };

// 2 = Super efficace, 0.5 = Pas très efficace, 0 = Immunité
export const tableTypes: { [key: string]: { [key: string]: number } } = {
  Acier: { Acier: 0.5, Eau: 0.5, Électrik: 0.5, Fée: 2, Feu: 0.5, Glace: 2, Roche: 2 },
  Combat: { Acier: 2, Glace: 2, Insecte: 0.5, Normal: 2, Poison: 0.5, Psy: 0.5, Roche: 2, Spectre: 0, Ténèbres: 2, Vol: 0.5, Fée: 0.5 },
  Dragon: { Acier: 0.5, Dragon: 2, Fée: 0 },
  Eau: { Dragon: 0.5, Eau: 0.5, Feu: 2, Plante: 0.5, Roche: 2, Sol: 2 },
  Électrik: { Dragon: 0.5, Eau: 2, Électrik: 0.5, Plante: 0.5, Sol: 0, Vol: 2 },
  Fée: { Combat: 2, Dragon: 2, Feu: 0.5, Poison: 0.5, Ténèbres: 2, Acier: 0.5 },
  Feu: { Acier: 2, Dragon: 0.5, Eau: 0.5, Feu: 0.5, Glace: 2, Insecte: 2, Plante: 2, Roche: 0.5 },
  Glace: { Acier: 0.5, Dragon: 2, Eau: 0.5, Feu: 0.5, Glace: 0.5, Plante: 2, Sol: 2, Vol: 2 },
  Insecte: { Combat: 0.5, Feu: 0.5, Poison: 0.5, Spectre: 0.5, Vol: 0.5, Acier: 0.5, Fée: 0.5, Plante: 2, Psy: 2, Ténèbres: 2 },
  Normal: { Acier: 0.5, Roche: 0.5, Spectre: 0 },
  Plante: { Acier: 0.5, Dragon: 0.5, Eau: 2, Feu: 0.5, Insecte: 0.5, Plante: 0.5, Poison: 0.5, Roche: 2, Sol: 2, Vol: 0.5 },
  Poison: { Plante: 2, Poison: 0.5, Roche: 0.5, Sol: 0.5, Spectre: 0.5, Acier: 0, Fée: 2 },
  Psy: { Combat: 2, Poison: 2, Psy: 0.5, Acier: 0.5, Ténèbres: 0 },
  Roche: { Acier: 0.5, Combat: 0.5, Feu: 2, Glace: 2, Insecte: 2, Sol: 0.5, Vol: 2 },
  Sol: { Acier: 2, Électrik: 2, Feu: 2, Insecte: 0.5, Plante: 0.5, Poison: 2, Roche: 2, Vol: 0 },
  Spectre: { Normal: 0, Psy: 2, Spectre: 2, Ténèbres: 0.5 },
  Ténèbres: { Combat: 0.5, Psy: 2, Spectre: 2, Ténèbres: 0.5, Fée: 0.5 },
  Vol: { Combat: 2, Électrik: 0.5, Insecte: 2, Plante: 2, Roche: 0.5, Acier: 0.5 },
};