import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Pokemon from "./pages/Pokemon.tsx";
import Objets from "./pages/Objets.tsx";
import Types from "./pages/Types.tsx";
import Attaques from "./pages/Attaques.tsx";
import Talents from "./pages/Talents.tsx";
import Statuts from "./pages/Statuts.tsx";
import Mecaniques from "./pages/Mecaniques.tsx";
import PokemonDetail from "./pages/PokemonDetail.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/pokemons" element={<Pokemon />} />
        <Route path="/objets" element={<Objets />} />
        <Route path="/types" element={<Types />} />
        <Route path="/attaques" element={<Attaques/>} />
        <Route path="/talents" element={<Talents />} />
        <Route path="/statuts" element={<Statuts />} />
        <Route path="/mecaniques" element={<Mecaniques />} />
        <Route path="/pokemons/:id" element={<PokemonDetail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
