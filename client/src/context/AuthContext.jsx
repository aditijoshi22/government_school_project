import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const performSafeLogout = async () => {
  try {
    // 1. Firebase signOut if initialized/present
    if (typeof window !== 'undefined' && window.firebase?.auth) {
      try {
        await window.firebase.auth().signOut();
      } catch (fbErr) {
        console.warn('Firebase signOut error:', fbErr);
      }
    }

    // 2. Clear query client cache if present
    if (typeof window !== 'undefined' && window.__QUERY_CLIENT__) {
      try {
        window.__QUERY_CLIENT__.clear();
      } catch (qcErr) {
        console.warn('Query cache clear error:', qcErr);
      }
    }

    // 3. Clear authorization header
    delete axios.defaults.headers.common['Authorization'];
  } catch (err) {
    console.error('Logout cleanup error:', err);
  } finally {
    // 4. Clear storage keys
    try {
      localStorage.removeItem('school_token');
      localStorage.removeItem('school_user');
      sessionStorage.clear();
    } catch (e) {
      console.warn('Storage cleanup error:', e);
    }

    // 5. Navigate to login page with replace
    if (typeof window !== 'undefined') {
      window.location.replace('/login');
    }
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('school_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('school_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Verify/refresh user claims and profile if token is present
      axios.get('/api/auth/me')
        .then(res => {
          if (res.data.success && res.data.user) {
            setUser(prev => ({ ...(prev || {}), ...res.data.user }));
            localStorage.setItem('school_user', JSON.stringify({ ...(user || {}), ...res.data.user }));
          }
        })
        .catch(err => {
          if (err.response?.status === 401 || err.response?.status === 403) {
            // Token is invalid/expired
            performSafeLogout();
          }
        });
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Bind global logout helper for error boundaries and standalone handlers
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__school_logout = performSafeLogout;
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      if (res.data.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem('school_token', res.data.token);
        localStorage.setItem('school_user', JSON.stringify(res.data.user));

        // Optional Firebase token refresh if available
        if (typeof window !== 'undefined' && window.firebase?.auth?.()?.currentUser?.getIdToken) {
          try {
            await window.firebase.auth().currentUser.getIdToken(true);
          } catch (tokErr) {
            console.warn('Firebase token refresh note:', tokErr);
          }
        }

        return { success: true, user: res.data.user };
      } else {
        return { success: false, message: res.data.message };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Login failed. Please check credentials.'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    await performSafeLogout();
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
