from urllib.robotparser import RobotFileParser
from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    username: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    username: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries():

    def get(self, username: str) -> Optional[AccountOutWithPassword]:
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    SELECT id, email, full_name, username, hashed_pass
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username]
                )
                account = result.fetchone()
                print("ACCOUNT: ", account)
                if account == None:
                    return None
                else:
                    return AccountOutWithPassword(
                        id=account[0],
                        email=account[1],
                        full_name=account[2],
                        username=account[3],
                        hashed_password=account[4]
                    )

    def create(self, account: AccountIn, hashed_pass) -> AccountOutWithPassword:
        with pool.connection() as conn:
            #                 # get a cursor (something to run SQL with)
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO accounts
                        (email, full_name, username, hashed_pass, buying_power)
                    VALUES
                        (%s, %s, %s, %s, %s)
                    RETURNING id;                       
                    """,
                    [
                        account.email,
                        account.full_name,
                        account.username,
                        hashed_pass,
                        "$0.00",
                    ]
                )
                id = result.fetchone()[0]
                print("id", id)
                # return new data
                old_data = account.dict()
                return AccountOutWithPassword(id=id, hashed_password=hashed_pass, **old_data)
