import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { AuthContext } from '../process/AuthContext';

const ArticleCreatePage = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    // 로그인하지 않은 사용자는 글 작성이 불가
    if (!isLoggedIn) {
        alert('글을 작성하려면 로그인이 필요합니다.');
        navigate('/login');
    }

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'content') {
            setContent(value);
        } else if (name === 'url') {
            setUrl(value);
        }
    };

    // 글 작성 요청 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/articles/', {
                title,
                content,
                url,
            });

            // 글 작성이 성공적으로 완료되면 메인 페이지로 이동
            navigate(`/articles/${response.data.id}`);
        } catch (err) {
            setError('글을 작성하는 데 실패했습니다.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">글 작성</h1>
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">제목</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="제목을 입력하세요"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">내용</label>
                    <textarea
                        name="content"
                        value={content}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="내용을 입력하세요"
                        rows={6}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">URL</label>
                    <input
                        type="url"
                        name="url"
                        value={url}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="관련 URL을 입력하세요 (선택사항)"
                    />
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    글 작성
                </button>
            </form>
        </div>
    );
};

export default ArticleCreatePage;
