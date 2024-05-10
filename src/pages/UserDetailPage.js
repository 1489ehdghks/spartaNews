// UserDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';

const UserDetailPage = () => {
    // URL의 :username 매개변수 가져오기
    const { username } = useParams();
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axiosInstance.get(`/users/${username}/`);
                setUserInfo(response.data);
            } catch (error) {
                setErrorMessage('유저 정보를 가져오는 데 실패했습니다.');
            }
        };

        fetchUserInfo();
    }, [username]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    // 유저 정보 업데이트
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`/users/${username}/`, userInfo);
            setSuccessMessage('유저 정보가 성공적으로 업데이트되었습니다.');
        } catch (error) {
            console.log("userInfo:", userInfo)
            setErrorMessage('유저 정보 업데이트에 실패했습니다.');

        }
    };

    // 계정 탈퇴 요청
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/users/${username}/`);
            alert('계정이 삭제되었습니다.');
            navigate('/signup');
        } catch (error) {
            setErrorMessage('계정 삭제에 실패했습니다.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">유저 정보</h1>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            {successMessage && <p className="text-green-600">{successMessage}</p>}
            <form onSubmit={handleUpdate} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">사용자 이름</label>
                    <input
                        type="text"
                        name="username"
                        value={userInfo.username || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="사용자 이름"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">이메일</label>
                    <input
                        type="email"
                        name="email"
                        value={userInfo.email || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="이메일"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    업데이트
                </button>
            </form>
            <div className="mt-6">
                <button
                    onClick={handleDelete}
                    className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    계정 삭제
                </button>
            </div>
        </div>
    );
};

export default UserDetailPage;
