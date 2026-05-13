import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Pokemon from "./pages/Pokemon";
import PokemonDetail from "./pages/PokemonDetail";
import Login from "./pages/Login";

// 1. Protection des routes
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

// 2. Le Header (Toujours visible)
const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <header style={{ 
      display: "flex", justifyContent: "space-between", alignItems: "center", 
      width: "100%", padding: "1rem 2rem", backgroundColor: "#000000", 
      borderBottom: "1px solid #ddd", boxSizing: "border-box", color: "white"
    }}>
      <h2 style={{ margin: 0, cursor: "pointer" }} onClick={() => navigate("/")}> Pokésite </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {token && (
          <>
            <span style={{ fontWeight: "bold" }}>{userName}</span>
            <button onClick={logout} style={{ padding: "0.5rem 1rem", cursor: "pointer", borderRadius: "8px", backgroundColor: "#ff4444", color: "white", border: "none" }}>
              Déconnexion
            </button>
          </> 
        )}
      </div>
    </header>
  );
};

// 3. Structure principale
export default function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const buttons = [
    { label: "Pokémons", path: "/pokemons" }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
  
      <main style={{ padding: "2rem", flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        <Routes>
          {/* --- PAGE D'ACCUEIL (Seulement les boutons) --- */}
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
            </PrivateRoute>
          } />
  
          {/* --- AUTRES PAGES --- */}
          <Route path="/pokemons" element={<PrivateRoute><Pokemon /></PrivateRoute>} />
          <Route path="/pokemons/:id" element={<PrivateRoute><PokemonDetail /></PrivateRoute>} />
          
          {/* Page Login */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}