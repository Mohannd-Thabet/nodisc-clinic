import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function StoreFloatingButton() {
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-30">
      <a
        href="https://wa.me/967772070207"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isAr ? 'محادثة خدمة عملاء المتجر' : 'Store Chat Support'}
        title={isAr ? 'محادثة خدمة عملاء المتجر' : 'Store Chat Support'}
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#25D366] to-emerald-600 hover:from-[#20bd5a] hover:to-emerald-700 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-2 border-white/80 dark:border-slate-800"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>
    </div>
  );
}
