### Fil project journal

#### 09/30/22
-   Diagramed context map for microservice architecture on excalidraw
- Worked on API endpoints and model designs, narrowing down our final endpoints


#### 10/03/22
- Worked on creating issues, deploying heroku, and planning with the group.

#### 10/04/22
- Successfully locally deployed app on heroku
- Finalized MVP issues and posted onto Gitlab 
- Assigned each members issues to pick up 
- Drafted up front-end for login and sign up

#### 10/05/22
- Worked with team to review database and setup


#### 10/06/22
- Started coding front-end for signup
- Going through design for front-end pages

#### 10/07/22
- Worked more on signup front-end and started login front-end

#### 10/09/22
- Finished up signup front-end and was able to create an account connecting to the back end
- implemented CORS to backend 

#### 10/10/22
- Finishing up Login front-end having some issues with an error 422
  - I believe this issue is due to not passing in the token of the account when logging in

#### 10/11/22
- Added accountvo to Signup frontend to create a trading_service accountvo account  with the same username as the account_service account.
- Working on Logout on the front end
- Drafting Mainpage 


#### 10/12 - 10/14
 - Hammered out Login and Logout
 - Authentication works on both front end and backend

#### 10/17
- Took day off

#### 10/18
- Worked on display positions on portfolio page
- Positions are displaying on the portfolio page!

#### 10/19 - 10/21
- Worked on displaying value of current stock positions
- Worked on displaying total current stock position values
- Encountered issues where the function that set the values would enter an infinite loop
  - Solved this issue by refactoring the function and setting it outside of the useEffect
  - and calling the function in the useEffect instead of having it set in the useEffect

#### 10/24
- Worked on and completed unit test for getting positions from the end point
- Worked with team to deploy project
- Encountered issues with Authentication on the front end
  - Fixed issue by adding '"Authorization": `Bearer ${fastapi_token}`' to the headers
- Deployed project successfully

#### 10/25
- Cleaned up React files
  - Removed console logs
  - Cleaned up some linting issues
- Working on styling and CSS

