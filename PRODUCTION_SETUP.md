# 🚀 Production Setup Guide - Complete Firebase Integration

## ⚠️ Important: Current Status

Your app is currently using **localStorage** for data storage and **simulated OAuth** for authentication. This works for testing but is **NOT production-ready**.

To make it production-ready, you need to:
1. ✅ Set up Firebase Authentication (real Google/Apple OAuth)
2. ✅ Set up Firestore Database (real data persistence)
3. ✅ Add email verification
4. ✅ Configure environment variables

---

## 📋 Step-by-Step Setup

### Step 1: Create Firebase Project

1. Go to **https://console.firebase.google.com/**
2. Click **"Add project"**
3. Enter project name: `brewcall`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable these providers:
   - ✅ **Email/Password** (with email verification)
   - ✅ **Google** (OAuth)
   - ⚠️ **Apple** (requires Apple Developer account - see below)

### Step 3: Enable Firestore Database

1. Go to **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select location closest to your users
5. Click **"Enable"**

### Step 4: Get Firebase Configuration

1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **Web icon** (`</>`)
4. Register app name: `brewcall-web`
5. Copy the configuration:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "brewcall.firebaseapp.com",
  projectId: "brewcall",
  storageBucket: "brewcall.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 5: Create Environment File

1. In your project root, create `.env` file:

```bash
# Copy from .env.example
cp .env.example .env
```

2. Edit `.env` and paste your Firebase values:

```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=brewcall.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=brewcall
VITE_FIREBASE_STORAGE_BUCKET=brewcall.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. **IMPORTANT:** Add `.env` to `.gitignore` (already done)

### Step 6: Configure Authorized Domains

1. Go to **Authentication** → **Settings**
2. Scroll to **"Authorized domains"**
3. Add your domains:
   - `localhost` (for development)
   - `brewcall.netlify.app` (your Netlify site)
   - Your custom domain (if you have one)

### Step 7: Update Firebase Config File

The file `src/firebase/config.ts` is already set up to read from environment variables. Just make sure your `.env` file is correct.

### Step 8: Test Locally

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

Test:
1. Register with email → Should receive verification email
2. Login with Google → Should work with real OAuth
3. Create a shop → Should save to Firestore
4. Refresh page → Data should persist

### Step 9: Deploy to Netlify

1. Add environment variables to Netlify:
   - Go to **Site settings** → **Environment variables**
   - Add all `VITE_FIREBASE_*` variables

2. Push to GitHub:
   ```bash
   git add .
   git commit -m "Setup Firebase for production"
   git push origin main
   ```

3. Netlify will automatically redeploy with Firebase configured

---

## 🍎 Apple Sign-In Setup (Optional)

Apple Sign-In requires additional setup:

### 1. Apple Developer Account
- You need an Apple Developer account ($99/year)
- Go to https://developer.apple.com/

### 2. Create App ID
1. Go to **Certificates, Identifiers & Profiles**
2. Click **Identifiers** → **+** button
3. Select **App IDs** → Continue
4. Description: `BrewCall`
5. Bundle ID: `com.yourdomain.brewcall`
6. Enable **Sign in with Apple**
7. Click **Register**

### 3. Create Service ID
1. Go to **Identifiers** → **+** button
2. Select **Service IDs** → Continue
3. Description: `BrewCall Web`
4. Identifier: `com.yourdomain.brewcall.web`
5. Enable **Sign in with Apple**
6. Click **Configure**
7. Primary App ID: Select your app
8. Domains: `brewcall.netlify.app`
9. Return URLs: `https://brewcall.netlify.app/__/auth/handler`
10. Click **Save** → **Continue** → **Register**

### 4. Create Key
1. Go to **Keys** → **+** button
2. Key name: `BrewCall Auth`
3. Enable **Sign in with Apple**
4. Click **Configure** → Select your App ID
5. Click **Save** → **Continue** → **Register**
6. **Download the key** (you can only download once!)
7. Note the **Key ID**

### 5. Add to Firebase
1. Go to Firebase Console → **Authentication** → **Sign-in method**
2. Click **Apple** provider
3. Fill in:
   - **Team ID**: Your 10-character Apple Developer Team ID
   - **Key ID**: The Key ID from step 4
   - **Private Key**: Upload the `.p8` file
4. Click **Save**

---

## 🔒 Security Rules for Firestore

Add these rules in **Firestore Database** → **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Shops are readable by authenticated users
    match /shops/{shopId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        resource.data.owner_id == request.auth.uid;
    }
    
    // Menu items are readable by everyone
    match /shops/{shopId}/menu/{itemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Tables are readable by authenticated users
    match /shops/{shopId}/tables/{tableId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Service requests
    match /shops/{shopId}/requests/{requestId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
  }
}
```

---

## 📊 Firestore Data Structure

Your data will be organized like this:

```
firestore/
├── users/
│   └── {userId}/
│       ├── email: "user@example.com"
│       ├── displayName: "John Doe"
│       ├── role: "shop_admin"
│       └── shopId: "shop_123"
│
├── shops/
│   └── {shopId}/
│       ├── name: "Aroma Coffee"
│       ├── owner_id: "user_123"
│       ├── wallet_balance: 500
│       ├── menu/
│       │   └── {itemId}/
│       │       ├── name: "Espresso"
│       │       ├── price: 15
│       │       └── category: "Hot Drinks"
│       └── tables/
│           └── {tableId}/
│               ├── number: 1
│               ├── label: "Window Seat"
│               └── qr_code: "..."
│
└── service_requests/
    └── {requestId}/
        ├── shop_id: "shop_123"
        ├── table_id: "table_1"
        ├── type: "waiter"
        └── status: "pending"
```

---

## ✅ Production Checklist

Before launching, verify:

- [ ] Firebase project created
- [ ] Authentication providers enabled (Email, Google, Apple)
- [ ] Firestore database created
- [ ] Environment variables set in `.env`
- [ ] Environment variables added to Netlify
- [ ] Authorized domains configured
- [ ] Firestore security rules added
- [ ] Email verification working
- [ ] Google OAuth working
- [ ] Apple OAuth working (if configured)
- [ ] Data persists after refresh
- [ ] Multi-language working
- [ ] Multi-currency working
- [ ] All pages accessible
- [ ] No console errors
- [ ] Mobile responsive
- [ ] QR codes generate correctly

---

## 🧪 Testing Production Features

### Test Email Registration
1. Go to `/register`
2. Enter email, password, name
3. Check email for verification link
4. Click verification link
5. Login with credentials
6. Should work!

### Test Google OAuth
1. Go to `/login`
2. Click "Continue with Google"
3. Select Google account
4. Should login automatically
5. Account created in Firebase

### Test Data Persistence
1. Login as shop owner
2. Create a menu item
3. Refresh page
4. Menu item should still be there
5. Data is in Firestore, not localStorage

### Test Multi-User
1. Register second shop owner
2. Login with different account
3. Should see different data
4. Data is isolated per user

---

## 🐛 Troubleshooting

### Issue: "Firebase not configured" warning
**Solution:** Check `.env` file exists and has all variables

### Issue: Google sign-in popup blocked
**Solution:** 
- Check browser popup blocker
- Verify domain in Authorized Domains
- Clear browser cache

### Issue: Data not persisting
**Solution:**
- Check Firestore is enabled
- Verify security rules allow writes
- Check browser console for errors

### Issue: Email verification not sent
**Solution:**
- Check Firebase Email templates
- Verify SMTP settings
- Check spam folder

---

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Netlify Environment Variables](https://docs.netlify.com/configure-builds/environment-variables/)

---

## 🎯 Next Steps

1. **Complete Firebase setup** (follow steps above)
2. **Test locally** with `npm run dev`
3. **Push to GitHub** with `.env` variables in Netlify
4. **Test on Netlify** at https://brewcall.netlify.app/
5. **Launch!** 🚀

---

**Your app will be fully production-ready after completing this setup!** ✅
