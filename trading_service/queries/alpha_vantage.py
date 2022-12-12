import requests
import os
from pydantic import BaseModel

from typing import Union

alpha_vantage = os.environ.get("REACT_APP_ALPHA_VANTAGE")


class Error(BaseModel):
    message: str


class StockDataIn(BaseModel):
    symbol: str
    interval: str


class StockDataOut(BaseModel):
    labels: list
    points: list


class StockDataRepository:
    def get_data_points(
        self, stock: StockDataIn
    ) -> Union[Error, StockDataOut]:
        response = requests.get(
            f"https://www.alphavantage.co/query?function=TIME_SERIES_"
            f"{stock.interval}&symbol={stock.symbol}"
            f"&apikey={alpha_vantage}"
        )
        data = response.json()
        if stock.interval == "DAILY":
            time_series = data.get("Time Series (Daily)")
        elif stock.interval == "MONTHLY":
            time_series = data.get("Monthly Time Series")
        elif stock.interval == "WEEKLY":
            time_series = data.get("Weekly Time Series")
        else:
            return Error(message="invalid time series")

        labels = list(time_series.keys())
        quotes = list(time_series.values())
        points = []

        for quote in quotes:
            points.append(quote.get("4. close"))
        return StockDataOut(labels=labels, points=points)
