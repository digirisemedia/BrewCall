import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Coffee, ArrowRight } from 'lucide-react';

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
        <div className="text-center max-w-4xl mx-auto">
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
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/register"
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
        </div>
      </section>
    </div>
  );
}
