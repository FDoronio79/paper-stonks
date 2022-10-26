from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.transactions import (
    TransactionIn,
    TransactionRepository,
    TransactionOut,
    Error,
)
from authenticator import authenticator

router = APIRouter()


@router.post("/transactions", response_model=Union[TransactionOut, Error])
def create_transaction(
    transaction: TransactionIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TransactionRepository = Depends(),
):

    return repo.create(transaction)


@router.get("/transactions", response_model=Union[Error, List[TransactionOut]])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TransactionRepository = Depends(),
):
    return repo.get_all(account_data["username"])
