import os
from fastapi.testclient import TestClient

import sys
import pathlib

fastapi_dir = pathlib.Path(__file__).parent.parent.resolve()
abs_dir = os.path.abspath(fastapi_dir)
sys.path.append(abs_dir)

from main import app
from queries.positions import PositionRepository

from authenticator import authenticator

req_body_good = {
    "id": 14,
    "username": "leo",
    "symbol": "AAPL",
    "name": "Apple Inc",
    "quantity": 50,
    "type_of": "stock",
}

req_body_bad = {
    "symbol": "GOOG",
    "price": 200,
    "type_of": "stock",
    "quantity": 2,
    "time_of_purchase": "2022-10-20T02:20:39.222Z",
}

position2 = {
    "id": 14,
    "username": "leo",
    "symbol": "AAPL",
    "name": "Apple Inc",
    "quantity": 50,
    "type_of": "stock",
}

response1 = {
    "detail": [
        {
            "loc": ["body", "username"],
            "msg": "field required",
            "type": "value_error.missing",
        },
        {
            "loc": ["body", "name"],
            "msg": "field required",
            "type": "value_error.missing",
        },
    ]
}

createposition2 = {
    "id": 14,
    "username": "leo",
    "symbol": "AAPL",
    "name": "Apple Inc",
    "quantity": 50,
    "type_of": "stock",
}

client = TestClient(app)


class MockAuth:
    def get_current_account_data(self):
        return []


class MockEmptyPositionQueries:
    def get_all(self, username):
        self.username = username
        return [position2]


class MockPositionQueries:
    def create(self, item):
        if item.username is not None:
            return createposition2
        else:
            raise Exception


def test_get_positions_empty():
    app.dependency_overrides[PositionRepository] = MockEmptyPositionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth
    response = client.get("/positions?username=leo")

    assert response.status_code == 200
    assert response.json() == [position2]

    app.dependency_overrides = {}


def test_create_positions_good():
    app.dependency_overrides[PositionRepository] = MockPositionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth
    response = client.post("/positions", json=req_body_good)

    assert response.status_code == 200
    assert response.json() == createposition2

    app.dependency_overrides = {}


def test_create_position_bad():  # if no position_id, raise an error
    app.dependency_overrides[PositionRepository] = MockPositionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth

    response = client.post("/positions", json=req_body_bad)

    assert response.status_code == 422
    assert response.json() == response1

    app.dependency_overrides = {}  # imports
