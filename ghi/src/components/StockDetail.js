import { useEffect, useContext, useState } from "react";
import { SearchContext } from "../SearchContext";
import PositionForm from "./PositionForm";


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
                data-bs-toggle="offcanvas" data-bs-target="#offcanvasBUY" aria-controls="offcanvasBUY"
            >
                Buy
            </button>
            <button
                type="button"
                className="btn btn-light"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
            >
                Sell
            </button>
            <div className="offcanvas offcanvas-end offcanvas-size-lg" tabindex="-1" id="offcanvasBUY" aria-labelledby="offcanvasBUY">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasBUY">BUY {symbol.toUpperCase()}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <PositionForm price={price} symbol={symbol.toUpperCase()}/>
            </div>
            </div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">BUY {symbol.toUpperCase()}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <PositionForm price={price} symbol={symbol.toUpperCase()}/>
                </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default StockDetail;
