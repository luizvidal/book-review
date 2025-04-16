'use client';

import { useToast } from '@/hooks/use-toast';
import { authApi } from '@/lib/api';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in on initial load
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        loadUserProfile();
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      setIsLoading(true);
      const userData = await authApi.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user profile:', error);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      setUser(null);
      toast({
        title: 'Session expired',
        description: 'Please login again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.login(email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.access_token);
      }
      setUser(response.user);
      toast({
        title: 'Login successful',
        description: `Welcome back, ${response.user.name}!`,
      });
    } catch (error) {
      console.error('Login failed:', error);
      toast({
        title: 'Login failed',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(name, email, password);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.access_token);
      }
      setUser(response.user);
      toast({
        title: 'Registration successful',
        description: `Welcome, ${response.user.name}!`,
      });
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: 'Registration failed',
        description: 'Email may already be in use',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
