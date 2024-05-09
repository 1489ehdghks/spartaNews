// src/components/TopLayout.js
import React from 'react';
import { Link } from 'react-router-dom';

const TopLayout = () => {
    return (
        <div className="header p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-lg font-semibold">GeekNews</div>
                <div className="space-x-4">
                    <Link to="/latest" className="text-blue-500 hover:text-blue-600">최신글</Link>
                    <Link to="/magazine" className="text-blue-500 hover:text-blue-600">인기글</Link>
                    <Link to="/ask" className="text-blue-500 hover=text-blue-600">글등록</Link>
                    <Link to="/weekly" className="text-blue-500 hover=text-blue-600">Weekly</Link>
                    <Link to="/" className="text-blue-500 hover=text-blue-600">/</Link>
                    <Link to="/userinfo" className="text-blue-500 hover:text-blue-600">내정보</Link>
                    <Link to="/show" className="text-blue-500 hover:text-blue-600">화이팅</Link>

                </div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">로그인</button>
            </div>
        </div>
    );
};

export default TopLayout;
