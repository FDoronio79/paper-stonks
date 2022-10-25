// import { useEffect, useState } from 'react';
// import Construct from './Construct.js'
// import ErrorNotification from './ErrorNotification';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import SignupForm from "./components/Signup";
import Nav from "./Nav";
import LoginForm from "./components/Login";
import Transactions from "./components/Transactions";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";
import { SearchContext } from "./SearchContext";
import { useState, createContext } from "react";
// import { UserContext } from "./context/UserContext";
import ReactSwitch from "react-switch";
import BuyForm from "./components/BuyForm";
import SellForm from "./components/SellForm";
import HomePage from "./components/HomePage";

// import Header from "./components/Header";
// import { UserContext } from "./context/UserContext";
// function GetToken() {
//     useToken();
//     return null;
// }

export const ThemeContext = createContext(null);

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");
    console.log("basename: ", basename);
    const [symbol, setSymbol] = useState("");
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme((curr) => (curr === "light" ? "dark" : "light"));
    };

    return (
        <>
            <div className="switch">
                <label> {theme === "light" ? "Light Mode" : "Dark Mode"} </label>
                <ReactSwitch
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                />
            </div>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <div
                    className="App"
                    id={theme}
                >
                    <MainPage />
                    <BrowserRouter basename={basename}>
                        <SearchContext.Provider value={symbol}>
                            <Nav
                                setSymbol={setSymbol}
                                symbol={symbol}
                            />

                            <div className="container">
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<HomePage />}
                                    />
                                    <Route
                                        path="/dashboard"
                                        element={<Dashboard />}
                                    />
                                    <Route
                                        path="/Transactions"
                                        element={<Transactions />}
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
                                        path="/stock/:stockSymbol"
                                        element={<StockDetail search={symbol} />}
                                    />
                                    <Route
                                        path="/position/buy"
                                        element={<BuyForm />}
                                    />
                                    <Route
                                        path="/position/sell"
                                        element={<SellForm />}
                                    />
                                </Routes>
                            </div>
                        </SearchContext.Provider>
                    </BrowserRouter>
                </div>
            </ThemeContext.Provider>
        </>
    );
}

export default App;
