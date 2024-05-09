// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/users/login/', {
                username,
                password,
            });
            const { access, refresh } = response.data;
            localStorage.setItem('access', access);
            localStorage.setItem('refresh', refresh);
            setMessage('로그인에 성공했습니다.');
        } catch (error) {
            setMessage('로그인 실패: ' + (error.response?.data?.error || '알 수 없는 오류'));
        }
    };

    return (
        <div className="form-container">
            <h2 className="text-2xl font-semibold mb-6">로그인</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="사용자 이름" value={username} onChange={(e) => setUsername(e.target.value)} required className="input-field" />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field" />
                <button type="submit" className="btn-primary w-full">로그인</button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
};

export default Login;
