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
          console.log(data.error);
          setError(data.error || "Error fetching recommendations");
        }
      } catch (err) {
        setError("Error connecting to recommendation server");
      }
    };
    fetchRecommendations();
  }, [emotion]);

  return (
    // Change: Updated text color and dark mode classes; added responsive grid and dark mode classes to the outer container.
    <div className="min-h-screen bg-background dark:bg-backgroundLight text-primary dark:text-primaryDark py-12 px-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold">Your Recommended Tunes</h1>
        {/* Change: text-gray-300 changed to text-secondary */}
        <p className="mt-2 text-xl text-secondary">
          Based on your emotion: <span className="font-bold">{emotion}</span>
        </p>
      </header>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      {/* Change: Responsive grid - single column on small screens, 2 columns on md, and 3 columns on lg screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
