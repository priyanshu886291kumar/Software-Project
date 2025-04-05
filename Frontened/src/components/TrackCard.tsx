






// import React, { useState } from "react";
// import { Heart, ThumbsUp, ThumbsDown, Bookmark, Play } from "lucide-react";

// interface Track {
//   name: string;
//   artist: string;
//   album: string;
//   image: string;
//   spotify_url: string;
// }

// interface Props {
//   track: Track;
//   onPlay: (embedUrl: string) => void; // Callback for playback
// }

// const TrackCard: React.FC<Props> = ({ track, onPlay }) => {
//   const [favorite, setFavorite] = useState(false);
//   const [liked, setLiked] = useState(false);
//   const [disliked, setDisliked] = useState(false);
//   const [saved, setSaved] = useState(false);

//   // Retrieve user_id from local storage
//   const user_id = localStorage.getItem("user_id");

//   // Helper function to check if user_id exists
//   const ensureUserId = () => {
//     if (!user_id) {
//       alert("Please create a test user first!");
//       return false;
//     }
//     return true;
//   };

//   // Handler for Favorite button
//   const handleAddFavorite = async () => {
//     if (!ensureUserId()) return;

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
//     if (!ensureUserId()) return;
  
//     // Prepare the payload
//     const payload = {
//       user_id, // Retrieved from local storage
//       track_name: track.name,
//       artist: track.artist,
//       spotify_url: track.spotify_url,
//     };
  
//     // Log the payload for debugging
//     console.log("Request Payload:", payload);
  
//     try {
//       const response = await fetch("http://localhost:5000/api/likes", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload), // Send the payload
//       });
  
//       if (response.ok) {
//         const result = await response.json();
//         console.log(result);
  
//         // Toggle the "liked" state based on the backend response
//         if (result.message === "Track liked successfully") {
//           setLiked(true); // Mark the track as liked
//           setDisliked(false); // Ensure "disliked" is reset
//         } else if (result.message === "Track unliked successfully") {
//           setLiked(false); // Mark the track as unliked
//         }
//       } else {
//         console.error("Failed to toggle like");
//         const errorData = await response.json();
//         console.error("Error Response:", errorData);
//       }
//     } catch (error) {
//       console.error("Error toggling like", error);
//     }
//   };


//   // Handler for Dislike button
//   const handleDislike = async () => {
//     if (!ensureUserId()) return;

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

//   // Handler for Save button
//   const handleSave = async () => {
//     if (!ensureUserId()) return;

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

//   // Helper: Construct Spotify embed URL from the track's spotify_url
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
//         {/* Play Button */}
//         <button
//           onClick={() => onPlay(getSpotifyEmbedUrl(track.spotify_url))}
//           className="mt-2 flex items-center justify-center w-full px-3 py-2 bg-accent text-white rounded hover:bg-accent-hover transition-colors duration-300"
//         >
//           <Play className="h-5 w-5 mr-2" />
//           <span>Play</span>
//         </button>
//         {/* Action Buttons */}
//         <div className="flex justify-around items-center mt-4">
//           {/* Favorite Button */}
//           <button onClick={handleAddFavorite} disabled={favorite} className="p-2 rounded-full transition-colors duration-300">
//             <Heart className={`h-6 w-6 ${favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`} />
//           </button>
  
//           {/* Like Button */}
//           <button onClick={handleLike} className="p-2 rounded-full transition-colors duration-300">
//             <ThumbsUp className={`h-6 w-6 ${liked ? "text-green-500" : "text-gray-400 hover:text-green-500"}`} />
//           </button>
  
//           {/* Dislike Button */}
//           <button onClick={handleDislike} disabled={disliked} className="p-2 rounded-full transition-colors duration-300">
//             <ThumbsDown className={`h-6 w-6 ${disliked ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`} />
//           </button>
  
//           {/* Save Button */}
//           <button onClick={handleSave} disabled={saved} className="p-2 rounded-full transition-colors duration-300">
//             <Bookmark className={`h-6 w-6 ${saved ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// export default TrackCard;










import React, { useState } from "react";
import { Heart, ThumbsUp, ThumbsDown, Bookmark, Play } from "lucide-react";

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
  const [favorite, setFavorite] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);

  // Retrieve user_id from local storage
  const user_id = localStorage.getItem("user_id");

  // Helper function to check if user_id exists
  const ensureUserId = () => {
    if (!user_id) {
      alert("Please create a test user first!");
      return false;
    }
    return true;
  };





  // Handler for Favorite button
  const handleAddFavorite = async () => {
    if (!ensureUserId()) return;

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







  const handleLike = async () => {
    if (!ensureUserId()) return;
  
    const payload = {
      user_id,
      track_name: track.name,
      artist: track.artist,
      spotify_url: track.spotify_url,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log(result);
  
        if (result.message === "Track liked successfully") {
          setLiked(true); // ✅ Modified: Mark the track as liked
          setDisliked(false); // ✅ Modified: Reset "disliked" state
        } else if (result.message === "Track unliked successfully") {
          setLiked(false); // ✅ Modified: Mark the track as unliked
        }
      } else {
        console.error("Failed to toggle like");
      }
    } catch (error) {
      console.error("Error toggling like", error);
    }
  };  


 


  const handleDislike = async () => {
    if (!ensureUserId()) return;
  
    const payload = {
      user_id,
      track_name: track.name,
      artist: track.artist,
      spotify_url: track.spotify_url,
    };
  
    console.log("Dislike Button Clicked"); // ✅ Debugging: Log when the dislike button is clicked
    console.log("Current State - Liked:", liked, "Disliked:", disliked); // ✅ Debugging: Log the current state
  
    try {
      const response = await fetch("http://localhost:5000/api/dislikes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Backend Response:", result); // ✅ Debugging: Log the backend response
  
        if (result.message === "Track disliked successfully") {
          setDisliked(true); // ✅ Mark the track as disliked
          setLiked(false); // ✅ Reset "liked" state
          console.log("State Updated - Liked:", liked, "Disliked:", true); // ✅ Debugging: Log the updated state
        } else if (result.message === "Track undisliked successfully") {
          setDisliked(false); // ✅ Mark the track as undisliked
          console.log("State Updated - Liked:", liked, "Disliked:", false); // ✅ Debugging: Log the updated state
        }
      } else {
        console.error("Failed to toggle dislike");
        const errorData = await response.json();
        console.error("Error Response:", errorData); // ✅ Debugging: Log the error response
      }
    } catch (error) {
      console.error("Error toggling dislike", error); // ✅ Debugging: Log any unexpected errors
    }
  };      


  // Handler for Save button
  const handleSave = async () => {
    if (!ensureUserId()) return;

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
        {/* Action Buttons */}
        <div className="flex justify-around items-center mt-4">
          {/* Favorite Button */}
          <button onClick={handleAddFavorite} disabled={favorite} className="p-2 rounded-full transition-colors duration-300">
            <Heart className={`h-6 w-6 ${favorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`} />
          </button>

          {/* Like Button */}
          <button onClick={handleLike} className="p-2 rounded-full transition-colors duration-300">
            <ThumbsUp className={`h-6 w-6 ${liked ? "text-green-500" : "text-gray-400 hover:text-green-500"}`} />
          </button>



          {/* Dislike Button */}
          <button onClick={handleDislike} className="p-2 rounded-full transition-colors duration-300">
  <ThumbsDown className={`h-6 w-6 ${disliked ? "text-yellow-500" : "text-gray-400 hover:text-yellow-500"}`} />
</button>


          {/* Save Button */}
          <button onClick={handleSave} disabled={saved} className="p-2 rounded-full transition-colors duration-300">
            <Bookmark className={`h-6 w-6 ${saved ? "text-blue-500" : "text-gray-400 hover:text-blue-500"}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;


