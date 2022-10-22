import os
from fastapi.testclient import TestClient


import sys
import pathlib
import os

fastapi_dir = pathlib.Path(__file__).parent.parent.resolve()
abs_dir = os.path.abspath(fastapi_dir)
sys.path.append(abs_dir)

from main import app

from queries.positions import PositionRepository
from queries.transactions import TransactionRepository
from jwtdown_fastapi.authentication import Authenticator
from authenticator import authenticator



#################################################################################
# testing client

client = TestClient(app)

#################################################################################
# mock queries


class MockEmptyTransactionQueries:
    def get_all(self):
        return []



class MockEmptyPositionsQueries:
    def get_all(self, username):
        return []

class MockPositionQueries:
    def get_all(self, username):
        return [position]

# mock queries


class MockTransactionQueries:
    def get_all(self):
        return [transaction1]

    def create(self, item):
        if item.username != None:
            return transaction2
        else:
            raise Exception


#################################################################################
# creating a sample transaction to put into the mock query (test_get_transaction)
transaction1 = {
    "id": 1,
    "username": "example",
    "symbol": "AAPL",
    "price": 100,
    "type_of": "stock",
    "quantity": 1,
    "time_of_purchase": "2022-10-20T00:37:30.684000+00:00"
}


# creating a good and bad transaction to pass into the test_create function (test_create_transaction)
req_body_good = {
    "username": "example",
    "symbol": "GOOG",
    "price": 200,
    "type_of": "stock",
    "quantity": 2,
    "time_of_purchase": "2022-10-20T00:37:30.684000+00:00"
}

req_body_bad = {
    "symbol": "GOOG",
    "price": 200,
    "type_of": "stock",
    "quantity": 2,
    "time_of_purchase": "2022-10-20T02:20:39.222Z"
}

response1 = {'detail': [{'loc': ['body', 'username'],
                         'msg': 'field required', 'type': 'value_error.missing'}]}

transaction2 = {
    "id": 2,
    "username": "example",
    "symbol": "GOOG",
    "price": 200,
    "type_of": "stock",
    "quantity": 2,
    "time_of_purchase": "2022-10-20T00:37:30.684000+00:00"
}


class MockAuth:
    def get_current_account_data(self):
        return []


#################################################################################

# test function; returns empty output; checks that the API route works

def test_get_transaction_empty():
    app.dependency_overrides[TransactionRepository] = MockEmptyTransactionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth
    response = client.get('/transactions')

    assert response.status_code == 200
    assert response.json() == []

    app.dependency_overrides = {}


# test function; returns mock transaction; checks that the API route works
def test_get_transaction():
    app.dependency_overrides[TransactionRepository] = MockTransactionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth

    response = client.get('/transactions')

    assert response.status_code == 200
    assert response.json() == [transaction1]

    app.dependency_overrides = {}


def test_create_transaction_good():  # if no transaction_id, raise an error
    app.dependency_overrides[TransactionRepository] = MockTransactionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth

    response = client.post('/transactions', json=req_body_good)

    assert response.status_code == 200
    assert response.json() == transaction2

    app.dependency_overrides = {}


def test_create_transaction_bad():  # if no transaction_id, raise an error
    app.dependency_overrides[TransactionRepository] = MockTransactionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth

    response = client.post('/transactions', json=req_body_bad)

    assert response.status_code == 422
    assert response.json() == response1

    app.dependency_overrides = {}  # imports


#####################GET ALL POSITIONS############################################
# This test, tests the functionality of the endpoint
def test_get_position_empty():
    app.dependency_overrides[PositionRepository] = MockEmptyPositionsQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth
    response = client.get('/positions?username=bruh1')

    assert response.status_code == 200
    assert response.json() == []

    app.dependency_overrides = {}

##############CREATE POSITION###################################################
position =   {
    "id": 2,
    "username": "bruh1",
    "symbol": "NVDA",
    "name": "NVIDIA Corporation",
    "quantity": 100,
    "type_of": "stock"
}

def test_delete_position():
    app.dependency_overrides[PositionRepository] = MockPositionQueries
    app.dependency_overrides[authenticator.get_current_account_data] = MockAuth
    response = client.delete('/positions/NVDA?username=bruh1')

    assert response.status_code == 200
    assert response.json() == True

    app.dependency_overrides = {}