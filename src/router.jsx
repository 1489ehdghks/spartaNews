import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/signupPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import UserDetailPage from './pages/UserDetailPage';
import LatestArticlePage from './pages/LatestArticlePage';
import ArticleCreatePage from './pages/ArticleCreatePage';
import OldestArticlePage from './pages/OldestArticlePage';

const Router = () => (
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/articles" element={<ArticleCreatePage />} />
        <Route path="/articles/:id" element={<ArticleDetailPage />} />
        <Route path="/users/:username" element={<UserDetailPage />} />
        <Route path="/latest" element={<LatestArticlePage />} />
        <Route path="/old" element={<OldestArticlePage />} />
    </Routes>
);

export default Router;
