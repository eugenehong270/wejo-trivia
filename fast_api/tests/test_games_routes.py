import json
from fastapi.testclient import TestClient
from main import app
from db import GameQueries

client = TestClient(app)  # replacing swagger in code


class GameQueriesMock:
    def get_games(self):
        return []

    def create_game(self, game):
        response = {
            "id": 1337,
            "user": {
                'id': 10,
                'username': 'Goofy'
            }
        }
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
    game = {
        'date': '2022-12-01',
        'category': 'Random',
        'difficulty': 'Mixed',
        'points': 150
    }
    response = client.post('/api/trucks', json.dumps(game))

    assert response.status_code == 200
    assert response.json()['category'] == 'Random'
    assert response.json()['user']['id'] == 10
