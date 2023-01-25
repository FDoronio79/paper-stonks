import { useContext, useState, useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TfiTrash } from "react-icons/tfi";
import { IconContext } from "react-icons";

const WatchlistPage = ({ setSymbol, symbol }) => {
    const navigate = useNavigate();
    const [fastapi_token] = useContext(UserContext);
    const [watchlist, setWatchlist] = useState();
    const [prices, setPrices] = useState([]);
    const [editing, setEditing] = useState(false);

    let startEditing = () => {
        setEditing(true);
    };

    let submitEditing = () => {
        setEditing(false);
    };

    async function deleteFromWatchlist(stock) {
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${fastapi_token}`,
            },
            credentials: "include",
        };
        const response = await fetch(
            `${process.env.REACT_APP_TRADING_HOST}/watchlist/${stock}`,
            requestOptions
        );
        if (response.ok) {
        }
    }

    let getWatchlist = useCallback(async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${fastapi_token}`,
            },
            credentials: "include",
        };
        const response = await fetch(
            `${process.env.REACT_APP_TRADING_HOST}/watchlist`,
            requestOptions
        );
        if (response.ok) {
            const data = await response.json();
            setWatchlist(data);
        }
    }, [fastapi_token]);

    let getStockPrice = useCallback(async () => {
        await Promise.all(
            watchlist.map(async (stock) => {
                const priceUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${process.env.REACT_APP_ALPHA_VANTAGE}`;
                const response = await fetch(priceUrl);
                if (response.ok) {
                    const data = await response.json();
                    return data;
                } else {
                    return { message: "stock data unavailable" };
                }
            })
        ).then((responses) => {
            let stockPrices = responses.map((stock) => {
                let theStock = {};
                theStock["stockPrice"] = parseFloat(
                    stock["Global Quote"]["05. price"]
                );

                theStock["stockChange"] = parseFloat(
                    parseFloat(stock["Global Quote"]["09. change"]).toFixed(2)
                );
                theStock["stockChangePercent"] = parseFloat(
                    parseFloat(
                        stock["Global Quote"]["10. change percent"].replace(
                            "%",
                            ""
                        )
                    ).toFixed(2)
                );
                theStock.symbol = stock["Global Quote"]["01. symbol"];
                return { ...theStock };
            });
            setPrices(stockPrices);
        });
    }, [watchlist]);

    useEffect(() => {
        if (!watchlist) {
            getWatchlist();
        }
        if (watchlist) {
            getStockPrice();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchlist, getStockPrice, getWatchlist]);

    if (!fastapi_token) {
        return (
            <Navigate
                replace
                to="/login"
            />
        );
    } else {
        return (
            <div className="dashboard d-flex row justify-content-around text-center">
                <div className="d-flex justify-content-center p-0">
                    <h1 className="display-5 p-5">Watchlist</h1>
                </div>

                <div className="d-flex row justify-content-center text-center mt-4 p-0">
                    <div className="table-responsive mb-2 col-xl-6 table-sm p-0">
                        <table className="table mx-auto table-hover">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Price</th>
                                    {editing ? (
                                        <th>
                                            <button
                                                onClick={() => submitEditing()}
                                                className="btn-dark btn"
                                            >
                                                Done
                                            </button>{" "}
                                        </th>
                                    ) : (
                                        <th>
                                            <button
                                                onClick={() => startEditing()}
                                                className="btn-dark btn"
                                            >
                                                Edit
                                            </button>{" "}
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {prices.map((stock) => {
                                    return (
                                        <tr
                                            className="position-row"
                                            key={stock.symbol}
                                            value={stock.symbol}
                                        >
                                            <td
                                                value={stock.symbol}
                                                onClick={() => {
                                                    setSymbol(stock.symbol);

                                                    navigate(
                                                        `/stock/${stock.symbol.toUpperCase()}`
                                                    );
                                                }}
                                            >
                                                {stock.symbol}
                                            </td>
                                            <td>
                                                <p className="mb-0">
                                                    {stock.stockPrice}
                                                </p>
                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        color:
                                                            stock.stockChange <
                                                            0
                                                                ? "#DA0000"
                                                                : "#2FEB8F",
                                                    }}
                                                >
                                                    {stock.stockChange > 0
                                                        ? "+"
                                                        : ""}
                                                    {stock.stockChange}
                                                </p>
                                            </td>

                                            {editing ? (
                                                <td
                                                    onClick={() => {
                                                        deleteFromWatchlist(
                                                            stock.symbol
                                                        );
                                                        getWatchlist();
                                                    }}
                                                    value={stock.symbol}
                                                >
                                                    <IconContext.Provider
                                                        value={{
                                                            style: {
                                                                color: "white",
                                                                height: "28px",
                                                                width: "28px",
                                                            },
                                                        }}
                                                    >
                                                        <TfiTrash />
                                                    </IconContext.Provider>
                                                </td>
                                            ) : (
                                                <td></td>
                                            )}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
};

export default WatchlistPage;
