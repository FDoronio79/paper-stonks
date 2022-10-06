from fastapi import FastAPI
from authenticator import authenticator
from fastapi import APIRouter

app = FastAPI()
app.include_router(authenticator.router)
