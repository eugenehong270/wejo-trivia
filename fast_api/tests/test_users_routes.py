import json
from fastapi.testclient import TestClient
from main import app
from db import UserQueries

client = TestClient(app)


class UserQueriesMock:
    def create_user(self, user):
        response = {"id": 4567, "username": "Ovwa"}
        response.update(user)
        return response


def test_create_user():
    # Arrange
    app.dependency_overrides[UserQueries] = UserQueriesMock
    user = {
        "username": "Trivia God",
        "password": "123456",
    }

    # Act
    response = client.post("/api/users", json.dumps(user))
    # Assert
    # 1. get a 200
    # 2. should *call* queries.create_user
    assert response.status_code == 200
    assert response.json()["username"] == "Trivia God"
