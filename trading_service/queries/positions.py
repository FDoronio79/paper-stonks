from pydantic import BaseModel
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class PositionsIn(BaseModel):
    username: str
    symbol: str
    name: str
    quantity: float
    type_of: str


class PositionsOut(BaseModel):
    id: int
    username: str
    symbol: str
    name: str
    quantity: float
    type_of: str


class PositionRepository:
    def get_one(self, username: str, position_symbol: str) -> Optional[PositionsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, symbol, name, quantity, type_of
                        FROM positions
                        WHERE symbol = %s AND username = %s
                        """,
                        [position_symbol, username]
                    )
                    record = result.fetchone()
                    position = PositionsOut(
                        id=record[0],
                        username=record[1],
                        symbol=record[2],
                        name=record[3],
                        quantity=record[4],
                        type_of=record[5]
                    )
                return position
        except Exception as e:
            print(e)
            return {"error": "Could not get that position"}

    def create(self, position: PositionsIn) -> PositionsOut:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO positions
                            (username, symbol, name, quantity, type_of)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            position.username,
                            position.symbol,
                            position.name,
                            position.quantity,
                            position.type_of
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    old_data = position.dict()
                    return PositionsOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create position"}

    def get_all(self, username: str) -> Union[Error, List[PositionsOut]]:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                            SELECT id, username, symbol, name, quantity, type_of
                            FROM positions
                            WHERE username = %s
                            ORDER BY id;
                            """, [username]
                    )
                    result = []  # can rewrite at list comprehension
                    for record in db:
                        print(record)
                        position = PositionsOut(
                            id=record[0],
                            username=record[1],
                            symbol=record[2],
                            name=record[3],
                            quantity=record[4],
                            type_of=record[5],
                        )
                        result.append(position)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all positions"}

    def delete(self, position_symbol: str, username: str) -> bool:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    db.execute(
                        """
                        DELETE FROM positions
                        WHERE symbol = %s AND username = %s
                        """,
                        [position_symbol, username]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(self, position: PositionsIn) -> Union[PositionsOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE positions
                        SET quantity = %s

                        WHERE symbol = %s AND username = %s
                        RETURNING id, username, symbol, name, quantity, type_of
                        """,
                        [
                            position.quantity,
                            position.symbol,
                            position.username,
                        ]
                    )
                    record = result.fetchone()
                    print(record)
                    return PositionsOut(
                        id=record[0],
                        username=record[1],
                        symbol=record[2],
                        name=record[3],
                        quantity=record[4],
                        type_of=record[5],
                    )

        except Exception as e:
            print(e)
            return {"message": "Could not edit that position"}

    def position_in_to_out(self, id: int, position: PositionsIn):
        old_data = position.dict()
        return PositionsOut(id=id, **old_data)
