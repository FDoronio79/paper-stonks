import { useState } from "react";

export default function PositionForm({ price, symbol, name }) {
    // transaction: username, symbol, quantity, type_of, time_of_purchase, price
    // position: username, symbol, quantity, type_of, name
    const [buyingPower, setBuyingPower] = useState("");
    const buyingPow = localStorage.getItem("buyingPower");
    const [updateQuantity, setUpdateQuantity] = useState("");
    const usernameAcc = localStorage.getItem("Username");
    const symbolStock = symbol;
    const [quantity1, setQuantity] = useState("");

    const typeOfItem = "stock";
    const nameStock = name;

    const estimatedPrice = quantity1 * price;
    const withoutDollarSign = buyingPow.replace("$", "");
    const removedCommas = withoutDollarSign.replaceAll(",", "");
    const buyingp = parseFloat(removedCommas);
    const maxQuantity = Math.floor(buyingp / price);
    const bpchange = 0 - estimatedPrice;
    var positionDict = {
        username: usernameAcc,
        symbol: symbolStock,
        quantity: quantity1,
        type_of: typeOfItem,
        name: nameStock,
    };

    // var transactionDict = {
    //     username: usernameAcc,
    //     symbol: symbolStock,
    //     quantity: quantity1,
    //     type_of: typeOfTrans,
    //     price: priceStock,
    //     time_of_purchase: timedate
    // };

    // var dataDict = {positionDict, transactionDict};

    const submitTransaction = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(positionDict),
        };

        const response = await fetch(
            "http://localhost:8090/positions",
            requestOptions
        );
        const data = await response.json();

        console.log(data);
        if (response.ok) {
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
            console.log(dataBp);
            setBuyingPower(dataBp);
            alert("Success!");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } else if (!response.ok) {
            const requestOptionsUpdateP = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            };
            const responseUpdateP = await fetch(
                `http://localhost:8090/positions/${symbol}`,
                requestOptionsUpdateP
            );
            const dataUpdateP = await responseUpdateP.json();
            console.log(dataUpdateP);
            setUpdateQuantity(data);
            if (responseUpdateP.ok) {
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
                console.log(dataBp);
                setBuyingPower(dataBp);
                alert("Success!");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } else {
            alert("Could not process request. Please try again later");
        }

        // FOR LATER UPDATE BUYING POWER
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitTransaction();
        console.log("Transaction Submitted");
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
