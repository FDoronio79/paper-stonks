from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.watchlist import (
    WatchlistIn,
    WatchlistOut,
    Error,
    WatchlistRepository,
)
from authenticator import authenticator

router = APIRouter()


@router.post("/watchlist", response_model=Union[WatchlistOut, Error])
def add_to_watchlist(
    watchlist: WatchlistIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
):
    print(account_data["username"])
    watchlist_response = repo.add(
        username=account_data["username"], watchlist=watchlist)
    if isinstance(watchlist_response, Error):
        response.status_code = 400
    return watchlist_response


@router.get("/watchlist", response_model=Union[Error, List[WatchlistOut]])
def get_all(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
):
    return repo.get_all(username=account_data["username"])


@router.delete("/watchlist/{watchlist_symbol}", response_model=bool)
def delete_watchlist_symbol(
    watchlist_symbol: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
) -> bool:
    return repo.delete(username=account_data["username"], watchlist_symbol=watchlist_symbol)


@router.get("/watchlist/{watchlist_symbol}", response_model=bool)
def check_watchlist_for_symbol(
    watchlist_symbol: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
) -> bool:
    return repo.check_watchlist(username=account_data["username"], watchlist_symbol=watchlist_symbol)
