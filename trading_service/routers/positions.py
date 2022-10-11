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



@router.get("/positions/{position_id}", response_model=Optional[PositionsOut])
def get_one_position(
    position_id: int,
    repo: PositionRepository = Depends(),
) -> PositionsOut:
    return repo.get_one(position_id)
