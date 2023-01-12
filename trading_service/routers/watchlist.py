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
def create_watchlist(
    watchlist: WatchlistIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
):

    watchlist_response = repo.create(watchlist)
    if isinstance(watchlist_response, Error):
        response.status_code = 400
    return watchlist_response


@router.get("/watchlist", response_model=Union[Error, List[WatchlistOut]])
def get_all(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
):
    return repo.get_all(username=username)


@router.delete("/watchlist/{watchlist_symbol}", response_model=bool)
def delete_watchlist_symbol(
    username: str,
    watchlist_symbol: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
) -> bool:
    return repo.delete(username=username, watchlist_symbol=watchlist_symbol)
