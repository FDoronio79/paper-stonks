import { NavLink, useNavigate, Link } from "react-router-dom";
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as TfiIcons from "react-icons/tfi";
import * as AiIcons from "react-icons/ai";
import { MdLogin } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

import "./App.css";
import { useContext } from "react";

import { UserContext } from "./context/UserContext";

function Nav({ setSymbol, symbol }) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [fastapi_token, setToken] = useContext(UserContext);
    const navigate = useNavigate();
    // const [username, setUserName] = useState("");
    const logout = async () => {
        await fetch(`${process.env.REACT_APP_ACCOUNTS_HOST}/token`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${fastapi_token}` },
            credentials: "include",
        });
        setToken(null);
    };

    // useEffect(() => {
    //     async function getUserName() {
    //         const requestOptions = {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${fastapi_token}`,
    //             },
    //             credentials: "include",
    //         };
    //         const response = await fetch(
    //             `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts`,
    //             requestOptions
    //         );
    //         if (response.ok) {
    //             const data = await response.json();
    //             setUserName(data["username"]);
    //         }
    //     }
    //     getUserName();
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [setUserName]);

    if (!fastapi_token || fastapi_token === "null") {
        return (
            <>
                <div className="navbar">
                    <Link
                        to="#"
                        className="menu-bars"
                    >
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>

                    <span>
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
                    </span>
                </div>

                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul
                        className="nav-menu-items navbar-nav"
                        onClick={showSidebar}
                    >
                        <li className="navbar-toggle">
                            <Link
                                to="#"
                                className="menu-bars"
                            >
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <Link
                            to="/"
                            className="nav-text nav-item"
                        >
                            <AiIcons.AiOutlineHome />
                            <span>Home</span>
                        </Link>

                        <li className="nav-item">
                            <Link
                                className="nav-text "
                                to="/Login"
                            >
                                <MdLogin />
                                <span>Login</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-text"
                                aria-current="page"
                                to="/Signup"
                            >
                                <VscAccount />
                                <span>Signup</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    } else {
        return (
            <>
                <div className="navbar">
                    <Link
                        to="#"
                        className="menu-bars"
                    >
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <span>
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
                    </span>
                </div>
                <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                    <ul
                        className="nav-menu-items navbar-nav"
                        onClick={showSidebar}
                    >
                        <li className="navbar-toggle">
                            <Link
                                to="#"
                                className="menu-bars"
                            >
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <Link
                            to="/"
                            className="nav-text"
                        >
                            <AiIcons.AiOutlineHome />
                            <span>Home</span>
                        </Link>
                        <li className="nav-item">
                            <Link
                                className="nav-text"
                                to="/dashboard"
                            >
                                <AiIcons.AiOutlineDashboard />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-text"
                                to="/transactions"
                            >
                                <TfiIcons.TfiReceipt />
                                <span>Transactions</span>
                            </Link>
                        </li>
                        <hr></hr>
                        <li>
                            <button
                                className="btn bg-transparent nav-text"
                                onClick={logout}
                            >
                                <MdLogin />
                                <span>Log Out</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }
}

export default Nav;
