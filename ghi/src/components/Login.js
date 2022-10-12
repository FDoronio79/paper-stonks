import React from "react";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            hasSignedUp: false,
        };

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        const value = event.target.value;
        this.setState({ username: value });
    }

    handleChangePassword(event) {
        const value = event.target.value;
        this.setState({ password: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.hasSignedUp;
        console.log("data:", data);
        //create development and deployment variables for url
        // let url = `${process.env.REACT_APP_API_HOST}/token`
        const registrationUrl = "http://localhost:8080/token";
        console.log(registrationUrl);
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(
                `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`
            ),
            headers: {
                "Content-type": "application/x-www-form-urlencoded",
            },
        };
        const response = await fetch(registrationUrl, fetchConfig);
        console.log("response console.log", response);
        if (response.ok) {
            const newAccount = await response.json();
            console.log("new account:", newAccount);
            this.setState({
                username: "",
                password: "",
                hasSignedUp: true,
            });
        }
    }

    render() {
        // let messageClasses = "alert alert-success d-none mb-0";
        // let formClasses = "";
        if (this.state.hasSignedUp) {
            // messageClasses = "alert alert-success mb-0";
            // formClasses = "d-none";
            return <Navigate to="/" replace={true} />;
        }

        return (
            <div className="my-5 containerw">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h2 className="text-center">Login</h2>
                        <form
                            onSubmit={this.handleSubmit}
                            id="create-appointment-form"
                        >
                            <div className="form-floating mb-3">
                                <label htmlFor="username">Username: </label>
                                <input
                                    onChange={this.handleChangeUsername}
                                    value={this.state.username}
                                    placeholder="Username"
                                    required
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control"
                                />
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="password">Password: </label>
                                <input
                                    onChange={this.handleChangePassword}
                                    value={this.state.password}
                                    placeholder="Password"
                                    required
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                />
                            </div>
                            <button className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;
