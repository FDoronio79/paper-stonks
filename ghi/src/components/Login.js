import React, { useState, useContext } from "react";
import ErrorMessage from "./ErrorMessege";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

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

    if (!fastapi_token) {
        // return (
        //     <div className="my-5 containerw">
        //         <div className="offset-3 col-6">
        //             <div className="shadow p-4 mt-4">
        //                 <h2 className="text-center">Login</h2>
        //                 <form
        //                     className="box"
        //                     onSubmit={handleSubmit}
        //                 >
        //                     <div className="form-floating mb-3">
        //                         <div className="field">
        //                             <label className="label">Username</label>
        //                             <div className="control">
        //                                 <input
        //                                     type="text"
        //                                     placeholder="Enter username"
        //                                     value={username}
        //                                     onChange={(e) => setUserName(e.target.value)}
        //                                     className="input"
        //                                     required
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="form-floating mb-3">
        //                         <div className="field">
        //                             <label className="label">Password</label>
        //                             <div className="control">
        //                                 <input
        //                                     type="password"
        //                                     placeholder="Enter password"
        //                                     value={password}
        //                                     onChange={(e) => setPassword(e.target.value)}
        //                                     className="input"
        //                                     required
        //                                 />
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <ErrorMessage message={errorMessage} />
        //                     <br />
        //                     <div>
        //                         <button
        //                             className="btn btn-primary"
        //                             type="submit"
        //                         >
        //                             Login
        //                         </button>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
        // );
        return (
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div
                                className="card bg-dark text-white"
                                style={{ borderRadius: "1rem" }}
                            >
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">
                                            Login
                                        </h2>
                                        <p className="text-white-50 mb-5">
                                            Please enter your username and
                                            password!
                                        </p>
                                        <form
                                            className="box"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="text"
                                                    id="typeEmailX"
                                                    className="form-control form-control-lg"
                                                    onChange={(e) =>
                                                        setUserName(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={username}
                                                    required
                                                />
                                                <label
                                                    className="form-label"
                                                    htmlFor="typeEmailX"
                                                >
                                                    Username
                                                </label>
                                            </div>

                                            <div className="form-outline form-white mb-4">
                                                <input
                                                    type="password"
                                                    id="typePasswordX"
                                                    className="form-control form-control-lg"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    required
                                                />
                                                <label
                                                    className="form-label"
                                                    htmlFor="typePasswordX"
                                                >
                                                    Password
                                                </label>
                                            </div>
                                            <ErrorMessage
                                                message={errorMessage}
                                            />
                                            {/* <p className="small mb-5 pb-lg-2">
                                                <a
                                                    className="text-white-50"
                                                    href="#!"
                                                >
                                                    Forgot password?
                                                </a>
                                            </p> */}

                                            <button
                                                className="btn btn-outline-light btn-lg px-5"
                                                type="submit"
                                            >
                                                Login
                                            </button>
                                        </form>
                                    </div>

                                    <div>
                                        <p className="mb-0">
                                            Don't have an account?{" "}
                                            <a
                                                href="/Signup"
                                                className="text-white-50 fw-bold"
                                            >
                                                Sign Up
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default Login;
