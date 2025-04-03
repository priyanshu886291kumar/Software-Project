import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_recommendations_missing_emotion(client):
    """Test response when no emotion is provided"""
    response = client.get('/api/recommendations')
    assert response.status_code == 400
    assert response.json['error'] == "Emotion parameter is missing"



def test_recommendations_valid_emotion(client):
    """Test response for a valid emotion"""
    response = client.get('/api/recommendations?emotion=happy')
    assert response.status_code == 200
    assert isinstance(response.json['tracks'], list)
