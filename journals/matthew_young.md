### Matthew Young project journal

#### 09/29/22

-   Collaborated on the wireframe design of the website on Figma
    -   Login/Signup pages
    -   Home page
    -   Portfolio page
    -   Stock detail page
    -   Buy/sell and order confirmation forms

#### 09/30/22

-   Diagramed context map for microservice architecture on excalidraw
-   Fleshed out details for required API endpoints for core functionality

#### 10/3/22

-   Deployed app on heroku
-   Created some issues for features

#### 10/4/22

-   Finished documenting api endpoint design in docs/api_endpoints.md

#### 10/6/22

-   Began work on implementing authentication in FastAPI

#### 10/7/22

-   Fixed a bug and completed functionality for authentication
-   Finished endpoint for create account: POST @ /api/accounts
-   Finished endpoint for login and logout: POST, DELETE @ /token

#### 10/10/22

-   Created AccountsVO table in Trading microservice via SQL statements in a migration

#### 10/11/22

##### Trading microservice

-   Made an endpoint for creating an AccountVO in the trading microservice. This was needed to be able to enable a one-to-many relationship between accounts, and their respective transactions and positions.

##### Accounts Microservice

-   Made an endpoint that returns the current logged in user's details such as buying power, username, full name and email
-   Made an endpoint that allows a logged in user to update their buying power balance

#### 10/11/22

-   Created a Stock detail page that pulls real stock data from 3rd party api, to display stock data.
-   Added a search box in the nav bar in Nav.js for the user to search for a stock by symbol

#### 10/12/22

-   Created an endpoint for changing the buying power for an account for a logged in user

#### 10/14/22

-   Helped fix a bug allowing the front end to send authenticated token to back end api for authentication

#### 10/17/22

-   Integrated front end stock page position from to create a new position via post request

#### 10/18/22

-   Fixed bug on front end for buying a stock

#### 10/19/22

-   Added customer's current position to stock detail page

#### 10/20/22

-   Added authentication protection layer to all trading service api endpoints

#### 10/21/22

-   Edited transaction create endpoint and removed unused get_one_transaction endpoint in trading service api

#### 10/22/22

-   Fixed bug where dashboard wouldn't load position values on initial page load
-   Fixed bug allowing user to navigate to a new stock detail page from a different stock page
-   Added favicon.ico to site
-   created Deployment Dockerfiles for each microservice, removed linting errors and fixed deployment pipeline

#### 10/23/22

-   Made all URLs dynamic by setting environment variables in dockercompose.yml and .gitlab-ci.yml
-   Created new Heroku app for accounts microservice
-   Added build, deploy, release jobs for accounts microservice in deployment pipeline

#### 10/24/22

-   Created databases for heroku apps and ran migrations to initialize data tables
-   Fixed linting errors for deployment
-   Solved CORS issue on deployment site
#### 10/25/22
- updated api documentation
- wrote unit test for trading service
- 
