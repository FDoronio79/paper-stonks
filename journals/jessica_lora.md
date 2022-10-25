## September 26, 2022

Today: We brainstormed ideas for our team application and decided to build a paper trading application. 

Other ideas involved recreating popular apps like Airbnb and Uber. Ultimately, the paper trading idea seemed to spark the most interest. Stretch goals include making a game from the app and we could compete against each other to see who trades best. 


## September 27-28, 2022

Today: We worked as a group to design the wireframe for our site. 

We utilized Figma to design the wireframe. It took several days for us to complete the wireframes and as the project progresses, we'll most likely make additional changes to it. 


## September 29-30, 2022

Today: We worked on the API design and modeling.

We used excalidraw and made some simple models and API designs. I realize now, that we'll most likely have to rethink our model structure as we delve into working with FastAPIs and PostgreSQL. Still, we thought of some good endpoints to work from.


## October 3, 2022

Today: We successfully set up Heroku!

We ensured that everyone had cloned the Paper Stonks application. Tiffany took the lead in configuring the application to work with Heroku. We now have that working.


## October 4, 2022

Today: We successfully locally deployed our application!

I was out for most of the day. Upon returning, my team had set up the Docker files, following the instructions from "Project Advice". The team decided to use a PostgeSQL database and pgAdmin was added to the Docker configuration.

Additionally, I created 4 issues in Gitlab. Currently, we have a total of 10 issues, 2 per person. I anticipate more issues being added as the project continues.

I researched authentication and login set up for FastAPI. Decided to continue this next week.


## October 5, 2022

Today: Reviewed database concepts and APIs

We did individual research and studying on databases and APIs. We are stilling trying to figure out the database file structure as well. Plans to reconvene tomororw to build the database tables and APIs.


## October 6, 2022

Today: I started building database tables and FastAPIs for: Positions, and Transaction;

Following the FastAPI videos, I started to write code for the Transaction FastAPIs. This is a work in progess and will need to be added and tested in Paper Stonks.


## October 7-9, 2022

Today: I worked on the FastAPI for Transaction.

It took a few days and I worked through a few errors, but finally, I got transaction FastAPI to work!!!! There are still a few revisions that will need to be made but currently its all working.


## October 10, 2022

Today: I reconvened with my group and we discussed our progress.

We all got stuck when trying to make two tables in the same database. It turns out the issue was having commas in places where they were not needed. sql/postgres is picky about where you can have commas, as it will think the comma signifies something else is to come; 


## October 11, 2022

Today: I worked on the FastAPI for Positions.

I worked with Tiffany to complete the FasAPIs for Positions. I did the GET all, POST create, and DELETE. We figured out the ForeignKey fields for Positions and Transactions.


## October 12-13, 2022

Today: I worked on the buy and sell form.

I researched how to have a pop up appear on the side of the website when a button is clicked, called off-canvas in bootstrap. I add this functionality to the StockDetail page that Matt worked on. Additionally, I made a table to go into that pop up. I had to figure out how to get information from the stock API, Alpha Vantage. Luckily, Matt had aleady pulled data from it on another page, so I followed a similar method. I was able to get the name and price of the stock to appear in the table. 


## October 14-15, 2022

Today: I worked on the table for buy and sell form.

Once I had the form made, I had to figure out how to prevent the form from submitting if the quantity entered is 0 or if the quantity entered surpasses the ammount a user can afford. This took some time to work out getting a user's buying power and multiplying that with the price of the stock. Matt and Leo assisted in figuring this out.


## October 17-18, 2022

Today: I worked on the ReadMe

Using the example ReadMe provided in Project Advice, I made the ReadMe today. I kept the main ReadMe page short and simple like the suggestion and added links to the additional information. It is mostly done, but I think we may add a Demo page and I may modify the API page.


## October 19, 2022

Today: I figured out how to make unit tests!!

Following the video of James making unit tests, I was able to create 4 unit tests. I want them to be checked by an instructor but I think they are good to go. All 4 unit tests test endpoints only. I would like to learn how to run a unit test on the query functions, and making a mock database in the future.


## October 20, 2022

Today: I reconvened with my team and set a plan for finishing up our project.

We made a plan to start transitioning to getting ready to submit the project. We want to be able to deploy the project this weekend or Monday. I made plans to help my teammates make unit tests tomorrow or on the weekend. Additionally, I will focus on CI/CD documentation. We need to figure out how to clean up the code to finally submit it.


## October 21, 2022

Today: I helped my teammates create unit tests. 

We ran into some issues with authentication, but were able to figure it out! Overall, it actually took a while, about 3-4 hours to get some unit tests works for everyone. 


## October 24, 2022

Today: I helped Tiffany make a unit test for AccountsVO.

Overall, today we had issues with CI/CD deployment. There is still alot to fix for that, but I'm confident we'll be able to get it done by Wednesday. In the evening, I helped Tiffany make a unit test for AccountsVO. Surprisingly, we ran into some issues but it ended up being an easy fix. There was an extra / at the end of the router path.

