from fastapi import FastAPI
from authenticator import authenticator
from routers import users, games, signup

app = FastAPI()

app.include_router(authenticator.router)
app.include_router(users.router)
app.include_router(games.router)
app.include_router(signup.router)
