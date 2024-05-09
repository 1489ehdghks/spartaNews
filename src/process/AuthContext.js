import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로컬 스토리지에 액세스 토큰이 있으면 로그인 상태로 설정
        const token = localStorage.getItem('accessToken');
        setIsLoggedIn(!!token);
    }, []);

    // 로그인 상태 업데이트 및 확인 메서드 정의
    const login = () => setIsLoggedIn(true);
    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
