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
            // eslint-disable-next-line react-hooks/exhaustive-deps
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
                // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="my-5 containerw">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h2 className="text-center">Signup</h2>
                        <form
                            onSubmit={this.handleSubmit}
                            id="create-appointment-form"
                        >
                            <label htmlFor="Email">Email: </label>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangeEmail}
                                    value={this.state.email}
                                    placeholder="Email"
                                    required
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                />
                            </div>
                            <label
                                className="text-left"
                                htmlFor="username"
                            >
                                Username:{" "}
                            </label>
                            <div className="form-floating mb-3">
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
                            <label htmlFor="password">Password: </label>
                            <div className="form-floating mb-3">
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
                            <label htmlFor="fullName">Full Name: </label>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={this.handleChangeFullName}
                                    value={this.state.full_name}
                                    placeholder="fullName"
                                    required
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    className="form-control"
                                />
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignupForm;
