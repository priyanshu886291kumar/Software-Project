import os
import redis
import requests

# Configure Redis client (adjust host, port, etc. as needed)
redis_client = redis.Redis(host='localhost', port=6379, db=0)
#  you use the Redis client to connect to the Redis server at localhost:6379 (this is the Redis server running in your Docker container).

CLIENT_ID = os.getenv("CLIENT_ID", "dea716ed40cc40b79f656f9fcbec3a02")
CLIENT_SECRET = os.getenv("CLIENT_SECRET", "c877d293b0f04c4fa2dabe10a96173b1")

def get_spotify_token():
    """
    Retrieve a Spotify access token from Redis if available.
    If not available or expired, request a new token from Spotify,
    store it in Redis with an expiry time, and return it.
    """
    token = redis_client.get("spotify_token")
    if token:
        # Decode token from bytes to string before returning it
        return token.decode("utf-8")
    
    auth_url = "https://accounts.spotify.com/api/token"
    response = requests.post(auth_url, data={
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    })
    response.raise_for_status()
    token_data = response.json()
    token = token_data.get("access_token")
    expires_in = token_data.get("expires_in", 3600)
    
    # Cache the token in Redis with an expiration time (with a 60-second buffer)
    redis_client.setex("spotify_token", expires_in - 60, token)
    
    return token



def get_recommendations_by_emotion(emotion):
    """
    Given an emotion string, map it to a search keyword and query Spotify
    to retrieve recommended tracks. Returns a list of track information.
    """
    # Map emotion to a search keyword (customize this mapping as needed)
    emotion_keywords = {
        "happy": "upbeat",
        "sad": "melancholy",
        "angry": "intense",
        "surprise": "energetic",
        "neutral": "chill",
    }
    query = emotion_keywords.get(emotion.lower(), emotion)
    
    token = get_spotify_token()
    headers = {"Authorization": f"Bearer {token}"}
    search_url = "https://api.spotify.com/v1/search"
    params = {
        "q": query,
        "type": "track",
        "limit": 20,
    }
    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()
    data = response.json()
    
    tracks = data.get("tracks", {}).get("items", [])
    recommendations = []
    for track in tracks:
        # Safely get the list of images from the album
        images = track.get("album", {}).get("images", [])
        image_url = images[0].get("url") if images else ""  # Use an empty string if no images are available

        rec = {
            "name": track.get("name"),
            "artist": ", ".join(artist.get("name") for artist in track.get("artists", [])),
            "album": track.get("album", {}).get("name", ""),
            "image": image_url,
            "spotify_url": track.get("external_urls", {}).get("spotify", "")
        }
        recommendations.append(rec)

    return recommendations



# How It Works (Simple English)
# Connecting to Redis:
# The code creates a Redis client that connects to a Redis server running on your machine (or another server). Redis is used as a distributed caching system.

# Checking the Cache:
# The function get_spotify_token() first checks if a valid Spotify token is already stored in Redis by calling redis_client.get("spotify_token").

# If it finds a token, it decodes it (because Redis stores data as bytes) and returns it immediately.
# Requesting a New Token:
# If there's no token in the cache or if it has expired:

# The function sends a POST request to Spotify's token endpoint with your client credentials.
# It retrieves a new access token along with the expiration time (expires_in).
# Storing in Redis:
# The new token is then stored in Redis using the setex command, which sets the token with an expiration time (TTL). A buffer (e.g., 60 seconds) is subtracted from the expiration time to ensure the token doesn't expire mid-use.

# This means the token will be automatically removed from Redis once it expires.
# Returning the Token:
# Finally, the function returns the valid token to be used for Spotify API calls.

# Advantages of Using Redis
# Distributed Cache:
# Multiple instances of your backend can access the same token from Redis, ensuring consistency across your system.
# Persistence & Performance:
# Redis is fast and can handle a high number of read/write operations, making it a reliable choice for caching tokens.
# Automatic Expiration:
# Redis automatically removes the token after its TTL expires, so your code doesn't have to manually manage token expiry.
# This Redis-based caching mechanism helps your application always have a valid Spotify access token while minimizing redundant requests to Spotify's API.


# A distributed cache means that if your website is running on multiple backend servers (or instances), they can all share the same cached data—in this case, the Spotify access token—stored in Redis.

# Example in Simple English:

# Imagine you have two servers running your website. When a user on Laptop A visits your site, one of the servers requests a Spotify token and saves it in Redis. Now, when another user on Laptop B visits your site, their request might be handled by the other server. Instead of that second server asking Spotify for a new token, it looks in Redis, finds the token that was saved by the first server, and uses it. This way, both users are using the same token, ensuring consistency, and you only need to refresh the token once every hour for all users.

# In short, no matter how many users or servers there are, every user gets a valid token from the same centralized Redis store, so within that 1-hour period, everyone can listen to songs without extra token requests.












