import { defineConfig, loadEnv } from 'vite' // ◄ CORRECTION : On utilise la config de Vite, pas de Vitest
import react from '@vitejs/plugin-react'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import path from 'path'

// On force manuellement Node à lire le fichier .env avant de lancer Vite
dotenv.config({ path: path.resolve(__dirname, '.env') });

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv va chercher proprement le fichier .env dans le dossier courant (pokesite_front)
  const envFichier = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), vue()],
    define: {
      // On injecte la valeur lue dans le .env
      'process.env.API_URL': JSON.stringify(envFichier.API_URL)
    }
  }
})