import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = await mysql.createConnection({
  host: "localhost",
  user: "hugo",
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
        p.rarete,
        t.nom AS nom_type
        FROM pokemon p
        LEFT JOIN posseder po ON p.num_pokedex = po.num_pokedex
        LEFT JOIN types t ON t.id_type = po.id_type
        ORDER BY p.num_pokedex, po.type_ordre;
    `);

    const grouped = {};
    
    for (const row of rows) {
      if (!grouped[row.num_pokedex]) {
        grouped[row.num_pokedex] = {
          num_pokedex: row.num_pokedex,
          nom: row.nom,
          img_mini: row.img_mini,
          rarete : row.rarete,
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
    const [rows] = await db.query(
      `SELECT p.num_pokedex, p.nom, p.img, p.img_shiny, p.hp,
       p.attaque, p.defense, p.attaque_spe, p.defense_spe, 
       p.vitesse, p.rarete, t.nom AS nom_type
       FROM pokemon p
       LEFT JOIN posseder po ON p.num_pokedex = po.num_pokedex
       LEFT JOIN types t ON t.id_type = po.id_type
       WHERE p.num_pokedex = ?
       ORDER BY po.type_ordre`,
      [req.params.id]
    );

    if (!rows.length) return res.status(404).json({ error: "Introuvable" });

    // Regrouper les types
    const types = rows.map(r => r.nom_type).filter(Boolean);

    const pokemon = {
      num_pokedex: rows[0].num_pokedex,
      nom: rows[0].nom,
      img: rows[0].img,
      img_shiny: rows[0].img_shiny,
      hp: rows[0].hp,
      attaque: rows[0].attaque,
      defense: rows[0].defense,
      attaque_spe: rows[0].attaque_spe,
      defense_spe: rows[0].defense_spe,
      vitesse: rows[0].vitesse,
      rarete: rows[0].rarete,
      types
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

app.listen(3001, () => {
  console.log("✅ API en ligne sur http://localhost:3001");
});
