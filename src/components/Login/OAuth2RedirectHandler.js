import React, { useEffect } from 'react';

const OAuth2RedirectHandler = () => {

    useEffect(() => {
        const handleRedirect = () => {
            const params = new URLSearchParams(window.location.search);
            const loginStatus = params.get('loginStatus');
            const userId = params.get('userId');
            const nickname = params.get('nickname');
            const role = params.get('role');
            const profileImageUrl = params.get('profileImageUrl');

            if (loginStatus === 'success' && window.opener) {
                window.opener.postMessage({ type: 'OAUTH_LOGIN_SUCCESS', userId, nickname, role, profileImageUrl }, 'http://localhost:3000');
                window.close(); 
            } else if (window.opener) {
                window.opener.postMessage({ type: 'OAUTH_LOGIN_FAILURE', message: '로그인 실패' }, 'http://localhost:3000');
                window.close();
            } else {
                console.warn('OAuthRedirectHandler: Not opened as popup or no login status.');
                window.location.href = '/'; 
            }
        };

        handleRedirect();
    }, []);

    return (
        <div>
            <p>로그인 처리 중...</p>
            <p>잠시 후 자동으로 닫힙니다.</p>
        </div>
    );
};

export default OAuth2RedirectHandler;