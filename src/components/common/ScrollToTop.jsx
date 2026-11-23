import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const { isRtl } = useLanguage();
  const [visible, setVisible] = useState(false);

  // Automatically scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // Show/hide floating button on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="العودة لأعلى الصفحة"
      className={`fixed bottom-20 md:bottom-8 ${
        isRtl ? 'right-4 md:right-8' : 'left-4 md:left-8'
      } z-40 p-3.5 rounded-full bg-primary-700/90 dark:bg-primary-600/90 text-white shadow-xl backdrop-blur-sm transition-all duration-300 hover:bg-primary-800 hover:shadow-2xl hover:scale-110 active:scale-95 focus:outline-none border-2 border-white/30 dark:border-slate-800/60 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
