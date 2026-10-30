import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { QrCode, Zap, Smartphone, BarChart3, MapPin, Coffee, ArrowLeft } from 'lucide-react';

export default function FeaturesPage() {
  const { t } = useLanguage();

  const features = [
    { icon: QrCode, title: t('landing.feat.qr.title'), desc: t('landing.feat.qr.desc'), color: 'from-violet-500 to-purple-600' },
    { icon: Zap, title: t('landing.feat.alert.title'), desc: t('landing.feat.alert.desc'), color: 'from-amber-500 to-orange-600' },
    { icon: Smartphone, title: t('landing.feat.noapp.title'), desc: t('landing.feat.noapp.desc'), color: 'from-emerald-500 to-teal-600' },
    { icon: BarChart3, title: t('landing.feat.analytics.title'), desc: t('landing.feat.analytics.desc'), color: 'from-blue-500 to-indigo-600' },
    { icon: MapPin, title: t('landing.feat.multi.title'), desc: t('landing.feat.multi.desc'), color: 'from-pink-500 to-rose-600' },
    { icon: Coffee, title: t('landing.feat.coffee.title'), desc: t('landing.feat.coffee.desc'), color: 'from-amber-600 to-yellow-600' },
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
            {t('landing.featuresTitle1')}{' '}
            <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
              {t('landing.featuresTitle2')}
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('landing.featuresDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-6 glass rounded-2xl card-hover animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold rounded-2xl shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:-translate-y-1"
          >
            {t('landing.cta')}
          </Link>
        </div>
      </main>
    </div>
  );
}
