// src/config/api.js

// 쿠키에서 토큰을 읽어오는 함수
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// API 설정
const API_CONFIG = {
  // 개발 환경
  development: {
    baseURL: 'http://localhost:8080',
    timeout: 10000,
  },
  // 배포 환경
  production: {
    baseURL: process.env.REACT_APP_API_URL || 'https://your-production-domain.com',
    timeout: 15000,
  }
};

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const BASE_URL = API_CONFIG[ENV].baseURL;

// 공통 fetch 래퍼
export async function apiFetch(url, options = {}) {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  const headers = {
    ...(options.headers || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    ...(refreshToken ? { RefreshToken: refreshToken } : {}),
  };

  // url이 http로 시작하지 않으면 BASE_URL을 붙임
  const fullUrl = url.startsWith('http') ? url : BASE_URL + url;

  return fetch(fullUrl, {
    ...options,
    headers,
    credentials: 'include', // 쿠키 포함
  });
}

// API 엔드포인트
export const API_ENDPOINTS = {
  AUTH: {
    // 서버 사이드 OAuth 엔드포인트
    GOOGLE_OAUTH: '/api/auth/google/oauth',
    KAKAO_OAUTH: '/api/auth/kakao/oauth',
    GOOGLE_CALLBACK: '/api/auth/google/callback',
    KAKAO_CALLBACK: '/api/auth/kakao/callback',
    // 기존 API (토큰 기반)
    GOOGLE_LOGIN: '/api/auth/google',
    KAKAO_LOGIN: '/api/auth/kakao',
    REFRESH_TOKEN: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile',
  }
};

export default API_CONFIG; 