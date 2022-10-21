import os
from fastapi.testclient import TestClient 

import sys
import pathlib

fastapi_dir = pathlib.Path(__file__).parent.parent.resolve()
abs_dir = os.path.abspath(fastapi_dir)
sys.path.append(abs_dir)

from main import app
from queries.positions import PositionRepository
from jwtdown_fastapi.authentication import Authenticator
from authenticator import authenticator

req_body_good = {
  "id": 14,
    "username": "leo",
    "symbol": "AAPL",
    "name": "Apple Inc",
    "quantity": 50,
    "type_of": "stock"
}

position2 = [
  {
    "id": 14,
    "username": "leo",
    "symbol": "AAPL",
    "name": "Apple Inc",
    "quantity": 50,
    "type_of": "stock"
  },
  {
    "id": 15,
    "username": "leo",
    "symbol": "LMT",
    "name": "Lockheed Martin Corporation",
    "quantity": 60,
    "type_of": "stock"
  },
  {
    "id": 19,
    "username": "leo",
    "symbol": "NVDA",
    "name": "NVIDIA Corporation",
    "quantity": 30,
    "type_of": "stock"
  }
]

client = TestClient(app)

class MockAuth:
    def get_current_account_data(self):
        return []

class MockEmptyPositionQueries:
    def get_all(self, username: str):
        return []

def test_get_positions_empty():
    app.dependency_overrides[PositionRepository] = MockEmptyPositionQueries
    app.dependency_overrides[authenticator.get_curret_account_data] =MockAuth
    response = client.get('/positions', json=req_body_good)

    assert response.status_code == 200
    assert response.json() == position2

    app.dependency_overrides = {}