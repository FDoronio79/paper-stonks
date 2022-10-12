from fastapi import FastAPI
from routers import transactions, positions

app = FastAPI()
app.include_router(transactions.router)
app.include_router(positions.router)