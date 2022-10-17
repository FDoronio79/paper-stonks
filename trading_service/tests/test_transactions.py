from msilib.schema import ServiceControl
from main import trading_service
from fastapi.testclient import TestClient
from db import XXXXXX

client=TestClient(trading_service)


def test_transaction():
    client.get_transactions()
