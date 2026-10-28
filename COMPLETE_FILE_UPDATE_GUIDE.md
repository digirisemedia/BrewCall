# 📋 COMPLETE FILE UPDATE GUIDE

## 🎯 Your Mission:
Update these files on GitHub by copying the code below into each file.

## 📝 How to Update Files on GitHub:

1. Go to: https://github.com/YOUR_USERNAME/brewcall
2. Navigate to the file (e.g., click `src` → `firebase` → `config.ts`)
3. Click the **pencil icon** (Edit this file) in the top right
4. **Select all** the content (Ctrl+A or Cmd+A)
5. **Delete** it
6. **Paste** the new code from this guide
7. Click **"Commit changes"** (green button at bottom)
8. Repeat for each file

---

# 🔥 FILE 1: `.env` (CREATE NEW FILE)

**Location:** Root directory (same level as package.json)

**Action:** Click "Add file" → "Create new file" → Name it `.env`

**Content:**
```
VITE_FIREBASE_API_KEY=AIzaSyDVqV7bV7iMa8-MH1Ya78unvYbowM1AOys
VITE_FIREBASE_AUTH_DOMAIN=brewcall-cae74.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=brewcall-cae74
VITE_FIREBASE_STORAGE_BUCKET=brewcall-cae74.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=982822723898
VITE_FIREBASE_APP_ID=1:982822723898:web:1401abb67aa6dbc8bd3003
VITE_FIREBASE_MEASUREMENT_ID=G-96KKX397KG
```

---

# 🔥 FILE 2: `src/firebase/config.ts` (UPDATE)

**Location:** `src/firebase/config.ts`

**Action:** Edit existing file, replace ALL content with:

```typescript
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
```

---

# 🔥 FILE 3: `src/firebase/auth.ts` (UPDATE)

**Location:** `src/firebase/auth.ts`

**Action:** Edit existing file, replace ALL content with:

```typescript
import { useState, useEffect } from 'react';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendEmailVerification,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from './config';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    if (!result.user.emailVerified) {
      await firebaseSignOut(auth);
      throw new Error('Please verify your email before signing in. Check your inbox.');
    }
    return result.user;
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName });
    await sendEmailVerification(result.user);
    return result.user;
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };
}
```

---

# 🔥 FILE 4: `src/App.tsx` (UPDATE)

**Location:** `src/App.tsx`

**Action:** Edit existing file, replace ALL content with:

```typescript
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
```

---

# 🔥 FILE 5: `src/i18n/translations.ts` (UPDATE)

**Location:** `src/i18n/translations.ts`

**Action:** Edit existing file, replace the `en` section with:

```typescript
export const translations = {
  en: {
    'login.welcome': 'Welcome back',
    'login.subtitle': 'Sign in to your BrewCall account',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.signIn': 'Sign In',
    'login.backHome': 'Back to home',
    'login.invalid': 'Invalid email or password',
    'login.quickDemo': 'Quick Demo Access',
    'register.continueGoogle': 'Continue with Google',
    'register.continueApple': 'Continue with Apple',
    'register.or': 'or',
    'register.haveAccount': "Don't have an account?",
    'register.createAccount': 'Create Account',
    'register.backHome': 'Back to home',
    'landing.shopOwner': 'Shop Owner',
    'currency.symbol': 'MAD',
    'footer.about': 'About Us',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms & Conditions',
    'footer.tagline': 'Smart waiter call system for coffee shops',
    'customer.waiterToast': 'Waiter has been notified',
    'customer.waterToast': 'Water request sent',
    'customer.billToast': 'Bill request sent',
    'customer.cancelToast': 'Request cancelled',
    'customer.loading': 'Loading menu...',
    'customer.notFound': 'Table not found',
    'customer.notFoundDesc': 'Please scan the QR code from your table',
    'customer.seats': 'seats',
    'customer.popular': 'Popular',
    'customer.waiterCalled': 'Waiter Called',
    'customer.waterRequested': 'Water Requested',
    'customer.billRequested': 'Bill Requested',
    'customer.staffNotified': 'Staff has been notified',
    'customer.cancelRequest': 'Cancel Request',
    'customer.waiter': 'Waiter',
    'customer.water': 'Water',
    'customer.bill': 'Bill',
    'shop.overview': 'Overview',
    'shop.requests': 'Requests',
    'shop.menu': 'Menu',
    'shop.tables': 'Tables',
    'shop.profile': 'Profile',
    'common.loading': 'Loading...',
    'admin.shopAdmin': 'Shop Admin',
    'common.signOut': 'Sign Out',
    'shop.shopProfile': 'Shop Profile',
    'shop.manageInfo': 'Manage your shop information',
    'common.edit': 'Edit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'admin.shopName': 'Shop Name',
    'admin.tagline': 'Tagline',
    'admin.address': 'Address',
    'admin.phone': 'Phone',
    'admin.shopEmail': 'Email',
    'admin.description': 'Description',
    'shop.socialMedia': 'Social Media',
    'shop.walletPayment': 'Wallet & Payment',
    'shop.currentBalance': 'Current Balance',
    'shop.topUp': 'Top Up',
    'shop.paymentMethods': 'Payment Methods',
    'shop.addMethod': 'Add Method',
    'shop.recentTransactions': 'Recent Transactions',
    'shop.subscription': 'Subscription',
    'shop.amount': 'Amount',
    'shop.cashPlus': 'Cash Plus',
    'shop.bankTransfer': 'Bank Transfer',
    'shop.creditCard': 'Credit Card',
    'shop.paypal': 'PayPal',
    'shop.label': 'Label',
    'shop.details': 'Details',
    'shop.accountNumber': 'Account Number',
    'shop.itemName': 'Item Name',
    'shop.price': 'Price',
    'shop.itemDesc': 'Description',
    'shop.itemImage': 'Image',
    'shop.popularItem': 'Popular Item',
    'common.add': 'Add',
    'shop.tableNumber': 'Table Number',
    'shop.tableLabel': 'Label',
    'shop.seats': 'Seats',
    'shop.location': 'Location',
    'shop.indoor': 'Indoor',
    'shop.outdoor': 'Outdoor',
    'shop.bar': 'Bar',
    'shop.patio': 'Patio',
    'shop.qrTitle': 'QR Code',
    'shop.qrDesc': 'Scan to view menu',
    'common.close': 'Close',
    'admin.coffeeShops': 'Coffee Shops',
    'admin.users': 'Users',
    'admin.analytics': 'Analytics',
    'admin.manageShops': 'Manage all coffee shops',
    'admin.addShop': 'Add Shop',
    'admin.totalShops': 'Total Shops',
    'admin.activeShops': 'Active Shops',
    'admin.totalRevenue': 'Total Revenue',
    'admin.revenueOverview': 'Revenue Overview',
    'admin.thisMonth': 'This Month',
    'admin.lastMonth': 'Last Month',
    'admin.growth': 'Growth',
    'admin.topPerforming': 'Top Performing',
    'admin.recentActivity': 'Recent Activity',
    'admin.searchShops': 'Search shops...',
  },
  // Keep the rest of your translations (fr, ar) as they are
};
```

---

# 🔥 FILE 6: `src/components/LanguageSwitcher.tsx` (UPDATE)

**Location:** `src/components/LanguageSwitcher.tsx`

**Action:** Edit existing file, replace ALL content with:

```typescript
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../i18n/translations';

interface LanguageSwitcherProps {
  variant?: 'dark' | 'light';
}

export function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language);

  const buttonClass = variant === 'light' 
    ? "flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-all text-gray-700"
    : "flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClass}
      >
        <span className="text-lg">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 z-50 bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                  language === lang.code
                    ? 'bg-violet-600/20 text-violet-300'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```

---

# ✅ CHECKLIST

After updating all files:

- [ ] Created `.env` file with Firebase credentials
- [ ] Updated `src/firebase/config.ts`
- [ ] Updated `src/firebase/auth.ts`
- [ ] Updated `src/App.tsx`
- [ ] Updated `src/i18n/translations.ts`
- [ ] Updated `src/components/LanguageSwitcher.tsx`
- [ ] Committed all changes to GitHub
- [ ] Waited 1-2 minutes for Netlify to deploy

---

# 🧪 TEST YOUR APP

After deployment:

1. Go to https://brewcall.netlify.app/
2. Click "Register"
3. Enter your email and password
4. Check your email for verification link
5. Click the verification link
6. Login with your credentials
7. ✅ It should work!

---

# 🆘 NEED HELP?

If you get stuck:
1. Tell me which file you're on
2. Tell me what error you see
3. I'll guide you through it step by step

**You've got this! 🚀**
