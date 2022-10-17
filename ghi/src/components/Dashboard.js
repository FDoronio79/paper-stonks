import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import StockInfo from "./StockInfo";
import CryptoInfo from "./CryptoInfo";




const Dashboard = ({}) => {
    const [fastapi_token, setToken] = useContext(UserContext);
    // const [hasSignedUp, ]
    const [buyingPower, setBuyingPower] = useState("");
    console.log("\n\n\n\nbuying power");
    console.log(buyingPower);
    console.log(setBuyingPower);
    // useEffect(() => {
    //     async function getData() {
    //         const url = "http://localhost:8080/api/accounts";
    //         const response = await fetch(url);
    //         if (response.ok) {
    //             const data = await response.json();
    //             setBuyingPower(data);
    //         }
    //     }
    //     getData();
    // }, []);
    // useEffect(() => {
    //     updateBuyingPower();
    //    }, [bp]);

    // const getData = async () => {
    //     let response = await fetch("http://localhost:8080/api/accounts");
    //     let data = await response.json();
    //     setBuyingPower(data);
    //    };

    // const updateBuyingPower = async () => {
    //     const requestOptions = {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json",
    //             // Authorization: `Bearer ${token}`,
    //         },
    //         // body: JSON.stringify({ bp_change: buyingPower }),
    //     };
    //     const gettoken = await fetch("http://localhost:8080/token");
    //     const response = await fetch(
    //         `http://localhost:8080/api/accounts?bp_change=${buyingPower}`,
    //         requestOptions
    //     );
    //     const data = await response.json();
    //     console.log(response);
    //     if (response.ok) {
    //         setBuyingPower(data.buying_power);
    //     }
    // };

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
        console.log(data);
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
                    <div className="container-fluid container-max-widths:(sm)"
                        style={{
                                }}>
                <div className="row gx-5">
                    <div className="col"> 
                        <StockInfo /> 
                    </div>
                
                    <div className="col"> 
                            <CryptoInfo /> 
                    </div>

                <div className="col"> 
                </div>

                </div>
            </div>

                </div>
            </>
        );
    }
};
export default Dashboard;
