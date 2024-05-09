// src/pages/MainPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MainPage = () => {
    const [articles, setArticles] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [error, setError] = useState(null);
    const [currentPageUrl, setCurrentPageUrl] = useState('http://localhost:8000/articles/');

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(currentPageUrl);
                const data = response.data;
                console.log("data:", data)
                setArticles(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
            } catch (err) {
                setError('게시글을 가져오는 데 실패했습니다.');
            }
        };

        fetchArticles();
    }, [currentPageUrl]);

    const handlePageChange = (url) => {
        setCurrentPageUrl(url);
    };

    return (
        <div className="bg-white text-gray-800">
            <main className="max-w-7xl mx-auto px-4 py-6">
                {error && <p className="text-red-600">{error}</p>}
                {articles.length === 0 && !error && <p>게시글이 없습니다.</p>}
                {articles.map((article) => (



                    <div key={article.id} className="news-item border-b border-gray-200 py-4">

                        <a href={article.url} className="news-link text-blue-500 text-lg font-semibold">{article.title}</a>

                        <p className="news-description text-gray-600">
                            <Link to={`/articles/${article.id}`} >
                                {article.content}
                            </Link>
                        </p>

                        <div className="news-meta text-gray-500 text-sm">작성일: {new Date(article.create_at).toLocaleDateString()}</div>
                    </div>




                ))}
                <div className="flex justify-between mt-6">
                    {previousPage && (
                        <button
                            onClick={() => handlePageChange(previousPage)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                            이전
                        </button>
                    )}
                    {nextPage && (
                        <button
                            onClick={() => handlePageChange(nextPage)}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                            다음
                        </button>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MainPage;
