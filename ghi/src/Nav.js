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
            headers: { Authorization: `Bearer ${fastapi_token}` },
            credentials: "include",
        });
        setToken(null);
    };

    if (!fastapi_token) {
        return (
            <>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <a
                        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
                        href="/"
                    >
                        Paper Stonks
                    </a>
                    <button
                        className="navbar-toggler position-absolute d-md-none collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="true"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <input
                        className="form-control form-control-dark w-100 rounded-0 border-0"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate(`/stock/${symbol.toUpperCase()}`);
                        }}
                    /> */}
                    <form
                        className="form-control form-control-dark w-100 rounded-0 border-0"
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate(`/stock/${symbol.toUpperCase()}`);
                        }}
                    >
                        <input
                            className="form-control form-control-dark w-100 rounded-0 border-0"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => {
                                setSymbol(e.target.value);
                            }}
                            value={symbol}
                        />
                    </form>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <nav
                            id="sidebarMenu"
                            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"

                            // style=""
                        >
                            <div className="position-sticky pt-3 sidebar-sticky">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-home align-text-bottom"
                                                aria-hidden="true"
                                            >
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                            </svg>
                                            Home
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/Login"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-users align-text-bottom"
                                                aria-hidden="true"
                                            >
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle
                                                    cx="9"
                                                    cy="7"
                                                    r="4"
                                                ></circle>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                            Login
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/Signup"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-users align-text-bottom"
                                                aria-hidden="true"
                                            >
                                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                                <circle
                                                    cx="9"
                                                    cy="7"
                                                    r="4"
                                                ></circle>
                                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                            </svg>
                                            Signup
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav> */}
            </>
        );
    } else {
        return (
            <>
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <a
                        className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6"
                        href="/"
                    >
                        Paper Stonks
                    </a>
                    <button
                        className="navbar-toggler position-absolute d-md-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="true"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <input
                        className="form-control form-control-dark w-100 rounded-0 border-0"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate(`/stock/${symbol.toUpperCase()}`);
                        }}
                    /> */}
                    <form
                        className="form-control form-control-dark w-100 rounded-0 border-0"
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate(`/stock/${symbol.toUpperCase()}`);
                        }}
                    >
                        <input
                            className="form-control form-control-dark w-100 rounded-0 border-0"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            onChange={(e) => {
                                setSymbol(e.target.value);
                            }}
                            value={symbol}
                        />
                    </form>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <a
                                className="nav-link px-3"
                                onClick={logout}
                            >
                                {" "}
                                Log Out
                            </a>
                        </div>
                    </div>
                </header>
                <div className="container-fluid">
                    <div className="row">
                        <nav
                            id="sidebarMenu"
                            className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
                            // style=""
                        >
                            <div className="position-sticky pt-3 sidebar-sticky">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/dashboard"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-home align-text-bottom"
                                                aria-hidden="true"
                                            >
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                            </svg>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink
                                            className="nav-link active"
                                            aria-current="page"
                                            to="/transactions"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="feather feather-file align-text-bottom"
                                                aria-hidden="true"
                                            >
                                                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                                                <polyline points="13 2 13 9 20 9"></polyline>
                                            </svg>
                                            Transactions
                                        </NavLink>
                                    </li>
                                    {/* <li>
                                        <button
                                            className="btn btn-primary"
                                            onClick={logout}
                                        >
                                            {" "}
                                            Logout{" "}
                                        </button>
                                    </li> */}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>

                <script
                    src="/docs/5.2/dist/js/bootstrap.bundle.min.js"
                    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
                    crossOrigin="anonymous"
                ></script>

                <script
                    src="https://cdn.jsdelivr.net/npm/feather-icons@4.28.0/dist/feather.min.js"
                    integrity="sha384-uO3SXW5IuS1ZpFPKugNNWqTZRRglnUJK6UAZ/gxOX80nxEkN9NcGZTftn6RzhGWE"
                    crossOrigin="anonymous"
                ></script>
                <script
                    src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"
                    integrity="sha384-zNy6FEbO50N+Cg5wap8IKA4M/ZnLJgzc6w2NqACZaK0u0FXfOWRRJOnQtpZun8ha"
                    crossOrigin="anonymous"
                ></script>
                <script src="Nav.js"></script>

                {/* <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">
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
                </nav> */}
            </>
        );
    }
}

export default Nav;
