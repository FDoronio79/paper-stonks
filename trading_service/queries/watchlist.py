from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union


class Error(BaseModel):
    message: str


class WatchlistIn(BaseModel):
    symbol: str


class WatchlistOut(BaseModel):
    id: int
    symbol: str


class WatchlistRepository:
    def create(self, username: str, watchlist: WatchlistIn) -> WatchlistOut:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO watchlist
                            (username, symbol)
                        VALUES
                            (%s, %s)
                        RETURNING id;
                        """,
                        [
                            username,
                            watchlist.symbol,
                        ],
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    old_data = watchlist.dict()
                    return WatchlistOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create watchlist"}

    def get_all(self, username: str) -> Union[Error, List[WatchlistOut]]:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                            SELECT id, username, symbol
                            FROM watchlist
                            WHERE username = %s
                            ORDER BY id;
                            """,
                        [username],
                    )
                    result = []  # can rewrite at list comprehension
                    for record in db:
                        print(record)
                        watchlist = WatchlistOut(
                            id=record[0],
                            username=record[1],
                            symbol=record[2],
                        )
                        result.append(watchlist)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all watchlist symbols"}

    def delete(self, watchlist_symbol: str, username: str) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        """
                        DELETE FROM watchlist
                        WHERE symbol = %s AND username = %s
                        """,
                        [watchlist_symbol, username],
                    )
                    return True
        except Exception as e:
            print(e)
            return False
