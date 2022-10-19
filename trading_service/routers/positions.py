from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.positions import PositionsIn, PositionsOut, Error, PositionRepository


router = APIRouter()


@router.post("/positions", response_model=Union[PositionsOut, Error])
def create_position(position: PositionsIn,
                    response: Response,
                    repo: PositionRepository = Depends()
                    ):

    position_response = repo.create(position)
    if isinstance(position_response, Error):
        response.status_code = 400
    return position_response


@router.get("/positions/{position_symbol}", response_model=Optional[PositionsOut])
def get_one_position(
    username: str,
    position_symbol: str,
    repo: PositionRepository = Depends(),
) -> PositionsOut:
    return repo.get_one(username=username, position_symbol=position_symbol)


@router.get("/positions", response_model=Union[Error, List[PositionsOut]])
def get_all(
    username: str,
    repo: PositionRepository = Depends(),
):
    return repo.get_all(username=username)


@router.delete("/positions/{position_symbol}", response_model=bool)
def delete_position(
    username: str,
    position_symbol: str,
    repo: PositionRepository = Depends(),
) -> bool:
    return repo.delete(username=username, position_symbol=position_symbol)


@router.put("/positions/{position_symbol}", response_model=Union[PositionsOut, Error])
def update_position(
    position: PositionsIn,
    repo: PositionRepository = Depends(),
) -> Union[Error, PositionsOut]:
    return repo.update(position)
