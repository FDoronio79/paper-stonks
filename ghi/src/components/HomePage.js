import React from "react";
// import ps_logo from "../ghi/src/ps_logo.png"
import { Link } from "react-router-dom";

function HomePage() {
    return (
        <>
            <div className="home d-flex row justify-content-center mx-2">
                <div className="p-5 text-center jumbotron">
                    <span>
                        <h1 className="mb-3 display-1">Paper Stonks</h1>
                    </span>
                    <img
                        className=""
                        src="images/logo-inverted-md.jpg"
                        width="200"
                    ></img>
                    <span>
                        <h4 className="mb-3 display-6">
                            Trade Stocks Sweat-Free
                        </h4>
                    </span>
                </div>

                <div className="container justify-content-center">
                    <div className=" d-flex justify-content-center col-lg-5 mx-auto">
                        <img
                            className="img-fluid rounded d-flex"
                            src="images/graph.png"
                        ></img>
                    </div>
                    <br></br>

                    <div className="col-lg-6 mx-auto mt-5">
                        <div className=" d-flex justify-content-center col-lg-6 mx-auto">
                            <h4 className="display-6">Tech Stack</h4>
                        </div>
                        <div className="row justify-content-center text-center">
                            <div className="col">
                                <img
                                    className="tool"
                                    src="images/fast-api.png"
                                    alt="Fast API"
                                />
                            </div>
                            <div className="col">
                                <img
                                    className="tool"
                                    src="images/react.png"
                                    alt="Fast API"
                                />
                            </div>
                        </div>
                        <br></br>
                        <div className="row justify-content-center text-center">
                            <div className="col">
                                <img
                                    className="tool"
                                    src="images/docker.png"
                                    alt="Fast API"
                                />
                            </div>
                            <div className="col">
                                <img
                                    className="tool"
                                    src="images/heroku1.png"
                                    alt="Fast API"
                                />
                            </div>
                        </div>
                        <div className="row justify-content-center text-center">
                            <div className="col">
                                <img
                                    className="tool"
                                    src="images/chartjs.png"
                                    alt="Fast API"
                                />
                            </div>
                            <div className="col">
                                <img
                                    className="tool"
                                    src="images/postgres.png"
                                    alt="Fast API"
                                />
                            </div>
                        </div>

                        <div></div>
                        <br />
                        <br />
                        <div className="d-flex justify-content-center text-center ">
                            <div className="justify-content-center flex-row ">
                                <h1 className="display-3">Developers </h1>
                                <hr></hr>
                                <div className="col">
                                    <h4 className="display-6 dev">
                                        Filamer Doronio
                                    </h4>

                                    <h4 className="display-6 dev">
                                        Matthew Young
                                    </h4>
                                    <h4 className="display-6 dev ">
                                        Tiffany Ameral
                                    </h4>
                                    <h4 className="display-6 dev ">
                                        Jessica Lora
                                    </h4>

                                    <h4 className="display-6 dev ">Leo Shon</h4>
                                </div>
                            </div>
                        </div>

                        {/* <div className="home d-flex row justify-content-center mx-3 my-3">
                            <div
                                id="carouselExampleCaptions"
                                className="carousel slide bg-transparent col-lg-6"
                                data-bs-ride="false"
                            >
                                <div className="carousel-indicators">
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to="0"
                                        className="active"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>
                                    <button
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                    ></button>
                                </div>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img
                                            src="images/matthew-young.jpg"
                                            className="d-block w-100 rounded"
                                            alt="matt young"
                                        />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>First slide label</h5>
                                            <p>
                                                Some representative placeholder
                                                content for the first slide.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="images/stock1.jpg"
                                            className="d-block w-100 rounded"
                                            alt="..."
                                        />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>Second slide label</h5>
                                            <p>
                                                Some representative placeholder
                                                content for the second slide.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <img
                                            src="images/stock2.jpg"
                                            className="d-block w-100 rounded"
                                            alt="..."
                                        />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>Third slide label</h5>
                                            <p>
                                                Some representative placeholder
                                                content for the third slide.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="carousel-control-prev"
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide="prev"
                                >
                                    <span
                                        className="carousel-control-prev-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                        Previous
                                    </span>
                                </button>
                                <button
                                    className="carousel-control-next"
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide="next"
                                >
                                    <span
                                        className="carousel-control-next-icon"
                                        aria-hidden="true"
                                    ></span>
                                    <span className="visually-hidden">
                                        Next
                                    </span>
                                </button>
                            </div>
                        </div> */}
                        <div className="d-flex row justify-content-center text-center mx-3 my-3">
                            <a href="https://gitlab.com/apex-legends1/paper-stonks/">
                                <img
                                    className="tool"
                                    src="images/gitlab.png"
                                ></img>
                            </a>{" "}
                            <br />
                            External API:{" "}
                            <a href="https://www.alphavantage.co/">
                                <img
                                    className="tool"
                                    src="images/alpha-vantage.png"
                                ></img>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
