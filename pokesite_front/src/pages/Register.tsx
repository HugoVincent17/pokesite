import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== passwordConfirmation) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password, 
                    password_confirmation: passwordConfirmation 
                })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('userName', data.user.name);
                window.location.href = '/';
            } else {
                setError(data.message || "Erreur lors de l'inscription.");
            }
        } catch (err) {
            setError("Erreur de connexion au serveur.");
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
                <h2>Créer un compte</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                <input type="text" placeholder="Nom" onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirmer le mot de passe" onChange={e => setPasswordConfirmation(e.target.value)} required />
                
                <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", cursor: "pointer" }}>
                    S'inscrire
                </button>
                <p onClick={() => navigate('/login')} style={{ cursor: "pointer", fontSize: "0.8rem", textAlign: "center" }}>
                    Déjà un compte ? Connectez-vous
                </p>
            </form>
        </div>
    );
};

export default Register;