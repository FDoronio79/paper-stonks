from fastapi import FastAPI
from routers import transactions

app = FastAPI()
app.include_router(transactions.router)
app.include_router(accountsvo.router)
