# 🍵 BrewCall - Smart Waiter Call System for Coffee Shops

A complete SaaS platform for coffee shops to manage digital menus, QR code table ordering, and real-time waiter calls. Built with React, TypeScript, and Tailwind CSS.

![BrewCall](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🌟 Features

### 🏪 Multi-Tenant SaaS Platform
- **Super Admin Dashboard** - Manage all coffee shops on the platform
- **Shop Owner Dashboard** - Complete control over your coffee shop
- **Customer View** - Mobile-optimized menu with QR code access

### 📱 Customer Experience
- Scan QR code to access digital menu
- Real-time waiter call system (Waiter/Water/Bill)
- Multi-language support (English, French, Arabic)
- Multi-currency support (47+ currencies with auto-detection)
- Beautiful, responsive design

### 🎛️ Shop Owner Features
- **Menu Management** - Add/edit categories and items with images
- **Table Management** - Generate QR codes for each table
- **Live Requests** - Real-time notifications with sound alerts
- **Wallet System** - Top-up balance and manage payments
- **Analytics** - Track performance and revenue
- **Social Media** - Link Google Business, Instagram, Facebook, TikTok

### 🌍 Global Ready
- **3 Languages**: English, French, Arabic (with RTL support)
- **47+ Currencies**: Auto-detected based on user location
- **Responsive Design**: Works on all devices
- **PWA Ready**: Install as mobile app

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/brewcall.git
cd brewcall

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production files will be in the `dist/` directory.

## 🔐 Demo Accounts

### Super Admin
- **Email**: `admin@brewcall.com`
- **Password**: `admin123`

### Shop Owner
- **Email**: `owner@aroma.coffee`
- **Password**: `owner123`

## 📁 Project Structure

```
brewcall/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CurrencySwitcher.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── Toast.tsx
│   ├── context/             # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── CurrencyContext.tsx
│   │   └── LanguageContext.tsx
│   ├── firebase/            # Firebase authentication
│   │   ├── auth.ts
│   │   └── config.ts
│   ├── hooks/               # Custom React hooks
│   │   └── useElapsedTime.ts
│   ├── i18n/                # Internationalization
│   │   └── translations.ts
│   ├── pages/               # Page components
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── CustomerView.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── PrivacyPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── ShopAdminDashboard.tsx
│   │   ├── SuperAdminDashboard.tsx
│   │   └── TermsPage.tsx
│   ├── store/               # Data management
│   │   └── index.ts
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   ├── utils/               # Utility functions
│   │   ├── audio.ts
│   │   ├── currency.ts
│   │   └── geolocation.ts
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
│   ├── 404.html
│   └── _redirects
├── index.html
├── netlify.toml            # Netlify deployment config
├── package.json
├── tsconfig.json
└── vite.config.js
```

## 🎨 Key Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Routing
- **Firebase** - Authentication (optional)
- **LocalStorage** - Data persistence
- **Lucide React** - Icons
- **QRCode.react** - QR code generation

## 🌐 Deployment

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Netlify will auto-detect settings from `netlify.toml`
4. Deploy!

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase (optional - for real OAuth)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Without Firebase, the app works in demo mode with simulated OAuth.

## 📚 Documentation

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Firebase authentication setup
- **[MULTI_CURRENCY_SYSTEM.md](./MULTI_CURRENCY_SYSTEM.md)** - Currency system documentation
- **[FULL_TRANSLATION_COMPLETE.md](./FULL_TRANSLATION_COMPLETE.md)** - Translation guide
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Testing instructions

## 🎯 Features Roadmap

- [ ] Real payment gateway integration
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Advanced analytics dashboard
- [ ] Multi-location support
- [ ] Employee management
- [ ] Inventory tracking
- [ ] Customer loyalty program
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ for coffee shops worldwide.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- QR Code generation by [qrcode.react](https://github.com/zpao/qrcode.react)
- Currency exchange rates (demo data)
- Translation support for EN/FR/AR

## 📞 Support

For support, email support@brewcall.com or join our Slack channel.

---

**Made with ☕ for coffee lovers everywhere**
