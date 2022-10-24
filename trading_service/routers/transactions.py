from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.transactions import TransactionIn, TransactionRepository, TransactionOut, Error
from authenticator import authenticator
router = APIRouter()


@router.post("/transactions", response_model=Union[TransactionOut, Error])
def create_transaction(transaction: TransactionIn,
                    response: Response,
                    account_data: dict = Depends(
                        authenticator.get_current_account_data),
                    repo: TransactionRepository = Depends()
                    ):

    return repo.create(transaction)


@router.get("/transactions", response_model=Union[Error, List[TransactionOut]])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TransactionRepository = Depends()
):
    return repo.get_all(account_data["username"])


@router.get("/transactions/{transaction_id}", response_model=Optional[TransactionOut])
def get_one_transaction(

    transaction_id: int,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: TransactionRepository = Depends()
) -> TransactionOut:
    return repo.get_one(transaction_id)


# case where you buy and have no position
# case where you're selling but not all
# case where you're selling all, delete
