import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDVqV7bV7iMa8-MH1Ya78unvYbowM1AOys",
  authDomain: "brewcall-cae74.firebaseapp.com",
  projectId: "brewcall-cae74",
  storageBucket: "brewcall-cae74.firebasestorage.app",
  messagingSenderId: "982822723898",
  appId: "1:982822723898:web:1401abb67aa6dbc8bd3003",
  measurementId: "G-96KKX397KG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
