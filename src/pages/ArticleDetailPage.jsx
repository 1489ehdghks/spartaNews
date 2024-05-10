import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axiosInstance';
import { AuthContext } from '../process/AuthContext';



const ArticleDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(AuthContext);
    const [article, setArticle] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                //article
                const response = await axiosInstance.get(`/articles/${id}/`);
                setArticle(response.data);

                //comment
                const commentsResponse = await axiosInstance.get(`/articles/${id}/comments/`);
                setComments(commentsResponse.data);
                console("commentsResponse.data:", commentsResponse.data)
                console("ArticleResponse:", response)
                console("CommentsResponse:", commentsResponse)
            } catch (err) {
                setError('게시글을 가져오는 데 실패했습니다.');
            }
        };

        const userId = localStorage.getItem('userId');
        setCurrentUserId(userId);
        fetchArticle();
    }, [id]);


    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };



    //댓글 작성
    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            alert('댓글을 작성하려면 로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        const userId = localStorage.getItem('userId');

        try {
            // 서버에 댓글 작성 요청
            const response = await axiosInstance.post(`/articles/${id}/comments/`, {
                content: newComment,
                user_id: userId,
            });

            // 새로 작성된 댓글을 목록에 추가
            setComments((prevComments) => [...prevComments, response.data]);
            setNewComment('');
        } catch (err) {
            setError('댓글 작성에 실패했습니다.');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleCommentSubmit(e);
        }
    };
    const handleCommentDelete = async (commentId) => {
        try {
            await axiosInstance.delete(`/articles/comments/${commentId}/`);
            setComments((prevComments) => prevComments.filter(comment => comment.id !== commentId));
        } catch (err) {
            setError('댓글 삭제에 실패했습니다.');
        }
    };

    if (!article) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    if (!comments) {
        return <p>댓글이 없습니다...</p>;
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

            {/* 댓글 목록 */}
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">댓글</h2>
                {/* 댓글 작성 폼 */}
                <form onSubmit={handleCommentSubmit} className="mt-6">
                    <textarea
                        value={newComment}
                        onChange={handleCommentChange}
                        onKeyDown={handleKeyPress}
                        placeholder="댓글을 입력하세요..."
                        className="w-full p-2 border border-gray-300 rounded"
                        rows={3}
                    />
                    <div className="mt-2 flex justify-end">
                        <button
                            type="submit"
                            onClick={handleCommentSubmit}
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            댓글 작성
                        </button>
                    </div>
                </form>
                {comments.length === 0 ? (
                    <p>댓글이 없습니다.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="mb-4 p-4 border-b border-gray-200 flex justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-blue-600">{comment.user_id}</h2>
                                <p>{comment.content}</p>
                                <div className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</div>
                            </div>
                            {/* 댓글 삭제 버튼 */}
                            {comment.user_id == currentUserId && (
                                <button
                                    onClick={() => handleCommentDelete(comment.id)}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    삭제
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ArticleDetailPage;
