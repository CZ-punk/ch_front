import React, { useState, useEffect } from 'react';
import './Login.css';
import mascotLogo from '../../assets/logo-mascot.svg';
import googleLogo from '../../assets/google-logo.svg';
import kakaoLogo from '../../assets/kakao-logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const SOCIAL_LOGIN_URL = provider =>
  `${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/oauth2/authorization/${provider}`;

const Login = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const { setUser, setIsAuthenticated } = useAuth();
  const navigate = useNavigate(); 
  

  useEffect(() => {
    const handleMessage = event => {
      // 보안: 메시지를 보낸 origin이 예상한 도메인인지 확인 (반드시 필요!)
      // OAuthRedirectHandler에서 'http://localhost:3000'으로 보냈으므로 동일하게 설정
      if (event.origin !== 'http://localhost:3000') { 
        console.warn('Origin mismatch for message event:', event.origin);
        return;
      }

      if (event.data && event.data.type === 'OAUTH_LOGIN_SUCCESS') {
        console.log('OAuth 로그인 성공. 쿠키가 설정되었을 것입니다.');
        console.log('왜 안떠', event.data);
        setIsProcessing(false);
        
        setUser({ userId: event.data.userId, nickname: event.data.nickname, role: event.data.role, profileImageUrl: event.data.profileImageUrl });
        setIsAuthenticated(true);
        
        // 사용자 정보는 API 호출을 통해 가져오거나 (보안상 더 좋음),
        // JWT 디코더 라이브러리를 사용해 (쿠키가 아닌 다른 방식으로 JWT를 받는다면)
        // 토큰에서 직접 추출할 수 있지만, HTTP-Only 쿠키라면 직접 접근 불가
        navigate('/'); // 로그인 성공 후 대시보드로 이동
        // window.location.href = '/dashboard'; // 또는 일반적인 리다이렉트
      } else if (event.data && event.data.type === 'OAUTH_LOGIN_FAILURE') {
        setError(event.data.message || '로그인 실패. 다시 시도해주세요.');
        setIsProcessing(false);
      }
    };
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  // 팝업 로그인 함수
  const handleSocialLogin = provider => {
    setIsProcessing(true);
    setError(null);

    const popup = window.open(
      SOCIAL_LOGIN_URL(provider),
      `${provider}Login`,
      'width=500,height=600'
    );

    // 팝업이 차단됐거나 안 열릴 경우
    if (!popup) {
      setError('팝업이 차단되었습니다. 팝업 허용 후 다시 시도하세요.');
      setIsProcessing(false);
      return;
    }

    // 팝업이 닫혔는지 polling (실패/취소 감지)
    const popupCheck = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupCheck);
        setIsProcessing(false); 
        console.log("팝업이 닫혔습니다 (수동 닫힘 또는 메시지 미수신).");
      }
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={mascotLogo} alt="Knowledge Curator Mascot" className="mascot-logo" />
        <div className="login-header">
          <h1>Knowledge Curator</h1>
          <p>개인 맞춤형 지식 큐레이터 플랫폼</p>
        </div>
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError(null)} className="error-close-btn">×</button>
          </div>
        )}
        <div className="social-login-buttons">
          <button
            className="google-login-btn"
            onClick={() => handleSocialLogin('google')}
            type="button"
            disabled={isProcessing}
          >
            <img src={googleLogo} alt="Google Login" className="google-login-logo" />
            <span>{isProcessing ? '로그인 중...' : '구글로 로그인'}</span>
          </button>
          <button
            className="kakao-login-btn"
            onClick={() => handleSocialLogin('kakao')}
            type="button"
            disabled={isProcessing}
          >
            <img src={kakaoLogo} alt="Kakao Login" className="kakao-login-logo" />
            <span>{isProcessing ? '로그인 중...' : '카카오로 로그인'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 