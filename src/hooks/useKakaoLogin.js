import { useCallback, useEffect } from "react";

// Kakao SDK 초기화 훅
export const useKakaoInit = () => {
  const KAKAO_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY || 'your_kakao_javascript_key_here';

  useEffect(() => {
    // Kakao SDK 스크립트가 로드되었는지 확인
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
      console.log('Kakao SDK 초기화 완료');
    }
  }, [KAKAO_KEY]);
};

// 기존 훅은 호환성을 위해 유지
export default function useKakaoLogin() {
  const KAKAO_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY || 'your_kakao_javascript_key_here';

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
    }
  }, [KAKAO_KEY]);

  const login = useCallback(() => {
    if (!window.Kakao) {
      alert("Kakao SDK 로드 실패");
      return;
    }
    window.Kakao.Auth.login({
      scope: "profile_nickname,account_email",
      success: function () {
        window.location.reload();
      },
      fail: function () {
        alert("카카오 로그인 실패");
      }
    });
  }, []);

  return login;
} 