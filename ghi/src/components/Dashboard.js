import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
    const [fastapi_token] = useContext(UserContext);
    const [buyingPower, setBuyingPower] = useState("");
    const [currentbuyingPower, setCurrentBuyingPower] = useState("");
    const [positions, setPositions] = useState([]);
    const [username, setUserName] = useContext(UserContext);
    const [portfolioValue, setPortfolioValue] = useState([]);

    localStorage.setItem("Username", username);
    console.log("user", username);
    localStorage.setItem("buyingPower", currentbuyingPower);
    console.log(currentbuyingPower);

    useEffect(() => {
        async function getBuyingPower() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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
                // console.log("work", data);
            }
        }
        getBuyingPower();
    }, [setCurrentBuyingPower, setUserName]);

    useEffect(() => {
        async function getPositions() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            };
            const response = await fetch(
                `${process.env.REACT_APP_TRADING_HOST}/positions?username=${username}`,
                requestOptions
            );
            // console.log("RESPONSE", response);
            if (response.ok) {
                const data = await response.json();
                setPositions(data);
                // console.log("bruhhhh", data);
            } else {
                // console.log("WTF");
            }
        }
        getPositions();
    }, [username]);

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
                            responses[idx]["Global Quote"]["05. price"] * position["quantity"];
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
            },
            credentials: "include",
        };
        const response = await fetch(
            `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts?bp_change=${buyingPower}`,
            requestOptions
        );
        const data = await response.json();
        console.log(response);
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
        console.log("updated buying power");
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
                <div>
                    <h3>Positions</h3>
                    <table className="table table-striped">
                        <thead>
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
                <div>
                    <label className="label">Current Positions Value:${portfolioValue}</label>
                </div>
                <div></div>
                <div>
                    <label className="label">Current Buying Power:{currentbuyingPower}</label>
                </div>
                <div>
                    <form
                        className="box"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-floating mb-3">
                            <div className="field">
                                <label className="label">Update Buying Power</label>
                                <div className="control">
                                    <input
                                        type="text"
                                        placeholder="add or subtract buying power"
                                        value={buyingPower}
                                        onChange={(e) => setBuyingPower(e.target.value)}
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Update Buying Power
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>Welcome to your Dashboard</p>
                    <div
                        className="container-fluid container-max-widths:(sm)"
                        style={{}}
                    >
                    </div>
                </div>
            </>
        );
    }
};
export default Dashboard;
