
// src/app.tsx
// src/App.tsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./pages/HomePage";
import GetRecommendationPage from "./pages/GetRecommendationPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import Player from "./pages/Player";



function App() {
  const location = useLocation();

  return (
    // AnimatePresence enables exit animations on route change.
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/player" element={<Player />} />

        <Route path="/getRecommendation" element={<GetRecommendationPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
