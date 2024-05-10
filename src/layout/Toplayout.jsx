import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../process/AuthContext';
import './MarqueeOverlay.css';


const TopLayout = () => {
    const { isLoggedIn, username, logout } = useContext(AuthContext);
    const [showMarquee, setShowMarquee] = useState(false);
    const navigate = useNavigate();

    const handleAuthAction = () => {
        if (isLoggedIn) {
            logout();
            navigate('/login');
        } else {
            navigate('/signup');
        }
    }
    const handleMarqueeToggle = () => {
        setShowMarquee(!showMarquee);
    };
    return (
        <div className="header p-4 shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                    <Link to="/" className="text-lg font-semibold">GeekNews</Link>
                </div>
                <div className="space-x-4">
                    <Link to="/latest" className="text-blue-500 hover:text-blue-600">최신글</Link>
                    <Link to="/old" className="text-blue-500 hover:text-blue-600">오래된글</Link>
                    <Link to="/articles" className="text-blue-500 hover:text-blue-600">글등록</Link>
                    <Link onClick={handleMarqueeToggle} className="text-blue-500 hover:text-blue-600">/</Link>
                    {isLoggedIn && <Link to={`/users/${username}`} className="text-blue-500 hover:text-blue-600">내정보</Link>}
                </div>
                <button
                    onClick={handleAuthAction}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {isLoggedIn ? '로그아웃' : '회원가입'}
                </button>
            </div>
            {showMarquee && (
                <div className="marquee-overlay">
                    <marquee className="colorful-text colorful-1" behavior="scroll" direction="left" scrollamount="17">대댓글 개발하다가 그냥 이거 만들었어요</marquee>
                    <marquee className="colorful-text colorful-2" behavior="scroll" direction="left" scrollamount="22">우리 발표 망한거예요?</marquee>
                    <marquee className="colorful-text colorful-5" behavior="scroll" direction="left" scrollamount="30">ATTENTION!</marquee>
                    <marquee className="colorful-text colorful-4" behavior="scroll" direction="left" scrollamount="10">넌 대한민국의 자랑이야 김시은!!</marquee>
                    <marquee className="colorful-text colorful-1" behavior="scroll" direction="left" scrollamount="15">OHHHHHHHH</marquee>
                    <marquee className="colorful-text colorful-5" behavior="scroll" direction="left" scrollamount="37">BTS, 봉준호, 송흥민, 김시은 Let's go</marquee>
                    <marquee className="colorful-text colorful-1" behavior="scroll" direction="left" scrollamount="35">젠장 ! 믿고 있었다구!!!</marquee>
                    <marquee className="colorful-text colorful-4" behavior="scroll" direction="left" scrollamount="27">하나 둘 셋 3조 화이팅!</marquee>
                    <marquee className="colorful-text colorful-3" behavior="scroll" direction="left" scrollamount="19">김시은!김시은!김시은!</marquee>
                    <marquee className="colorful-text colorful-2" behavior="scroll" direction="left" scrollamount="25">잘가라. 김시은이 발표하기 전에 있었던 범부들이여</marquee>
                </div>
            )}
        </div>
    );
};

export default TopLayout;
