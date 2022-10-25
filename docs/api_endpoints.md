# API Endpoints Documentation

## Accounts Service

##### Create Account

-   Endpoint path: `/api/accounts`
-   Endpoint method: <span style="color:green">POST</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
    }
    ```
-   Request body:

    ```json
    {
        "email": "string",
        "username": "string",
        "password": "string",
        "full_name": "string"
    }
    ```

-   Response: JSON web access token + newly created account's details
-   Response shape:
    ```json
    {
        "access_token": "string",
        "token_type": "Bearer",
        "account": {
            "id": "string",
            "email": "string",
            "username": "string",
            "full_name": "string",
            "hashed_password": "string"
        }
    }
    ```

##### Retrieve Account Details

-   Endpoint path: `/api/accounts/`
-   Endpoint method: <span style="color:blue">GET</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```
-   Request body:
    ```json
    {}
    ```
-   Response: the account id, email, username, full_name, buying_power
-   Response shape:

    ```json
    {
        "id": "int",
        "email": "string",
        "username": "string",
        "full_name": "string",
        "buying_power": "string"
    }
    ```

##### Get Token

- Endpoint path: `/token`
- Endpoint method: <span style="color:blue">GET</span>
  
-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```
-   Request body: 
    ```json
    {}
    ```
-   Response: JSON web token, account details
-   Response shape:

    ```json
    {
        "access_token": "string",
        "token_type": "Bearer",
        "account": {
            "id": "string",
            "email": "string",
            "username": "string",
            "full_name": "string",
            "hashed_password": "string"
        }
    }
    ```

##### Login
- Endpoint path: `/token`
- Endpoint method: <span style="color:green">POST</span>
  
-   Headers:
    ```json
    {
        "Content-type": "application/json",
    }
    ```
-   Request body: 
    ```json
    {
        "username": "string",
        "password": "string"
    }
    ```
-   Response: JSON web token, account details
-   Response shape:

    ```json
    {
        "access_token": "string",
        "token_type": "Bearer"
    }
    ```

    ##### Logout
- Endpoint path: `/token`
- Endpoint method: <span style="color:red">DELETE</span>
  
-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```
-   Request body: 
    ```json
    {}
    ```
-   Response: JSON web token, account details
-   Response shape: `boolean`
##### Change Account buying power

-   Endpoint path: `/api/accounts?bp_change=<float:bp_change>/`
-   Endpoint method: <span style="color:orange">PUT</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    {
      "bp_change": "number",
    }
    ```

-   Response: new buying power
-   Response shape:
    ```json
    {   
        "buying_power": number
    }
    ```



## Trading Service

##### Create AccountVO
-   Endpoint path: `/api/accountsvo`
-   Endpoint method: <span style="color:green">POST</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
    }
    ```

-   Request body:

    ```json
    { 
        "username": "string",
    }
    ```

-   Response: the position's details: name, symbol, quantity and type (_stock/crypto_)
-   Response shape:
    ```json
    {
         "username": "string"
    }
    ```
##### Get Position

-   Endpoint path: `/positions/<str:symbol>`
-   Endpoint method: <span style="color:blue">GET</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    { "username": "string",
      "symbol": "string",
    }
    ```

-   Response: the position's details: name, symbol, quantity and type (_stock/crypto_)
-   Response shape:
    ```json
    {
        "symbol": "string",
        "name": "string",
        "quantity": "number",
        "type": "string",
    }
    ```

##### Update Position

-   Endpoint path: /positions/<str:symbol>
-   Endpoint method: <span style="color:orange">PUT</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    {
        "username": "string",
        "symbol": "string",
        "name": "string",
        "quantity": 0,
        "type_of": "string"
    }
    ```

-   Response: the position's details: name, symbol, quantity and type
-   Response shape:

    ```json
    {
        "id": 0,
        "username": "string",
        "symbol": "string",
        "name": "string",
        "quantity": "int",
        "type_of": "string"
    }
    ```

##### Create Position

-   Endpoint path: `/positions/<str:symbol>`
-   Endpoint method: <span style="color:green">POST</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    {
        "username": "string",
        "symbol": "AAPL",
        "name": "stock",
        "quantity": 10,
        "type_of": "stock"
    }
    ```

-   Response: the position's details: name, symbol, quantity and type
-   Response shape:

    ```json
    {
        "id": "int",
        "username": "string",
        "symbol": "string",
        "name": "string",
        "quantity": "int",
        "type_of": "string"
    }
    ```

##### Delete Position

-   Endpoint path: `/positions/<str:symbol>?username=<str:username>`
-   Endpoint method: <span style="color:red">DELETE</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    { "username": "string",
      "symbol": "string",
    }
    ```

-   Response: the position's details: success message
-   Response shape:
    ```json
    {
        "message": "boolean",
    }
    ```

##### Get all positions

-   Endpoint path: `/positions`
-   Endpoint method: <span style="color:blue">GET</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    {
      "username": "string",
    }
    ```

-   Response: a list of all positions for the user
-   Response shape:

    ```json
    [
        {
            "id": "int",
            "username": "string",
            "symbol": "string",
            "name": "string",
            "quantity": "int",
            "type_of": "string"
        },
        {
            "id": "int",
            "username": "string",
            "symbol": "string",
            "name": "string",
            "quantity": "int",
            "type_of": "string"
        }
    ]
    ```

##### Create Transaction

-   Endpoint path: `/transactions`
-   Endpoint method: <span style="color:orange">POST</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    {
        "username": "string",
        "symbol": "string",
        "price": 0,
        "type_of": "string",
        "quantity": "int",
        "time_of_purchase": "2022-10-25T19:05:37.524Z"
    }
    ```

-   Response: the transaction's details
-   Response shape:

    ```json
    {
        "id": "int",
        "username": "string",
        "symbol": "string",
        "price": "int",
        "type_of": "string",
        "quantity": "int",
        "time_of_purchase": "2022-10-25T19:05:37.524Z"
    }
    ```

##### List Transactions

-   Endpoint path: `/transactions`
-   Endpoint method: <span style="color:blue">GET</span>

-   Headers:
    ```json
    {
        "Content-type": "application/json",
        "Authorization": "Bearer ${fastapi_token}"
    }
    ```

-   Request body:

    ```json
    {
      "username": "string",
    }
    ```

-   Response: a list of all transactions for the user
-   Response shape:

    ```json
    [
        {
            "id": "int",
            "username": "string",
            "symbol": "string",
            "price": "int",
            "type_of": "string",
            "quantity": "int",
            "time_of_purchase": "2022-10-25T19:05:37.524Z"
        },
        {
            "id": "int",
            "username": "string",
            "symbol": "string",
            "price": "int",
            "type_of": "string",
            "quantity": "int",
            "time_of_purchase": "2022-10-25T19:05:37.524Z"
        },
        {
            "id": "int",
            "username": "string",
            "symbol": "string",
            "price": "int",
            "type_of": "string",
            "quantity": "int",
            "time_of_purchase": "2022-10-25T19:05:37.524Z"
        }
    ]
    ```
