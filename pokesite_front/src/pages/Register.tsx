import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Page d'inscription pour les nouveaux utilisateurs
const Register = () => {
    // useState pour gérer les champs du formulaire et les erreurs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    
    // Fonction de soumission du formulaire d'inscription
    const handleSubmit = async (e: React.FormEvent) => {
        // Prévention du comportement par défaut du formulaire (qui rechargerait la page)
        e.preventDefault();
        setError(null);
        // Vérification que les mots de passe correspondent avant d'envoyer la requête
        if (password !== passwordConfirmation) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const url = "http://localhost:8000/api"; 
            // Envoi d'une requête POST à l'API pour créer un nouvel utilisateur
            const response = await fetch(`${url}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password, 
                    password_confirmation: passwordConfirmation 
                })
            });
            // On attend la réponse du serveur et on la parse en JSON
            const data = await response.json();

            // Si la réponse est positive (201 Created), on stocke le token d'authentification et les infos utilisateur dans le localStorage
            // puis on redirige vers la page d'accueil. Sinon, on affiche le message d'erreur retourné par l'API.
            if (response.ok) {
                localStorage.setItem('token', data.access_token);
                localStorage.setItem('userName', data.user.name);
                window.location.href = '/';
            } else {
                // Si l'API retourne une erreur, on affiche le message d'erreur retourné par l'API
                setError(data.message || "Erreur lors de l'inscription.");
            }
        } catch (err) {
            // En cas d'erreur réseau ou autre, on affiche un message d'erreur générique
            setError("Erreur de connexion au serveur.");
        }
    };

    // La page d'inscription est accessible à tous les visiteurs non authentifiés.
    // Si un utilisateur authentifié tente d'accéder à cette page, il devrait être redirigé vers la page d'accueil (cette logique est gérée dans App.tsx avec les routes).
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
                <h2>Créer un compte</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                
                {/* Le formulaire d'inscription doit comporter les champs suivants : nom, email, mot de passe, confirmation du mot de passe. 
                    Tous les champs sont requis et doivent être validés côté client avant d'envoyer la requête à l'API. */}
                <input type="text" placeholder="Nom" onChange={e => setName(e.target.value)} required />
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirmer le mot de passe" onChange={e => setPasswordConfirmation(e.target.value)} required />
                {/* BOUTON DE SOUMISSION */}
                <button type="submit" style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px", cursor: "pointer" }}>
                    S'inscrire
                </button>
                {/* Lien vers la page de connexion pour les utilisateurs qui ont déjà un compte */}
                <p onClick={() => navigate('/login')} style={{ cursor: "pointer", fontSize: "0.8rem", textAlign: "center" }}>
                    Déjà un compte ? Connectez-vous
                </p>
            </form>
        </div>
    );
};

export default Register;