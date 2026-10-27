import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, languages, translations, TranslationKey } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
  currency: string;
  formatPrice: (price: number) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'brewcall_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && (stored === 'en' || stored === 'fr' || stored === 'ar')) {
      return stored as Language;
    }
    return 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.dir = languages.find((l) => l.code === lang)?.dir || 'ltr';
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.dir = languages.find((l) => l.code === language)?.dir || 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = useCallback(
    (key: TranslationKey): string => {
      const langTranslations = translations[language] as Record<string, string>;
      const enTranslations = translations.en as Record<string, string>;
      return langTranslations[key] || enTranslations[key] || key;
    },
    [language]
  );

  const dir = languages.find((l) => l.code === language)?.dir || 'ltr';
  const currency = translations[language]['currency.symbol'];

  const formatPrice = useCallback(
    (price: number): string => {
      return `${price.toFixed(2)} ${currency}`;
    },
    [currency]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, currency, formatPrice }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
