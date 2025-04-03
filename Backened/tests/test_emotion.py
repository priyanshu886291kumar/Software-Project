import pytest
import base64
from io import BytesIO
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_emotion_no_image(client):
    """Test API response when no image is provided"""
    response = client.post('/api/emotion', json={})
    assert response.status_code == 400
    assert response.json['error'] == "No image provided"

def test_emotion_invalid_image(client):
    """Test API response for invalid image data"""
    response = client.post('/api/emotion', json={"image": "invalid_base64"})
    assert response.status_code == 400
    assert response.json['error'] == "Failed to decode image"

def test_emotion_valid_image(client):
    """Test API response for a valid image"""
    with open("tests/sample.jpg", "rb") as image_file:
        base64_image = base64.b64encode(image_file.read()).decode("utf-8")
    
    response = client.post('/api/emotion', json={"image": base64_image})
    assert response.status_code == 200
    assert "emotion" in response.json
