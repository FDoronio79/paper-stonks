// import { useState } from 'react';

// function BoostrapInput(props) {
//     const { id, placeholder, labelText, value, onChange, type } = props;

//     return (
//         <div className="mb-3">
//             <label htmlFor={id} className="form-label">{labelText}</label>
//             <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
//         </div>
//     )
// }

// function Signup(props) {
//     const [email, setEmail] = useState('');
//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [fullName, setFullName] = useState('');


//     const [submitted, setSubmitted] = useState(false);
//     const [error, setError] = useState(false);

//     const handleEmail = (e) => {
//         setEmail(e.target.value);
//         setSubmitted(false);
//     };

//     const handleUsername = (e) => {
//         setUserName(e.target.value);
//         setSubmitted(false);
//     };

//     const handlePassword = (e) => {
//         setPassword(e.target.value);
//         setSubmitted(false);
//     };

//     const handleName = (e) => {
//         setFullName(e.target.value);
//         setSubmitted(false);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (email === '' || userName === '' || password === '' || fullName === '') {
//             setError(true);
//         } else {
//             setSubmitted(true);
//             setError(false);
//         }
//     };

//     const successMessage = () => {
//         return (
//             <div
//                 className="success"
//                 style={{
//                     display: submitted ? '' : 'none',
//                 }}>
//             <h1>User {fullName} successfully registered!!</h1>
//             </div>
//         );
//     };

//     const errorMessage = () => {
//         return (
//             <div
//                 className="error"
//                 style={{
//                     display: error ? '' : 'none',
//                 }}>
//                 <h1>Please enter all the fields</h1>
//             </div>
//         );
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <div className="messeges">
//                     {errorMessege()}
//                     {successMessege()}
//                 </div>
//                 <BoostrapInput
//                     id="email"
//                     placeholder="name@example.com"
//                     labelText="Email Address"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     type="email" />
//                 <BoostrapInput
//                     id="username"
//                     placeholder="Your username here"
//                     labelText="User Name"
//                     value={userName}
//                     onChange={e => setUserName(e.target.value)}
//                     type="text" />
//                 <BoostrapInput
//                     id="password"
//                     placeholder="Password"
//                     labelText="Password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     type="password" />
//                 <BoostrapInput
//                     id="fullName"
//                     placeholder="Your full name here"
//                     labelText="Full Name"
//                     value={fullName}
//                     onChange={e => setFullName(e.target.value)}
//                     type="text" />
//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//         </>
//     )

// }

// export default Signup;

import React from 'react';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            full_name: "",
        }

        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeEmail(event) {
        const value = event.target.value;
        this.setState({email: value});
    }

    handleChangeUsername(event) {
        const value = event.target.value;
        this.setState({username: value});
    }

    handleChangePassword(event) {
        const value = event.target.value;
        this.setState({password: value});
    }

    handleChangeFullName(event) {
        const value = event.target.value;
        this.setState({full_name: value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        console.log("data:", data);
         //create development and deployment variables for url

        const registrationUrl = "http://localhost:8080/api/accounts";
        console.log(registrationUrl);
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
            },
        };
        const response = await fetch(registrationUrl, fetchConfig);
        console.log("response console.log", response)
        if (response.ok) {
            const newAccount = await response.json();
            console.log("new account:", newAccount);
            this.setState({
                email: "",
                username: "",
                password: "",
                full_name: "",
            })
        }
    }

    render() {
        return (
            <div className="my-5 containerw">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h2 className="text-center">Signup</h2>
                        <form onSubmit={this.handleSubmit} id="create-appointment-form">
                            <div className="form-floating mb-3">
                                <label htmlFor="Email">Email: </label>
                                <input onChange={this.handleChangeEmail} value={this.state.email} placeholder="Email" required type="text" name="email" id="email" className="form-control" />

                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="username">Username: </label>
                                <input onChange={this.handleChangeUsername} value={this.state.username} placeholder="Username" required type="text" name="username" id="username" className="form-control" />
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="password">Password: </label>
                                <input onChange={this.handleChangePassword} value={this.state.password} placeholder="Password" required type="password" name="password" id="password" className="form-control" />
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor="fullName">Full Name: </label>
                                <input onChange={this.handleChangeFullName} value={this.state.full_name} placeholder="fullName" required type="text" name="fullName" id="fullName" className="form-control" />
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupForm;

// import React, { useContext, useState } from "react";

// import { UserContext } from "../context/UserContext";
// import ErrorMessage from "./ErrorMessege";

// const Signup = () => {
//     const [email, setEmail] = useState("");
//     const [username, setUserName] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmationPassword, setConfirmationPassword] = useState("");
//     const [full_name, setFullName] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [, setToken] = useContext(UserContext);

//     const submitRegistration = async () => {
//         const requestOptions = {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 email: email,
//                 username: username,
//                 password: password,
//                 full_name:
//                     full_name
//             }),
//         };

//         const response = await fetch("http://localhost:8080/api/accounts", requestOptions);
//         const data = await response.json();

//         if (!response.ok) {
//             setErrorMessage(data.detail);
//         } else {
//             setToken(data.access_token);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (password === confirmationPassword && password.length > 5) {
//             submitRegistration();
//         } else {
//             setErrorMessage(
//                 "Ensure that the passwords match and greater than 5 characters"
//             );
//         }
//     };

//     return (
//         <div className="column">
//             <form className="box" onSubmit={handleSubmit}>
//                 <h1 className="title has-text-centered">Register</h1>
//                 <div className="field">
//                     <label className="label">Email Address</label>
//                     <div className="control">
//                         <input
//                             type="email"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="input"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className="label">Username</label>
//                     <div className="control">
//                         <input
//                             type="text"
//                             placeholder="Enter Username"
//                             value={username}
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
//                 <div className="field">
//                     <label className="label">Confirm Password</label>
//                     <div className="control">
//                         <input
//                             type="password"
//                             placeholder="Enter password"
//                             value={confirmationPassword}
//                             onChange={(e) => setConfirmationPassword(e.target.value)}
//                             className="input"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className="label">Full Name</label>
//                     <div className="control">
//                         <input
//                             type="text"
//                             placeholder="Enter Full Name"
//                             value={full_name}
//                             onChange={(e) => setFullName(e.target.value)}
//                             className="input"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <ErrorMessage message={errorMessage} />
//                 <br />
//                 <button className="button is-primary" type="submit">
//                     Sign Up
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Signup;