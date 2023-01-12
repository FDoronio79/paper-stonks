from typing import Optional
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from authenticator import authenticator

from pydantic import BaseModel

from queries.accounts import (
    AccountIn,
    AccountOutWithPassword,
    AccountQueries,
    DuplicateAccountError,
    BuyingPowerOut,
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOutWithPassword


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return True


@router.post("/api/accounts", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    accounts: AccountQueries = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = accounts.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, accounts)
    return AccountToken(account=account, **token.dict())


async def get_account_bp(username):

    if username:
        result = AccountQueries.get_buying_power(username=username)
        return result.buying_power
    return {"message": "couldn't get data"}


@router.get("/api/accounts")
async def get_things(
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    print(account_data)
    if account_data:

        current_bp = await get_account_bp(account_data["username"])
        account_data["buying_power"] = current_bp
        return account_data
    return {"message": "No account data returned"}


@router.put("/api/accounts", response_model=BuyingPowerOut)
async def update_buying_power(
    bp_change,
    account_data: dict = Depends(authenticator.try_get_current_account_data),
):
    print(bp_change)
    print("HUH?!", account_data)
    account_data_with_bp = await get_things(account_data)
    print(account_data_with_bp)
    current_bp = account_data_with_bp["buying_power"]
    print(current_bp)
    current_bp = current_bp.replace(",", "")
    current_bp = current_bp.replace("$", "")
    after_bp = float(current_bp) + float(bp_change)
    after_bp = str(after_bp)
    print(after_bp)
    username = account_data_with_bp["username"]
    print(username)

    return AccountQueries.change_buying_power(
        buying_power=after_bp, username=username
    )


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Optional[dict] = Depends(
        authenticator.try_get_current_account_data
    ),
) -> AccountToken | None:
    print(account)
    accountwithhash = AccountQueries.getHashedPass(account["username"])
    account["hashed_password"] = accountwithhash
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }
