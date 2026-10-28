import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { AuthAPI, seedInitialData } from '../store';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginWithGoogle: () => Promise<boolean>;
  loginWithApple: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    seedInitialData();
    const currentUser = AuthAPI.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const loggedIn = AuthAPI.login(email, password);
    if (loggedIn) {
      setUser(loggedIn);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    AuthAPI.logout();
    setUser(null);
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    // Simulate Google OAuth
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser: User = {
      id: 'google_user_' + Date.now(),
      email: 'user@gmail.com',
      password: 'oauth',
      name: 'Google User',
      role: 'shop_admin',
      shop_id: null,
      created_at: Date.now(),
    };
    setUser(mockUser);
    localStorage.setItem('scaas_current_user', JSON.stringify(mockUser));
    return true;
  }, []);

  const loginWithApple = useCallback(async (): Promise<boolean> => {
    // Simulate Apple OAuth
    await new Promise((r) => setTimeout(r, 1000));
    const mockUser: User = {
      id: 'apple_user_' + Date.now(),
      email: 'user@icloud.com',
      password: 'oauth',
      name: 'Apple User',
      role: 'shop_admin',
      shop_id: null,
      created_at: Date.now(),
    };
    setUser(mockUser);
    localStorage.setItem('scaas_current_user', JSON.stringify(mockUser));
    return true;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loginWithGoogle, loginWithApple, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
