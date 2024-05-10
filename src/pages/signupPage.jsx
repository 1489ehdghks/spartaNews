import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log("e:", e)

        // 비밀번호 확인 검증
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/users/signup/', {
                username,
                email,
                password,
            });
            const { id } = response.data;
            localStorage.setItem('userId', id);
            localStorage.setItem('username', username);
            console.log("response:", response)
            console.log("username:", username)
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.data) {
                // 서버에서 반환하는 구체적인 에러 메시지 출력
                setErrorMessage(`회원가입 실패: ${JSON.stringify(error.response.data)}`);
            } else {
                setErrorMessage('회원가입에 실패했습니다. 다시 시도하세요.');
            }
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <div className="max-w-md w-full p-8 border border-gray-300 shadow-md bg-white rounded-md">
                <h2 className="text-2xl font-bold mb-6">회원가입</h2>
                <form onSubmit={handleSignup} className="space-y-4">
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
                        <label className="block text-sm font-medium text-gray-700">이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field w-full"
                            placeholder="이메일"
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700">암호 확인</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="input-field w-full"
                            placeholder="암호 확인"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full">회원가입</button>
                </form>
                {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
                <div className="mt-4 text-center">
                    <a href="/login" className="text-blue-500 hover:text-blue-600">로그인하러 가기</a>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
