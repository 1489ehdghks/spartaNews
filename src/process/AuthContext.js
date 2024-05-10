import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const StorageUsername = localStorage.getItem('username');
        setIsLoggedIn(!!token);
        setUsername(StorageUsername || '');
    }, []);


    const login = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
