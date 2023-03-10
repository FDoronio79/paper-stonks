import React from "react";
import react_logo from "./images/react.png";
import chartjs_logo from "./images/chartjs.png";
import alpha_vantage_logo from "./images/alpha-vantage.png";
import docker_logo from "./images/docker.png";
import gitlab_logo from "./images/gitlab.png";
import heroku_logo from "./images/heroku.png";
import postgres_logo from "./images/postgres.png";

import fastapi_logo from "./images/fast-api.png";
// import { NavLink } from "react-router-dom";

function AboutPage() {
    return (
        <div className="home d-flex row justify-content-center mx-2">
            <div className="container justify-content-center">
                <div className="d-flex justify-content-center text-center ">
                    <div className="justify-content-center flex-row ">
                        <h1 className="display-3">Developers </h1>
                        <hr></hr>
                        <div className="col">
                            <h4 className="display-6 dev">Filamer Doronio</h4>

                            <h4 className="display-6 dev">Matthew Young</h4>
                            <h4 className="display-6 dev ">Tiffany Ameral</h4>
                            <h4 className="display-6 dev ">Jessica Lora</h4>

                            <h4 className="display-6 dev ">Leo Shon</h4>
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="col-lg-6 mx-auto mt-5">
                    <div className=" d-flex justify-content-center col-lg-6 mx-auto">
                        <h1 className="display-3">Tech Stack </h1>
                    </div>
                    <hr></hr>
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <img
                                className="tool"
                                src={fastapi_logo}
                                alt="fastapi logo"
                            />
                        </div>
                        <div className="col">
                            <img
                                className="tool"
                                src={react_logo}
                                alt="react logo"
                            />
                        </div>
                    </div>
                    <br></br>
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <img
                                className="tool"
                                src={docker_logo}
                                alt="docker logo"
                            />
                        </div>
                        <div className="col">
                            <img
                                className="tool"
                                src={heroku_logo}
                                alt="heroku logo"
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center text-center">
                        <div className="col">
                            <img
                                className="tool"
                                src={chartjs_logo}
                                alt="chartjs logo"
                            />
                        </div>
                        <div className="col">
                            <img
                                className="tool"
                                src={postgres_logo}
                                alt="postgres logo"
                            />
                        </div>
                    </div>

                    <div></div>
                    <br />
                    <br />
                    <div className="d-flex row justify-content-center text-center mx-3 my-3">
                        <a href="https://gitlab.com/apex-legends1/paper-stonks/">
                            <img
                                className="tool"
                                src={gitlab_logo}
                                alt="gitlab"
                            ></img>
                        </a>
                        <br />
                        External API:
                        <a href="https://www.alphavantage.co/">
                            <img
                                className="tool"
                                src={alpha_vantage_logo}
                                alt="alpha-vantage"
                            ></img>
                        </a>
                    </div>
                </div>
                {/* developer pictures carousel */}
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
            </div>
        </div>
    );
}

export default AboutPage;
