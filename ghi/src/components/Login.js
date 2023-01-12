import React, { useState, useContext } from "react";
import ErrorMessage from "./ErrorMessege";
import { UserContext } from "../context/UserContext";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fastapi_token, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${fastapi_token}`,
            },
            credentials: "include",
            body: JSON.stringify(
                `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };

        const response = await fetch(
            `${process.env.REACT_APP_ACCOUNTS_HOST}/token`,
            requestOptions
        );
        const data = await response.json();
        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            localStorage.setItem("Username", username);
            setToken(data.access_token);
            navigate("/dashboard");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };

    if (!fastapi_token || fastapi_token === "null") {
        return (
            <>
                <div className="login d-flex row justify-content-center">
                    <div className="d-flex justify-content-around">
                        <h1 className="display-4 p-3">Login</h1>
                    </div>
                    <div className="d-flex flex-row  col-sm-10 col-xl-6 justify-content-center">
                        <div>
                            <div className=" p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group">
                                            <label
                                                className="form-label text-white"
                                                htmlFor="typeEmailX"
                                            >
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                id="typeEmailX"
                                                className="form-control form-control-lg"
                                                onChange={(e) =>
                                                    setUserName(e.target.value)
                                                }
                                                value={username}
                                                required
                                                placeholder="username"
                                            />

                                            <label
                                                className="form-label"
                                                htmlFor="typePasswordX"
                                            >
                                                Password
                                            </label>
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                required
                                                placeholder="password"
                                            />
                                        </div>

                                        <ErrorMessage message={errorMessage} />
                                        {/* <p className="small mb-5 pb-lg-2">
                                                <a
                                                    className="text-white-50"
                                                    href="#!"
                                                >
                                                    Forgot password?
                                                </a>
                                            </p> */}

                                        <button
                                            className="btn bg-dark btn-outline-light btn-md px-4"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </form>
                                </div>

                                <p className="mb-0">Don't have an account? </p>

                                <NavLink
                                    aria-current="page"
                                    to="/Signup"
                                    className="nav-link fw-bold"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Login;
