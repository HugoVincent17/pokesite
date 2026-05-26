import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Désactive la signature Express (cache la techno utilisée)
app.disable('x-powered-by');

// Headers de sécurité
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
});

// Sert les fichiers statiques du dist
app.use(express.static(path.join(__dirname, 'dist'), {
    // Cache 1 jour pour les assets
    maxAge: '1d',
    // Interdit la navigation dans les dossiers
    index: false
}));

// Renvoie index.html pour le routing React
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Front sur http://localhost:${PORT}`));