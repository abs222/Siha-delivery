import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  status: 'available' | 'not_available' | 'delivering';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateAvailability: (status: 'available' | 'not_available' | 'delivering') => void;
  socket: Socket | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      checkAuth();
    }

    // For demo purposes, set a mock user
    setUser({
      id: '1',
      name: 'Demo User',
      status: 'available'
    });

    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      setUser(response.data);
    } catch (error) {
      console.error('Authentication check failed', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['x-auth-token'];
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['x-auth-token'] = response.data.token;
      await checkAuth();
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
  };

  const updateAvailability = async (status: 'available' | 'not_available' | 'delivering') => {
    try {
      // For demo purposes, update the user status locally
      setUser(prevUser => prevUser ? { ...prevUser, status } : null);
      // In a real application, you would make an API call here
      // const response = await axios.put('/api/partners/status', { status });
      // setUser(response.data);
    } catch (error) {
      console.error('Status update failed', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateAvailability, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};