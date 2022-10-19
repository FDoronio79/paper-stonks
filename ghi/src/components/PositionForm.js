import { useState } from 'react';



export default function PositionForm({price, symbol, name}) {

// transaction: username, symbol, quantity, type_of, time_of_purchase, price 
// position: username, symbol, quantity, type_of, name

    const buyingPow = localStorage.getItem("buyingPower");

    const usernameAcc = localStorage.getItem('Username'); 
    const symbolStock = symbol;
    const [quantity1, setQuantity] = useState('');
    
    const typeOfItem = "stock";
    const nameStock = name;

    // const priceStock = price;
    // const timedate = Date.now.UTC();
    // const typeOfTrans = "BUY"

    const estimatedPrice = quantity1 * price;
    const buyingp = parseFloat(buyingPow);
    console.log(typeof buyingp)
    console.log(typeof price)
    const maxQuantity = (buyingp * price);
    console.log(typeof maxQuantity)

    var positionDict = {
        username: usernameAcc,
        symbol: symbolStock,
        quantity: quantity1,
        type_of: typeOfItem,
        name: nameStock
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
        if (!response.ok) {
            alert("Could not process request. Please try again later")
        } else {
            alert("Success!")
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        submitTransaction();
        console.log("Transaction Submitted");
        
    };

    return (
        <div className="container text-left border border-dark p-3 " onSubmit={handleSubmit}>
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
                    <input required type="number" min="1" max={maxQuantity} step="1" value={quantity1} onChange={e => setQuantity(e.target.value)} id="quantity" placeholder="quantity" />
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h4>Market Price:</h4>
                </div>
                <div className="col">
                    <h4>{price}</h4>
                </div>
            </div>

            <div className="row my-4">
                <div className="col">
                    <h4>Estimated cost:</h4>
                </div>
                <div className="col">
                    <h4>{estimatedPrice}</h4>
                    <h4>{buyingPow}</h4>
                    <h4>{maxQuantity}</h4>
                </div>
            </div>

        <button type="submit" className="sumbit col-12 p-3 mb-2 bg-dark text-white">BUY</button> 
        </form>
        </div>
        );      
}



