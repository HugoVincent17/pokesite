import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/pages/Login';
import '@testing-library/jest-dom';

// 1. On crée une fonction espionne (mock) pour le navigate
const mockNavigate = vi.fn();

// 2. On mock tout le module react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate, // On remplace le vrai hook par notre espion
    };
});

describe('Page de Login', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // On remet l'espion à zéro entre chaque test
        vi.stubGlobal('fetch', vi.fn());
        vi.stubGlobal('localStorage', {
            setItem: vi.fn(),
            getItem: vi.fn(),
        });
    });

    it('doit connecter l\'utilisateur et naviguer vers l\'accueil en cas de succès', async () => {
        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => ({
                access_token: 'mon-super-token',
                user: { name: 'Sacha', is_admin: 1 }
            }),
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByPlaceholderText(/votre@email.com/i), {
            target: { value: 'sacha@pokedex.com' }
        });
        fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
            target: { value: 'password123' }
        });

        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

        await waitFor(() => {
            // Vérification du localStorage
            expect(localStorage.setItem).toHaveBeenCalledWith('token', 'mon-super-token');
            
            // ✅ Vérification de la navigation via le hook
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('affiche une erreur si le serveur renvoie une erreur', async () => {
        (fetch as any).mockResolvedValue({
            ok: false,
            json: async () => ({ message: 'Identifiants incorrects' }),
        });

        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

        await waitFor(() => {
            expect(screen.getByText(/Identifiants incorrects/i)).toBeInTheDocument();
            // On vérifie qu'on n'a PAS navigué
            expect(mockNavigate).not.toHaveBeenCalled();
        });
    });

    it('redirige vers la page register au clic sur le lien', () => {
    render(
        <BrowserRouter>
            <Login />
        </BrowserRouter>
    );

    const registerLink = screen.getByText(/Créer un profil/i);
    fireEvent.click(registerLink);

    expect(mockNavigate).toHaveBeenCalledWith('/register');
});

it('envoie les bonnes données JSON au serveur', async () => {
    render(<BrowserRouter><Login /></BrowserRouter>);
    
    fireEvent.change(screen.getByPlaceholderText(/votre@email.com/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    await waitFor(() => {
        const url = import.meta.env.VITE_API_URL;
        expect(fetch).toHaveBeenCalledWith(
            `${url}/login`,
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ email: 'test@test.com', password: 'password' })
            })
        );
    });
});

it('affiche un message générique en cas de crash réseau', async () => {
    (fetch as any).mockRejectedValue(new Error('Network Error'));

    render(<BrowserRouter><Login /></BrowserRouter>);
    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    await waitFor(() => {
        expect(screen.getByText(/Erreur de connexion/i)).toBeInTheDocument();
    });
});
});