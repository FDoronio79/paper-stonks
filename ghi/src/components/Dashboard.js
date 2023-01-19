import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Doughnut } from "react-chartjs-2";

const Dashboard = ({ setSymbol, symbol }) => {
    const navigate = useNavigate();
    const [fastapi_token] = useContext(UserContext);
    const [buyingPower, setBuyingPower] = useState("");
    const [currentbuyingPower, setCurrentBuyingPower] = useState("");
    const [positions, setPositions] = useState([]);
    const [username, setUserName] = useState("");
    const [portfolioValue, setPortfolioValue] = useState("");
    // const [graph_data, setGraphData] = useState("");

    localStorage.setItem("Username", username);
    localStorage.setItem("buyingPower", currentbuyingPower);

    useEffect(() => {
        async function getBuyingPower() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };
            const response = await fetch(
                `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                setCurrentBuyingPower(data["buying_power"]);
                setUserName(data["username"]);
            }
        }
        getBuyingPower();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentBuyingPower, setUserName]);

    // this function gets the positions from the backend on page load
    useEffect(() => {
        async function getPositions() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };
            const response = await fetch(
                `${process.env.REACT_APP_TRADING_HOST}/positions?username=${username}`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                setPositions(data);
            } else {
            }
        }
        getPositions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    const data = {
        labels: positions.map((position) => [position.symbol]),
        datasets: [
            {
                label: " value",
                data: positions.map((position) => [position.value]),
                backgroundColor: [
                    "#205072",
                    "#329D9C",
                    "#56C596",
                    "#7BE495",
                    "#CFF4D2",
                    "#7BD5F5",
                    "#787FF6",
                    "#4ADEDE",
                    "#1CA7EC",
                    "#1F2F98",
                ],
                hoverOffset: 40,
            },
        ],
    };

    const options = {
        layout: {
            padding: {
                bottom: 20, //set that fits the best
            },
        },
        borderJoinStyle: "bevel",
        borderWidth: 0,
        plugins: {
            legend: {
                labels: {
                    color: "#ffffff",
                },
            },
        },
    };
    /* This function gets the stock prices from our third party API and creates a 
    key, value pair in the positions dictionary with the dollar value of your stock position
    */
    useEffect(() => {
        let getStockPrice = async () => {
            let stockPrices;
            let idx = 0;
            let count = 0;
            await Promise.all(
                positions.map(async (position) => {
                    const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${position.symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
                    const response = await fetch(priceUrl);
                    if (response.ok) {
                        const data = await response.json();
                        return data;
                    } else {
                        return { message: "stock data unavailable" };
                    }
                })
            ).then((responses) => {
                stockPrices = positions.map((position) => {
                    if (idx < positions.length) {
                        position["value"] = parseFloat(
                            parseFloat(
                                responses[idx]["Global Quote"]["05. price"] *
                                    position["quantity"]
                            ).toFixed(2)
                        );
                        position["stockPrice"] = parseFloat(
                            responses[idx]["Global Quote"]["05. price"]
                        );

                        position["stockChange"] = parseFloat(
                            parseFloat(
                                responses[idx]["Global Quote"]["09. change"]
                            ).toFixed(2)
                        );
                        position["stockChangePercent"] = parseFloat(
                            parseFloat(
                                responses[idx]["Global Quote"][
                                    "10. change percent"
                                ].replace("%", "")
                            ).toFixed(2)
                        );
                        idx++;
                        count += position["value"];
                        return { ...position };
                    }

                    return [];
                });
                setPortfolioValue(
                    (
                        Math.round((count + Number.EPSILON) * 100) / 100
                    ).toLocaleString("en-US")
                );
            });

            setPositions(stockPrices);
            return stockPrices;
        };

        if (positions.length > 0 && !positions[0]?.value) {
            getStockPrice();
        }
    }, [positions, currentbuyingPower]);

    // this function will let the user add money to their account or cash out however much they wish
    const updateBuyingPower = async () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${fastapi_token}`,
            },
            credentials: "include",
        };
        const response = await fetch(
            `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts?bp_change=${buyingPower}`,
            requestOptions
        );
        const data = await response.json();
        if (response.ok) {
            setBuyingPower(data);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBuyingPower();
    };

    if (!fastapi_token) {
        return (
            <Navigate
                replace
                to="/login"
            />
        );
    } else {
        return (
            <>
                <div className="dashboard d-flex row justify-content-around text-center">
                    <div className="d-flex justify-content-center p-0">
                        <h1 className="display-3 p-5">Dashboard</h1>
                    </div>

                    <div className="d-flex text-center justify content around p-0">
                        <div className="d-flex justify-content-center col-6">
                            <h3 className="display-6">
                                Total Value: $
                                {portfolioValue.toLocaleString("en-US")}
                            </h3>
                        </div>
                        <div className="d-grid justify-content-center col-6">
                            <h3 className="display-6">
                                Buying Power: {currentbuyingPower}
                            </h3>
                        </div>

                        <div className="d-flex justify-content-center align-items-center col-xs-6">
                            <div
                                className="modal fade"
                                id="exampleModal"
                                tabIndex="-1"
                                aria-labelledby="exampleModalLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog">
                                    <div className="modal-content text-black">
                                        <div className="modal-header">
                                            <h1
                                                className="modal-title fs-5"
                                                id="exampleModalLabel"
                                            >
                                                Add Funds
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <form
                                                className=""
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">
                                                            $
                                                        </span>
                                                    </div>

                                                    <input
                                                        id="add-money"
                                                        type="text"
                                                        placeholder="0.00"
                                                        value={buyingPower}
                                                        onChange={(e) =>
                                                            setBuyingPower(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="form-control"
                                                        required
                                                        aria-label="Amount (to the nearest dollar)"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                data-bs-dismiss="modal"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-dismiss="modal"
                                                onClick={handleSubmit}
                                            >
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex row justify-content-center mt-4 col-lg-2 col-md-3 col-sm-4 col-xs-2 p-0">
                        <button
                            type="button"
                            className="btn-dark btn-lg"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            Add Funds
                        </button>
                    </div>

                    <div className="d-flex row justify-content-center text-center mt-4 p-0">
                        <div className="table-responsive shadow mb-2 bg-black col-xl-6 table-sm p-0">
                            <h3 className="display-5">Positions</h3>
                            <table className="table mx-auto table-hover">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Symbol</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {positions.map((position) => {
                                        return (
                                            <tr
                                                onClick={() => {
                                                    setSymbol(position.symbol);

                                                    navigate(
                                                        `/stock/${position.symbol.toUpperCase()}`
                                                    );
                                                }}
                                                className="position-row"
                                                key={position.id}
                                                value={position.symbol}
                                            >
                                                <td>{position.symbol}</td>
                                                <td>
                                                    <p className="mb-0">
                                                        {position.stockPrice}
                                                    </p>
                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            color:
                                                                position.stockChange <
                                                                0
                                                                    ? "#DA0000"
                                                                    : "#2FEB8F",
                                                        }}
                                                    >
                                                        {position.stockChange >
                                                        0
                                                            ? "+"
                                                            : ""}
                                                        {position.stockChange}
                                                    </p>
                                                </td>
                                                <td>{position.quantity}</td>
                                                <td>
                                                    <p className="mb-0">
                                                        ${position.value}
                                                    </p>
                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            color:
                                                                position.stockChange <
                                                                0
                                                                    ? "#DA0000"
                                                                    : "#2FEB8F",
                                                        }}
                                                    >
                                                        {position.stockChange >
                                                        0
                                                            ? "+"
                                                            : ""}
                                                        {(
                                                            (position.stockChangePercent /
                                                                100) *
                                                            position.value
                                                        ).toFixed(2)}
                                                    </p>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div
                            className="chart-container flex-row col-xl-3 mt-5 justify-content-center"
                            style={{ height: "60vh" }}
                        >
                            <Doughnut
                                data={data}
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
};
export default Dashboard;
