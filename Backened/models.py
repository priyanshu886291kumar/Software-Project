# models.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Create an instance of SQLAlchemy
db = SQLAlchemy()

# User model
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    clerk_id = db.Column(db.String(128), unique=True, nullable=False)
    full_name = db.Column(db.String(128))
    email = db.Column(db.String(128), unique=True)
    favoriteGenre = db.Column(db.String(64))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relationships:
    emotions = db.relationship("EmotionHistory", backref="user", lazy=True)
    favorites = db.relationship("FavoriteTrack", backref="user", lazy=True)
    playlists = db.relationship("Playlist", backref="user", lazy=True)
    ratings = db.relationship("Rating", backref="user", lazy=True)
    likes = db.relationship("Like", backref="user", lazy=True)

# Emotion History model
class EmotionHistory(db.Model):
    __tablename__ = 'emotion_history'
    id = db.Column(db.Integer, primary_key=True)
    emotion = db.Column(db.String(64), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

# Favorite Track model
class FavoriteTrack(db.Model):
    __tablename__ = 'favorite_tracks'
    id = db.Column(db.Integer, primary_key=True)
    track_name = db.Column(db.String(128), nullable=False)
    artist = db.Column(db.String(128))
    spotify_url = db.Column(db.String(256))
    added_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

# Playlist model
class Playlist(db.Model):
    __tablename__ = 'playlists'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tracks = db.relationship("PlaylistTrack", backref="playlist", lazy=True)

# Playlist Track model
class PlaylistTrack(db.Model):
    __tablename__ = 'playlist_tracks'
    id = db.Column(db.Integer, primary_key=True)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlists.id'), nullable=False)
    track_name = db.Column(db.String(128), nullable=False)
    artist = db.Column(db.String(128))
    spotify_url = db.Column(db.String(256))
    added_at = db.Column(db.DateTime, default=datetime.utcnow)

# Rating model
class Rating(db.Model):
    __tablename__ = 'ratings'
    id = db.Column(db.Integer, primary_key=True)
    track_name = db.Column(db.String(128), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # e.g., 1 to 5 stars
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

# Like model
class Like(db.Model):
    __tablename__ = 'likes'
    id = db.Column(db.Integer, primary_key=True)
    track_name = db.Column(db.String(128), nullable=False)
    artist = db.Column(db.String(128))
    spotify_url = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)



# # models.py
# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime

# # Create an instance of SQLAlchemy
# db = SQLAlchemy()

# # User model – stores basic user info
# class User(db.Model):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key=True)
#     clerk_id = db.Column(db.String(128), unique=True, nullable=False)
#     full_name = db.Column(db.String(128))
#     email = db.Column(db.String(128), unique=True)
#     favoriteGenre = db.Column(db.String(64))
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     # Relationship to likes
#     likes = db.relationship("Like", backref="user", lazy=True)

# # Like model – stores information when a user likes a track
# class Like(db.Model):
#     __tablename__ = 'likes'
#     id = db.Column(db.Integer, primary_key=True)
#     track_name = db.Column(db.String(128), nullable=False)
#     artist = db.Column(db.String(128))
#     spotify_url = db.Column(db.String(256))
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
