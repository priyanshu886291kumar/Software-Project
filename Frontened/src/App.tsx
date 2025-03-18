
// src/app.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GetRecommendationPage from "./pages/GetRecommendationPage";
import RecommendationsPage from "./pages/RecommendationsPage";  // Import the new page

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/getRecommendation" element={<GetRecommendationPage />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />  {/* New route */}
    </Routes>
  );
}

export default App;
