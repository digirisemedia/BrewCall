import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { ShopAPI } from '../store';
import { 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail, 
  signOut as firebaseSignOut,
  observeAuthState,
  createOrGetUserDoc
} from '../firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, shopName?: string) => Promise<boolean>;
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
    // Listen to Firebase auth state changes
    const unsubscribe = observeAuthState(async (firebaseUser) => {
      if (firebaseUser) {
        console.log('Firebase user logged in:', firebaseUser.email);
        
        // Get or create user document in Firestore
        const userData = await createOrGetUserDoc(firebaseUser);
        
        // If user doesn't have a shop yet, create one
        if (!userData.shop_id) {
          const shopName = `${userData.displayName}'s Coffee Shop`;
          const newShop = await ShopAPI.create({
            name: shopName,
            tagline: 'Welcome to our coffee shop!',
            description: '',
            address: '',
            phone: '',
            email: firebaseUser.email || '',
            logo_emoji: '☕',
            primary_color: '#8B4513',
            owner_id: firebaseUser.uid,
            is_active: true,
            subscription_plan: 'free',
            wallet_balance: 0,
            payment_methods: [],
          });
          
          // Update user with shop_id
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          await setDoc(userDocRef, { ...userData, shop_id: newShop.id }, { merge: true });
          userData.shop_id = newShop.id;
        }
        
        // Convert to our User type
        const appUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          password: '', // Not needed with Firebase Auth
          name: userData.displayName || firebaseUser.displayName || '',
          role: userData.role || 'shop_admin',
          shop_id: userData.shop_id || null,
          created_at: userData.created_at || Date.now(),
        };
        
        setUser(appUser);
      } else {
        console.log('Firebase user logged out');
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('Attempting Firebase login for:', email);
      await signInWithEmail(email, password);
      // Auth state observer will handle setting the user
      return true;
    } catch (error: any) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string, shopName?: string): Promise<boolean> => {
    try {
      console.log('Starting Firebase registration for:', email);
      
      // Create user with Firebase Auth
      const firebaseUser = await signUpWithEmail(email, password, name);
      console.log('Firebase user created:', firebaseUser.uid);
      
      // Create user document in Firestore
      const userData = await createOrGetUserDoc(firebaseUser, shopName);
      
      // Create shop for the new user
      const shopDisplayName = shopName || `${name}'s Coffee Shop`;
      const newShop = await ShopAPI.create({
        name: shopDisplayName,
        tagline: 'Welcome to our coffee shop!',
        description: '',
        address: '',
        phone: '',
        email,
        logo_emoji: '☕',
        primary_color: '#8B4513',
        owner_id: firebaseUser.uid,
        is_active: true,
        subscription_plan: 'free',
        wallet_balance: 0,
        payment_methods: [],
      });
      console.log('Shop created:', newShop.id);
      
      // Update user with shop_id
      const userDocRef = doc(db, 'users', firebaseUser.uid);
      await setDoc(userDocRef, { ...userData, shop_id: newShop.id }, { merge: true });
      console.log('User updated with shop_id');
      
      // Auth state observer will handle setting the user
      return true;
    } catch (error: any) {
      console.error('Registration error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await firebaseSignOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    try {
      console.log('Attempting Google sign-in');
      await signInWithGoogle();
      // Auth state observer will handle setting the user
      return true;
    } catch (error: any) {
      console.error('Google login error:', error);
      return false;
    }
  }, []);

  const loginWithApple = useCallback(async (): Promise<boolean> => {
    // Apple sign-in not implemented yet
    console.warn('Apple sign-in not implemented');
    return false;
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
