from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from routers.users import (
    UserIn,
    UserOut,
    DuplicateUserError,
)

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
    hashed_password = authenticator.hash_password(data.password)
    try:
        user = queries.create_user(data, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = UserForm(username=data.username, password=data.password)
    token = await authenticator.login(response, request, form, queries)
    return UserToken(user=user, **token.dict())
