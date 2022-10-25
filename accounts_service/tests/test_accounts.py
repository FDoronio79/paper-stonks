from fastapi.testclient import TestClient


import sys
import pathlib
import os

fastapi_dir = pathlib.Path(__file__).parent.parent.resolve()
abs_dir = os.path.abspath(fastapi_dir)
sys.path.append(abs_dir)

from main import app

from queries.accounts import AccountQueries
from authenticator import authenticator


client = TestClient(app)

# hashed_pass = "$2b$12$plchujY4vOgGSFS8mT/xYus7t4J4RWWa1YwFvJ5c1zvVvUoiFSSD2"


class MockAccountQueries:
    def create(self, item):  # post
        if item.username != None:
            return good_response_signup
        else:
            raise Exception

        # def get_account(self):
        #     return {}


mock_new_account_good = {
    "email": "bruh10@gmail.com",
    "username": "bruh10",
    "password": "password",
    "full_name": "bruh 10th",
}


mock_new_account_bad = {
    "email": "bruh1@gmail.com",
    "password": "password",
    "full_name": "bruh 10th",
}

good_response_signup = {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJicnVoMTAiLCJhY2NvdW50Ijp7ImlkIjoiNSIsImVtYWlsIjoiYnJ1aDFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJicnVoMTAiLCJmdWxsX25hbWUiOiJicnVoIDEwdGgifX0.IO_VCh_knPMlh7-163sVq01ljF7JMl87Fa4Jpo2D7as",
    "token_type": "Bearer",
    "account": {
        "id": "1",
        "email": "bruh1@gmail.com",
        "username": "bruh10",
        "full_name": "bruh 10th",
        "hashed_password": "$2b$12$plchujY4vOgGSFS8mT/xYus7t4J4RWWa1YwFvJ5c1zvVvUoiFSSD2",
    },
}


def test_signup():
    app.dependency_overrides[AccountQueries] = MockAccountQueries

    response = client.post("/api/accounts", json=mock_new_account_good)

    assert response.status_code == 200
    assert response.json() == good_response_signup

    app.dependency_overrides = {}
