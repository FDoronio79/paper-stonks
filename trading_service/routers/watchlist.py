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


@router.get(
    "/watchlist/{username}", response_model=Union[WatchlistOut, Error]
)
def get_one_watchlist(
    username: str,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: WatchlistRepository = Depends(),
) -> WatchlistOut:
    watchlist_response = repo.get_one(
        username=username
    )
    if isinstance(watchlist_response, Error):
        response.status_code = 200
    return watchlist_response
