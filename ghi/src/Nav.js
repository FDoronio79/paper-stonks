import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
// import { SearchContext } from "./SearchContext";
import { UserContext } from "./context/UserContext";
// import { Navigate } from "react-router-dom";

function Nav({ setSymbol, symbol }) {
    const [fastapi_token, setToken] = useContext(UserContext);
    // const search = useContext(SearchContext);
    const navigate = useNavigate();

    const logout = async () => {
        await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${fastapi_token}`,},
            credentials: "include",
        });
        setToken(null);
        console.log("DELETED!");
    };

    if (!fastapi_token) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <NavLink
                        className="navbar-brand"
                        to="/"
                    >
                        Paper Stonks
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/Login"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/Signup"
                                    >
                                        Signup
                                    </NavLink>
                                </li>
                                <form className="d-flex ">
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onSubmit={(e) => {
                                            setSymbol(e.target.value);
                                            navigate("/stock");
                                        }}
                                        value={symbol}
                                    />
                                </form>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <NavLink
                        className="navbar-brand"
                        to="/"
                    >
                        Paper Stonks
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/"
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/dashboard"
                                    >
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className="nav-link active"
                                        aria-current="page"
                                        to="/transactions"
                                    >
                                        Transactions
                                    </NavLink>
                                </li>
                                <form
                                    className="d-flex"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        navigate(`/stock/${symbol.toUpperCase()}`);
                                    }}
                                >
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={(e) => {
                                            setSymbol(e.target.value);
                                        }}
                                        value={symbol}
                                    />
                                </form>
                                <li>
                                    <button
                                        className="btn btn-primary"
                                        onClick={logout}
                                    >
                                        {" "}
                                        Logout{" "}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav;
