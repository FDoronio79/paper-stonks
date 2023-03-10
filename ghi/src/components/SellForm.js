import { useEffect, useState, useCallback, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function SellForm({ price, symbol, name }) {
    const [show, setShow] = useState(false);
    const [showBad, setShowBad] = useState(false);
    const buyingPow = localStorage.getItem("buyingPower");
    const usernameAcc = localStorage.getItem("Username");
    const symbolStock = symbol;
    const [quantity1, setQuantity] = useState(1);
    const [currentQuantity, setCurrentQuantity] = useState("");
    const [fastapi_token] = useContext(UserContext);
    const nameStock = name;

    const estimatedPrice = (quantity1 * price).toFixed(2);
    const submitTransaction = useCallback(async () => {
        const quantityDelta = parseInt(quantity1);
        if (quantityDelta === currentQuantity) {
            //delete position
            const deleteURL = `${process.env.REACT_APP_TRADING_HOST}/positions/${symbolStock}?username=${usernameAcc}`;
            const deleteOptions = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };
            const response = await fetch(deleteURL, deleteOptions);
            // eslint-disable-next-line
            const data = await response.json();
            if (!response.ok) {
                setShowBad(true);
            } else {
                setShow(true);
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
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${fastapi_token}`,
                    },
                    credentials: "include",
                    body: JSON.stringify(transactionDict),
                };

                const response = await fetch(
                    `${process.env.REACT_APP_TRADING_HOST}/transactions`,
                    transactionOptions
                );
                // eslint-disable-next-line
                const data = await response.json();

                // FOR LATER UPDATE BUYING POWER
                const bpchange = estimatedPrice;
                const requestOptionsBp = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${fastapi_token}`,
                    },
                    credentials: "include",
                };
                const responseBp = await fetch(
                    `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts?bp_change=${bpchange}`,
                    requestOptionsBp
                );
                // eslint-disable-next-line
                const dataBp = await responseBp.json();
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
                    Authorization: `Bearer ${fastapi_token}`,
                },
                body: JSON.stringify(positionDict),
                credentials: "include",
            };
            const response = await fetch(putURL, putOptions);
            // eslint-disable-next-line
            const data = await response.json();

            if (!response.ok) {
                setShowBad(true);
            } else {
                setShow(true);
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
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${fastapi_token}`,
                    },
                    credentials: "include",
                    body: JSON.stringify(transactionDict),
                };

                const response = await fetch(
                    `${process.env.REACT_APP_TRADING_HOST}/transactions`,
                    transactionOptions
                );
                // eslint-disable-next-line
                const data = await response.json();

                // FOR LATER UPDATE BUYING POWER
                const bpchange = estimatedPrice;
                const requestOptionsBp = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${fastapi_token}`,
                    },
                    credentials: "include",
                };
                const responseBp = await fetch(
                    `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts?bp_change=${bpchange}`,
                    requestOptionsBp
                );
                // eslint-disable-next-line
                const dataBp = await responseBp.json();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    Authorization: `Bearer ${fastapi_token}`,
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
                setCurrentQuantity(0);
            }
        }
        getCurrentQuantity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setCurrentQuantity, submitTransaction, symbolStock, usernameAcc]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (quantity1 <= 0) {
        } else {
            submitTransaction();
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            // navigate("/dashboard");
        }
    };

    return (
        <div
            className="container text-leftp-3 "
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
                            className="form-control"
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
                    className="submit btn-danger col-12 p-3 mb-2 text-white"
                >
                    SELL
                </button>
            </form>
            <ToastContainer
                className="p-3"
                position={"top-center"}
            >
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    className="p-0"
                    autohide
                >
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">SUCCESS</strong>
                    </Toast.Header>
                    <Toast.Body className="bg-dark text-white">
                        SOLD {quantity1} shares of {symbol}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer
                className="p-3"
                position={"top-center"}
            >
                <Toast
                    onClose={() => setShowBad(false)}
                    show={showBad}
                    delay={3000}
                    className="p-0"
                    autohide
                >
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">ERROR</strong>
                    </Toast.Header>
                    <Toast.Body className="bg-dark text-white">
                        We were unable to process your request at this time.
                        Please try again later.
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
}
