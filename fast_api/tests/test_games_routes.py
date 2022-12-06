import json
from fastapi.testclient import TestClient
from main import app
from db import GameQueries
from routers.auth import authenticator

client = TestClient(app)  # replacing swagger in code


class GameQueriesMock:
    def get_games(self):
        return []

    def create_game(self, user_id, game):
        response = {"id": 156, "user": {"id": user_id, "username": "waylen"}}
        response.update(game)
        return response


def test_list_games():
    # arrange
    app.dependency_overrides[GameQueries] = GameQueriesMock

    # act
    response = client.get("/api/games")
    # assert
    # 1. get a 200
    assert response.status_code == 200
    # 2. should *call* queries.get_games()
    assert response.json() == {"games": []}

    # cleanup
    app.dependency_overrides = {}


def test_create_game():
    app.dependency_overrides[GameQueries] = GameQueriesMock
    user = {"id": 123, "username": "waylen"}
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: user
    game = {
        "date": "2022-12-01",
        "category": "Random",
        "difficulty": "Mixed",
        "points": 150
    }
    response = client.post("/api/games", json.dumps(game))

    assert response.status_code == 200
    assert response.json()["category"] == "Random"
    assert response.json()["user"]["id"] == 123
