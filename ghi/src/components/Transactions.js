import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const Transactions = () => {
    const [fastapi_token] = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    localStorage.setItem("transactions", transactions);

    useEffect(() => {
        async function getTransactions() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };
            const response = await fetch(
                `${process.env.REACT_APP_TRADING_HOST}/transactions`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                data.reverse();
                setTransactions(data);
            } else {
            }
        }
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setTransactions]);

    if (!fastapi_token) {
        return (
            <Navigate
                replace
                to="/login"
            />
        );
    } else {
        return (
            <>
                <div className="transactions d-flex row justify-content-center">
                    <div className="d-flex justify-content-center">
                        <h1 className="display-4 p-5">Transaction History</h1>
                    </div>
                    <div className="table-responsive bg-black col-xl-4 p-0">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Symbol</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Buy/Sell</th>
                                    <th scope="col">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => {
                                    return (
                                        <tr key={transaction.id}>
                                            <td>{transaction.symbol}</td>
                                            <td>{transaction.price}</td>
                                            <td>{transaction.quantity}</td>
                                            <td>{transaction.type_of}</td>
                                            <td>
                                                <p className="mb-0">
                                                    {
                                                        new Date(
                                                            transaction.time_of_purchase
                                                        )
                                                            .toLocaleString()
                                                            .split(",")[0]
                                                    }
                                                </p>
                                                <p className="mb-0">
                                                    {new Date(
                                                        transaction.time_of_purchase
                                                    )
                                                        .toLocaleString()
                                                        .split(",")[1]
                                                        .slice(0, 6) +
                                                        new Date(
                                                            transaction.time_of_purchase
                                                        )
                                                            .toLocaleString()
                                                            .split(",")[1]
                                                            .slice(9)}
                                                </p>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    }
};
export default Transactions;
