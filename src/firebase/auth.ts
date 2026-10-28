import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  User as FirebaseUser,
  updateProfile
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

// Apple Sign-In (requires Firebase configuration)
export const signInWithApple = async (): Promise<FirebaseUser | null> => {
  // Note: Apple Sign-In requires additional Firebase configuration
  // See FIREBASE_SETUP.md for details
  const provider = new GoogleAuthProvider(); // Placeholder - replace with Apple provider
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
    
    // Check if email is verified
    if (!result.user.emailVerified) {
      throw new Error('Please verify your email before signing in');
    }
    
    return result.user;
  } catch (error) {
    console.error('Email sign-in error:', error);
    throw error;
  }
};

// Email/Password Sign-Up
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<FirebaseUser | null> => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name
    await updateProfile(result.user, { displayName });
    
    // Send verification email
    await sendEmailVerification(result.user);
    
    return result.user;
  } catch (error) {
    console.error('Email sign-up error:', error);
    throw error;
  }
};

// Send Verification Email
export const resendVerificationEmail = async (user: FirebaseUser): Promise<void> => {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    console.error('Resend verification error:', error);
    throw error;
  }
};

// Send Password Reset Email
export const sendPasswordReset = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Password reset error:', error);
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
