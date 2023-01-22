import { useEffect, useState, useContext } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { IconContext } from "react-icons";
// eslint-disable-next-line
import Chart from "chart.js/auto";
Chart.register(zoomPlugin);
function StockDetail({ search }) {
    const { stockSymbol } = useParams();
    const [price, setPrice] = useState("");
    const [change, setChange] = useState("");
    const [percent, setPercent] = useState("");
    // const buyingPow = localStorage.getItem("buyingPower");
    const [name, setNameStock] = useState("");
    const [shares_owned, setSharesOwned] = useState("");
    const usernameAcc = localStorage.getItem("Username");
    const [fastapi_token] = useContext(UserContext);
    const [graph_data, setGraphData] = useState("");
    const [inWatchlist, setInWatchlist] = useState("false");

    const favorite = async function () {
        if (inWatchlist) {
            const URL = `${process.env.REACT_APP_TRADING_HOST}/watchlist/${stockSymbol}`;
            const checkWatchlistOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };

            const watchlistCheckResponse = await fetch(
                URL,
                checkWatchlistOptions
            );
            if (watchlistCheckResponse.ok) {
                const data = await watchlistCheckResponse.json();
                setInWatchlist(!data);
            }
        } else {
            const URL = `${process.env.REACT_APP_TRADING_HOST}/watchlist/`;
            const checkWatchlistOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                body: JSON.stringify({ symbol: stockSymbol }),
                credentials: "include",
            };

            const watchlistCheckResponse = await fetch(
                URL,
                checkWatchlistOptions
            );
            if (watchlistCheckResponse.ok) {
                const data = await watchlistCheckResponse.json();
                setInWatchlist(data);
            }
        }
    };

    useEffect(() => {
        async function getStockData() {
            const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
            const nameUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
            const responseName = await fetch(nameUrl);
            if (responseName.ok) {
                const data = await responseName.json();
                setNameStock(data["Name"]);
            }
            const response = await fetch(priceUrl);
            if (response.ok) {
                const data = await response.json();
                setPrice(parseFloat(data["Global Quote"]["05. price"]));
                setChange(parseFloat(data["Global Quote"]["09. change"]));
                let tempPercent =
                    data["Global Quote"]["10. change percent"].substring(-1);
                let roundedPercent = parseFloat(tempPercent).toFixed(2);
                setPercent(roundedPercent);
            }

            //check to see if they have a position
            const checkPositionsUrl = `${process.env.REACT_APP_TRADING_HOST}/positions/${stockSymbol}?username=${usernameAcc}`;

            const checkOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };
            const positionCheckResponse = await fetch(
                checkPositionsUrl,
                checkOptions
            );

            if (positionCheckResponse.ok) {
                const checkData = await positionCheckResponse.json();
                setSharesOwned(checkData["quantity"]);
            }

            const getGraphUrl = `${process.env.REACT_APP_TRADING_HOST}/stock`;
            const getGraphReqOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    symbol: stockSymbol,
                    interval: "DAILY",
                }),
            };

            const graphResponse = await fetch(getGraphUrl, getGraphReqOptions);
            const data = await graphResponse.json();
            if (!response.ok) {
                console.log("couldn't get graph data");
            } else {
                data["labels"].reverse();
                data["points"].reverse();
                setGraphData(data);
            }
        }
        async function checkWatchlist() {
            const watchlistUrl = `${process.env.REACT_APP_TRADING_HOST}/watchlist/${stockSymbol}`;
            const checkWatchlistOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };

            const watchlistCheckResponse = await fetch(
                watchlistUrl,
                checkWatchlistOptions
            );
            if (watchlistCheckResponse.ok) {
                const data = await watchlistCheckResponse.json();
                setInWatchlist(data);
            }
        }

        getStockData();
        checkWatchlist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        stockSymbol,
        setNameStock,
        setSharesOwned,
        setGraphData,
        setInWatchlist,
        usernameAcc,
    ]);

    const data = {
        labels: graph_data["labels"],
        datasets: [
            {
                // fillColor: "#d048b6",
                fill: true,
                lineTension: 0.5,
                backgroundColor: change > 0 ? "#0B3621" : "#590000",
                borderColor: change > 0 ? "#2FEB8F" : "#DA0000",
                borderWidth: 2,
                // pointHoverBackgroundColor: "#d048b6",
                pointBackgroundColor: change > 0 ? "#2FEB8F" : "#DA0000",
                pointBorderWidth: 0,
                pointHoverRadius: 6,
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                data: graph_data["points"],
            },
        ],
    };
    const options = {
        maintainAspectRatio: false,
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        color: "#ffffff",
        responsive: true,
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    pinch: {
                        enabled: true, // Enable pinch zooming
                    },
                    wheel: {
                        enabled: true, // Enable wheel zooming
                    },
                    mode: "x",
                },
            },
            legend: {
                display: false,
                position: "right",
                labels: {
                    color: "#d048b6",
                },
                title: {
                    color: "#ffffff",
                },
            },
            title: {
                display: false,
                text: "Stock Performance",
                color: "#ffffff",
            },
        },
        scales: {
            x: {
                title: {
                    text: "date",
                    display: true,
                },

                ticks: {
                    color: "#ffffff",
                    maxTicksLimit: 5,
                    display: true,
                },
                grid: {
                    height: "calc(100vh - 2em)",
                    width: "calc(100vh - 2em)",
                    color: "#8a8a8a",
                },
            },
            y: {
                title: {
                    text: "price ($)",
                    display: true,
                },
                ticks: {
                    color: "#ffffff",
                },
                grid: {
                    color: "#8a8a8a",
                    display: false,
                },
            },
        },
    };
    return (
        <div className="stock d-flex row justify-content-center ">
            <div className="d-flex col-lg-8 flex-row justify-content-between">
                <h1 className="display-4 mt-3">{stockSymbol.toUpperCase()}</h1>
                <h1
                    className="display-4 mt-3"
                    onClick={favorite}
                >
                    {inWatchlist ? (
                        <IconContext.Provider
                            value={{
                                style: {
                                    color: "#DA0000",
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "8px",
                                },
                            }}
                        >
                            <MdOutlineFavorite />
                        </IconContext.Provider>
                    ) : (
                        <IconContext.Provider
                            value={{
                                style: {
                                    color: "white",
                                    height: "50px",
                                    width: "50px",
                                    marginBottom: "8px",
                                },
                            }}
                        >
                            <MdOutlineFavoriteBorder />
                        </IconContext.Provider>
                    )}
                </h1>
            </div>
            <div className="d-flex col-lg-8 flex-row justify-content-between">
                <p className="display-6">${price}</p>

                <p
                    className="display-6"
                    style={{
                        color: percent.startsWith("-") ? "#DA0000" : "#2FEB8F",
                    }}
                >
                    {change} ({percent}%)
                </p>
            </div>
            <hr className="col-lg-8 col-sm-10 col-xs-10"></hr>
            <div className="d-flex flex-row col-lg-8 justify-content-between">
                <div className="bg-transparent">
                    {shares_owned > 0 ? (
                        <>
                            <h6 className="display-6">Your Position</h6>
                            <h5 className="display-6">
                                ${(shares_owned * price).toFixed(2)} | (
                                {shares_owned})
                            </h5>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div
                    className="btn-group align-items-center"
                    role="group"
                >
                    <button
                        id="btnGroupDrop1"
                        type="button"
                        className="btn btn-light  btn-lg dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Trade
                    </button>
                    <ul
                        className="dropdown-menu"
                        aria-labelledby="btnGroupDrop1"
                    >
                        <li>
                            <button
                                type="button"
                                className="btn btn-dark btn-lg btn-outline-success dropdown-item"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasBUY"
                                aria-controls="offcanvasBUY"
                            >
                                Buy
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="btn btn-dark  btn-lg btn-outline-danger dropdown-item"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasSELL"
                                aria-controls="offcanvasSELL"
                            >
                                Sell
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className="chart-container col-lg-8 p-1 mt-3"
                style={{ height: "60vh" }}
            >
                <Line
                    data={data}
                    options={options}
                />
            </div>

            <div
                className="offcanvas offcanvas-end offcanvas-size-lg"
                tabIndex="-1"
                id="offcanvasBUY"
                aria-labelledby="offcanvasBUY"
            >
                <div className="offcanvas-header">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasBUY"
                    >
                        BUY {stockSymbol.toUpperCase()}
                    </h5>
                    <button
                        type="button"
                        className="btn-close btn-close-white text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <BuyForm
                        price={price}
                        symbol={stockSymbol.toUpperCase()}
                        name={name}
                    />
                </div>
            </div>

            <div
                className="offcanvas offcanvas-end offcanvas-size-lg"
                tabIndex="-1"
                id="offcanvasSELL"
                aria-labelledby="offcanvasSELL"
            >
                <div className="offcanvas-header">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasSELLHeader"
                    >
                        SELL {stockSymbol.toUpperCase()}
                    </h5>
                    <button
                        id="close-sell-form"
                        type="button"
                        className="btn-close btn-close-white text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <SellForm
                        price={price}
                        symbol={stockSymbol.toUpperCase()}
                        name={name}
                    />
                </div>
            </div>
        </div>
    );
}

export default StockDetail;
