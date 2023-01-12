from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class WatchlistIn(BaseModel):
    username: str
    symbols: set[str] = set()


class WatchlistOut(BaseModel):
    id: int
    username: str
    symbols: set[str] = set()


class WatchlistRepository:
    def create(self, watchlist: WatchlistIn) -> WatchlistOut:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO watchlist
                            (username, symbols)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            watchlist.username,
                            watchlist.symbols,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    old_data = watchlist.dict()
                    return WatchlistOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create watchlist"}

    def get_one(self, username: str) -> Union[WatchlistOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, symbols
                        FROM watchlist
                        WHERE username = %s
                        """,
                        [username],
                    )
                    record = result.fetchone()
                    watchlist = WatchlistOut(
                        id=record[0],
                        username=record[1],
                        symbols=record[2],
                    )
                return watchlist
        except Exception as e:
            print(e)
            return Error(message="Could not find a position")

    def delete(self, username: str, symbols: set[str] = set()) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        """
                        DELETE FROM watchlist
                        WHERE username = %s AND symbols = %s  
                        """,
                        [username, symbols],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
