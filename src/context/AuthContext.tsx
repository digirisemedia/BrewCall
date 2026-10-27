import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { AuthAPI, seedInitialData, ShopAPI } from '../store';
import {
  signInWithGoogle,
  signInWithApple,
  signInWithEmail,
  signUpWithEmail,
  signOut as firebaseSignOut,
  observeAuthState,
} from '../firebase/auth';
import { isFirebaseConfigured } from '../firebase/config';
import { User as FirebaseUser, updateProfile } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, shopName: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  loginWithApple: () => Promise<boolean>;
  logout: () => Promise<void>;
  isFirebaseReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Map Firebase UID to our local user ID
const FIREBASE_UID_KEY = 'brewcall_firebase_uid_map';

function getFirebaseUidMap(): Record<string, string> {
  try {
    const data = localStorage.getItem(FIREBASE_UID_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function setFirebaseUidMap(map: Record<string, string>) {
  localStorage.setItem(FIREBASE_UID_KEY, JSON.stringify(map));
}

function findLocalUserByFirebaseUid(firebaseUid: string): User | null {
  const map = getFirebaseUidMap();
  const localUserId = map[firebaseUid];
  if (!localUserId) return null;
  
  const users = AuthAPI.getAllUsers();
  return users.find((u) => u.id === localUserId) || null;
}

function linkFirebaseUidToLocalUser(firebaseUid: string, localUserId: string) {
  const map = getFirebaseUidMap();
  map[firebaseUid] = localUserId;
  setFirebaseUidMap(map);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    // Seed initial data
    seedInitialData();
    
    // Check Firebase configuration
    const firebaseReady = isFirebaseConfigured();
    setIsFirebaseReady(firebaseReady);
    
    if (firebaseReady) {
      // Listen to Firebase auth state
      const unsubscribe = observeAuthState(async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // Firebase user is signed in
          const localUser = findLocalUserByFirebaseUid(firebaseUser.uid);
          
          if (localUser) {
            // Existing user - just set them
            setUser(localUser);
            localStorage.setItem('scaas_current_user', JSON.stringify(localUser));
          } else {
            // New Firebase user - create local account
            const newUser = await createLocalUserFromFirebase(firebaseUser);
            if (newUser) {
              setUser(newUser);
              localStorage.setItem('scaas_current_user', JSON.stringify(newUser));
            }
          }
        } else {
          // No Firebase user - check for legacy session
          const legacyUser = AuthAPI.getCurrentUser();
          setUser(legacyUser);
        }
        setIsLoading(false);
      });
      
      return () => unsubscribe();
    } else {
      // Firebase not configured - use legacy auth
      const legacyUser = AuthAPI.getCurrentUser();
      setUser(legacyUser);
      setIsLoading(false);
    }
  }, []);

  const createLocalUserFromFirebase = async (firebaseUser: FirebaseUser | any): Promise<User | null> => {
    const email = firebaseUser.email;
    if (!email) return null;
    
    // Check if user already exists by email
    const existingUsers = AuthAPI.getAllUsers();
    const existingUser = existingUsers.find((u) => u.email === email);
    
    if (existingUser) {
      linkFirebaseUidToLocalUser(firebaseUser.uid, existingUser.id);
      return existingUser;
    }
    
    // Create new shop owner account
    const displayName = firebaseUser.displayName || email.split('@')[0];
    const shopName = `${displayName}'s Coffee Shop`;
    
    // Create the user
    const newUser = AuthAPI.createUser({
      email: email,
      password: `firebase_${firebaseUser.uid}`, // Placeholder - Firebase handles auth
      name: displayName,
      role: 'shop_admin',
      shop_id: null,
    });
    
    // Create the shop
    const newShop = ShopAPI.create({
      name: shopName,
      tagline: '',
      description: '',
      address: '',
      phone: '',
      email: email,
      logo_emoji: '☕',
      primary_color: '#8B4513',
      owner_id: newUser.id,
      is_active: true,
      subscription_plan: 'free',
    });
    
    // Update user with shop_id
    const users = AuthAPI.getAllUsers();
    const updatedUsers = users.map((u) =>
      u.id === newUser.id ? { ...u, shop_id: newShop.id } : u
    );
    localStorage.setItem('scaas_users', JSON.stringify(updatedUsers));
    
    // Link Firebase UID to local user
    linkFirebaseUidToLocalUser(firebaseUser.uid, newUser.id);
    
    return { ...newUser, shop_id: newShop.id };
  };

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    if (isFirebaseReady) {
      try {
        await signInWithEmail(email, password);
        // Auth state observer will handle setting the user
        return true;
      } catch {
        return false;
      }
    } else {
      // Fallback to legacy auth
      const loggedIn = AuthAPI.login(email, password);
      if (loggedIn) {
        setUser(loggedIn);
        return true;
      }
      return false;
    }
  }, [isFirebaseReady]);

  const register = useCallback(async (email: string, password: string, name: string, shopName: string): Promise<boolean> => {
    if (isFirebaseReady) {
      try {
        const firebaseUser = await signUpWithEmail(email, password);
        if (firebaseUser) {
          // Update display name
          await updateProfile(firebaseUser, { displayName: name });
          
          // Create local user and shop
          const newUser = AuthAPI.createUser({
            email,
            password: `firebase_${firebaseUser.uid}`,
            name,
            role: 'shop_admin',
            shop_id: null,
          });
          
          const newShop = ShopAPI.create({
            name: shopName,
            tagline: '',
            description: '',
            address: '',
            phone: '',
            email,
            logo_emoji: '☕',
            primary_color: '#8B4513',
            owner_id: newUser.id,
            is_active: true,
            subscription_plan: 'free',
          });
          
          // Update user with shop_id
          const users = AuthAPI.getAllUsers();
          const updatedUsers = users.map((u) =>
            u.id === newUser.id ? { ...u, shop_id: newShop.id } : u
          );
          localStorage.setItem('scaas_users', JSON.stringify(updatedUsers));
          
          linkFirebaseUidToLocalUser(firebaseUser.uid, newUser.id);
          setUser({ ...newUser, shop_id: newShop.id });
          return true;
        }
        return false;
      } catch {
        return false;
      }
    } else {
      // Fallback to legacy registration
      const result = AuthAPI.register({ email, password, name, shopName });
      if ('error' in result) return false;
      AuthAPI.login(email, password);
      setUser(result.user);
      return true;
    }
  }, [isFirebaseReady]);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    if (!isFirebaseReady) return false;
    try {
      await signInWithGoogle();
      // Auth state observer will handle setting the user
      return true;
    } catch {
      return false;
    }
  }, [isFirebaseReady]);

  const loginWithApple = useCallback(async (): Promise<boolean> => {
    if (!isFirebaseReady) return false;
    try {
      await signInWithApple();
      // Auth state observer will handle setting the user
      return true;
    } catch {
      return false;
    }
  }, [isFirebaseReady]);

  const logout = useCallback(async () => {
    if (isFirebaseReady) {
      await firebaseSignOut();
    }
    AuthAPI.logout();
    setUser(null);
  }, [isFirebaseReady]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        loginWithApple,
        logout,
        isFirebaseReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
