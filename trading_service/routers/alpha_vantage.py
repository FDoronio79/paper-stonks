from fastapi import APIRouter, Depends, Response
from typing import Union, List
from queries.alpha_vantage import (
    StockDataIn,
    StockDataOut,
    StockDataRepository,
    Error,
)

router = APIRouter()


@router.post("/stock", response_model=Union[StockDataOut, Error])
def get_data_points(
    stock: StockDataIn,
    response: Response,
    repo: StockDataRepository = Depends(),
):
    return repo.get_data_points(stock)
