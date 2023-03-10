import os
from fastapi import FastAPI
from authenticator import authenticator
from routers import accounts
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)

origins = ["http://localhost:3000", os.environ.get("CORS_HOST", None)]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
