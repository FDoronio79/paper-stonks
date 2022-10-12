from turtle import position
from unicodedata import name
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
    def get_one(self, position_id: int) -> Optional[PositionsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, symbol, name, quantity, type_of
                        FROM positions
                        WHERE id = %s;
                        """,
                        [position_id]
                    )
                    record = result.fetchone()
                    position = PositionsOut(
                        id=record[0],
                        username=record[1],
                        symbol=record[2],
                        name=record[3],
                        quantity=record[4],
                        type_of=record[5],
                    )
                return position
        except Exception as e:
            print(e)
            return {"message": "Could not get that position"}

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
