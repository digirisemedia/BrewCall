import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Coffee, ArrowRight, Zap, Shield, Smartphone, BarChart3, QrCode, Star, MapPin } from 'lucide-react';

export default function LandingPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      <div className="fixed inset-0 gradient-mesh opacity-60"></div>
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 animate-fade-in-left">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            BrewCall
          </span>
        </div>
        <div className="flex items-center gap-3 animate-fade-in-right">
          <LanguageSwitcher />
          <Link
            to="/login"
            className="hidden sm:block px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-0.5"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-20 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%231a1a2e' width='1920' height='1080'/%3E%3C/svg%3E"
          >
            <source src="https://cdn.pixabay.com/video/2023/09/21/181546-866999878_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-violet-500/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="text-center max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8 animate-fade-in-down backdrop-blur-sm">
            <Star className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Trusted by 500+ coffee shops worldwide</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Smart Waiter Call
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              for Coffee Shops
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2 leading-relaxed">
            Transform your coffee shop with QR-powered digital menus and instant service requests. No app downloads. No hardware needed. Just scan and serve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/register"
              className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">Start Free Trial</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
            <Link
              to="/login"
              className="group flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-1 backdrop-blur-sm"
            >
              <span className="group-hover:scale-110 transition-transform">📱</span> View Demo
            </Link>
          </div>

          <div className="mt-12 p-4 glass rounded-2xl max-w-md mx-auto animate-fade-in-up stagger-4 backdrop-blur-sm hover:scale-105 transition-transform">
            <p className="text-xs text-gray-400 mb-2 font-medium text-center">Demo Accounts</p>
            <div className="bg-white/5 rounded-lg p-3 text-xs">
              <span className="text-emerald-400 font-semibold">Shop Owner:</span>
              <span className="text-gray-300 ml-1">owner@aroma.coffee / owner123</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              Serve Better
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From digital menus to instant service alerts, BrewCall gives your coffee shop superpowers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: QrCode, title: 'QR Code Menus', desc: 'Generate unique QR codes for each table. Customers scan to view your menu instantly.', color: 'from-violet-500 to-purple-600' },
            { icon: Zap, title: 'Instant Alerts', desc: 'Real-time notifications when customers need service. Audio + visual alerts for staff.', color: 'from-amber-500 to-orange-600' },
            { icon: Smartphone, title: 'No App Required', desc: 'Works on any phone browser. No downloads, no installs. Just scan and go.', color: 'from-emerald-500 to-teal-600' },
            { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track request patterns, peak hours, and service performance metrics.', color: 'from-blue-500 to-indigo-600' },
            { icon: MapPin, title: 'Multi-Location', desc: 'Manage multiple coffee shop locations from a single admin dashboard.', color: 'from-pink-500 to-rose-600' },
            { icon: Coffee, title: 'Built for Coffee', desc: 'Designed specifically for coffee shops, cafes, and quick-service restaurants.', color: 'from-amber-600 to-yellow-600' },
          ].map((feature, i) => (
            <div
              key={i}
              className={`group p-6 glass rounded-2xl card-hover animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-400">Start free. Upgrade when you're ready.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: 'Free', price: '$0', period: '/mo', features: ['1 Location', '5 Tables', 'Basic Menu', 'Email Support'], cta: 'Start Free', popular: false },
            { name: 'Starter', price: '$29', period: '/mo', features: ['1 Location', '20 Tables', 'Full Menu', 'QR Codes', 'Analytics', 'Priority Support'], cta: 'Start Trial', popular: true },
            { name: 'Pro', price: '$79', period: '/mo', features: ['Unlimited Locations', 'Unlimited Tables', 'Custom Branding', 'API Access', 'White Label', '24/7 Support'], cta: 'Contact Sales', popular: false },
          ].map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-2xl card-hover ${
                plan.popular
                  ? 'bg-gradient-to-b from-violet-600/20 to-indigo-600/10 border-2 border-violet-500/30'
                  : 'glass'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-emerald-400">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                  BrewCall
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Smart waiter call system for modern coffee shops. Transform your service with QR-powered digital menus.
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>Agdal, Rabat, Morocco</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">Live Demo</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Use</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">© 2024 BrewCall. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="mailto:contact@brewcallapp.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                contact@brewcallapp.com
              </a>
              <span className="text-gray-600">•</span>
              <span className="text-gray-500 text-sm">Made with ❤️ in Morocco</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
