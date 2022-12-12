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
// import ReactSwitch from "react-switch";
import BuyForm from "./components/BuyForm";
import SellForm from "./components/SellForm";
import HomePage from "./components/HomePage";

export const ThemeContext = createContext(null);

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");
    const [symbol, setSymbol] = useState("");

    // const toggleTheme = () => {
    //     setTheme((curr) => (curr === "light" ? "dark" : "light"));
    // };

    return (
        // <>
        //     <div className="switch">
        //         <label>
        //             {" "}
        //             {theme === "light" ? "Light Mode" : "Dark Mode"}{" "}
        //         </label>
        //         <ReactSwitch
        //             onChange={toggleTheme}
        //             checked={theme === "dark"}
        //         />
        //     </div>
        //     <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="App">
            <MainPage />
            <BrowserRouter basename={basename}>
                <SearchContext.Provider value={symbol}>
                    <div className="row flex-nowrap">
                        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0">
                            <Nav
                                setSymbol={setSymbol}
                                symbol={symbol}
                            />
                        </div>

                        <div
                            className="col py-3"
                            style={{ backgroundColor: "#282c34" }}
                        >
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
                    </div>
                </SearchContext.Provider>
            </BrowserRouter>
        </div>
        //     </ThemeContext.Provider>
        // </>
    );
}

export default App;
