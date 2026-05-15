import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import '@testing-library/jest-dom';

// On mock les composants de page pour ne pas charger toute la logique complexe de PokemonDetail, etc.
vi.mock('./pages/Pokemon', () => ({ default: () => <div>Page Pokemon</div> }));
vi.mock('./pages/Admin', () => ({ default: () => <div>Page Admin</div> }));
vi.mock('./pages/Login', () => ({
  default: () => <div data-testid="login-page">Page Login</div>
}));

describe('Structure Globale App (Sécurité & Routes)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Mock de window.location.href
    delete (window as any).location;
    window.location = { href: '' } as any;
  });

  it('redirige vers /login si aucun token n\'est présent (PrivateRoute)', async () => {
  // On s'assure que le localStorage est VIDE avant de commencer
  localStorage.clear();

  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // On attend que le changement de route se fasse
  await waitFor(() => {
    // On cherche soit ton TestId de mock, soit un texte du vrai composant Login
    const loginTitle = screen.queryByText(/Connexion/i) || 
                       screen.queryByTestId('login-page') ||
                       screen.queryByText(/Connectez-vous/i);
                       
    expect(loginTitle).toBeInTheDocument();
  }, { timeout: 2000 });
});

  it('affiche le bouton Admin uniquement si l\'utilisateur possède le flag isAdmin', () => {
    // Simulation d'un utilisateur Admin connecté
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('userName', 'Sacha');
    localStorage.setItem('isAdmin', 'true');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /🛠️ Admin/i })).toBeInTheDocument();
  });

  it('cache le bouton Admin pour un utilisateur normal', () => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('userName', 'Ondine');
    localStorage.setItem('isAdmin', 'false');

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.queryByRole('button', { name: /🛠️ Admin/i })).not.toBeInTheDocument();
  });

  it('exécute la procédure de déconnexion sécurisée (Logout)', async () => {
    localStorage.setItem('token', 'token-to-delete');
    localStorage.setItem('userName', 'Sacha');
    
    // 1. Créer d'abord l'espion (le spy)
    const mockFetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    // 2. L'injecter globalement
    vi.stubGlobal('fetch', mockFetch);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const logoutBtn = screen.getByRole('button', { name: /Déconnexion/i });
    fireEvent.click(logoutBtn);

    // 3. Maintenant on peut vérifier si l'espion a été appelé
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/logout'),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Authorization': 'Bearer token-to-delete'
        })
      })
    );

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(window.location.href).toBe('/login');
    });
  });

  it('bloque l\'accès direct à /admin pour un utilisateur connecté mais non-admin', async () => {
  // Utilisateur connecté (token présent) mais simple membre (isAdmin false)
  localStorage.setItem('token', 'valid-user-token');
  localStorage.setItem('isAdmin', 'false');

  render(
    <MemoryRouter initialEntries={['/admin']}>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    // 1. On ne doit PAS voir la page Admin
    expect(screen.queryByText(/Page Admin/i)).not.toBeInTheDocument();
    // 2. On doit être redirigé vers l'accueil (Bienvenue...)
    expect(screen.getByText(/Bienvenue sur le Pokésite/i)).toBeInTheDocument();
  });
});

it('met à jour les informations du Header lors d\'un changement d\'utilisateur', () => {
  // Premier utilisateur
  localStorage.setItem('token', 'token-1');
  localStorage.setItem('userName', 'Sacha');
  const { rerender } = render(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getByText('Sacha')).toBeInTheDocument();

  // On simule une reconnexion (changement de localStorage)
  localStorage.setItem('token', 'token-2');
  localStorage.setItem('userName', 'Régis');

  // On force le rerender pour simuler la mise à jour globale de l'App
  rerender(<MemoryRouter><App /></MemoryRouter>);
  expect(screen.getByText('Régis')).toBeInTheDocument();
  expect(screen.queryByText('Sacha')).not.toBeInTheDocument();
});
});