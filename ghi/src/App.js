// import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import SignupForm from "./components/Signup";
import Nav from "./Nav";
import LoginForm from "./components/Login";
import Dashboard from "./components/Dashboard";
import StockInfo from "./StockInfo";
import CryptoInfo from "./CryptoInfo";
// import { AuthProvider, useToken } from "./Token";
// import Header from "./components/Header";
// import { UserContext } from "./context/UserContext";
// function GetToken() {
//     useToken();
//     return null;
// }

function App() {
    // const [launch_info, setLaunchInfo] = useState([]);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //   async function getData() {
    //     let url = `${process.env.REACT_APP_API_HOST}/api/launch-details`;
    //     console.log('fastapi url: ', url);
    //     let response = await fetch(url);
    //     console.log("------- hello? -------");
    //     let data = await response.json();

    //     if (response.ok) {
    //       console.log("got launch data!");
    //       setLaunchInfo(data.launch_details);
    //     } else {
    //       console.log("drat! something happened");
    //       setError(data.message);
    //     }
    //   }
    //   getData();
    // }, [])

    return (
        // <AuthProvider>
        // <GetToken />
        <>
            <MainPage />
            <BrowserRouter>
                <Nav />
                <div className="container">
                    <Routes>
                        {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignupForm />} />
                    </Routes>
                </div>
            </BrowserRouter>
            <div className="container-fluid container-max-widths:(sm)"
            style={{
            
            }}>
                <div className="row gx-5">

                <div className="col"> 
                <div className="p-3 border rounded"
                style={{
                    background: "#292828",
                    borderRadius: "120px",
                    border: "#198754",
                        }}>
                        <StockInfo /> 
                </div> 
                </div>

                
                <div className="col"> 
                <div className="p-3 border rounded"
                style={{
                    background: "#292828",
                    borderRadius: "120px",
                    border: "#198754",
                        }}>
                        <CryptoInfo /> 
                </div> 
                </div>

                <div className="col"> 
                <div className="p-3 border rounded"
                style={{
                    background: "#292828",
                    borderRadius: "120px",
                    border: "#198754",
                        }}>
                        <h5> Temp Market Watch </h5>
                </div> 
                </div>

                </div>
            </div>
        </>
        /* </AuthProvider> */
    );
}

export default App;
