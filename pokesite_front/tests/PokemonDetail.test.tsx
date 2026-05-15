import { render, screen, waitFor, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetail from '../src/pages/PokemonDetail';
import '@testing-library/jest-dom';

// 1. Mock des données pour Bulbizarre (Double Type)
const mockBulbizarre = {
  num_pokedex: 1,
  nom: 'Bulbizarre',
  img: 'bulbizarre.png',
  img_shiny: 'bulbizarre_shiny.png',
  img_mini: 'bulbizarre_mini.png',
  types: ['Plante', 'Poison'],
  hp: 45,
  attaque: 49,
  defense: 49,
  attaque_spe: 65,
  defense_spe: 65,
  vitesse: 45,
  rarete: 'Starter',
  generation: 1,
  taux_capture: 45,
  talents: [
    { id_talent: 27, nom: 'Engrais', description_talent: 'Augmente la puissance des capacités de type Plante lorsque le Pokémon a moins d\'1/3 de ses PV.' },
  ]
};

// Mock du hook useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Page PokemonDetail - Focus Bulbizarre', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal('fetch', vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBulbizarre),
      })
    ));
  });

  it('affiche Bulbizarre avec ses deux types dans la section Types', async () => {
  render(
    <MemoryRouter initialEntries={['/pokemons/1']}>
      <PokemonDetail />
    </MemoryRouter>
  );

  await waitFor(() => {
    // 1. On trouve d'abord le titre de la section pour ne pas chercher partout
    const typesSection = screen.getByText(/^Types$/i).closest('div');
    
    if (typesSection) {
      // 2. On vérifie que "Plante" et "Poison" sont dans CETTE section précise
      expect(within(typesSection).getByText('Plante')).toBeInTheDocument();
      expect(within(typesSection).getByText('Poison')).toBeInTheDocument();
    }
  });
});

  it('affiche les statistiques de base avec les bonnes valeurs', async () => {
  render(
    <MemoryRouter initialEntries={['/pokemons/1']}>
      <PokemonDetail />
    </MemoryRouter>
  );

  await waitFor(() => {
    // 1. On isole le bloc des statistiques pour éviter les doublons
    const statsContainer = screen.getByText(/Statistiques de base/i).closest('div');
    
    if (statsContainer) {
      // Bulbizarre a 45 en PV et Vitesse
      expect(within(statsContainer).getAllByText('45')).toHaveLength(2);
      // Il a 49 en Attaque et Défense
      expect(within(statsContainer).getAllByText('49')).toHaveLength(2);
    }

    // 2. LA SOLUTION POUR LE TAUX DE CAPTURE
    // On utilise une fonction qui vérifie le contenu global du nœud parent
    screen.getByText((content, node) => {
      const hasText = (textContent: string) => 
        textContent.includes("Taux de capture :") && textContent.includes("45");
      
      // On s'assure que c'est bien l'élément <p> qui contient le texte combiné
      const nodeHasText = hasText(node?.textContent || "");
      const childrenDontHaveText = Array.from(node?.children || []).every(
        child => !hasText(child.textContent || "")
      );
      
      return nodeHasText && childrenDontHaveText;
    });

    // 3. Vérification du Total
    expect(screen.getByText(/Total : 318/i)).toBeInTheDocument();
  });
});


  it('vérifie la logique des affinités (Faiblesses spécifiques)', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemons/1']}>
        <PokemonDetail />
      </MemoryRouter>
    );

    await waitFor(() => {
      // Bulbizarre est faible face au Feu, Vol, Glace et Psy.
      expect(screen.getByText(/Feu/i)).toBeInTheDocument();
      expect(screen.getByText(/Psy/i)).toBeInTheDocument();
      
      // On peut même vérifier s'il affiche bien un multiplicateur (ex: x2)
      const fireMultiplier = screen.getAllByText(/x2/i);
      expect(fireMultiplier.length).toBeGreaterThan(0);
    });
  });

  it('navigue vers l\'arrière quand on clique sur le bouton flèche', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemons/1']}>
        <PokemonDetail />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText('←'));
    fireEvent.click(screen.getByText('←'));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });


it('affiche les immunités pour un Pokémon de type Spectre', async () => {
  vi.stubGlobal('fetch', vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        ...mockBulbizarre, // On garde la base
        nom: 'Fantominus',
        types: ['Spectre', 'Poison'],
      }),
    })
  ));

  render(<MemoryRouter initialEntries={['/pokemons/92']}><PokemonDetail /></MemoryRouter>);

  await waitFor(() => {
    // 1. On cible spécifiquement la section des immunités
    const immunitySection = screen.getByText(/IMMUNITÉS/i).closest('div');
    
    if (immunitySection) {
      // 2. On vérifie que le type "Normal" est présent DANS cette section
      expect(within(immunitySection).getByText(/Normal/i)).toBeInTheDocument();
      // 3. On vérifie que le texte "Immunisé" est bien là aussi
      expect(within(immunitySection).getAllByText(/Immunisé/i)).toHaveLength(2);
    }
  });
});

it('gère les erreurs de fetch proprement', async () => {
  // On simule une erreur serveur (500)
  vi.stubGlobal('fetch', vi.fn(() => Promise.reject("API Down")));
  
  // Pour éviter de polluer la console pendant le test
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  render(<MemoryRouter initialEntries={['/pokemons/1']}><PokemonDetail /></MemoryRouter>);

  // Ici, on vérifie que le chargement ne plante pas l'appli
  // Idéalement, tu devrais afficher un message d'erreur dans ton composant
  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalled();
  });
  
  consoleSpy.mockRestore();
});
});