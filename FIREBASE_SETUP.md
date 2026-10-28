# 🔥 Firebase Authentication Setup Guide

## Overview

BrewCall uses **Firebase Authentication** for real OAuth integration with Google and Apple sign-in. This guide will walk you through setting up Firebase for your production deployment.

---

## 📋 Prerequisites

- Google Account
- Node.js installed (v18+)
- npm or yarn package manager

---

## 🚀 Step-by-Step Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `brewcall` (or your preferred name)
4. Accept terms and click **"Continue"**
5. Disable Google Analytics (optional) and click **"Create project"**
6. Wait for project to be created, then click **"Continue"**

### Step 2: Enable Authentication Methods

1. In Firebase Console, click **"Authentication"** in the left sidebar
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable the following providers:

#### Enable Google Sign-In
1. Click **"Google"** in the providers list
2. Toggle **"Enable"** to ON
3. Enter your support email
4. Click **"Save"**

#### Enable Apple Sign-In
1. Click **"Apple"** in the providers list
2. Toggle **"Enable"** to ON
3. You'll need to configure Apple Developer account (see Step 4)
4. Click **"Save"**

#### Enable Email/Password (Optional)
1. Click **"Email/Password"** in the providers list
2. Toggle **"Enable"** to ON
3. Click **"Save"**

### Step 3: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>` to add a web app
5. Enter app nickname: `BrewCall Web`
6. Check **"Also set up Firebase Hosting"** (optional)
7. Click **"Register app"**
8. You'll see your Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

9. **Copy these values** - you'll need them next!

### Step 4: Configure Apple Sign-In (Required for Apple OAuth)

Apple Sign-In requires additional setup:

1. Go to [Apple Developer Portal](https://developer.apple.com/account)
2. Sign in with your Apple ID
3. Go to **"Certificates, Identifiers & Profiles"**
4. Click **"Identifiers"**
5. Click the **"+"** button to create a new App ID
6. Select **"App IDs"** and click **"Continue"**
7. Select **"App"** and click **"Continue"**
8. Enter description: `BrewCall`
9. Enter Bundle ID: `com.yourdomain.brewcall` (reverse domain format)
10. Under **"Capabilities"**, check **"Sign in with Apple"**
11. Click **"Continue"** then **"Register"**

#### Create a Service ID
1. Go back to **"Identifiers"**
2. Click **"+"** button
3. Select **"Service IDs"** and click **"Continue"**
4. Enter description: `BrewCall Web Service`
5. Enter Identifier: `com.yourdomain.brewcall.web`
6. Check **"Sign in with Apple"**
7. Click **"Configure"**
8. Select your primary App ID
9. Enter your domain: `yourdomain.com` (must be HTTPS)
10. Enter Return URL: `https://yourdomain.com/__/auth/handler`
11. Click **"Save"** then **"Continue"** then **"Register"**

#### Get Apple Keys
1. Go to **"Keys"** section
2. Click **"+"** to create a new key
3. Enter name: `BrewCall Apple Auth`
4. Check **"Sign in with Apple"**
5. Click **"Configure"**
6. Select your primary App ID
7. Click **"Save"** then **"Continue"** then **"Register"**
8. **Download the key** (you can only download once!)
9. Note the **Key ID** (10-character string)

#### Add Apple Config to Firebase
1. Go back to Firebase Console → Authentication → Sign-in method
2. Click **"Apple"** provider
3. Fill in:
   - **Team ID**: Your 10-character Apple Developer Team ID
   - **Key ID**: The Key ID from step above
   - **Private Key**: Upload the `.p8` file you downloaded
4. Click **"Save"**

### Step 5: Add Environment Variables

1. In your project root, create a `.env` file (or copy `.env.example`)
2. Add your Firebase configuration:

```bash
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

3. **Important**: Never commit `.env` to git! Add it to `.gitignore`

### Step 6: Configure Authorized Domains

1. In Firebase Console → Authentication → Settings
2. Go to **"Authorized domains"** section
3. Add your production domain(s):
   - `localhost` (for development)
   - `yourdomain.com` (production)
   - `www.yourdomain.com` (if using www)

### Step 7: Test the Integration

1. Run your app locally: `npm run dev`
2. Go to the registration page
3. Click **"Continue with Google"**
4. You should see Google's OAuth popup
5. Sign in with your Google account
6. You should be redirected back and logged in!

---

## 🔒 Security Best Practices

### 1. Restrict API Key
- In Firebase Console → Project Settings → API Keys
- Click **"Restrict key"**
- Select **"HTTP referrers"**
- Add your domain(s):
  - `https://yourdomain.com/*`
  - `http://localhost:*` (for development)

### 2. Enable App Check (Recommended)
- Protects against abuse and unauthorized access
- Go to Firebase Console → App Check
- Follow setup instructions for web

### 3. Set Up Security Rules
- If using Firestore/Database, configure security rules
- Only allow authenticated users to read/write their own data

---

## 📱 Testing OAuth Providers

### Test Google Sign-In
```bash
npm run dev
```
1. Open `http://localhost:5173`
2. Click **"Get Started Free"**
3. Click **"Continue with Google"**
4. Sign in with Google account
5. Verify you're redirected to dashboard

### Test Apple Sign-In
**Note**: Apple Sign-In requires:
- HTTPS domain (not localhost)
- Proper Apple Developer configuration
- Real Apple ID for testing

1. Deploy to production with HTTPS
2. Click **"Continue with Apple"**
3. Sign in with Apple ID
4. Verify authentication

### Test Email/Password
1. Click **"Continue with email"** (if enabled)
2. Enter email and password
3. Verify account creation

---

## 🐛 Troubleshooting

### Issue: "Firebase not configured" warning
**Solution**: Check that `.env` file exists and contains all required variables

### Issue: Google sign-in popup blocked
**Solution**: 
- Check browser popup blocker settings
- Ensure domain is in Firebase Authorized Domains
- Clear browser cache and cookies

### Issue: Apple sign-in not working
**Solution**:
- Verify Apple Developer account is active
- Check that Service ID and Key ID are correct
- Ensure Return URL matches exactly
- Must use HTTPS (not HTTP)

### Issue: "auth/operation-not-allowed"
**Solution**: 
- Go to Firebase Console → Authentication → Sign-in method
- Enable the provider you're trying to use

### Issue: CORS errors
**Solution**:
- Add your domain to Firebase Authorized Domains
- Ensure API key restrictions include your domain

---

## 🌐 Deployment

### Vercel Deployment
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add all `VITE_FIREBASE_*` variables
4. Deploy: `vercel --prod`

### Netlify Deployment
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy --build`
3. Add environment variables in Netlify dashboard:
   - Go to Site settings → Environment variables
   - Add all `VITE_FIREBASE_*` variables
4. Deploy: `netlify deploy --prod`

### Firebase Hosting (Recommended)
1. Install Firebase CLI: `npm i -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Select your project
5. Set public directory: `dist`
6. Configure as SPA: `Yes`
7. Deploy: `firebase deploy`

---

## 📊 Monitoring & Analytics

### Firebase Console
- **Authentication**: View user accounts, sign-in methods
- **Analytics**: Track user behavior (if enabled)
- **Crashlytics**: Monitor app crashes (if enabled)

### User Management
- View all registered users
- Disable/delete accounts
- Reset passwords
- View sign-in activity

---

## 🔑 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | ✅ Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Auth domain (project.firebaseapp.com) | ✅ Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket URL | ✅ Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Messaging sender ID | ✅ Yes |
| `VITE_FIREBASE_APP_ID` | Web app ID | ✅ Yes |

---

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Auth Guide](https://firebase.google.com/docs/auth)
- [Google Sign-In Setup](https://firebase.google.com/docs/auth/web/google-signin)
- [Apple Sign-In Setup](https://firebase.google.com/docs/auth/web/apple)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)

---

## ✅ Checklist

Before going live, verify:

- [ ] Firebase project created
- [ ] Authentication providers enabled (Google, Apple, Email)
- [ ] Firebase configuration added to `.env`
- [ ] Authorized domains configured
- [ ] API key restricted to your domain(s)
- [ ] Apple Developer account configured (if using Apple sign-in)
- [ ] Tested all sign-in methods locally
- [ ] Deployed to production with HTTPS
- [ ] Environment variables set in production
- [ ] Security rules configured (if using Firestore)
- [ ] Monitoring enabled (Analytics, Crashlytics)

---

## 🎯 Next Steps

After Firebase is set up:

1. **Test OAuth flows** - Sign in with Google and Apple
2. **Configure custom domain** - Use your own domain instead of Firebase default
3. **Set up email templates** - Customize verification emails
4. **Enable multi-factor auth** - Add extra security layer
5. **Monitor usage** - Track sign-ins and user activity
6. **Scale up** - Upgrade Firebase plan as needed

---

## 💡 Tips

- **Development**: Use `localhost` for testing
- **Production**: Always use HTTPS
- **Security**: Never expose Firebase Admin SDK on client
- **Testing**: Create test accounts for each OAuth provider
- **Backup**: Regularly export user data
- **Documentation**: Keep this guide updated

---

## 🆘 Support

If you encounter issues:

1. Check Firebase Console for error messages
2. Review browser console for JavaScript errors
3. Verify all environment variables are set correctly
4. Check Firebase status: https://status.firebase.google.com/
5. Consult Firebase documentation
6. Ask on Stack Overflow with `firebase` tag

---

**Your BrewCall app is now ready for real OAuth authentication!** 🎉
