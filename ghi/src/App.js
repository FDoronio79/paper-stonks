// import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import SignupForm from "./components/Signup";
import Nav from "./Nav";
import LoginForm from "./components/Login";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";
import { SearchContext } from "./SearchContext";
import { useState, useContext } from "react";
// import Header from "./components/Header";
// import { UserContext } from "./context/UserContext";

function App() {
    const [symbol, setSymbol] = useState("");

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
        <>
            <MainPage />
            <BrowserRouter>
                <SearchContext.Provider value={symbol}>
                    <Nav
                        setSymbol={setSymbol}
                        symbol={symbol}
                    />
                    <div className="container">
                        <Routes>
                            {/* <ErrorNotification error={error} />
      <Construct info={launch_info} /> */}
                            <Route
                                path="/dashboard"
                                element={<Dashboard />}
                            />
                            <Route
                                path="/login"
                                element={<LoginForm />}
                            />
                            <Route
                                path="/signup"
                                element={<SignupForm />}
                            />
                            <Route
                                path="/stock"
                                element={<StockDetail search={symbol} />}
                            />
                        </Routes>
                    </div>
                </SearchContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
