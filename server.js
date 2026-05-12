import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();

app.get("/debug-server-error", (req, res) => {
  res.status(500).json({ error: "Erreur serveur" });
});

app.use(cors());
app.use(express.json());

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pokesite",
});

app.get("/pokemon", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        p.num_pokedex,
        p.nom,
        p.img_mini,
        p.generation,
        p.rarete,
        p.hp,
        p.attaque, p.defense, p.attaque_spe, p.defense_spe, 
        p.vitesse,
        p.taux_capture,
        t.nom AS nom_type
        FROM pokemon p
        LEFT JOIN posseder po ON p.num_pokedex = po.num_pokedex
        LEFT JOIN types t ON t.id_type = po.id_type
        ORDER BY p.num_pokedex, po.type_ordre;
    `);{/*route pour la page pokemon*/}

    const grouped = {};
    
    for (const row of rows) {
      if (!grouped[row.num_pokedex]) {
        grouped[row.num_pokedex] = {
          num_pokedex: row.num_pokedex,
          nom: row.nom,
          img_mini: row.img_mini,
          generation: row.generation,
          rarete : row.rarete,
          hp: row.hp,
          attaque: row.attaque,
          defense: row.defense,
          attaque_spe: row.attaque_spe,
          defense_spe: row.defense_spe,
          vitesse: row.vitesse,
          taux_capture: row.taux_capture,
          types: [],
        };
      }
      if (row.nom_type) {
        grouped[row.num_pokedex].types.push(row.nom_type);
      }
    }

    res.json(Object.values(grouped));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get("/pokemon/:id", async (req, res) => {
  try {
    const pokemonId = req.params.id;
    if (isNaN(pokemonId)) return res.status(400).json({ error: "ID invalide" });

    // PROTECTION : Si l'ID n'est pas un nombre, on s'arrête tout de suite
    if (isNaN(pokemonId)) {
      return res.status(400).json({ error: "L'identifiant doit être un nombre" });
    }

    // 1. On récupère le Pokémon et ses types
    const [rows] = await db.query(
      `SELECT p.*, t.nom AS nom_type
       FROM pokemon p
       LEFT JOIN posseder po ON p.num_pokedex = po.num_pokedex
       LEFT JOIN types t ON t.id_type = po.id_type
       WHERE p.num_pokedex = ?
       ORDER BY po.type_ordre`,
      [pokemonId]
    );

    if (!rows.length) return res.status(404).json({ error: "Introuvable" });

    // 2. NOUVEAU : On récupère les talents associés
    const [talentRows] = await db.query(
      `SELECT t.nom, t.description_talent
       FROM talents t
       JOIN detenir d ON t.id_talent = d.id_talent
       WHERE d.num_pokedex = ?`,
      [pokemonId]
    );

    // Regrouper les types (ton code actuel)
    const types = rows.map(r => r.nom_type).filter(Boolean);

    // Construire l'objet final
    const pokemon = {
      ...rows[0], // On récupère toutes les propriétés de base (hp, attaque, etc.)
      types,
      talents: talentRows // On ajoute le tableau des talents (nom + description)
    };

    res.json(pokemon);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


app.get("/", (req, res) => {
  res.send("API Pokédex en ligne");
});

app.post("/pokemon", async (req, res) => {
  const { nom, hp, attaque, num_pokedex } = req.body;

  // PROTECTION : Validation des données
  if (hp < 0 || attaque < 0) {
    return res.status(400).json({ error: "Les statistiques ne peuvent pas être négatives" });
  }

  // Ici tu mettrais ton INSERT INTO pokemon...
  res.status(201).json({ message: "Pokémon créé" });
});

// 3. Route spéciale pour tester l'erreur 500 (uniquement pour le test)
app.get("/pokemon/error-trigger", async (req, res) => {
    // On simule une erreur forcée
    res.status(500).json({ error: "Erreur serveur" });
});

app.listen(3001, () => {
  console.log("API en ligne sur http://localhost:3001");
});

export default app;