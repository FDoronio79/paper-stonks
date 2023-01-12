import os
from fastapi.testclient import TestClient

import sys
import pathlib

fastapi_dir = pathlib.Path(__file__).parent.parent.resolve()
abs_dir = os.path.abspath(fastapi_dir)
sys.path.append(abs_dir)

from main import app


from queries.accountsvo import AccountVORepository


# not sure what I actually need to import here
# come from routers somehow


# accounts_vo_list = [accountvorep] #or whatever replaces accountvoin above

client = TestClient(app)


class MockCreateAllAccountsVO:
    def create(self, item):
        if item.username is not None:
            return output


account1 = {"username": "Tiffany"}
output = {"username": "Tiffany"}

account2 = {}
output = {"username": "Tiffany"}

# MATTHEW
def test_accountVO():
    app.dependency_overrides[AccountVORepository] = MockCreateAllAccountsVO
    response = client.post("/api/accountsvo", json=account1)
    assert response.status_code == 200
    assert response.json() == output


def test_accountVObad():
    app.dependency_overrides[AccountVORepository] = MockCreateAllAccountsVO
    response = client.post("/api/accountsvo", json=account2)
    assert response.status_code == 422
