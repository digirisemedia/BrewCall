# BrewCall - Smart Waiter Call System

A modern SaaS platform for coffee shops to manage digital menus, QR code table ordering, and real-time waiter calls.

## Features

- **Multi-tenant SaaS** - Super admin and shop owner dashboards
- **Real-time requests** - Instant waiter/water/bill calls with sound alerts
- **QR code menus** - Customers scan to view menu and request service
- **Multi-language** - English, French, Arabic (with RTL support)
- **Multi-currency** - 47+ currencies with auto-detection
- **Firebase auth** - Google OAuth and email/password with verification
- **Responsive design** - Works on all devices

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- Vite
- Firebase (Authentication, Firestore, Analytics)
- React Router
- Lucide React icons

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Demo Accounts

**Super Admin:**
- Email: `admin@brewcall.com`
- Password: `admin123`

**Shop Owner:**
- Email: `owner@aroma.coffee`
- Password: `owner123`

## Deployment

The app is configured for Netlify deployment:

1. Push to GitHub
2. Connect repository to Netlify
3. Auto-deploys from `netlify.toml` config

Live: https://brewcall.netlify.app/

## Firebase Setup

Firebase credentials are configured in `src/firebase/config.ts`.

Required Firebase Console setup:
1. Enable Email/Password and Google authentication
2. Add `brewcall.netlify.app` to authorized domains
3. Enable Firestore database
4. Publish security rules

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React Context providers
├── firebase/       # Firebase configuration
├── pages/          # Page components
├── store/          # Data management (localStorage)
├── types/          # TypeScript definitions
├── utils/          # Utility functions
└── i18n/           # Translations
```

## License

MIT
