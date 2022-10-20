import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

const Transactions = ({}) => {
    const [fastapi_token] = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [username, setUserName] = useContext(UserContext);
    localStorage.setItem("Username", username);
    console.log("user", username);
    localStorage.setItem("transactions", transactions);
    console.log("transactions", transactions);

    // Use Effect function to get all transactions and assigned it to useState
    useEffect(() => {
        async function getTransactions() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            };
            const response = await fetch(
                `http://localhost:8090/transactions`,
                requestOptions
            );
            console.log("RESPONSE", response);
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
                console.log("TRANSACTION DATA", data);
            } else {
                console.log("WTF");
            }
        }
        getTransactions();
    }, [setTransactions]);

    if (!fastapi_token) {
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <h3>Transactions</h3>
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
