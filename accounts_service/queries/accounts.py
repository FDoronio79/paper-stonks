from urllib.robotparser import RobotFileParser
from pydantic import BaseModel
from .client import Queries
from typing import Optional, List, Union
from queries.pool import pool


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountQueries(Queries):

    def get(self, email: str) -> AccountOutWithPassword:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        props = info.dict()
        props["password"] = hashed_password
        props["roles"] = RobotFileParser
        try:
            with pool.connection() as conn:
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (email, username, hashed_pass, buying_power)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [

                        ]
                    )
                    id = result.fetchone()[0]
                    # return new data
                    return self.vacation_in_to_out(id, vacation)
            # insert into database
        except Exception as e:
            print(e)
            return DuplicateAccountError()
