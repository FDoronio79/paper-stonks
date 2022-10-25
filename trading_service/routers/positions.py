from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.positions import PositionsIn, PositionsOut, Error, PositionRepository
from authenticator import authenticator

router = APIRouter()


@router.post("/positions", response_model=Union[PositionsOut, Error])
def create_position(
    position: PositionsIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PositionRepository = Depends(),
):

    position_response = repo.create(position)
    if isinstance(position_response, Error):
        response.status_code = 400
    return position_response


@router.get("/positions/{position_symbol}", response_model=Union[PositionsOut, Error])
def get_one_position(
    username: str,
    position_symbol: str,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PositionRepository = Depends(),
) -> PositionsOut:
    position_response = repo.get_one(username=username, position_symbol=position_symbol)
    if isinstance(position_response, Error):
        response.status_code = 200
    return position_response


@router.get("/positions", response_model=Union[Error, List[PositionsOut]])
def get_all(
    username: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PositionRepository = Depends(),
):
    return repo.get_all(username=username)


@router.delete("/positions/{position_symbol}", response_model=bool)
def delete_position(
    username: str,
    position_symbol: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PositionRepository = Depends(),
) -> bool:
    return repo.delete(username=username, position_symbol=position_symbol)


@router.put("/positions/{position_symbol}", response_model=Union[PositionsOut, Error])
def update_position(
    position: PositionsIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: PositionRepository = Depends(),
) -> Union[Error, PositionsOut]:
    return repo.update(position)
