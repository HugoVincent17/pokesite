const Header = () => {
    const token = localStorage.getItem('token');

    const logout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    };

    return (
        <nav>
            <h1>PokéSite</h1>
            {token ? (
                <button onClick={logout}>Déconnexion</button>
            ) : (
                <a href="/login">Connexion</a>
            )}
        </nav>
    );
};