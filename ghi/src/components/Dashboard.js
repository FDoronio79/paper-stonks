import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Dashboard = ({}) => {
    const [fastapi_token, setToken] = useContext(UserContext);
    // const [hasSignedUp, ]
    const [buyingPower, setBuyingPower] = useState("");
    const [currentbuyingPower, setCurrentBuyingPower] = useState("");
    localStorage.setItem("buyingPower", currentbuyingPower);
    // console.log("\n\n\n\nbuying power");
    console.log(currentbuyingPower);
    // console.log(setBuyingPower);
    useEffect(() => {
        async function getBuyingPower() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            };
            const response = await fetch(
                `http://localhost:8080/api/accounts`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                setCurrentBuyingPower(data["buying_power"]);
                console.log(data);
            }
        }
        getBuyingPower();
    }, [setCurrentBuyingPower]);

    const updateBuyingPower = async () => {
        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };
        const response = await fetch(
            `http://localhost:8080/api/accounts?bp_change=${buyingPower}`,
            requestOptions
        );
        const data = await response.json();
        console.log(response);
        // console.log(data);
        if (response.ok) {
            setBuyingPower(data);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBuyingPower();
        console.log("updated buying power");
    };

    if (!fastapi_token) {
        console.log("ooops");
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <div>
                    <label className="label">
                        Current Buying Power:{currentbuyingPower}
                    </label>
                </div>
                <div>
                    <form className="box" onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <div className="field">
                                <label className="label">
                                    Update Buying Power
                                </label>
                                <div className="control">
                                    <input
                                        type="text"
                                        placeholder="add or subtract buying power"
                                        // value={buyingPower}
                                        onChange={(e) =>
                                            setBuyingPower(e.target.value)
                                        }
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">
                                Update Buying Power
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <p>Welcome to your Dashboard</p>
                </div>
            </>
        );
    }
};
export default Dashboard;
