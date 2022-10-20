import { useEffect, useState } from "react";
import PositionForm from "./PositionForm";


function StockDetail({ search }) {
    // const search = useContext(SearchContext);
    const [symbol, setSymbol] = useState(search);
    const [price, setPrice] = useState("");
    const [change, setChange] = useState("");
    const [percent, setPercent] = useState("");
    const buyingPow = localStorage.getItem("buyingPower");
    const [name, setNameStock] = useState('');

    useEffect(() => {
        async function getStockData() {
            const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${search}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
            const nameUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
            const responseName = await fetch(nameUrl);
            if (responseName.ok) {
                const data = await responseName.json();
                setNameStock((data["Name"]));
            }
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
    }, [setSymbol, setNameStock]);

    return (
        <>
            <div>
                <h3>Buying Power</h3>
                <h4>{buyingPow}</h4>
            </div>
            <div className="container">
                <h1>{symbol.toUpperCase()}</h1>
                <h1>{name}</h1>
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
                className="btn btn-dark"
                data-bs-toggle="offcanvas" data-bs-target="#offcanvasSELL" aria-controls="offcanvasSELL"
            >
                Sell
            </button>

            <div className="offcanvas offcanvas-end offcanvas-size-lg" tabindex="-1" id="offcanvasBUY" aria-labelledby="offcanvasBUY">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasBUY">BUY {symbol.toUpperCase()}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <PositionForm price={price} symbol={symbol.toUpperCase()} name={name}/>
            </div>
            </div>

            <div className="offcanvas offcanvas-end offcanvas-size-lg" tabindex="-1" id="offcanvasSELL" aria-labelledby="offcanvasSELL">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasSELL">SELL {symbol.toUpperCase()}</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <PositionForm price={price} symbol={symbol.toUpperCase()} name={name} />
            </div>
            </div>

        </>
    );
}

export default StockDetail;
