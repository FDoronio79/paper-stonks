import React from "react";
import { Navigate } from "react-router-dom";

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            full_name: "",
        };

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        const value = event.target.value;
        this.setState({ email: value });
    }

    handleChangeUsername(event) {
        const value = event.target.value;
        this.setState({ username: value });
    }

    handleChangePassword(event) {
        const value = event.target.value;
        this.setState({ password: value });
    }

    handleChangeFullName(event) {
        const value = event.target.value;
        this.setState({ full_name: value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        const registrationUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/accounts`;
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        };
        const response = await fetch(registrationUrl, fetchConfig);
        if (response.ok) {
            // eslint-disable-next-line
            const newAccount = await response.json();
            this.setState({
                email: "",
                password: "",
                full_name: "",
            });
            const registrationVOUrl = `${process.env.REACT_APP_TRADING_HOST}/api/accountsvo`;
            const fetchConfigvo = {
                method: "post",
                body: JSON.stringify({ username: data.username }),
                headers: {
                    "Content-type": "application/json",
                },
            };
            const responsevo = await fetch(registrationVOUrl, fetchConfigvo);
            if (responsevo.ok) {
                // eslint-disable-next-line
                const newAccountVO = await responsevo.json();
                this.setState({
                    username: "",
                    hasSignedUp: true,
                });
            }
        }
    }

    render() {
        if (this.state.hasSignedUp) {
            return (
                <Navigate
                    to="/dashboard"
                    replace={true}
                />
            );
        }

        return (
            <>
                <div className="login d-flex row justify-content-center">
                    <div className="d-flex justify-content-around">
                        <h1 className="display-4 p-3">Signup</h1>
                    </div>
                    <div className="d-flex flex-row  col-sm-10 col-xl-6 justify-content-center">
                        <div>
                            <div
                                className="bg-transparent
                                "
                                style={{ borderRadius: "1rem" }}
                            >
                                <div className="p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <form
                                            className="box"
                                            onSubmit={this.handleSubmit}
                                        >
                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="typeEmailX"
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type="text"
                                                    id="typeEmailX"
                                                    className="form-control form-control-lg"
                                                    onChange={
                                                        this.handleChangeEmail
                                                    }
                                                    value={this.state.email}
                                                    placeholder="Email"
                                                    required
                                                    name="email"
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="username"
                                                >
                                                    Username
                                                </label>
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    className="form-control form-control-lg"
                                                    onChange={
                                                        this
                                                            .handleChangeUsername
                                                    }
                                                    value={this.state.username}
                                                    placeholder="Username"
                                                    required
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="typePasswordX"
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="typePasswordX"
                                                    className="form-control form-control-lg"
                                                    onChange={
                                                        this
                                                            .handleChangePassword
                                                    }
                                                    value={this.state.password}
                                                    placeholder="Password"
                                                    required
                                                />
                                            </div>
                                            {/* <ErrorMessage
                                                message={errorMessage}
                                            /> */}

                                            <div className="form-outline mb-4">
                                                <label
                                                    className="form-label"
                                                    htmlFor="fullName"
                                                >
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    id="fullName"
                                                    name="fullName"
                                                    className="form-control form-control-lg"
                                                    onChange={
                                                        this
                                                            .handleChangeFullName
                                                    }
                                                    value={this.state.full_name}
                                                    placeholder="Full Name"
                                                    required
                                                />
                                            </div>

                                            <button
                                                className="btn btn-light btn-md px-4"
                                                type="submit"
                                            >
                                                Signup
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default SignupForm;
