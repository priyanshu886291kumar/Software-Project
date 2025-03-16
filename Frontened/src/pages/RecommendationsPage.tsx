// 2. New File: RecommendationsPage.tsx
// Create a new page that retrieves the recommended tracks from your backend based on the emotion and displays them attractively. For example, you might use a grid of cards:

// src/pages/RecommendationsPage.tsx

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrackCard from "../components/TrackCard";

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  spotify_url: string;
}

function RecommendationsPage() {
  const location = useLocation();
  const { emotion } = location.state || { emotion: "neutral" };
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recommendations?emotion=${emotion}`);
        const data = await response.json();
        if (response.ok) {
          setTracks(data.tracks);
        } else {
          setError(data.error || "Error fetching recommendations");
        }
      } catch (err) {
        setError("Error connecting to recommendation server");
      }
    };
    fetchRecommendations();
  }, [emotion]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold">Your Recommended Tunes</h1>
        <p className="mt-2 text-xl text-gray-300">
          Based on your emotion: <span className="font-bold">{emotion}</span>
        </p>
      </header>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tracks.map((track, index) => (
          <TrackCard key={index} track={track} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="text-orange-400 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}

export default RecommendationsPage;
