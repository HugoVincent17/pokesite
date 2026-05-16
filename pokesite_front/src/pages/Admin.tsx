import { useEffect, useState } from 'react';

// Page d'administration accessible uniquement aux utilisateurs avec le rôle admin
const Admin = () => {
    // useState pour stocker les logs d'activité récupérés depuis l'API
    const [logs, setLogs] = useState([]);

    // useEffect pour récupérer les logs d'activité depuis l'API au chargement du composant
    useEffect(() => {
        // Fonction asynchrone pour récupérer les logs d'activité depuis l'API
        const fetchLogs = async () => {
            try {
                // Envoi d'une requête GET à l'API pour récupérer les logs d'activité, en incluant le token d'authentification dans les headers
                const response = await fetch('http://localhost:8000/api/admin/logs', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                
                // Si la réponse est positive, on parse les données en JSON et on les stocke dans le state "logs" pour les afficher 
                // dans la table. Sinon, on log une erreur.
                if (response.ok) {
                    const data = await response.json();
                    setLogs(data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des logs", error);
            }
        };

        // Appel de la fonction de récupération des logs d'activité au chargement du composant
        fetchLogs();
    }, []);

    return (
        <div style={{ padding: "20px", color: "white" }}>
            <h1 style={{ color: 'gold' }}>🛡️ Panneau d'Administration</h1>
            
            <div style={{ marginTop: '2rem', backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '12px' }}>
                <h3>Journal d'activités</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid gold', color: 'gold', textAlign: 'left' }}>
                            <th style={{ padding: '12px' }}>Date</th>
                            <th style={{ padding: '12px' }}>Utilisateur</th>
                            <th style={{ padding: '12px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.length > 0 ? (
                            logs.map((log: any) => (
                                <tr key={log.id} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '12px' }}>{new Date(log.created_at).toLocaleString()}</td>
                                    <td style={{ padding: '12px' }}>{log.user_name}</td>
                                    <td style={{ padding: '12px' }}>{log.action}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} style={{ padding: '20px', textAlign: 'center' }}>Aucun log trouvé</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Admin;