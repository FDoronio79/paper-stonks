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
                setTransactions(data);
            } else {
            }
        }
        getTransactions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setTransactions]);

    if (!fastapi_token) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <div>
                    <h3>Transactions</h3>
                    <table className="table table-dark table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Symbol</th>
                                <th scope="col">Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Buy/Sell</th>
                                <th scope="col">Time of Purchase</th>
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
                                        <td>{transaction.time_of_purchase}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
};
export default Transactions;
