import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Pokemon from "./pages/Pokemon";
import PokemonDetail from "./pages/PokemonDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";


/**
* COMPOSANT DE SÉCURITÉ : ROUTE PRIVÉE 
* 
* Ce composant sert de barrière de sécurité sur le Front-end.
* Il intercepte l'accès aux pages protégées et vérifie la présence du jeton d'authentification.
* 
* - Si le token existe : L'accès est validé et les composants enfants (children) sont affichés.
* - Si le token est absent : L'utilisateur est redirigé vers la page de Login via <Navigate />.
*/
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};



/**
* COMPOSANT HEADER
* 
* Présent sur l'ensemble du site. Il gère dynamiquement l'affichage de l'identité 
* de l'utilisateur, les raccourcis d'administration et la procédure de déconnexion.
*/
const Header = () => {
  // Récupération des données d'authentification et de rôle depuis le localStorage
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  const isAdmin = localStorage.getItem('isAdmin') === "true"; 

// RÈGLE MÉTIER : Cast du stockage local en booléen pour l'affichage conditionnel du bouton Admin. 
// (Le token est une string, mais isAdmin doit être traité comme un booléen)
  const logout = async () => {
    // On prévient le serveur de la déconnexion pour que le Log::create puisse enregistrer l'action
    // On récupère le token pour l'inclure dans la requête de déconnexion
    const token = localStorage.getItem('token');
  
    if (token) {
      try {
        //On prévient le serveur (ça va déclencher le Log::create dans Laravel)
        // On envoie une requête POST à l'endpoint de déconnexion du serveur
        const url = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        await fetch(`${url}/logout`, {
          method: 'POST',
          // On inclut le token dans les headers pour que le serveur puisse identifier l'utilisateur qui se déconnecte
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        // En cas d'erreur (ex: serveur HS), on log l'erreur mais on continue quand même la procédure de déconnexion côté client
        console.error("Erreur lors de la déconnexion côté serveur", error);
      }
    }
  
    // On nettoie le localStorage pour supprimer les données d'authentification et de rôle
    localStorage.clear();
    // On redirige l'utilisateur vers la page de login après la déconnexion
    window.location.href = '/login';
  };

  
  // RÈGLE MÉTIER : Affichage conditionnel du bouton Admin uniquement pour les utilisateurs avec isAdmin=true
  return (
    // Le header est un composant global qui s'adapte dynamiquement en fonction de l'état d'authentification et du rôle de l'utilisateur
    <header style={{ 
      display: "flex", justifyContent: "space-between", alignItems: "center", 
      width: "100%", padding: "1rem 2rem", backgroundColor: "#000000", 
      borderBottom: "1px solid #ddd", boxSizing: "border-box", color: "white"
    }}>
      {/* Le titre du site est cliquable et redirige vers la page d'accueil */}
      <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}> Pokésite </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {token && (
          <>
          {/* BOUTON ADMIN : Apparaît uniquement si isAdmin est vrai */}
          {isAdmin && ( 
              <button 
                onClick={() => navigate("/admin")}
                style={{ backgroundColor: "gold", marginRight: "10px", fontWeight: "bold" }}
              >
              Admin
              </button>
            )}
            <span style={{ fontWeight: "bold" }}>{userName}</span>
            {/* BOUTON DE DÉCONNEXION : Apparaît uniquement si l'utilisateur est connecté (token présent) */}
            <button onClick={logout} style={{ padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "8px", backgroundColor: "#ff4444", color: "white", border: "none" }}>
              Déconnexion
            </button>
          </> 
        )}
      </div>
    </header>
  );
};



// COMPOSANT PRINCIPAL DE L'APPLICATION
export default function App() {

  const navigate = useNavigate();

  // RÈGLE MÉTIER : Définition d'une liste de boutons de navigation pour la page d'accueil. 
  // Le bouton Admin est géré séparément dans le Header pour un affichage conditionnel plus clair.
  const buttons = [
    { label: "Pokémons", path: "/pokemons" }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Le Header est un composant global qui s'adapte dynamiquement en fonction de l'état d'authentification et du rôle de l'utilisateur */}
      <Header />
  
      <main style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/" element={
      
            <PrivateRoute>
              <div style={{ textAlign: "center" }}>
                <h1>Bienvenue sur le Pokésite</h1>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginTop: "2rem" }}>
                  {buttons.map((btn) => (
                    <button 
                      key={btn.label} 
                      onClick={() => navigate(btn.path)} 
                      style={{ padding: "1.5rem 2.5rem", fontSize: "1.2rem", borderRadius: "12px", cursor: "pointer", border: "1px solid #ccc", backgroundColor: "#000000" }}
                    >
                      {btn.label}
                    </button>
                  ))}
                
  
                </div>
              </div>
            </PrivateRoute>  // La page d'accueil est protégée par une route privée, accessible uniquement aux utilisateurs authentifiés.
          } />
  
          {/* --- AUTRES PAGES --- */}
          {/* Les pages Pokémon et Admin sont protégées par des routes privées. 
              La page Admin a une vérification supplémentaire pour s'assurer que seul les utilisateurs avec isAdmin=true peuvent y accéder. */}
          <Route path="/pokemons" element={<PrivateRoute><Pokemon /></PrivateRoute>} />
          <Route path="/pokemons/:id" element={<PrivateRoute><PokemonDetail /></PrivateRoute>} />
          <Route 
            path="/admin" 
            element={
              <PrivateRoute>
                {localStorage.getItem('isAdmin') === "true" ? (
                <Admin/> 
              ) : (
                <Navigate to="/"/>
              )}
                
              </PrivateRoute>
            } 
          />
          {/* Page Login */}
          <Route path="/login" element={<Login />} />
          {/* Page Register */}
          <Route path="/register" element={<Register />} /> 
          {/* Page Pokemon */}
          <Route path="/pokemons" element={<PrivateRoute><Pokemon /></PrivateRoute>} />
                </Routes>
              </main>
            </div>
  );
}