import request from "supertest";
import app from "./server.js";

describe("Tests de sécurité et d'intégrité de l'API", () => {
  
  // Scénario 1 : Vérifier que la route détail fonctionne
  test("GET /pokemon/3 devrait retourner Florizarre avec ses talents", async () => {
    const res = await request(app).get("/pokemon/3");
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("nom");
    expect(Array.isArray(res.body.talents)).toBe(true);
  });

  // Scénario 2 : Test de sécurité (Injection SQL / ID invalide)
  test("GET /pokemon/invalide devrait retourner une erreur 404 ou 500 et ne pas crash", async () => {
    // On simule une tentative d'injection simple ou un ID qui n'existe pas
    const res = await request(app).get("/pokemon/999' OR '1'='1");
    
    // Ton serveur doit répondre proprement (pas de crash serveur)
    expect([400, 404, 500]).toContain(res.statusCode);
  });

  test("POST /pokemon devrait refuser des données invalides (stats négatives)", async () => {
    const newPokemon = {
      nom: "HackerMon",
      hp: -500, // Statistique impossible
      attaque: 9999,
      num_pokedex: 999
    };
  
    const res = await request(app)
      .post("/pokemon")
      .send(newPokemon);
  
    // On attend un code 400 (Bad Request) car les données sont illogiques
    expect(res.statusCode).toBe(400);
  });

  test("L'API doit renvoyer une erreur 500 propre si la BDD ne répond pas", async () => {
    // On simule une erreur de connexion ou on utilise un ID qui fait planter la requête
    const res = await request(app).get("/debug-server-error");
    
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("error", "Erreur serveur");
  });

});