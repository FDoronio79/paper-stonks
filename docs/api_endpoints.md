### API Endpoints Documentation

#### Accounts Service

##### Create Account

-   Endpoint path: /accounts
-   Endpoint method: POST

-   Headers:

-   Request body:

    ```json
    {
      "account": [
        {
          "email": string,
          "username": string,
          "password": string,
        }
      ]
    }
    ```

-   Response: the email and username for the account + success message
-   Response shape:
    ```json
    {
        "message": string,
        "email": string,
        "username": string
    }
    ```

##### Retrieve Account

-   Endpoint path: /accounts/<str:username>
-   Endpoint method: GET

-   Headers:

-   Request body:

    ```json
    {
      "username": string
    }
    ```

-   Response: the email, username, and buying power for the account
-   Response shape:

    ```json
    {
        "email": string,
        "username": string,
        "buying_power": number
    }

    }
    ```

##### Change Account buying power

-   Endpoint path: /accounts/<str:username>
-   Endpoint method: PUT

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    {
      "username": string,
      "transaction_amount": number,
    }
    ```

-   Response: new buying power + success message
-   Response shape:
    ```json
    {   "message": string,
        "buying_power": number
    }
    ```

#### Trading Service

##### Get Position

-   Endpoint path: /positions/<str:symbol>
-   Endpoint method: GET

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    { "username": string,
      "symbol": string,
    }
    ```

-   Response: the position's details: name, symbol, quantity and type (_stock/crypto_)
-   Response shape:
    ```json
    {
        "symbol": string,
        "name": string,
        "quantity": number,
        "type": string,
    }
    ```

##### Update Position

-   Endpoint path: /positions/<str:symbol>
-   Endpoint method: PUT

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    { "username": string,
      "symbol": string,
      "quantity_change": number
    }
    ```

-   Response: the position's details: name, symbol, quantity and type (_stock/crypto_) + success message
-   Response shape:

    ```json
    {
        "message": string,
        "symbol": string,
        "name": string,
        "quantity": number,
        "type": string,
    }
    ```

##### Create Position

-   Endpoint path: /positions/<str:symbol>
-   Endpoint method: POST

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    { "username": string,
      "symbol": string,
      "quantity_change": number
    }
    ```

-   Response: the position's details: name, symbol, quantity and type (_stock/crypto_) + success message
-   Response shape:

    ```json
    {
        "message": string,
        "symbol": string,
        "name": string,
        "quantity": number,
        "type": string,
    }
    ```

##### Delete Position

-   Endpoint path: /positions/<str:symbol>
-   Endpoint method: DELETE

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    { "username": string,
      "symbol": string,
    }
    ```

-   Response: the position's details: success message
-   Response shape:
    ```json
    {
        "message": string,
    }
    ```

##### List Positions

-   Endpoint path: /positions
-   Endpoint method: GET

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    {
      "username": string,
    }
    ```

-   Response: a list of all positions for the user
-   Response shape:

    ```json
    { "positions": [
        {
            "symbol": string,
            "name": string,
            "quantity": number,
            "type": string,
        },
        {
            "symbol": string,
            "name": string,
            "quantity": number,
            "type": string,
        },
        ...
        ]
    }
    ```

##### Create Transaction

-   Endpoint path: /transactions
-   Endpoint method: POST

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    { "username": string,
      "symbol": string,
      "price": number,
      "type": string,
      "quantity": number,
    }
    ```

-   Response: the position's details: success message
-   Response shape:

    ```json
    {
      "message": string,
      "username": string,
      "symbol": string,
      "price": number,
      "type": string,
      "quantity": number,
    }
    ```

##### List Transactions

-   Endpoint path: /transactions
-   Endpoint method: GET

-   Headers:

    -   Authorization: Bearer token

-   Request body:

    ```json
    {
      "username": string,
    }
    ```

-   Response: a list of all positions for the user
-   Response shape:

    ```json
    { "positions": [
        {
        "message": string,
        "username": string,
        "symbol": string,
        "price": number,
        "type": string,
        "quantity": number,
        },
        {
        "message": string,
        "username": string,
        "symbol": string,
        "price": number,
        "type": string,
        "quantity": number,
        },
        ...
    ]
    }
    ```
