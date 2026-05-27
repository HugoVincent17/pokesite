import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

// Page de connexion pour les utilisateurs existants
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Fonction de soumission du formulaire de connexion
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = import.meta.env.VITE_API_URL || "http://localhost:8000/api"; 
            const response = await fetch(`${url}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
          });
          
          // On attend la réponse du serveur et on la parse en JSON
          const data = await response.json();
          console.log("Réponse complète de Laravel :", data);
          
          // Si la connexion est réussie, on stocke le token et les infos utilisateur dans le localStorage
          if (response.ok) {
            // On stocke le token et le nom
            
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('userName', data.user.name);
      
            // On vérifie ce que renvoie Laravel
            // Laravel doit renvoyer un champ "is_admin" dans l'objet user pour indiquer si l'utilisateur est admin ou non.
            const isAdminValue = data.user.is_admin ? "true" : "false";
            localStorage.setItem('isAdmin', isAdminValue);
      
            // Redirection une fois connecté
            navigate('/');
          } else {
            setError(data.message);
          }
        } catch (err) {
          setError("Erreur de connexion");
        }
    };

        // La page de connexion est accessible à tous les visiteurs non authentifiés.
        // Si un utilisateur authentifié tente d'accéder à cette page, il devrait être redirigé vers la page d'accueil (cette logique est gérée dans App.tsx avec les routes).
        return (
            <div style={{ 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center", 
                justifyContent: "center", 
                minHeight: "80vh" 
            }}>
                <form 
                // Le formulaire de connexion est centré sur la page et comporte des champs pour l'email et le mot de passe, ainsi qu'un bouton de soumission clairement identifiable.
                    onSubmit={handleSubmit} 
                    style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "1.5rem",           
                        width: "100%", 
                        maxWidth: "400px", 
                        padding: "2rem",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        backgroundColor: "#000000",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                    }}
                >
                    {/* Titre de la page de connexion avec une typographie claire et un contraste élevé pour une bonne lisibilité. */}
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
                    
                    {/* Le champ de mot de passe doit masquer les caractères saisis pour des raisons de sécurité, et être clairement identifié comme tel. */}
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

                    {/* Lien vers la page d'inscription pour les utilisateurs qui n'ont pas encore de compte, avec une incitation claire à l'action. */}
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