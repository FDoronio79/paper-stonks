import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function BuyForm({ price, symbol, name }) {
    const buyingPow = localStorage.getItem("buyingPower");
    const navigate = useNavigate();
    const usernameAcc = localStorage.getItem("Username");
    const symbolStock = symbol;
    const [quantity1, setQuantity] = useState(1);
    const [currentQuantity, setCurrentQuantity] = useState("");
    const nameStock = name;

    const estimatedPrice = (quantity1 * price).toFixed(2);
    // const withoutDollarSign = buyingPow.replace("$", "");
    // const removedCommas = withoutDollarSign.replaceAll(",", "");
    // const buyingp = parseFloat(removedCommas);
    // const maxQuantity = Math.floor(buyingp / price);

    const submitTransaction = useCallback(async () => {
        const quantityDelta = parseInt(quantity1);
        if (quantityDelta === currentQuantity) {
            //delete position
            const deleteURL = `${process.env.REACT_APP_TRADING_HOST}/positions/${symbolStock}?username=${usernameAcc}`;
            const deleteOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            };
            const response = await fetch(deleteURL, deleteOptions);
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                alert("Could not process request. Please try again later");
            } else {
                //Creating transaction
                let transactionDict = {
                    username: usernameAcc,
                    symbol: symbolStock,
                    quantity: quantityDelta,
                    type_of: "SELL",
                    price: price,
                    time_of_purchase: Date.now(),
                };
                const transactionOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(transactionDict),
                };

                const response = await fetch(
                    `${process.env.REACT_APP_TRADING_HOST}/transactions`,
                    transactionOptions
                );
                const data = await response.json();

                console.log("TRANSACTION MADE", data);

                // FOR LATER UPDATE BUYING POWER
                const bpchange = estimatedPrice;
                const requestOptionsBp = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                };
                const responseBp = await fetch(
                    `http://localhost:8080/api/accounts?bp_change=${bpchange}`,
                    requestOptionsBp
                );
                const dataBp = await responseBp.json();
                console.log("NEW BUYING POWER", dataBp);
                alert(`Sold all shares of ${symbol}!`);
            }
        } else {
            //update position
            const putURL = `${process.env.REACT_APP_TRADING_HOST}/positions/${symbolStock}`;
            const quantityDelta = parseInt(quantity1);

            const positionDict = {
                username: usernameAcc,
                symbol: symbolStock,
                quantity: parseFloat(currentQuantity - quantityDelta),
                type_of: "stock",
                name: nameStock,
            };

            const putOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(positionDict),
                credentials: "include",
            };
            const response = await fetch(putURL, putOptions);
            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                alert("Could not process request. Please try again later");
            } else {
                //Creating transaction
                let transactionDict = {
                    username: usernameAcc,
                    symbol: symbolStock,
                    quantity: quantityDelta,
                    type_of: "SELL",
                    price: price,
                    time_of_purchase: Date.now(),
                };
                const transactionOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(transactionDict),
                };

                const response = await fetch(
                    `${process.env.REACT_APP_TRADING_HOST}/transactions`,
                    transactionOptions
                );
                const data = await response.json();

                console.log("TRANSACTION MADE", data);

                // FOR LATER UPDATE BUYING POWER
                const bpchange = estimatedPrice;
                const requestOptionsBp = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                };
                const responseBp = await fetch(
                    `http://localhost:8080/api/accounts?bp_change=${bpchange}`,
                    requestOptionsBp
                );
                const dataBp = await responseBp.json();
                console.log("NEW BUYING POWER", dataBp);
                alert(`Sold ${quantityDelta} shares of ${symbol}!`);
            }
        }
    }, [
        currentQuantity,
        estimatedPrice,
        nameStock,
        price,
        quantity1,
        symbol,
        symbolStock,
        usernameAcc,
    ]);

    useEffect(() => {
        async function getCurrentQuantity() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            };
            const response = await fetch(
                `http://localhost:8090/positions/${symbolStock}?username=${usernameAcc}`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                setCurrentQuantity(data["quantity"]);
                console.log(data);
            } else {
                setCurrentQuantity(0);
            }
        }
        getCurrentQuantity();
    }, [setCurrentQuantity, submitTransaction, symbolStock, usernameAcc]);

    const handleSubmit = (e) => {
        e.preventDefault();
        submitTransaction();
        console.log("Transaction Submitted");
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
                        <h4>Sell Order</h4>
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
                            max={currentQuantity}
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
                        <h4>Shares Owned:</h4>
                    </div>
                    <div className="col">
                        <h4>{currentQuantity}</h4>
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
                        <h4>Sell value:</h4>
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
                    SELL
                </button>
            </form>
        </div>
    );
}
