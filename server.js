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

app.get("/pokemon/:id", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM pokemon WHERE num_pokedex = ?",
    [req.params.id]
  );

  if (!rows.length) return res.status(404).json({ error: "Introuvable" });

  res.json(rows[0]);
});

app.get("/pokemon", async (req, res) => {
    try {
      const rows = await db.query("SELECT * FROM pokemon ORDER BY num_pokedex");
      console.log("Résultat SQL :", rows); 
      res.json(rows);
    } catch (err) {
      console.error("Erreur requête SQL :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  app.get("/", (req, res) => {
    res.send("API Pokédex en ligne !");
  });

  app.get("/pokemon", async (req, res) => {
    try {
      const [rows] = await db.query(
        `SELECT p.num_pokedex, p.nom, p.img_mini, t.nom_type AS type
         FROM pokemon p
         JOIN pokemon_types pt ON p.num_pokedex = pt.num_pokedex
         JOIN types t ON pt.id_type = t.id_type
         WHERE pt.type_order = 1
         ORDER BY p.num_pokedex`
      );
      res.json(rows);
    } catch (err) {
      console.error("Erreur requête SQL :", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });

  

app.listen(3001, () => console.log("API en ligne : http://localhost:3001"));
