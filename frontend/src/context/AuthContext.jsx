import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jmatch_token');

    if (token) {
      setUser({});
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });

    const { access_token } = response.data;

    localStorage.setItem('jmatch_token', access_token);

    setUser({});

    return response.data;
  };

  const register = async (fullName, email, password) => {
    const response = await authAPI.register({
      full_name: fullName,
      email,
      password,
    });

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('jmatch_token');
    localStorage.removeItem('jmatch_user');

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}