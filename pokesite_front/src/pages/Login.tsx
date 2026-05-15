import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
      
          const data = await response.json();
          console.log("Réponse complète de Laravel :", data);
      
          if (response.ok) {
            // 1. On stocke le token et le nom
            
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('userName', data.user.name);
      
            // 2. LA LIGNE CRUCIALE : On vérifie ce que renvoie Laravel
            // On utilise "is_admin" (le nom de la colonne en BDD)
            const isAdminValue = data.user.is_admin ? "true" : "false";
            localStorage.setItem('isAdmin', isAdminValue);
      
            // 3. Redirection
            navigate('/');
          } else {
            setError(data.message);
          }
        } catch (err) {
          setError("Erreur de connexion");
        }
      };

        return (
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                minHeight: "80vh" 
            }}>
                <form 
                    onSubmit={handleSubmit} 
                    style={{ 
                        display: "flex", 
                        flexDirection: "column", // C'est CA qui met les champs les uns sous les autres
                        gap: "1.5rem",           // Espace entre chaque champ
                        width: "100%", 
                        maxWidth: "400px", 
                        padding: "2rem",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        backgroundColor: "#000000",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                >
                    <h2 style={{ textAlign: "center", margin: 0, color: "#ffffff" }}>Connexion</h2>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: "bold" }}>Email</label>
                        <input 
                            type="email" 
                            placeholder="votre@email.com" 
                            onChange={e => setEmail(e.target.value)} 
                            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                    </div>
        
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: "bold" }}>Mot de passe</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            onChange={e => setPassword(e.target.value)} 
                            style={{ padding: "0.8rem", borderRadius: "6px", border: "1px solid #ccc" }}
                        />
                    </div>

                    {/* Affichage de l'alerte d'erreur */}
{error && (
    <div style={{ 
        backgroundColor: "#ffebee", 
        color: "#c62828", 
        padding: "0.8rem", 
        borderRadius: "6px", 
        marginBottom: "1rem",
        fontSize: "0.9rem",
        border: "1px solid #ef9a9a",
        textAlign: "center"
    }}>
        {error}
    </div>
)}

<p onClick={() => navigate('/register')} style={{ cursor: "pointer", marginTop: "1rem", color: "#666" }}>
    Pas encore de compte ? Créer un profil
</p>
        
                    <button 
                        type="submit" 
                        style={{ 
                            padding: "1rem", 
                            cursor: "pointer", 
                            borderRadius: "8px", 
                            backgroundColor: "#4CAF50", 
                            color: "white", 
                            border: "none",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            marginTop: "1rem"
                        }}
                    >
                        Se connecter
                    </button>
                </form>
            </div>
        );
};

export default Login;