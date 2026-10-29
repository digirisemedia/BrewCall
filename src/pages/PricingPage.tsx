import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Coffee, ArrowLeft, Check } from 'lucide-react';

export default function PricingPage() {
  const { t } = useLanguage();

  const plans = [
    {
      name: t('landing.pricing.free'),
      price: '$0',
      period: `/${t('landing.price.month')}`,
      features: [
        `1 ${t('landing.price.location')}`,
        `5 ${t('landing.price.tables')}`,
        t('landing.price.basicMenu'),
        t('landing.price.emailSupport'),
      ],
      cta: t('landing.cta'),
      popular: false,
    },
    {
      name: t('landing.pricing.starter'),
      price: '$29',
      period: `/${t('landing.price.month')}`,
      features: [
        `1 ${t('landing.price.location')}`,
        `20 ${t('landing.price.tables')}`,
        t('landing.price.fullMenu'),
        t('landing.price.qrCodes'),
        t('landing.price.analytics'),
        t('landing.price.prioritySupport'),
      ],
      cta: t('landing.pricing.startTrial'),
      popular: true,
    },
    {
      name: t('landing.pricing.pro'),
      price: '$79',
      period: `/${t('landing.price.month')}`,
      features: [
        `${t('landing.price.unlimited')} ${t('landing.price.locations')}`,
        `${t('landing.price.unlimited')} ${t('landing.price.tables')}`,
        t('landing.price.customBranding'),
        t('landing.price.apiAccess'),
        t('landing.price.whiteLabel'),
        t('landing.price.support247'),
      ],
      cta: t('landing.pricing.contact'),
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed inset-0 gradient-mesh opacity-30"></div>
      
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
            BrewCall
          </span>
        </Link>
        <LanguageSwitcher />
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('login.backHome')}
        </Link>

        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('landing.pricing.title')}
          </h1>
          <p className="text-gray-400 text-lg">
            {t('landing.pricing.desc')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-2xl card-hover animate-fade-in-up ${
                plan.popular
                  ? 'bg-gradient-to-b from-violet-600/20 to-indigo-600/10 border-2 border-violet-500/30'
                  : 'glass'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-bold rounded-full">
                  {t('landing.pricing.popular')}
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
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {f}
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
      </main>
    </div>
  );
}
