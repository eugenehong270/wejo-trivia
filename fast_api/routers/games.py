from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from datetime import date
from .auth import authenticator

from db import GameQueries
from routers.users import UserOut

router = APIRouter()


class GameIn(BaseModel):
    date: date
    category: str
    difficulty: str
    points: int


class GameOut(BaseModel):
    id: int
    date: date
    category: str
    difficulty: str
    points: int
    user: UserOut


class GamesOut(BaseModel):
    games: list[GameOut]


class GameStatsOut(BaseModel):
    user_id: int
    avg_score: int
    total_games: int
    highest_score: int


@router.get("/api/games/{game_id}", response_model=GameOut)
def get_game(
    game_id: int,
    response: Response,
    queries: GameQueries = Depends(),
):
    game = queries.get_game(game_id)
    if game is None:
        response.status_code = 404
    else:
        return game


@router.get("/api/games", response_model=GamesOut)
def get_games(queries: GameQueries = Depends()):
    return {"games": queries.get_games()}


@router.get("/api/user/games", response_model=GamesOut)
def get_user_games(
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: GameQueries = Depends(),
):
    return {"games": queries.get_user_games(account_data.get("id"))}


@router.get("/api/user/stats", response_model=GameStatsOut)
def get_user_stats(
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: GameQueries = Depends(),
):
    record = queries.get_user_stats(account_data.get("id"))
    return record


@router.post("/api/games", response_model=GameOut)
def create_game(
    game: GameIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: GameQueries = Depends(),
):
    return queries.create_game(account_data.get("id"), game)


@router.delete("/api/games/{game_id}", response_model=bool)
def delete_game(game_id: int, queries: GameQueries = Depends()):
    queries.delete_game(game_id)
    return True
