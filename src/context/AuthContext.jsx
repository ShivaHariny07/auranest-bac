import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
        const savedUser = localStorage.getItem('aura_nest_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
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
      
      // Check if user exists in our database
      const { data: userData, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        throw new Error('Invalid email or password');
      }

      // For demo purposes, we'll accept any password
      // In production, you'd verify the password hash
      const userInfo = {
        id: userData.id,
        email: userData.email,
        name: userData.full_name,
        phone: userData.phone,
        address: userData.address
      };

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
      
      // Insert new user into database
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email: email,
            password_hash: password, // In production, hash this password
            full_name: name
          }
        ])
        .select()
        .single();

      if (error) {
        throw new Error('Registration failed. Email might already exist.');
      }

      const userInfo = {
        id: data.id,
        email: data.email,
        name: data.full_name,
        phone: data.phone,
        address: data.address
      };

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