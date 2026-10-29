import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { AuthAPI, seedInitialData, ShopAPI } from '../store';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithApple: () => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Seed initial data (if not already seeded)
        await seedInitialData();
        
        // Get current user from localStorage
        const currentUser = AuthAPI.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error initializing app:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    const loggedIn = AuthAPI.login(email, password);
    if (loggedIn) {
      setUser(loggedIn);
      return true;
    }
    return false;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUser = AuthAPI.getUserByEmail(email);
      if (existingUser) {
        return false;
      }

      // Create new user
      const newUser = AuthAPI.createUser({
        email,
        password,
        name,
        role: 'shop_admin',
        shop_id: null,
      });

      // Automatically create a shop for the new user
      const newShop = ShopAPI.create({
        name: `${name}'s Coffee Shop`,
        tagline: 'Welcome to our coffee shop!',
        description: '',
        address: '',
        phone: '',
        email,
        logo_emoji: '☕',
        primary_color: '#8B4513',
        owner_id: newUser.id,
        is_active: true,
        subscription_plan: 'free',
        wallet_balance: 0,
        payment_methods: [],
      });

      // Update user with shop_id
      const updatedUser = { ...newUser, shop_id: newShop.id };
      AuthAPI.updateUser(newUser.id, { shop_id: newShop.id });
      
      // Login the user
      AuthAPI.login(email, password);
      setUser(updatedUser);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    AuthAPI.logout();
    setUser(null);
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    // Simulate Google OAuth - create a demo user
    const email = `google_user_${Date.now()}@gmail.com`;
    const password = 'google_oauth';
    const name = 'Google User';
    
    return await register(email, password, name);
  }, [register]);

  const loginWithApple = useCallback(async (): Promise<boolean> => {
    // Simulate Apple OAuth - create a demo user
    const email = `apple_user_${Date.now()}@icloud.com`;
    const password = 'apple_oauth';
    const name = 'Apple User';
    
    return await register(email, password, name);
  }, [register]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loginWithGoogle, loginWithApple, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
