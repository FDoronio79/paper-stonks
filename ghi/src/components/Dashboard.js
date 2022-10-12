import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";



const Dashboard = () => {
    const [token] = useContext(UserContext);
    useEffect(() => {
        const loggedInUser = localStorage.getItem("authenticated");

    }, []);
    const logout = () => {
        fetch(`http://localhost:8080/token`)
    }
    if (!token) {
        console.log("BRUHHH")
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