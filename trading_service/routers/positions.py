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



@router.get("/positions/{position_symbol}", response_model=Optional[PositionsOut])
def get_one_position(
    position_symbol: str,
    repo: PositionRepository = Depends(),
) -> PositionsOut:
    return repo.get_one(position_symbol)





@router.get("/positions", response_model=Union[Error, List[PositionsOut]])
def get_all(
    repo: PositionRepository = Depends(),
):
    return repo.get_all()


@router.delete("/positions/{position_symbol}", response_model=bool)
def delete_position(
    position_symbol: str,
    repo: PositionRepository = Depends(),
) -> bool:
    return repo.delete(position_symbol)




@router.put("/positions/{position_symbol}", response_model=Union[PositionsOut, Error])
def update_position(
    position_symbol: str,
    position: PositionsIn,
    repo: PositionRepository = Depends(),
) -> Union[Error, PositionsOut]:
    return repo.update(position_symbol, position)