import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import SignupForm from "./components/Signup";
import Nav from "./Nav";
import LoginForm from "./components/Login";
import Transactions from "./components/Transactions";
import Dashboard from "./components/Dashboard";
import StockDetail from "./components/StockDetail";
import { SearchContext } from "./SearchContext";
import { useState, createContext } from "react";
import BuyForm from "./components/BuyForm";
import SellForm from "./components/SellForm";
import HomePage from "./components/HomePage";
import WatchlistPage from "./components/Watchlist";
export const ThemeContext = createContext(null);

function App() {
    const domain = /https:\/\/[^/]+/;
    const basename = process.env.PUBLIC_URL.replace(domain, "");
    const [symbol, setSymbol] = useState("");

    return (
        <div className="App">
            <BrowserRouter basename={basename}>
                <SearchContext.Provider value={symbol}>
                    <Nav
                        setSymbol={setSymbol}
                        symbol={symbol}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={<HomePage />}
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <Dashboard
                                    setSymbol={setSymbol}
                                    symbol={symbol}
                                />
                            }
                        />
                        <Route
                            path="/transactions"
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
                        <Route
                            path="/watchlist"
                            element={
                                <WatchlistPage
                                    setSymbol={setSymbol}
                                    symbol={symbol}
                                />
                            }
                        />
                    </Routes>
                    <Outlet />
                </SearchContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
