// LatestArticlePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LatestArticlePage = () => {
    const [articles, setArticles] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [error, setError] = useState(null);
    const [currentPageUrl, setCurrentPageUrl] = useState('http://localhost:8000/articles/?ordering=-create_at');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // 최신 기사 가져오기
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(currentPageUrl);
                const data = response.data;
                setArticles(data.results);
                setNextPage(data.next);
                setPreviousPage(data.previous);
                setTotalPages(Math.ceil(data.count / 5));
            } catch (err) {
                setError('최신 기사를 가져오는 데 실패했습니다.');
            }
        };

        fetchArticles();
    }, [currentPageUrl]);

    const handlePageChange = (url, pageNumber) => {
        setCurrentPageUrl(url);
        setCurrentPage(pageNumber);
    };

    // 페이지네이션 버튼 생성
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let page = 1; page <= totalPages; page++) {
            buttons.push(
                <button
                    key={page}
                    onClick={() => handlePageChange(`http://localhost:8000/articles/?ordering=-create_at&page=${page}`, page)}
                    className={`py-2 px-4 rounded ${page === currentPage ? 'underline font-bold' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                >
                    {page}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div className="bg-white text-gray-800">
            <main className="max-w-7xl mx-auto px-4 py-6">
                {error && <p className="text-red-600">{error}</p>}
                {articles.length === 0 && !error && <p>최신 기사가 없습니다.</p>}
                {articles.map((article) => (
                    <div key={article.id} className="news-item border-b border-gray-200 py-4">
                        <a href={article.url} className="news-link text-blue-500 text-lg font-semibold">{article.title}</a>
                        <p className="news-description text-gray-600">
                            <Link to={`/articles/${article.id}`}>
                                {article.content}
                            </Link>
                        </p>
                        <div className="news-meta text-gray-500 text-sm">작성일: {new Date(article.create_at).toLocaleDateString()}</div>
                    </div>
                ))}
                <div className="flex justify-between mt-6">
                    <button
                        onClick={() => handlePageChange(previousPage, currentPage - 1)}
                        disabled={!previousPage}
                        className={`py-2 px-4 rounded ${!previousPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                    >
                        이전
                    </button>
                    <div className="flex gap-2">
                        {renderPaginationButtons()}
                    </div>
                    <button
                        onClick={() => handlePageChange(nextPage, currentPage + 1)}
                        disabled={!nextPage}
                        className={`py-2 px-4 rounded ${!nextPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                    >
                        다음
                    </button>
                </div>
            </main>
        </div>
    );
};

export default LatestArticlePage;
