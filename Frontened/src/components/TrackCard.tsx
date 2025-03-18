


// import React, { useState } from "react";
// import { Heart, ThumbsUp, ThumbsDown, Bookmark } from "lucide-react"; // Change: Imported icons for favorite, like, dislike, and save

// interface Track {
//   name: string;
//   artist: string;
//   album: string;
//   image: string;
//   spotify_url: string;
// }

// interface Props {
//   track: Track;
// }

// const TrackCard: React.FC<Props> = ({ track }) => {
//   const [favorite, setFavorite] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [saved, setSaved] = useState(false);

//   const user_id = 1; // Change: Simulated user ID (replace with real user info in production)

//   // Change: Updated handler to add favorite using a heart icon
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

//   // Change: Handler for like action
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
//         setDisliked(false); // Optionally, remove dislike if already set
//       } else {
//         console.error("Failed to like track");
//       }
//     } catch (error) {
//       console.error("Error liking track", error);
//     }
//   };

//   // Change: Handler for dislike action
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
//         setLiked(false); // Optionally, remove like if already set
//       } else {
//         console.error("Failed to dislike track");
//       }
//     } catch (error) {
//       console.error("Error disliking track", error);
//     }
//   };

//   // Change: Handler for save action
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

//   return (
//     <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
//       <img src={track.image} alt={track.album} className="w-full h-48 object-cover" />
//       <div className="p-4">
//         <h3 className="text-xl font-bold">{track.name}</h3>
//         <p className="text-gray-400">{track.artist}</p>
//         <a
//           href={track.spotify_url}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-2 inline-block text-indigo-500 hover:underline"
//         >
//           Listen on Spotify
//         </a>
//         {/* Change: Added icon buttons for Favorite, Like, Dislike, and Save */}
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






import React, { useState } from "react";
import { Heart, ThumbsUp, ThumbsDown, Bookmark, Play } from "lucide-react"; // Change: Imported icons for play and other actions

interface Track {
  name: string;
  artist: string;
  album: string;
  image: string;
  spotify_url: string;
}

interface Props {
  track: Track;
}

const TrackCard: React.FC<Props> = ({ track }) => {
  const [favorite, setFavorite] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulated user id; in production, retrieve from your auth context.
  const user_id = 1;

  // Handler to add track to favorites
  const handleAddFavorite = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/favorites", {
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
        setFavorite(true);
      } else {
        console.error("Failed to add favorite");
      }
    } catch (error) {
      console.error("Error adding favorite", error);
    }
  };

  // Handler to record a like
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
        setDisliked(false); // Remove dislike if already set
      } else {
        console.error("Failed to like track");
      }
    } catch (error) {
      console.error("Error liking track", error);
    }
  };

  // Handler to record a dislike
  const handleDislike = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dislikes", {
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
        setDisliked(true);
        setLiked(false); // Remove like if already set
      } else {
        console.error("Failed to dislike track");
      }
    } catch (error) {
      console.error("Error disliking track", error);
    }
  };

  // Handler to save the track
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/saves", {
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
        setSaved(true);
      } else {
        console.error("Failed to save track");
      }
    } catch (error) {
      console.error("Error saving track", error);
    }
  };

  // Helper function: Extract Spotify track ID and build embed URL.
  // Assumes spotify_url format: "https://open.spotify.com/track/{track_id}"
  const getSpotifyEmbedUrl = (url: string) => {
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];
    const trackId = lastPart.split("?")[0];
    return `https://open.spotify.com/embed/track/${trackId}`;
  };

  return (
    <div className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img src={track.image} alt={track.album} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{track.name}</h3>
        <p className="text-gray-400">{track.artist}</p>
        {/* Change: Instead of a "Listen on Spotify" link, add a Play button in the middle */}
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="mt-2 flex items-center justify-center w-full px-3 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors duration-300"
          >
            <Play className="h-5 w-5 mr-2" />
            <span>Play</span>
          </button>
        ) : (
          <div className="mt-2 relative pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
            <iframe
              src={getSpotifyEmbedUrl(track.spotify_url)}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="encrypted-media"
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-300 text-sm"
            >
              Stop
            </button>
          </div>
        )}
        {/* Change: Added icon buttons for Favorite, Like, Dislike, and Save */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleAddFavorite}
            disabled={favorite}
            className="p-2 rounded-full transition-colors duration-300"
          >
            <Heart className={`h-6 w-6 ${favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`} />
          </button>
          <button
            onClick={handleLike}
            disabled={liked}
            className="p-2 rounded-full transition-colors duration-300"
          >
            <ThumbsUp className={`h-6 w-6 ${liked ? "text-green-500" : "text-gray-400 hover:text-green-500"}`} />
          </button>
          <button
            onClick={handleDislike}
            disabled={disliked}
            className="p-2 rounded-full transition-colors duration-300"
          >
            <ThumbsDown className={`h-6 w-6 ${disliked ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`} />
          </button>
          <button
            onClick={handleSave}
            disabled={saved}
            className="p-2 rounded-full transition-colors duration-300"
          >
            <Bookmark className={`h-6 w-6 ${saved ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
