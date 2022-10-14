import { useEffect, useContext, useState } from "react";
import { SearchContext } from "../SearchContext";
function StockDetail({ search }) {
    // const search = useContext(SearchContext);
    const [symbol, setSymbol] = useState(search);
    const [price, setPrice] = useState("");

    useEffect(() => {
        async function getStockData() {
            //fetch url
            //get data
            //setPrice(data)
        }

        getStockData();
    }, []);

    return (
        <>
            <div>
                <h1>{search}</h1>
                <p>Price: {price}</p>
                <p>$PRICE CHANGE</p>
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
