import { useEffect, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
    const [fastapi_token, setToken] = useContext(UserContext);
    // const [hasSignedUp, ]

    const logout = () => {
        fetch(`http://localhost:8080/token`, {
            method: "DELETE",
        });
        setToken(null);
        console.log("DELETED!");
        console.log(fastapi_token);
    };
    if (!fastapi_token) {
        console.log("ooops");
        return <Navigate replace to="/login" />;
    } else {
        return (
            <>
                <button onClick={logout}> Logout </button>
                <div>
                    <p>Welcome to your Dashboard</p>
                </div>
            </>
        );
    }
};
export default Dashboard;
