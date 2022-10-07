# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries, AccountOut, AccountIn


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

<<<<<<< HEAD
    def get_hashed_password(self, account: AccountIn):
=======
    def get_hashed_password(self, account: AccountOut):
>>>>>>> 66e5375fec586e5ae4152f8868d30a7cab6d60d1
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountIn):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
