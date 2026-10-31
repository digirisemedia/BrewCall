import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  User as FirebaseUser,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import { auth, db } from './config';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Google Sign-In
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

// Email/Password Sign-In
export const signInWithEmail = async (email: string, password: string): Promise<FirebaseUser> => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

// Email/Password Sign-Up
export const signUpWithEmail = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<FirebaseUser> => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName });
  await sendEmailVerification(result.user);
  return result.user;
};

// Phone Sign-In (requires Recaptcha)
export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  const recaptcha = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved');
    },
    'expired-callback': () => {
      console.log('reCAPTCHA expired');
    }
  });
  return recaptcha;
};

export const signInWithPhone = async (
  phoneNumber: string,
  recaptchaVerifier: RecaptchaVerifier
): Promise<string> => {
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
  return confirmationResult.verificationId;
};

export const verifyPhoneCode = async (
  verificationId: string,
  code: string
): Promise<FirebaseUser> => {
  const credential = await (auth as any).signInWithCredential(
    (auth as any).PhoneAuthProvider.credential(verificationId, code)
  );
  return credential.user;
};

// Sign Out
export const signOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
};

// Auth State Observer
export const observeAuthState = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Create or get user document in Firestore
export const createOrGetUserDoc = async (firebaseUser: FirebaseUser, shopName?: string) => {
  const userDocRef = doc(db, 'users', firebaseUser.uid);
  const userDoc = await getDoc(userDocRef);
  
  if (!userDoc.exists()) {
    // Create new user document
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
      photoURL: firebaseUser.photoURL || '',
      role: 'shop_admin',
      shop_id: null,
      created_at: Date.now(),
    };
    await setDoc(userDocRef, userData);
    return userData;
  }
  
  return userDoc.data();
};
