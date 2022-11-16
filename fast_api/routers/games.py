from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel
from datetime import date

from db import GameQueries
from routers.users import UserOut

router = APIRouter()

class GameIn(BaseModel):
    date: date
    category: str
    difficulty: str
    points: int
    user_id: int

class GameOut(BaseModel):
    id: int
    date: date
    category: str
    difficulty: str
    points: int
    user_id: int

class GamesOut(BaseModel):
    games: list[GameOut]


@router.get("/api/games/{game_id}", response_model=GameOut)
def get_game(
    game_id: int,
    response: Response,
    queries: GameQueries = Depends(),
):
    record = queries.get_game(game_id)
    if record is None:
        response.status_code = 404
    else:
        return record

@router.get("/api/games", response_model=GamesOut)
def get_games(queries: GameQueries = Depends()):
    return {"games": queries.get_games()}


@router.post("/api/games", response_model=GameOut)
def create_game(
    game: GameIn,
    queries: GameQueries = Depends(),
):
    return queries.create_game(game)

@router.delete("/api/games/{game_id}", response_model=bool)
def delete_game(game_id: int, queries: GameQueries = Depends()):
    queries.delete_game(game_id)
    return True
