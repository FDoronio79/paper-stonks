# Paper Stonks

- Filamer Doronio
- Jessica Lora
- Leo Shon
- Matthew Young
- Tiffany Ameral

Paper Stonks - because stonks for life!

## Design

- [API design](docs/api_endpoints.md)
- [Data model](docs/data-models.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting finance enthusiasts who want to practice their stock investment strategies.

## Functionality

Visitors not-logged in:
- Visitors of the site can view the site's homepage. The homepage features an about section with company information and a guide on how to navigate the site
- Using the search bar, visitors can search for stocks of interest and go to it's page
- Visitors can create an account 

Visitors logged-in
- Additional features once logged in include:
- A user can add "money" or "buying power" to their account
- On a specific stock page, the user will have access to the "Buy" and "Sell" options
- A user can "buy" a stock, gaining a position in that stock
- On a specific stock page, if a user has a position in that stock, it will be displayed
- A user can also sell their stock
- Portfolio page will display a list of a user's positions and total investment amount



## Project Initialization

Follow these steps to fully deploy this application on your local machine:

1. Clone the repository into your local machine
2. CD into the new projects directory
3. Run `docker volume create postgres-data`
4. Run `docker volume create pg-admin`
5. Run `docker compose build`
6. Run `docker compose up`

-Access application on web browser:
  -localhost:3000

- Access FastAPI Swagger UI:
  - Accounts services: localhost:8080/docs
  - Trading services: localhost:8090/docs



