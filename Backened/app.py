




    

# from flask import Flask, jsonify, request
# from flask_cors import CORS, cross_origin
# import cv2
# import time
# from deepface import DeepFace
# from spotify_service import get_recommendations_by_emotion

# # Import SQLAlchemy models and Flask-Migrate
# from models import db, User, EmotionHistory, FavoriteTrack, Playlist, PlaylistTrack, Rating, Like
# from flask_migrate import Migrate

# # from stripe_service import create_checkout_session
# from razorpay_service import create_checkout_session

# # Import pg8000 for PostgreSQL connection
# import pg8000

# # from emotion_detector import EmotionDetector
# # detector = EmotionDetector()


# app = Flask(__name__)

# # Global CORS configuration: allow all origins (adjust as needed)
# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# # Test the PostgreSQL connection using pg8000 directly
# try:
#     conn = pg8000.connect(
#         database="moodscape_db",
#         user="postgres",
#         password="password",
#         host="localhost",
#         port=5432
#     )
#     print("Database connected successfully!")
#     conn.close()
# except Exception as e:
#     print("Database connection failed:", e)



# # Initialize the database and migration tool
# db.init_app(app)
# migrate = Migrate(app, db)

# @app.route('/test', methods=['GET'])
# @cross_origin()
# def test_endpoint():
#     try:
#         return jsonify({
#             "message": "Test endpoint is working!",
#             "status": "success"
#         }), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500



# @app.route('/api/emotion', methods=['POST', 'OPTIONS'])
# @cross_origin()
# def get_emotion():
#     # Handle preflight
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


# # @app.route('/api/emotion', methods=['POST'])
# # @cross_origin()
# # def get_emotion():
# #     try:
# #         data = request.get_json()
# #         if not data or 'image' not in data:
# #             return jsonify({'error': 'No image provided'}), 400

# #         image_data = data['image']
# #         # Use the TensorFlow-based detector instead of DeepFace
# #         result = detector.process_base64_image(image_data)
# #         if "error" in result:
# #             return jsonify({"error": result["error"]}), 400
# #         return jsonify({"emotion": result["emotion"]})
# #     except Exception as e:
# #         return jsonify({"error": str(e)}), 500



# @app.route('/api/recommendations', methods=['GET'])
# @cross_origin()
# def recommendations():
#     emotion = request.args.get("emotion", "neutral")
#     try:
#         recs = get_recommendations_by_emotion(emotion)
#         return jsonify({"tracks": recs})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500



# @app.route('/api/likes', methods=['POST', 'OPTIONS'])
# @cross_origin()
# def add_like():
#     if request.method == 'OPTIONS':
#         return jsonify({}), 200

#     data = request.get_json()
#     if not data or not data.get("user_id") or not data.get("track_name"):
#         return jsonify({"error": "Missing required fields"}), 400

#     try:
#         like = Like(
#             track_name=data.get("track_name"),
#             artist=data.get("artist"),
#             spotify_url=data.get("spotify_url"),
#             user_id=data.get("user_id")
#         )
#         db.session.add(like)
#         db.session.commit()
#         return jsonify({"message": "Track liked successfully"}), 200
#     except Exception as e:
#         print("Error in /api/likes:", e)
#         return jsonify({"error": str(e)}), 500



# @app.route('/api/create_test_user', methods=['POST'])
# @cross_origin()
# def create_test_user():
#     try:
#         user = User(
#             clerk_id="test_clerk",
#             full_name="Test User",
#             email="test@example.com",
#             favoriteGenre="pop"
#         )
#         db.session.add(user)
#         db.session.commit()
#         return jsonify({"message": "Test user created", "user_id": user.id}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


# # NEW: Endpoint for creating a Stripe Checkout Session
# @app.route('/api/create-checkout-session', methods=['POST'])
# @cross_origin()
# def create_checkout_session_endpoint():
#     data = request.get_json()
#     # For simplicity, we'll use a fixed amount; in real-life, you might use data from the request.
#     try:
#         amount = int(data.get("amount", 999))  # Amount in paise
#     except Exception as e:
#         return jsonify({"error": "Invalid amount"}), 400
#     try:
#         order = create_checkout_session(amount)
#         return jsonify(order), 200  # Return the order details, including order id, amount, currency, etc.
#     except Exception as e:
#         print("Error creating checkout session:", e)
#         return jsonify({"error": str(e)}), 500


# if __name__ == '__main__':
#     app.run(debug=True, port=5000)











# from flask import Flask, jsonify, request
# from flask_cors import CORS, cross_origin
# import cv2
# import base64
# import numpy as np
# import time
# from deepface import DeepFace
# from spotify_service import get_recommendations_by_emotion
# from models import db, User, EmotionHistory, FavoriteTrack, Playlist, PlaylistTrack, Rating, Like
# from flask_migrate import Migrate
# from razorpay_service import create_checkout_session
# import pg8000

# app = Flask(__name__)

# # Enable CORS for all routes
# CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# # Database connection check
# try:
#     conn = pg8000.connect(
#         database="moodscape_db",
#         user="postgres",
#         password="password",
#         host="localhost",
#         port=5433
#     )



#     print("Database connected successfully!")
#     conn.close()
# except Exception as e:
#     print("Database connection failed:", e)

# # Initialize the database and migration tool
# db.init_app(app)
# migrate = Migrate(app, db)

# @app.route('/test', methods=['GET'])
# @cross_origin()
# def test_endpoint():
#     return jsonify({"message": "Test endpoint is working!", "status": "success"}), 200

# @app.route('/api/emotion', methods=['POST', 'OPTIONS'])
# @cross_origin()
# def get_emotion():
#     if request.method == 'OPTIONS':
#         return jsonify({}), 200

#     try:
#         data = request.get_json()
#         if not data or 'image' not in data:
#             return jsonify({'error': 'No image provided'}), 400

#         image_data = data['image']
#         _, encoded = image_data.split(',', 1) if image_data.startswith('data:image') else ('', image_data)
        
#         decoded = base64.b64decode(encoded)
#         np_arr = np.frombuffer(decoded, np.uint8)
#         frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
#         if frame is None:
#             return jsonify({'error': 'Failed to decode image'}), 400

#         result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
#         dominant_emotion = result[0].get('dominant_emotion', 'Unknown') if isinstance(result, list) else 'Unknown'
        
#         return jsonify({'emotion': dominant_emotion})
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

# @app.route('/api/recommendations', methods=['GET'])
# @cross_origin()
# def recommendations():
#     emotion = request.args.get("emotion", "neutral")
#     try:
#         recs = get_recommendations_by_emotion(emotion)
#         return jsonify({"tracks": recs})
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/api/likes', methods=['POST', 'OPTIONS'])
# @cross_origin()
# def add_like():
#     if request.method == 'OPTIONS':
#         return jsonify({}), 200

#     data = request.get_json()
#     if not data or not data.get("user_id") or not data.get("track_name"):
#         return jsonify({"error": "Missing required fields"}), 400

#     try:
#         like = Like(
#             track_name=data.get("track_name"),
#             artist=data.get("artist"),
#             spotify_url=data.get("spotify_url"),
#             user_id=data.get("user_id")
#         )
#         db.session.add(like)
#         db.session.commit()
#         return jsonify({"message": "Track liked successfully"}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/api/create_test_user', methods=['POST'])
# @cross_origin()
# def create_test_user():
#     try:
#         user = User(
#             clerk_id="test_clerk",
#             full_name="Test User",
#             email="test@example.com",
#             favoriteGenre="pop"
#         )
#         db.session.add(user)
#         db.session.commit()
#         return jsonify({"message": "Test user created", "user_id": user.id}), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/api/create-checkout-session', methods=['POST'])
# @cross_origin()
# def create_checkout_session_endpoint():
#     data = request.get_json()
#     try:
#         amount = int(data.get("amount", 999))
#         order = create_checkout_session(amount)
#         return jsonify(order), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# if __name__ == '__main__':
#     app.run(debug=True, port=5000)




# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import cv2
import time
import base64
import numpy as np
from deepface import DeepFace
from spotify_service import get_recommendations_by_emotion
from models import db, User, EmotionHistory, FavoriteTrack, Playlist, PlaylistTrack, Rating, Like, Dislike, Save
from flask_migrate import Migrate
from razorpay_service import create_checkout_session
import os
from sqlalchemy.exc import IntegrityError

# Create Flask application
app = Flask(__name__)

# Enable CORS for all routes with credentials support
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# --- Configure Database Connection ---
# Modified: Using PostgreSQL with pg8000 driver on port 5433 and database "music_app"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+pg8000://postgres:password@localhost:5433/music_app'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['TESTING'] = True
# Initialize SQLAlchemy and Flask-Migrate
db.init_app(app)
migrate = Migrate(app, db)

# Set debug mode from environment variable (default is False)
debug_mode = os.getenv("FLASK_DEBUG", "false").lower() == "true"

# --- Test PostgreSQL connection ---
try:
    # This uses pg8000 to check the connection manually.
    import pg8000
    conn = pg8000.connect(
        database="music_app",
        user="postgres",
        password="password",
        host="localhost",
        port=5433
    )
    print("Database connected successfully!")
    conn.close()
except Exception as e:
    print("Database connection failed:", e)

# --- Routes ---

@app.route('/test', methods=['GET'])
@cross_origin()
def test_endpoint():
    # Simple endpoint to verify the API is working
    return jsonify({"message": "Test endpoint is working!", "status": "success"}), 200

@app.route('/api/emotion', methods=['POST', 'OPTIONS'])
@cross_origin()
def get_emotion():
    # Handle preflight requests
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    try:
        data = request.get_json()
        # Validate that image data is provided
        if not data or 'image' not in data:
            return jsonify({'error': 'No image provided'}), 400

        image_data = data['image']
        # If the image data starts with data:image, split off the header
        _, encoded = image_data.split(',', 1) if image_data.startswith('data:image') else (None, image_data)
        decoded = base64.b64decode(encoded)
        np_arr = np.frombuffer(decoded, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if frame is None:
            return jsonify({'error': 'Failed to decode image'}), 400

        # Use DeepFace to analyze the image for emotion
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        # If result is a list, use the first element; otherwise, use the dict directly
        dominant_emotion = result[0].get('dominant_emotion', 'Unknown') if isinstance(result, list) else result.get('dominant_emotion', 'Unknown')
        
        return jsonify({'emotion': dominant_emotion})
    except Exception as e:
        # Return error details for debugging
        return jsonify({'error': str(e)}), 500

@app.route('/api/recommendations', methods=['GET'])
@cross_origin()
def recommendations():
    # Retrieve the emotion from query parameters
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
    # Validate required fields for like
    if not data or not data.get("user_id") or not data.get("track_name"):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        like = Like(
            track_name=data.get("track_name"),
            artist=data.get("artist", ""),  # Default empty if not provided
            spotify_url=data.get("spotify_url", ""),
            user_id=data.get("user_id")
        )
        db.session.add(like)
        db.session.commit()
        return jsonify({"message": "Track liked successfully"}), 200
    except Exception as e:
        print("Error in /api/likes:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/dislikes', methods=['POST', 'OPTIONS'])
@cross_origin()
def add_dislike():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    # Validate required fields for dislike
    if not data or not data.get("user_id") or not data.get("track_name"):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        dislike = Dislike(
            track_name=data.get("track_name"),
            artist=data.get("artist", ""),
            spotify_url=data.get("spotify_url", ""),
            user_id=data.get("user_id")
        )
        db.session.add(dislike)
        db.session.commit()
        return jsonify({"message": "Track disliked successfully"}), 200
    except Exception as e:
        print("Error in /api/dislikes:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/api/saves', methods=['POST', 'OPTIONS'])
@cross_origin()
def add_save():
    if request.method == 'OPTIONS':
        return jsonify({}), 200

    data = request.get_json()
    # Validate required fields for save
    if not data or not data.get("user_id") or not data.get("track_name"):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        save = Save(
            track_name=data.get("track_name"),
            artist=data.get("artist", ""),
            spotify_url=data.get("spotify_url", ""),
            user_id=data.get("user_id")
        )
        db.session.add(save)
        db.session.commit()
        return jsonify({"message": "Track saved successfully"}), 200
    except Exception as e:
        print("Error in /api/saves:", e)
        return jsonify({"error": str(e)}), 500



@app.route('/api/create_test_user', methods=['POST'])
@cross_origin()
def create_test_user():
    try:
        # Get data from the request payload
        data = request.get_json()
        clerk_id = data.get("clerk_id")
        full_name = data.get("full_name")
        email = data.get("email")
        favoriteGenre = data.get("favoriteGenre", "pop")  # Default to "pop" if not provided

        print("Processing email:", email)  # Debugging: Log the email

        # Check if the user already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            return jsonify({"message": "User already exists", "user_id": existing_user.id}), 200

        # Create a new user with dynamic values
        user = User(
            clerk_id=clerk_id,
            full_name=full_name,
            email=email,
            favoriteGenre=favoriteGenre
        )
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created successfully", "user_id": user.id}), 200

    except IntegrityError as e:
        db.session.rollback()
        print("IntegrityError:", str(e))  # Debugging: Log the error
        return jsonify({"error": "A user with this email already exists."}), 400
    except Exception as e:
        db.session.rollback()
        print("Unexpected Error:", str(e))  # Debugging: Log the error
        return jsonify({"error": str(e)}), 500



@app.route('/api/create-checkout-session', methods=['POST'])
@cross_origin()
def create_checkout_session_endpoint():
    data = request.get_json()
    try:
        # Get amount from request data; default to 999 paise if not provided.
        amount = int(data.get("amount", 999))
    except Exception as e:
        return jsonify({"error": "Invalid amount"}), 400
    try:
        order = create_checkout_session(amount)
        return jsonify(order), 200  # Return order details (order id, amount, etc.)
    except Exception as e:
        print("Error creating checkout session:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app using the debug mode based on environment variable.
    app.run(debug=debug_mode, port=5000)










