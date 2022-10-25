from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.accountsvo import (
    AccountVOIn,
    AccountVOOut,
    Error,
    AccountVORepository,
)

router = APIRouter()


@router.post("/api/accountsvo", response_model=Union[AccountVOOut, Error])
def create_accountvo(
    accountvo: AccountVOIn,
    response: Response,
    repo: AccountVORepository = Depends(),
):
    return repo.create(accountvo)
