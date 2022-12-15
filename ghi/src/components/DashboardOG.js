import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
    const [fastapi_token] = useContext(UserContext);
    const [buyingPower, setBuyingPower] = useState("");
    const [currentbuyingPower, setCurrentBuyingPower] = useState("");
    const [positions, setPositions] = useState([]);
    const [username, setUserName] = useState("");
    const [portfolioValue, setPortfolioValue] = useState([]);

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
                        let stockPrice =
                            responses[idx]["Global Quote"]["05. price"] *
                            position["quantity"];
                        idx++;
                        count += stockPrice;
                        return { ...position, value: stockPrice.toFixed(2) };
                    }
                    return [];
                });
                setPortfolioValue(count.toFixed(2));
            });
            setPositions(stockPrices);
            return stockPrices;
        };

        if (positions.length > 0 && !positions[0]?.value) {
            getStockPrice();
        }
    }, [positions]);

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
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <div className="dashboard d-flex row justify-content-center">
                    <div className="d-flex justify-content-center">
                        <h1 className="display-4 p-5">Dashboard</h1>
                    </div>

                    <div className="d-flex justify-content-center p-5">
                        <ul>
                            <h4 className="display-6">
                                Total Value: ${portfolioValue}
                            </h4>
                            <hr></hr>
                            <h4 className="display-6">
                                Buying Power: {currentbuyingPower}
                            </h4>
                        </ul>
                    </div>

                    <div className="d-flex row justify-content-center">
                        <div className="d-flex  justify-content-center ml-5 ">
                            <h3 className="display-5">Positions</h3>
                        </div>
                        <div className="table-responsive shadow p-3 mb-5 bg-black col-xl-4 table-sm">
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Symbol</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {positions.map((position) => {
                                        return (
                                            <tr key={position.id}>
                                                <td>{position.symbol}</td>
                                                <td>{position.name}</td>
                                                <td>{position.quantity}</td>
                                                <td>$ {position.value}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="d-flex flex-srow justify-content-center">
                        <h6 className="display-6">Add Funds</h6>
                    </div>
                    <div className="d-flex row justify-content-center">
                        <form className="box" onSubmit={handleSubmit}>
                            <div className="form mb-3 d-flex justify-content-center">
                                <div className="flex-row">
                                    <div class="input-group mb-2">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                $
                                            </span>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="0.00"
                                            value={buyingPower}
                                            onChange={(e) =>
                                                setBuyingPower(e.target.value)
                                            }
                                            className="form-control"
                                            required
                                            aria-label="Amount (to the nearest dollar)"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Add Money
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
};
export default Dashboard;
