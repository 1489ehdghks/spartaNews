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
                    <Link to="/magazine" className="text-blue-500 hover:text-blue-600">매거진</Link>
                    <Link to="/ask" className="text-blue-500 hover=text-blue-600">Ask</Link>
                    <Link to="/show" className="text-blue-500 hover:text-blue-600">Show</Link>
                    <Link to="/gn-plus" className="text-blue-500 hover=text-blue-600">GN+</Link>
                    <Link to="/weekly" className="text-blue-500 hover=text-blue-600">Weekly</Link>
                </div>
                <input type="text" placeholder="로그인" className="input-field" />
            </div>
        </div>
    );
};

export default TopLayout;
