import json
from fastapi.testclient import TestClient
from main import app
from db import GameQueries
from routers.auth import authenticator


client = TestClient(app)  # replacing swagger in code


class GameQueriesMock:
    games = []

    def get_games(self):
        return []

    def create_game(self, user_id, game):
        self.games.append(game)
        response = {"id": 156, "user": {"id": user_id, "username": "waylen"}}
        response.update(game)
        return response

    def get_user_games(self, user_id):
        return []
    #Ovidiu
    def get_user_stats(self, user_id):
        highest_score = -1
        total_games = 0
        average_score = 0

        for game in self.games:
            total_games = total_games + 1
            average_score = average_score + game.points
            if highest_score < game.points:
                highest_score = game.points
        average_score = average_score / total_games

        return {
            "user_id": user_id,
            "avg_score": average_score,
            "total_games": total_games,
            "highest_score": highest_score
        }

def test_list_games():
    app.dependency_overrides[GameQueries] = GameQueriesMock
    response = client.get("/api/games")
    assert response.status_code == 200
    assert response.json() == {"games": []}
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
        "points": 150,
    }
    response = client.post("/api/games", json.dumps(game))

    assert response.status_code == 200
    assert response.json()["category"] == "Random"
    assert response.json()["user"]["id"] == 123


def test_list_user_games():
    # Arrange
    app.dependency_overrides[GameQueries] = GameQueriesMock
    user = {"id": 123, "username": "waylen"}
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = lambda: user
    response = client.get("/api/user/games")

    assert response.status_code == 200
    assert response.json() == {"games": []}

    app.dependency_overrides = {}
#Ovidiu
def test_get_user_stats():
    app.dependency_overrides[GameQueries] = GameQueriesMock
    user = {"id": 1213, "username": "Ovidiu"}
    app.dependency_overrides[
    authenticator.get_current_account_data
    ] = lambda: user

    # Added a game
    game_one = {
        "date": "2022-12-01",
        "category": "Random",
        "difficulty": "Mixed",
        "points": 150,
    }

    game_two = {
        "date": "2022-12-01",
        "category": "Random",
        "difficulty": "Mixed",
        "points": 180,
    }

    response = client.post("/api/games", json.dumps(game_one))
    assert response.status_code == 200

    response = client.post("/api/games", json.dumps(game_two))
    assert response.status_code == 200

    _response = client.get("/api/user/stats")

    # Should be 3 games, two from this function, and one from test_create_game():
    assert _response.status_code == 200
    assert _response.json()["avg_score"] == 160
    assert _response.json()["total_games"] == 3
    assert _response.json()["highest_score"] == 180
