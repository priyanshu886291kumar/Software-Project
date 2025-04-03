import pytest
from app import app

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client



def test_like_missing_fields(client):
    """Test response when user_id or track_id is missing"""
    response = client.post('/api/likes', json={"user_id": "123"})
    assert response.status_code == 400
    assert response.json['error'] == "Track ID is required"





def test_like_valid(client):
    """Test a valid like request"""
    response = client.post('/api/likes', json={"user_id": "123", "track_id": "456"})
    assert response.status_code == 201
    assert response.json['message'] == "Like added successfully"




