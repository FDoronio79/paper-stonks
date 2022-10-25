import React from "react";
// import ps_logo from "../ghi/src/ps_logo.png"


function HomePage() {
    return (
        <>
            <div>
                <h5> Welcome to Paper STONKS</h5>

                <div className="col-lg-6 mx-auto ">
                    <p className="d-inline-flex p-2 row lead mb-4">

                    </p>
                    <h4>Developers: </h4>
                    <div className="col-lg-6 mx-auto ">
                        <li>Filamer Doronio</li>
                        <li>Jessica Lora</li>
                        <li>Leo Shon</li>
                        <li>Matthew Young</li>
                        <li>Tiffany Ameral</li>
                    </div>
                </div>
                <div>
                    <p>
                        Paper stonks is a new paper trading app still in development!<br />
                        We are a paper trading app targeting finance
                        enthusiasts who want to practice their
                        stock investment strategies. <br />

                    </p>
                    <p>
                        <h4>Features and Functionality</h4>
                        <h5>Functionality</h5>
                        <div>
                            <p>
                                <h6> Visitors experience when not-logged in: </h6>
                                Visitors of the site can view the site's homepage <br />
                                The homepage features an about section with company
                                information and a guide on how to navigate the site <br />
                                Using the search bar, visitors can
                                search for stocks of interest and go to it's page<br />
                                Visitors can create an account </p>

                            <h6> Visitors experience when logged in: </h6>
                            Additional features once logged in include:
                            A user can add "money" or "buying power" to
                            their account <br />
                            On a specific stock page, the user will
                            have access to the "Buy" and "Sell" options<br />
                            A user can "buy" a stock, gaining a position in that stock<br />
                            On a specific stock page, if a user has
                            a position in that stock, it will be displayed <br />
                            A user can also sell their stock <br />
                            Portfolio page will display a list of a user's
                            positions and total investment amount <br />
                        </div>
                        <p>
                            <br />
                            <h5>Upcoming Features</h5>
                            Inclusion of crypto currency integration<br />
                            Inclusion of a stock ticker<br />
                            Inclusion of visualization/graphs <br />
                            Inclusion of a market watch<br />
                            <br />
                        </p>
                        <p>
                        <h5>Links</h5>
                            <a href="https://gitlab.com/apex-legends1/paper-stonks/">Paper Stonks Gitlab</a> <br />
                            Extrenal API: <a href="https://www.alphavantage.co/">Alphavantage API</a> 
                        </p>
                        <div>
                        </div>
                    </p>
                </div>
                {/* <img src={ps_logo} alt="Logo" />; */}
            </div>
        </>
    );
}




export default HomePage;