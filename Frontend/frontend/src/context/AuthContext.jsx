import React, { createContext, useEffect, useState } from 'react';
import { clearAccessToken, getAccessToken, logoutService, refreshToken } from '../api/AuthService';
import { getUserDetails } from '../api/UserService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user,setUser] =useState(null);


  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken()
      if (token) {
        setIsAuthenticated(true);
        setLoading(false)
        const response = await getUserDetails();
        setUser(response);
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
    finally{
      clearAccessToken();
      setIsAuthenticated(false);
    }
  };

  const login = accessToken => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


