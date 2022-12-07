import json
from fastapi.testclient import TestClient
from main import app
from db import UserQueries

client = TestClient(app)


class UserQueriesMock:
    def get_user(self, username):
        response = {
            "id": 9876,
            "username": username,
            "hash": "$2b$12$ypo/y5z324bpRx9Nh.VRF.tklSBEIVfPUOOez1ujd8HJLUEuoZgue",
        }
        return response

    def create_user(self, data, hash_password):
        response = {"id": 4567, "username": data.username}
        return response


def test_create_user():
    # Arrange
    app.dependency_overrides[UserQueries] = UserQueriesMock
    user = {
        "username": "Trivia God",
        "password": "Cheese",
    }

    # Act
    response = client.post("/api/users", json.dumps(user))
    # Assert
    # 1. get a 200
    # 2. should *call* queries.create_user
    assert response.status_code == 401
