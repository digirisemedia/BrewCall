import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Coffee, Eye, EyeOff, ArrowLeft, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError(t('login.invalid'));
    }
    setIsLoading(false);
  };

  const quickLogin = (em: string, pw: string) => {
    setEmail(em);
    setPassword(pw);
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      const success = login(em, pw);
      if (success) navigate('/dashboard');
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="fixed inset-0 gradient-mesh opacity-40"></div>
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl"></div>
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('login.backHome')}
          </Link>
          <LanguageSwitcher />
        </div>

        <div className="glass rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30 animate-bounce-gentle">
              <Coffee className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{t('login.welcome')}</h1>
            <p className="text-gray-400 text-sm mt-1">{t('login.subtitle')}</p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-6 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('login.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-dark"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">{t('login.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-dark pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                t('login.signIn')
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-gray-500 text-center mb-4 font-medium uppercase tracking-wider">{t('login.quickDemo')}</p>
            <button
              onClick={() => quickLogin('owner@aroma.coffee', 'owner123')}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-start group"
            >
              <p className="text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">{t('landing.shopOwner')}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">Aroma Coffee House</p>
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-400">
            {t('register.haveAccount')}{' '}
            <Link to="/register" className="text-violet-400 hover:text-violet-300 font-medium">
              {t('register.createAccount')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
