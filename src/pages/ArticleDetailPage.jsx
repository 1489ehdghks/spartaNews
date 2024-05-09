// src/pages/ArticleDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetailPage = () => {
    const { id } = useParams(); // URL의 :id 매개변수 가져오기
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/articles/${id}/`);
                setArticle(response.data);
            } catch (err) {
                setError('게시글을 가져오는 데 실패했습니다.');
            }
        };

        fetchArticle();
    }, [id]);

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    if (!article) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            {article.url && (
                <a href={article.url} className="text-blue-500 hover:text-blue-600 mt-2 inline-block">
                    {article.url}
                </a>
            )}
            <p className="mt-4 text-lg">{article.content}</p>

        </div>
    );
};

export default ArticleDetailPage;
