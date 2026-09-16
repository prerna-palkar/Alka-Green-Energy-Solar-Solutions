import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getMe } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('alka_solar_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getMe(token);
          if (res.status === 'success') {
            setUser(res.user);
            setCustomer(res.customer || null);
          } else {
            logout();
          }
        } catch (err) {
          console.warn("Failed to verify user session token:", err?.message);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.token) {
      localStorage.setItem('alka_solar_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setCustomer(res.customer || null);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await registerUser(userData);
    if (res.token) {
      localStorage.setItem('alka_solar_token', res.token);
      setToken(res.token);
      setUser(res.user);
      setCustomer(res.customer || null);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('alka_solar_token');
    setToken(null);
    setUser(null);
    setCustomer(null);
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = isAuthenticated && user?.role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        token,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
