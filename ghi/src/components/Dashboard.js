import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Dashboard = ({}) => {
    const [fastapi_token] = useContext(UserContext);
    const [buyingPower, setBuyingPower] = useState("");
    const [currentbuyingPower, setCurrentBuyingPower] = useState("");
    const [positions, setPositions] = useState([]);
    const [username, setUserName] = useContext(UserContext);

    localStorage.setItem("Username", username);
    console.log("user", username);
    localStorage.setItem("position", positions);
    console.log("positions", positions);
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
                `http://localhost:8080/api/accounts`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                setCurrentBuyingPower(data["buying_power"]);
                setUserName(data["username"]);
                console.log("work", data);
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
                `http://localhost:8090/positions?username=${username}`,
                requestOptions
            );
            console.log("RESPONSE", response);
            if (response.ok) {
                const data = await response.json();
                setPositions(data);
                console.log("bruhhhh", data);
            } else {
                console.log("WTF");
            }
        }
        getPositions();
    }, [setPositions]);

    useEffect(() => {
        async function getStockPrice() {
            const responses = await Promise.all(positions.map(async position => {
                const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${position.symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
                const response = await fetch(priceUrl)
                const data = await response.json()
                return data                
            }))
            console.log("stock price?", responses)
            let prices = {}
            
            for (let position of positions) {
                if (!(position["symbol"] in prices)) {
                    prices[position["symbol"]] = 0
                } else {
                    prices[position["symbol"]] = parseFloat(responses["Global Quote"]["05. price"])
                }
                console.log("prices", prices)
            }
            //response will be an unordered data from the endpoint
            // loop over data, build a dictionary of symbol that points to the price {symbol:price}
            //when loop over position prices[position.symbol]
        }
        getStockPrice()
    })

    const updateBuyingPower = async () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };
        const response = await fetch(
            `http://localhost:8080/api/accounts?bp_change=${buyingPower}`,
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
        console.log("ooops");
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <div>
                    <tabel className="label">
                        <thead>
                            <tr>
                                <th>Symbole</th>
                                <th>Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map((position) => {
                                return (
                                    <tr key={position.id}>
                                        <td>{position.symbol}</td>
                                        <td>{position.name}</td>
                                        <td>{position.quantity}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </tabel>
                </div>
                <div>
                    <label className="label">
                        Current Buying Power:{currentbuyingPower}
                    </label>
                </div>
                <div>
                    <form className="box" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <div className="field">
                                <label className="label">
                                    Update Buying Power
                                </label>
                                <div className="control">
                                    <input
                                        type="text"
                                        placeholder="add or subtract buying power"
                                        value={buyingPower}
                                        onChange={(e) =>
                                            setBuyingPower(e.target.value)
                                        }
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">
                                Update Buying Power
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>Welcome to your Dashboard</p>
                </div>
            </>
        );
    }
};
export default Dashboard;
