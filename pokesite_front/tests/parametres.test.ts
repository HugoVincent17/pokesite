import { tableTypes, couleurType } from '../src/parametres';
import { describe, it, expect } from 'vitest';

describe('Vérification de l\'intégrité des paramètres', () => {

  it('chaque type dans la table d\'efficacité doit avoir une couleur définie', () => {
    const typesTable = Object.keys(tableTypes);
    const typesCouleurs = Object.keys(couleurType);

    typesTable.forEach(type => {
      // Si un type est dans la table de combat mais n'a pas de couleur, l'UI va crash
      expect(typesCouleurs).toContain(type);
    });
  });

  it('les multiplicateurs de dégâts doivent être cohérents', () => {
    // On vérifie qu'aucun multiplicateur n'est aberrant (ex: négatif ou > 4)
    Object.values(tableTypes).forEach(relations => {
      Object.values(relations).forEach(valeur => {
        expect([0, 0.5, 2]).toContain(valeur); 
      });
    });
  });

  it('les symétries d\'immunité critique (ex: Spectre/Normal)', () => {
    // Test de règles métier spécifiques : Normal ne peut pas toucher Spectre
    expect(tableTypes.Normal.Spectre).toBe(0);
    // Spectre ne peut pas toucher Normal
    expect(tableTypes.Spectre.Normal).toBe(0);
  });
});