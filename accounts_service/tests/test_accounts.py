import os
from fastapi.testclient import TestClient 

import sys
import pathlib

fastapi_dir = pathlib.Path(__file__).parent.parent.resolve()
abs_dir = os.path.abspath(fastapi_dir)
sys.path.append(abs_dir)

from main import app
from queries.accounts import AccountQueries

req_body_good = {
  "email": "string",
  "username": "string",
  "password": "string",
  "full_name": "string"
}

account2 = {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdHJpbmciLCJhY2NvdW50Ijp7ImlkIjoiMyIsImVtYWlsIjoic3RyaW5nIiwidXNlcm5hbWUiOiJzdHJpbmciLCJmdWxsX25hbWUiOiJzdHJpbmcifX0.B4rRAxGsUrVB2VNeRtL8rEHSFxBpcO1VfUF5bH3LCmU",
  "token_type": "Bearer",
  "account": {
    "id": "3",
    "email": "string",
    "username": "string",
    "full_name": "string",
    "hashed_password": "$2b$12$S1GlKsYEyefwQMn5JXl1FuqjtpT8tFHCtxWmqQaSpOtHrCDJwr2qC"
  }
}

client = TestClient(app)

class MockEmptyAccountQueries:
    def get_all(self):
        return []

def test_get_positions_empty():
    app.dependency_overrides[AccountQueries] = MockEmptyAccountQueries
    response = client.get('/api/accounts', json=req_body_good)

    assert response.status_code == 200
    assert response.json() == account2

    app.dependency_overrides = {}