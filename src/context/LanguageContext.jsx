import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('aljarbani_lang') || 'ar';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('aljarbani_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const t = (key, fallback = '') => {
    if (!translations[lang]) return fallback || key;
    const keys = key.split('.');
    let result = translations[lang];
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return fallback || key;
      }
    }
    return result;
  };

  const isRTL = lang === 'ar';

  const localizedConfig = {
    brand: {
      nameAr: 'نوديسك كلينك',
      nameEn: 'NODISC Clinic',
      logoUrl: '/assets/full_logo.jpg'
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, isRtl: isRTL, isRTL, t, localizedConfig }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
