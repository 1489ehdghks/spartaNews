import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/signupPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import UserDetailPage from './pages/UserDetailPage';


const Router = () => (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/users/:username" element={<UserDetailPage />} />
    </Routes>
);

export default Router;
