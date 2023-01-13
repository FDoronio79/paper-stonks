import os
from fastapi import FastAPI
from routers import transactions, positions, accountsvo, alpha_vantage
from fastapi.middleware.cors import CORSMiddleware
from routers import watchlist

app = FastAPI()
app.include_router(transactions.router)
app.include_router(positions.router)
app.include_router(accountsvo.router)
app.include_router(alpha_vantage.router)
app.include_router(watchlist.router)


origins = ["http://localhost:3000", os.environ.get("CORS_HOST", None)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
