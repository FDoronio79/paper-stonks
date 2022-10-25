import { useEffect, useState , useContext} from "react";
import BuyForm from "./BuyForm";
import SellForm from "./SellForm";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function StockDetail({ search }) {
    // const search = useContext(SearchContext);
    const { stockSymbol } = useParams();
    // const [symbol, setSymbol] = useState(search.toUpperCase());
    // const [symbol, setSymbol] = useState(stockSymbol);
    const [price, setPrice] = useState("");
    const [change, setChange] = useState("");
    const [percent, setPercent] = useState("");
    const buyingPow = localStorage.getItem("buyingPower");
    const [name, setNameStock] = useState("");
    const [shares_owned, setSharesOwned] = useState("");
    const usernameAcc = localStorage.getItem("Username");
    const [fastapi_token] = useContext(UserContext);

    useEffect(() => {
        async function getStockData() {
            // setSymbol(stockSymbol);
            // console.log("HELLO", process.env.REACT_APP_ALPHA_VANTAGE);
            const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
            const nameUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
            const responseName = await fetch(nameUrl);
            if (responseName.ok) {
                const data = await responseName.json();
                setNameStock(data["Name"]);
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

            //check to see if they have a position
            const checkPositionsUrl = `${process.env.REACT_APP_TRADING_HOST}/positions/${stockSymbol}?username=${usernameAcc}`;

            const checkOptions = {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${fastapi_token}`
                },
                credentials: "include",
            };
            const positionCheckResponse = await fetch(checkPositionsUrl, checkOptions);

            if (positionCheckResponse.ok) {
                const checkData = await positionCheckResponse.json();
                console.log("\n\n\n\n\nPosition Check data", checkData);
                setSharesOwned(checkData["quantity"]);
            }
        }

        getStockData();
    }, [stockSymbol, setNameStock, setSharesOwned, usernameAcc]);

    return (
        <>
            <div>
                <h3>Buying Power</h3>
                <h4>{buyingPow}</h4>
            </div>
            <div className="row my-4">
                <div className="col">
                    <div className="container">
                        <h1>{stockSymbol.toUpperCase()}</h1>
                        <h1>{name}</h1>
                        <p>Price: ${price}</p>
                        <p>
                            PRICE CHANGE: {change} by {percent}%
                        </p>
                    </div>
                </div>
                {shares_owned > 0 ? (
                    <div className="col">
                        <h4>Your position</h4>
                        <h5>{shares_owned}</h5>
                    </div>
                ) : (
                    <div className="col"></div>
                )}
            </div>

            <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBUY"
                aria-controls="offcanvasBUY"
            >
                Buy
            </button>
            <button
                type="button"
                className="btn btn-dark"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasSELL"
                aria-controls="offcanvasSELL"
            >
                Sell
            </button>

            <div
                className="offcanvas offcanvas-end offcanvas-size-lg"
                tabIndex="-1"
                id="offcanvasBUY"
                aria-labelledby="offcanvasBUY"
            >
                <div className="offcanvas-header">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasBUY"
                    >
                        BUY {stockSymbol.toUpperCase()}
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <BuyForm
                        price={price}
                        symbol={stockSymbol.toUpperCase()}
                        name={name}
                    />
                </div>
            </div>

            <div
                className="offcanvas offcanvas-end offcanvas-size-lg"
                tabIndex="-1"
                id="offcanvasSELL"
                aria-labelledby="offcanvasSELL"
            >
                <div className="offcanvas-header">
                    <h5
                        className="offcanvas-title"
                        id="offcanvasSELL"
                    >
                        SELL {stockSymbol.toUpperCase()}
                    </h5>
                    <button
                        type="button"
                        className="btn-close text-reset"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
                    <SellForm
                        price={price}
                        symbol={stockSymbol.toUpperCase()}
                        name={name}
                    />
                </div>
            </div>
        </>
    );
}

export default StockDetail;
