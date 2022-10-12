from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
from queries.positions import PositionIn, PositionOut, Error, PositionRepository


router = APIRouter()



@router.post("/positions", response_model=Union[PositionOut, Error])
def create_position(position: PositionIn, 
    response: Response,
    repo: PositionRepository = Depends()
):
    return repo.create(position)



@router.get("/positions", response_model=Union[Error, List[PositionOut]])
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




