### Matthew Young project journal

#### 09/29/22

-   Collaborated on the wireframe design of the website on Figma
    -   Login/Signup pages
    -   Home page
    -   Portfolio page
    -   Stock detail page
    -   buy/sell and order confirmation forms

#### 09/30/22

-   Diagramed context map for microservice architecture on excalidraw
-   Fleshed out details for required API endpoints for core functionality

#### 10/3/22

-   deployed app on heroku
-   created some issues for features

#### 10/4/22

-   finished documenting api endpoint design in docs/api_endpoints.md

#### 10/6/22

-   began work on implementing authentication in FastAPI

#### 10/7/22

-   fixed a bug and completed functionality for authentication
-   Finished endpoint for create account: POST @ /api/accounts
-   finished endpoint for login and logout: POST, DELETE @ /token

#### 10/10/22

-   created AccountsVO table in Trading microservice via SQL statements in a migration

#### 10/11/22

##### Trading microservice

-   Made an endpoint for creating an AccountVO in the trading microservice. This was needed to be able to enable a one-to-many relationship between accounts, and their respective transactions and positions.

##### Accounts Microservice

-   Made an endpoint that returns the current logged in user's details such as buying power, username, full name and email
-   Made an endpoint that allows a logged in user to update their buying power balance

#### 10/11/22

-   Created a Stock detail page that pulls real stock data from 3rd party api, to display stock data.
-   added a search box in the nav bar in Nav.js for the user to search for a stock by symbol

#### 10/12/22

-   created an endpoint for changing the buying power for an account for a logged in user

#### 10/14/22

-   helped teammate fix a bug allowing the front end to send authenticated token to back end api for authentication

#### 10/17/22

-   integrated front end stock page position from to create a new position via post request

#### 10/18/22

-
