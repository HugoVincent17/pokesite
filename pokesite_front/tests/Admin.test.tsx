import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Admin from '../src/pages/Admin';
import '@testing-library/jest-dom';

describe('Page Admin', () => {
    // Avant chaque test, on simule le localStorage et le fetch
    beforeEach(() => {
        vi.stubGlobal('localStorage', {
            getItem: vi.fn().mockReturnValue('fake-token-123'),
        });

        // On simule la réponse de l'API (Mock Fetch)
        vi.stubGlobal('fetch', vi.fn());
    });

    it('affiche le message de chargement par défaut (aucun log)', async () => {
        // On simule une réponse vide
        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => [],
        });

        render(<Admin />);
        
        expect(screen.getByText(/Aucun log trouvé/i)).toBeInTheDocument();
    });

    it('affiche la liste des logs quand l\'API répond positivement', async () => {
        // On simule une réponse avec des données
        const mockLogs = [
            { id: 1, created_at: '2026-05-15T10:00:00Z', user_name: 'Red', action: 'A capturé Pikachu' },
            { id: 2, created_at: '2026-05-15T11:00:00Z', user_name: 'Blue', action: 'A perdu un combat' }
        ];

        (fetch as any).mockResolvedValue({
            ok: true,
            json: async () => mockLogs,
        });

        render(<Admin />);

        // waitFor est crucial car fetch est asynchrone
        await waitFor(() => {
            expect(screen.getByText('Red')).toBeInTheDocument();
            expect(screen.getByText('A capturé Pikachu')).toBeInTheDocument();
            expect(screen.getByText('Blue')).toBeInTheDocument();
        });
    });

    it('gère l\'erreur serveur proprement', async () => {
    // On simule une erreur réseau
    (fetch as any).mockRejectedValue(new Error("Serveur HS"));
    
    // On espionne la console pour voir si l'erreur y est logguée
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(<Admin />);

    await waitFor(() => {
        expect(spy).toHaveBeenCalledWith("Erreur lors de la récupération des logs", expect.any(Error));
    });
    
    spy.mockRestore();
});

it('envoie le bon token d\'autorisation dans la requête', async () => {
    render(<Admin />);

    await waitFor(() => {
        // On vérifie les arguments du premier appel de fetch
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining('/api/admin/logs'),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer fake-token-123'
                })
            })
        );
    });
});

it('envoie le token correct dans les headers de la requête', async () => {
    render(<Admin />);
    await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: expect.objectContaining({
                    'Authorization': 'Bearer fake-token-123'
                })
            })
        );
    });
});
});