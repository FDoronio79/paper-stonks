import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { UserContext } from "../context/UserContext";

export default function BuyForm({ price, symbol, name }) {
    const [fastapi_token] = useContext(UserContext);

    const buyingPow = localStorage.getItem("buyingPower");

    const usernameAcc = localStorage.getItem("Username");
    const symbolStock = symbol;
    const [quantity1, setQuantity] = useState("");
    const [currentQuantity, setCurrentQuantity] = useState("");
    let currDateTime = Date.now();
    const typeOfItem = "stock";
    const nameStock = name;
    const navigate = useNavigate();
    const estimatedPrice = (quantity1 * price).toFixed(2);
    const withoutDollarSign = buyingPow.replace("$", "");
    const removedCommas = withoutDollarSign.replaceAll(",", "");
    const buyingp = parseFloat(removedCommas);
    const maxQuantity = Math.floor(buyingp / price);
    const bpchange = 0 - estimatedPrice;
    const newQuantity = parseInt(quantity1) + currentQuantity;
    var positionDict = {
        username: usernameAcc,
        symbol: symbolStock,
        quantity: quantity1,
        type_of: typeOfItem,
        name: nameStock,
    };

    var transactionDict = {
        username: usernameAcc,
        symbol: symbolStock,
        quantity: quantity1,
        type_of: "BUY",
        price: price,
        time_of_purchase: currDateTime,
    };

    var updatePositionDict = {
        username: usernameAcc,
        symbol: symbolStock,
        quantity: newQuantity,
        type_of: typeOfItem,
        name: nameStock,
    };

    // function to get current quantity of specific stock you own
    useEffect(() => {
        async function getCurrentQuantity() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${fastapi_token}`
                },
                credentials: "include",
            };
            const response = await fetch(
                `${process.env.REACT_APP_TRADING_HOST}/positions/${symbolStock}?username=${usernameAcc}`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                setCurrentQuantity(data["quantity"]);
            } else {
            }
        }
        getCurrentQuantity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentQuantity, symbolStock, usernameAcc]);

    // this function will take care off all edge cases when buying a stock
    const submitTransaction = async () => {
        // first it will try to see if the user already has that specific stock in his profile
        const requestOptionsGet = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${fastapi_token}`
            },
            credentials: "include",
        };
        const responseGet = await fetch(
            `${process.env.REACT_APP_TRADING_HOST}/positions/${symbolStock}?username=${usernameAcc}`,
            requestOptionsGet
        );
        // eslint-disable-next-line
        const data = await responseGet.json();
        

        if (!data["message"]) {
            // if the user does have it then it will update their position with a PUT method
            const requestOptionsUpdateP = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${fastapi_token}`
                },
                body: JSON.stringify(updatePositionDict),
                credentials: "include",
            };
            const responseUpdateP = await fetch(
                `${process.env.REACT_APP_TRADING_HOST}/positions/${symbolStock}`,
                requestOptionsUpdateP
            );
            // eslint-disable-next-line
            const dataUpdateP = await responseUpdateP.json();
            
            if (responseUpdateP.ok) {
                // when response to the PUT request is ok then it will create a transacion and update your buying power.
                currDateTime = Date.now();
                const requestOptions = {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${fastapi_token}`
                    },
                    credentials: "include",
                    body: JSON.stringify(transactionDict),
                };

                const response = await fetch(
                    `${process.env.REACT_APP_TRADING_HOST}/transactions`,
                    requestOptions
                );
                // eslint-disable-next-line
                const data = await response.json();

                const requestOptionsBp = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${fastapi_token}`
                    },
                    credentials: "include",
                };
                const responseBp = await fetch(
                    `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts?bp_change=${bpchange}`,
                    requestOptionsBp
                );
                // eslint-disable-next-line
                const dataBp = await responseBp.json();
                alert(`Purchased ${quantity1} shares of ${symbolStock}!`);
            }
        } else {
            // if user doesn't have that specific stock then it will create a new position
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${fastapi_token}`
                },
                credentials: "include",
                body: JSON.stringify(positionDict),
            };

            const response = await fetch(
                `${process.env.REACT_APP_TRADING_HOST}/positions`,
                requestOptions
            );
            // eslint-disable-next-line
            const data = await response.json();

            if (response.ok) {
                // when response to the PUT request is ok then it will create a transacion and update your buying power.
                const requestOptions = {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${fastapi_token}`
                    },
                    credentials: "include",
                    body: JSON.stringify(transactionDict),
                };

                const response = await fetch(
                    `${process.env.REACT_APP_TRADING_HOST}/transactions`,
                    requestOptions
                );
                // eslint-disable-next-line
                const data = await response.json();

                const requestOptionsBp = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${fastapi_token}`
                    },
                    credentials: "include",
                };
                const responseBp = await fetch(
                    `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts?bp_change=${bpchange}`,
                    requestOptionsBp
                );
                // eslint-disable-next-line
                const dataBp = await responseBp.json();
                alert(`Purchased ${quantity1} shares of ${symbolStock}!`);
            } else {
                alert("Could not process request. Please try again later");
            }
        }
        // }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitTransaction();
        setTimeout(() => {
            window.location.reload();
        }, 500);
        navigate("/dashboard");
    };

    return (
        <div
            className="container text-left border border-dark p-3 "
            onSubmit={handleSubmit}
        >
            <form>
                <div className="row my-4">
                    <div className="col">
                        <h4>Buy Order</h4>
                    </div>
                    <div className="col">
                        <h4>{symbol}</h4>
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col">
                        <h4>Shares</h4>
                    </div>
                    <div className="col">
                        <input
                            required
                            type="number"
                            min="1"
                            max={maxQuantity}
                            step="1"
                            value={quantity1}
                            onChange={(e) => setQuantity(e.target.value)}
                            id="quantity"
                            placeholder="quantity"
                        />
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col">
                        <h4>Max allowed:</h4>
                    </div>
                    <div className="col">
                        <h4>{maxQuantity}</h4>
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col">
                        <h4>Market Price:</h4>
                    </div>
                    <div className="col">
                        <h4>${price}</h4>
                    </div>
                </div>

                <div className="row my-4">
                    <div className="col">
                        <h4>Estimated cost:</h4>
                    </div>
                    <div className="col">
                        <h4>${estimatedPrice}</h4>
                    </div>
                </div>
                <div className="row my-4">
                    <div className="col">
                        <h4>Buying Power:</h4>
                    </div>
                    <div className="col">
                        <h4>{buyingPow}</h4>
                    </div>
                </div>

                <button
                    type="submit"
                    className="sumbit col-12 p-3 mb-2 bg-dark text-white"
                >
                    BUY
                </button>
            </form>
        </div>
    );
}
