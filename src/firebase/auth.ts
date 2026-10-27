import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';

// ==========================================
// Firebase Authentication Service
// ==========================================

// Mock user for demo mode (when Firebase is not configured)
interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

// Google Sign-In
export const signInWithGoogle = async (): Promise<FirebaseUser | MockUser | null> => {
  // If Firebase is not configured, use mock OAuth
  if (!isFirebaseConfigured()) {
    return mockGoogleSignIn();
  }
  
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

// Mock Google Sign-In (for demo without Firebase)
const mockGoogleSignIn = (): Promise<MockUser> => {
  return new Promise((resolve) => {
    // Simulate OAuth popup
    setTimeout(() => {
      const mockUser: MockUser = {
        uid: `google_${Date.now()}`,
        email: `user${Math.floor(Math.random() * 1000)}@gmail.com`,
        displayName: 'Google User',
        photoURL: 'https://lh3.googleusercontent.com/a/default-user',
      };
      resolve(mockUser);
    }, 1500);
  });
};

// Apple Sign-In
export const signInWithApple = async (): Promise<FirebaseUser | MockUser | null> => {
  // If Firebase is not configured, use mock OAuth
  if (!isFirebaseConfigured()) {
    return mockAppleSignIn();
  }
  
  const provider = new OAuthProvider('apple.com');
  provider.addScope('email');
  provider.addScope('name');
  
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Apple sign-in error:', error);
    throw error;
  }
};

// Mock Apple Sign-In (for demo without Firebase)
const mockAppleSignIn = (): Promise<MockUser> => {
  return new Promise((resolve) => {
    // Simulate OAuth popup
    setTimeout(() => {
      const mockUser: MockUser = {
        uid: `apple_${Date.now()}`,
        email: `user${Math.floor(Math.random() * 1000)}@privaterelay.appleid.com`,
        displayName: 'Apple User',
      };
      resolve(mockUser);
    }, 1500);
  });
};

// Email/Password Sign-In
export const signInWithEmail = async (email: string, password: string): Promise<FirebaseUser | null> => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Email sign-in error:', error);
    throw error;
  }
};

// Email/Password Sign-Up
export const signUpWithEmail = async (email: string, password: string): Promise<FirebaseUser | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('Email sign-up error:', error);
    throw error;
  }
};

// Sign Out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign-out error:', error);
    throw error;
  }
};

// Auth State Observer
export const observeAuthState = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get Current User
export const getCurrentFirebaseUser = (): FirebaseUser | null => {
  return auth.currentUser;
};
