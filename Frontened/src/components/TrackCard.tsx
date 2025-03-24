// // src/components/TrackCard.tsx
// import React, { useState } from "react";
// import { Heart, ThumbsUp, ThumbsDown, Bookmark, Play } from "lucide-react"; // Change: Added Play icon
// interface Track {
//   name: string;
//   artist: string;
//   album: string;
//   image: string;
//   spotify_url: string;
// }
// interface Props {
//   track: Track;
//   onPlay: (embedUrl: string) => void; // Change: Callback to trigger playback
// }
// const TrackCard: React.FC<Props> = ({ track, onPlay }) => {
//   const [favorite, setFavorite] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [saved, setSaved] = useState(false);
//   const user_id = 1; // Simulated user id; replace with real user info in production

//   const handleAddFavorite = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/favorites", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id,
//           track_name: track.name,
//           artist: track.artist,
//           spotify_url: track.spotify_url,
//         }),
//       });
//       if (response.ok) {
//         setFavorite(true);
//       } else {
//         console.error("Failed to add favorite");
//       }
//     } catch (error) {
//       console.error("Error adding favorite", error);
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/likes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id,
//           track_name: track.name,
//           artist: track.artist,
//           spotify_url: track.spotify_url,
//         }),
//       });
//       if (response.ok) {
//         setLiked(true);
//         setDisliked(false);
//       } else {
//         console.error("Failed to like track");
//       }
//     } catch (error) {
//       console.error("Error liking track", error);
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/dislikes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id,
//           track_name: track.name,
//           artist: track.artist,
//           spotify_url: track.spotify_url,
//         }),
//       });
//       if (response.ok) {
//         setDisliked(true);
//         setLiked(false);
//       } else {
//         console.error("Failed to dislike track");
//       }
//     } catch (error) {
//       console.error("Error disliking track", error);
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/saves", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           user_id,
//           track_name: track.name,
//           artist: track.artist,
//           spotify_url: track.spotify_url,
//         }),
//       });
//       if (response.ok) {
//         setSaved(true);
//       } else {
//         console.error("Failed to save track");
//       }
//     } catch (error) {
//       console.error("Error saving track", error);
//     }
//   };

//   // Helper: Extract track ID and build Spotify embed URL
//   const getSpotifyEmbedUrl = (url: string) => {
//     const parts = url.split("/");
//     const lastPart = parts[parts.length - 1];
//     const trackId = lastPart.split("?")[0];
//     return `https://open.spotify.com/embed/track/${trackId}`;
//   };

//   return (
//     <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
//       <img src={track.image} alt={track.album} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-bold">{track.name}</h3>
//         <p className="text-gray-400">{track.artist}</p>
//         {/* Change: Instead of a link, add a play button in the center */}
//         <button
//           onClick={() => onPlay(getSpotifyEmbedUrl(track.spotify_url))}
//           className="mt-2 flex items-center justify-center w-full px-3 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors duration-300"
//         >
//           <Play className="h-5 w-5 mr-2" />
//           <span>Play</span>
//         </button>
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={handleAddFavorite}
//             disabled={favorite}
//             className="p-2 rounded-full transition-colors duration-300"
//           >
//             <Heart className={`h-6 w-6 ${favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`} />
//           </button>
//           <button
//             onClick={handleLike}
//             disabled={liked}
//             className="p-2 rounded-full transition-colors duration-300"
//           >
//             <ThumbsUp className={`h-6 w-6 ${liked ? "text-green-500" : "text-gray-400 hover:text-green-500"}`} />
//           </button>
//           <button
//             onClick={handleDislike}
//             disabled={disliked}
//             className="p-2 rounded-full transition-colors duration-300"
//           >
//             <ThumbsDown className={`h-6 w-6 ${disliked ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`} />
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saved}
//             className="p-2 rounded-full transition-colors duration-300"
//           >
//             <Bookmark className={`h-6 w-6 ${saved ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrackCard;


// src/components/TrackCard.tsx
import React, { useState } from "react";
import { Heart, Play } from "lucide-react"; // We use the Heart icon for like and Play for playing music

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  spotify_url: string;
}

interface Props {
  track: Track;
  onPlay: (embedUrl: string) => void; // Callback for playback
}

const TrackCard: React.FC<Props> = ({ track, onPlay }) => {
  const [liked, setLiked] = useState(false);
  const user_id = 1; // Simulated user id; in production, use real user info from auth

  // Handler for the Like button
  
  const handleLike = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          track_name: track.name,
          artist: track.artist,
          spotify_url: track.spotify_url,
        }),
      });
      if (response.ok) {
        setLiked(true);
      } else {
        console.error("Failed to like track");
      }
    } catch (error) {
      console.error("Error liking track", error);
    }
  };

  // Helper: Construct Spotify embed URL from the track's spotify_url
  const getSpotifyEmbedUrl = (url: string) => {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const trackId = lastPart.split("?")[0];
    return `https://open.spotify.com/embed/track/${trackId}`;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={track.image} alt={track.album} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{track.name}</h3>
        <p className="text-gray-400">{track.artist}</p>
        {/* Play Button */}
        <button
          onClick={() => onPlay(getSpotifyEmbedUrl(track.spotify_url))}
          className="mt-2 flex items-center justify-center w-full px-3 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors duration-300"
        >
          <Play className="h-5 w-5 mr-2" />
          <span>Play</span>
        </button>
        {/* Like Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLike}
            disabled={liked}
            className="p-2 rounded-full transition-colors duration-300"
          >
            <Heart className={`h-6 w-6 ${liked ? "text-red-500" : "text-gray-400 hover:text-red-500"}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
