import { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TfiTrash } from "react-icons/tfi";
import { IconContext } from "react-icons";
const WatchlistPage = ({ setSymbol, symbol }) => {
    const navigate = useNavigate();
    const [fastapi_token] = useContext(UserContext);
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
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
        getWatchlist();
    }, [fastapi_token]);

    useEffect(() => {
        let getStockPrice = async () => {
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
        };

        if (watchlist.length > 0 && !watchlist[0]?.value) {
            getStockPrice();
        }
    }, [watchlist]);

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
                                </tr>
                            </thead>
                            <tbody>
                                {watchlist.map((stock) => {
                                    return (
                                        <tr
                                            onClick={() => {
                                                setSymbol(stock.symbol);

                                                navigate(
                                                    `/stock/${stock.symbol.toUpperCase()}`
                                                );
                                            }}
                                            className="position-row"
                                            key={stock.id}
                                            value={stock.symbol}
                                        >
                                            <td>{stock.symbol}</td>
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
                                            <td>
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
