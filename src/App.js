import React from 'react';
import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useKakaoInit } from './hooks/useKakaoLogin'; // Kakao SDK 초기화 훅
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // AuthContext 제공자 및 훅
import { CoupleProvider } from './contexts/CoupleContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OAuth2RedirectHandler from './components/Login/OAuth2RedirectHandler'; // OAuth 리다이렉트 핸들러

// Google OAuth 클라이언트 ID (환경 변수에서 가져옴)
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '808933876438-593dqmnt0mudget3pbr2p2d99d0nk131.apps.googleusercontent.com';

// ---

/**
 * AppContent 컴포넌트:
 * useAuth 훅을 사용하여 사용자 인증 상태를 확인하고
 * 로그인 여부에 따라 Dashboard 또는 Login 컴포넌트를 렌더링합니다.
 */
function AppContent() {
  // Kakao SDK 초기화 훅 호출
  useKakaoInit();
  // AuthContext에서 user 객체와 logout 함수를 가져옵니다.
  const { user, logout } = useAuth();

  return (
    <div className="App">
      {/* user 객체가 존재하면 (로그인 상태) Dashboard를, 없으면 Login 컴포넌트를 렌더링 */}
      {user ? (
        // Dashboard 컴포넌트에 user 정보와 logout 함수를 props로 전달
        <Dashboard user={user} onLogout={logout} />
      ) : (
        // Login 컴포넌트 (로그인 상태가 아닐 때)
        <Login />
      )}
    </div>
  );
}

// ---

/**
 * App 컴포넌트:
 * 애플리케이션의 최상위 컴포넌트로, 다양한 Context와 라우터를 설정합니다.
 */
function App() {
  return (
    // Google OAuth 기능을 전역적으로 사용하기 위한 Provider
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      
      <AuthProvider>
        <CoupleProvider>
          <Router>
            <Routes>
      
              <Route path="/" element={<AppContent />} />  
              <Route path="/oauth/redirect" element={<OAuth2RedirectHandler />} />
    
            </Routes>
          </Router>
        </CoupleProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;