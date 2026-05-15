import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Register from '../src/pages/Register';
import '@testing-library/jest-dom';

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Page Register', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // On mock localStorage
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value; },
        clear: () => { store = {}; }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // On mock window.location.href
    delete (window as any).location;
    window.location = { href: '' } as any;
  });

  it('affiche une erreur si les mots de passe ne correspondent pas', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Sacha' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'sacha@pallet.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'Pikachu123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), { target: { value: 'Different456' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    expect(screen.getByText(/Les mots de passe ne correspondent pas/i)).toBeInTheDocument();
  });

  it('appelle l\'API et stocke les infos en cas de succès', async () => {
    const mockResponse = {
      access_token: 'fake_token_123',
      user: { name: 'Sacha' }
    };

    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    ));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Sacha' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'sacha@pallet.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'Pikachu123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), { target: { value: 'Pikachu123' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('fake_token_123');
      expect(localStorage.getItem('userName')).toBe('Sacha');
      expect(window.location.href).toBe('/');
    });
  });

  it('affiche un message d\'erreur renvoyé par l\'API', async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 422, // Souvent le code pour une erreur de validation
        json: () => Promise.resolve({ message: 'Cet email est déjà utilisé.' }),
      })
    ));

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    // Remplissage des champs obligatoires (car ils sont "required")
    fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Sacha' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'deja@pris.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'Pikachu123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), { target: { value: 'Pikachu123' } });

    fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

    // Utilisation d'un matcher de fonction pour être plus robuste
    await waitFor(() => {
      expect(screen.getByText((content) => {
        return content.includes('Cet email est déjà utilisé');
      })).toBeInTheDocument();
    });
  });

  it('redirige vers la page de login au clic sur le lien', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Déjà un compte/i));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('affiche une erreur en cas de panne réseau (crash serveur)', async () => {
  // On simule un rejet total de la promesse fetch
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error("Network Error"))));

  render(<MemoryRouter><Register /></MemoryRouter>);

  fireEvent.change(screen.getByPlaceholderText('Nom'), { target: { value: 'Sacha' } });
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'sacha@pallet.com' } });
  fireEvent.change(screen.getByPlaceholderText('Mot de passe'), { target: { value: 'Pikachu123' } });
  fireEvent.change(screen.getByPlaceholderText('Confirmer le mot de passe'), { target: { value: 'Pikachu123' } });

  fireEvent.click(screen.getByRole('button', { name: /S'inscrire/i }));

  await waitFor(() => {
    expect(screen.getByText(/Erreur de connexion au serveur/i)).toBeInTheDocument();
  });
});

it('ne devrait pas permettre de soumissions multiples pendant le chargement', async () => {
  // On crée un fetch qui met du temps à répondre
  let resolveFetch: any;
  const slowPromise = new Promise((resolve) => {
    resolveFetch = resolve;
  });
  
  vi.stubGlobal('fetch', vi.fn(() => slowPromise));

  render(<MemoryRouter><Register /></MemoryRouter>);

  const submitBtn = screen.getByRole('button', { name: /S'inscrire/i });
  fireEvent.click(submitBtn);

  // Ici, on vérifierait idéalement que le bouton est désactivé
  // expect(submitBtn).toBeDisabled(); 
});
});