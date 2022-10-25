from unicodedata import numeric
from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class AccountVOIn(BaseModel):
    username: str


class AccountVOOut(BaseModel):
    username: str


class AccountVORepository(BaseModel):
    def create(self, accountvo: AccountVOIn) -> AccountVOOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO accounts
                            (username)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [accountvo.username],
                    )
                    id = result.fetchone()[0]
                    old_data = accountvo.dict()
                    return AccountVOOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create accountvo"}
