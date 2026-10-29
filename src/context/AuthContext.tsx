import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { AuthAPI, seedInitialData } from '../store';
import { signInWithGoogle, signInWithApple, signInWithEmail, signUpWithEmail, signOut as firebaseSignOut, observeAuthState } from '../firebase/auth';

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
        // Seed initial data to Firestore (if not already seeded)
        await seedInitialData();
        
        // Listen to Firebase auth state changes
        const unsubscribe = observeAuthState(async (firebaseUser: any) => {
          if (firebaseUser) {
            // User is logged in via Firebase
            // Check if user exists in our database
            let appUser = await AuthAPI.getUserByEmail(firebaseUser.email || '');
            
            if (!appUser) {
              // Create new user in our database
              appUser = await AuthAPI.createUser({
                email: firebaseUser.email || '',
                password: 'firebase_oauth', // Placeholder, Firebase handles auth
                name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
                role: 'shop_admin',
                shop_id: null,
              });
              
              // Automatically create a shop for the new user
              const { ShopAPI } = await import('../store');
              const newShop = await ShopAPI.create({
                name: `${appUser.name}'s Coffee Shop`,
                tagline: 'Welcome to our coffee shop!',
                description: '',
                address: '',
                phone: '',
                email: appUser.email,
                logo_emoji: '☕',
                primary_color: '#8B4513',
                owner_id: appUser.id,
                is_active: true,
                subscription_plan: 'free',
                wallet_balance: 0,
                payment_methods: [],
              });
              
              // Update user with shop_id
              appUser = { ...appUser, shop_id: newShop.id };
              await AuthAPI.updateUser(appUser.id, { shop_id: newShop.id });
            }
            
            setUser(appUser);
            localStorage.setItem('scaas_current_user', JSON.stringify(appUser));
          } else {
            // User is logged out
            setUser(null);
            localStorage.removeItem('scaas_current_user');
          }
          setIsLoading(false);
        });
        
        return () => unsubscribe();
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const firebaseUser = await signInWithEmail(email, password);
      if (firebaseUser) {
        // Firebase auth succeeded, user will be set by observer
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const firebaseUser = await signUpWithEmail(email, password, name);
      if (firebaseUser) {
        // Firebase auth succeeded, user will be set by observer
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut();
      setUser(null);
      localStorage.removeItem('scaas_current_user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    try {
      const firebaseUser = await signInWithGoogle();
      if (firebaseUser) {
        // Firebase auth succeeded, user will be set by observer
        return true;
      }
      return false;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  }, []);

  const loginWithApple = useCallback(async (): Promise<boolean> => {
    try {
      const firebaseUser = await signInWithApple();
      if (firebaseUser) {
        // Firebase auth succeeded, user will be set by observer
        return true;
      }
      return false;
    } catch (error) {
      console.error('Apple login error:', error);
      return false;
    }
  }, []);

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
