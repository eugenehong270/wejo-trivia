from fastapi import FastAPI

from routers import users, games

app = FastAPI()

app.include_router(users.router)
app.include_router(games.router)
