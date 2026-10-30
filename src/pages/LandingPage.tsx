import React from 'react';
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
          <Link
            to="/login"
            className="hidden sm:block px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            {t('landing.signIn')}
          </Link>
          <Link
            to="/register"
            className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:-translate-y-0.5"
          >
            {t('landing.getStarted')}
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
            <span>{t('landing.trusted')}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {t('landing.hero1')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              {t('landing.hero2')}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2 leading-relaxed">
            {t('landing.heroDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/register"
              className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10">{t('landing.cta')}</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('landing.featuresTitle1')}{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              {t('landing.featuresTitle2')}
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t('landing.featuresDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: QrCode, title: t('landing.feat.qr.title'), desc: t('landing.feat.qr.desc'), color: 'from-violet-500 to-purple-600' },
            { icon: Zap, title: t('landing.feat.alert.title'), desc: t('landing.feat.alert.desc'), color: 'from-amber-500 to-orange-600' },
            { icon: Smartphone, title: t('landing.feat.noapp.title'), desc: t('landing.feat.noapp.desc'), color: 'from-emerald-500 to-teal-600' },
            { icon: BarChart3, title: t('landing.feat.analytics.title'), desc: t('landing.feat.analytics.desc'), color: 'from-blue-500 to-indigo-600' },
            { icon: MapPin, title: t('landing.feat.multi.title'), desc: t('landing.feat.multi.desc'), color: 'from-pink-500 to-rose-600' },
            { icon: Coffee, title: t('landing.feat.coffee.title'), desc: t('landing.feat.coffee.desc'), color: 'from-amber-600 to-yellow-600' },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.pricing.title')}</h2>
          <p className="text-gray-400">{t('landing.pricing.desc')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: t('landing.pricing.free'), price: '$0', period: `/${t('landing.price.month')}`, features: [`1 ${t('landing.price.location')}`, `5 ${t('landing.price.tables')}`, t('landing.price.basicMenu'), t('landing.price.emailSupport')], cta: t('landing.cta'), popular: false },
            { name: t('landing.pricing.starter'), price: '$29', period: `/${t('landing.price.month')}`, features: [`1 ${t('landing.price.location')}`, `20 ${t('landing.price.tables')}`, t('landing.price.fullMenu'), t('landing.price.qrCodes'), t('landing.price.analytics'), t('landing.price.prioritySupport')], cta: t('landing.pricing.startTrial'), popular: true },
            { name: t('landing.pricing.pro'), price: '$79', period: `/${t('landing.price.month')}`, features: [`${t('landing.price.unlimited')} ${t('landing.price.locations')}`, `${t('landing.price.unlimited')} ${t('landing.price.tables')}`, t('landing.price.customBranding'), t('landing.price.apiAccess'), t('landing.price.whiteLabel'), t('landing.price.support247')], cta: t('landing.pricing.contact'), popular: false },
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
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
                {t('footer.tagline')}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3" />
                <span>Agdal, Rabat, Morocco</span>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.product')}</h4>
              <ul className="space-y-3">
                <li><Link to="/features" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.features')}</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.pricing')}</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.demo')}</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.company')}</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.about')}</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.contact')}</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.legal')}</h4>
              <ul className="space-y-3">
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.terms')}</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.privacy')}</Link></li>
                <li><Link to="/terms-of-use" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.termsOfUse')}</Link></li>
              </ul>
            </div>

            {/* Language */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Language</h4>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">{t('footer.rights')}</p>
            <div className="flex items-center gap-4">
              <a href="mailto:contact@brewcallapp.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                contact@brewcallapp.com
              </a>
              <span className="text-gray-600">•</span>
              <span className="text-gray-500 text-sm">{t('footer.madeIn')}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
