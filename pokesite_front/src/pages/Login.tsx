import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.access_token);
            
            if (data.user && data.user.name) {
                console.log("Nom trouvé :", data.user.name);
                localStorage.setItem('userName', data.user.name);
            } else {
                console.error("ATTENTION : Pas de nom dans data.user !", data);
            }
            
            window.location.href = '/'; // <--- COMMENTE CETTE LIGNE TEMPORAIREMENT
        }}

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