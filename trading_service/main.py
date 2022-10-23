import os
from fastapi import FastAPI
from routers import transactions, positions, accountsvo
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(transactions.router)
app.include_router(positions.router)
app.include_router(accountsvo.router)


origins = [
    "http://localhost:3000",
    os.environ.get("REACT_APP_API_HOST", None)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
