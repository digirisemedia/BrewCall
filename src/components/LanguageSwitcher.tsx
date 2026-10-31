import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { languages } from '../i18n/translations';

interface LanguageSwitcherProps {
  variant?: 'dark' | 'light';
}

export function LanguageSwitcher({ variant = 'dark' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === language);

  const buttonClass = variant === 'light' 
    ? "flex items-center gap-2 px-3 py-2 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-all text-gray-700"
    : "flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all";

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClass}
      >
        <span className="text-lg">{currentLang?.flag}</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full right-0 mt-2 z-50 bg-gray-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-scale-in">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm transition-colors ${
                  language === lang.code
                    ? 'bg-violet-600/20 text-violet-300'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
              >
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
