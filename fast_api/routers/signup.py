from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from .auth import authenticator

from pydantic import BaseModel

from .users import UserIn, UserOut, DuplicateUserError

from db import UserQueries


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    user: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.post("/api/users", response_model=UserToken | HttpError)
async def create_user(
    data: UserIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
):
    # converting the user's inputted password into a hashed password
    hashed_password = authenticator.hash_password(data.password)
    try:
        user = queries.create_user(data, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )
    form = UserForm(username=data.username, password=data.password)
    token = await authenticator.login(response, request, form, queries)
    return UserToken(user=user, **token.dict())

@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    user: dict = Depends(authenticator.try_get_current_account_data)
) -> UserToken | None:
    if user and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "user": user
        }
