import { useEffect, useState, useContext } from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line
import Chart from "chart.js/auto";
function StockDetail({ search }) {
    const { stockSymbol } = useParams();
    const [price, setPrice] = useState("");
    const [change, setChange] = useState("");
    const [percent, setPercent] = useState("");
    const buyingPow = localStorage.getItem("buyingPower");
    const [name, setNameStock] = useState("");
    const [shares_owned, setSharesOwned] = useState("");
    const usernameAcc = localStorage.getItem("Username");
    const [fastapi_token] = useContext(UserContext);
    const [graph_data, setGraphData] = useState("");

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
                setGraphData(data);
            }
        }

        getStockData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stockSymbol, setNameStock, setSharesOwned, setGraphData, usernameAcc]);

    const data = {
        labels: graph_data["labels"],
        datasets: [
            {
                label: " Rainfall",
                // fillColor: "#d048b6",
                fill: true,
                lineTension: 0.5,
                backgroundColor: "rgba(208,72,182,0.2)",
                borderColor: "#d048b6",
                borderWidth: 4,
                pointHoverBackgroundColor: "#d048b6",
                pointBackgroundColor: "#d048b6",
                pointBorderWidth: 4,
                pointHoverRadius: 10,
                pointHoverBorderWidth: 2,
                pointRadius: 4,

                data: graph_data["points"],
            },
        ],
    };
    const options = {
        color: "#ffffff",
        responsive: true,
        plugins: {
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
                display: true,
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
                },
                grid: {
                    color: "#8a8a8a",
                },
            },
            y: {
                title: {
                    text: "price",
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
        <>
            <div>
                <h3>Buying Power</h3>
                <h4>{buyingPow}</h4>
            </div>
            <div className="row my-4">
                <div className="col">
                    <div className="container">
                        <h1>{stockSymbol.toUpperCase()}</h1>
                        <h1>{name}</h1>
                        <p>Price: ${price}</p>
                        <p>
                            PRICE CHANGE: {change} by {percent}%
                        </p>
                    </div>
                </div>
                {shares_owned > 0 ? (
                    <div className="col">
                        <h4>Your position</h4>
                        <h5>{shares_owned} shares</h5>
                        <h5>
                            Market Value: ${(shares_owned * price).toFixed(2)}
                        </h5>
                    </div>
                ) : (
                    <div className="col"></div>
                )}
            </div>
            <div>
                <Line
                    data={data}
                    options={options}
                />
            </div>

            <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBUY"
                aria-controls="offcanvasBUY"
            >
                Buy
            </button>
            <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSELL"
                aria-controls="offcanvasSELL"
            >
                Sell
            </button>

            <div
                className="offcanvas offcanvas-end offcanvas-size-lg"
                tabIndex="-1"
                id="offcanvasBUY"
                aria-labelledby="offcanvasBUY"
            >
                <div className="offcanvas-header bg-dark">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasBUY"
                    >
                        BUY {stockSymbol.toUpperCase()}
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body bg-dark">
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
                <div className="offcanvas-header bg-dark">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasSELL"
                    >
                        SELL {stockSymbol.toUpperCase()}
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body bg-dark">
                    <SellForm
                        price={price}
                        symbol={stockSymbol.toUpperCase()}
                        name={name}
                    />
                </div>
            </div>
        </>
    );
}

export default StockDetail;
