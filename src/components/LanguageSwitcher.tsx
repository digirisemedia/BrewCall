import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../i18n/translations';

export function LanguageSwitcher({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = languages.find((l) => l.code === language)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-center w-10 h-10 rounded-xl text-lg transition-all ${
          variant === 'dark'
            ? 'bg-white/5 border border-white/10 hover:bg-white/10'
            : 'bg-gray-100 border border-gray-200 hover:bg-gray-200'
        }`}
        title={current.name}
      >
        {current.flag}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          <div className={`absolute top-full mt-2 right-0 z-50 min-w-[60px] rounded-xl shadow-2xl border overflow-hidden animate-scale-in ${
            variant === 'dark' ? 'bg-gray-900 border-white/10' : 'bg-white border-gray-200'
          }`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => { setLanguage(lang.code); setOpen(false); }}
                className={`flex items-center justify-center w-full px-4 py-3 text-2xl transition-colors ${
                  language === lang.code
                    ? variant === 'dark' ? 'bg-violet-600/20' : 'bg-violet-50'
                    : variant === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                }`}
                title={lang.name}
              >
                {lang.flag}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
