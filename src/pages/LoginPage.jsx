// src/components/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../process/AuthContext';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/users/login/', {
                username,
                password,
            });
            console.log("response", response)
            const { access, refresh } = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            login();
            console.log("access:", access)
            console.log("refresh:", refresh)

            console.log('로그인 성공');
            setErrorMessage('');
            navigate(-1);
        } catch (error) {
            if (error.response && error.response.data) {
                // 서버에서 반환하는 구체적인 에러 메시지 출력
                setErrorMessage(`로그인 실패: ${JSON.stringify(error.response.data)}`);
            } else {
                setErrorMessage('로그인에 실패했습니다. 다시 시도하세요.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="max-w-md w-full p-8 border border-gray-300 shadow-md bg-white rounded-md">
                <h2 className="text-2xl font-bold mb-6">로그인</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field w-full"
                            placeholder="ID"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">암호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field w-full"
                            placeholder="암호"
                            required
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={keepLoggedIn}
                            onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                            className="mr-2"
                        />
                        <label>로그인 유지하기</label>
                    </div>
                    <button type="submit" className="btn-primary w-full">로그인</button>
                </form>
                {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
                <div className="mt-4 text-center">
                    <a href="/signup" className="text-blue-500 hover:text-blue-600">회원가입 / 비밀번호 찾기</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
