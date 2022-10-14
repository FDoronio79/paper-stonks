import { useEffect, useContext, useState } from "react";
import { SearchContext } from "../SearchContext";
function StockDetail({ search }) {
    // const search = useContext(SearchContext);
    const [symbol, setSymbol] = useState(search);
    const [price, setPrice] = useState("");
    const [change, setChange] = useState("");
    const [percent, setPercent] = useState("");

    useEffect(() => {
        async function getStockData() {
            const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${search}&apikey=${process.env.ALPHA_VANTAGE}`;
            const response = await fetch(priceUrl);
            if (response.ok) {
                const data = await response.json();
                setPrice(parseFloat(data["Global Quote"]["05. price"]));
                setChange(parseFloat(data["Global Quote"]["09. change"]));
                let tempPercent = data["Global Quote"]["10. change percent"].substring(-1);
                console.log(`tempPercent: ${tempPercent}`);
                let roundedPercent = parseFloat(tempPercent).toFixed(2);
                setPercent(roundedPercent);
                console.log(data);
            }
        }

        getStockData();
    }, [setSymbol]);

    return (
        <>
            <div className="container">
                <h1>{symbol.toUpperCase()}</h1>
                <p>Price: ${price}</p>
                <p>
                    PRICE CHANGE: {change} by {percent}%
                </p>
            </div>

            <button
                type="button"
                className="btn btn-dark"
            >
                Buy
            </button>
            <button
                type="button"
                className="btn btn-light"
            >
                Sell
            </button>
        </>
    );
}

export default StockDetail;
