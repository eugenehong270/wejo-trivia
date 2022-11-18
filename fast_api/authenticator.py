import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from routers.users import UserIn, UserOut
from db import UserQueries


class UserAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: UserQueries,
    ):
        return users.get_user(username)

    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        return users

    def get_hashed_password(self, user: UserIn):
        return user.get("password")

    def get_account_data_for_cookie(self, user: UserIn):
        return user.get("username"), UserOut(**user)


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
