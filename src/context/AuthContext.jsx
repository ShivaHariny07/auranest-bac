import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../lib/api';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('aura_nest_token');
        if (token) {
          // Token exists, user is logged in
          const savedUser = localStorage.getItem('aura_nest_user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const data = await apiClient.login(email, password);
      const userInfo = data.user;

      setUser(userInfo);
      localStorage.setItem('aura_nest_user', JSON.stringify(userInfo));
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    try {
      setLoading(true);
      
      const data = await apiClient.register(name, email, password);
      const userInfo = data.user;

      setUser(userInfo);
      localStorage.setItem('aura_nest_user', JSON.stringify(userInfo));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
    localStorage.removeItem('aura_nest_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};