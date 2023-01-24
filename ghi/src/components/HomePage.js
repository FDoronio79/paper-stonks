import React from "react";
import logo from "./images/logo-inverted-md.jpg";
import graph from "./images/graph.png";
import unlimitedcash from "./images/unlimitedcash.png";
import strategies from "./images/strategies.png";
import watchlist from "./images/watchlist.png";
import realtimedata from "./images/realtimedata.png";
import instructions from "./images/instructions.svg";
import buyandsell from "./images/buyandsell.png";
import buysell from "./images/buysell.gif";
import searchticker from "./images/searchticker.gif";
import addfunds from "./images/addfunds.gif";
import transactions from "./images/transactions.gif";
import watchlistgif from "./images/watchlistgif.gif";
import { NavLink } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function HomePage() {
    let homeMessage = `Simulated trading can help all levels of traders
    to practice their trading skills and strategies.
    You can access Paper Stonk's Trading simulator
    on desktop, web, and mobile devices, so you can
    try out a new idea as soon as it comes to mind.
    Sign up today to get started!`;
    return (
        <>
            <div className="home d-flex row justify-content-center mx-2">
                <div className="p-5 text-center jumbotron">
                    <span>
                        <h1 className="mb-3 display-1">Paper Stonks</h1>
                    </span>
                    <img className="" src={logo} width="200" alt="logo"></img>
                    <span>
                        <h4 className="mb-3 display-6">
                            Trade Stocks Sweat-Free
                        </h4>

                        <small>
                            <p>
                                <div className="new-line">{homeMessage}</div>
                            </p>
                        </small>
                        <button
                            className="btn bg-dark btn-outline-light btn-md px-4"
                            type="submit"
                        >
                            <NavLink
                                aria-current="page"
                                to="/Signup"
                                className="nav-link fw-bold"
                            >
                                Sign Up
                            </NavLink>
                        </button>
                    </span>
                </div>
                <div className=" d-flex justify-content-center col-lg-5 mx-auto">
                    <img
                        className="img-fluid rounded d-flex"
                        src={graph}
                        alt="graph"
                    ></img>
                </div>
                <div className="container justify-content-center">
                    <div className="p-5 text-center jumbotron">
                        <span>
                            <h4 className="mb-3 display-6">
                                What does Paper Stonks offer?
                            </h4>
                        </span>
                    </div>

                    <div className="row row-cols-1 row-cols-md-5 g-4 d-flex">
                        <div className="col">
                            <div className="card" style={{ width: `18rem` }}>
                                <img
                                    className="card-img-top"
                                    src={unlimitedcash}
                                    alt="unlimited cash"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Unlimited Virtual Cash
                                    </h5>
                                    <p className="card-text">
                                        Trade as many paper trading dollars as
                                        you want.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: `18rem` }}>
                                <img
                                    className="card-img-top"
                                    src={strategies}
                                    alt="strategies"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Test New strategies
                                    </h5>
                                    <p className="card-text">
                                        Track your investments and strategies on
                                        your dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: `18rem` }}>
                                <img
                                    className="card-img-top"
                                    src={watchlist}
                                    alt="watchlist"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Set up a watchlist
                                    </h5>
                                    <p className="card-text">
                                        Track selected stocks to easily
                                        determine when to buy or sell.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: `18rem` }}>
                                <img
                                    className="card-img-top"
                                    src={buyandsell}
                                    alt="buyandsell"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Buy & Sell Stocks
                                    </h5>
                                    <p className="card-text">
                                        Using Virtual cash, buy and sell stocks
                                        with a straight forward interface
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card" style={{ width: `18rem` }}>
                                <img
                                    className="card-img-top"
                                    src={realtimedata}
                                    alt="realtimedata"
                                />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Real-time Data
                                    </h5>
                                    <p className="card-text">
                                        Search for specific stocks, get real
                                        time quotes, and explore integrated
                                        charts with indicators
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 text-center jumbotron">
                        <span>
                            <h4 className="mb-3 display-6">
                                How to operate Paper Stonks
                            </h4>
                        </span>
                        <div className=" d-flex justify-content-center col-lg-5 mx-auto">
                            <img
                                className="img-fluid rounded d-flex"
                                src={instructions}
                                alt="instructions"
                            ></img>
                        </div>
                        {/* <small>
                            <p>
                                <div className="new-line">1. add funds</div>
                            </p>
                        </small>
                        <small>
                            <p>
                                <div className="new-line">
                                    2. follow/trade stocks
                                </div>
                            </p>
                        </small>
                        <small>
                            <p>
                                <div className="new-line">
                                    3. track your value
                                </div>
                            </p>
                        </small> */}
                    </div>
                    <Carousel className="carousel">
                        <Carousel.Item>
                            <img
                                className="carouselimg"
                                src={addfunds}
                                alt="First slide"
                            />
                            <Carousel.Caption></Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="carouselimg"
                                src={searchticker}
                                alt="Second slide"
                            />

                            <Carousel.Caption></Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="carouselimg"
                                src={buysell}
                                alt="Third slide"
                            />

                            <Carousel.Caption></Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="carouselimg"
                                src={transactions}
                                alt="Fourth slide"
                            />

                            <Carousel.Caption></Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="carouselimg"
                                src={watchlistgif}
                                alt="Fifth slide"
                            />

                            <Carousel.Caption></Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </>
    );
}

export default HomePage;
