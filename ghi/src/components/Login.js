import React, { useState, useContext } from "react";
import ErrorMessage from "./ErrorMessege";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [fastapi_token, setToken] = useContext(UserContext);
    const navigate = useNavigate();

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: JSON.stringify(
                `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
            ),
        };

        const response = await fetch(
            "http://localhost:8080/token",
            requestOptions
        );
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
        console.log("logged in!");
    };

    if (!fastapi_token) {
        return (
            <div className="my-5 containerw">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h2 className="text-center">Login</h2>
                        <form className="box" onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            placeholder="Enter username"
                                            value={email}
                                            onChange={(e) =>
                                                setUserName(e.target.value)
                                            }
                                            className="input"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input
                                            type="password"
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="input"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <ErrorMessage message={errorMessage} />
                            <br />
                            <div>
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return navigate("/dashboard");
    }
};

export default Login;
