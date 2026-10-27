import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { CurrencySwitcher } from '../components/CurrencySwitcher';
import { Coffee, Zap, Shield, Smartphone, BarChart3, QrCode, ArrowRight, Star, MapPin } from 'lucide-react';

export default function LandingPage() {
  const { t } = useLanguage();
  const { formatPrice, convertPrice, detectedCountry } = useCurrency();

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
        <div className="flex items-center gap-3 animate-fade-in-right">
          <CurrencySwitcher />
          <LanguageSwitcher />
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

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-20 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect fill='%231a1a2e' width='1920' height='1080'/%3E%3C/svg%3E"
          >
            <source src="https://cdn.pixabay.com/video/2024/02/12/200260-912384743_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-transparent to-[#0a0a0f]"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8 animate-fade-in-down">
            <Star className="w-4 h-4 text-amber-400" />
            <span>{t('landing.badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {t('landing.hero1')}
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient">
              {t('landing.hero2')}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
            {t('landing.heroDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up stagger-3">
            <Link
              to="/register"
              className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1"
            >
              {t('landing.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all"
            >
              <span>📱</span> {t('landing.demo')}
            </Link>
          </div>

          {/* Demo Credentials */}
          <div className="mt-12 p-4 glass rounded-2xl max-w-md mx-auto animate-fade-in-up stagger-4">
            <p className="text-xs text-gray-400 mb-2 font-medium text-center">{t('landing.demoAccounts')}</p>
            <div className="bg-white/5 rounded-lg p-3 text-xs">
              <span className="text-emerald-400 font-semibold">{t('landing.shopOwner')}:</span>
              <span className="text-gray-300 ml-1">owner@aroma.coffee / owner123</span>
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
                  {[`☕ Espresso ${formatPrice(15)}`, `🥛 Latte ${formatPrice(28)}`, `🧊 Cold Brew ${formatPrice(30)}`].map((item, i) => (
                    <div key={i} className="bg-white rounded-lg p-2 text-xs shadow-sm">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                  <div className="bg-blue-500 rounded-lg p-2 text-center">
                    <span className="text-lg">🛎️</span>
                    <p className="text-[8px] text-white font-bold">{t('customer.waiter')}</p>
                  </div>
                  <div className="bg-cyan-500 rounded-lg p-2 text-center">
                    <span className="text-lg">💧</span>
                    <p className="text-[8px] text-white font-bold">{t('customer.water')}</p>
                  </div>
                  <div className="bg-purple-500 rounded-lg p-2 text-center">
                    <span className="text-lg">💳</span>
                    <p className="text-[8px] text-white font-bold">{t('customer.bill')}</p>
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
                <span className="text-[10px] text-gray-400 ml-3">{t('shop.dashboard')}</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex gap-2">
                  {['3', '1', '1', '1'].map((n, i) => (
                    <div key={i} className="flex-1 bg-gray-800 rounded-lg p-2 text-center">
                      <p className="text-lg font-bold text-white">{n}</p>
                      <p className="text-[8px] text-gray-400">{[t('shop.pendingRequests'), t('shop.callWaiter'), t('shop.water'), t('shop.bill')][i]}</p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-500/20 rounded-lg p-3">
                      <p className="text-xs text-blue-300 font-bold">{t('shop.table')} {n}</p>
                      <p className="text-[10px] text-gray-400 mt-1">🛎️ {t('shop.callWaiter')}</p>
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

      {/* Pricing Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.pricing.title')}</h2>
          <p className="text-gray-400">{t('landing.pricing.desc')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              name: t('landing.pricing.free'),
              price: formatPrice(convertPrice(0, 'MAD')),
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
              price: formatPrice(convertPrice(199, 'MAD')),
              features: [
                `1 ${t('landing.price.location')}`,
                `20 ${t('landing.price.tables')}`,
                t('landing.price.fullMenu'),
                t('landing.price.qrCodes'),
                t('landing.price.analytics'),
                t('landing.price.imageMenu'),
                t('landing.price.prioritySupport'),
              ],
              cta: t('landing.pricing.startTrial'),
              popular: true,
            },
            {
              name: t('landing.pricing.pro'),
              price: formatPrice(convertPrice(499, 'MAD')),
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
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-bold rounded-full whitespace-nowrap">
                  {t('landing.pricing.popular')}
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-gray-400">/{t('landing.price.month')}</span>
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

      {/* FAQ Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{t('faq.title1')}</span>{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">{t('faq.title2')}</span>
          </h2>
          <p className="text-gray-400">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-4">
          {[
            { q: t('faq.q1'), a: t('faq.a1') },
            { q: t('faq.q2'), a: t('faq.a2') },
            { q: t('faq.q3'), a: t('faq.a3') },
            { q: t('faq.q4'), a: t('faq.a4') },
            { q: t('faq.q5'), a: t('faq.a5') },
            { q: t('faq.q6'), a: t('faq.a6') },
            { q: t('faq.q7'), a: t('faq.a7') },
            { q: t('faq.q8'), a: t('faq.a8') },
          ].map((item, i) => (
            <details
              key={i}
              className="group glass rounded-2xl overflow-hidden card-hover"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                <h3 className="text-white font-semibold pr-4">{item.q}</h3>
                <span className="flex-shrink-0 w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 group-open:rotate-45 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">BrewCall</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
                {t('footer.tagline')}
              </p>
              <LanguageSwitcher />
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t('footer.product')}</h4>
              <ul className="space-y-3">
                <li><a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.features')}</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.pricing')}</a></li>
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
                <li><Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.cookies')}</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">{t('landing.footer')}</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
