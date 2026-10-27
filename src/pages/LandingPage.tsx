import { Link } from 'react-router-dom';
import { Coffee, Zap, Shield, Smartphone, BarChart3, QrCode, ArrowRight, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh opacity-60"></div>
      <div className="fixed inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3 animate-fade-in-left">
          <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Coffee className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            BrewCall
          </span>
        </div>
        <div className="flex items-center gap-4 animate-fade-in-right">
          <Link
            to="/login"
            className="px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-0.5"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8 animate-fade-in-down">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Trusted by 500+ coffee shops worldwide</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Smart Waiter Call
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
              for Coffee Shops
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            Transform your coffee shop with QR-powered digital menus and instant service requests. 
            No app downloads. No hardware needed. Just scan and serve.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/login"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all"
            >
              <span>📱</span> View Demo
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-12 p-4 glass rounded-2xl max-w-lg mx-auto animate-fade-in-up stagger-4">
            <p className="text-xs text-gray-400 mb-2 font-medium">Demo Accounts</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-amber-400 font-semibold">Super Admin:</span>
                <span className="text-gray-300 ml-1">admin@brewcall.com / admin123</span>
              </div>
              <div className="bg-white/5 rounded-lg p-2">
                <span className="text-emerald-400 font-semibold">Shop Owner:</span>
                <span className="text-gray-300 ml-1">owner@aroma.coffee / owner123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="mt-20 relative animate-fade-in-up stagger-5">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent z-10 pointer-events-none"></div>
          <div className="flex items-center justify-center gap-6">
            {/* Phone Mockup */}
            <div className="w-64 h-[500px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10"></div>
              <div className="h-full bg-gradient-to-b from-amber-50 to-orange-50 p-4 pt-10">
                <div className="text-center mb-4">
                  <div className="text-3xl mb-1">☕</div>
                  <p className="text-xs font-bold text-gray-800">Aroma Coffee</p>
                  <p className="text-[10px] text-gray-500">Table 3</p>
                </div>
                <div className="space-y-2">
                  {['☕ Espresso $3.50', '🥛 Latte $4.75', '🧊 Cold Brew $5.00'].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 text-xs shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                  <div className="bg-blue-500 rounded-lg p-2 text-center">
                    <span className="text-lg">🛎️</span>
                    <p className="text-[8px] text-white font-bold">Waiter</p>
                  </div>
                  <div className="bg-cyan-500 rounded-lg p-2 text-center">
                    <span className="text-lg">💧</span>
                    <p className="text-[8px] text-white font-bold">Water</p>
                  </div>
                  <div className="bg-purple-500 rounded-lg p-2 text-center">
                    <span className="text-lg">💳</span>
                    <p className="text-[8px] text-white font-bold">Bill</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="hidden md:block w-[500px] h-[350px] bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
              <div className="h-8 bg-gray-800 flex items-center px-3 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-gray-400 ml-3">Staff Dashboard</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  {['3', '1', '1', '1'].map((n, i) => (
                    <div key={i} className="flex-1 bg-gray-800 rounded-lg p-2 text-center">
                      <p className="text-lg font-bold text-white">{n}</p>
                      <p className="text-[8px] text-gray-400">{['Pending', 'Waiter', 'Water', 'Bill'][i]}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-xs text-blue-300 font-bold">Table {n}</p>
                      <p className="text-[10px] text-gray-400 mt-1">🛎️ Waiter</p>
                      <p className="text-[10px] text-gray-500">{n}m ago</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
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
            { icon: Shield, title: 'Multi-Location', desc: 'Manage multiple coffee shop locations from a single admin dashboard.', color: 'from-pink-500 to-rose-600' },
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

      {/* Pricing Section */}
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
                to="/login"
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

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-600 rounded-lg flex items-center justify-center">
              <Coffee className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-400">BrewCall</span>
          </div>
          <p className="text-gray-500 text-sm">© 2024 BrewCall. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
