



# from flask import Flask, jsonify, request
# from flask_cors import CORS, cross_origin
# import cv2
# import time
# from deepface import DeepFace
# from spotify_service import get_recommendations_by_emotion

# # Import SQLAlchemy models and Flask-Migrate
# from models import db, User, EmotionHistory, FavoriteTrack, Playlist, PlaylistTrack, Rating, Like
# from flask_migrate import Migrate

# app = Flask(__name__)
# # Global CORS configuration; you can adjust origins as needed.
# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# # Configure PostgreSQL connection (ensure credentials match your Docker setup)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/moodscape_db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# # Initialize SQLAlchemy and Flask-Migrate
# db.init_app(app)
# migrate = Migrate(app, db)

# @app.route('/test', methods=['GET'])
# @cross_origin()  # Enable CORS for this endpoint
# def test_endpoint():
#     try:
#         return jsonify({
#             "message": "Test endpoint is working!",
#             "status": "success"
#         }), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Endpoint for emotion detection with explicit handling of OPTIONS
# @app.route('/api/emotion', methods=['POST', 'OPTIONS'])
# @cross_origin()  # Enable CORS for this endpoint
# def get_emotion():
#     # If the request is an OPTIONS (preflight) request, return an empty 200 OK response
#     if request.method == 'OPTIONS':
#         return jsonify({}), 200

#     try:
#         data = request.get_json()
#         if not data or 'image' not in data:
#             return jsonify({'error': 'No image provided'}), 400

#         image_data = data['image']
#         if image_data.startswith('data:image'):
#             _, encoded = image_data.split(',', 1)
#         else:
#             encoded = image_data

#         import base64, numpy as np
#         decoded = base64.b64decode(encoded)
#         np_arr = np.frombuffer(decoded, np.uint8)
#         frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
#         if frame is None:
#             return jsonify({'error': 'Failed to decode image'}), 400

#         result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
#         if isinstance(result, list):
#             result = result[0]
#         dominant_emotion = result.get('dominant_emotion', 'Unknown')
#         return jsonify({'emotion': dominant_emotion})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# # Endpoint for Spotify recommendations
# @app.route('/api/recommendations', methods=['GET'])
# @cross_origin()  # Enable CORS for this endpoint
# def recommendations():
#     emotion = request.args.get("emotion", "neutral")
#     try:
#         recs = get_recommendations_by_emotion(emotion)
#         return jsonify({"tracks": recs})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # Endpoint for Likes
# @app.route('/api/likes', methods=['POST'])
# @cross_origin()  # Enable CORS for this endpoint
# def add_like():
#     data = request.get_json()
#     if not data or not data.get("user_id") or not data.get("track_name"):
#         return jsonify({"error": "Missing required fields"}), 400

#     like = Like(
#         track_name=data.get("track_name"),
#         artist=data.get("artist"),
#         spotify_url=data.get("spotify_url"),
#         user_id=data.get("user_id")
#     )
#     db.session.add(like)
#     db.session.commit()
#     return jsonify({"message": "Track liked successfully"}), 200

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)



    

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import cv2
import time
from deepface import DeepFace
from spotify_service import get_recommendations_by_emotion

# Import SQLAlchemy models and Flask-Migrate
from models import db, User, EmotionHistory, FavoriteTrack, Playlist, PlaylistTrack, Rating, Like
from flask_migrate import Migrate

# Import pg8000 for PostgreSQL connection
import pg8000

app = Flask(__name__)

# Global CORS configuration: allow all origins (adjust as needed)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Test the PostgreSQL connection using pg8000 directly
try:
    conn = pg8000.connect(
        database="moodscape_db",
        user="postgres",
        password="password",
        host="localhost",
        port=5432
    )
    print("Database connected successfully!")
    conn.close()
except Exception as e:
    print("Database connection failed:", e)

# Initialize the database and migration tool
db.init_app(app)
migrate = Migrate(app, db)

@app.route('/test', methods=['GET'])
@cross_origin()
def test_endpoint():
    try:
        return jsonify({
            "message": "Test endpoint is working!",
            "status": "success"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/emotion', methods=['POST', 'OPTIONS'])
@cross_origin()
def get_emotion():
    # Handle preflight
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']
        if image_data.startswith('data:image'):
            _, encoded = image_data.split(',', 1)
        else:
            encoded = image_data

        import base64, numpy as np
        decoded = base64.b64decode(encoded)
        np_arr = np.frombuffer(decoded, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({'error': 'Failed to decode image'}), 400

        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        if isinstance(result, list):
            result = result[0]
        dominant_emotion = result.get('dominant_emotion', 'Unknown')
        return jsonify({'emotion': dominant_emotion})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommendations', methods=['GET'])
@cross_origin()
def recommendations():
    emotion = request.args.get("emotion", "neutral")
    try:
        recs = get_recommendations_by_emotion(emotion)
        return jsonify({"tracks": recs})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/likes', methods=['POST', 'OPTIONS'])
@cross_origin()
def add_like():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    if not data or not data.get("user_id") or not data.get("track_name"):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        like = Like(
            track_name=data.get("track_name"),
            artist=data.get("artist"),
            spotify_url=data.get("spotify_url"),
            user_id=data.get("user_id")
        )
        db.session.add(like)
        db.session.commit()
        return jsonify({"message": "Track liked successfully"}), 200
    except Exception as e:
        print("Error in /api/likes:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/create_test_user', methods=['POST'])
@cross_origin()
def create_test_user():
    try:
        user = User(
            clerk_id="test_clerk",
            full_name="Test User",
            email="test@example.com",
            favoriteGenre="pop"
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "Test user created", "user_id": user.id}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
