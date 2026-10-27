import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../i18n/translations';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === language)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
          variant === 'dark'
            ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
            : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className={`absolute top-full mt-2 right-0 z-50 min-w-[140px] rounded-xl shadow-2xl border overflow-hidden animate-scale-in ${
            variant === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'
          }`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                  language === lang.code
                    ? variant === 'dark' ? 'bg-violet-600/20 text-violet-300' : 'bg-violet-50 text-violet-700'
                    : variant === 'dark' ? 'text-gray-300 hover:bg-white/5' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
                {language === lang.code && <span className="ml-auto text-xs">✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
