from unicodedata import numeric
from pydantic import BaseModel
from datetime import datetime
from queries.pool import pool
from typing import List, Union, Optional


class Error(BaseModel):
    message: str


class TransactionIn(BaseModel):
    username: str
    symbol: str
    price: float
    type_of: str
    quantity: float
    time_of_purchase: datetime


class TransactionOut(BaseModel):
    id: int
    username: str
    symbol: str
    price: float
    type_of: str
    quantity: float
    time_of_purchase: datetime


class TransactionRepository:
    def get_one(self, transaction_id: int) -> Optional[TransactionOut]:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, username, symbol, type_of, time_of_purchase, quantity, price
                        FROM transactions
                        WHERE id = %s ;
                        """,
                        [transaction_id]
                    )
                    record = result.fetchone()
                    transaction = TransactionOut(
                        id=record[0],
                        username=record[1],
                        symbol=record[2],
                        type_of=record[3],
                        time_of_purchase=record[4],
                        quantity=record[5],
                        price=record[6],
                    )
                    # return self.record_to_transaction_out(record)
                    return transaction
        except Exception as e:
            print(e)
            return {"message": "Could no get that transaction"}

    def get_all(self) -> Union[Error, List[TransactionOut]]:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our SELECT statement
                    result = db.execute(
                        """
                        SELECT id, username, symbol, type_of, time_of_purchase, quantity, price
                        FROM transactions
                        ORDER BY time_of_purchase;
                        """
                    )
                    result = []  # can rewrite at list comprehension
                    for record in db:
                        print(record)
                        transaction = TransactionOut(
                            id=record[0],
                            username=record[1],
                            symbol=record[2],
                            type_of=record[3],
                            time_of_purchase=record[4],
                            quantity=record[5],
                            price=record[6],
                        )
                        result.append(transaction)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get all transactions"}

    def create(self, transaction: TransactionIn) -> TransactionOut:
        try:
            # connect the database
            with pool.connection() as conn:  # will create connection
                # get a cursor (something to run SQL with)
                with conn.cursor() as db:
                    # Run our INSERT statement
                    result = db.execute(
                        """
                        INSERT INTO transactions
                            (username, symbol, type_of, time_of_purchase, quantity, price)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            transaction.username,
                            transaction.symbol,
                            transaction.type_of,
                            transaction.time_of_purchase,
                            transaction.quantity,
                            transaction.price
                        ]
                    )
                    id = result.fetchone()[0]
                    # Return new data
                    old_data = transaction.dict()
                    return TransactionOut(id=id, **old_data)
        except Exception as e:
            print(e)
            return {"message": "Could not create transaction"}