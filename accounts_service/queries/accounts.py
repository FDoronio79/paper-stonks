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


<<<<<<< HEAD
class AccountQueries():
    def get(self, email: str) -> AccountOutWithPassword:
        pass
=======
# class AccountQueries():

#     def get(self, email: str) -> AccountOutWithPassword:
#         pass
>>>>>>> 66e5375fec586e5ae4152f8868d30a7cab6d60d1

#     def create(self, info: AccountIn, hashed_password: str) -> AccountOutWithPassword:
#         props = info.dict()
#         props["password"] = hashed_password
#         props["roles"] = RobotFileParser
#         try:
#             with pool.connection() as conn:
#                 # get a cursor (something to run SQL with)
#                 with conn.cursor() as db:
#                     # run our INSERT statement
#                     result = db.execute(
#                         """
#                         INSERT INTO accounts
#                             (email, username, hashed_pass, buying_power)
#                         VALUES
#                             (%s, %s, %s, %s)
#                         RETURNING id;
#                         """,
#                         [

#                         ]
#                     )
#                     id = result.fetchone()[0]
#                     # return new data
#                     return self.vacation_in_to_out(id, vacation)
#             # insert into database
#         except Exception as e:
#             print(e)
#             return DuplicateAccountError()

class AccountQueries():
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
                id =result.fetchone()[0]
                #return new data
                old_data = account.dict()
                return AccountOutWithPassword(id=id, **old_data)