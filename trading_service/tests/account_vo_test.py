import os
from urllib import response
from fastapi.testclient import TestClient
# from fastapi import TestClient
from main import app

from trading_service.queries.accountsvo import AccountVOIn
#not sure what I actually need to import here
#come from routers somehow


accountvoin = AccountVOIn() #needs a list of some sort in the ()
accounts_vo_list = [accountvoin] #or whatever replaces accountvoin above

import sys
import pathlib
import os

class MockGetAllAccountsVO:
    def get_all_accountVO(self):
        return accounts_vo_list

client = TestClient(app)




def test_accountVO():
    app.dependency_overrides[AccountVOQueries] = MockGetAllAccountsVO
    response = client.post("/api/accountsvo/")
    assert response.status_code == 200
    assert response.json() == accounts_vo_list

