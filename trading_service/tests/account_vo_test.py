import os
from fastapi.testclient import TestClient 

import sys
import pathlib
import os

fastapi_dir = pathlib.Path(__file__).parent.parent.resolve()
abs_dir = os.path.abspath(fastapi_dir)
sys.path.append(abs_dir)

from main import app


from queries.accountsvo import AccountVORepository
#formatting the document seems to put parts of the unit test out of order



client = TestClient(app)


class MockCreateAllAccountsVO:
    def create(self, item):
        if item.username != None:
            return output


account1 = {"username": "Tiffany"}
output = {"username": "Tiffany"}


def test_accountVO():
    app.dependency_overrides[AccountVORepository] = MockCreateAllAccountsVO
    response = client.post('/api/accountsvo', json=account1)
    assert response.status_code == 200
    assert response.json() == output
