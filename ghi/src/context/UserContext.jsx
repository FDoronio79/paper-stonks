import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [fastapi_token, setToken] = useState(localStorage.getItem("AccountsToken"));
    const [username, setUsername] = useState(localStorage.getItem("Username"));
    useEffect(() => {
        const fetchUser = async () => {
            const requestOptions = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + fastapi_token,
                },
            };

            const response = await fetch("/api/accounts", requestOptions);
            

            if (!response.ok) {
                setToken(null);
            }
            localStorage.setItem("AccountsToken", fastapi_token);
        };
        fetchUser();
    }, [fastapi_token]);

    return (
        <UserContext.Provider value={[fastapi_token, setToken]}>
            {props.children}
        </UserContext.Provider>
    );
};