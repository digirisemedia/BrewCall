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
import { auth } from './config';

// ==========================================
// Firebase Authentication Service
// ==========================================

// Google Sign-In
export const signInWithGoogle = async (): Promise<FirebaseUser | null> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google sign-in error:', error);
    throw error;
  }
};

// Apple Sign-In
export const signInWithApple = async (): Promise<FirebaseUser | null> => {
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
