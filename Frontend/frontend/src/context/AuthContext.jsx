import React, { createContext, useEffect, useState } from 'react';
import { clearAccessToken, getAccessToken, logoutService, refreshToken } from '../api/AuthService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken()
      if (token) {
        setIsAuthenticated(true);
        setLoading(false)
        return;
      }
      try {
          await refreshToken();
          setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.log('Logout error', error);
    }
    clearAccessToken();
    setIsAuthenticated(false);
  };

  const login = accessToken => {
    console.log(accessToken);
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


