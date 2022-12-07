from fastapi.testclient import TestClient
from main import app
from routers.auth import authenticator

client = TestClient(app)


def test_get_token_returns_none_for_user_not_logged_in():
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: None
    response = client.get("/token")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() is None


def test_get_token_returns_token_for_user_logged_in():
    user = {"id": 123, "username": "waylen"}
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: user
    response = client.get(
        "/token", cookies={authenticator.cookie_name: "HELLO!"}
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"] == "HELLO!"
    assert data["user"] == user
    assert data["token_type"] == "Bearer"
