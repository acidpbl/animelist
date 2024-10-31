// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Genres from "./pages/Genres.tsx";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AnimeList from "./pages/AnimeList.tsx";
import { AnimeByGenre } from "./pages/AnimeByGenre.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<AnimeList />} />
          <Route path="genres" element={<Genres />} />
          <Route path="genres/:genre" element={<AnimeByGenre />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
