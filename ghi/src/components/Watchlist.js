import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TfiTrash } from "react-icons/tfi";
import { IconContext } from "react-icons";

const WatchlistPage = ({ setSymbol, symbol }) => {
    const navigate = useNavigate();
    const [fastapi_token] = useContext(UserContext);
    const [watchlist, setWatchlist] = useState([]);
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(0);

    function edit() {
        setEditing(!editing);
    }

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
            const data = await response.json();
            setDeleted(deleted + 1);
        } else {
        }
    }

    async function getWatchlist() {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${fastapi_token}`,
            },
            credentials: "include",
        };
        const response = await fetch(
            `${process.env.REACT_APP_TRADING_HOST}/watchlist/`,
            requestOptions
        );
        if (response.ok) {
            const data = await response.json();
            setWatchlist(data);
        } else {
        }
    }

    async function getStockPrice() {
        let stockPrices;
        let idx = 0;

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
            stockPrices = watchlist.map((stock) => {
                if (idx < watchlist.length) {
                    stock["stockPrice"] = parseFloat(
                        responses[idx]["Global Quote"]["05. price"]
                    );

                    stock["stockChange"] = parseFloat(
                        parseFloat(
                            responses[idx]["Global Quote"]["09. change"]
                        ).toFixed(2)
                    );
                    stock["stockChangePercent"] = parseFloat(
                        parseFloat(
                            responses[idx]["Global Quote"][
                                "10. change percent"
                            ].replace("%", "")
                        ).toFixed(2)
                    );
                    idx++;

                    return { ...stock };
                }

                return [];
            });
        });

        setWatchlist(stockPrices);
        return stockPrices;
    }

    useEffect(() => {
        getWatchlist();
    }, [deleted]);

    useEffect(() => {
        if (watchlist.length > 0 && !watchlist[0]?.value) {
            getStockPrice();
        }
    }, [getStockPrice, watchlist]);

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
                                                onClick={edit}
                                                className="btn-dark btn"
                                            >
                                                Done
                                            </button>{" "}
                                        </th>
                                    ) : (
                                        <th>
                                            <button
                                                onClick={edit}
                                                className="btn-dark btn"
                                            >
                                                Edit
                                            </button>{" "}
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {watchlist.map((stock) => {
                                    return (
                                        <tr
                                            className="position-row"
                                            key={stock.id}
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
                                                        getStockPrice();
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
