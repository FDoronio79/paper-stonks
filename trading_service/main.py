from fastapi import FastAPI
from routers import transactions, positions, accountsvo
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(transactions.router)
app.include_router(positions.router)
app.include_router(accountsvo.router)


origins = [
    "http://localhost:3000",
    "https://apex-legends1.gitlab.io/",
    "https://paper-stonks.herokuapp.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
