import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // localStorage에서 user 복원
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // user가 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [user]);

  // 로그아웃
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    apiFetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

  };

  const value = {
    user, // { userId, nickname, role }
    isAuthenticated,
    setUser,
    setIsAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 