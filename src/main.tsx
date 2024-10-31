// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import AnimeList from "./pages/AnimeList.tsx";
import { RandomAnime } from "./pages/randomAnime.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<AnimeList />} />
          <Route path="random" element={<RandomAnime />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);
