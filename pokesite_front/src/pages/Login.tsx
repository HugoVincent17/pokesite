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
            window.location.href = '/'; // Redirige vers l'accueil
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Connexion dresseur</h2>
                <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;