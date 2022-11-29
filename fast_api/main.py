import os
from fastapi import FastAPI
from routers.auth import authenticator
from routers import users, games, signup
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    os.environ.get("CORS_HOST", "http://localhost"),
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(authenticator.router)
app.include_router(users.router)
app.include_router(games.router)
app.include_router(signup.router)
