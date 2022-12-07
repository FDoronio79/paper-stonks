import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
// import { SearchContext } from "./SearchContext";
import { UserContext } from "./context/UserContext";
// import { Navigate } from "react-router-dom";

function Nav({ setSymbol, symbol }) {
    const [fastapi_token, setToken] = useContext(UserContext);
    // const search = useContext(SearchContext);
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const logout = async () => {
        await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${fastapi_token}` },
            credentials: "include",
        });
        setToken(null);
    };

    useEffect(() => {
        async function getUserName() {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${fastapi_token}`,
                },
                credentials: "include",
            };
            const response = await fetch(
                `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts`,
                requestOptions
            );
            if (response.ok) {
                const data = await response.json();
                setUserName(data["username"]);
            }
        }
        getUserName();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setUserName]);

    if (!fastapi_token) {
        return (
            <>
                <main className="d-flex flex-nowrap">
                    <div
                        className="h-100 d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-fixed"
                        style={{ width: 280 }}
                    >
                        <a
                            href="/"
                            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                        >
                            <svg
                                className="bi pe-none me-2"
                                width="40"
                                height="32"
                            ></svg>
                            <span className="fs-4">Paper Stonks</span>
                        </a>
                        <hr></hr>
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
                        <hr></hr>
                        <ul className="nav nav-pills flex-column mb-auto">
                            {/* <li className="nav-item">
                                <a
                                    href="/"
                                    className="nav-link"
                                    aria-current="page"
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
                                </a>
                            </li> */}
                            {/* <li className="nav-item">
                                <NavLink
                                    className="nav-link text-white"
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
                            </li> */}
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-white"
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
                                    className="nav-link text-white"
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
                        <hr></hr>
                    </div>
                </main>

                <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

                <script src="sidebars.js"></script>
            </>
        );
    } else {
        return (
            <>
                <main className="d-flex flex-nowrap">
                    <div
                        className="h-100 d-flex flex-column flex-shrink-0 p-3 text-bg-dark position-fixed"
                        style={{ width: 280 }}
                    >
                        <a
                            href="/"
                            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
                        >
                            <svg
                                className="bi pe-none me-2"
                                width="40"
                                height="32"
                            ></svg>
                            <span className="fs-4">Paper Stonks</span>
                        </a>
                        <hr></hr>
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
                        <hr></hr>
                        <ul className="nav nav-pills flex-column mb-auto">
                            {/* <li className="nav-item">
                                <a
                                    href="/"
                                    className="nav-link"
                                    aria-current="page"
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
                                </a>
                            </li> */}
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link text-white"
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
                                    className="nav-link text-white"
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
                        </ul>
                        <hr></hr>
                        <div className="dropdown">
                            <a
                                href="/"
                                className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src="https://github.com/mdo.png"
                                    alt=""
                                    width="32"
                                    height="32"
                                    className="rounded-circle me-2"
                                ></img>
                                <strong>{username}</strong>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                {/* <li>
                                    <a className="dropdown-item" href="/">
                                        New project...
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/">
                                        Settings
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="/dashboard">
                                        Profile
                                    </a>
                                </li> */}
                                <li>
                                    <hr className="dropdown-divider"></hr>
                                </li>
                                <li>
                                    <a
                                        className="nav-link px-3"
                                        onClick={logout}
                                        href="#"
                                    >
                                        {" "}
                                        Log Out
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>

                <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>

                <script src="sidebars.js"></script>
            </>
        );
    }
}

export default Nav;
