from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.positions import PositionsIn, PositionsOut, Error, PositionRepository


router = APIRouter()



@router.post("/positions", response_model=Union[PositionsOut, Error])
def create_position(position: PositionsIn, 
    response: Response,
    repo: PositionRepository = Depends()
):
    return repo.create(position)














@router.get("/positions", response_model=Union[Error, List[PositionsOut]])
def get_all(
    repo: PositionRepository = Depends(),
):
    return repo.get_all()


@router.delete("/positions/{position_id}", response_model=bool)
def delete_position(
    position_id: int,
    repo: PositionRepository = Depends(),
) -> bool:
    return repo.delete(position_id)




