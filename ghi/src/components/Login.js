import React from 'react';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }

        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeUsername(event) {
        const value = event.target.value;
        this.setState({username: value});
    }

    handleChangePassword(event) {
        const value = event.target.value;
        this.setState({password: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log("data:", data);
         //create development and deployment variables for url
        // let url = `${process.env.REACT_APP_API_HOST}/token`
        const registrationUrl = "http://localhost:8080/token";
        console.log(registrationUrl);
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('password', data.password);
        console.log(formData);
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(
                `grant_type=&username=${data.username}&password=${data.password}&scope=&client_id=&client_secret=`
            ),
            headers: {
                "Content-type": 'application/x-www-form-urlencoded',
            },
        };
        const response = await fetch(registrationUrl, fetchConfig);
        console.log("response console.log", response)
        if (response.ok) {
            const newAccount = await response.json();
            console.log("new account:", newAccount);
            this.setState({
                username: "",
                password: "",
            })
        }
    }

    render() {
        return (
            <div className="my-5 containerw">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h2 className="text-center">Login</h2>
                        <form onSubmit={this.handleSubmit} id="create-appointment-form">
                            <div className="form-floating mb-3">
                                <label htmlFor="username">Username: </label>
                                <input onChange={this.handleChangeUsername} value={this.state.username} placeholder="Username" required type="text" name="username" id="username" className="form-control" />
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="password">Password: </label>
                                <input onChange={this.handleChangePassword} value={this.state.password} placeholder="Password" required type="password" name="password" id="password" className="form-control" />
                            </div>
                            <button className="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm;

// import React, { useState, useContext } from "react";

// import ErrorMessage from "./ErrorMessege";
// import { UserContext } from "../context/UserContext";

// const Login = () => {
//     const [email, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [, setToken] = useContext(UserContext);

//     const submitLogin = async () => {
//         const requestOptions = {
//             method: "POST",
//             headers: { "Content-Type": "application/x-www-form-urlencoded" },
//             body: JSON.stringify(
//                 `grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`
//             ),
//         };

//         const response = await fetch("http://localhost:8080/token", requestOptions);
//         const data = await response.json();
//         console.log(data)
//         if (!response.ok) {
//             setErrorMessage(data.detail);
//         } else {
//             setToken(data.access_token);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         submitLogin();
//     console.log("logged in!")
//     };

//     return (
//         <div className="column">
//             <form className="box" onSubmit={handleSubmit}>
//                 <h1 className="title has-text-centered">Login</h1>
//                 <div className="field">
//                     <label className="label">Username</label>
//                     <div className="control">
//                         <input
//                             type="text"
//                             placeholder="Enter username"
//                             value={email}
//                             onChange={(e) => setUserName(e.target.value)}
//                             className="input"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className="label">Password</label>
//                     <div className="control">
//                         <input
//                             type="password"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="input"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <ErrorMessage message={errorMessage} />
//                 <br />
//                 <button className="button is-primary" type="submit">
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Login;