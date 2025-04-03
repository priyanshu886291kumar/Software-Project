




// src/pages/RecommendationsPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TrackCard from "../components/TrackCard";
import MiniPlayer from "../components/MiniPlayer";

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  spotify_url: string;
}

function RecommendationsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { emotion } = location.state || { emotion: "neutral" };
  const [tracks, setTracks] = useState<Track[]>([]);
  const [error, setError] = useState("");
  const [currentEmbedUrl, setCurrentEmbedUrl] = useState<string>("");

  // Limit user to 5 free plays
  const [playCount, setPlayCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);

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

  const handlePlay = (embedUrl: string) => {
    if (playCount >= 5) {
      setShowUpgrade(true);
      return;
    }
    setCurrentEmbedUrl(embedUrl);
    setPlayCount(playCount + 1);
  };


  
  // Change: Instead of resetting and going home, we'll navigate to /subscription
  const handleUpgradeClose = () => {
    // We won't reset the playCount here, so if user comes back, they'd still see the upgrade message.
    // But if you want to reset it after navigating away, you can.
    navigate("/subscription");
  };


  return (
    <div className="min-h-screen bg-background dark:bg-backgroundLight text-primary dark:text-primaryDark py-12 px-4">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold">Your Recommended Tunes</h1>
        <p className="mt-2 text-xl text-secondary">
          Based on your emotion: <span className="font-bold">{emotion}</span>
        </p>
      </header>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track, index) => (
          <TrackCard
            key={index}
            track={track}
            onPlay={(embedUrl: string) => handlePlay(embedUrl)}
          />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/" className="text-orange-400 hover:underline">← Back to Home</Link>
      </div>

      {currentEmbedUrl && (
        <MiniPlayer embedUrl={currentEmbedUrl} onClose={() => setCurrentEmbedUrl("")} />
      )}



      {/* Upgrade Modal */}
      {showUpgrade && (
       <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
     >
       <div className="bg-backgroundLight dark:bg-background p-6 rounded-lg text-center w-80 sm:w-96 shadow-lg">
         <h2 className="text-2xl font-bold mb-4 text-primaryDark dark:text-primary">
           Upgrade to Premium
         </h2>
         <p className="mb-4 text-secondary">
           You have reached the limit of 5 free song plays.
           Upgrade to premium for unlimited access!
         </p>
         <button
           onClick={handleUpgradeClose}
           className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded transition-colors duration-300"
         >
           Upgrade to Premium
         </button>
       </div>
     </motion.div>
     
      )}
    </div>
  );
}

export default RecommendationsPage;










