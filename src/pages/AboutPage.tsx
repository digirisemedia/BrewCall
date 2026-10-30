import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Coffee, ArrowLeft, Users, Globe, Heart, Zap, Target } from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();

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

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          {t('login.backHome')}
        </Link>

        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            {t('footer.about')} BrewCall
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 mb-8 animate-fade-in-up stagger-1">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Heart className="w-6 h-6 text-red-400" />
            Our Story
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            BrewCall was born from a simple observation: coffee shops deserve better tools to serve their customers. 
            We noticed that traditional waiter call systems were outdated, expensive, and didn't integrate with the 
            modern digital experience that customers expect.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Founded in 2024 in Morocco, we set out to create a platform that's not just functional, but beautiful, 
            intuitive, and accessible to coffee shops of all sizes. Today, BrewCall serves hundreds of coffee shops 
            across Morocco and beyond, helping them deliver exceptional customer experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: Target, title: 'Our Mission', desc: 'Empower coffee shops with technology that enhances the customer experience without adding complexity.', color: 'from-violet-500 to-purple-600' },
            { icon: Globe, title: 'Our Vision', desc: 'A world where every coffee shop, no matter how small, has access to world-class digital tools.', color: 'from-blue-500 to-indigo-600' },
            { icon: Heart, title: 'Our Values', desc: 'Simplicity, reliability, and customer-first thinking guide everything we build and every decision we make.', color: 'from-pink-500 to-rose-600' },
          ].map((item, i) => (
            <div key={i} className="glass rounded-2xl p-6 card-hover animate-fade-in-up" style={{ animationDelay: `${(i + 2) * 0.1}s` }}>
              <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-8 md:p-12 animate-fade-in-up stagger-5">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-emerald-400" />
            Our Team
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            We're a passionate team of designers, developers, and coffee enthusiasts dedicated to building the 
            best tools for the hospitality industry. Based in Morocco, serving the world.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Engineering', 'Design', 'Product', 'Support'].map((dept, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">{['💻', '🎨', '📊', '🤝'][i]}</div>
                <p className="text-sm font-medium text-gray-300">{dept}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
