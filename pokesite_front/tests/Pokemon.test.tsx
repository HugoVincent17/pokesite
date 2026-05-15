import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pokemon from '../src/pages/Pokemon';
import '@testing-library/jest-dom';

// 1. Simulation des données de l'API (Mock Data)
const mockPokemons = [
  { 
    num_pokedex: 1, 
    nom: 'Bulbizarre',
    img: 'bulbizarre.png',
    img_mini: 'bulbizarre_mini.png',
    img_shiny: 'bulbizarre_shiny.png', 
    types: ['Plante', 'Poison'], 
    rarete: 'Starter', 
    generation: 1, 
    hp: 45, 
    attaque: 49, 
    defense: 49, 
    attaque_spe: 65, 
    defense_spe: 65, 
    vitesse: 45,
    taux_capture: 45
  },
  { 
    num_pokedex: 4, 
    nom: 'Salamèche',
    img: 'salameche.png',
    img_shiny: 'salameche_shiny.png', 
    img_mini: 'salameche_mini.png', 
    types: ['Feu'], 
    rarete: 'Starter', 
    generation: 1, 
    hp: 39, 
    attaque: 52, 
    defense: 43, 
    attaque_spe: 60, 
    defense_spe: 50, 
    vitesse: 65,
    taux_capture: 45
  },
  { 
    num_pokedex: 155, 
    nom: 'Héricendre', 
    img: 'hericendre.png',
    img_shiny: 'hericendre_shiny.png', 
    img_mini: 'hericendre_mini.png', 
    types: ['Feu'], 
    rarete: 'Starter', 
    generation: 2, 
    hp: 39, 
    attaque: 52, 
    defense: 43, 
    attaque_spe: 60, 
    defense_spe: 50, 
    vitesse: 65,
    taux_capture: 45  
  },
  { 
    num_pokedex: 150, 
    nom: 'Mewtwo', 
    img: 'mewtwo.png',
    img_shiny: 'mewtwo_shiny.png', 
    img_mini: 'mewtwo_mini.png', 
    types: ['Psy'], 
    rarete: 'Légendaire', 
    generation: 1, 
    hp: 106, 
    attaque: 110, 
    defense: 90, 
    attaque_spe: 154, 
    defense_spe: 90, 
    vitesse: 130,
    taux_capture: 3
  },
];

describe('Page Pokemon (Pokedex)', () => {
  
  beforeEach(() => {
    // On simule l'appel API fetch
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockPokemons),
      })
    ));
  });

  // --- TESTS DE BASE ---

  it('affiche tous les pokémons au chargement', async () => {
    render(<MemoryRouter><Pokemon /></MemoryRouter>);
    await waitFor(() => {
      expect(screen.getByText('Bulbizarre')).toBeInTheDocument();
      expect(screen.getByText('Mewtwo')).toBeInTheDocument();
    });
  });

  it('filtre les pokémons par nom via la barre de recherche', async () => {
  render(<MemoryRouter><Pokemon /></MemoryRouter>);
  
  // On attend d'abord que les données initiales soient chargées
  await waitFor(() => {
    expect(screen.getByText('Bulbizarre')).toBeInTheDocument();
  });

  const searchInput = screen.getByPlaceholderText(/Rechercher un Pokémon/i);
  
  // On simule la saisie
  fireEvent.change(searchInput, { target: { value: 'Sal' } });

  // ✅ ON ATTEND que le filtrage se produise
  await waitFor(() => {
    expect(screen.getByText('Salamèche')).toBeInTheDocument();
    expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument();
  });
});

  // --- TESTS DE FILTRES PAR TYPES & RARETÉ ---

  it('filtre par type lorsqu\'on clique sur un bouton de type', async () => {
    render(<MemoryRouter><Pokemon /></MemoryRouter>);
    await waitFor(() => screen.getByText('Salamèche'));

    const feuButton = screen.getByRole('button', { name: /^Feu$/i });
    fireEvent.click(feuButton);

    expect(screen.getByText('Salamèche')).toBeInTheDocument();
    expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument();
  });

  it('filtre par rareté au clic sur le bouton', async () => {
    render(<MemoryRouter><Pokemon /></MemoryRouter>);
    await waitFor(() => screen.getByText('Mewtwo'));

    const legendaireBtn = screen.getByRole('button', { name: /^Légendaire$/i });
    fireEvent.click(legendaireBtn);

    expect(screen.getByText('Mewtwo')).toBeInTheDocument();
    expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument();
  });

  // --- TESTS DE FILTRES AVANCÉS (GÉNÉRATION & STATS) ---

  it('filtre par génération via le menu déroulant', async () => {
    render(<MemoryRouter><Pokemon /></MemoryRouter>);
    await waitFor(() => screen.getByText('Héricendre'));

    const genSelect = screen.getByLabelText(/Génération :/i);
    fireEvent.change(genSelect, { target: { value: '2' } });

    expect(screen.getByText('Héricendre')).toBeInTheDocument();
    expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument();
  });

  it('filtre par statistiques en mode "ET" (par défaut)', async () => {
    render(<MemoryRouter><Pokemon /></MemoryRouter>);
    
    // On met l'Attaque Spéciale à 150 (Seul Mewtwo a autant)
    const attaqueSpeInput = screen.getAllByRole('spinbutton')[3]; 
    fireEvent.change(attaqueSpeInput, { target: { value: '150' } });

    await waitFor(() => {
      expect(screen.getByText('Mewtwo')).toBeInTheDocument();
      expect(screen.queryByText('Bulbizarre')).not.toBeInTheDocument();
    });
  });

  it('filtre en mode "AU MOINS UNE STAT" (Mode OU)', async () => {
    render(<MemoryRouter><Pokemon /></MemoryRouter>);
    
    // On coche la case pour passer en mode "OU"
    // On cherche la checkbox par son rôle
  

    // Si on cherche Vitesse > 120 OU Attaque > 100
    const vitesseInput = screen.getAllByRole('spinbutton')[5];
    fireEvent.change(vitesseInput, { target: { value: '120' } });

    await waitFor(() => {
      expect(screen.getByText('Mewtwo')).toBeInTheDocument();
    });
  });

  // --- TEST DE L'URL (PERSISTANCE) ---

  it('initialise les filtres à partir des paramètres de l\'URL (Deep Linking)', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemons?search=Bulb&rarete=Starter']}>
        <Routes>
          <Route path="/pokemons" element={<Pokemon />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Bulbizarre')).toBeInTheDocument();
      expect(screen.queryByText('Salamèche')).not.toBeInTheDocument();
      
      const searchInput = screen.getByPlaceholderText(/Rechercher un Pokémon/i) as HTMLInputElement;
      expect(searchInput.value).toBe('Bulb');
    });
  });
});